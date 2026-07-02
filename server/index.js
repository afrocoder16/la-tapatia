/* =========================================================
   La Tapatia — Square checkout backend (Sample Two).

   Exposes:
     GET  /api/health         -> { ok, environment }
     POST /api/checkout       -> { url } (Square-hosted checkout page)

   Security model:
   - The Square access token lives ONLY here (server-side, from .env).
     It never reaches the browser.
   - The browser sends only cart lines as { id, qty, meat }. The server
     looks up the real price from js/menu-data.js, so a tampered request
     cannot change the amount charged.
   - Market-price items (price: null) can't be charged online; a cart
     containing them is rejected with a clear message.
   ========================================================= */
import "dotenv/config";
import express from "express";
import cors from "cors";
import crypto from "node:crypto";
import { SquareClient, SquareEnvironment } from "square";
import { getMenuItem, itemName, canonicalMeat } from "./menu.js";

/* ---------------- config ---------------- */
const {
  SQUARE_ACCESS_TOKEN,
  SQUARE_LOCATION_ID,
  SQUARE_ENVIRONMENT = "sandbox",
  CHECKOUT_REDIRECT_URL,
  ALLOWED_ORIGINS = "",
  PORT = 4242,
} = process.env;

function requireEnv(name, value) {
  if (!value) {
    console.error(`\nMissing required env var ${name}. See server/.env.example.\n`);
    process.exit(1);
  }
}
requireEnv("SQUARE_ACCESS_TOKEN", SQUARE_ACCESS_TOKEN);
requireEnv("SQUARE_LOCATION_ID", SQUARE_LOCATION_ID);

const IS_PRODUCTION = SQUARE_ENVIRONMENT === "production";
const square = new SquareClient({
  token: SQUARE_ACCESS_TOKEN,
  environment: IS_PRODUCTION ? SquareEnvironment.Production : SquareEnvironment.Sandbox,
});

const allowedOrigins = ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean);

/* ---------------- app ---------------- */
const app = express();
app.use(express.json({ limit: "64kb" }));
app.use(
  cors({
    origin(origin, cb) {
      /* Allow same-origin / tools with no Origin header (curl), and any
         explicitly allow-listed origin. */
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error("Origin not allowed by CORS"));
    },
  })
);

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, environment: IS_PRODUCTION ? "production" : "sandbox" });
});

/* Square wants integer cents (BigInt in the SDK). Guard against floats. */
function toCents(dollars) {
  return BigInt(Math.round(Number(dollars) * 100));
}

/* Validate + normalize the incoming cart against the server's menu.
   Returns { lineItems, issues }. */
function buildLineItems(cart) {
  const lineItems = [];
  const issues = [];

  for (const raw of cart) {
    const id = raw && raw.id;
    const qty = Math.max(1, Math.min(99, parseInt(raw && raw.qty, 10) || 0));
    const item = id ? getMenuItem(id) : null;

    if (!item) {
      issues.push(`Unknown item: ${id}`);
      continue;
    }
    if (item.price == null) {
      /* Market-price item — can't be charged online. */
      issues.push(`${itemName(item)} is priced at the truck and can't be paid online.`);
      continue;
    }

    const meat = canonicalMeat(item, raw && raw.meat);
    const li = {
      name: itemName(item) + (meat ? ` (${meat})` : ""),
      quantity: String(qty),
      basePriceMoney: {
        amount: toCents(item.price),
        currency: "USD",
      },
    };
    lineItems.push(li);
  }

  return { lineItems, issues };
}

app.post("/api/checkout", async (req, res) => {
  try {
    const body = req.body || {};
    const cart = Array.isArray(body.cart) ? body.cart : [];
    if (!cart.length) {
      return res.status(400).json({ error: "empty_cart", message: "Your cart is empty." });
    }

    const { lineItems, issues } = buildLineItems(cart);

    /* If nothing chargeable survived (e.g. all market-price), stop. */
    if (!lineItems.length) {
      return res.status(422).json({
        error: "no_chargeable_items",
        message:
          issues[0] ||
          "None of the items in your cart can be paid online. Please call the truck.",
        issues,
      });
    }

    /* Optional customer note carried onto the Square order. */
    const note =
      typeof body.note === "string" && body.note.trim()
        ? body.note.trim().slice(0, 500)
        : undefined;
    const customerName =
      typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";

    const result = await square.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId: SQUARE_LOCATION_ID,
        lineItems,
        note: customerName ? `Pickup: ${customerName}` : undefined,
      },
      checkoutOptions: {
        redirectUrl: CHECKOUT_REDIRECT_URL || undefined,
        askForShippingAddress: false,
      },
      ...(note ? { description: note } : {}),
    });

    const url = result?.paymentLink?.url;
    if (!url) {
      console.error("No URL in Square response:", JSON.stringify(result, bigintReplacer));
      return res.status(502).json({ error: "square_no_url", message: "Could not start checkout." });
    }

    return res.json({
      url,
      /* Surface any skipped market-price items so the UI can inform the customer. */
      skipped: issues.length ? issues : undefined,
    });
  } catch (err) {
    /* Square SDK errors carry a structured `.errors` array. */
    const detail = err?.errors || err?.message || String(err);
    console.error("Checkout error:", JSON.stringify(detail, bigintReplacer));
    return res.status(500).json({
      error: "checkout_failed",
      message: "Something went wrong starting checkout. Please try again or call the truck.",
    });
  }
});

/* JSON can't stringify BigInt; used only for logging. */
function bigintReplacer(_k, v) {
  return typeof v === "bigint" ? v.toString() : v;
}

app.listen(PORT, () => {
  console.log(
    `La Tapatia checkout server listening on http://localhost:${PORT}  [${
      IS_PRODUCTION ? "PRODUCTION" : "SANDBOX"
    }]`
  );
  if (allowedOrigins.length) {
    console.log(`CORS allowed origins: ${allowedOrigins.join(", ")}`);
  }
});
