/* =========================================================
   config.js - Sample Two handoff settings
   Edit business info, social links, phone number, and demo location here.
   This sample is browse-only and uses phone/email links instead of checkout.
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

  liveLocation: {
    demo: {
      enabled: true,
      place: "Today in Downtown Marshall",
      time: "2:00 PM - 8:00 PM",
      directionsUrl: "https://maps.app.goo.gl/4EtEffCJgcaSuRDr5",
    },
  },
};
