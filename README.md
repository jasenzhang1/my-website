# my-website

A hand-coded static personal site: plain HTML, CSS and JavaScript, no build step.

## Run it locally

The galleries load JSON files with `fetch`, which browsers block on `file://`.
Serve the folder instead:

```sh
npx http-server -p 8000 -c-1
# then open http://localhost:8000  (Ctrl+C to stop)
```

Or, with Python installed: `python -m http.server 8000`.

## Structure

```
index.html          Home: photo + elevator pitch, links to each area
origami.html        Origami gallery + Instagram / TikTok
esports.html        League of Legends coaching + Chasing the Cup YouTube
tennis.html         Tennis videos and photos
css/base.css        Design tokens (colors, fonts) and resets
css/...             Topic stylesheets, all imported by css/main.css
js/header.js        Shared nav (edit links here)
js/footer.js        Shared footer (edit social links here)
js/portfolio.js     Builds a filterable gallery from a JSON file
data/origami.json   Origami gallery entries
data/tennis.json    Tennis gallery entries
images/             Photos; placeholders are .svg files
```

## Add to a gallery

Put photos in `images/origami/` or `images/tennis/` (about 1200px wide is plenty),
then add an entry to `data/origami.json` or `data/tennis.json`:

```json
{
  "title": "30-unit icosahedron",
  "description": "Optional one-liner.",
  "category": "Polyhedra",
  "year": 2026,
  "image": "images/origami/icosahedron.jpg",
  "link": "https://www.instagram.com/p/..."
}
```

- `category` can be anything. A filter button is created for each distinct category.
- `link` and `description` are optional.
- For a video, use `"youtube": "VIDEO_ID"` (the part after `v=` in the URL) instead of `image`.
  YouTube (unlisted is fine) is the best home for match videos, since it keeps the site fast.
  A short local clip also works: `"video": "videos/rally.mp4"`.

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
