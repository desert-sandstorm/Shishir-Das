/* =========================================================
   ADDONS.JS — OPTIMIZED HEADER + ICON + FAVICON + SPACING
   Core-safe, single observer
========================================================= */

(function addonsOptimized(){

  const FB_ICON_URL =
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";

  const FAVICON_URL =
    "https://bogura.polytechedu.com/panel/img/logo.png";

  function apply(){

    /* ---------- PAGE TOP SPACING ---------- */
    if (!document.body.dataset.spacingDone) {
      document.body.dataset.spacingDone = "1";
      document.body.style.paddingTop = "12px"; // space before header
    }

    /* ---------- AUTHOR (FB ICON ALIGNMENT) ---------- */
    const author = document.querySelector(".author");
    if (author && !author.dataset.fbDone) {
      author.dataset.fbDone = "1";

      author.style.display = "inline-flex";
      author.style.alignItems = "center";
      author.style.gap = "8px";

      if (!author.querySelector(".fb-icon")) {
        const icon = document.createElement("img");
        icon.className = "fb-icon";
        icon.src = FB_ICON_URL;
        icon.alt = "Facebook";
        icon.style.cssText = `
          width:20px;
          height:20px;
          flex-shrink:0;
          display:block;
        `;
        author.prepend(icon);
      }
    }

    /* ---------- HEADER TITLE + CENTERING ---------- */
    const header = document.querySelector("header");
    const title = header?.querySelector("h1");

    if (header && title && !header.dataset.headerDone) {
      header.dataset.headerDone = "1";

      /* Change title text (no emoji, clean) */
      title.textContent = "🎓 My Fourth Semester Exam";
      title.style.fontWeight = "700";
      title.style.margin = "0";

      header.style.display = "flex";
      header.style.flexDirection = "column";
      header.style.justifyContent = "center";
      header.style.alignItems = "center";
      header.style.textAlign = "center";

      /* Sticky header */
      header.style.position = "sticky";
      header.style.top = "0";
      header.style.zIndex = "1000";
      header.style.background = "var(--bg)";
    }

    /* ---------- STICKY TOP (CLOCK + BUTTONS) ---------- */
    const top = document.querySelector(".top");
    if (top && !top.dataset.topDone && header) {
      top.dataset.topDone = "1";

      top.style.position = "sticky";
      top.style.top = header.offsetHeight + "px";
      top.style.zIndex = "999";
      top.style.background = "var(--bg)";
      top.style.padding = "8px 0";
    }

    /* ---------- FAVICON ---------- */
    if (!document.head.dataset.faviconDone) {
      document.head.dataset.faviconDone = "1";

      document
        .querySelectorAll("link[rel*='icon']")
        .forEach(el => el.remove());

      const link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/png";
      link.href = FAVICON_URL;
      document.head.appendChild(link);
    }
  }

  /* Initial run */
  apply();

  /* Single observer for everything */
  const observer = new MutationObserver(apply);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
