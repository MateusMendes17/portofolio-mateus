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
    jobTitle: "Freelance Web Developer",
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
    tagline: "Web Development",
  },

  home: {
    hero: {
      availability: "Available for New Projects",
      titleBefore: "Websites & Digital Solutions",
      titleAccent: "Engineered for Growth",
      subtitle:
        "Bespoke development with clean code, sub-second speeds, and direct communication.",
      ctaPrimary: "Get in Touch",
      ctaSecondary: "View Projects",
    },
    metrics: {
      sectionHeading: "Quality in numbers",
      speed: {
        unit: "Load time",
        title: "Lightning Fast Loading",
        description:
          "Zero visitor drop-off from slow pages. Certified top scores on Google Core Web Vitals.",
        widgetLabel: "Score Google",
      },
      code: {
        badge: "Zero Bloat",
        unit: "Bespoke",
        title: "Tailor-Made Code",
        description:
          "No sluggish generic WordPress templates or builder bloat. Written cleanly from scratch.",
      },
      direct: {
        badge: "Direct Contact",
        unit: "Middlemen",
        title: "Direct Dialogue",
        description:
          "Speak directly with the software engineer creating your website. Rapid same-day updates.",
        widgetChat: "1-on-1 Dialogue",
        widgetCall: "WhatsApp & Calls",
      },
      seo: {
        unit: "Google Reach",
        title: "Google SEO by Default",
        description:
          "Schema.org rich snippets, XML sitemaps, and semantic tags engineered to attract clients.",
        widgetPosition: "★ Top Posição",
      },
    },
    servicesPreview: {
      badge: "Specialized Services",
      title: "Crafted for Real Business Growth",
      description:
        "Bespoke digital architecture tailored to turn visitors into inquiries and clients.",
      viewAll: "Explore all services",
      items: [
        {
          badge: "High Conversion",
          subtitle: "Design & SEO",
          title: "Websites & Landing Pages",
          description:
            "Unique bespoke design, lightning load speeds (< 1s), and complete mobile and Google SEO optimization.",
          metricLabel: "Performance Guaranteed",
          metricValue: "Score 100/100 PageSpeed",
          tags: ["Next.js", "Tailwind CSS", "Google SEO", "Framer Motion"],
          action: "Build My Website",
        },
        {
          badge: "Automated Sales",
          subtitle: "Frictionless Checkout",
          title: "Online Stores & E-Commerce",
          description:
            "Full-featured e-commerce platforms with integrated payments (Cards, Apple Pay, MB WAY) and seamless order management.",
          metricLabel: "Secure Checkout",
          metricValue: "Stripe • Local Payments • Invoicing",
          tags: ["E-Commerce", "Stripe", "Fast Checkout", "Catalog Management"],
          action: "Launch My Online Store",
          previewStatus: "Order Approved",
          previewConfirmed: "Confirmed",
        },
        {
          badge: "Custom Software",
          subtitle: "Workflows & Automation",
          title: "Web Applications & Portals",
          description:
            "Custom web software, interactive dashboards, and client portals that automate manual operations and save your team countless hours.",
          metricLabel: "Modern Architecture",
          metricValue: "TypeScript & Cloud Databases",
          tags: ["TypeScript", "Databases", "Authentication", "Dashboards"],
          action: "Discuss Custom Solution",
          previewScalable: "Scalable Traffic",
        },
      ],
    },
    featuredProjects: {
      badge: "Selected Case Studies",
      title: "Recent Projects & Measurable Results",
      description:
        "Discover how clean code and strategic digital design generated real business impact.",
      viewAll: "View all portfolio projects",
    },
    aboutPreview: {
      badge: "Why Work With Me",
      title: "Direct Engineering, Zero Fluff, Total Accountability",
      description:
        "When you hire me, you don't get routed to account managers or outsourced teams. You get a dedicated technical partner.",
      pillars: [
        {
          num: "01",
          title: "Direct Contact",
          desc: "Talk directly with the engineer building your platform via WhatsApp, email, or scheduled call.",
        },
        {
          num: "02",
          title: "Full Code Ownership",
          desc: "100% of source code, domains, and credentials are completely yours upon completion.",
        },
        {
          num: "03",
          title: "Legal Tax Compliance",
          desc: "Every project is legally invoiced with official tax compliance under Portuguese and EU standards.",
        },
      ],
      footerNote: "Want to inspect my code standards and technical philosophy?",
      footerLink: "Read about Mateus & methodology",
    },
    quizTeaser: {
      badge: "Interactive Solution Finder",
      title: "Unsure what digital solution your business needs?",
      description:
        "Answer 3 quick questions in our interactive advisor to discover the most effective roadmap for your goals and budget.",
      cta: "Start Solution Quiz",
    },
    ctaSection: {
      badge: "Let's Build Together",
      title: "Ready to elevate your digital presence?",
      description:
        "Let's discuss your project goals without any obligation. Contact me via form, scheduled call, or direct message.",
      whatsappMessage:
        "Hello Mateus, I saw your portfolio and would like to talk about a project!",
      whatsappCta: "Chat on WhatsApp",
    },
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
    badge: "Web Development Services",
    title: "Services.",
    description:
      "From high-converting landing pages to prestigious corporate websites and custom e-commerce platforms. Every project is crafted with clean code, sub-second speed, and meticulous attention to detail.",
    labels: {
      businessImpact: "Business Impact",
      recommendedFor: "Recommended for:",
      discussService: "Discuss this Service",
      deliverables: "Deliverables & Capabilities",
      includedStandard: "Included as Standard",
      techStack: "Key Technologies",
    },
    items: [
      {
        id: "websites",
        title: "High-Prestige Corporate Websites",
        badge: "Enterprises & Business",
        tagline: "Present your business with commanding authority.",
        description:
          "I design bespoke, high-performance corporate websites tailored to your brand identity. Engineered to foster immediate trust with prospective clients and position your firm ahead of the competition.",
        includes: [
          "100% bespoke design customized to your brand colors and visual identity",
          "Fully responsive (flawless on smartphones, tablets, and desktops)",
          "Comprehensive Google SEO optimization with structured microdata",
          "Intuitive content management dashboard to update texts and articles independently",
          "Interactive multi-step contact form with real-time email notifications",
          "Seamless WhatsApp, Google Maps, and social media integration",
          "Compliant legal pages (Terms & Privacy Policy conforming to GDPR)",
        ],
        businessImpact:
          "Projects authority, technical prestige, and trust from the first second, converting visitors into qualified corporate inquiries.",
        techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO Schema.org"],
        idealFor:
          "SMEs, law firms, consultants, medical clinics, real estate agencies, and premium service providers.",
      },
      {
        id: "landing-pages",
        title: "High-Converting Landing Pages",
        badge: "Lead Gen & Paid Traffic",
        tagline: "Laser-focused pages built to turn advertising clicks into paying clients.",
        description:
          "Surgically crafted landing pages for advertising campaigns across Google Ads, Meta Ads, or LinkedIn. Built with conversion copywriting and instant loading to maximize return on ad spend.",
        includes: [
          "Conversion-centered layout hierarchy with persuasive action-driven copy",
          "Sub-second load times maximizing ad quality score and reducing bounce rate",
          "Dynamic lead capture forms and floating WhatsApp click-to-chat",
          "Conversion tracking setup (Google Tag Manager, Meta Pixel, Google Analytics 4)",
          "Thorough mobile usability testing across smartphone screen sizes",
          "Structured social proof, verified client reviews, and risk-reversal guarantees",
        ],
        businessImpact:
          "Lowers cost-per-lead (CPL) and maximizes return on advertising investment (ROAS).",
        techStack: ["Next.js", "React 19", "Tailwind CSS", "Google Tag Manager", "Meta Pixel"],
        idealFor:
          "Product launches, lead generation for events/courses, service professionals, and seasonal promotions.",
      },
      {
        id: "lojas-online",
        title: "Bespoke Online Stores & E-Commerce",
        badge: "Automated 24/7 Sales",
        tagline: "Sell your products with Portuguese & international payments in a friction-free checkout.",
        description:
          "Complete, robust, and intuitive e-commerce platforms equipped with Portuguese customer payment favorites (MB WAY & Multibanco) and international credit cards.",
        includes: [
          "Seamless national and international payments (MB WAY, Multibanco, Cards, Stripe)",
          "Streamlined product catalog, inventory alerts, variants, and order fulfillment",
          "One-page optimized checkout architecture reducing cart abandonment",
          "Elegant automated transactional emails for order confirmations and dispatch",
          "Configurable shipping tier calculation and postal zone rates",
          "Full SSL encryption and PCI banking security for client peace of mind",
        ],
        businessImpact:
          "Boosts conversion rates through familiar payment channels and automates order fulfillment.",
        techStack: ["Next.js E-Commerce", "Stripe API", "MB WAY / Multibanco", "PostgreSQL", "Tailwind CSS"],
        idealFor:
          "Apparel brands, artisanal crafts, retail, digital products, and businesses scaling online.",
      },
      {
        id: "web-apps",
        title: "Custom Web Applications & Portals",
        badge: "Automation & Internal Systems",
        tagline: "Tailored web software that streamlines operations and solves complex workflows.",
        description:
          "Custom web systems that replace chaotic spreadsheets or legacy software with a centralized, modern interface. Analytics dashboards, customer client portals, and operational business tools.",
        includes: [
          "Secure user authentication with role-based permission tiers",
          "Analytical dashboards with real-time graphs and automated KPI reports",
          "Database integration and third-party APIs (invoicing, CRM, calendars)",
          "Universal data export capabilities (PDF, CSV, Excel)",
          "Cloud-scalable serverless architecture with end-to-end data encryption",
        ],
        businessImpact:
          "Saves hours of weekly manual work for your team and centralizes business intelligence in one secure hub.",
        techStack: ["Next.js App Router", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "Auth.js"],
        idealFor:
          "Startups, businesses with heavy manual workflows, membership communities, and scaling companies.",
      },
      {
        id: "manutencao",
        title: "Redesign, Speed Optimization & Support",
        badge: "Maintenance & Evolution",
        tagline: "Keep your online presence blazing fast, secure, and continuously evolving.",
        description:
          "Have an outdated or slow website? I transform it into a modern, instant-loading platform, or manage ongoing maintenance so you never have to worry about downtime or security vulnerabilities.",
        includes: [
          "Comprehensive audit covering performance, security, and Core Web Vitals",
          "Modern visual redesign aligned with current aesthetic benchmarks",
          "Extreme asset and code optimization for instant page loads",
          "Automated off-site backups and 24/7 uptime monitoring",
          "Continuous security patch deployment and vulnerability mitigation",
        ],
        businessImpact:
          "Provides total peace of mind, eliminates downtime revenue loss, and keeps your brand digitally competitive.",
        techStack: ["Web Vitals Auditing", "Next.js Migration", "Code Refactoring", "Security Patches"],
        idealFor:
          "Businesses with existing sites looking to modernize or outsource technical management with confidence.",
      },
    ],
    standards: {
      badge: "Engineering Standards",
      title: "Guarantees built into every solution",
      description:
        "Regardless of the solution selected, all projects adhere strictly to high-standard benchmarks.",
      items: [
        {
          id: "ownership",
          title: "100% Code Ownership",
          description:
            "All source code, domains, and access credentials belong entirely to you. No hidden lock-in fees or hostage files.",
        },
        {
          id: "speed",
          title: "Instant Speed (< 1s)",
          description:
            "Sub-second Core Web Vitals with server-side rendering. Every second saved translates to higher conversion rates and Google rankings.",
        },
        {
          id: "seo",
          title: "Native Google SEO Architecture",
          description:
            "HTML5 semantic structure, Schema.org microdata, Open Graph social share tags, and dynamic sitemaps configured from day one.",
        },
        {
          id: "cms",
          title: "Effortless Content Autonomy",
          description:
            "Intuitive administration dashboard allowing any team member to update texts, products, or photos without touching code.",
        },
        {
          id: "mobile",
          title: "Flawless Mobile Experience",
          description:
            "Engineered with a mobile-first philosophy, meticulously tested across iPhone, Android, tablet, and desktop viewports.",
        },
        {
          id: "invoicing",
          title: "Compliant Invoicing & Direct Support",
          description:
            "Official legal invoicing with direct communication and guidance from the developer who engineered your platform.",
        },
      ],
    },
    process: {
      badge: "Transparent Workflow",
      title: "How we collaborate step-by-step",
      steps: [
        {
          step: "01",
          title: "Diagnosis & Discovery",
          desc: "We discuss in a call or chat to deeply understand your business model, target audience, and key goals.",
        },
        {
          step: "02",
          title: "Visual Architecture & Scope",
          desc: "I outline the visual blueprints and navigation flows for your feedback before development begins.",
        },
        {
          step: "03",
          title: "Development & Rigorous QA",
          desc: "Engineered with Next.js and TypeScript, backed by rigorous mobile compatibility, security, and performance testing.",
        },
        {
          step: "04",
          title: "Launch & Walkthrough",
          desc: "Live deployment with domain, SSL, and Google SEO, accompanied by video guidance for independent content management.",
        },
      ],
    },
    faq: {
      badge: "Questions & Answers",
      title: "Common questions clarified",
      items: [
        {
          q: "Do I need to have all texts, logos, and photos ready before starting?",
          a: "Not necessarily. If you already have brand materials, that is great! If not, I guide you on structure and assist in selecting high-resolution visuals aligned with your niche.",
        },
        {
          q: "Will I be able to edit texts and add products independently later?",
          a: "Yes, absolutely. All corporate sites and stores include a clean CMS dashboard where you can edit content and upload imagery without touching any code.",
        },
        {
          q: "How do we communicate throughout project development?",
          a: "Communication is direct with Mateus through your preferred channel (WhatsApp, email, or video call). You receive continuous updates and private preview links.",
        },
        {
          q: "Is the website compliant with GDPR and secure?",
          a: "Yes. Every website includes HTTPS SSL certificates, explicit cookie consent, and standard European GDPR-compliant privacy documentation.",
        },
      ],
    },
    cta: {
      title: "Ready to build your solution?",
      description:
        "Reach out directly. We will evaluate your goals and outline the perfect strategy.",
    },
  },

  projects: {
    badge: "Portfolio & Selected Works",
    title: "Projects.",
    description:
      "A curated selection of corporate websites, e-commerce platforms, high-converting landing pages, and web apps. Every project blends modern aesthetics, maximum speed, and measurable business goals.",
    pills: [
      "100% Bespoke Design",
      "Performance < 1s",
      "Native Google SEO",
      "100% Responsive",
    ],
    highlights: {
      badge: "Quality Commitment",
      title: "Rigorous standards in every delivery",
      description:
        "Every website is built to the highest benchmarks of speed, semantic structure, and conversion UX.",
      items: [
        {
          id: "design",
          title: "100% Bespoke Design",
          description:
            "Every project features a distinct visual identity, rejecting generic off-the-shelf templates.",
        },
        {
          id: "speed",
          title: "Performance & Speed",
          description:
            "Engineered with Next.js to guarantee sub-second load times and top Google Core Web Vitals.",
        },
        {
          id: "seo",
          title: "Native Google SEO",
          description:
            "Semantic architecture and structured schema metadata ensuring high search engine visibility.",
        },
        {
          id: "mobile",
          title: "Mobile-First Experience",
          description:
            "Effortless and fluid navigation across all viewports, from smartphones to ultrawide monitors.",
        },
      ],
    },
    process: {
      badge: "Creation Process",
      title: "How each project comes to life",
      description:
        "No bureaucratic friction. You collaborate directly with me from the first draft to online deployment.",
      steps: [
        {
          step: "01",
          title: "Strategy & Architecture",
          desc: "Target audience mapping, information architecture, and defining clear business goals.",
        },
        {
          step: "02",
          title: "Design & Interactivity",
          desc: "Crafting a distinctive, modern UI with polished micro-interactions that elevate brand perception.",
        },
        {
          step: "03",
          title: "Clean Code & Launch",
          desc: "Development with Next.js, cross-device testing, SEO markup, speed optimization, and handover.",
        },
      ],
    },
    cta: {
      badge: "New Project",
      title: "Have an idea or need to elevate your digital presence?",
      description:
        "Let's discuss your project privately and delineate the perfect roadmap for your brand.",
      secondary: "Explore Services",
    },
    grid: {
      filters: {
        all: "All",
        institucional: "Corporate",
        lojaOnline: "Online Store",
        landingPage: "Landing Page",
        webApp: "Web App / SaaS",
      },
      showing: "Showing {count} project{s}",
      empty: "No projects found in this category.",
      featured: "Featured",
      viewCaseStudy: "View Case Study",
    },
  },

  projectDetail: {
    clientLabel: "Client",
    previewLabel: "Interface Preview",
    previewDescription:
      "Engineered with modern frontend architecture, focus on conversion UX, and enterprise-grade performance.",
    impactLabel: "Measurable Impact",
    challengeTitle: "The Challenge",
    solutionTitle: "The Solution",
    featuresBadge: "Architecture & Specifications",
    featuresTitle: "Key Features Implemented",
    previous: "Previous",
    next: "Next",
    allProjects: "All Projects",
    ctaTitle: "Looking for a tailored solution for your business?",
    ctaDescription: "Let's discuss your project in detail and craft the optimal proposal.",
  },

  contact: {
    badge: "Start a Project",
    title: "Contact.",
    description:
      "Have an idea, need a high-converting website for your brand, or want to overhaul an existing platform? Fill in the form or reach out directly.",
    channelsTitle: "Direct Channels",
    emailLabel: "Direct Email",
    emailNote: "Guaranteed same-day response",
    whatsappLabel: "Professional WhatsApp",
    whatsappNote: "Ideal for quick questions & voice notes",
    locationLabel: "Location",
    location: "Lisbon, Portugal",
    locationNote: "Working with clients across Portugal & worldwide",
    networksLabel: "Networks & Profiles",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "How does the first contact work?",
        a: "We speak directly via call or message to thoroughly understand your goals and technical scope.",
      },
      {
        q: "Will I have full ownership of the website?",
        a: "Yes, 100% of source code, domain assets, and administrative access are handed over to you.",
      },
      {
        q: "Do you issue official tax invoices?",
        a: "Yes, every service is legally invoiced with official tax compliance according to Portuguese law.",
      },
    ],
    form: {
      steps: {
        phase: "Phase {current} of 3",
        titles: ["1. Project Type", "2. Contact Preference", "3. Your Details & Message"],
        goToPhase: "Go to Phase {step}",
      },
      projectTypes: [
        {
          id: "site-institucional",
          title: "Brand Website",
          badge: "Business & Corporate",
          description:
            "Present your company with authority, elegance, and build deep trust with prospective clients.",
        },
        {
          id: "landing-page",
          title: "High-Converting Landing Page",
          badge: "Lead Generation",
          description:
            "Laser-focused page designed for advertising campaigns (Google/Meta) and direct lead acquisition.",
        },
        {
          id: "loja-online",
          title: "E-Commerce & Online Store",
          badge: "24/7 Sales",
          description:
            "Complete digital store with multi-currency payments, seamless checkout, and inventory management.",
        },
        {
          id: "web-app",
          title: "Custom Web App & Portal",
          badge: "Automation & Systems",
          description:
            "Advanced web portals, customer login dashboards, and internal business process automation.",
        },
        {
          id: "manutencao-redesign",
          title: "Redesign, Speed & Support",
          badge: "Modernization",
          description:
            "Modernize an existing website, boost loading speeds (SEO), or retain ongoing technical engineering.",
        },
        {
          id: "outro",
          title: "Other Project Type",
          badge: "Custom",
          description: "Have a unique idea or bespoke specification? Describe it directly.",
        },
      ],
      contactPreferences: [
        {
          id: "chamada",
          title: "Phone Call",
          desc: "Direct telephone conversation for rapid alignment and answering questions.",
        },
        {
          id: "whatsapp",
          title: "WhatsApp",
          desc: "Quick instant messaging, voice notes, and easy sharing of visual references.",
        },
        {
          id: "email",
          title: "Email",
          desc: "Formal written communication with detailed proposal sent directly to your inbox.",
        },
        {
          id: "outro",
          title: "Other Medium",
          desc: "Video conference (Google Meet / Teams) or another platform of your choice.",
        },
      ],
      featureTags: [
        "Exclusive UI/UX Design",
        "Google SEO Optimization",
        "Secure Card & Local Payments",
        "Content Management System (CMS)",
        "Member Area / User Login",
        "Direct WhatsApp Integration",
        "Fluid Motion & Micro-interactions",
        "Multilingual Support (PT / EN)",
        "CRM & Email Integration",
        "Sub-Second Instant Loading",
      ],
      errors: {
        selectProjectType: "Please select the project type you need.",
        describeProjectType: "Please briefly describe the intended project type.",
        selectContactPreference: "Please select your preferred communication channel.",
        specifyContactPreference: "Please specify your preferred medium.",
        submitSuccessFallback: "Thank you for reaching out! We will be in touch shortly.",
        submitErrorFallback:
          "An error occurred while sending. You can also contact directly via WhatsApp.",
        networkError:
          "Could not connect to the server. Please send a direct message via WhatsApp or email.",
      },
      otherPrefix: "Other: ",
      success: {
        title: "Message Received!",
        thanksBefore: "Thank you, ",
        thanksAfter: ". I have registered your inquiry regarding ",
        contactBefore: "I will reach out via ",
        contactAfter:
          " as promptly as possible to discuss your project in detail.",
        whatsappMessage:
          "Hello Mateus, I just sent an inquiry on your website about {project}!",
        whatsappCta: "Chat Now on WhatsApp",
        sendAnother: "Send another message",
      },
      step1: {
        title: "What does your business need?",
        description: "Select the option that best matches your project goals.",
        otherLabel: "Describe your project:",
        otherPlaceholder:
          "E.g.: Online booking system, custom blog, technical consulting...",
        next: "Proceed to Contact Preference",
      },
      step2: {
        title: "How do you prefer to discuss the project?",
        description:
          "Select the most convenient channel for us to align and clarify questions.",
        preferenceLabel: "Communication Preference",
        otherLabel: "Specify your preferred medium:",
        otherPlaceholder: "E.g.: Google Meet video call, Telegram, etc.",
        featuresLabel: "Relevant Features (Optional)",
        featuresHint: "Select any that apply",
        back: "← Back to Project Type",
        next: "Proceed to Your Details",
      },
      step3: {
        title: "Where can I reach you?",
        description: "Provide your contact information so we can get in touch.",
        summaryTitle: "Your selection summary:",
        summaryEdit: "Edit selection",
        summaryPreference: "Preference:",
        summaryFeatures: "features selected",
        nameLabel: "Your Name or Company",
        namePlaceholder: "E.g.: Sarah Jenkins or Acme Ltd",
        emailLabel: "Email Address",
        emailPlaceholder: "email@example.com",
        phoneLabel: "Phone Number / WhatsApp",
        phoneRequired: "* (Required for the selected preference)",
        phoneOptional: "(Optional)",
        phonePlaceholder: "E.g.: +351 917 810 763",
        messageLabel: "Tell me about your project & goals",
        messagePlaceholder:
          "Share a bit about your business, the desired results, and any visual or functional references you have...",
        consentBefore:
          "I authorize data handling strictly to respond to this request, in accordance with the ",
        consentLink: "Privacy Policy",
        back: "← Back to Contact Preference",
        submitting: "Sending...",
        submit: "Send Message",
      },
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

  whatsappFloat: {
    aria: "Message me on WhatsApp",
  },

  command: {
    open: "Quick search",
    openAria: "Open quick search (Ctrl+K)",
    placeholder: "Search pages, projects, actions…",
    sections: {
      navigation: "Navigation",
      projects: "Projects",
      actions: "Actions",
    },
    actions: {
      theme: "Toggle theme (light / dark)",
      language: "Toggle language (PT / EN)",
      copyEmail: "Copy email address",
      copied: "Copied!",
      whatsapp: "Message on WhatsApp",
      github: "Open GitHub",
      linkedin: "Open LinkedIn",
    },
    empty: "No results for",
    hintSelect: "Select",
    hintClose: "Close",
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
    sectionHeading: "My work in numbers",
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
    backHome: "← Back to home page",
    title: "Privacy Policy & GDPR",
    lastUpdatedPrefix: "Last updated:",
    controller: {
      heading: "1. Data Controller",
      beforeName:
        "The data controller responsible for personal information collected through this website is",
      afterName: ", with direct contact at",
    },
    collectedData: {
      heading: "2. Collected Data & Purpose",
      intro:
        "Information collected via the contact form (name, email address, phone/WhatsApp, project type, communication preference, and message) is strictly used to:",
      list: [
        "Respond directly to inquiries and provide technical consultations;",
        "Deliver tailored proposals for requested digital development services;",
        "Schedule alignment calls or introductory meetings with the user.",
      ],
      neverBefore: "Your personal details are",
      neverStrong: "never",
      neverAfter:
        "sold, rented, or distributed to 3rd parties for advertising or unauthorized uses.",
    },
    legalBasis: {
      heading: "3. Legal Basis for Processing",
      body: "Data processing is grounded upon explicit consent granted by the user when submitting the contact inquiry form (Article 6(1)(a) of the General Data Protection Regulation — GDPR).",
    },
    retention: {
      heading: "4. Data Retention",
      body: "Personal records are retained only for the duration required to address your consultation and support commercial communications, after which they are safely purged.",
    },
    rights: {
      heading: "5. User Rights",
      beforeLink:
        "Under GDPR legislation, you hold the right to access, rectify, or request deletion of your stored details at any moment by sending a request to",
    },
    cookies: {
      heading: "6. Cookies & Local Storage",
      body: "This website does not deploy invasive tracking or advertising cookies. It strictly utilizes localStorage to retain your interface preferences (Theme & Language selection). Aggregated, anonymous usage statistics are powered by Vercel Analytics, which collects no personal data and sets no tracking cookies.",
    },
  },

  common: {
    startConversation: "Start a Conversation",
  },
} as const;

export default en;
