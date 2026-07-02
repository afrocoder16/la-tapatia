/* =========================================================
   menu-data.js — the full La Tapatia menu.
   Transcribed from the truck wrap. Edit prices/items here.

   Item fields:
     id        unique slug (used as cart key base)
     name      display name (English)
     name_es   display name in Spanish (optional; falls back to name)
     price     number, or null if priced at the truck ("Ask")
     desc      short description (English)
     desc_es   short description in Spanish (optional; falls back to desc)
     category  'entrees' | 'sides' | 'desserts' | 'drinks'
     icon      svg filename in assets/svg/ for the card accent
     meats     true  -> show the standard meat selector
               array -> show a custom set of choices (bilingual: {en, es})
               false/omit -> no selector
     badge     optional ribbon text (English)
     badge_es  optional ribbon text in Spanish (falls back to badge)
     squareUrl optional per-item Square Payment Link (for 'square-online-link' mode)

   NOTE: prices for sides, desserts & drinks are NOT on the wrap.
   They are set to null ("Ask") — update them with real prices.
   ========================================================= */

/* Standard meat choices. Each is bilingual so the selector matches
   the active language; the cart stores whichever label was shown. */
window.LT_MEATS = [
  { en: "Asada", es: "Asada" },
  { en: "Pastor", es: "Pastor" },
  { en: "Barbacoa", es: "Barbacoa" },
  { en: "Birria", es: "Birria" },
  { en: "Chorizo", es: "Chorizo" },
  { en: "Carnitas (Pulled Pork)", es: "Carnitas" },
  { en: "Chicken", es: "Pollo" },
  { en: "Ground Beef", es: "Carne Molida" },
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
    id: "taco-combo", name: "Taco Combo", name_es: "Combo de Tacos", price: 15.99, category: "entrees",
    image: "assets/food/menu/taco-combo.jpg", icon: "taco.svg", badge: "Popular", badge_es: "Popular", meats: true,
    desc: "3 tacos with your choice of meat, topped with onions & cilantro. Served with a side of rice & beans.",
    desc_es: "3 tacos con tu elección de carne, con cebolla y cilantro. Servidos con arroz y frijoles.",
  },
  {
    id: "tortas", name: "Tortas", name_es: "Tortas", price: 15.99, category: "entrees",
    image: "assets/food/menu/tortas.jpg", icon: "taco.svg", meats: true,
    desc: "Your choice of meat, beans, shredded cheese, onion, cilantro & avocado on toasted bread.",
    desc_es: "Tu elección de carne, frijoles, queso rallado, cebolla, cilantro y aguacate en pan tostado.",
  },
  {
    id: "quesadillas", name: "Quesadillas", name_es: "Quesadillas", price: 15.99, category: "entrees",
    image: "assets/food/menu/quesadillas.jpg", icon: "taco.svg", meats: true,
    desc: "Flour tortilla stuffed with your choice of meat & melted cheese. Served with pico de gallo, lettuce, sour cream, rice & beans.",
    desc_es: "Tortilla de harina rellena de tu elección de carne y queso derretido. Servida con pico de gallo, lechuga, crema, arroz y frijoles.",
  },
  {
    id: "quesabirrias", name: "Quesabirrias", name_es: "Quesabirrias", price: 15.99, category: "entrees",
    image: "assets/food/menu/quesabirrias.jpg", icon: "taco.svg", badge: "Fan Favorite", badge_es: "Favorito",
    desc: "3 birria-style cooked shredded-beef tacos stuffed with melted cheese, onions & cilantro. Served with birria broth for dipping.",
    desc_es: "3 tacos de birria de res deshebrada, rellenos de queso derretido, cebolla y cilantro. Servidos con consomé de birria para remojar.",
  },
  {
    id: "burritos", name: "Burritos", name_es: "Burritos", price: 15.99, category: "entrees",
    image: "assets/food/menu/burritos.jpg", icon: "taco.svg", meats: true,
    desc: "Flour tortilla stuffed with your choice of meat, rice, beans, shredded cheese, pico de gallo, lettuce & sour cream.",
    desc_es: "Tortilla de harina rellena de tu elección de carne, arroz, frijoles, queso rallado, pico de gallo, lechuga y crema.",
  },
  {
    id: "carne-asada-plate", name: "Carne Asada Plate", name_es: "Plato de Carne Asada", price: 17.99, category: "entrees",
    image: "assets/food/menu/carne-asada-plate.jpg", icon: "taco.svg",
    desc: "Grilled steak topped with grilled onions. Served with rice, beans, pico de gallo, lettuce, sour cream & a choice of tortillas.",
    desc_es: "Bistec asado con cebolla asada. Servido con arroz, frijoles, pico de gallo, lechuga, crema y tortillas a elegir.",
  },
  {
    id: "fajitas", name: "Fajitas", name_es: "Fajitas", price: 17.99, category: "entrees",
    image: "assets/food/menu/fajitas.jpg", icon: "chili.svg",
    /* Custom meat choices per the wrap: beef, chicken, or mix; shrimp +$1.50 */
    meats: [
      { en: "Beef", es: "Res" },
      { en: "Chicken", es: "Pollo" },
      { en: "Mixed (beef & chicken)", es: "Mixtas (res y pollo)" },
      { en: "Shrimp (+$1.50)", es: "Camarón (+$1.50)" },
    ],
    desc: "Grilled onions & bell peppers. Served with rice, beans, pico de gallo, lettuce, sour cream & a choice of tortillas. (Price on the wrap is partly obscured — please confirm.)",
    desc_es: "Cebolla y pimientos asados. Servidas con arroz, frijoles, pico de gallo, lechuga, crema y tortillas a elegir. (El precio en el rótulo está parcialmente cubierto — favor de confirmar.)",
  },
  {
    id: "tapatias-chilaquiles", name: "Tapatias Chilaquiles", name_es: "Chilaquiles Tapatíos", price: 16.99, category: "entrees",
    image: "assets/food/menu/tapatias-chilaquiles.jpg", icon: "taco.svg", meats: true,
    desc: "Homemade chips topped with your choice of meat, refried beans, mild house sauce, sour cream, fresh cheese, cilantro & raw onion.",
    desc_es: "Totopos caseros con tu elección de carne, frijoles refritos, salsa suave de la casa, crema, queso fresco, cilantro y cebolla cruda.",
  },
  {
    id: "shrimp-tacos", name: "Shrimp Tacos", name_es: "Tacos de Camarón", price: 16.99, category: "entrees",
    image: "assets/food/menu/shrimp-tacos.jpg", icon: "taco.svg",
    desc: "3 grilled shrimp tacos stuffed with lettuce, pico de gallo & chipotle house sauce. Served with rice & beans.",
    desc_es: "3 tacos de camarón asado, rellenos de lechuga, pico de gallo y salsa chipotle de la casa. Servidos con arroz y frijoles.",
  },
  {
    id: "shrimp-quesadilla", name: "Shrimp Quesadilla", name_es: "Quesadilla de Camarón", price: 17.99, category: "entrees",
    image: "assets/food/menu/shrimp-quesadilla.jpg", icon: "taco.svg",
    desc: "Flour tortilla stuffed with grilled shrimp & cheese. Served with pico de gallo, lettuce, sour cream, rice & beans.",
    desc_es: "Tortilla de harina rellena de camarón asado y queso. Servida con pico de gallo, lechuga, crema, arroz y frijoles.",
  },
  {
    id: "walking-tacos", name: "Walking Tacos", name_es: "Walking Tacos", price: 9.99, category: "entrees",
    image: "assets/food/menu/walking-tacos.jpg", icon: "taco.svg", badge: "Best Value", badge_es: "Mejor Precio",
    desc: "Doritos chips bag filled with ground beef, lettuce, sour cream, shredded cheese, pico de gallo & a choice of salsa (mild or hot). Swap your meat for an extra charge.",
    desc_es: "Bolsa de Doritos rellena de carne molida, lechuga, crema, queso rallado, pico de gallo y salsa a elegir (suave o picante). Cambia tu carne por un cargo extra.",
  },

  /* ---------------- ALA CARTE / SIDES ---------------- */
  { id: "corn-tortillas",  name: "Corn Tortillas",  name_es: "Tortillas de Maíz",   price: null, category: "sides", image: "assets/food/menu/corn-tortillas.jpg",  icon: "taco.svg",   desc: "House corn tortillas.", desc_es: "Tortillas de maíz de la casa." },
  { id: "flour-tortillas", name: "Flour Tortillas", name_es: "Tortillas de Harina",  price: null, category: "sides", image: "assets/food/menu/flour-tortillas.jpg",  icon: "taco.svg",   desc: "Soft flour tortillas.", desc_es: "Tortillas de harina suaves." },
  { id: "rice-and-beans",  name: "Rice & Beans",    name_es: "Arroz y Frijoles",    price: null, category: "sides", image: "assets/food/menu/rice-and-beans.jpg", icon: "taco.svg",   desc: "A side of seasoned rice & beans.", desc_es: "Una guarnición de arroz y frijoles sazonados." },
  { id: "guacamole",       name: "Guacamole",       name_es: "Guacamole",           price: null, category: "sides", image: "assets/food/menu/guacamole.jpg",  icon: "cactus.svg", desc: "Fresh house-made guacamole.", desc_es: "Guacamole fresco hecho en casa." },
  { id: "cheese-dip",      name: "Cheese Dip",      name_es: "Queso Fundido",       price: null, category: "sides", image: "assets/food/menu/cheese-dip.jpg", icon: "taco.svg",   desc: "Warm, creamy cheese dip.", desc_es: "Queso fundido cremoso y calientito." },
  { id: "salsa",           name: "Salsa",           name_es: "Salsa",               price: null, category: "sides", image: "assets/food/menu/salsa.jpg",      icon: "chili.svg",  desc: "Choice of mild or hot salsa.", desc_es: "Salsa a elegir: suave o picante." },
  { id: "side-taco",       name: "Taco (single)",   name_es: "Taco (individual)",   price: null, category: "sides", image: "assets/food/menu/side-taco.jpg",      icon: "taco.svg",   meats: true, desc: "A single taco with your choice of meat.", desc_es: "Un taco con tu elección de carne." },

  /* ---------------- DESSERTS ---------------- */
  { id: "chocoflan",  name: "Chocoflan",  name_es: "Chocoflán",  price: null, category: "desserts", image: "assets/food/menu/chocoflan.jpg",  icon: "maraca.svg", desc: "Layered chocolate cake & creamy flan.", desc_es: "Pastel de chocolate en capas con flan cremoso." },
  { id: "cake",       name: "Cake",       name_es: "Pastel",     price: null, category: "desserts", image: "assets/food/menu/cake.jpg",       icon: "maraca.svg", desc: "Sweet slice of cake.", desc_es: "Rebanada de pastel dulce." },
  { id: "cheesecake", name: "Cheesecake", name_es: "Cheesecake", price: null, category: "desserts", image: "assets/food/menu/cheesecake.jpg", icon: "maraca.svg", desc: "Rich, smooth cheesecake.", desc_es: "Cheesecake suave y cremoso." },

  /* ---------------- BEVERAGES ---------------- */
  { id: "soda-can",     name: "Soda Can",      name_es: "Refresco en Lata", price: null, category: "drinks", image: "assets/food/menu/soda-can.jpg",     icon: "maraca.svg", desc: "Assorted canned sodas.", desc_es: "Refrescos surtidos en lata." },
  { id: "mexican-coke", name: "Mexican Coke",  name_es: "Coca Mexicana",    price: null, category: "drinks", image: "assets/food/menu/mexican-coke.jpg", icon: "maraca.svg", desc: "Coca-Cola made with cane sugar.", desc_es: "Coca-Cola hecha con azúcar de caña." },
  { id: "bottle-water", name: "Bottled Water", name_es: "Agua Embotellada", price: null, category: "drinks", image: "assets/food/menu/bottle-water.jpg", icon: "maraca.svg", desc: "Cold bottled water.", desc_es: "Agua embotellada fría." },
  { id: "jarritos",     name: "Jarritos",      name_es: "Jarritos",         price: null, category: "drinks", image: "assets/food/menu/jarritos.jpg",     icon: "maraca.svg", desc: "Mexican fruit sodas in assorted flavors.", desc_es: "Refrescos mexicanos de frutas en sabores surtidos." },
  { id: "horchata",     name: "Horchata",      name_es: "Horchata",         price: null, category: "drinks", image: "assets/food/menu/horchata.jpg",     icon: "maraca.svg", desc: "Sweet, cinnamon rice water.", desc_es: "Agua de arroz dulce con canela." },
  { id: "pina",         name: "Piña",          name_es: "Piña",             price: null, category: "drinks", image: "assets/food/menu/pina.jpg",         icon: "maraca.svg", desc: "Refreshing pineapple water.", desc_es: "Refrescante agua de piña." },
  { id: "jamaica",      name: "Jamaica",       name_es: "Jamaica",          price: null, category: "drinks", image: "assets/food/menu/jamaica.jpg",      icon: "chili.svg",  desc: "Tart hibiscus water (agua de Jamaica).", desc_es: "Agua de Jamaica, ligeramente ácida." },
];

/* Categories in display order. Labels come from LT_I18N (cat.*). */
window.LT_CATEGORIES = [
  { id: "entrees",  label: "Entrees" },
  { id: "sides",    label: "Ala Carte / Sides" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks",   label: "Beverages" },
];
