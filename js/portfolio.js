// Renders a filterable masonry gallery from a JSON file.
//
//   <div class="filters"></div>
//   <div class="grid" data-src="data/origami.json">...</div>
//
// Each entry: { title, description, category, year, image, alt, link, youtube, video }
//   youtube — a YouTube video ID (the part after "v=") to embed
//   video   — path to a local .mp4 instead
// Filter buttons are built from the categories found in the file.
(async function () {
  const grid = document.querySelector(".grid[data-src]");
  if (!grid) return;
  const filterBar = document.querySelector(".filters");

  let items;
  try {
    const res = await fetch(grid.dataset.src);
    if (!res.ok) throw new Error(res.status);
    items = await res.json();
  } catch (err) {
    grid.insertAdjacentHTML(
      "afterend",
      '<p class="grid-note">Couldn’t load this gallery. If you opened the file directly, run a local server instead (see README).</p>'
    );
    return;
  }

  const slug = (s) => "cat-" + String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-");

  // Small DOM helper — uses textContent so text is never parsed as HTML
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  const media = (item) => {
    const box = el("div", "card-media");
    if (item.youtube || item.video || item.type === "video") {
      const frame = el("div", "video-frame");
      if (item.youtube) {
        const iframe = el("iframe");
        iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtube)}`;
        iframe.title = item.title;
        iframe.loading = "lazy";
        iframe.allow = "accelerometer; encrypted-media; picture-in-picture";
        iframe.allowFullscreen = true;
        frame.append(iframe);
      } else if (item.video) {
        const video = el("video");
        video.src = item.video;
        video.controls = true;
        video.preload = "metadata";
        frame.append(video);
      } else {
        const ph = el("div", "video-placeholder");
        ph.append(el("i", "fa-solid fa-circle-play"), el("span", null, "Video coming soon"));
        frame.append(ph);
      }
      box.append(frame);
      return box;
    }
    if (!item.image) return null;
    const img = el("img");
    img.src = item.image;
    img.alt = item.alt || item.title;
    box.append(img);
    return box;
  };

  for (const item of items) {
    const card = el("article", `card ${slug(item.category)}`);

    // Videos stay playable in place; other cards link out when they have a link
    const isVideo = item.youtube || item.video || item.type === "video";
    const wrap = item.link && !isVideo ? el("a", "card-link") : el("div", "card-link");
    if (wrap.tagName === "A") {
      wrap.href = item.link;
      if (/^https?:/.test(item.link)) {
        wrap.target = "_blank";
        wrap.rel = "noopener";
      }
    }

    const m = media(item);
    if (m) wrap.append(m);

    const body = el("div", "card-body");
    const meta = el("div", "card-meta");
    meta.append(el("span", "card-tag", item.category), el("span", null, item.year ?? ""));
    const title = el("h3", null, item.title);
    if (wrap.tagName === "A") title.append(el("i", "fa-solid fa-arrow-right"));
    body.append(meta, title);
    if (item.description) body.append(el("p", null, item.description));
    wrap.append(body);

    card.append(wrap);
    grid.append(card);
  }

  const iso = new Isotope(grid, {
    itemSelector: ".card",
    percentPosition: true,
    masonry: { columnWidth: ".grid-sizer", gutter: ".gutter-sizer" },
  });
  imagesLoaded(grid).on("progress", () => iso.layout());

  // Build one filter button per category (hidden if there's only one)
  const categories = [...new Set(items.map((i) => i.category))];
  if (!filterBar || categories.length < 2) return;

  const buttons = [["All", "*"], ...categories.map((c) => [c, "." + slug(c)])].map(([label, filter]) => {
    const b = el("button", "filter-btn", label);
    b.dataset.filter = filter;
    b.addEventListener("click", () => applyFilter(filter));
    filterBar.append(b);
    return b;
  });

  function applyFilter(filter) {
    iso.arrange({ filter });
    buttons.forEach((b) => {
      const on = b.dataset.filter === filter;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", String(on));
    });
  }
  applyFilter("*");
})();
