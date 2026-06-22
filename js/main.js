/* =========================================================
   main.js — Sample Two renderer.
   Structure mirrors the client reference template, reskinned in
   La Tapatia colors. Renders specials, categorized menu rows,
   schedule grid, contact info, socials, cart, sticky nav,
   scroll reveal, mobile nav, and contact form (mailto fallback).

   Reads (from js/config.js and js/menu-data.js):
     LT_CONFIG, LT_MENU, LT_MEATS, LT_CATEGORIES
   ========================================================= */
(function () {
  "use strict";

  /* This shipping sample is self-contained; menu-data paths resolve from
     sample_two/ (e.g. "assets/food/menu/taco-combo.jpg"). */
  var ASSET_PREFIX = "";

  var CONFIG = window.LT_CONFIG || {};
  var MENU = window.LT_MENU || [];
  var MEATS = window.LT_MEATS || [];
  var CATEGORIES = window.LT_CATEGORIES || [];

  function $(sel) { return document.querySelector(sel); }
  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function assetPath(p) {
    if (!p) return "";
    return /^https?:|^\.\.\//.test(p) ? p : ASSET_PREFIX + p;
  }
  function priceLabel(price) {
    return price == null ? "Market price" : "$" + Number(price).toFixed(2);
  }
  function money(n) {
    return "$" + Number(n || 0).toFixed(2);
  }
  function getMenuItem(id) {
    return MENU.find(function (item) { return item.id === id; }) || null;
  }

  /* <img> with graceful fallback to a labeled circle/placeholder. */
  function imageEl(src, alt, cls, fallbackLabel) {
    var img = el("img", cls);
    img.src = assetPath(src);
    img.alt = alt || "";
    img.loading = "lazy";
    img.addEventListener("error", function handle() {
      img.removeEventListener("error", handle);
      var label = (fallbackLabel || alt || "•").toString().charAt(0).toUpperCase();
      var ph = el("div", "img-fallback", esc(label));
      if (img.parentNode) img.parentNode.replaceChild(ph, img);
    });
    return img;
  }

  /* ---------------- Daily Specials (3 columns) ---------------- */
  function renderSpecials() {
    var grid = $("#specials-grid");
    if (!grid) return;

    var badged = MENU.filter(function (i) { return i.badge; });
    var entrees = MENU.filter(function (i) { return i.category === "entrees" && !i.badge; });
    var picks = [];
    var seen = {};
    badged.concat(entrees).forEach(function (item) {
      if (picks.length < 3 && !seen[item.id]) { picks.push(item); seen[item.id] = true; }
    });

    picks.forEach(function (item) {
      var card = el("article", "special");
      var media = el("div", "special__media");
      media.appendChild(imageEl(item.image, item.name, "special__img", item.name));
      card.appendChild(media);
      card.appendChild(el("span", "special__tick"));
      card.appendChild(el("h3", "special__name", esc(item.name)));
      var priceCls = item.price == null ? "special__price special__price--ask" : "special__price";
      card.appendChild(el("p", priceCls, esc(priceLabel(item.price))));
      grid.appendChild(card);
    });
  }

  /* ---------------- Menu: category tabs + card grid ----------------
     Card design mirrors sample one and feeds the local cart. */
  var DEFAULT_CATEGORY = "entrees";
  var ORDER_TEL = (CONFIG.callToOrderPhone && CONFIG.callToOrderPhone.tel) || "+15077063827";
  var ORDER_EMAIL = (CONFIG.orderRequest && CONFIG.orderRequest.email) || "info@latapatiafoodtruck.com";
  var ORDER_SUBJECT = (CONFIG.orderRequest && CONFIG.orderRequest.subject) || "New online order request - La Tapatia Food Truck";
  var CART_KEY = "la_tapatia_sample_two_cart_v1";
  var cart = loadCart();

  function meatOptionsHTML(item) {
    if (!item.meats) return "";
    var choices = Array.isArray(item.meats) ? item.meats : MEATS;
    var opts = choices.map(function (m) { return '<option value="' + esc(m) + '">' + esc(m) + "</option>"; }).join("");
    return '' +
      '<div class="meat-select">' +
        '<label for="meat-' + esc(item.id) + '">Choose your meat</label>' +
        '<select id="meat-' + esc(item.id) + '" data-meat="' + esc(item.id) + '">' + opts + "</select>" +
      "</div>";
  }

  function cardHTML(item) {
    var priceHTML = item.price == null
      ? '<span class="card__price card__price--ask">Market price</span>'
      : '<span class="card__price">' + esc(priceLabel(item.price)) + "</span>";
    var badge = item.badge
      ? '<span class="card__badge ' + (item.badge.toLowerCase().indexOf("popular") >= 0 ? "card__badge--popular" : "") + '">' + esc(item.badge) + "</span>"
      : "";
    var img = assetPath(item.image || ("assets/svg/" + (item.icon || "taco.svg")));
    var iconFallback = assetPath("assets/svg/" + (item.icon || "taco.svg"));
    return '' +
      '<article class="card reveal" data-id="' + esc(item.id) + '" data-category="' + esc(item.category) + '">' +
        '<div class="card__media">' +
          badge +
          '<img class="card__photo" src="' + img + '" alt="' + esc(item.name) + '" loading="lazy" ' +
            "onerror=\"this.onerror=null;this.src='" + iconFallback + "';this.classList.add('is-fallback')\" />" +
        "</div>" +
        '<div class="card__body">' +
          '<div class="card__heading">' +
            '<h3 class="card__title">' + esc(item.name) + "</h3>" +
            priceHTML +
          "</div>" +
          '<p class="card__desc">' + esc(item.desc || "") + "</p>" +
          meatOptionsHTML(item) +
          '<div class="card__actions">' +
            '<div class="qty" data-qty="' + esc(item.id) + '">' +
              '<button type="button" data-step="dec" aria-label="Decrease quantity">−</button>' +
              "<span>1</span>" +
              '<button type="button" data-step="inc" aria-label="Increase quantity">+</button>' +
            "</div>" +
            '<button class="card__add" type="button" data-add-cart="' + esc(item.id) + '">Add to Cart</button>' +
          "</div>" +
        "</div>" +
      "</article>";
  }

  function renderMenu(activeCat) {
    var grid = $("#menu-grid");
    if (!grid) return;
    var list = activeCat === "all" ? MENU : MENU.filter(function (m) { return m.category === activeCat; });
    grid.innerHTML = list.map(cardHTML).join("");
    observeReveal(grid.querySelectorAll(".reveal"));
  }

  function renderTabs() {
    var tabs = $("#menu-tabs");
    if (!tabs) return;
    var all = [{ id: "all", label: "All" }].concat(CATEGORIES);
    tabs.innerHTML = all.map(function (c) {
      return '<button class="menu__tab ' + (c.id === DEFAULT_CATEGORY ? "is-active" : "") +
        '" role="tab" data-cat="' + esc(c.id) + '">' + esc(c.label) + "</button>";
    }).join("");

    tabs.addEventListener("click", function (e) {
      var tab = e.target.closest(".menu__tab");
      if (!tab) return;
      tabs.querySelectorAll(".menu__tab").forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
      renderMenu(tab.dataset.cat);
    });
  }

  function loadCart() {
    try {
      var parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(function (line) { return line && line.id && line.qty > 0; }) : [];
    } catch (err) {
      return [];
    }
  }
  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  function lineKey(id, meat) {
    return id + "::" + (meat || "");
  }
  function cartCount() {
    return cart.reduce(function (sum, line) { return sum + Number(line.qty || 0); }, 0);
  }
  function cartSubtotal() {
    return cart.reduce(function (sum, line) {
      return line.price == null ? sum : sum + (Number(line.price) * Number(line.qty || 0));
    }, 0);
  }
  function hasMarketPriceItem() {
    return cart.some(function (line) { return line.price == null; });
  }
  function addToCart(item, qty, meat) {
    var key = lineKey(item.id, meat);
    var existing = cart.find(function (line) { return line.key === key; });
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        key: key,
        id: item.id,
        name: item.name,
        price: item.price,
        meat: meat || "",
        qty: qty,
      });
    }
    saveCart();
    renderCart();
  }
  function changeCartQty(key, delta) {
    var line = cart.find(function (item) { return item.key === key; });
    if (!line) return;
    line.qty = Math.max(1, Number(line.qty || 1) + delta);
    saveCart();
    renderCart();
  }
  function removeCartLine(key) {
    cart = cart.filter(function (line) { return line.key !== key; });
    saveCart();
    renderCart();
  }

  function wireMenuQty() {
    var grid = $("#menu-grid");
    if (!grid) return;
    grid.addEventListener("click", function (e) {
      var step = e.target.closest("[data-step]");
      if (step) {
        var span = step.closest(".qty").querySelector("span");
        var v = parseInt(span.textContent, 10) || 1;
        v = step.dataset.step === "inc" ? v + 1 : Math.max(1, v - 1);
        span.textContent = v;
        return;
      }

      var add = e.target.closest("[data-add-cart]");
      if (!add) return;
      var card = add.closest(".card");
      var item = getMenuItem(add.getAttribute("data-add-cart"));
      if (!card || !item) return;
      var qtyNode = card.querySelector(".qty span");
      var meatNode = card.querySelector("[data-meat]");
      var qty = Math.max(1, parseInt(qtyNode && qtyNode.textContent, 10) || 1);
      var meat = meatNode ? meatNode.value : "";
      addToCart(item, qty, meat);
      if (qtyNode) qtyNode.textContent = "1";
      add.textContent = "Added";
      window.setTimeout(function () { add.textContent = "Add to Cart"; }, 900);
      openCart();
    });
  }

  /* ---------------- Cart drawer + static order handoff ---------------- */
  function renderCart() {
    var itemsHost = $("#cart-items");
    var empty = $("#cart-empty");
    var summary = $("#cart-summary");
    var subtotal = $("#cart-subtotal");
    var marketNote = $("#cart-market-note");
    var form = $("#cart-form");
    var count = $("#cart-count");
    if (count) count.textContent = cartCount();
    if (!itemsHost || !empty || !summary || !form) return;

    if (!cart.length) {
      itemsHost.innerHTML = "";
      empty.hidden = false;
      summary.hidden = true;
      form.hidden = true;
      return;
    }

    empty.hidden = true;
    summary.hidden = false;
    form.hidden = false;
    if (subtotal) subtotal.textContent = money(cartSubtotal());
    if (marketNote) marketNote.hidden = !hasMarketPriceItem();
    itemsHost.innerHTML = cart.map(function (line) {
      var linePrice = line.price == null ? "Market price" : money(Number(line.price) * Number(line.qty || 0));
      var unitPrice = line.price == null ? "Confirm price" : priceLabel(line.price) + " each";
      var meat = line.meat ? '<p class="cart-item__meta">Meat: ' + esc(line.meat) + "</p>" : "";
      return '' +
        '<article class="cart-item" data-cart-key="' + esc(line.key) + '">' +
          '<div class="cart-item__main">' +
            '<h3 class="cart-item__name">' + esc(line.name) + "</h3>" +
            meat +
            '<p class="cart-item__meta">' + esc(unitPrice) + "</p>" +
          "</div>" +
          '<div class="cart-item__side">' +
            '<strong class="cart-item__price">' + esc(linePrice) + "</strong>" +
            '<div class="cart-item__qty">' +
              '<button type="button" data-cart-step="-1" aria-label="Decrease ' + esc(line.name) + '">-</button>' +
              '<span>' + esc(line.qty) + "</span>" +
              '<button type="button" data-cart-step="1" aria-label="Increase ' + esc(line.name) + '">+</button>' +
            "</div>" +
            '<button class="cart-item__remove" type="button" data-cart-remove>Remove</button>' +
          "</div>" +
        "</article>";
    }).join("");
  }

  function openCart() {
    var drawer = $("#cart-drawer");
    var backdrop = $("#cart-backdrop");
    if (!drawer || !backdrop) return;
    renderCart();
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    backdrop.hidden = false;
    document.body.classList.add("cart-open");
  }
  function closeCart() {
    var drawer = $("#cart-drawer");
    var backdrop = $("#cart-backdrop");
    if (!drawer || !backdrop) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    backdrop.hidden = true;
    document.body.classList.remove("cart-open");
  }

  function orderBody(data) {
    var lines = cart.map(function (line) {
      var price = line.price == null ? "Market price" : money(Number(line.price) * Number(line.qty || 0));
      var meat = line.meat ? " | Meat: " + line.meat : "";
      return "- " + line.qty + " x " + line.name + meat + " | " + price;
    }).join("\n");
    return [
      "New online order request",
      "",
      "Name: " + data.name,
      "Phone: " + data.phone,
      data.note ? "Notes: " + data.note : "Notes: none",
      "",
      "Items:",
      lines,
      "",
      "Subtotal: " + money(cartSubtotal()) + (hasMarketPriceItem() ? " (market-price items not included)" : ""),
      "",
      "Square checkout is not connected yet. Please confirm pickup time and payment with the customer.",
    ].join("\n");
  }

  function initCart() {
    var openButton = $("#cart-nav");
    var closeButton = $("#cart-close");
    var backdrop = $("#cart-backdrop");
    var itemsHost = $("#cart-items");
    var form = $("#cart-form");
    var emptyLink = $(".cart-empty__link");
    if (openButton) openButton.addEventListener("click", openCart);
    if (closeButton) closeButton.addEventListener("click", closeCart);
    if (backdrop) backdrop.addEventListener("click", closeCart);
    if (emptyLink) emptyLink.addEventListener("click", closeCart);
    if (itemsHost) {
      itemsHost.addEventListener("click", function (e) {
        var item = e.target.closest(".cart-item");
        if (!item) return;
        var key = item.getAttribute("data-cart-key");
        var step = e.target.closest("[data-cart-step]");
        if (step) {
          changeCartQty(key, parseInt(step.getAttribute("data-cart-step"), 10) || 0);
          return;
        }
        if (e.target.closest("[data-cart-remove]")) removeCartLine(key);
      });
    }
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var status = $("#cart-status");
        if (!cart.length) {
          if (status) status.textContent = "Add at least one item first.";
          return;
        }
        var formData = new FormData(form);
        var data = {
          name: (formData.get("name") || "").toString().trim(),
          phone: (formData.get("phone") || "").toString().trim(),
          note: (formData.get("note") || "").toString().trim(),
        };
        if (!data.name || !data.phone) {
          if (status) status.textContent = "Please add a pickup name and phone number.";
          return;
        }
        window.location.href = "mailto:" + ORDER_EMAIL +
          "?subject=" + encodeURIComponent(ORDER_SUBJECT) +
          "&body=" + encodeURIComponent(orderBody(data));
        if (status) status.textContent = "Opening your email app to send the order request.";
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeCart();
    });
    renderCart();
  }

  /* ---------------- Location & Schedule ---------------- */
  var PIN_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z"/></svg>';
  var CLOCK_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.6 3.5 2-.9 1.6L11 13.5V7h2Z"/></svg>';

  function renderSchedule() {
    var demo = (CONFIG.liveLocation && CONFIG.liveLocation.demo) || {};
    var liveText = $("#schedule-live-text");
    if (liveText && demo.place) {
      liveText.innerHTML = "<strong>" + esc(demo.place) + "</strong> &middot; " +
        esc(demo.time || "11:00 AM – 8:00 PM") + " — follow us for day-of updates.";
    }
    var dir = $("#schedule-dir");
    if (dir) dir.href = demo.directionsUrl || "https://maps.app.goo.gl/4EtEffCJgcaSuRDr5";

    var grid = $("#schedule-grid");
    if (!grid) return;
    /* Static demo stops — easy for the client to swap later. */
    var stops = [
      { date: "Mon – Wed", place: "Downtown", addr: "100 W Main St, Marshall, MN", time: "11:00 AM – 8:00 PM" },
      { date: "Thursday", place: "Lakeside", addr: "Lakeside Park, Marshall, MN", time: "11:00 AM – 8:00 PM" },
      { date: "Fri – Sat", place: "Events", addr: "By appointment & local events", time: "Hours vary" },
      { date: "Sunday", place: "Catering", addr: "Private bookings only", time: "Book ahead" },
      { date: "Daily", place: "Call ahead", addr: "Large orders welcome", time: "507.706.3827" },
      { date: "Anytime", place: "Catering", addr: "Weddings · parties · corporate", time: "Get a quote" },
    ];
    stops.forEach(function (s) {
      var card = el("div", "stop");
      card.appendChild(el("div", "stop__date", esc(s.date)));
      card.appendChild(el("div", "stop__place", esc(s.place)));
      card.appendChild(el("div", "stop__dash"));
      card.appendChild(el("div", "stop__line", PIN_SVG + " " + esc(s.addr)));
      card.appendChild(el("div", "stop__line", CLOCK_SVG + " " + esc(s.time)));
      grid.appendChild(card);
    });
  }

  /* ---------------- Contact info + form ---------------- */
  var PHONE_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .57 3.6 1 1 0 0 1-.24 1Z"/></svg>';
  var MAIL_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4.2V18h16V8.2l-8 5-8-5ZM4 6l8 5 8-5Z"/></svg>';

  function renderContact() {
    var rows = $("#contact-rows");
    if (rows) {
      var phones = (CONFIG.business && CONFIG.business.phones) || [];
      phones.forEach(function (p) {
        var row = el("div", "contact__row");
        row.appendChild(el("div", "contact__ic", PHONE_SVG));
        var t = el("div");
        t.appendChild(el("div", "contact__rk", "Call / Text"));
        var v = el("a", "contact__rv", esc(p.label || p.tel));
        v.href = "tel:" + (p.tel || "");
        t.appendChild(v);
        row.appendChild(t);
        rows.appendChild(row);
      });
      /* Email row (uses the user's business email convention). */
      var emailRow = el("div", "contact__row");
      emailRow.appendChild(el("div", "contact__ic", MAIL_SVG));
      var et = el("div");
      et.appendChild(el("div", "contact__rk", "Email"));
      var ev = el("a", "contact__rv", "info@latapatiafoodtruck.com");
      ev.href = "mailto:info@latapatiafoodtruck.com";
      et.appendChild(ev);
      emailRow.appendChild(et);
      rows.appendChild(emailRow);
    }

    /* Form: Web3Forms if configured, else graceful mailto fallback. */
    var form = $("#contact-form");
    var note = $("#contact-note");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get("name") || "").toString().trim();
      var email = (data.get("email") || "").toString().trim();
      if (!name || !email) { if (note) note.textContent = "Please add your name and email."; return; }

      var subject = (data.get("subject") || "Message from the website").toString();
      var body = "Name: " + name + "\nEmail: " + email + "\n\n" + (data.get("message") || "");
      var phone = (CONFIG.callToOrderPhone && CONFIG.callToOrderPhone.label) || "507.706.3827";
      /* No backend in this sample — open the user's mail client (always works). */
      window.location.href = "mailto:info@latapatiafoodtruck.com?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      if (note) note.textContent = "Opening your email app… or call/text us at " + phone + ".";
    });
  }

  /* ---------------- Socials ---------------- */
  function socialGlyph(type) {
    return { fb: "f", ig: "IG", tt: "TT" }[type] || (type ? type.charAt(0).toUpperCase() : "•");
  }
  function renderSocials() {
    var socials = CONFIG.socials || [];
    ["#contact-socials", "#footer-socials"].forEach(function (sel) {
      var host = $(sel);
      if (!host) return;
      socials.forEach(function (s) {
        var a = el("a", "social-chip", esc(socialGlyph(s.type)));
        a.href = s.url || "#";
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute("aria-label", s.label || s.type || "Social link");
        host.appendChild(a);
      });
    });
  }

  /* ---------------- Mobile nav + active link ---------------- */
  function initNav() {
    var toggle = $("#nav-toggle");
    var nav = $("#topnav");
    var topbar = $(".topbar");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.querySelectorAll(".topnav__link").forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (topbar && topbar.contains(e.target)) return;
      close();
    });
    function updateScrolled() {
      document.body.classList.toggle("is-scrolled", window.scrollY > 12);
    }
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    var ids = ["menu", "schedule", "about", "contact"];
    var sections = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          nav.querySelectorAll(".topnav__link").forEach(function (a) {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { io.observe(s); });
    }
  }

  /* ---------------- Scroll reveal (shared; reused for dynamic cards) ---------------- */
  var revealIO;
  function observeReveal(nodes) {
    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-visible"); });
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
    }
    nodes.forEach(function (n) { revealIO.observe(n); });
  }

  /* ---------------- Boot ---------------- */
  function init() {
    document.documentElement.classList.remove("no-js");
    renderSpecials();
    renderTabs();
    renderMenu(DEFAULT_CATEGORY);
    wireMenuQty();
    renderSchedule();
    renderContact();
    renderSocials();
    initNav();
    initCart();
    observeReveal(document.querySelectorAll(".reveal"));
    var year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
