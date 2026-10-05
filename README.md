# my-website

A hand-coded static personal site: plain HTML, CSS and JavaScript, no build step.

## Run it locally

The project grid loads `data/cards.json` with `fetch`, which browsers block on `file://`.
Serve the folder instead:

```sh
python -m http.server 8000
# then open http://localhost:8000
```

## Structure

```
index.html          Home: hero, featured pair, filterable project grid
about.html          About page
css/main.css        Imports the topic stylesheets below
css/base.css        Design tokens (colors, fonts) and resets
css/components.css  Buttons, chips, unit squares
css/nav.css         Header / nav
css/layout.css      Hero, sections, about page, footer
css/portfolio.css   Filter bar and masonry cards
js/header.js        Builds the shared nav (edit NAME / EMAIL here)
js/footer.js        Builds the shared footer (edit social links here)
js/portfolio.js     Renders cards.json and wires up Isotope filtering
data/cards.json     Your projects
images/             Placeholder SVGs; replace with real photos
```

## Add a project

Add an entry to `data/cards.json`:

```json
{
  "title": "Icosahedron (30 units)",
  "description": "One sentence about it.",
  "category": "origami",
  "year": 2026,
  "image": "images/icosahedron.jpg",
  "link": "https://..."
}
```

`category` must be `origami`, `apps` or `other` to match the filter buttons. To add a new
category, add a button in `index.html` (`data-filter=".yourcategory"`) and a label in
`LABELS` in `js/portfolio.js`.

Photos look best around 1200px wide. Any aspect ratio works, since the masonry grid handles mixed heights.

## Change the look

All colors and fonts are CSS variables at the top of `css/base.css`.

## Deploy free on Netlify

1. Push this repo to GitHub.
2. On [netlify.com](https://www.netlify.com), choose **Add new site → Import an existing project** and pick the repo.
   Leave the build command empty; `netlify.toml` already sets the publish directory.
3. You get a free `your-name.netlify.app` URL. Every push to `main` redeploys automatically.
4. Optional: buy a domain and add it under **Domain management**. HTTPS is free.

## Libraries (all free, loaded from CDNs)

- [Isotope](https://isotope.metafizzy.co/) for masonry layout and filtering
  (free under GPLv3 for personal and open-source use)
- [imagesLoaded](https://imagesloaded.desandro.com/) to re-layout as images load
- [Font Awesome Free](https://fontawesome.com/) for icons
- [Inter](https://rsms.me/inter/) and [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) from Google Fonts
