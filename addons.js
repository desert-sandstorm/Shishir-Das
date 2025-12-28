/* =========================================================
   ADDONS.JS — FINAL CENTERED CLOCK + CLEAN HEADER
   Core-safe | Single observer | Mobile optimized
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

    /* ---------- HEADER TITLE ---------- */
    const header = document.querySelector("header");
    const title = header?.querySelector("h1");

    if (header && title && !header.dataset.headerDone) {
      header.dataset.headerDone = "1";

      title.textContent = "My Fourth Semester Exam";
      title.style.margin = "0";
      title.style.fontWeight = "700";
      title.style.textAlign = "center";

      header.style.position = "relative"; // not sticky
      header.style.display = "flex";
      header.style.justifyContent = "center";
      header.style.alignItems = "center";
      header.style.background = "var(--bg)";
    }

    /* ---------- TOP SECTION (CLOCK + DATE + SWITCHES + FB) ---------- */
    const top = document.querySelector(".top");
    const clock = document.querySelector(".clock");
    const date = document.querySelector(".date");
    const switches = document.querySelector(".switches");
    const author = document.querySelector(".author");

    if (top && clock && date && !top.dataset.layoutDone) {
      top.dataset.layoutDone = "1";

      /* Top container layout */
      top.style.display = "flex";
      top.style.flexDirection = "column";
      top.style.alignItems = "center";
      top.style.gap = "10px";
      top.style.background = "transparent";

      /* Clock */
      clock.style.textAlign = "center";
      clock.style.width = "100%";

      /* Date under clock, same alignment */
      date.style.textAlign = "center";
      date.style.marginTop = "2px";

      /* Facebook ID under clock/date */
      if (author) {
        author.style.marginTop = "4px";
        author.style.display = "inline-flex";
        author.style.alignItems = "center";
        author.style.gap = "8px";

        if (!author.querySelector(".fb-icon")) {
          const icon = document.createElement("img");
          icon.className = "fb-icon";
          icon.src = FB_ICON_URL;
          icon.alt = "Facebook";
          icon.style.cssText = `
            width:18px;
            height:18px;
            flex-shrink:0;
            display:block;
          `;
          author.prepend(icon);
        }
      }

      /* Switches under everything */
      if (switches) {
        switches.style.display = "flex";
        switches.style.justifyContent = "center";
        switches.style.gap = "8px";
        switches.style.marginTop = "4px";
      }
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

  /* Single observer */
  const observer = new MutationObserver(apply);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
