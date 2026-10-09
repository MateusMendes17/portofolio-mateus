/* ============================================================
   Strings en-US — Mateus Mendes Portfolio
   English translations matching pt.ts shape for seamless i18n.
   ============================================================ */

import type { Strings } from "./pt";

const en: Strings = {
  meta: {
    siteName: "Mateus Mendes — Web Developer",
    siteDescription:
      "Professional web development for businesses and independent professionals in Portugal & Europe. Websites, e-commerce, web apps, and maintenance.",
    ogImageAlt: "Mateus Mendes — Freelance Web Developer",
  },

  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",
    cta: "Talk to Me",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },

  hero: {
    greeting: "Hi, I'm Mateus.",
    headline: "I build web experiences that turn visitors into loyal clients.",
    description:
      "Freelance web developer specialized in modern websites, online stores, and custom web applications for ambitious businesses.",
    cta: "Start a Conversation",
    secondaryCta: "View Projects",
  },

  servicesPreview: {
    sectionLabel: "Services",
    title: "Tailored solutions for your business",
    description:
      "Every project is unique. I develop bespoke web solutions crafted for your specific goals and audience.",
    cta: "View all services",
  },

  featuredProjects: {
    sectionLabel: "Projects",
    title: "Featured Work",
    description: "A selection of projects showcasing technical excellence and modern design.",
    cta: "View all projects",
    conceptBadge: "Concept Project",
    viewProject: "View project",
  },

  aboutPreview: {
    sectionLabel: "About me",
    title: "Who's behind the code",
    description:
      "I am a passionate web developer creating digital experiences that make a difference. I prioritize clear communication, reliable deadlines, and obsessive attention to detail.",
    cta: "Learn more about me",
  },

  processPreview: {
    sectionLabel: "Process",
    title: "How I Work",
    steps: [
      {
        title: "Discovery",
        description: "We discuss your vision, business model, and requirements in depth.",
      },
      {
        title: "Architecture",
        description: "I outline visual structure, user journeys, and technical roadmap.",
      },
      {
        title: "Development",
        description: "Clean Next.js & TypeScript code with speed and Google SEO built in.",
      },
      {
        title: "Launch",
        description: "We deploy with full ownership, speed verification, and dedicated support.",
      },
    ],
  },

  ctaSection: {
    title: "Ready to bring your project to life?",
    description:
      "Let's discuss how I can help your business grow and stand out online.",
    cta: "Start a Conversation",
    secondaryCta: "Send email",
  },

  about: {
    sectionLabel: "About me",
    title: "Mateus Mendes",
    subtitle: "Freelance Web Developer",
    bio: [
      "I am a freelance web developer helping businesses and professionals establish a commanding digital presence. My focus is on creating fast, accessible, and conversion-oriented websites.",
      "A great website isn't just visually stunning — it must be lightning fast, responsive, and engineered to drive measurable results.",
      "When I'm not coding, I'm exploring new technologies, refining user interface design, or contributing to open-source software.",
    ],
    values: {
      title: "Core Values",
      items: [
        {
          title: "Transparent Communication",
          description:
            "Direct communication with no technical jargon or hidden surprises.",
        },
        {
          title: "Rigorous Delivery",
          description:
            "Realistic timelines, meticulous planning, and proactive updates.",
        },
        {
          title: "Detail & Craftsmanship",
          description:
            "From pixel perfection to Core Web Vitals, every aspect is crafted with pride.",
        },
      ],
    },
    stack: {
      title: "Technologies & Stack",
      description:
        "I select modern, high-performance tools for each project. Here are the core technologies I use:",
      categories: [
        {
          name: "Frontend",
          items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        },
        {
          name: "Backend",
          items: ["Node.js", "Express", "PostgreSQL", "Prisma", "REST APIs"],
        },
        {
          name: "Tools",
          items: ["Git", "VS Code", "Figma", "Vercel", "Docker"],
        },
      ],
    },
    photoAlt: "Photograph of Mateus Mendes",
  },

  services: {
    sectionLabel: "Services",
    title: "How I can elevate your business",
    subtitle:
      "Comprehensive web solutions from strategic conception to high-performance launch and support.",
    items: [
      {
        id: "site-institucional",
        title: "Corporate Websites",
        description:
          "High-prestige corporate websites tailored to your brand, conveying instant credibility and trust.",
        icon: "building",
        features: [
          "Bespoke modern responsive design",
          "Engineered for Google SEO",
          "Interactive multi-step contact form",
          "Google Analytics 4 setup",
          "Intuitive CMS for autonomy",
        ],
        startingPrice: 800,
      },
      {
        id: "landing-page",
        title: "High-Converting Landing Pages",
        description:
          "Laser-focused pages designed for paid advertising campaigns with rapid conversion mechanics.",
        icon: "rocket",
        features: [
          "Conversion-centered psychology",
          "Ultra-fast loading speed (< 1s)",
          "A/B testing ready architecture",
          "Marketing pixel integration",
          "WhatsApp direct click-to-chat",
        ],
        startingPrice: 500,
      },
      {
        id: "loja-online",
        title: "Online Stores & E-Commerce",
        description:
          "Custom e-commerce platforms with smooth checkout, Portuguese & international payment gateways.",
        icon: "shoppingBag",
        features: [
          "Dynamic product catalog with filters",
          "One-page secure checkout",
          "Real-time stock management",
          "MB WAY, Multibanco & Stripe integration",
          "Automated transactional emails",
        ],
        startingPrice: 2000,
      },
      {
        id: "web-app",
        title: "Custom Web Applications",
        description:
          "Bespoke SaaS and dashboards that streamline operations and offer digital products directly to users.",
        icon: "code",
        features: [
          "Custom user interfaces and UX",
          "Secure authentication and roles",
          "REST APIs and database models",
          "Analytics and reporting dashboards",
          "Lightweight scalable architecture",
        ],
        startingPrice: 3000,
      },
      {
        id: "manutencao",
        title: "Redesign & Maintenance",
        description:
          "Keep your website secure, blazing fast, and up to date with dedicated technical support.",
        icon: "wrench",
        features: [
          "Security patches and updates",
          "Continuous uptime monitoring",
          "Core Web Vitals optimization",
          "Bug fixes and feature additions",
          "Direct priority assistance",
        ],
        startingPrice: 100,
      },
    ],
    process: {
      title: "Development Process",
      description: "A clear, transparent journey from first contact to online launch.",
      steps: [
        {
          number: 1,
          title: "Initial Consultation",
          description:
            "We explore your business goals, target audience, and project scope without obligation.",
          icon: "messageCircle",
        },
        {
          number: 2,
          title: "Strategy & Proposal",
          description:
            "I provide a clear proposal with scope, features, and tailored roadmap.",
          icon: "fileText",
        },
        {
          number: 3,
          title: "Visual Architecture",
          description:
            "Interactive previews and structure approved before programming begins.",
          icon: "palette",
        },
        {
          number: 4,
          title: "Programming & QA",
          description:
            "Built with Next.js & TypeScript, tested thoroughly across phones, tablets, and desktops.",
          icon: "code",
        },
        {
          number: 5,
          title: "Launch & Walkthrough",
          description:
            "Live deployment with SSL, Google SEO, and a video walkthrough for effortless content updates.",
          icon: "checkCircle",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "Do I need to have all texts and branding ready?",
          answer:
            "Not necessarily. If you have them, that's great! If not, I will guide you on structure and help curate high-quality visual assets.",
        },
        {
          question: "Can I update the website content myself?",
          answer:
            "Yes, absolutely. All corporate sites and stores include an intuitive content management system with video training.",
        },
        {
          question: "What if I need updates after launch?",
          answer:
            "Minor adjustments post-launch are included. For new features or expansions, we plan implementation together.",
        },
        {
          question: "Do you work with international clients?",
          answer:
            "Yes, I collaborate remotely with clients worldwide via video calls, email, and WhatsApp.",
        },
      ],
    },
    cta: "Start a conversation",
    pricePrefix: "Starting from",
  },

  projects: {
    sectionLabel: "Projects",
    title: "My Work",
    subtitle:
      "A selection of corporate websites, online stores, landing pages, and web apps built for performance.",
    filterAll: "All",
    conceptBadge: "Featured Work",
    viewProject: "View details",
    detail: {
      backLink: "Back to projects",
      objective: "Objective",
      role: "My role",
      stack: "Technologies",
      challenge: "Challenge",
      solution: "Solution",
      result: "Result",
      screenshots: "Screenshots",
      conceptNotice:
        "This is a demonstration project created to showcase technical excellence.",
      nextProject: "Next Project",
      ctaTitle: "Liked what you saw?",
      ctaDescription:
        "I can build something tailored for your business. Let's talk about your project.",
      ctaCta: "Start a Conversation",
    },
  },

  contact: {
    sectionLabel: "Contact",
    title: "Let's Work Together",
    subtitle:
      "Have a project in mind? Fill in the form or reach out directly.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "email@example.com",
      projectType: "Project type",
      budget: "Project details",
      message: "Message",
      messagePlaceholder: "Describe your project, vision, and requirements...",
      consent:
        "I authorize the processing of my personal data for contact purposes, in accordance with the Privacy Policy.",
      submit: "Send Message",
      sending: "Sending...",
      successTitle: "Message sent!",
      successMessage:
        "Thank you for reaching out. I will be in touch shortly.",
      errorTitle: "Error sending",
      errorMessage:
        "An error occurred while sending your message. Please try again or contact me directly by email.",
    },
    direct: {
      title: "Direct Contact",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      linkedinLabel: "LinkedIn",
      responseLabel: "Response time",
    },
  },

  footer: {
    copyright: `© ${new Date().getFullYear()} Mateus Mendes. All rights reserved.`,
    privacy: "Privacy Policy",
    madeWith: "Crafted with",
    inPortugal: "in Portugal",
  },

  notFound: {
    title: "404",
    headline: "Page Not Found",
    description: "The page you are looking for does not exist or has been moved.",
    cta: "Back to Home",
  },

  privacy: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: October 2026",
  },

  common: {
    learnMore: "Learn more",
    viewAll: "View all",
    loading: "Loading...",
    scrollDown: "Scroll down",
  },
} as const;

export default en;
