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
    hero: {
      badge: "Quem Está Por Trás do Código",
      title: "Sobre Mim.",
      introBefore: "Sou o ",
      introAfter:
        ", programador web freelance baseado em Portugal. Combino rigor de engenharia com estética moderna para criar websites, lojas online e ferramentas digitais que geram autoridade e resultados comerciais mensuráveis.",
    },
    methodology: {
      label: "Metodologia",
      title: "Como crio valor tangível para o seu projeto",
      description:
        "Processos simples, comunicação transparente e foco em criar uma ferramenta de vendas duradoura.",
      pillars: [
        {
          number: "01",
          title: "Orientado a Resultados de Negócio",
          description:
            "Um site não deve ser apenas visualmente atraente — tem de vender, atrair contactos e posicionar a sua marca como referência no mercado. Cada secção é pensada para converter visitantes em clientes pagantes.",
        },
        {
          number: "02",
          title: "Tecnologia de Ponta & Sem Bloatware",
          description:
            "Não uso templates pesados ou construtores lentos que deixam o site arrastado. Desenvolvo código limpo com Next.js e TypeScript, garantindo carregamento instantâneo (< 0.8 segundos).",
        },
        {
          number: "03",
          title: "Comunicação Clara & Sem Intermediários",
          description:
            "Fale diretamente com quem escreve o código do seu site. Garanto acompanhamento contínuo, transparência total e cumprimento escrupuloso dos prazos acordados, sem custos ocultos.",
        },
        {
          number: "04",
          title: "Suporte Contínuo & Independência",
          description:
            "Após o lançamento, o seu negócio não fica desamparado. Entrego todo o código e formação necessária para gerir o seu conteúdo de forma autónoma, com planos de manutenção preventiva disponíveis.",
        },
      ],
    },
    cta: {
      title: "Tem uma ideia ou projeto em mente?",
      description:
        "Vamos conversar sem qualquer compromisso sobre os seus objetivos e definir a melhor estratégia para o seu negócio.",
      secondary: "Conhecer Todos os Serviços",
    },
    photoAlt: "Fotografia de Mateus Mendes",
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

  terminal: {
    badge: "Bastidores & Rigor Técnico",
    title: "A Minha Filosofia de Trabalho",
    description:
      "Inspecione os padrões de código, metodologia e garantias que aplico em cada linha que escrevo para si.",
    path: "filosofia",
    copy: "Copiar",
    copied: "✓ Copiado",
    status: "Compilação OK — 0 erros",
    files: [
      {
        id: "valores",
        name: "valores.ts",
        language: "typescript",
        content: `// Filosofia de Desenvolvimento — Mateus Mendes
export const principiosDeEngenharia = {
  codigoLimpo: {
    semBloatware: true, // Recuso templates lentos e construtores pesados
    arquitetura: "Next.js 16 + TypeScript + Tailwind CSS",
    velocidadeAlvo: "< 0.8s de carregamento inicial",
  },
  relacaoComCliente: {
    intermedios: 0, // Fala diretamente com o programador do seu site
    transparencia: "Proposta clara e definida em chamada privada sem taxas escondidas",
    comunicacao: "Acompanhamento direto e canal aberto durante todo o projeto",
  },
  objetivoFinal: "Criar um canal de vendas e autoridade inquestionável para o seu negócio.",
};`,
      },
      {
        id: "processo",
        name: "processo.json",
        language: "json",
        content: `{
  "fase_01": {
    "nome": "Diagnóstico & Estratégia",
    "objetivo": "Compreender os clientes e o modelo de negócio da sua empresa."
  },
  "fase_02": {
    "nome": "Design & Estrutura Visual",
    "objetivo": "Aprovação do layout antes de iniciar o desenvolvimento."
  },
  "fase_03": {
    "nome": "Construção & Otimização",
    "objetivo": "Código sob medida, testes rigorosos em telemóveis e pontuação SEO."
  },
  "fase_04": {
    "nome": "Lançamento & Formação",
    "objetivo": "Colocar no ar com SSL e garantir total autonomia ao cliente."
  }
}`,
      },
      {
        id: "garantias",
        name: "garantias.md",
        language: "markdown",
        content: `# Compromissos Assumidos em Cada Projeto

✓ Faturação Legal Completa (com NIF) de acordo com a lei portuguesa
✓ 100% de Propriedade do Código e Domínio após entrega final
✓ Otimização Técnica para Motores de Busca (Google SEO incluído)
✓ Compatibilidade perfeita testada em iPhone, Android, Mac e Windows
✓ Formação e suporte pós-lançamento para esclarecimento de dúvidas`,
      },
    ],
  },

  stackExplorer: {
    badge: "Explorador Interativo",
    title: "A Minha Stack & o Valor que Traz ao Seu Negócio",
    description:
      "Clique em qualquer tecnologia para inspecionar o seu impacto real na velocidade, segurança e vendas da sua empresa.",
    filters: {
      all: "Todas",
      backend: "Backend & Pagamentos",
    },
    labels: {
      businessBenefit: "Benefício para o Seu Negócio",
      appliedIn: "Aplica-se em",
    },
    items: [
      {
        id: "nextjs",
        name: "Next.js 16 & React 19",
        category: "frontend",
        categoryLabel: "Arquitetura Frontend",
        tagline: "O padrão-ouro das empresas tecnológicas mundiais.",
        businessBenefit:
          "Permite renderização no servidor (SSR) que posiciona o seu site nos primeiros lugares do Google e garante páginas instantâneas.",
        metric: "< 0.8s",
        metricLabel: "Tempo de Carregamento",
        usedFor: "Websites institucionais, lojas online e portais corporativos de alto tráfego.",
      },
      {
        id: "typescript",
        name: "TypeScript",
        category: "frontend",
        categoryLabel: "Fiabilidade & Código",
        tagline: "Código robusto, tipado e sem erros inesperados.",
        businessBenefit:
          "Elimina erros em tempo de execução antes que os seus clientes os vejam, garantindo que o seu site funciona sem falhas 24 horas por dia.",
        metric: "99.9%",
        metricLabel: "Estabilidade em Produção",
        usedFor: "Todos os projetos, garantindo manutenção fácil e longevidade do investimento.",
      },
      {
        id: "tailwind",
        name: "Tailwind CSS v4 & CSS Moderno",
        category: "frontend",
        categoryLabel: "Estilo & Responsividade",
        tagline: "Design à medida sem o peso de frameworks antigas.",
        businessBenefit:
          "Gera CSS ultra-leve e perfeitamente responsivo, fazendo com que o site pareça uma aplicação nativa no telemóvel e no computador.",
        metric: "100%",
        metricLabel: "Fidelidade Responsiva",
        usedFor: "Interfaces fluidas, modo claro/escuro e sistemas de design à medida.",
      },
      {
        id: "motion",
        name: "Framer Motion & CSS Animations",
        category: "animation",
        categoryLabel: "Animação & Efeito Uau",
        tagline: "Micro-interações que encantam o utilizador.",
        businessBenefit:
          "Transforma uma navegação estática numa experiência memorável e envolvente, aumentando o tempo de permanência e a conversão.",
        metric: "60 FPS",
        metricLabel: "Fluidez de Animação",
        usedFor: "Transições de página, revelação de conteúdos em scroll e botões interativos.",
      },
      {
        id: "threejs",
        name: "Three.js & Canvas 3D",
        category: "animation",
        categoryLabel: "Experiências Visuais",
        tagline: "Gráficos tridimensionais interativos na web.",
        businessBenefit:
          "Destaca a sua marca da concorrência de forma inconfundível, transmitindo uma imagem tecnológica inovadora e de prestígio.",
        metric: "WebGL",
        metricLabel: "Aceleração por Hardware",
        usedFor: "Modelos de produtos 3D, elementos visuais de topo e portfólios impactantes.",
      },
      {
        id: "payments",
        name: "Stripe, MB WAY & Multibanco",
        category: "backend",
        categoryLabel: "Pagamentos Nacionais",
        tagline: "Checkout fluido sem fricção para clientes portugueses.",
        businessBenefit:
          "Oferece aos clientes portugueses os seus métodos de pagamento de eleição (MB WAY e Referência Multibanco), maximizando as vendas.",
        metric: "0 Fricção",
        metricLabel: "Experiência de Checkout",
        usedFor: "Lojas online, venda de bilhetes, consultorias e serviços digitais.",
      },
      {
        id: "backend",
        name: "Node.js, PostgreSQL & Prisma",
        category: "backend",
        categoryLabel: "Bases de Dados & APIs",
        tagline: "Segurança de dados e processamento veloz.",
        businessBenefit:
          "Armazenamento seguro de clientes, encomendas e contactos com encriptação e proteção total contra perda de dados.",
        metric: "A+",
        metricLabel: "Nível de Segurança",
        usedFor: "Áreas reservadas, autenticação de clientes, dashboards e sistemas internos.",
      },
      {
        id: "seo",
        name: "SEO Técnico & Core Web Vitals",
        category: "seo",
        categoryLabel: "Otimização Google",
        tagline: "Construído de raiz para o algoritmo do Google.",
        businessBenefit:
          "Meta tags dinâmicas, Sitemap XML, dados estruturados Schema.org e pontuações máximas no Google PageSpeed para atrair tráfego orgânico gratuito.",
        metric: "100/100",
        metricLabel: "Google PageSpeed Target",
        usedFor: "Todos os websites para atrair clientes que pesquisam pelos seus serviços no Google.",
      },
    ],
  },

  quiz: {
    badge: "Assistente Interativo de Projeto",
    title: "Descubra a Solução Ideal para o Seu Negócio",
    description:
      "Responda a 3 perguntas rápidas para receber uma recomendação técnica adaptada aos seus objetivos.",
    previousQuestion: "← Pergunta anterior",
    retake: "Fazer novamente",
    includesTitle: "O que esta solução inclui para o seu caso:",
    discussSolution: "Falar sobre esta Solução",
    exploreService: "Ver Detalhes do Serviço",
    resultsBadge: "Recomendação Ideal",
    questions: {
      goal: "1. Qual é a sua meta principal na internet neste momento?",
      stage: "2. Em que ponto se encontra o seu projeto?",
      priority: "3. O que mais valoriza na entrega final?",
    },
    goalOptions: [
      {
        id: "authority",
        title: "Apresentar a Minha Empresa com Autoridade",
        desc: "Transmitir confiança máxima a novos clientes e parceiros.",
      },
      {
        id: "leads",
        title: "Gerar Contactos (Leads) de Publicidade",
        desc: "Captar clientes para serviços através de Google ou Meta Ads.",
      },
      {
        id: "ecommerce",
        title: "Vender Produtos Online 24/7",
        desc: "Loja com pagamentos portugueses (MB WAY) e gestão de stock.",
      },
      {
        id: "webapp",
        title: "Automatizar Processos com um Sistema Web",
        desc: "Portal de clientes, login reservado ou dashboard interno.",
      },
    ],
    stageOptions: [
      {
        id: "idea",
        title: "Apenas Tenho a Ideia",
        desc: "Preciso de acompanhamento do zero, incluindo conselhos de design e estrutura.",
      },
      {
        id: "ready",
        title: "Conteúdos & Marca Prontos",
        desc: "Já possuo logotipo, textos e fotografias organizadas para colocar online.",
      },
      {
        id: "redesign",
        title: "Site Antigo a Renovar",
        desc: "Já tenho um site, mas está desatualizado, lento ou não gera resultados.",
      },
    ],
    priorityOptions: [
      {
        id: "speed",
        title: "Velocidade & Google SEO",
        desc: "Carregamento instantâneo para conquistar o topo das pesquisas do Google.",
      },
      {
        id: "design",
        title: "Design de Prestígio & Efeito Uau",
        desc: "Animações modernas e identidade visual sofisticada que marque os clientes.",
      },
      {
        id: "mobile",
        title: "Mobile First & Zero Complicações",
        desc: "Facilidade de navegação em telemóveis e processos de contacto diretos.",
      },
    ],
    results: {
      ecommerce: {
        title: "Loja Online / E-Commerce Sob Medida",
        description:
          "Para vender com segurança e maximizar receitas, a melhor estratégia é uma plataforma e-commerce moderna com checkout otimizado e integração direta com MB WAY, Multibanco e cartões.",
        highlights: [
          "Checkout em 1 página sem atrito",
          "Pagamentos por MB WAY, Multibanco e Stripe",
          "Painel intuitivo para gerir produtos e encomendas",
          "Arquitetura rápida e segura para conversões contínuas",
        ],
      },
      leads: {
        title: "Landing Page de Alta Conversão",
        description:
          "Se o foco é captação de clientes em campanhas de marketing (Google Ads / Meta), uma landing page cirurgicamente estruturada para captar contactos é a solução mais eficaz.",
        highlights: [
          "Copywriting persuasivo e foco em ação direta",
          "Carregamento ultra-rápido para maximizar o tráfego de anúncios",
          "Integração com WhatsApp e formulários instantâneos",
          "Pixels de rastreio e conversão configurados",
        ],
      },
      webapp: {
        title: "Aplicação Web / Portal Sob Medida",
        description:
          "Para automatizar operações ou oferecer uma área reservada aos seus clientes, uma aplicação web com TypeScript, autenticação segura e base de dados moderna é a escolha certa.",
        highlights: [
          "Área de utilizadores com login protegido",
          "Dashboards e relatórios em tempo real",
          "Integração com APIs e sistemas externos",
          "Arquitetura escalável na cloud",
        ],
      },
      website: {
        title: "Website Institucional de Alta Performance",
        description:
          "Apresente a sua empresa com autoridade no mercado. Um website elegante, rápido e otimizado para o Google que transforma visitantes em clientes fidelizados.",
        highlights: [
          "Design exclusivo adaptado à sua marca",
          "Otimização completa para motores de busca (Google SEO)",
          "Experiência perfeita em telemóveis e computadores",
          "Painel simples para edição autónoma de conteúdos",
        ],
      },
    },
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
    startConversation: "Iniciar Conversa",
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
