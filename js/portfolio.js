// Loads data/cards.json, renders a card per project, and lays them out
// with Isotope (masonry + filtering). imagesLoaded re-lays out as images arrive.
(async function () {
  const grid = document.querySelector(".grid");
  if (!grid) return;

  const LABELS = { origami: "Origami", apps: "Apps", other: "Other" };

  let cards;
  try {
    const res = await fetch("data/cards.json");
    if (!res.ok) throw new Error(res.status);
    cards = await res.json();
  } catch (err) {
    grid.insertAdjacentHTML(
      "afterend",
      '<p class="grid-note">Couldn’t load projects. If you opened the file directly, run a local server instead (see README).</p>'
    );
    return;
  }

  // Small DOM helper — uses textContent so card text is never parsed as HTML
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  for (const c of cards) {
    const card = el("article", `card ${c.category}`);
    const link = el("a", "card-link");
    link.href = c.link || "#";
    if (/^https?:/.test(link.getAttribute("href"))) {
      link.target = "_blank";
      link.rel = "noopener";
    }

    if (c.image) {
      const media = el("div", "card-media");
      const img = el("img");
      img.src = c.image;
      img.alt = c.alt || c.title;
      media.append(img);
      link.append(media);
    }

    const body = el("div", "card-body");
    const meta = el("div", "card-meta");
    meta.append(el("span", "card-tag", LABELS[c.category] || c.category), el("span", null, c.year ?? ""));
    const title = el("h3", null, c.title);
    title.append(el("i", "fa-solid fa-arrow-right"));
    body.append(meta, title, el("p", null, c.description));
    link.append(body);

    card.append(link);
    grid.append(card);
  }

  const iso = new Isotope(grid, {
    itemSelector: ".card",
    percentPosition: true,
    masonry: { columnWidth: ".grid-sizer", gutter: ".gutter-sizer" },
  });
  imagesLoaded(grid).on("progress", () => iso.layout());

  // Filter buttons
  const buttons = document.querySelectorAll(".filter-btn");
  const applyFilter = (filter) => {
    iso.arrange({ filter });
    buttons.forEach((b) => {
      const on = b.dataset.filter === filter;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
  };
  buttons.forEach((b) => b.addEventListener("click", () => applyFilter(b.dataset.filter)));

  // Links elsewhere on the page (e.g. featured panels) can pre-select a filter
  document.querySelectorAll("[data-filter-link]").forEach((a) =>
    a.addEventListener("click", () => applyFilter(a.dataset.filterLink))
  );
})();
