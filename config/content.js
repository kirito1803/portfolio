/* ============================================================
   CONTENT CONFIG - all text, links and images shown on the site.
   Leave an "image" empty ("") to show the built-in chip drawing.
   Image paths are relative to index.html, e.g. "assets/me.jpg".
   ============================================================ */
window.SITE = {
  brand: "Thai Minh Nhat",
  pageTitle: "Thai Minh Nhat | Embedded Software Engineer",

  nav: [
    { label: "About",    href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact",  href: "#contact" }
  ],

  hero: {
    role: "Embedded Software Engineer",
    title: "Hello, my name is Nhat",
    text: "Mechatronics engineering student building firmware, IoT devices and test tooling. I care about validation: making hardware behave the way the spec says it should.",
    image: "",
    buttons: [
      { label: "Projects", href: "#projects", style: "primary" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/nhatwork1803", style: "outline" }
    ]
  },

  about: {
    title: "About me",
    text: "Final-year Mechatronics Engineering student at HCMUT in Ho Chi Minh City, with about 1.5 years of independent R&D work on IoT projects. Replace this text with your own story: the stack you use, what you test, what you want to build next.",
    image: "",
    button: { label: "Resume", href: "assets/ThaiMinhNhat_CV.pdf" }
  },

  projects: {
    title: "What I've built and done",
    buttonLabel: "View More",
    // "id" is used by project.html?id=... You can instead set "link"
    // to any page you like (e.g. "projects/shelf-scale.html").
    items: [
      {
        id: "wireless-shelf-scale",
        name: "Smart Shelf Scale System",
        description: "Developed a wireless multi-scale weighing system for warehouse shelves and mobile pallets. Implemented multiplexed sensor management and a custom communication protocol with encryption, acknowledgments, and fault handling.",
        type: "Embedded / IoT",
        image: "../assets/smartScaleAvatar.png",
        link: "wireless-shelf-scale.html"
      },
      {
        id: "some-of-my-researches",
        name: "Some Of My Researches",
        description: "One or two sentences: the MCU, the RTOS or bare-metal approach, and what you validated.",
        type: "Reinforcement Learning / Machine Learning",
        image: "../assets/RL_4_1_intersection.png",
        link: "some-of-my-researches.html"
      },
      {
        id: "toeic-cert",
        name: "My TOEIC Certificate",
        description: "A small proof of my English proficiency. I can read and write technical documents in English, and can communicate with foreign colleagues.",
        type: "English Proficiency",
        image: "../assets/TOEIC_cert.jpg",
        link: "toeic-cert.html"
      }
    ]
  },

  contact: {
    title: "Send me a message",
    email: "you@example.com",           // the form opens the visitor's mail app addressed to this
    labels: { name: "Name", email: "Email", message: "Message", send: "Send" },
    // icon must be one of: github, linkedin, mail
    socials: [
      { icon: "github",   label: "GitHub",   url: "https://github.com/your-name" },
      { icon: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/nhatwork1803" },
      { icon: "mail",     label: "Email",    url: "mailto:you@example.com" }
    ]
  },

  footer: "© 2026 Valk. All rights reserved.",

  // Shown on project.html when a project has no detail content yet
  projectPage: {
    backLabel: "Back to projects",
    emptyText: "Project details will be added here."
  }
};