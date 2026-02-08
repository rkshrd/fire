// ...new file...
/* Header / Navbar logic: menu toggle, outside click, date/time tick, theme switch */

(() => {
  /* ===== MENU ===== */
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  if (btn && menu) {
    document.addEventListener("click", (e) => {
      // if menu or button don't contain click target, close menu
      if (!menu.contains(e.target) && !btn.contains(e.target)) menu.classList.remove("open");
    });
    btn.addEventListener("click", () => menu.classList.toggle("open"));
  }

  /* ===== DATE & HEURE Europe/Paris ===== */
  const dateEl = document.getElementById("dateStr");
  const timeEl = document.getElementById("timeStr");
  if (dateEl && timeEl) {
    function tickParis() {
      const now = new Date();
      const tz = "Europe/Paris";
      const options = { timeZone: tz, weekday: "short", month: "short", day: "2-digit" };
      const formatted = new Intl.DateTimeFormat("en-GB", options).format(now).split(" ");
      dateEl.textContent = `${formatted[0]} ${formatted[1]} ${formatted[2]}`;
      timeEl.textContent = new Intl.DateTimeFormat("en-GB", {
        timeZone: tz,
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(now);
    }
    tickParis();
    setInterval(tickParis, 1000);
  }

  /* ===== THEME SWITCH (lune / soleil) ===== */
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      themeBtn.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
    });
  }
})();