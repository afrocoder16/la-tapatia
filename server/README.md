# La Tapatia — Square Checkout Backend

A small Node + Express server that turns the website cart into a **Square-hosted
checkout**. The customer clicks "Checkout & Pay", the server creates a Square
Payment Link (with an itemized order), and the customer is sent to Square's
secure page to pay. Square handles all card data (PCI).

The public site does **not** contain the Square access token — it lives only
here, in `.env`.

## Setup

```bash
cd server
cp .env.example .env      # then edit .env (see below)
npm install
npm run location          # lists your Square locations -> copy the ID into .env
npm start                 # http://localhost:4242
```

### `.env`

| Variable | What it is |
|---|---|
| `SQUARE_ENVIRONMENT` | `sandbox` for testing, `production` when live |
| `SQUARE_ACCESS_TOKEN` | Access token from the Square Developer Dashboard (sandbox token for sandbox, production token for production) |
| `SQUARE_LOCATION_ID` | The location that receives orders (run `npm run location` to find it) |
| `CHECKOUT_REDIRECT_URL` | Where Square returns the customer after paying — a page on the site, with `?checkout=success` |
| `ALLOWED_ORIGINS` | Comma-separated site origins allowed to call this API (CORS) |
| `PORT` | Port the server listens on (default 4242) |

`.env` is git-ignored — never commit it.

## Connecting the site to this server

In `js/config.js`, set:

```js
checkout: { apiBaseUrl: "http://localhost:4242" }   // or your deployed URL
```

Leave `apiBaseUrl` empty (`""`) to disable online payment; the cart then falls
back to the email (mailto) order handoff.

## How prices stay safe

The browser sends only `{ id, qty, meat }` per cart line. The server looks up
the real price from the site's own `js/menu-data.js` and builds the Square
order from that, so a tampered request can never change the amount charged.

Items with no price (`price: null`, i.e. "Market price" sides/drinks) can't be
paid online — the server rejects them with a clear message.

## API

- `GET /api/health` → `{ ok, environment }`
- `POST /api/checkout` with `{ name, phone, note, cart: [{ id, qty, meat }] }`
  → `{ url }` (redirect the customer here) or an error `{ error, message }`.

## Testing in sandbox

Square's sandbox doesn't take a real card — the payment link opens a **Sandbox
Testing Panel** (Overview → Test Payment → Checkout Complete) that simulates the
buyer paying and then runs the real redirect + webhooks. Test cards for the
embedded flow are in Square's docs if you switch to the Web Payments SDK later.

## Going live (checklist)

1. In the Square Dashboard, get **production** credentials for the client's account.
2. Set `.env`: `SQUARE_ENVIRONMENT=production`, production `SQUARE_ACCESS_TOKEN`,
   production `SQUARE_LOCATION_ID`.
3. Deploy this `server/` folder to a Node host (Render, Railway, Fly, a VPS, …).
4. Set `CHECKOUT_REDIRECT_URL` and `ALLOWED_ORIGINS` to the live site domain.
5. Point `js/config.js` → `checkout.apiBaseUrl` at the deployed server URL.
6. Do one real low-value test order, then refund it from the Square Dashboard.

> **Security note:** the sandbox token that was used during development should be
> rotated (regenerated) in the Square Developer Dashboard, since it was shared
> during setup. Production tokens must only ever live in the deployed server's
> environment, never in the repo.
