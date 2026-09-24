
const SITE = {

  
  name:    "Your Name",
  nameJa:  "あなたの名前",          // shown small beneath the name
  role:    "Designer & Front-end Developer",
  location:"Tokyo, Japan",
  hanko:   "YN",                    // 1–2 characters for the red seal

  /* ── Photo ────────────────────────────────────────────── */
  // Replace "photo.jpg" with your own file (same folder as index.html)
  photo:     "photo.jpg",
  photoAlt:  "Portrait of Your Name",
  photoNote: "撮影 ・ Tokyo",       // small caption on the photo card

  /* ── Hero ─────────────────────────────────────────────── */
  intro: "I design and build calm, considered interfaces — mostly for small teams who care about craft. Currently open to select freelance projects.",

  /* ── About ────────────────────────────────────────────── */
  about: {
    title:   "About",
    titleJa: "私について",
    // First paragraph is styled larger (lead paragraph)
    paragraphs: [
      "I've spent the last eight years moving between design and front-end, which means I care equally about how a thing looks and how it behaves.",
      "My work tends to be quiet: generous whitespace, clear type, and interactions that feel obvious in hindsight. I like small details that reward attention rather than demand it.",
      "Outside of work I'm usually cycling, reading, or slowly learning to cook properly."
    ]
  },

  /* ── Work ─────────────────────────────────────────────── */
  work: {
    title:   "Selected work",
    titleJa: "作品",
    note:    "A few projects I'm happy with. More available on request.",
    items: [
      {
        num:   "一",
        title: "Hana — booking platform",
        desc:  "End-to-end design and front-end build for a boutique studio booking tool.",
        year:  "2024",
        url:   "#"
      },
      {
        num:   "二",
        title: "Kōgei — craft marketplace",
        desc:  "Design system and storefront for a Japanese craft marketplace.",
        year:  "2023",
        url:   "#"
      },
      {
        num:   "三",
        title: "Mori — personal finance",
        desc:  "Product design for a calm, non-judgmental budgeting app.",
        year:  "2023",
        url:   "#"
      },
      {
        num:   "四",
        title: "Sora — airline rebrand",
        desc:  "Visual identity and web presence for a regional airline.",
        year:  "2022",
        url:   "#"
      }
    ]
  },

  /* ── Contact ──────────────────────────────────────────── */
  contact: {
    lead:  "The fastest way to reach me is email. I read everything and reply to most things.",
    email: "hello@example.com",
    links: [
      { label: "GitHub",   url: "https://github.com/yourname" },
      { label: "Twitter",  url: "https://twitter.com/yourname" },
      { label: "LinkedIn", url: "https://linkedin.com/in/yourname" }
    ]
  },

  /* ── Footer ───────────────────────────────────────────── */
  footer: {
    line: "© 2025 Your Name. All rights reserved.",
    meta: "Made with care in Tokyo"
  }
};