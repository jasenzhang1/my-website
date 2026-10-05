// Builds the shared nav bar so every page uses one copy.
(function () {
  const NAME = "Jasen Zhang";
  const EMAIL = "jasenzhang@g.ucla.edu";

  const links = [
    { href: "index.html", label: "Home" },
    { href: "index.html#work", label: "Work" },
    { href: "about.html", label: "About" },
  ];

  // "/about", "/about.html" and "/" all map to a page name
  const page = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "");
  const isActive = (href) => !href.includes("#") && href.replace(/\.html$/, "") === page;

  // 2x2 folded-paper tiles pointing inward — the site's mark
  const mark = `
    <svg class="brand-mark" viewBox="0 0 26 26" aria-hidden="true">
      <rect x="0.5" y="0.5" width="12" height="12" rx="2" fill="#fff" stroke="#dfe4eb"/>
      <rect x="13.5" y="0.5" width="12" height="12" rx="2" fill="#fff" stroke="#dfe4eb"/>
      <rect x="0.5" y="13.5" width="12" height="12" rx="2" fill="#fff" stroke="#dfe4eb"/>
      <rect x="13.5" y="13.5" width="12" height="12" rx="2" fill="#fff" stroke="#dfe4eb"/>
      <path d="M12.5 0.5v12h-12z M13.5 0.5l12 12h-12z M13.5 25.5v-12h12z M12.5 25.5l-12-12h12z" fill="#1d5bff"/>
    </svg>`;

  const items = links
    .map((l) => `<li><a href="${l.href}"${isActive(l.href) ? ' class="active" aria-current="page"' : ""}>${l.label}</a></li>`)
    .join("");

  const header = document.getElementById("site-header");
  header.innerHTML = `
    <nav class="container nav-inner" aria-label="Main">
      <a class="brand" href="index.html">${mark}<span>${NAME}</span></a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Menu">
        <i class="fa-solid fa-bars"></i>
      </button>
      <ul class="nav-links" id="nav-links">
        ${items}
        <li><a class="btn btn-primary btn-sm" href="mailto:${EMAIL}">Get in touch</a></li>
      </ul>
    </nav>`;

  const toggle = header.querySelector(".nav-toggle");
  const list = header.querySelector(".nav-links");
  const setOpen = (open) => {
    list.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = `<i class="fa-solid ${open ? "fa-xmark" : "fa-bars"}"></i>`;
  };
  toggle.addEventListener("click", () => setOpen(!list.classList.contains("open")));
  list.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
})();
