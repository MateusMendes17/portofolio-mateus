export interface Project {
  slug: string;
  title: string;
  titleEn?: string;
  shortDescription: string;
  shortDescriptionEn?: string;
  category: "institucional" | "loja-online" | "landing-page" | "web-app" | "saas";
  categoryLabel: string;
  categoryLabelEn?: string;
  tags: string[];
  featured: boolean;
  year: string;
  client: string;
  liveUrl?: string;
  challenge: string;
  challengeEn?: string;
  solution: string;
  solutionEn?: string;
  results: string[];
  resultsEn?: string[];
  testimonial?: {
    quote: string;
    quoteEn?: string;
    author: string;
    role: string;
    roleEn?: string;
  };
  techStack: string[];
  features: string[];
  featuresEn?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "silva-advocacia",
    title: "Silva & Associados — Advocacia",
    titleEn: "Silva & Associates — Law Firm",
    shortDescription:
      "Website institucional de prestígio para um escritório de advocacia líder em Lisboa, transmitindo autoridade jurídica e confiança a cada visitante.",
    shortDescriptionEn:
      "Prestigious corporate website for a leading law firm in Lisbon, establishing legal authority and instant client trust.",
    category: "institucional",
    categoryLabel: "Site Institucional",
    categoryLabelEn: "Corporate Website",
    tags: ["Next.js", "SEO", "Framer Motion", "CMS"],
    featured: true,
    year: "2026",
    client: "Silva & Associados, Lda",
    liveUrl: "#",
    challenge:
      "O escritório precisava de substituir um site desatualizado em WordPress que demorava mais de 6 segundos a carregar e não transmitia a imagem de credibilidade e sofisticação que os seus clientes corporativos exigiam.",
    challengeEn:
      "The firm needed to replace a sluggish legacy WordPress site taking over 6 seconds to load, which failed to project the prestige and corporate confidence required by institutional clients.",
    solution:
      "Desenvolvi um website totalmente à medida em Next.js com animações subtis de scroll, estrutura semântica otimizada para o Google e um painel de gestão simplificado que permite à equipa publicar artigos e atualizar a lista de áreas de prática de forma autónoma.",
    solutionEn:
      "Engineered a bespoke Next.js website featuring fluid scroll animations, semantic Google SEO architecture, and a streamlined CMS enabling the legal team to update practice areas and articles effortlessly.",
    results: [
      "Pontuação Google PageSpeed de 98/100 em mobile",
      "Aumento significativo de contactos qualificados através do formulário",
      "Top 3 nas pesquisas \"advogado Lisboa\" no Google em 4 meses",
    ],
    resultsEn: [
      "98/100 Google PageSpeed mobile score",
      "Substantial increase in qualified corporate client inquiries",
      "Top 3 Google search rankings for competitive legal keywords",
    ],
    testimonial: {
      quote:
        "O Mateus transformou completamente a nossa presença digital. Passámos de um site constrangedor a uma referência no nosso setor. Os clientes comentam frequentemente a qualidade do novo website.",
      quoteEn:
        "Mateus completely revolutionized our digital presence. We transitioned from an outdated website to a benchmark in our sector. Clients consistently praise the quality of our new platform.",
      author: "Dr. Ricardo Silva",
      role: "Sócio-Gerente",
      roleEn: "Managing Partner",
    },
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "Sanity CMS", "Vercel"],
    features: [
      "Design exclusivo com tipografia jurídica premium",
      "Secção dinâmica de Áreas de Prática com filtro interativo",
      "Blog jurídico com SEO estruturado (Schema.org Article)",
      "Formulário de contacto multi-passo com validação",
      "Modo claro/escuro com transição suave",
      "100% compatível com iPhone, Android e desktop",
    ],
    featuresEn: [
      "Bespoke layout with high-prestige typography",
      "Dynamic Practice Areas section with interactive filtering",
      "Legal insights blog with Schema.org article markup",
      "Multi-step qualified client contact form",
      "Seamless dark/light theme transition",
      "Pixel-perfect responsive design across mobile and desktop",
    ],
  },
  {
    slug: "green-harvest-shop",
    title: "Green Harvest — Mercearia Biológica Online",
    titleEn: "Green Harvest — Organic E-Commerce",
    shortDescription:
      "Loja online completa com pagamentos MB WAY e Multibanco, gestão de stock em tempo real e checkout otimizado para maximizar as vendas.",
    shortDescriptionEn:
      "Full-featured e-commerce platform with Portuguese & international payments, real-time stock control, and friction-free checkout.",
    category: "loja-online",
    categoryLabel: "E-Commerce",
    categoryLabelEn: "E-Commerce",
    tags: ["Next.js", "Stripe", "MB WAY", "PostgreSQL"],
    featured: true,
    year: "2026",
    client: "Green Harvest, Unip. Lda",
    liveUrl: "#",
    challenge:
      "Uma marca de produtos biológicos precisava de escalar as vendas para além das feiras locais, oferecendo aos clientes portugueses os métodos de pagamento a que estão habituados e uma gestão de stock automatizada.",
    challengeEn:
      "An organic food brand needed to scale sales beyond local markets, requiring seamless Portuguese payments (MB WAY, Multibanco) and automated inventory management.",
    solution:
      "Construí uma plataforma e-commerce à medida com checkout em página única, integração nativa com MB WAY e Multibanco via Stripe, emails transacionais automáticos e um dashboard de gestão de encomendas desenhado para ser utilizado por qualquer membro da equipa.",
    solutionEn:
      "Built a tailored e-commerce experience with one-page checkout, native MB WAY & Multibanco integrations via Stripe, automated order tracking emails, and an intuitive fulfillment dashboard.",
    results: [
      "Checkout otimizado com taxa de abandono de carrinho reduzida",
      "Dashboard que poupa horas semanais de gestão manual",
      "Clientes recorrentes graças à experiência de compra fluida",
    ],
    resultsEn: [
      "Optimized checkout significantly lowering cart abandonment",
      "Operational dashboard saving hours of weekly manual fulfillment",
      "Repeat customer retention driven by lightning-fast purchase flow",
    ],
    techStack: ["Next.js 16", "TypeScript", "Stripe API", "MB WAY", "PostgreSQL", "Prisma", "Tailwind CSS"],
    features: [
      "Catálogo de produtos com filtros, pesquisa e variantes",
      "Checkout otimizado em página única (menos fricção)",
      "Pagamentos MB WAY, Multibanco e Cartão (Stripe)",
      "Área de cliente com histórico de encomendas",
      "Gestão de stock com alertas automáticos",
      "Emails transacionais elegantes de confirmação e expedição",
    ],
    featuresEn: [
      "Dynamic catalog with multi-attribute filtering and instant search",
      "One-page friction-free checkout architecture",
      "Full payment suite: MB WAY, Multibanco, Apple Pay & Cards",
      "Customer account area with real-time order history",
      "Automated stock monitoring with low-inventory alerts",
      "Branded transactional dispatch emails",
    ],
  },
  {
    slug: "clinica-sorrir-landing",
    title: "Clínica Sorrir — Landing Page de Captação",
    titleEn: "Sorrir Dental Clinic — Lead Gen Landing Page",
    shortDescription:
      "Landing page de alta conversão para campanhas Google Ads de uma clínica dentária em Lisboa, com formulário de marcação instantânea e botão WhatsApp.",
    shortDescriptionEn:
      "High-converting landing page for Google Ads dental campaigns in Lisbon, featuring direct appointment booking and WhatsApp integration.",
    category: "landing-page",
    categoryLabel: "Landing Page",
    categoryLabelEn: "Landing Page",
    tags: ["Next.js", "Google Ads", "Meta Pixel", "WhatsApp"],
    featured: false,
    year: "2025",
    client: "Clínica Sorrir, S.A.",
    liveUrl: "#",
    challenge:
      "A clínica investia em Google Ads mas a página de destino antiga não convertia. Os visitantes saíam sem agendar consulta por causa de um formulário longo e confuso num site genérico.",
    challengeEn:
      "The clinic ran heavy Google Ads traffic but their generic destination page suffered high bounce rates and poor conversion due to a cluttered form.",
    solution:
      "Criei uma landing page hiper-focada com copywriting persuasivo, prova social visual (antes/depois dos tratamentos), formulário simplificado de 2 campos e botão flutuante de WhatsApp para contacto imediato.",
    solutionEn:
      "Crafted a surgical landing page with persuasive copy, verified patient social proof, 2-field rapid appointment booking, and persistent WhatsApp click-to-chat.",
    results: [
      "Taxa de conversão da landing page muito acima da média do setor",
      "Redução significativa no custo por lead (CPL) em Google Ads",
      "Integração direta com o sistema de agendamento da clínica",
    ],
    resultsEn: [
      "Conversion rate substantially outperforming industry benchmarks",
      "Significant drop in cost-per-lead (CPL) across paid campaigns",
      "Seamless real-time synchronization with clinic calendar",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Google Tag Manager", "Meta Pixel", "Google Analytics 4"],
    features: [
      "Carregamento instantâneo otimizado para tráfego pago",
      "Formulário de marcação em 2 campos (nome + telefone)",
      "Botão flutuante de WhatsApp com mensagem pré-definida",
      "Secção de prova social com avaliações reais do Google",
      "Pixels de conversão Google e Meta configurados",
      "Design responsivo mobile-first (80%+ do tráfego é móvel)",
    ],
    featuresEn: [
      "Sub-second load times maximizing ad quality score",
      "Streamlined 2-field lead form (Name + Phone)",
      "Floating WhatsApp chat button with pre-filled message",
      "Verified Google Review badges and before/after gallery",
      "Google Tag Manager & Meta Pixel conversion tracking",
      "Mobile-first architecture tailored for smartphone traffic",
    ],
  },
  {
    slug: "taskflow-saas",
    title: "TaskFlow — Gestão de Projetos para Equipas",
    titleEn: "TaskFlow — Team Project Management SaaS",
    shortDescription:
      "Aplicação web SaaS de gestão de tarefas com dashboard analítico, autenticação segura e colaboração entre membros de equipa em tempo real.",
    shortDescriptionEn:
      "Collaborative SaaS web application with interactive task boards, analytical productivity dashboards, and role-based security.",
    category: "web-app",
    categoryLabel: "Web App / SaaS",
    categoryLabelEn: "Web App / SaaS",
    tags: ["Next.js", "Auth.js", "PostgreSQL", "Prisma"],
    featured: true,
    year: "2026",
    client: "TaskFlow (Projeto Próprio)",
    liveUrl: "#",
    challenge:
      "As ferramentas de gestão de projetos no mercado são complexas e caras para micro-equipas portuguesas. Era necessário um sistema leve, intuitivo e com foco na produtividade sem curva de aprendizagem.",
    challengeEn:
      "Existing project tools are bloated and prohibitively expensive for small teams. The goal was to build a clean, distraction-free productivity app.",
    solution:
      "Desenvolvi uma aplicação web full-stack com autenticação por email/Google, boards Kanban drag-and-drop, sistema de notificações, dashboard de métricas de produtividade e exportação de relatórios em PDF.",
    solutionEn:
      "Engineered a full-stack SaaS platform with passwordless authentication, drag-and-drop Kanban boards, team notifications, and productivity analytics.",
    results: [
      "Utilizadores ativos com sessões longas e alta retenção",
      "Feedback consistente sobre facilidade de utilização",
      "Arquitetura pronta para escalar para centenas de equipas",
    ],
    resultsEn: [
      "Active team engagement with strong user retention",
      "Consistently positive UX ratings and zero onboarding friction",
      "Scalable database architecture engineered for rapid expansion",
    ],
    techStack: ["Next.js 16", "TypeScript", "Auth.js", "PostgreSQL", "Prisma", "Tailwind CSS", "Vercel"],
    features: [
      "Autenticação segura (Email Magic Link + Google OAuth)",
      "Boards Kanban com drag-and-drop interativo",
      "Dashboard analítico com gráficos de produtividade",
      "Sistema de notificações e menções (@user)",
      "Exportação de relatórios em PDF e CSV",
      "Modo claro/escuro e design 100% responsivo",
    ],
    featuresEn: [
      "Secure authentication (Magic Link + OAuth)",
      "Smooth drag-and-drop Kanban board interfaces",
      "Analytical dashboard with team workload metrics",
      "Contextual user notifications and @mentions",
      "Automated PDF and CSV report exports",
      "Fluid dark/light mode with responsive layouts",
    ],
  },
  {
    slug: "porto-realestate",
    title: "Porto Real Estate — Imobiliária Premium",
    titleEn: "Porto Real Estate — Luxury Property Showcase",
    shortDescription:
      "Website institucional para uma imobiliária de luxo no Porto, com pesquisa avançada de imóveis, galeria visual de alta definição e formulários de contacto inteligentes.",
    shortDescriptionEn:
      "High-end real estate portal for luxury properties in Porto, featuring advanced filtering, ultra-HD visual showcases, and smart inquiry forms.",
    category: "institucional",
    categoryLabel: "Site Institucional",
    categoryLabelEn: "Corporate Website",
    tags: ["Next.js", "CMS", "SEO", "Google Maps"],
    featured: false,
    year: "2025",
    client: "Porto Real Estate, Lda",
    liveUrl: "#",
    challenge:
      "A imobiliária trabalhava com imóveis de segmento alto mas o website não refletia o nível de sofisticação que os clientes premium esperavam. Perdiam leads para concorrentes com presença digital mais forte.",
    challengeEn:
      "Handling luxury estates required an elite visual standard that their outdated portal failed to convey to discerning international buyers.",
    solution:
      "Criei uma plataforma imobiliária elegante com listagem dinâmica de propriedades, filtros avançados (localização, tipologia, área), galeria de imagens em alta definição e formulários de interesse por imóvel com notificação instantânea à equipa comercial.",
    solutionEn:
      "Designed an elegant luxury portal featuring property search filters, full-screen HD galleries, interactive Google Maps integration, and instant broker lead routing.",
    results: [
      "Aumento notável de leads qualificados de clientes premium",
      "Melhoria drástica na perceção de marca e posicionamento digital",
      "Tempo médio de permanência no site significativamente superior",
    ],
    resultsEn: [
      "Noticeable increase in high-net-worth buyer inquiries",
      "Dramatic elevation of brand prestige among international buyers",
      "Substantially higher average time-on-site per property page",
    ],
    techStack: ["Next.js 16", "TypeScript", "Sanity CMS", "Tailwind CSS", "Google Maps API", "Vercel"],
    features: [
      "Listagem dinâmica de imóveis com filtros avançados",
      "Galeria de imagens em alta definição com lightbox",
      "Integração com Google Maps para localização",
      "Formulário de interesse por imóvel com notificação",
      "SEO otimizado por página de imóvel (Schema RealEstateListing)",
      "Painel CMS intuitivo para adicionar novas propriedades",
    ],
    featuresEn: [
      "Dynamic listings with location and price filtering",
      "Ultra-HD lightbox image galleries",
      "Interactive map boundaries and neighborhood points of interest",
      "Instant property-specific inquiry routing",
      "Dedicated RealEstateListing Schema.org SEO for each estate",
      "Intuitive CMS for effortless estate updates",
    ],
  },
  {
    slug: "fitlife-landing",
    title: "FitLife Coaching — Página de Vendas",
    titleEn: "FitLife Coaching — Sales & Enrollment Page",
    shortDescription:
      "Landing page de alta conversão para um programa de coaching fitness online, com contagem regressiva, depoimentos e checkout direto integrado.",
    shortDescriptionEn:
      "High-impact sales landing page for an online fitness coaching program, featuring dynamic countdown, transformation galleries, and direct Stripe enrollment.",
    category: "landing-page",
    categoryLabel: "Landing Page",
    categoryLabelEn: "Landing Page",
    tags: ["Next.js", "Stripe", "Animações", "Meta Ads"],
    featured: false,
    year: "2025",
    client: "FitLife Coaching",
    liveUrl: "#",
    challenge:
      "Um personal trainer queria vender o seu programa de coaching online mas não tinha presença digital. As tentativas anteriores com plataformas genéricas tinham resultado em taxas de conversão baixas.",
    challengeEn:
      "A fitness coach wanted to launch an online mentoring business but generic website builders failed to convert paid Instagram ad traffic.",
    solution:
      "Desenhei uma página de vendas com estrutura de copywriting persuasiva, vídeo hero de apresentação, secção de transformações (antes/depois), depoimentos em carrossel, FAQ interativa e integração direta com Stripe para compra imediata.",
    solutionEn:
      "Constructed a high-converting sales page with dynamic video hero, client transformation proof, interactive FAQ accordion, and embedded Stripe enrollment.",
    results: [
      "Taxa de conversão muito acima da média em campanhas Instagram",
      "Vendas automáticas sem intervenção manual do coach",
      "Página totalmente autónoma com checkout integrado",
    ],
    resultsEn: [
      "High conversion rates from Instagram & Meta ad traffic",
      "Automated client enrollment without manual scheduling friction",
      "Completely autonomous digital product sales funnel",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Stripe Checkout", "Framer Motion", "Meta Pixel"],
    features: [
      "Vídeo hero autoplay com overlay e call-to-action",
      "Secção de transformações com galeria antes/depois",
      "Carrossel de depoimentos com avaliação por estrelas",
      "FAQ interativa com acordeão animado",
      "Checkout direto Stripe sem redirecionamento",
      "Contagem regressiva para urgência (dynamic timer)",
    ],
    featuresEn: [
      "Branded video hero presentation with direct CTA",
      "Before & after transformation slider gallery",
      "Interactive social proof and video testimonials",
      "Accordion FAQ addressing client enrollment objections",
      "Embedded Stripe checkout with instant receipt generation",
      "Dynamic conversion countdown timer",
    ],
  },
];
