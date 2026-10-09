/* ============================================================
   Strings pt-PT — Portfólio Mateus Mendes
   All user-facing text lives here, organised by page/section.
   Ready for future i18n (just add en.ts with the same shape).
   ============================================================ */

const pt = {
  meta: {
    siteName: "Mateus Mendes — Programador Web",
    siteDescription:
      "Desenvolvimento web profissional para empresas e profissionais liberais em Portugal. Sites, lojas online, web apps e manutenção.",
    ogImageAlt: "Mateus Mendes — Programador Web Freelancer",
  },

  nav: {
    home: "Início",
    about: "Sobre",
    services: "Serviços",
    projects: "Projetos",
    contact: "Contacto",
    cta: "Falar Comigo",
    skipToContent: "Saltar para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
  },

  hero: {
    greeting: "Olá, sou o Mateus.",
    headline: "Crio experiências web que convertem visitantes em clientes.",
    description:
      "Programador web freelancer especializado em sites modernos, lojas online e web apps para empresas e profissionais em Portugal.",
    cta: "Iniciar Conversa",
    secondaryCta: "Ver Projetos",
  },

  servicesPreview: {
    sectionLabel: "Serviços",
    title: "Soluções à medida do seu negócio",
    description:
      "Cada projeto é único. Desenvolvo soluções web pensadas para os seus objetivos e o seu público.",
    cta: "Ver todos os serviços",
  },

  featuredProjects: {
    sectionLabel: "Projetos",
    title: "Trabalho em destaque",
    description: "Uma seleção de projetos conceito que demonstram as minhas competências técnicas e criativas.",
    cta: "Ver todos os projetos",
    conceptBadge: "Projeto conceito",
    viewProject: "Ver projeto",
  },

  aboutPreview: {
    sectionLabel: "Sobre mim",
    title: "Quem está por trás do código",
    description:
      "Sou um programador web apaixonado por criar soluções digitais que fazem a diferença. Valorizo a comunicação clara, o cumprimento de prazos e a qualidade em cada detalhe.",
    cta: "Saber mais sobre mim",
  },

  processPreview: {
    sectionLabel: "Processo",
    title: "Como trabalho",
    steps: [
      {
        title: "Conversa",
        description: "Oiço as suas necessidades e objetivos para entender o projeto a fundo.",
      },
      {
        title: "Proposta",
        description: "Apresento um plano detalhado com prazos, funcionalidades e investimento.",
      },
      {
        title: "Desenvolvimento",
        description: "Construo o projeto com atualizações regulares para garantir alinhamento.",
      },
      {
        title: "Entrega",
        description: "Lanço o projeto, dou formação e garanto suporte contínuo.",
      },
    ],
  },

  ctaSection: {
    title: "Pronto para dar vida ao seu projeto?",
    description:
      "Vamos conversar sobre como posso ajudar o seu negócio a crescer online.",
    cta: "Iniciar Conversa",
    secondaryCta: "Enviar email",
  },

  about: {
    sectionLabel: "Sobre mim",
    title: "Mateus Mendes",
    subtitle: "Programador Web Freelancer",
    bio: [
      "Sou programador web freelancer e ajudo empresas e profissionais liberais em Portugal a construir a sua presença digital. O meu foco está em criar soluções web modernas, rápidas e que realmente servem os objetivos de cada cliente.",
      "Acredito que um bom site não é apenas bonito — é funcional, acessível e pensado para converter. Por isso, cada projeto que desenvolvo combina design cuidado com código limpo e boas práticas de performance.",
      "Quando não estou a programar, estou a aprender novas tecnologias, a contribuir para projetos open-source ou a explorar o mundo do design de interfaces.",
    ],
    values: {
      title: "Os meus valores",
      items: [
        {
          title: "Comunicação clara",
          description:
            "Mantenho-o informado em cada etapa. Sem jargão técnico desnecessário, sem surpresas.",
        },
        {
          title: "Cumprimento de prazos",
          description:
            "Defino prazos realistas e cumpro-os. Se algo mudar, aviso com antecedência.",
        },
        {
          title: "Qualidade no detalhe",
          description:
            "Do pixel ao performance score, cada detalhe conta. Entrego trabalho de que me orgulho.",
        },
      ],
    },
    stack: {
      title: "Tecnologias e ferramentas",
      description:
        "Escolho as ferramentas certas para cada projeto. Aqui estão as que uso com mais frequência:",
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
          name: "Ferramentas",
          items: ["Git", "VS Code", "Figma", "Vercel", "Docker"],
        },
      ],
    },
    photoAlt: "Fotografia de Mateus Mendes", // [SUBSTITUIR] quando tiver foto real
  },

  services: {
    sectionLabel: "Serviços",
    title: "Como posso ajudar o seu negócio",
    subtitle:
      "Ofereço soluções web completas, desde o conceito até à manutenção. Cada projeto é pensado à medida das suas necessidades.",
    items: [
      {
        id: "site-institucional",
        title: "Site Institucional",
        description:
          "Um site profissional que representa o seu negócio online. Moderno, rápido e otimizado para motores de busca.",
        icon: "building",
        features: [
          "Design responsivo e moderno",
          "Otimizado para SEO",
          "Formulário de contacto",
          "Integração com Google Analytics",
          "Painel de gestão de conteúdos",
        ],
        startingPrice: 800,
      },
      {
        id: "landing-page",
        title: "Landing Page",
        description:
          "Página focada em conversão para campanhas de marketing, lançamentos de produtos ou captação de leads.",
        icon: "rocket",
        features: [
          "Design focado em conversão",
          "Otimizado para performance",
          "Testes A/B ready",
          "Integração com ferramentas de marketing",
          "Análise de métricas",
        ],
        startingPrice: 500,
      },
      {
        id: "loja-online",
        title: "Loja Online",
        description:
          "E-commerce completo para vender os seus produtos ou serviços online, com gestão de inventário e pagamentos seguros.",
        icon: "shoppingBag",
        features: [
          "Catálogo de produtos",
          "Carrinho e checkout seguros",
          "Gestão de inventário",
          "Integração com métodos de pagamento",
          "Dashboard de vendas",
        ],
        startingPrice: 2000,
      },
      {
        id: "web-app",
        title: "Web App",
        description:
          "Aplicações web à medida para automatizar processos, gerir dados ou servir os seus clientes de forma inovadora.",
        icon: "code",
        features: [
          "Interface personalizada",
          "Autenticação e permissões",
          "API e integrações",
          "Base de dados escalável",
          "Painel de administração",
        ],
        startingPrice: 3000,
      },
      {
        id: "manutencao",
        title: "Manutenção e Suporte",
        description:
          "Mantenha o seu site atualizado, seguro e a funcionar no pico. Planos mensais adaptados às suas necessidades.",
        icon: "wrench",
        features: [
          "Atualizações de segurança",
          "Backups regulares",
          "Monitorização de uptime",
          "Correção de bugs",
          "Suporte prioritário",
        ],
        startingPrice: 100,
      },
    ],
    process: {
      title: "O meu processo de trabalho",
      description: "Um processo claro e transparente, do primeiro contacto à entrega final.",
      steps: [
        {
          number: 1,
          title: "Conversa Inicial",
          description:
            "Começamos por uma conversa para entender os seus objetivos, público-alvo e requisitos. Sem compromisso.",
          icon: "messageCircle",
        },
        {
          number: 2,
          title: "Proposta e Planeamento",
          description:
            "Apresento uma proposta detalhada com o âmbito, prazos, funcionalidades e investimento.",
          icon: "fileText",
        },
        {
          number: 3,
          title: "Design",
          description:
            "Crio os mockups do projeto para aprovação antes de começar o desenvolvimento.",
          icon: "palette",
        },
        {
          number: 4,
          title: "Desenvolvimento",
          description:
            "Construo o projeto com atualizações regulares. Tem acesso a uma versão de pré-visualização.",
          icon: "code",
        },
        {
          number: 5,
          title: "Testes e Entrega",
          description:
            "Testo em diferentes dispositivos e navegadores, otimizo a performance e lanço o projeto.",
          icon: "checkCircle",
        },
        {
          number: 6,
          title: "Suporte Contínuo",
          description:
            "Após o lançamento, ofereço suporte e manutenção para garantir que tudo funciona na perfeição.",
          icon: "headphones",
        },
      ],
    },
    faq: {
      title: "Perguntas Frequentes",
      items: [
        {
          question: "Como é definido o cronograma do projeto?",
          answer:
            "Cada projeto recebe um planeamento personalizado definido em conjunto de acordo com os requisitos e prioridades do negócio.",
        },
        {
          question: "Como funciona o alojamento e domínio?",
          answer:
            "Ajudo na escolha e configuração das melhores opções de alojamento de alta velocidade e domínio para o seu caso.",
        },
        {
          question: "Posso atualizar o conteúdo do site sozinho?",
          answer:
            "Sim! Todos os meus sites incluem um sistema de gestão de conteúdos (CMS) intuitivo. Além disso, dou formação para que se sinta confortável a fazer alterações.",
        },
        {
          question: "E se precisar de alterações depois do site estar pronto?",
          answer:
            "Pequenas alterações no período pós-entrega estão incluídas. Para novas funcionalidades, planeamos a implementação em conjunto.",
        },
        {
          question: "Trabalha com clientes fora de Portugal?",
          answer:
            "Sim, trabalho remotamente e posso colaborar com clientes em qualquer parte do mundo. A comunicação é feita por videochamada, email ou WhatsApp.",
        },
      ],
    },
    cta: "Iniciar conversa",
    pricePrefix: "A partir de",
  },

  projects: {
    sectionLabel: "Projetos",
    title: "O meu trabalho",
    subtitle:
      "Uma seleção de projetos conceito que demonstram as minhas competências em diferentes tipos de soluções web.",
    filterAll: "Todos",
    conceptBadge: "Projeto conceito",
    viewProject: "Ver detalhes",
    detail: {
      backLink: "Voltar aos projetos",
      objective: "Objetivo",
      role: "O meu papel",
      stack: "Tecnologias",
      challenge: "Desafio",
      solution: "Solução",
      result: "Resultado",
      screenshots: "Screenshots",
      conceptNotice:
        "Este é um projeto conceito criado para demonstração. Não representa um cliente ou empresa real.",
      nextProject: "Projeto seguinte",
      ctaTitle: "Gostou do que viu?",
      ctaDescription:
        "Posso criar algo semelhante para o seu negócio. Vamos conversar sobre o seu projeto.",
      ctaCta: "Iniciar Conversa",
    },
  },

  contact: {
    sectionLabel: "Contacto",
    title: "Vamos trabalhar juntos",
    subtitle:
      "Tem um projeto em mente? Preencha o formulário abaixo ou entre em contacto diretamente.",
    form: {
      name: "Nome",
      namePlaceholder: "O seu nome",
      email: "Email",
      emailPlaceholder: "email@exemplo.pt",
      projectType: "Tipo de projeto",
      budget: "Detalhes do projeto",
      message: "Mensagem",
      messagePlaceholder: "Descreva o seu projeto e os seus objetivos...",
      consent:
        "Autorizo o tratamento dos meus dados pessoais para efeitos de contacto, de acordo com a Política de Privacidade.",
      submit: "Enviar Mensagem",
      sending: "A enviar...",
      successTitle: "Mensagem enviada!",
      successMessage:
        "Obrigado pelo contacto. Entrarei em contacto em breve.",
      errorTitle: "Erro ao enviar",
      errorMessage:
        "Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente ou contacte-me diretamente por email.",
    },
    direct: {
      title: "Contacto direto",
      emailLabel: "Email",
      whatsappLabel: "WhatsApp",
      linkedinLabel: "LinkedIn",
      responseLabel: "Tempo de resposta",
    },
  },

  footer: {
    availability: "Disponível para novos projetos em {year}",
    ctaTitle: "Pronto para transformar a sua presença digital?",
    ctaDescription:
      "Vamos conversar sobre os seus objetivos e construir uma solução sob medida.",
    cta: "Iniciar Conversa",
    tagline:
      "Desenvolvimento web profissional focado em qualidade técnica, velocidade e geração de resultados para PMEs e profissionais em Portugal.",
    location: "Lisboa, Portugal",
    responseTime: "Resposta em {time}",
    servicesTitle: "Serviços",
    services: [
      "Websites Institucionais",
      "Landing Pages de Alta Conversão",
      "Lojas Online & E-Commerce",
      "Aplicações Web Sob Medida",
      "Otimização SEO & Performance",
    ],
    navTitle: "Navegação",
    contactTitle: "Contacto Direto",
    privacy: "Política de Privacidade",
    madeWith: "Construído com Next.js & Tailwind CSS",
    copyright: "© {year} Mateus Mendes. Todos os direitos reservados.",
  },

  notFound: {
    headline: "Página não encontrada",
    description: "A página que procura não existe ou foi movida para outro endereço.",
    backHome: "Voltar ao início",
    contact: "Contactar",
    navLabel: "Navegação de erro",
  },

  backToTop: {
    label: "Voltar ao topo",
  },

  languageToggle: {
    switchToPortuguese: "Mudar idioma para Português",
    switchToEnglish: "Switch language to English",
    currentPt: "Português / English (Atual: PT)",
    currentEn: "Português / English (Atual: EN)",
  },

  mobileNav: {
    language: "Idioma",
    theme: "Modo de Visualização",
  },

  stats: {
    clickToClose: "Clique para fechar",
    clickToLearnMore: "Clique para saber mais",
    items: [
      {
        id: "speed",
        metric: "< 0.8s",
        label: "Carregamento Relâmpago",
        badge: "Performance",
        details:
          "Pontuações máximas no Google PageSpeed para que nenhum visitante desista por lentidão.",
      },
      {
        id: "custom",
        metric: "100%",
        label: "Código Sob Medida",
        badge: "Qualidade",
        details:
          "Sem templates reciclados ou plugins vulneráveis. Cada linha é pensada para as suas necessidades.",
      },
      {
        id: "response",
        metric: "< 24h",
        label: "Tempo de Resposta",
        badge: "Comunicação",
        details:
          "Acompanhamento próximo por WhatsApp, email ou chamada direta durante todo o processo.",
      },
      {
        id: "roi",
        metric: "100%",
        label: "Foco em Conversão",
        badge: "Resultados",
        details:
          "Estrutura desenhada para transformar utilizadores casuais em contactos e clientes pagantes.",
      },
    ],
  },

  privacy: {
    title: "Política de Privacidade",
    lastUpdated: "Última atualização: outubro de 2026",
  },

  common: {
    learnMore: "Saber mais",
    viewAll: "Ver todos",
    loading: "A carregar...",
    scrollDown: "Scroll para baixo",
  },
};

export default pt;

type DeepString<T> = {
  [K in keyof T]: T[K] extends number
    ? number
    : T[K] extends boolean
    ? boolean
    : T[K] extends (infer U)[]
    ? DeepString<U>[]
    : T[K] extends object
    ? DeepString<T[K]>
    : string;
};

/** Type of the string tree, useful for i18n. */
export type Strings = DeepString<typeof pt>;
