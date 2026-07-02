# La Tapatia Food Truck - Sample Two Handoff

This folder is the selected client handoff sample. The public site is static
(no build step). Online card payment is handled by a small Square checkout
backend in `server/` — the site still works without it (it falls back to an
email order handoff).

## Run Locally

**Static site** (from this folder):

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

**Checkout backend** (optional, for real Square payments — see `server/README.md`):

```bash
cd server
npm install
npm start          # http://localhost:4242
```

The static site can be deployed to any static host (Netlify, Vercel, Cloudflare
Pages, GitHub Pages, …). The backend deploys separately to any Node host
(Render, Railway, Fly, a VPS, or serverless). Set `js/config.js` →
`checkout.apiBaseUrl` to the backend's URL (or leave it empty to disable online
payment and use the email handoff).

## Folder Structure

```text
index.html
css/styles.css
js/main.js
js/config.js
js/menu-data.js
js/i18n.js
assets/logo-new.png
assets/svg/
assets/food/menu/
assets/photos/
server/            # Square checkout backend (Node + Express)
```

## Edit Points

- Business phones, social links, cart order email, demo location, and checkout backend URL: `js/config.js`
- Menu items, prices, descriptions, categories, and food images: `js/menu-data.js`
- English / Spanish UI text (nav, buttons, cart, forms, schedule stops): `js/i18n.js`
- Visual styling: `css/styles.css`
- Main page content: `index.html`
- Square keys and checkout server config: `server/.env` (see `server/README.md`)

## Language Switch

The site has an English / Spanish toggle in the header (the globe button next
to the cart). The visitor's choice is remembered on their device, and a first
visit follows the browser's language. When you edit text:

- Menu item names/descriptions have English and Spanish fields side by side in
  `js/menu-data.js` (`name`/`name_es`, `desc`/`desc_es`). Edit both.
- All other interface text lives in `js/i18n.js` under matching `en` and `es`
  keys — update the same key in both languages so nothing falls back.

## Remaining Client Placeholders

- Instagram and TikTok URLs still need real client links.
- Sides, desserts, and beverages still show `Market price` until the client confirms prices.
- Fajitas and menu upcharges should be confirmed before public launch.
- Food photos are demo stock/client-demo images and should be replaced with owned or licensed La Tapatia photos before public launch.
- The contact form opens the visitor's email app with a `mailto:` link. Add a form service or backend later if the client wants direct form submission.
- **Square checkout is wired and working in sandbox** (`server/`). Before launch: switch `server/.env` to production credentials (`SQUARE_ENVIRONMENT=production` + production access token + production location ID), point `js/config.js` → `checkout.apiBaseUrl` at the deployed backend, and set `CHECKOUT_REDIRECT_URL`/`ALLOWED_ORIGINS` to the live domain.
- Market-price items (sides/desserts/drinks with no price) can't be paid online — the backend rejects them with a message telling the customer to call the truck. Set real prices in `js/menu-data.js` to make them payable.
