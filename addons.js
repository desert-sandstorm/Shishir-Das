/* =========================================================
   ADDONS.JS — FINAL PRODUCTION ADDON
   UI + UX + PWA + OFFLINE + PERFORMANCE
   Core-safe
========================================================= */

(function addonsFinal(){

  const LOGO_URL = "https://bogura.polytechedu.com/panel/img/logo.png";
  const FB_ICON_URL =
    "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg";

  const CACHE_VERSION = "exam-app-v2"; // bump when needed

  /* =====================================================
     UI / LAYOUT
  ===================================================== */

  function applyUI(){

    /* Page spacing */
    if (!document.body.dataset.spacingDone) {
      document.body.dataset.spacingDone = "1";
      document.body.style.paddingTop = "12px";
    }

    /* Header */
    const header = document.querySelector("header");
    const title = header?.querySelector("h1");
    if (header && title && !header.dataset.done) {
      header.dataset.done = "1";

      title.textContent = "🎓 My Fourth Semester Exam";
      title.style.margin = "0";
      title.style.fontWeight = "700";
      title.style.textAlign = "center";

      header.style.position = "relative";
      header.style.display = "flex";
      header.style.justifyContent = "center";
      header.style.alignItems = "center";
      header.style.background = "var(--bg)";
    }

    /* Top block */
    const top = document.querySelector(".top");
    const clock = document.querySelector(".clock");
    const date = document.querySelector(".date");
    const switches = document.querySelector(".switches");
    const author = document.querySelector(".author");

    if (top && clock && date && !top.dataset.layout) {
      top.dataset.layout = "1";

      top.style.display = "flex";
      top.style.flexDirection = "column";
      top.style.alignItems = "center";
      top.style.gap = "10px";

      clock.style.textAlign = "center";
      clock.style.width = "100%";

      date.style.textAlign = "center";

      /* Facebook under clock */
      if (author) {
        author.style.display = "inline-flex";
        author.style.alignItems = "center";
        author.style.gap = "6px";
        author.style.opacity = "0.85";

        if (!author.querySelector(".fb-icon")) {
          const img = document.createElement("img");
          img.src = FB_ICON_URL;
          img.className = "fb-icon";
          img.style.width = "16px";
          img.style.height = "16px";
          author.prepend(img);
        }
      }

      /* Switches */
      if (switches) {
        switches.style.display = "flex";
        switches.style.justifyContent = "center";
        switches.style.gap = "8px";
      }
    }

    /* Favicon */
    if (!document.head.dataset.favicon) {
      document.head.dataset.favicon = "1";
      document.querySelectorAll("link[rel*='icon']").forEach(e => e.remove());
      const link = document.createElement("link");
      link.rel = "icon";
      link.href = LOGO_URL;
      document.head.appendChild(link);
    }
  }

  applyUI();
  new MutationObserver(applyUI).observe(document.body, { childList:true, subtree:true });

  /* =====================================================
     UX TWEAKS
  ===================================================== */

  /* Offline / Online badge */
  (function connectionBadge(){
    const badge = document.createElement("div");
    badge.style.cssText = `
      position:fixed;
      bottom:10px;
      right:10px;
      font-size:12px;
      padding:4px 8px;
      border-radius:999px;
      background:#16a34a;
      color:white;
      z-index:9999;
      opacity:.85;
    `;
    document.body.appendChild(badge);

    function update(){
      if (navigator.onLine) {
        badge.textContent = "Online";
        badge.style.background = "#16a34a";
      } else {
        badge.textContent = "Offline";
        badge.style.background = "#dc2626";
      }
    }

    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    update();
  })();

  /* Auto-scroll to next exam (once) */
  (function scrollToNext(){
    let done = false;
    const t = setInterval(()=>{
      if (done) return;
      const next = document.querySelector(".card.next");
      if (next) {
        next.scrollIntoView({ behavior:"smooth", block:"center" });
        done = true;
        clearInterval(t);
      }
    }, 500);
  })();

  /* =====================================================
     PWA / OFFLINE (OPTIMIZED)
  ===================================================== */

  /* Manifest */
  if (!document.querySelector("link[rel='manifest']")) {
    const manifest = {
      name: "My Fourth Semester Exam",
      short_name: "4th Semester",
      start_url: ".",
      display: "standalone",
      background_color: "#0b1220",
      theme_color: "#0b1220",
      icons: [
        { src: LOGO_URL, sizes: "192x192", type: "image/png" },
        { src: LOGO_URL, sizes: "512x512", type: "image/png" }
      ]
    };
    const blob = new Blob([JSON.stringify(manifest)], { type:"application/json" });
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = URL.createObjectURL(blob);
    document.head.appendChild(link);
  }

  /* Service Worker */
  if ("serviceWorker" in navigator) {
    const swCode = `
      const CACHE = "${CACHE_VERSION}";
      self.addEventListener("install", e => {
        self.skipWaiting();
        e.waitUntil(
          caches.open(CACHE).then(c => c.addAll(["./"]))
        );
      });
      self.addEventListener("activate", e => {
        e.waitUntil(
          caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
          )
        );
      });
      self.addEventListener("fetch", e => {
        e.respondWith(
          caches.match(e.request).then(r => r || fetch(e.request))
        );
      });
    `;
    const blob = new Blob([swCode], { type:"application/javascript" });
    navigator.serviceWorker.register(URL.createObjectURL(blob));
  }

})();

