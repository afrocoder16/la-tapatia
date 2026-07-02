# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A marketing/ordering website for the **La Tapatia Food Truck** (Marshall, MN). This is "Sample Two" — the selected client handoff sample. The **public site is static** (plain HTML/CSS/vanilla JS, no build step/bundler). Online card payment is handled by a **separate small Node backend** in [server/](server/) that creates Square-hosted checkouts. The site works without the backend too (it falls back to an email/mailto order handoff).

## Run locally

Static site:

```bash
python -m http.server 8000   # then open http://localhost:8000
```

Checkout backend (only if testing payments — needs `server/.env`, see [server/README.md](server/README.md)):

```bash
cd server && npm install && npm start   # http://localhost:4242
```

The static site deploys to any static host; the backend deploys separately to any Node host. There are no automated tests and no lint config. **Local port note:** port 8000 is sometimes occupied by another project's server on this machine — if the served page isn't La Tapatia, use another port (e.g. `python -m http.server 8123`) and update `CHECKOUT_REDIRECT_URL` in `server/.env` to match.

## Square checkout backend ([server/](server/))

Node + Express + the official `square` SDK (v40+, `SquareClient` / `client.checkout.paymentLinks.create`). Flow: the cart's "Checkout & Pay" button POSTs `{ name, phone, note, cart: [{id, qty, meat}] }` to `POST /api/checkout`; the server builds a Square Order and Payment Link and returns `{ url }`; the front-end redirects there. Square redirects back to `CHECKOUT_REDIRECT_URL` (`?checkout=success`), which the front-end detects to clear the cart and show a thank-you.

Critical invariants:
- **The browser never sends or is trusted for prices.** [server/menu.js](server/menu.js) loads the *same* [js/menu-data.js](js/menu-data.js) (via a `vm` sandbox with a fake `window`) and looks up the real price by `id`, so a tampered request can't change the charge. Keep prices in `menu-data.js` only.
- **Market-price items** (`price: null`) are rejected for online payment; a cart of only such items returns HTTP 422.
- The **Square access token lives only in `server/.env`** (git-ignored), never in front-end code or the repo. `server/.gitignore` covers `.env` and `node_modules`.
- Front-end wiring lives in `main.js` (`startSquareCheckout`, `emailOrderHandoff`, `handleCheckoutReturn`); the backend URL comes from `LT_CONFIG.checkout.apiBaseUrl` (empty string disables online pay → mailto fallback).

## Architecture

The whole page is one document ([index.html](index.html)) rendered by one IIFE ([js/main.js](js/main.js)) that reads several global config objects. The data and rendering are deliberately separated so the client can edit content without touching logic:

- **[js/i18n.js](js/i18n.js)** — sets `window.LT_I18N` (`en` and `es` translation dictionaries for all UI strings). Loaded first.
- **[js/config.js](js/config.js)** — sets `window.LT_CONFIG` (business name, phones, socials, order-request email/subject, demo live location). Business-level edits go here.
- **[js/menu-data.js](js/menu-data.js)** — sets `window.LT_MENU`, `window.LT_MEATS`, `window.LT_CATEGORIES`. All menu content lives here.
- **[js/main.js](js/main.js)** — reads those globals off `window` and renders every dynamic section into empty `<div>` hosts in the HTML (`#specials-grid`, `#menu-tabs`, `#menu-grid`, `#schedule-grid`, `#contact-rows`, socials, cart). No framework; DOM is built via string templates and small `el()`/`$()` helpers.

Load order matters and is fixed at the bottom of `index.html`: `i18n.js` → `config.js` → `menu-data.js` → `main.js`. The data files must define their globals before `main.js` runs.

`main.js` boots from `init()` on `DOMContentLoaded`, which calls each `render*` function in turn. To add a new dynamic section: add an empty host element with an `id` in the HTML, write a `renderX()` that populates it, and call it from `init()`.

### Internationalization (English / Spanish)

There's a language switch (`#lang-toggle`) that flips the whole site between `en` and `es`, persisted in `localStorage` under `la_tapatia_sample_two_lang` (first visit honors the browser locale). Two layers:

- **Static HTML** carries `data-i18n="key"` (textContent), `data-i18n-html` (innerHTML, for strings with `<br>`), `data-i18n-placeholder`, or `data-i18n-aria`. `applyTranslations()` swaps them from `LT_I18N[lang]`.
- **JS-rendered strings** go through the `t("key")` helper (falls back to English, then the key itself). Menu items use `name`/`name_es`, `desc`/`desc_es`, `badge`/`badge_es` via the `localized(obj, base)` helper; meats are bilingual `{en, es}` objects via `meatLabel()`.

On switch, `refreshLanguage()` re-runs `applyTranslations()` plus the data-driven renderers (specials, tabs, menu, schedule, contact, cart). State survives because everything renders from data, not from DOM text: the selected menu tab (`activeCategory`) and cart persist. **Cart lines store the English-canonical meat** (`canonicalMeat`) and are re-localized at render time (`displayMeat`), so a cart built in one language displays correctly in the other. When adding any new user-facing string, add a key to **both** `en` and `es` in `i18n.js` rather than hardcoding text.

### Menu items (`LT_MENU`)

Each item is `{ id, name, name_es?, price, desc, desc_es?, category, image, icon, meats?, badge?, badge_es?, squareUrl? }`. Key conventions enforced by `main.js`:

- `price: null` renders as **"Market price"** and is excluded from the cart subtotal (see `priceLabel`, `cartSubtotal`, `hasMarketPriceItem`). Sides/desserts/drinks are intentionally `null` pending real prices.
- The `_es` fields hold Spanish; they fall back to the English field if absent (`localized()`). The `popular` badge style keys off the **English** `badge` so it's language-independent.
- `meats: true` shows the standard `LT_MEATS` selector; `meats: [..]` shows a custom list (e.g. Fajitas); omitted/false shows no selector. Meat choices are bilingual `{en, es}` objects. The chosen meat (English-canonical) becomes part of the cart line key so the same item with different meats is tracked separately.
- `image` points at `assets/food/menu/`. If it fails to load, the card falls back to the SVG in `assets/svg/` named by `icon` (inline `onerror` in `cardHTML`, plus the `imageEl` helper for specials).
- `category` must match a `LT_CATEGORIES` id (`entrees` / `sides` / `desserts` / `drinks`) to appear under a tab.

### Cart

Front-end only, persisted in `localStorage` under key `la_tapatia_sample_two_cart_v1` (`loadCart`/`saveCart`). Checkout is **not wired to Square** — submitting the cart or contact form builds a plain-text body and opens the visitor's mail client via a `mailto:` link (`orderBody`, and the contact form in `renderContact`). The order email/subject come from `LT_CONFIG.orderRequest`.

## Editing conventions

- User-facing strings inserted into the DOM go through the `esc()` helper. Keep using it when adding dynamic content.
- `main.js` is written in ES5 style (`var`, `function`, no arrow functions/template literals) — match it when editing that file.
- Assets: `assets/svg/` = decorative motifs + card icons; `assets/food/menu/` = per-item photos; `assets/photos/` = truck/hero imagery.

## Known placeholders (do not treat as bugs)

Documented in [README.md](README.md): Instagram/TikTok URLs are placeholder links, sides/desserts/drinks prices are `null` ("Market price"), Fajitas price/upcharges need client confirmation, food photos are demo stock, forms use `mailto:` (no backend), and Square checkout is not connected.
