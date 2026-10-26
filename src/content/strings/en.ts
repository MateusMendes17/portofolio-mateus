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
    testimonials: {
      badge: "What Clients Say",
      title: "Trust Built Project by Project",
      items: [
        {
          quote: "Mateus completely revolutionized our digital presence. We transitioned from an outdated website to a benchmark in our sector. Clients consistently praise the quality of our new platform.",
          author: "Dr. Ricardo Silva",
          role: "Managing Partner",
          company: "Silva & Associates",
        },
        {
          quote: "The online store exceeded all expectations. The checkout with MB WAY and Multibanco is flawless and the dashboard saves us hours every week. Highly recommended.",
          author: "Ana Martins",
          role: "Founder",
          company: "Green Harvest",
        },
        {
          quote: "We needed a Google Ads landing page that actually converted. The result was a dramatic drop in cost per lead and a conversion rate substantially above industry benchmarks.",
          author: "Dr. João Costa",
          role: "Clinical Director",
          company: "Sorrir Dental Clinic",
        },
      ],
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
    badge: "Published portfolio",
    title: "Projects.",
    description:
      "Eight published sites, built end to end as case studies. Fictional brands, real decisions: structure, typography, interaction and code.",
    pills: [
      "Published sites",
      "Original code",
      "Accessibility considered",
      "PT/EN when it matters",
    ],
    highlights: {
      badge: "Criteria",
      title: "What stays the same across every project",
      description:
        "There is no single template. There is a method: understand the context, choose the smallest useful stack, and treat interface as part of the content.",
      items: [
        {
          id: "design",
          title: "Identity before template",
          description:
            "Every brand has its own voice, type and palette. The layout grows from the content, not from a purchased theme.",
        },
        {
          id: "speed",
          title: "Controlled weight",
          description:
            "Light pages, compressed images and JavaScript only where it adds interaction. The smallest stack that fits each project, not the most popular one.",
        },
        {
          id: "seo",
          title: "Semantics and focus",
          description:
            "Headings with hierarchy, landmarks, visible focus and keyboard navigation. Accessibility is not a layer added at the end.",
        },
        {
          id: "mobile",
          title: "Responsive for real",
          description:
            "The mobile experience is not a reduced version. Menus, forms and content were designed for small screens.",
        },
      ],
    },
    process: {
      badge: "Process",
      title: "How each project takes shape",
      description:
        "From the first sketch to the published site, without intermediaries and with documented decisions.",
      steps: [
        {
          step: "01",
          title: "Context & structure",
          desc: "Define the problem, the essential information and the architecture before drawing.",
        },
        {
          step: "02",
          title: "Identity & interaction",
          desc: "Type, colour, grid and the gestures that make the brand recognisable.",
        },
        {
          step: "03",
          title: "Code & publish",
          desc: "Build with the right stack, test with keyboard and mobile, measure and publish.",
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
      index: "Index",
      projectCount: "{count} published projects",
      jumpTo: "Jump to project",
      coverAlt: "Homepage of {name}",
      openSite: "Open site",
      published: "Published",
      allProjects: "All",
    },
  },

  projectDetail: {
    labels: {
      brief: "Brief",
      decisions: "Decisions",
      build: "Build",
      accessibility: "Accessibility & performance",
      specs: "Project sheet",
      type: "Format",
      status: "Status",
      published: "Published",
      stack: "Stack",
      site: "Site",
      code: "Code",
      privateCode: "Private repository",
      role: "Role",
      roleValue: "Design and development",
      openSite: "Open site",
      viewCode: "View code",
      allProjects: "All projects",
      previous: "Previous",
      next: "Next",
      backToProjects: "Back to projects",
      disclaimer: "Portfolio project. Fictional brand and data.",
      coverAlt: "Homepage of {name}",
      metricsNote:
        "No Lighthouse score published. Verification was done in the browser, with keyboard, visible focus and reduced motion.",
      nextStep: "Next step",
      breadcrumb: "Breadcrumb",
      pagination: "Project navigation",
      newWindow: "opens in a new window",
      ctaTitle: "Looking for a tailored solution for your business?",
      ctaDescription:
        "Let's discuss your project in detail and craft the optimal proposal.",
    },
    studies: {
      "torra-lusa": {
        sector: "Specialty coffee",
        location: "Porto",
        format: "Multi-page online store",
        summary:
          "A specialty coffee shop that treats buying coffee as part of the ritual: origin, grind, freshness and subscriptions explained without hurry.",
        brief: [
          "The starting point was a fictional roastery in Porto with a simple idea: sell coffee without turning the experience into a list of SKUs. The site had to present origins, blends, capsules, equipment and packs, while also explaining how the coffee is roasted and how it reaches the cup.",
          "The brief asked for a complete shop — search, cart, checkout and legal pages — with an editorial voice that did not feel like a generic store. The brand, products and data are fictional; the exercise was to build the whole system.",
        ],
        decisions: [
          {
            title: "A shop with its own pace",
            text: "Warm paper, brown and caramel, Fraunces for headlines and DM Sans for text. The grid breathes and coffee photography takes the space that discount banners usually occupy.",
          },
          {
            title: "Choose before buying",
            text: "A short quiz suggests coffee by brewing method and flavour profile; product pages show origin, process, tasting notes and roast date. The goal was to reduce doubt without hiding information.",
          },
          {
            title: "Quiet cart, clear checkout",
            text: "Quick add opens a side cart with totals and shipping; checkout separates delivery, payment and confirmation. Empty states and error messages are written in plain Portuguese.",
          },
        ],
        build: [
          "A multi-page HTML, CSS and modular JavaScript site, with header, footer, cart and shared components injected from ES modules.",
          "Catalogue with search, category and grind filters, product pages, subscriptions, FAQ, shipping, terms and privacy pages.",
          "Cart persisted in `localStorage`, demonstrative checkout, order confirmation, newsletter and cookie consent. Images were converted to WebP.",
        ],
        accessibility: [
          "The mobile menu and cart trap focus while open and return it to the button that opened them. Controls have labels, `aria-expanded` and field-level error states.",
          "Animations respect `prefers-reduced-motion` and the site keeps a simple heading hierarchy. Product and checkout pages were checked with a keyboard.",
        ],
        nextStep:
          "Connect checkout to a real payment provider and review error states with screen readers.",
      },
      "cota-zero": {
        sector: "Architecture",
        location: "Porto",
        format: "Multi-page studio portfolio",
        summary:
          "An architecture studio presenting six works, process and materials with the precision of a technical drawing — without turning the portfolio into a silent gallery.",
        brief: [
          "Cota Zero is a fictional architecture studio in Porto with six projects and a practice centred on renovation and new build. The site had to show the studio, process, materials and project sheets without diluting its identity into an architecture template.",
          "The brief asked for a strong, navigable graphic language: a project index, filters, an interactive plan and project pages with concrete data. The content and projects are invented for the exercise.",
        ],
        decisions: [
          {
            title: "Typography as a plan",
            text: "Archivo Black for the wordmark, JetBrains Mono for data and a palette of paper, ink and signal orange. Grid lines replace cards and shadows.",
          },
          {
            title: "Plan mode",
            text: "The “Planta” button overlays a measuring grid with dimensions and axes. It is an identity gesture, but also a way to explain the studio's logic.",
          },
          {
            title: "Index before image",
            text: "Works appear first as a typographic table with year, type and location; photography arrives later on dedicated pages. The visitor understands the whole before opening a single work.",
          },
        ],
        build: [
          "Ten HTML/CSS/JS pages with ES modules for navigation, intro, counters, filters, plan overlay and project pages. Concrete, corten, wood, stone, brick and glass textures are local SVGs.",
          "Project index with filters, project sheets generated from data and an overlay plan with focus management and `inert` on the background content.",
          "Local WOFF2 fonts, WebP images with size variants and a shared component system. JavaScript loads only the modules needed by the current page.",
        ],
        accessibility: [
          "The plan overlay and mobile menu use `inert` to remove the background from the focus order, return focus to the trigger and respond to Esc. Motion is reduced when `prefers-reduced-motion` is active.",
          "Links have visible focus and headings follow the content hierarchy. Project images have descriptive alternative text.",
        ],
        nextStep:
          "Audit caption contrast over the textures and document the plan overlay shortcuts.",
      },
      "mendes-valadares": {
        sector: "Law",
        location: "Lisbon",
        format: "Multi-page corporate site",
        summary:
          "A Lisbon law firm that explains the work before asking for contact: practice areas, team, fees, articles and frequently asked questions.",
        brief: [
          "Mendes Valadares & Associados is a fictional Lisbon law firm founded in 2008. The site had to convey rigour and proximity without falling into the distant tone of many legal websites.",
          "The brief included eight practice areas, five lawyers, articles, contacts, FAQs and information about fees. The brand and data are fictional; the exercise was to organise a lot of information without hiding it behind jargon.",
        ],
        decisions: [
          {
            title: "Azulejo and deep blue",
            text: "The identity draws on Lisbon tiles and office blue, with bronze details. DM Sans at medium weights keeps the text readable and avoids the obvious legal serif.",
          },
          {
            title: "Numbers that guide",
            text: "Sections are numbered like a process: practice areas, team, about, articles, contact. The “Atendimento aberto” status is calculated in the browser using Lisbon time.",
          },
          {
            title: "Explain before the form",
            text: "Each practice area has a sheet with example questions, the team has profiles and articles answer concrete doubts. Contact comes after the information, not before it.",
          },
        ],
        build: [
          "Eleven HTML/CSS/JS pages with header, footer, practice areas, team and articles generated from shared data.",
          "Native modals for practice areas and team, FAQ accordions, tabs, opening status, reading progress, a map loaded after consent and a contact form.",
          "Local WOFF2 fonts, WebP images and a reusable interface component set. JavaScript is modular and framework-free.",
        ],
        accessibility: [
          "Dialogs use native `<dialog>` with contained focus and return to the trigger; the mobile menu and cookie banner manage focus and Esc. There is a skip link, visible focus and `prefers-reduced-motion`.",
          "Content images have alternative text and sections keep a stable heading hierarchy. The contact form has labels and associated error messages.",
        ],
        nextStep:
          "Review the legal copy and test the form against a real email service.",
      },
      "barbearia-sete-colinas": {
        sector: "Barbershop",
        location: "Lisbon",
        format: "Single-page landing page",
        summary:
          "A neighbourhood barbershop in Lisbon with a service menu, gallery, team and a booking flow that fits into one scroll.",
        brief: [
          "Barbearia Sete Colinas is a fictional shop on Rua da Madalena in Lisbon. The site had to feel like a real place: dark wood, brass, leather chairs and a team with names.",
          "The brief was a single page with services and prices, gallery, team, testimonials and booking. Visitors should be able to book without leaving the page or creating an account.",
        ],
        decisions: [
          {
            title: "Dark, but not heavy",
            text: "Charcoal, brass and warm photography. Inter at large sizes gives the hero presence without competing with the image.",
          },
          {
            title: "The menu is the argument",
            text: "Services appear with price, duration and a “Marcar” button that pre-selects the service in the form. Practical information sits above decoration.",
          },
          {
            title: "Layered booking",
            text: "The form asks for name, phone, barber, service, date and time; it validates fields, shows a summary and offers WhatsApp confirmation. Open/closed status is calculated from the schedule.",
          },
        ],
        build: [
          "A single HTML/CSS/JS page with no dependencies, fixed navigation, scroll reveals, counters, a lightbox gallery and testimonial carousel.",
          "Booking form with phone mask, available times by day, client-side validation and a summary before submission. Submission is demonstrative.",
          "WebP images at multiple widths, local WOFF2 fonts, a manifest and social metadata. JavaScript is split into independent blocks.",
        ],
        accessibility: [
          "The mobile menu and lightbox manage focus and close with Esc; fields have labels, error messages and `aria-invalid` states. Animations and the carousel stop when `prefers-reduced-motion` is active.",
          "Navigation has visible focus and the gallery can be browsed without a mouse. Form errors stay next to their fields instead of being summarised far from context.",
        ],
        nextStep:
          "Connect the form to a real booking service and test WhatsApp confirmation on a phone.",
      },
      lumina: {
        sector: "Restaurant",
        location: "Lisbon",
        format: "Multi-route React application",
        summary:
          "A contemporary restaurant in Lisbon with a tasting menu, nine dishes with individual pages, a wine list, gallery and reservations.",
        brief: [
          "Lumina is a fictional contemporary restaurant in Lisbon. The site had to sell an experience: a dark dining room, author dishes and a menu that reads like a journey.",
          "The brief asked for a menu, individual pages for each dish, a wine list, gallery, story, reservations and a bilingual PT/EN version. The brand, dishes and demonstration photography are fictional.",
        ],
        decisions: [
          {
            title: "The room before the menu",
            text: "The hero is a backlit photograph of the dining room, with a serif title and a single CTA. The menu arrives afterwards as a continuation of the experience.",
          },
          {
            title: "Every dish has a page",
            text: "The nine dishes have their own route with image, description and details. The wine list is a separate list, not a PDF.",
          },
          {
            title: "Frictionless reservation",
            text: "The reservation form asks for date, time, party size and contact; the date picker and error states prevent incomplete submissions.",
          },
        ],
        build: [
          "A React 18 application with Vite, React Router and Tailwind CSS. Routes include home, about, gallery, wine list, nine dishes and legal pages.",
          "Dish and wine data in dedicated modules; PT/EN language context; reservation form with date picker and validation; back-to-top button and opening status.",
          "Vite build with hashed assets, images in `public/` and compiled CSS. The print menu has a dedicated stylesheet.",
        ],
        accessibility: [
          "The application uses landmarks, section headings and labels on reservation fields. Light-on-dark contrast over photography was checked in the browser.",
          "There is no dedicated `prefers-reduced-motion` variant yet; CSS transitions remain as a next step.",
        ],
        nextStep:
          "Add a reduced-motion variant and consolidate the display font with a local fallback.",
      },
      dentilusa: {
        sector: "Dental clinic",
        location: "Lisbon",
        format: "Multi-page corporate site",
        summary:
          "A Lisbon dental clinic that explains treatments, prices and what happens at each appointment — with a long booking form that is carefully guided.",
        brief: [
          "DentiLusa is a fictional clinic near Marquês de Pombal. The site had to reduce dental anxiety: explain before treating, show the team and make clear what it costs and what happens at the first appointment.",
          "The brief included ten treatments, prices, team, FAQs, emergencies and booking. The brand, professionals and data are fictional.",
        ],
        decisions: [
          {
            title: "Clinical blue, not cold",
            text: "Deep blue, ivory and the Fraunces serif for headings. Clinic photography is used as context, not as stock proof.",
          },
          {
            title: "Explaining fear",
            text: "A dedicated section answers anxious patients: every step is explained, they can ask for a pause and the first appointment is just to meet. The FAQ covers pain, time and prices.",
          },
          {
            title: "Price and process in view",
            text: "Treatments have short descriptions and anchors; the homepage shows indicative prices, payment options and emergency care. The form asks for the appointment type and preferred doctor.",
          },
        ],
        build: [
          "Four HTML/CSS/JS pages with treatments, team and prices generated from data; scrollspy navigation, open/closed status and a back-to-top button.",
          "Booking form with validation, time generation, summary and draft saved in `localStorage`; FAQ accordion, testimonial carousel and cookie consent.",
          "Google fonts with a local fallback, WebP images, metadata and a manifest. JavaScript is vanilla and organised by page modules.",
        ],
        accessibility: [
          "Form fields have labels, contextual help, error messages and `aria-invalid`; focus is visible and keyboard navigation covers treatments and FAQ. Animations respect `prefers-reduced-motion`.",
          "The treatment page uses anchors with their own headings and the FAQ announces open/closed state. The long form is split into blocks to avoid overwhelming the screen.",
        ],
        nextStep:
          "Test the form against a real booking service and review message length limits.",
      },
      aqualis: {
        sector: "Plumbing",
        location: "Lisbon",
        format: "Service site with dedicated pages",
        summary:
          "A Lisbon plumbing company that treats urgency as the product: visible phone number, fixed price, 60-minute arrival and a 12-month guarantee.",
        brief: [
          "AquaLis is a fictional plumbing brand in Lisbon and the surrounding area. The site had to convert on mobile, often in an emergency, without promising what it cannot deliver.",
          "The brief included seven services with dedicated pages, areas, indicative prices, testimonials, FAQs, a postcode checker and a quote request. The brand and data are fictional.",
        ],
        decisions: [
          {
            title: "Phone first",
            text: "The 24h number appears in the top bar, hero and footer; the orange “Ligar agora” button is the primary CTA. Orange signals urgency rather than decoration.",
          },
          {
            title: "Price before the form",
            text: "The page shows indicative prices, what is included and how the quote is calculated. The form asks for municipality, service, urgency, a description and an optional photo.",
          },
          {
            title: "Local proof",
            text: "Service areas, testimonials and a four-step process answer the doubts of someone looking for a local plumber. The Google map only loads after consent.",
          },
        ],
        build: [
          "A homepage and seven service pages in HTML/CSS/JS, with services, prices, areas and testimonials in shared modules.",
          "Postcode area checker, quote form with validation and photo upload, testimonial carousel, FAQ accordion and availability indicator.",
          "Local WOFF2 fonts, optimised images, cookie preferences and conditional map loading. JavaScript is vanilla and dependency-free.",
        ],
        accessibility: [
          "The mobile menu, cookie banner and accordions manage focus and `aria-expanded` states; fields have labels, help text and associated errors. Animations and counters respect `prefers-reduced-motion`.",
          "The map loads only after consent, which also avoids unnecessary third-party requests. Service navigation keeps visible focus and a predictable heading order.",
        ],
        nextStep:
          "Review indicative prices against real data and test photo upload on a server.",
      },
      forja: {
        sector: "Gym",
        location: "Braga",
        format: "Multi-page site",
        summary:
          "A gym in Braga with nine class formats, a weekly schedule, plans, trainers and a trial class — all with the voice of a workshop, not a fitness app.",
        brief: [
          "FORJA Training Club is a fictional gym in Braga founded in 2017. The site had to show that training is supervised and that there is a plan for people who have never trained or are starting again.",
          "The brief included schedule, classes, plans, trainers, facilities, contact, FAQs and trial class booking. The brand, trainers and data are fictional.",
        ],
        decisions: [
          {
            title: "A workshop, not an app",
            text: "Graphite black, deep blue and Anton in uppercase. The visual language comes from tools, signs and workshop schedules; blue marks action and state.",
          },
          {
            title: "Schedule as the centrepiece",
            text: "The weekly grid shows classes, levels and trainers; each class has its own page. Visitors can filter by day and format.",
          },
          {
            title: "Plans without small print",
            text: "The three plans show price, conditions and a quiz that helps people choose. The trial class is the primary CTA on every page.",
          },
        ],
        build: [
          "A multi-page site with ES modules and route-level loading: UI, motion, home, schedule, classes, plans, quiz, trainers, facilities, trial and FAQ.",
          "Filterable schedule, class pages, plans, recommendation quiz, trial class form, FAQ and cookie consent. A print stylesheet handles the schedule.",
          "Local fonts, WebP images, shared components and dependency-free JavaScript. HTML is static and content is rendered from data.",
        ],
        accessibility: [
          "The menu and dialogs manage focus and close with Esc; there is a skip link, visible focus and `prefers-reduced-motion`. Forms have labels and accordions use `aria-expanded`.",
          "The schedule keeps a reading order by day and class, and plan cards expose price and conditions in their own content.",
        ],
        nextStep:
          "Test the schedule and quiz with screen readers and connect booking to a real calendar.",
      },
    },
  },

  contact: {
    badge: "Start a Project",
    title: "Contact.",
    description:
      "Have an idea, need a high-converting website for your brand, or want to overhaul an existing platform? Fill in the form or reach out directly.",
    newsletterBadge: "Free Resource",
    newsletterTitle: "Want the Free Conversion Checklist?",
    newsletterDesc: "12 points to audit your site today. Download the free PDF and start converting more visitors into clients.",
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

  cookieConsent: {
    title: "Manage Cookies",
    description: "We use cookies to improve your experience, analyze traffic, and personalize content.",
    alwaysActive: "Always active",
    necessary: {
      title: "Necessary",
      desc: "Essential for the website to function (security, network, accessibility).",
    },
    analytics: {
      title: "Analytics",
      desc: "Helps us understand how visitors interact (Vercel Analytics, Google Analytics).",
    },
    marketing: {
      title: "Marketing",
      desc: "Used for personalized ads and campaign measurement (Meta Pixel, Google Ads).",
    },
    acceptAll: "Accept All",
    rejectAll: "Only Necessary",
    savePreferences: "Save Preferences",
    footer: "You can change your preferences at any time in our ",
    policyLink: "Privacy Policy",
    footer2: ".",
  },
} as const;

export default en;
