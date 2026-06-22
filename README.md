# La Tapatia Food Truck - Sample Two Handoff

This folder is the selected client handoff sample. It is a static, browse-only website with no build step, no npm install, and no backend.

## Run Locally

From this folder:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

You can also deploy the contents of this folder directly to a static host such as Netlify, Vercel, Cloudflare Pages, GitHub Pages, or any standard web host.

## Folder Structure

```text
index.html
css/styles.css
js/main.js
js/config.js
js/menu-data.js
assets/logo-new.png
assets/svg/
assets/food/menu/
assets/photos/
```

## Edit Points

- Business phones, social links, and demo location: `js/config.js`
- Menu items, prices, descriptions, categories, and food images: `js/menu-data.js`
- Visual styling: `css/styles.css`
- Main page content: `index.html`

## Remaining Client Placeholders

- Instagram and TikTok URLs still need real client links.
- Sides, desserts, and beverages still show `Market price` until the client confirms prices.
- Fajitas and menu upcharges should be confirmed before public launch.
- Food photos are demo stock/client-demo images and should be replaced with owned or licensed La Tapatia photos before public launch.
- The contact form opens the visitor's email app with a `mailto:` link. Add a form service or backend later if the client wants direct form submission.
- Square ordering/cart files are intentionally not included in this browse-only sample. Add a separate checkout integration later if online ordering becomes part of the launch scope.
