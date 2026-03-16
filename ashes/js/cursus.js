// Clique sur toute la fenêtre "school_ensitech" -> ouvre ENSITECH dans un nouvel onglet
document.querySelectorAll(".terminal-clickable").forEach((term) => {
  const url = term.dataset.target;
  if (!url) return;

  term.addEventListener("click", (e) => {
    // éviter de déclencher si l'utilisateur clique sur un vrai lien à l'intérieur
    const isLink = e.target.closest("a");
    if (isLink) return;
    window.open(url, "_blank", "noopener");
  });
});

// Petite animation de "réveil" au chargement (class utilisée uniquement si besoin)
window.addEventListener("load", () => {
  document.body.classList.add("page-loaded");
});