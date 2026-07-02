/* =========================================================
   config.js - Sample Two handoff settings
   Edit business info, social links, phone number, and demo location here.
   This sample has a front-end cart. Square checkout can replace the
   orderRequest settings once POS API credentials are ready.
   ========================================================= */

window.LT_CONFIG = {
  business: {
    name: "La Tapatia Food Truck",
    city: "Marshall, MN",
    tagline: "Autentico Mexican Street Food",
    phones: [
      { label: "507.706.3827", tel: "+15077063827" },
      { label: "346.499.1100", tel: "+13464991100" },
    ],
  },

  socials: [
    { type: "fb", label: "Facebook", url: "https://www.facebook.com/profile.php?id=61586679835886" },
    { type: "ig", label: "Instagram", url: "https://www.instagram.com/" },
    { type: "tt", label: "TikTok", url: "https://www.tiktok.com/" },
  ],

  callToOrderPhone: { label: "507.706.3827", tel: "+15077063827" },
  orderRequest: {
    email: "info@latapatiafoodtruck.com",
    subject: "New online order request - La Tapatia Food Truck",
  },

  /* Square checkout backend.
     - apiBaseUrl: where the checkout server (server/index.js) is reachable.
       Leave empty ("") to disable online payment and use the email
       (mailto) order handoff instead.
       Local testing: "http://localhost:4242"
       Production: your deployed server URL, e.g. "https://checkout.latapatiafoodtruck.com"
     When enabled, the cart's "Send Order" button starts a Square-hosted
     checkout instead of opening the visitor's email app. */
  checkout: {
    apiBaseUrl: "http://localhost:4242",
  },

  liveLocation: {
    demo: {
      enabled: true,
      place: "Today in Downtown Marshall",
      time: "2:00 PM - 8:00 PM",
      directionsUrl: "https://maps.app.goo.gl/4EtEffCJgcaSuRDr5",
    },
  },
};
