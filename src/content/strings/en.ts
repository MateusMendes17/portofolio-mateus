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
    hero: {
      badge: "Behind the Code",
      title: "About Me.",
      introBefore: "I am ",
      introAfter:
        ", a freelance web developer based in Portugal. I blend technical software engineering with modern design aesthetics to create websites, e-commerce stores, and digital tools that command authority and generate measurable results.",
    },
    methodology: {
      label: "Methodology",
      title: "How I create tangible value for your project",
      description:
        "Streamlined workflows, transparent communication, and dedicated craftsmanship.",
      pillars: [
        {
          number: "01",
          title: "Business-Driven Results",
          description:
            "A website shouldn't just look attractive — it must generate sales, attract high-value inquiries, and cement brand credibility. Every interface component is strategically built to convert.",
        },
        {
          number: "02",
          title: "Cutting-Edge Code & Zero Bloat",
          description:
            "I reject sluggish page builders and heavy generic themes. I engineer clean Next.js and TypeScript architecture, guaranteeing instant loading speeds (< 0.8 seconds).",
        },
        {
          number: "03",
          title: "Direct & Transparent Communication",
          description:
            "You talk directly with the engineer writing your code. Continuous updates, transparent milestones, and reliable delivery with zero hidden overhead.",
        },
        {
          number: "04",
          title: "Ongoing Support & Full Autonomy",
          description:
            "After launch, your brand is fully supported. I deliver full code ownership and hands-on guidance so you manage your content with complete independence.",
        },
      ],
    },
    cta: {
      title: "Have an idea or project in mind?",
      description:
        "Let's discuss your vision without obligation and define the best digital roadmap for your business.",
      secondary: "Explore All Services",
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
    availability: "Available for new projects in {year}",
    ctaTitle: "Ready to elevate your digital presence?",
    ctaDescription: "Let's discuss your goals and build a tailored solution.",
    cta: "Start a Conversation",
    tagline:
      "Professional web development focused on technical excellence, speed, and real business results.",
    location: "Lisbon, Portugal",
    responseTime: "Response within {time}",
    servicesTitle: "Services",
    services: [
      "Corporate Websites",
      "High-Converting Landing Pages",
      "Online Stores & E-Commerce",
      "Custom Web Applications",
      "SEO & Performance Optimization",
    ],
    navTitle: "Navigation",
    contactTitle: "Direct Contact",
    privacy: "Privacy Policy",
    madeWith: "Built with Next.js & Tailwind CSS",
    copyright: "© {year} Mateus Mendes. All rights reserved.",
  },

  notFound: {
    headline: "Page Not Found",
    description:
      "The page you are looking for does not exist or has been moved to another address.",
    backHome: "Back to home",
    contact: "Contact me",
    navLabel: "Error navigation",
  },

  backToTop: {
    label: "Back to top",
  },

  languageToggle: {
    switchToPortuguese: "Mudar idioma para Português",
    switchToEnglish: "Switch language to English",
    currentPt: "Português / English (Current: PT)",
    currentEn: "Português / English (Current: EN)",
  },

  mobileNav: {
    language: "Language",
    theme: "Theme",
  },

  stats: {
    clickToClose: "Click to close",
    clickToLearnMore: "Click to learn more",
    items: [
      {
        id: "speed",
        metric: "< 0.8s",
        label: "Lightning-Fast Loading",
        badge: "Performance",
        details:
          "Top scores on Google PageSpeed ensuring no visitor bounces due to slow loading times.",
      },
      {
        id: "custom",
        metric: "100%",
        label: "Tailor-Made Code",
        badge: "Quality",
        details:
          "No bloated templates or vulnerable plugins. Every line is hand-crafted for your business goals.",
      },
      {
        id: "response",
        metric: "< 24h",
        label: "Response Time",
        badge: "Communication",
        details:
          "Dedicated direct contact via WhatsApp, email, or scheduled call throughout the entire cycle.",
      },
      {
        id: "roi",
        metric: "100%",
        label: "Conversion Focus",
        badge: "Results",
        details:
          "Interfaces structured to turn passive visitors into engaged leads and loyal paying clients.",
      },
    ],
  },

  terminal: {
    badge: "Behind the Scenes & Rigor",
    title: "My Engineering Philosophy",
    description:
      "Inspect the engineering standards, methodology, and commitments applied to every line of code I craft for you.",
    path: "philosophy",
    copy: "Copy",
    copied: "✓ Copied",
    status: "Build succeeded — 0 errors",
    files: [
      {
        id: "valores",
        name: "principles.ts",
        language: "typescript",
        content: `// Engineering Philosophy — Mateus Mendes
export const engineeringPrinciples = {
  cleanCode: {
    zeroBloatware: true, // I reject sluggish templates and heavy page builders
    architecture: "Next.js 16 + TypeScript + Tailwind CSS",
    speedTarget: "< 0.8s initial page load",
  },
  clientRelationship: {
    middlemen: 0, // You speak directly with the engineer writing your code
    transparency: "Clear roadmap defined in private consultation with zero hidden fees",
    communication: "Direct channel open throughout the entire project",
  },
  ultimateGoal: "Deliver a revenue engine and undeniable digital authority for your brand.",
};`,
      },
      {
        id: "processo",
        name: "process.json",
        language: "json",
        content: `{
  "phase_01": {
    "name": "Diagnosis & Strategy",
    "goal": "Understand target audience and business objectives."
  },
  "phase_02": {
    "name": "UI/UX Design & Architecture",
    "goal": "Iterative design approval prior to writing production code."
  },
  "phase_03": {
    "name": "Development & Optimization",
    "goal": "Bespoke clean code, strict mobile tests, and top PageSpeed score."
  },
  "phase_04": {
    "name": "Deployment & Handover",
    "goal": "Production launch with SSL and complete client autonomy."
  }
}`,
      },
      {
        id: "garantias",
        name: "guarantees.md",
        language: "markdown",
        content: `# Commitments Upheld in Every Project

✓ 100% Full Code Ownership & Asset Handover upon completion
✓ Compliant Legal Invoicing according to regulations
✓ Deep Technical Google Search Engine Optimization (SEO)
✓ Rigorous responsiveness across iOS, Android, macOS & Windows
✓ Post-launch support and training for autonomous content management`,
      },
    ],
  },

  stackExplorer: {
    badge: "Interactive Explorer",
    title: "My Tech Stack & Business Value",
    description:
      "Click on any technology to inspect its real impact on your website speed, security, and revenue.",
    filters: {
      all: "All",
      backend: "Backend & Payments",
    },
    labels: {
      businessBenefit: "Business Benefit",
      appliedIn: "Applied In",
    },
    items: [
      {
        id: "nextjs",
        name: "Next.js 16 & React 19",
        category: "frontend",
        categoryLabel: "Frontend Architecture",
        tagline: "The gold standard for world-class web applications.",
        businessBenefit:
          "Server-side rendering (SSR) that positions your website at the top of Google searches and delivers instant sub-second page loads.",
        metric: "< 0.8s",
        metricLabel: "Load Speed Target",
        usedFor: "Brand websites, e-commerce stores, and high-traffic web platforms.",
      },
      {
        id: "typescript",
        name: "TypeScript",
        category: "frontend",
        categoryLabel: "Reliability & Code",
        tagline: "Robust, statically typed code free of runtime glitches.",
        businessBenefit:
          "Catches bugs before your customers ever encounter them, ensuring your website stays rock solid 24/7 without unexpected crashes.",
        metric: "99.9%",
        metricLabel: "Production Reliability",
        usedFor: "Every production application, guaranteeing long-term stability and maintainability.",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS v4 & Modern CSS",
        category: "frontend",
        categoryLabel: "Styling & Responsive UI",
        tagline: "Tailored UI design without legacy framework bloat.",
        businessBenefit:
          "Produces ultra-lean CSS and razor-sharp responsiveness, giving your site native app speed on every smartphone and desktop.",
        metric: "100%",
        metricLabel: "Responsive Fidelity",
        usedFor: "Fluid interfaces, dark/light modes, and custom bespoke design systems.",
      },
      {
        id: "motion",
        name: "Framer Motion & CSS Animations",
        category: "animation",
        categoryLabel: "Motion & Polish",
        tagline: "Delightful micro-interactions that captivate visitors.",
        businessBenefit:
          "Elevates standard static browsing into an engaging, polished journey that increases dwell time and conversion rates.",
        metric: "60 FPS",
        metricLabel: "Animation Smoothness",
        usedFor: "Page transitions, scroll-triggered reveals, and magnetic interactive buttons.",
      },
      {
        id: "threejs",
        name: "Three.js & Canvas 3D",
        category: "animation",
        categoryLabel: "Visual Experiences",
        tagline: "Interactive 3D graphics rendered directly in the browser.",
        businessBenefit:
          "Sets your brand unmistakably apart from competitors, signaling prestige and high-tech innovation.",
        metric: "WebGL",
        metricLabel: "Hardware Acceleration",
        usedFor: "Interactive 3D product previews, hero canvas visuals, and memorable experiences.",
      },
      {
        id: "payments",
        name: "Stripe & Portuguese Payments",
        category: "backend",
        categoryLabel: "Frictionless Checkout",
        tagline: "Zero-friction payment experience for local & global buyers.",
        businessBenefit:
          "Empowers clients to pay with their preferred payment methods (MB WAY, Multibanco, Apple Pay, Cards) without friction.",
        metric: "0 Friction",
        metricLabel: "Checkout Flow",
        usedFor: "Online stores, ticket sales, digital consulting, and product subscriptions.",
      },
      {
        id: "backend",
        name: "Node.js, PostgreSQL & Prisma",
        category: "backend",
        categoryLabel: "Databases & APIs",
        tagline: "Enterprise data security and lightning processing.",
        businessBenefit:
          "Secure encrypted storage for client data, orders, and inquiries with zero data loss.",
        metric: "A+",
        metricLabel: "Security Rating",
        usedFor: "User portals, client authentication, live dashboards, and internal automation.",
      },
      {
        id: "seo",
        name: "Technical SEO & Web Vitals",
        category: "seo",
        categoryLabel: "Google Optimization",
        tagline: "Engineered from the ground up for the Google search algorithm.",
        businessBenefit:
          "Dynamic metadata, XML sitemaps, Schema.org rich snippets, and 100/100 PageSpeed scores to dominate organic search.",
        metric: "100/100",
        metricLabel: "PageSpeed Target",
        usedFor: "All client websites to drive free high-intent organic visitors from Google.",
      },
    ],
  },

  quiz: {
    badge: "Interactive Project Assistant",
    title: "Find the Ideal Solution for Your Business",
    description:
      "Answer 3 quick questions to receive a tailored technical roadmap for your goals.",
    previousQuestion: "← Previous question",
    retake: "Retake quiz",
    includesTitle: "What this solution includes for your case:",
    discussSolution: "Discuss This Solution",
    exploreService: "Explore Service Details",
    resultsBadge: "Ideal Recommendation",
    questions: {
      goal: "1. What is your primary digital goal right now?",
      stage: "2. Where is your project currently at?",
      priority: "3. What do you value most in the final delivery?",
    },
    goalOptions: [
      {
        id: "authority",
        title: "Establish High-Authority Brand Presence",
        desc: "Project utmost credibility to prospective clients and partners.",
      },
      {
        id: "leads",
        title: "Generate Qualified Leads from Ads",
        desc: "Attract high-intent inquiries via Google and Meta advertising.",
      },
      {
        id: "ecommerce",
        title: "Sell Products Online 24/7",
        desc: "Modern store with frictionless checkout and catalog management.",
      },
      {
        id: "webapp",
        title: "Automate Workflows with a Web App",
        desc: "Client portals, secure authentication, or internal dashboards.",
      },
    ],
    stageOptions: [
      {
        id: "idea",
        title: "I Only Have the Idea",
        desc: "I need end-to-end guidance, including UX architecture and strategy.",
      },
      {
        id: "ready",
        title: "Branding & Content Ready",
        desc: "I already have brand assets, copywriting, and media ready to launch.",
      },
      {
        id: "redesign",
        title: "Existing Site to Overhaul",
        desc: "I have an existing website that is slow, dated, or underperforming.",
      },
    ],
    priorityOptions: [
      {
        id: "speed",
        title: "Speed & Google SEO",
        desc: "Instant load times engineered to rank at the top of Google searches.",
      },
      {
        id: "design",
        title: "Prestige Design & Wow Factor",
        desc: "Sleek micro-interactions and refined aesthetics that leave a lasting mark.",
      },
      {
        id: "mobile",
        title: "Mobile First & Zero Friction",
        desc: "Seamless smartphone experience and effortless inquiry flows.",
      },
    ],
    results: {
      ecommerce: {
        title: "Custom E-Commerce & Online Store",
        description:
          "To sell with confidence and maximize revenue, a modern high-performance e-commerce platform with zero-friction checkout and secure payment integrations is the best strategy.",
        highlights: [
          "Streamlined single-page checkout without friction",
          "Integrated card, Apple Pay, Google Pay & local payments",
          "Intuitive backend dashboard for orders and inventory",
          "Ultra-fast architecture driving sustained conversions",
        ],
      },
      leads: {
        title: "High-Converting Landing Page",
        description:
          "If your priority is lead generation through paid advertising (Google Ads / Meta), a surgically structured landing page with focused conversion funnels is the most profitable choice.",
        highlights: [
          "Persuasive copywriting and direct call-to-action flow",
          "Sub-second loading speeds maximizing ad budget ROI",
          "Instant WhatsApp and contact form integration",
          "Configured tracking pixels and conversion analytics",
        ],
      },
      webapp: {
        title: "Custom Web Application & Portal",
        description:
          "To automate manual processes or offer a dedicated client portal, a custom TypeScript web app with secure authentication and modern cloud database is the ultimate solution.",
        highlights: [
          "Private member area with encrypted authentication",
          "Real-time dashboards and interactive analytics",
          "Seamless integration with 3rd-party APIs and CRM",
          "Scalable cloud architecture built to expand",
        ],
      },
      website: {
        title: "High-Performance Brand Website",
        description:
          "Showcase your company with undeniable market authority. An elegant, rapid, and Google-optimized website that turns casual traffic into loyal clientele.",
        highlights: [
          "Exclusive visual design tailored to your brand identity",
          "Full technical search engine optimization (Google SEO)",
          "Flawless responsive experience across mobile & desktop",
          "User-friendly CMS for effortless content updates",
        ],
      },
    },
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
    startConversation: "Start a Conversation",
  },
} as const;

export default en;
