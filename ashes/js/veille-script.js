(async function renderSection() {
  const root = document.getElementById("root");
  const loading = document.getElementById("loading");

  // helper to create safe id from title
  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\d]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // New: filter function scoped to a sectionId
  function filterArticles(sectionId, tag) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const grid = section.querySelector(".articles-grid");
    const buttonsBar = section.querySelector(".articles-tags");
    // toggle active class on tag buttons in the section
    if (buttonsBar) {
      buttonsBar.querySelectorAll(".tag-filter").forEach((b) => {
        b.classList.toggle("active", b.dataset.tag === tag);
      });
    }
    if (!grid) return;
    Array.from(grid.children).forEach((card) => {
      const tagsStr = card.dataset.tags || "";
      if (tag === "all" || !tag) {
        card.style.display = "";
      } else if (tagsStr.split("||").includes(tag)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  try {
    const res = await fetch("veille.json");
    if (!res.ok) throw new Error("Failed to load veille.json");
    const json = await res.json();
    const subjects = json.veilles;

    const sectionTpl = document.getElementById("section-template");
    const postitTpl = document.getElementById("postit-template");
    const articleTpl = document.getElementById("article-template");
    const navLinks = document.getElementById("nav-links");

    subjects.forEach((data) => {
      const sectionElm = sectionTpl.content.cloneNode(true);
      // give the top container a stable id so we can scroll to it
      const sectionContainer = sectionElm.querySelector(".section-");
      const sectionId = slugify(
        data.title || "section-" + Math.random().toString(36).slice(2, 8)
      );
      if (sectionContainer) sectionContainer.id = sectionId;

      sectionElm.querySelector(".title").textContent = data.title || "";
      sectionElm.querySelector(".subtitle").textContent =
        data["sub-title"] || data.subtitle || "";
      sectionElm.querySelector(".definition").textContent =
        data.definition || "";
      sectionElm.querySelector(".fonctionnement").textContent =
        data.fonctionnement || "";

      // post-its
      // on clone directement depuis le template à chaque itération
      // (évite d'utiliser .content sur un DocumentFragment)
      const postitContainer = sectionElm.querySelector(".post-it-container");
      const solutions = data.solutions || data.prerequis || {};
      Object.keys(solutions).forEach((key) => {
        const s = solutions[key];
        const node = postitTpl.content.cloneNode(true);
        node.querySelector(".post-it-title").textContent = s.title || "";
        // compose content HTML from available fields
        const pieces = [];
        if (s.fonctionnement)
          pieces.push(
            "<strong>Fonctionnement:</strong><br>" +
              s.fonctionnement.replace(/\n/g, "<br>")
          );
        if (s.protocole)
          pieces.push("<strong>Protocole:</strong> " + s.protocole);
        if (s.environnement)
          pieces.push("<strong>Environnement:</strong> " + s.environnement);
        node.querySelector(".post-it-content").innerHTML = pieces.join("<br>");
        postitContainer.appendChild(node);
      });

      // articles
      // clone depuis le template pour chaque article
      const articlesGrid = sectionElm.querySelector(".articles-grid");
      const tagsBar = sectionElm.querySelector(".articles-tags"); // newly added container
      const tagSet = new Set();
      const articles = data.articles || [];
      articles.forEach((a) => {
        const node = articleTpl.content.cloneNode(true);
        const articleEl = node.querySelector(".article-card");
        const img = node.querySelector(".article-image");
        if (a["image"]) {
          img.src = a["image"];
          img.alt = a.title || a.source || "";
        } else {
          img.src = "css/article_standin_image.jpg";
          img.alt = a.title || a.source || "";
        }
        const tagBtn = node.querySelector(".article-tag");
        if (a.tags && a.tags.length) {
          // record tags for the top filters
          a.tags.forEach((t) => tagSet.add(t));
          tagBtn.textContent = a.tags[0];
          tagBtn.dataset.tag = a.tags[0];
        } else {
          tagBtn.remove();
        }

        // attach data-tags on the article element (supports multiple tags)
        articleEl.dataset.tags = (a.tags || []).join("||");

        node.querySelector(".article-title").textContent =
          a.title || a.source || "";
        node.querySelector(".article-excerpt").textContent =
          a.description || "";
        node.querySelector(".article-source").textContent = a.source || "";
        articlesGrid.appendChild(node);

        const readMore = articleEl.querySelector('.read-more');
        const redirect = a['link'] || a.redirectionLink || '';

        if (redirect && redirect.trim() !== '') {
          readMore.setAttribute('href', redirect);
          readMore.setAttribute('target', '_blank');
        } else {
          // Pas de lien fourni : rendre le lien inactif mais visible
          readMore.setAttribute('href', '#');
        }

        // per-card tag listener: will trigger section filter
        const appendedArticleEl = articlesGrid.lastElementChild;
        const appendedTagBtn = appendedArticleEl.querySelector(".article-tag");
        if (appendedTagBtn) {
          appendedTagBtn.addEventListener("click", (ev) => {
            ev.stopPropagation();
            const tag = appendedTagBtn.dataset.tag;
            filterArticles(sectionId, tag);
          });
        }
      });

      // insert rendered content
      root.insertBefore(sectionElm, loading);

      // create top-level tag buttons for this section (after insertion so DOM exists)
      if (tagsBar) {
        // create "Tous" button
        const createBtn = (label, tag) => {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "tag-filter";
          b.textContent = label;
          b.dataset.tag = tag;
          b.addEventListener("click", () => {
            filterArticles(sectionId, tag);
          });
          return b;
        };
        tagsBar.appendChild(createBtn("Tous", "all"));

        Array.from(tagSet)
          .sort()
          .forEach((t) => {
            tagsBar.appendChild(createBtn(t, t));
          });

        // default: activate "Tous"
        const first = tagsBar.querySelector(".tag-filter");
        if (first) first.classList.add("active");
      }

      // create nav entry AFTER insertion so scroll target exists in DOM
      if (navLinks && sectionId) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nav-link";
        btn.textContent = data.title || "Section";
        btn.dataset.target = sectionId;
        btn.addEventListener("click", () => {
          const target = document.getElementById(sectionId);
          if (target) {
            const headerOffset = document.querySelector('.navbar').offsetHeight; // Get the height of the header
            const elementPosition = target.getBoundingClientRect().top; // Get the position of the target element
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Calculate the offset position

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        });
        li.appendChild(btn);
        navLinks.appendChild(li);
      }

      // optional: example tag handler (no-op, ready for future behavior)
      // removed global root.querySelectorAll handler in favor of scoped hooks above
    });

    // remove loading
    loading.remove();
  } catch (err) {
    console.error(err);
    if (loading) loading.textContent = "Erreur de chargement du contenu.";
  }
})();

// Animation d'entrée des post-its
const postIts = document.querySelectorAll(".post-it");

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = entry.target.style.transform.replace(
            "translateY(30px)",
            "translateY(0)"
          );
        }, index * 100);
      }
    });
  },
  observerOptions
);

postIts.forEach((postIt) => {
  postIt.style.opacity = "0";
  postIt.style.transform += " translateY(30px)";
  postIt.style.transition = "all 0.6s ease";
  observer.observe(postIt);
});

// Animation des cartes d'articles
const articleCards = document.querySelectorAll(".article-card");
articleCards.forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = "all 0.6s ease";

  setTimeout(() => {
    observer.observe(card);
  }, 200);
});
