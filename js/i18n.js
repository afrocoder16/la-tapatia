/* =========================================================
   i18n.js — English / Spanish translations for Sample Two.

   How it works:
   - Static text in index.html carries a data-i18n="key" attribute.
     applyTranslations() swaps textContent for the active language.
   - Placeholders use data-i18n-placeholder="key".
   - aria-labels use data-i18n-aria="key".
   - JS-rendered strings (schedule, cart, contact, forms) read from
     window.LT_I18N via the t() helper in main.js.
   - Menu item names/descriptions live in menu-data.js as name/desc
     (English) with optional name_es/desc_es (Spanish).

   Spanish is written in natural Mexican Spanish to match the brand's
   tapatío (Jalisco) voice — not a literal machine translation.
   ========================================================= */

window.LT_I18N = {
  en: {
    /* --- nav --- */
    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.schedule": "Location & Schedule",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cart": "Cart",
    "nav.openCart": "Open cart",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "lang.switchTo": "Cambiar a español",
    "lang.label": "ES",

    /* --- skip link --- */
    "skip.toMenu": "Skip to menu",

    /* --- hero --- */
    "hero.lead": "Auténtico Mexican street food — tacos, quesabirrias & more, rolling through Marshall, MN.",
    "hero.seeMenu": "See the Menu",
    "hero.bookCatering": "Book Catering",
    "hero.here.we": "WE ARE",
    "hero.here.now": "HERE",
    "hero.here.today": "TODAY",
    "hero.here.aria": "See where we are today",

    /* --- specials --- */
    "specials.title": "our<br />daily<br />specials",
    "specials.sub": "The dishes everyone comes back for — made fresh, served fast.",

    /* --- menu --- */
    "menu.eyebrow": "¡Buen Provecho!",
    "menu.title": "Our Menu",
    "menu.sub": "Everything made fresh to order — build your plate, pick your meat.",
    "menu.note": "Add your favorites to the cart and check out securely with Square. Market-price items are confirmed by the truck.",
    "menu.tab.all": "All",
    "menu.marketPrice": "Market price",
    "menu.chooseMeat": "Choose your meat",
    "menu.addToCart": "Add to Cart",
    "menu.added": "Added",
    "menu.decrease": "Decrease quantity",
    "menu.increase": "Increase quantity",
    "cat.entrees": "Entrees",
    "cat.sides": "Ala Carte / Sides",
    "cat.desserts": "Desserts",
    "cat.drinks": "Beverages",

    /* --- schedule --- */
    "schedule.title": "location<br />&amp;schedule",
    "schedule.sub": "Follow us for day-of updates — here's where to catch the truck.",
    "schedule.liveSuffix": "— follow us for day-of updates.",
    "schedule.directions": "Get Directions",
    "schedule.hoursDefault": "11:00 AM – 8:00 PM",
    "stop.mon.date": "Mon – Wed", "stop.mon.place": "Downtown", "stop.mon.addr": "100 W Main St, Marshall, MN", "stop.mon.time": "11:00 AM – 8:00 PM",
    "stop.thu.date": "Thursday", "stop.thu.place": "Lakeside", "stop.thu.addr": "Lakeside Park, Marshall, MN", "stop.thu.time": "11:00 AM – 8:00 PM",
    "stop.fri.date": "Fri – Sat", "stop.fri.place": "Events", "stop.fri.addr": "By appointment & local events", "stop.fri.time": "Hours vary",
    "stop.sun.date": "Sunday", "stop.sun.place": "Catering", "stop.sun.addr": "Private bookings only", "stop.sun.time": "Book ahead",
    "stop.daily.date": "Daily", "stop.daily.place": "Call ahead", "stop.daily.addr": "Large orders welcome", "stop.daily.time": "507.706.3827",
    "stop.any.date": "Anytime", "stop.any.place": "Catering", "stop.any.addr": "Weddings · parties · corporate", "stop.any.time": "Get a quote",

    /* --- about --- */
    "about.title": "about",
    "about.sub": "A taste of Jalisco, made for Marshall — real recipes, fresh every day.",
    "about.hi": "¡Hola! We're La Tapatia",
    "about.h": "Family recipes, slow-cooked & made to order",
    "about.p1": "La Tapatia started with a simple idea: bring real Mexican street food — the kind made with family recipes and slow-cooked care — straight to the neighborhood.",
    "about.p2": "Every taco, quesabirria and burrito is made to order with fresh ingredients and your choice of eight house-marinated meats. Catch us around town, or book the truck for your next fiesta.",

    /* --- contact --- */
    "contact.title": "Contact",
    "contact.lead": "Questions, catering, or a craving? Call, text, or send us a message.",
    "contact.callText": "Call / Text",
    "contact.email": "Email",
    "form.name": "Full Name *",
    "form.email": "Email Address *",
    "form.subject": "Subject (catering, event date…)",
    "form.message": "Your Message",
    "form.send": "Send Message",
    "form.needNameEmail": "Please add your name and email.",
    "form.openingEmail": "Opening your email app… or call/text us at ",
    "form.defaultSubject": "Message from the website",

    /* --- footer --- */
    "footer.tag": "¡Buen Provecho!",
    "footer.sub": "Auténtico Mexican street food & catering — Marshall, MN.",
    "footer.copy": "La Tapatia Food Truck · Site by",

    /* --- cart --- */
    "cart.eyebrow": "Online Order",
    "cart.title": "Your Cart",
    "cart.close": "Close cart",
    "cart.empty": "Your cart is empty.",
    "cart.startOrder": "Start an Order",
    "cart.subtotal": "Subtotal",
    "cart.marketNote": "Market-price items will be confirmed by the truck.",
    "cart.name": "Name for pickup *",
    "cart.phone": "Phone number *",
    "cart.note": "Pickup notes or special requests",
    "cart.send": "Checkout & Pay",
    "cart.each": " each",
    "cart.confirmPrice": "Confirm price",
    "cart.meat": "Meat: ",
    "cart.remove": "Remove",
    "cart.decrease": "Decrease ",
    "cart.increase": "Increase ",
    "cart.addFirst": "Add at least one item first.",
    "cart.needNamePhone": "Please add a pickup name and phone number.",
    "cart.opening": "Opening your email app to send the order request.",
    "cart.startingCheckout": "Taking you to secure checkout…",
    "cart.checkoutError": "We couldn't start checkout. Please try again or call the truck.",
    "cart.marketOnlyError": "These items are priced at the truck — please call to order them.",
    "cart.someSkipped": "Some market-price items were left off online checkout — the truck will confirm those.",
    "cart.thanks": "Your payment went through. The truck has your order.",
    "cart.thanksTitle": "¡Gracias!",
    "cart.orderMore": "Order More",

    /* --- order email body (mailto) --- */
    "order.heading": "New online order request",
    "order.name": "Name: ",
    "order.phone": "Phone: ",
    "order.notes": "Notes: ",
    "order.notesNone": "none",
    "order.items": "Items:",
    "order.subtotal": "Subtotal: ",
    "order.marketExcluded": " (market-price items not included)",
    "order.marketLine": "Meat: ",
    "order.footer": "Square checkout is not connected yet. Please confirm pickup time and payment with the customer.",
  },

  es: {
    /* --- nav --- */
    "nav.home": "Inicio",
    "nav.menu": "Menú",
    "nav.schedule": "Ubicación y Horario",
    "nav.about": "Nosotros",
    "nav.contact": "Contacto",
    "nav.cart": "Carrito",
    "nav.openCart": "Abrir carrito",
    "nav.openMenu": "Abrir menú",
    "nav.closeMenu": "Cerrar menú",
    "lang.switchTo": "Switch to English",
    "lang.label": "EN",

    /* --- skip link --- */
    "skip.toMenu": "Saltar al menú",

    /* --- hero --- */
    "hero.lead": "Auténtica comida callejera mexicana — tacos, quesabirrias y más, recorriendo Marshall, MN.",
    "hero.seeMenu": "Ver el Menú",
    "hero.bookCatering": "Reservar Catering",
    "hero.here.we": "AQUÍ",
    "hero.here.now": "ESTAMOS",
    "hero.here.today": "HOY",
    "hero.here.aria": "Ve dónde estamos hoy",

    /* --- specials --- */
    "specials.title": "nuestros<br />especiales<br />del día",
    "specials.sub": "Los platillos por los que todos regresan — hechos al momento, servidos rápido.",

    /* --- menu --- */
    "menu.eyebrow": "¡Buen Provecho!",
    "menu.title": "Nuestro Menú",
    "menu.sub": "Todo hecho al momento — arma tu plato y elige tu carne.",
    "menu.note": "Agrega tus favoritos al carrito y paga de forma segura con Square. Los artículos a precio del día los confirma la troca.",
    "menu.tab.all": "Todo",
    "menu.marketPrice": "Precio del día",
    "menu.chooseMeat": "Elige tu carne",
    "menu.addToCart": "Agregar al Carrito",
    "menu.added": "Agregado",
    "menu.decrease": "Disminuir cantidad",
    "menu.increase": "Aumentar cantidad",
    "cat.entrees": "Platillos Fuertes",
    "cat.sides": "A la Carta / Guarniciones",
    "cat.desserts": "Postres",
    "cat.drinks": "Bebidas",

    /* --- schedule --- */
    "schedule.title": "ubicación<br />y horario",
    "schedule.sub": "Síguenos para las actualizaciones del día — aquí es donde puedes encontrar la troca.",
    "schedule.liveSuffix": "— síguenos para las actualizaciones del día.",
    "schedule.directions": "Cómo Llegar",
    "schedule.hoursDefault": "11:00 AM – 8:00 PM",
    "stop.mon.date": "Lun – Mié", "stop.mon.place": "Centro", "stop.mon.addr": "100 W Main St, Marshall, MN", "stop.mon.time": "11:00 AM – 8:00 PM",
    "stop.thu.date": "Jueves", "stop.thu.place": "Lakeside", "stop.thu.addr": "Lakeside Park, Marshall, MN", "stop.thu.time": "11:00 AM – 8:00 PM",
    "stop.fri.date": "Vie – Sáb", "stop.fri.place": "Eventos", "stop.fri.addr": "Con cita y eventos locales", "stop.fri.time": "Horario variable",
    "stop.sun.date": "Domingo", "stop.sun.place": "Catering", "stop.sun.addr": "Solo reservaciones privadas", "stop.sun.time": "Reserva con tiempo",
    "stop.daily.date": "Diario", "stop.daily.place": "Llama antes", "stop.daily.addr": "Pedidos grandes bienvenidos", "stop.daily.time": "507.706.3827",
    "stop.any.date": "Cuando sea", "stop.any.place": "Catering", "stop.any.addr": "Bodas · fiestas · empresas", "stop.any.time": "Pide tu cotización",

    /* --- about --- */
    "about.title": "nosotros",
    "about.sub": "Un sabor de Jalisco, hecho para Marshall — recetas de verdad, frescas cada día.",
    "about.hi": "¡Hola! Somos La Tapatía",
    "about.h": "Recetas de familia, cocinadas a fuego lento y al momento",
    "about.p1": "La Tapatía nació de una idea sencilla: llevar auténtica comida callejera mexicana — de esa hecha con recetas de familia y cocinada con calma a fuego lento — directo al vecindario.",
    "about.p2": "Cada taco, quesabirria y burrito se prepara al momento con ingredientes frescos y tu elección de ocho carnes marinadas en casa. Encuéntranos por la ciudad o reserva la troca para tu próxima fiesta.",

    /* --- contact --- */
    "contact.title": "Contacto",
    "contact.lead": "¿Preguntas, catering o un antojo? Llámanos, mándanos mensaje o escríbenos.",
    "contact.callText": "Llamar / Mensaje",
    "contact.email": "Correo",
    "form.name": "Nombre Completo *",
    "form.email": "Correo Electrónico *",
    "form.subject": "Asunto (catering, fecha del evento…)",
    "form.message": "Tu Mensaje",
    "form.send": "Enviar Mensaje",
    "form.needNameEmail": "Por favor agrega tu nombre y correo.",
    "form.openingEmail": "Abriendo tu app de correo… o llámanos / mándanos mensaje al ",
    "form.defaultSubject": "Mensaje desde el sitio web",

    /* --- footer --- */
    "footer.tag": "¡Buen Provecho!",
    "footer.sub": "Auténtica comida callejera mexicana y catering — Marshall, MN.",
    "footer.copy": "La Tapatia Food Truck · Sitio por",

    /* --- cart --- */
    "cart.eyebrow": "Pedido en Línea",
    "cart.title": "Tu Carrito",
    "cart.close": "Cerrar carrito",
    "cart.empty": "Tu carrito está vacío.",
    "cart.startOrder": "Empezar un Pedido",
    "cart.subtotal": "Subtotal",
    "cart.marketNote": "Los artículos a precio del día los confirmará la troca.",
    "cart.name": "Nombre para recoger *",
    "cart.phone": "Número de teléfono *",
    "cart.note": "Notas para recoger o pedidos especiales",
    "cart.send": "Pagar Pedido",
    "cart.each": " c/u",
    "cart.confirmPrice": "Confirmar precio",
    "cart.meat": "Carne: ",
    "cart.remove": "Quitar",
    "cart.decrease": "Disminuir ",
    "cart.increase": "Aumentar ",
    "cart.addFirst": "Agrega al menos un artículo primero.",
    "cart.needNamePhone": "Por favor agrega un nombre y número de teléfono para recoger.",
    "cart.opening": "Abriendo tu app de correo para enviar el pedido.",
    "cart.startingCheckout": "Llevándote al pago seguro…",
    "cart.checkoutError": "No pudimos iniciar el pago. Intenta de nuevo o llama a la troca.",
    "cart.marketOnlyError": "Estos artículos son a precio del día — llama para ordenarlos.",
    "cart.someSkipped": "Algunos artículos a precio del día no se incluyeron en el pago en línea — la troca los confirmará.",
    "cart.thanks": "Tu pago se realizó. La troca ya tiene tu pedido.",
    "cart.thanksTitle": "¡Gracias!",
    "cart.orderMore": "Ordenar Más",

    /* --- order email body (mailto) --- */
    "order.heading": "Nuevo pedido en línea",
    "order.name": "Nombre: ",
    "order.phone": "Teléfono: ",
    "order.notes": "Notas: ",
    "order.notesNone": "ninguna",
    "order.items": "Artículos:",
    "order.subtotal": "Subtotal: ",
    "order.marketExcluded": " (los artículos a precio del día no están incluidos)",
    "order.marketLine": "Carne: ",
    "order.footer": "El pago con Square todavía no está conectado. Por favor confirma la hora de recoger y el pago con el cliente.",
  },
};
