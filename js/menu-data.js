/* =========================================================
   menu-data.js — the full La Tapatia menu.
   Transcribed from the truck wrap. Edit prices/items here.

   Item fields:
     id        unique slug (used as cart key base)
     name      display name
     price     number, or null if priced at the truck ("Ask")
     desc      short description
     category  'entrees' | 'sides' | 'desserts' | 'drinks'
     icon      svg filename in assets/svg/ for the card accent
     meats     true  -> show the standard meat selector
               array -> show a custom set of choices
               false/omit -> no selector
     badge     optional ribbon text (e.g. "Popular")
     squareUrl optional per-item Square Payment Link (for 'square-online-link' mode)

   NOTE: prices for sides, desserts & drinks are NOT on the wrap.
   They are set to null ("Ask") — update them with real prices.
   ========================================================= */

window.LT_MEATS = [
  "Asada", "Pastor", "Barbacoa", "Birria",
  "Chorizo", "Carnitas (Pulled Pork)", "Chicken", "Ground Beef",
];

/*
  Each item has an `image` in assets/food/menu/. To replace a demo photo,
  use the same filename or update `image` to point to the new file - e.g.
  image: "assets/food/menu/taco-combo.jpg". If a photo is missing, the card
  falls back to the SVG icon.
*/
window.LT_MENU = [
  /* ---------------- ENTREES ---------------- */
  {
    id: "taco-combo", name: "Taco Combo", price: 15.99, category: "entrees",
    image: "assets/food/menu/taco-combo.jpg", icon: "taco.svg", badge: "Popular", meats: true,
    desc: "3 tacos with your choice of meat, topped with onions & cilantro. Served with a side of rice & beans.",
  },
  {
    id: "tortas", name: "Tortas", price: 15.99, category: "entrees",
    image: "assets/food/menu/tortas.jpg", icon: "taco.svg", meats: true,
    desc: "Your choice of meat, beans, shredded cheese, onion, cilantro & avocado on toasted bread.",
  },
  {
    id: "quesadillas", name: "Quesadillas", price: 15.99, category: "entrees",
    image: "assets/food/menu/quesadillas.jpg", icon: "taco.svg", meats: true,
    desc: "Flour tortilla stuffed with your choice of meat & melted cheese. Served with pico de gallo, lettuce, sour cream, rice & beans.",
  },
  {
    id: "quesabirrias", name: "Quesabirrias", price: 15.99, category: "entrees",
    image: "assets/food/menu/quesabirrias.jpg", icon: "taco.svg", badge: "Fan Favorite",
    desc: "3 birria-style cooked shredded-beef tacos stuffed with melted cheese, onions & cilantro. Served with birria broth for dipping.",
  },
  {
    id: "burritos", name: "Burritos", price: 15.99, category: "entrees",
    image: "assets/food/menu/burritos.jpg", icon: "taco.svg", meats: true,
    desc: "Flour tortilla stuffed with your choice of meat, rice, beans, shredded cheese, pico de gallo, lettuce & sour cream.",
  },
  {
    id: "carne-asada-plate", name: "Carne Asada Plate", price: 17.99, category: "entrees",
    image: "assets/food/menu/carne-asada-plate.jpg", icon: "taco.svg",
    desc: "Grilled steak topped with grilled onions. Served with rice, beans, pico de gallo, lettuce, sour cream & a choice of tortillas.",
  },
  {
    id: "fajitas", name: "Fajitas", price: 17.99, category: "entrees",
    image: "assets/food/menu/fajitas.jpg", icon: "chili.svg",
    /* Custom meat choices per the wrap: beef, chicken, or mix; shrimp +$1.50 */
    meats: ["Beef", "Chicken", "Mixed (beef & chicken)", "Shrimp (+$1.50)"],
    desc: "Grilled onions & bell peppers. Served with rice, beans, pico de gallo, lettuce, sour cream & a choice of tortillas. (Price on the wrap is partly obscured — please confirm.)",
  },
  {
    id: "tapatias-chilaquiles", name: "Tapatias Chilaquiles", price: 16.99, category: "entrees",
    image: "assets/food/menu/tapatias-chilaquiles.jpg", icon: "taco.svg", meats: true,
    desc: "Homemade chips topped with your choice of meat, refried beans, mild house sauce, sour cream, fresh cheese, cilantro & raw onion.",
  },
  {
    id: "shrimp-tacos", name: "Shrimp Tacos", price: 16.99, category: "entrees",
    image: "assets/food/menu/shrimp-tacos.jpg", icon: "taco.svg",
    desc: "3 grilled shrimp tacos stuffed with lettuce, pico de gallo & chipotle house sauce. Served with rice & beans.",
  },
  {
    id: "shrimp-quesadilla", name: "Shrimp Quesadilla", price: 17.99, category: "entrees",
    image: "assets/food/menu/shrimp-quesadilla.jpg", icon: "taco.svg",
    desc: "Flour tortilla stuffed with grilled shrimp & cheese. Served with pico de gallo, lettuce, sour cream, rice & beans.",
  },
  {
    id: "walking-tacos", name: "Walking Tacos", price: 9.99, category: "entrees",
    image: "assets/food/menu/walking-tacos.jpg", icon: "taco.svg", badge: "Best Value",
    desc: "Doritos chips bag filled with ground beef, lettuce, sour cream, shredded cheese, pico de gallo & a choice of salsa (mild or hot). Swap your meat for an extra charge.",
  },

  /* ---------------- ALA CARTE / SIDES ---------------- */
  { id: "corn-tortillas",  name: "Corn Tortillas",  price: null, category: "sides", image: "assets/food/menu/corn-tortillas.jpg",  icon: "taco.svg",   desc: "House corn tortillas." },
  { id: "flour-tortillas", name: "Flour Tortillas", price: null, category: "sides", image: "assets/food/menu/flour-tortillas.jpg",  icon: "taco.svg",   desc: "Soft flour tortillas." },
  { id: "rice-and-beans",  name: "Rice & Beans",    price: null, category: "sides", image: "assets/food/menu/rice-and-beans.jpg", icon: "taco.svg",   desc: "A side of seasoned rice & beans." },
  { id: "guacamole",       name: "Guacamole",       price: null, category: "sides", image: "assets/food/menu/guacamole.jpg",  icon: "cactus.svg", desc: "Fresh house-made guacamole." },
  { id: "cheese-dip",      name: "Cheese Dip",      price: null, category: "sides", image: "assets/food/menu/cheese-dip.jpg", icon: "taco.svg",   desc: "Warm, creamy cheese dip." },
  { id: "salsa",           name: "Salsa",           price: null, category: "sides", image: "assets/food/menu/salsa.jpg",      icon: "chili.svg",  desc: "Choice of mild or hot salsa." },
  { id: "side-taco",       name: "Taco (single)",   price: null, category: "sides", image: "assets/food/menu/side-taco.jpg",      icon: "taco.svg",   meats: true, desc: "A single taco with your choice of meat." },

  /* ---------------- DESSERTS ---------------- */
  { id: "chocoflan",  name: "Chocoflan",  price: null, category: "desserts", image: "assets/food/menu/chocoflan.jpg",  icon: "maraca.svg", desc: "Layered chocolate cake & creamy flan." },
  { id: "cake",       name: "Cake",       price: null, category: "desserts", image: "assets/food/menu/cake.jpg",       icon: "maraca.svg", desc: "Sweet slice of cake." },
  { id: "cheesecake", name: "Cheesecake", price: null, category: "desserts", image: "assets/food/menu/cheesecake.jpg", icon: "maraca.svg", desc: "Rich, smooth cheesecake." },

  /* ---------------- BEVERAGES ---------------- */
  { id: "soda-can",     name: "Soda Can",      price: null, category: "drinks", image: "assets/food/menu/soda-can.jpg",     icon: "maraca.svg", desc: "Assorted canned sodas." },
  { id: "mexican-coke", name: "Mexican Coke",  price: null, category: "drinks", image: "assets/food/menu/mexican-coke.jpg", icon: "maraca.svg", desc: "Coca-Cola made with cane sugar." },
  { id: "bottle-water", name: "Bottled Water", price: null, category: "drinks", image: "assets/food/menu/bottle-water.jpg",        icon: "maraca.svg", desc: "Cold bottled water." },
  { id: "jarritos",     name: "Jarritos",      price: null, category: "drinks", image: "assets/food/menu/jarritos.jpg",     icon: "maraca.svg", desc: "Mexican fruit sodas in assorted flavors." },
  { id: "horchata",     name: "Horchata",      price: null, category: "drinks", image: "assets/food/menu/horchata.jpg",     icon: "maraca.svg", desc: "Sweet, cinnamon rice water." },
  { id: "pina",         name: "Piña",          price: null, category: "drinks", image: "assets/food/menu/pina.jpg",         icon: "maraca.svg", desc: "Refreshing pineapple water." },
  { id: "jamaica",      name: "Jamaica",       price: null, category: "drinks", image: "assets/food/menu/jamaica.jpg",      icon: "chili.svg",  desc: "Tart hibiscus water (agua de Jamaica)." },
];

/* Categories in display order, with friendly labels. */
window.LT_CATEGORIES = [
  { id: "entrees",  label: "Entrees" },
  { id: "sides",    label: "Ala Carte / Sides" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks",   label: "Beverages" },
];
