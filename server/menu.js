/* Server-side view of the menu.

   To avoid maintaining prices in two places, we load the SAME
   js/menu-data.js the front-end uses, by giving it a fake `window`
   to attach its globals to, then read the prices back out.

   The browser sends only { id, qty, meat } to /api/checkout — the
   server looks up the real price here so a tampered request can never
   change what a customer is charged. */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MENU_DATA_PATH = join(__dirname, "..", "js", "menu-data.js");

function loadMenuData() {
  const src = readFileSync(MENU_DATA_PATH, "utf8");
  /* menu-data.js only assigns to `window.*` and uses no browser APIs,
     so a bare object stands in fine. */
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: "menu-data.js" });
  return sandbox.window;
}

const data = loadMenuData();

export const MENU = data.LT_MENU || [];
export const MEATS = data.LT_MEATS || [];

/* Fast lookup by id. */
const byId = new Map(MENU.map((item) => [item.id, item]));
export function getMenuItem(id) {
  return byId.get(id) || null;
}

/* The English display name (Square dashboard / receipts read best in one
   language; English is the canonical store language here). */
export function itemName(item) {
  return item.name || item.id;
}

/* Resolve a meat label the browser sent to its English canonical, so the
   name that appears on the Square order is stable regardless of the UI
   language the customer used. */
export function canonicalMeat(item, shown) {
  if (!shown) return "";
  const choices = Array.isArray(item.meats) ? item.meats : MEATS;
  const match = choices.find(
    (m) => m && typeof m === "object" && (m.en === shown || m.es === shown)
  );
  return match ? match.en : shown;
}
