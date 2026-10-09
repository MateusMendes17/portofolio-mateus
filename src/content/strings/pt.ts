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
    badge: "Serviços de Desenvolvimento Web",
    title: "Serviços.",
    description:
      "Desde uma landing page de alta conversão até um website institucional de prestígio ou uma plataforma de e-commerce sob medida. Cada projeto é executado com código limpo, velocidade e atenção obsessiva ao detalhe.",
    labels: {
      businessImpact: "Impacto para o seu Negócio",
      recommendedFor: "Recomendado para:",
      discussService: "Falar sobre este Serviço",
      deliverables: "Entregáveis & Especificações",
      includedStandard: "Incluído de Raiz",
      techStack: "Tecnologias Utilizadas",
    },
    items: [
      {
        id: "websites",
        title: "Websites Institucionais de Alto Prestígio",
        badge: "Empresas & Negócios",
        tagline: "Apresente a sua empresa com autoridade inquestionável.",
        description:
          "Desenvolvo websites corporativos elegantes, rápidos e feitos à medida da identidade da sua marca. Criados para inspirar confiança imediata em novos parceiros e clientes, destacando a sua empresa da concorrência.",
        includes: [
          "Design 100% exclusivo adaptado à identidade e cores da sua marca",
          "Totalmente responsivo (perfeito em smartphones, tablets e computadores)",
          "Otimização completa para motores de busca (Google SEO estruturado)",
          "Painel de controlo simples para editar textos, notícias e imagens de forma autónoma",
          "Formulário de contacto interativo com notificações instantâneas",
          "Integração com WhatsApp, Google Maps e links para redes sociais",
          "Páginas legais de Termos e Política de Privacidade de acordo com o RGPD",
        ],
        businessImpact:
          "Transmite solidez, autoridade e profissionalismo ao primeiro segundo, convertendo visitantes em contactos qualificados.",
        techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion", "SEO Schema.org"],
        idealFor:
          "PMEs, gabinetes de advocacia, consultores, clínicas médicas, imobiliárias e prestadores de serviços.",
      },
      {
        id: "landing-pages",
        title: "Landing Pages de Alta Conversão",
        badge: "Geração de Leads & Vendas",
        tagline: "Páginas hiper-focadas em transformar tráfego pago em clientes reais.",
        description:
          "Páginas de destino cirurgicamente pensadas para campanhas de publicidade no Google Ads, Facebook, Instagram ou LinkedIn. Com copywriting estruturado para a ação e carregamento imediato para não perder cliques valiosos.",
        includes: [
          "Estrutura psicológica orientada à ação (Copywriting e hierarquia visual estratégica)",
          "Carregamento ultra-rápido para garantir pontuação máxima nos anúncios",
          "Formulários dinâmicos de captura e botão de WhatsApp flutuante",
          "Configuração de pixels de conversão (Google Tag Manager, Meta Pixel, Google Analytics 4)",
          "Garantia de compatibilidade e testes minuciosos em ecrãs móveis",
          "Secções de prova social, depoimentos de clientes e garantias para quebrar objeções",
        ],
        businessImpact:
          "Diminui o custo por lead (CPL) e maximiza o retorno do seu investimento em publicidade (ROAS).",
        techStack: ["Next.js", "React 19", "Tailwind CSS", "Google Tag Manager", "Meta Pixel"],
        idealFor:
          "Lançamento de novos produtos, captação de leads para cursos/eventos, prestadores de serviços e promoções sazonais.",
      },
      {
        id: "lojas-online",
        title: "Lojas Online & E-Commerce Sob Medida",
        badge: "Vendas Automatizadas 24/7",
        tagline: "Venda os seus produtos com pagamentos portugueses e checkout sem fricção.",
        description:
          "Plataformas de venda completas, intuitivas e robustas, preparadas com os métodos de pagamento favoritos dos clientes portugueses (MB WAY e Referência Multibanco) e cartões internacionais.",
        includes: [
          "Integração de pagamentos nacionais e internacionais (MB WAY, Multibanco, Cartão, Stripe)",
          "Gestão simplificada de catálogo de produtos, stocks, categorias e encomendas",
          "Checkout otimizado em página única para reduzir carrinhos abandonados",
          "Emails automáticos e elegantes de confirmação de encomenda e envio",
          "Cálculo de custos de expedição e portes de envio configuráveis",
          "Certificados de encriptação SSL e segurança bancária para total tranquilidade do cliente",
        ],
        businessImpact:
          "Aumenta a taxa de conversão com métodos familiares e automatiza a gestão de encomendas e faturação.",
        techStack: ["Next.js E-Commerce", "Stripe API", "MB WAY / Multibanco", "PostgreSQL", "Tailwind CSS"],
        idealFor:
          "Marcas próprias de roupa, artesanato, retalho, produtos digitais e empresas que pretendem vender online.",
      },
      {
        id: "web-apps",
        title: "Aplicações Web & Portais Personalizados",
        badge: "Automação & Sistemas Internos",
        tagline: "Software na web para resolver desafios operacionais e otimizar rotinas.",
        description:
          "Sistemas web sob medida que substituem folhas de Excel desorganizadas ou softwares antigos por uma interface moderna e centralizada. Dashboards de métricas, portais de clientes com login ou ferramentas operacionais.",
        includes: [
          "Áreas reservadas com autenticação segura de utilizadores e níveis de permissão",
          "Dashboards analíticos com gráficos e relatórios atualizados em tempo real",
          "Integração com bases de dados e APIs externas (faturação, CRM, calendários)",
          "Exportação de dados em formatos universais (PDF, CSV, Excel)",
          "Arquitetura escalável na cloud com máxima segurança e encriptação de dados",
        ],
        businessImpact:
          "Poupa dezenas de horas semanais à sua equipa e centraliza a informação num único local acessível de qualquer dispositivo.",
        techStack: ["Next.js App Router", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "Auth.js"],
        idealFor:
          "Startups, empresas com processos manuais pesados, portais de membros e negócios em fase de escalabilidade.",
      },
      {
        id: "manutencao",
        title: "Redesign, Otimização & Suporte Técnico",
        badge: "Manutenção & Evolução",
        tagline: "Mantenha a sua presença online sempre rápida, segura e a evoluir.",
        description:
          "Tem um site antigo, lento ou desatualizado? Transformo-o numa plataforma moderna e de carregamento instantâneo, ou assumo a manutenção contínua para que nunca tenha preocupações com avarias ou falhas técnicas.",
        includes: [
          "Auditoria completa de desempenho, segurança e pontuação Core Web Vitals",
          "Remodelação visual moderna alinhada com as tendências estéticas atuais",
          "Otimização extrema de imagens, fontes e código para carregamento instantâneo",
          "Cópias de segurança (backups) regulares e monitorização ativa de disponibilidade",
          "Atualizações contínuas de segurança e correção de vulnerabilidades",
        ],
        businessImpact:
          "Garante tranquilidade total, evita perdas por inoperacionalidade do site e mantém o seu negócio sempre competitivo.",
        techStack: ["Web Vitals Auditing", "Next.js Migration", "Code Refactoring", "Security Patches"],
        idealFor:
          "Empresas com sites existentes que pretendem modernizar ou terceirizar a gestão técnica com total confiança.",
      },
    ],
    standards: {
      badge: "Padrões de Engenharia",
      title: "Garantias aplicadas a todos os projetos",
      description:
        "Independentemente do serviço escolhido, estes princípios são rigorosamente respeitados em qualquer entrega.",
      items: [
        {
          id: "ownership",
          title: "100% Propriedade do Código",
          description:
            "Todo o código fonte, domínio e credenciais de acesso são inteiramente entregues a si. Sem taxas ocultas de fidelização nem retenção de ficheiros.",
        },
        {
          id: "speed",
          title: "Velocidade Instantânea (< 1s)",
          description:
            "Otimização rigorosa de Core Web Vitals e renderização no servidor. Cada segundo de atraso poupado representa mais vendas e melhor classificação no Google.",
        },
        {
          id: "seo",
          title: "Google SEO Estruturado de Raiz",
          description:
            "Estrutura semântica HTML5, micro-dados Schema.org, Open Graph para partilhas em redes sociais e Sitemap XML configurados desde o primeiro dia.",
        },
        {
          id: "cms",
          title: "Autonomia de Gestão de Conteúdos",
          description:
            "Painel intuitivo e limpo onde qualquer membro da sua equipa pode adicionar novos produtos, alterar fotos ou atualizar textos sem tocar em código.",
        },
        {
          id: "mobile",
          title: "Experiência Mobile Impecável",
          description:
            "Desenvolvido com abordagem Mobile-First. Testado em dezenas de resoluções de iPhone, Android, tablets e computadores para garantir perfeição.",
        },
        {
          id: "invoicing",
          title: "Faturação Legal & Suporte Direto",
          description:
            "Emissão de fatura com NIF nos termos da lei portuguesa. Acompanhamento e esclarecimento de dúvidas diretamente com quem construiu o seu projeto.",
        },
      ],
    },
    process: {
      badge: "Processo de Trabalho",
      title: "Como trabalhamos do início ao fim",
      steps: [
        {
          step: "01",
          title: "Diagnóstico & Alinhamento",
          desc: "Conversamos em chamada ou mensagem para compreender a fundo o seu modelo de negócio, o público-alvo e os requisitos essenciais da solução.",
        },
        {
          step: "02",
          title: "Arquitetura Visual & Estrutura",
          desc: "Apresento a estrutura visual e os fluxos de navegação para a sua aprovação antes de avançar para a fase de programação.",
        },
        {
          step: "03",
          title: "Desenvolvimento & Testes Rigorosos",
          desc: "Construo o projeto com Next.js e TypeScript, aplicando rigorosos testes de velocidade, segurança e compatibilidade em telemóveis e computadores.",
        },
        {
          step: "04",
          title: "Lançamento & Formação Prática",
          desc: "Colocamos o site online com domínio, SSL e Google SEO ativos, acompanhado de formação em vídeo para que saiba gerir os seus conteúdos com total independência.",
        },
      ],
    },
    faq: {
      badge: "Perguntas Frequentes",
      title: "Dúvidas comuns esclarecidas",
      items: [
        {
          q: "Preciso de ter logotipo, fotografias e textos já preparados?",
          a: "Não é obrigatório. Se já tiver os conteúdos, excelente! Se ainda não tiver, oriento-o sobre a estrutura ideal de textos e ajudo na seleção de fotografias e recursos visuais de alta qualidade adequados à sua área.",
        },
        {
          q: "Vou conseguir alterar textos e adicionar novidades sozinho no futuro?",
          a: "Sim, absolutamente. Todos os projetos institucionais e lojas incluem uma área de administração simples onde pode atualizar textos, imagens e produtos sem precisar de qualquer conhecimento de programação.",
        },
        {
          q: "Como acompanho a evolução do projeto?",
          a: "A comunicação é direta com o Mateus através do canal da sua preferência (WhatsApp, email ou chamada). Recebe atualizações regulares e um link de teste para visualizar o site em tempo real antes do lançamento oficial.",
        },
        {
          q: "O website fica seguro e em conformidade com o RGPD?",
          a: "Sim. Todos os sites incluem certificado de segurança SSL (HTTPS), formulários com consentimento explícito e páginas padrão de Política de Privacidade de acordo com a legislação europeia.",
        },
      ],
    },
    cta: {
      title: "Pronto para avançar com a sua solução digital?",
      description:
        "Entre em contacto direto. Vamos avaliar o seu caso em detalhe e desenhar a proposta ideal.",
    },
  },

  projects: {
    badge: "Portfólio & Trabalhos Selecionados",
    title: "Projetos.",
    description:
      "Uma seleção de websites institucionais, plataformas de e-commerce, landing pages de alta conversão e web apps. Cada projeto combina estética moderna, velocidade máxima e foco nos objetivos do cliente.",
    pills: [
      "Design 100% Sob Medida",
      "Performance < 1s",
      "Google SEO de Raiz",
      "Totalmente Responsivo",
    ],
    highlights: {
      badge: "Compromisso de Qualidade",
      title: "Padrões rigorosos em cada entrega",
      description:
        "Cada website é desenvolvido de acordo com os mais elevados padrões de velocidade, arquitetura semântica e experiência de utilização.",
      items: [
        {
          id: "design",
          title: "Design 100% Sob Medida",
          description:
            "Cada projeto tem uma identidade visual única, sem recurso a templates genéricos ou temas pré-fabricados.",
        },
        {
          id: "speed",
          title: "Desempenho & Velocidade",
          description:
            "Construídos em Next.js para garantir carregamentos quase instantâneos e excelentes pontuações no Google.",
        },
        {
          id: "seo",
          title: "Google SEO de Raiz",
          description:
            "Arquitetura semântica e microdados estruturados para que os clientes encontrem a sua empresa nas pesquisas.",
        },
        {
          id: "mobile",
          title: "Experiência Mobile-First",
          description:
            "Navegação intuitiva e fluida garantida em todos os ecrãs, desde smartphones a computadores de secretária.",
        },
      ],
    },
    process: {
      badge: "Processo de Criação",
      title: "Como cada projeto ganha vida",
      description:
        "Sem processos burocráticos. Trabalho diretamente consigo do primeiro esboço ao lançamento online, garantindo transparência e atenção a cada detalhe.",
      steps: [
        {
          step: "01",
          title: "Estratégia & Estrutura",
          desc: "Mapeamento do público-alvo, arquitetura de informação e definição clara dos objetivos que o website precisa de alcançar.",
        },
        {
          step: "02",
          title: "Design & Interatividade",
          desc: "Criação de uma interface visual moderna, intuitiva e responsiva, com micro-interações que elevam a perceção da marca.",
        },
        {
          step: "03",
          title: "Código Limpo & Lançamento",
          desc: "Desenvolvimento em Next.js com testes em múltiplos dispositivos, otimização de velocidade, SEO estruturado e entrega final.",
        },
      ],
    },
    cta: {
      badge: "Novo Projeto",
      title: "Tem uma ideia ou precisa de renovar a sua presença digital?",
      description:
        "Podemos analisar o seu caso em chamada ou mensagem e delinear a solução ideal para o seu negócio.",
      secondary: "Explorar Serviços",
    },
    grid: {
      filters: {
        all: "Todos",
        institucional: "Institucional",
        lojaOnline: "Loja Online",
        landingPage: "Landing Page",
        webApp: "Web App / SaaS",
      },
      showing: "A mostrar {count} projeto{s}",
      empty: "Nenhum projeto encontrado nesta categoria.",
      featured: "Destaque",
      viewCaseStudy: "Ver Case Study",
    },
  },

  projectDetail: {
    clientLabel: "Cliente",
    previewLabel: "Demonstração de Interface",
    previewDescription:
      "Ambiente construído com arquitetura otimizada, design centrado na experiência do utilizador e integrações de topo.",
    impactLabel: "Impacto Mensurável",
    challengeTitle: "O Desafio",
    solutionTitle: "A Solução",
    featuresBadge: "Arquitetura & Especificações",
    featuresTitle: "Funcionalidades Implementadas",
    previous: "Anterior",
    next: "Seguinte",
    allProjects: "Todos os Projetos",
    ctaTitle: "Quer uma solução semelhante para o seu negócio?",
    ctaDescription: "Podemos conversar em detalhe sobre o seu projeto e desenhar a proposta ideal.",
  },

  contact: {
    badge: "Iniciar um Projeto",
    title: "Contacto.",
    description:
      "Tem uma ideia, precisa de um novo website para a sua empresa ou quer renovar uma plataforma existente? Preencha o formulário ou fale comigo diretamente.",
    channelsTitle: "Canais Diretos",
    emailLabel: "Email Direto",
    emailNote: "Resposta garantida no próprio dia",
    whatsappLabel: "WhatsApp Profissional",
    whatsappNote: "Ideal para esclarecer dúvidas rápidas",
    locationLabel: "Localização",
    location: "Lisboa, Portugal",
    locationNote: "Atendimento em todo o país e no estrangeiro",
    networksLabel: "Redes & Perfis",
    faqTitle: "Perguntas Frequentes",
    faq: [
      {
        q: "Como funciona o primeiro contacto?",
        a: "Conversamos diretamente em chamada ou mensagem para compreender os seus objetivos e requisitos específicos.",
      },
      {
        q: "Terei total propriedade do website?",
        a: "Sim, 100% do código fonte, domínio e acessos de gestão são entregues inteiramente a si.",
      },
      {
        q: "Passa fatura com NIF?",
        a: "Sim, todos os serviços são faturados legalmente de acordo com a legislação fiscal portuguesa.",
      },
    ],
    form: {
      steps: {
        phase: "Fase {current} de 3",
        titles: ["1. Tipo de Projeto", "2. Preferência de Contacto", "3. Seus Dados & Mensagem"],
        goToPhase: "Ir para Fase {step}",
      },
      projectTypes: [
        {
          id: "site-institucional",
          title: "Website Institucional",
          badge: "Empresas & Negócios",
          description:
            "Apresentar a sua empresa com autoridade, elegância e transmitir máxima confiança aos seus clientes.",
        },
        {
          id: "landing-page",
          title: "Landing Page de Alta Conversão",
          badge: "Geração de Leads",
          description:
            "Página hiper-focada em campanhas de anúncios (Google/Meta), captação de contactos e vendas diretas.",
        },
        {
          id: "loja-online",
          title: "Loja Online / E-commerce",
          badge: "Vendas 24/7",
          description:
            "Plataforma de venda completa com pagamentos portugueses (MB WAY, Multibanco, Cartão) e gestão de stock.",
        },
        {
          id: "web-app",
          title: "Aplicação Web / Portal Sob Medida",
          badge: "Automação & Sistemas",
          description:
            "Sistemas web avançados, portais com login de clientes, dashboards ou automações de processos.",
        },
        {
          id: "manutencao-redesign",
          title: "Redesign, Otimização ou Suporte",
          badge: "Modernização",
          description:
            "Modernizar um site existente, otimizar a velocidade de carregamento (SEO) ou suporte técnico.",
        },
        {
          id: "outro",
          title: "Outro Tipo de Projeto",
          badge: "Personalizado",
          description: "Tem uma necessidade específica ou ideia diferente? Descreva-a diretamente.",
        },
      ],
      contactPreferences: [
        {
          id: "chamada",
          title: "Chamada Telefónica",
          desc: "Conversa direta por telefone para alinhamento rápido e esclarecimento de dúvidas.",
        },
        {
          id: "whatsapp",
          title: "WhatsApp",
          desc: "Troca rápida de mensagens, notas de voz e partilha prática de referências.",
        },
        {
          id: "email",
          title: "Email",
          desc: "Comunicação formal por escrito com proposta detalhada enviada para a sua caixa de entrada.",
        },
        {
          id: "outro",
          title: "Outro Meio",
          desc: "Reunião por videoconferência (Google Meet/Teams) ou outra plataforma à sua escolha.",
        },
      ],
      featureTags: [
        "Design UI/UX Exclusivo",
        "Otimização SEO (Google)",
        "Pagamentos MB WAY & Cartão",
        "Gestor de Conteúdos (CMS)",
        "Área Reservada / Login",
        "Integração WhatsApp Direto",
        "Animações Fluidas & Efeito Uau",
        "Multi-idioma (PT / EN)",
        "Integração de CRM / Newsletter",
        "Carregamento Instantâneo",
      ],
      errors: {
        selectProjectType: "Por favor, selecione o tipo de projeto pretendido.",
        describeProjectType: "Por favor, descreva o tipo de projeto pretendido.",
        selectContactPreference: "Por favor, selecione como prefere ser contactado.",
        specifyContactPreference: "Por favor, especifique o meio de contacto pretendido.",
        submitSuccessFallback: "Obrigado pelo seu contacto! Falaremos em breve.",
        submitErrorFallback:
          "Ocorreu um erro ao enviar. Pode também contactar diretamente por WhatsApp.",
        networkError:
          "Não foi possível conectar ao servidor. Por favor, envie uma mensagem direta por WhatsApp ou email.",
      },
      otherPrefix: "Outro: ",
      success: {
        title: "Mensagem Recebida!",
        thanksBefore: "Obrigado, ",
        thanksAfter: ". Já registei o seu pedido sobre ",
        contactBefore: "Entrarei em contacto consigo via ",
        contactAfter: " com a máxima brevidade para conversarmos em detalhe.",
        whatsappMessage:
          "Olá Mateus, acabei de enviar uma mensagem através do teu website sobre {project}!",
        whatsappCta: "Falar Agora pelo WhatsApp",
        sendAnother: "Enviar nova mensagem",
      },
      step1: {
        title: "O que precisa para o seu negócio?",
        description: "Selecione a opção que melhor representa o objetivo pretendido.",
        otherLabel: "Descreva o seu projeto:",
        otherPlaceholder:
          "Ex: Plataforma de reservas online, renovação de blog, consultoria técnica...",
        next: "Avançar para Preferência de Contacto",
      },
      step2: {
        title: "Como prefere conversar sobre o projeto?",
        description: "Escolha o meio mais conveniente para alinharmos detalhes e esclarecer dúvidas.",
        preferenceLabel: "Preferência de Comunicação",
        otherLabel: "Especifique como prefere ser contactado:",
        otherPlaceholder: "Ex: Videoconferência Google Meet, Telegram, etc.",
        featuresLabel: "Funcionalidades Relevantes (Opcional)",
        featuresHint: "Selecione as pretendidas",
        back: "← Voltar ao Tipo de Projeto",
        next: "Avançar para os Seus Dados",
      },
      step3: {
        title: "Onde posso contactá-lo?",
        description: "Indique os seus dados para que possamos iniciar a conversa.",
        summaryTitle: "Resumo da sua seleção:",
        summaryEdit: "Alterar seleção",
        summaryPreference: "Preferência:",
        summaryFeatures: "funcionalidades selecionadas",
        nameLabel: "O Seu Nome ou Empresa",
        namePlaceholder: "Ex: Ana Silva ou Empresa Lda",
        emailLabel: "Endereço de Email",
        emailPlaceholder: "email@exemplo.pt",
        phoneLabel: "Contacto Telefónico / WhatsApp",
        phoneRequired: "* (Necessário para a preferência selecionada)",
        phoneOptional: "(Opcional)",
        phonePlaceholder: "Ex: 917 810 763",
        messageLabel: "Conte-me sobre o seu projeto & objetivos",
        messagePlaceholder:
          "Conte-me um pouco sobre o seu negócio, os objetivos pretendidos e qualquer detalhe ou referência visual que ache relevante...",
        consentBefore:
          "Autorizo o tratamento dos dados estritamente para contacto em resposta a esta solicitação, conforme a ",
        consentLink: "Política de Privacidade",
        back: "← Voltar à Preferência de Contacto",
        submitting: "A enviar...",
        submit: "Enviar Mensagem",
      },
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
