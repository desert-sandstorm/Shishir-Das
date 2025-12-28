/* =========================================================
   ADDONS.JS — FINAL COMBINED & OPTIMIZED ADD-ON
   Core-safe | Single Observer | Mobile-friendly
========================================================= */

(function addonsFinal(){

  const FB_ICON_URL =
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";

  const FAVICON_URL =
    "https://bogura.polytechedu.com/panel/img/logo.png";

  function apply(){

    /* ---------- PAGE TOP SPACING ---------- */
    if (!document.body.dataset.spacingDone) {
      document.body.dataset.spacingDone = "1";
      document.body.style.paddingTop = "12px";
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

    /* ---------- HEADER (NORMAL SCROLL + TITLE) ---------- */
    const header = document.querySelector("header");
    const title = header?.querySelector("h1");

    if (header && title && !header.dataset.headerDone) {
      header.dataset.headerDone = "1";

      title.textContent = "My Fourth Semester Exam";
      title.style.fontWeight = "700";
      title.style.margin = "0";

      header.style.position = "relative"; // UNSTICKED
      header.style.display = "flex";
      header.style.justifyContent = "center";
      header.style.alignItems = "center";
      header.style.textAlign = "center";
      header.style.background = "var(--bg)";
    }

    /* ---------- TOP SECTION (CLOCK + SWITCHES) ---------- */
    const top = document.querySelector(".top");
    const clock = document.querySelector(".clock");
    const switches = document.querySelector(".switches");

    if (top && clock && switches && !top.dataset.layoutDone) {
      top.dataset.layoutDone = "1";

      /* Unstick */
      top.style.position = "relative";
      top.style.background = "transparent";

      /* Stack vertically (mobile friendly) */
      top.style.display = "flex";
      top.style.flexDirection = "column";
      top.style.alignItems = "stretch";
      top.style.gap = "10px";

      /* Clock full width & centered */
      clock.style.width = "100%";
      clock.style.textAlign = "center";

      /* Switches below clock */
      switches.style.display = "flex";
      switches.style.justifyContent = "center";
      switches.style.gap = "8px";
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
