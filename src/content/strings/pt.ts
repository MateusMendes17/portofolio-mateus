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
    jobTitle: "Programador Web Freelancer",
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
    tagline: "Desenvolvimento Web",
    mainAria: "Navegação principal",
    homeAria: "Página inicial — Mateus Mendes",
  },

  home: {
    hero: {
      availability: "Disponível para Novos Projetos",
      titleBefore: "Websites & Soluções Web",
      titleAccent: "Focadas em Resultados",
      subtitle:
        "Desenvolvimento à medida com código limpo, carregamento rápido e contacto direto.",
      ctaPrimary: "Falar Comigo",
      ctaSecondary: "Ver Projetos",
      stats: {
        projects: "Publicados",
        location: "Localização",
        response: "Resposta",
      },
    },
    metrics: {
      sectionHeading: "Qualidade em números",
      speed: {
        unit: "Carregamento",
        title: "Carregamento Relâmpago",
        description:
          "Nenhum cliente desiste por lentidão. Pontuação máxima nos Core Web Vitals do Google.",
        widgetLabel: "Score Google",
      },
      code: {
        badge: "Sem Bloatware",
        unit: "Sob Medida",
        title: "Código Sob Medida",
        description:
          "Sem templates reciclados ou plugins lentos. Construído de raiz com Next.js e TypeScript.",
      },
      direct: {
        badge: "Linha Direta",
        unit: "Intermediários",
        title: "Zero Intermediários",
        description:
          "Fala diretamente com quem programa o site. Acompanhamento contínuo e canal aberto.",
        widgetChat: "Canal 1-para-1",
        widgetCall: "WhatsApp & Chamada",
      },
      seo: {
        unit: "No Google",
        title: "Google SEO de Raiz",
        description:
          "Arquitetura semântica, Schema.org e sitemaps feitos para atrair tráfego orgânico gratuito.",
        widgetPosition: "★ Top Posição",
      },
    },
    servicesPreview: {
      badge: "O Que Faço",
      title: "Soluções Digitais Sob Medida",
      description:
        "Cada projeto é desenhado e programado do zero para posicionar a sua marca com máxima autoridade.",
      viewAll: "Conhecer todos os serviços",
      items: [
        {
          badge: "Alta Conversão",
          subtitle: "Design & SEO",
          title: "Websites & Landing Pages",
          description:
            "Criados para converter visitantes em clientes. Design único, carregamento ultra-rápido (< 1s) e otimização total para telemóveis e Google.",
          metricLabel: "Performance Garantida",
          metricValue: "Score 100/100 PageSpeed",
          tags: ["Next.js", "Tailwind CSS", "SEO Otimizado", "Animações Framer Motion"],
          action: "Criar o Meu Website",
        },
        {
          badge: "Vendas Automáticas",
          subtitle: "Pagamentos & Checkout",
          title: "Lojas Online & E-Commerce",
          description:
            "Plataformas de venda completas com pagamentos integrados (MB WAY, Multibanco, Cartão) e gestão simples de encomendas e catálogo.",
          metricLabel: "Pagamentos Seguros",
          metricValue: "Stripe • MB WAY • Faturação",
          tags: ["E-Commerce", "Stripe", "Checkout Rápido", "Catálogo Dinâmico"],
          action: "Criar a Minha Loja Online",
          previewStatus: "Encomenda Aprovada",
          previewConfirmed: "Confirmada",
        },
        {
          badge: "Sistemas à Medida",
          subtitle: "Automação & Processos",
          title: "Aplicações Web & Portais",
          description:
            "Sistemas web personalizados, dashboards interativos e portais de clientes que automatizam processos manuais e poupam horas diárias à sua equipa.",
          metricLabel: "Tecnologia Moderna",
          metricValue: "TypeScript & Bases de Dados",
          tags: ["TypeScript", "Bases de Dados", "Autenticação", "Painéis de Controlo"],
          action: "Discutir Solução à Medida",
          previewScalable: "Tráfego Escalável",
        },
      ],
    },
    featuredProjects: {
      badge: "Portfólio Selecionado",
      title: "Projetos em Destaque",
      description:
        "Três projetos publicados, escolhidos para mostrar como design e engenharia resolvem problemas concretos. As marcas são fictícias; os sites estão publicados.",
      viewAll: "Ver todos os projetos",
    },
    aboutPreview: {
      badge: "Diferenciais de Trabalho",
      title: "Engenharia Direta, Rigor Técnico e Transparência Total",
      description:
        "Não há gestores de conta nem equipas subcontratadas. Trabalha diretamente com quem planeia, desenha e programa cada pixel da sua solução.",
      pillars: [
        {
          num: "01",
          title: "Contacto Direto",
          desc: "Fala diretamente com o programador da sua plataforma por WhatsApp, chamada ou email em qualquer fase.",
        },
        {
          num: "02",
          title: "Propriedade Total",
          desc: "100% do código fonte, domínio e acessos de administração são entregues inteiramente a si após a conclusão.",
        },
        {
          num: "03",
          title: "Faturação Legal Completa",
          desc: "Todos os serviços prestados são legalmente faturados com NIF de acordo com a legislação fiscal portuguesa.",
        },
      ],
      footerNote: "Quer conhecer a fundo a minha stack e princípios de código?",
      footerLink: "Saber mais sobre o Mateus",
    },
    quizTeaser: {
      badge: "Assistente Interativo",
      title: "Não sabe ao certo qual a solução ideal para o seu projeto?",
      description:
        "Responda a 3 perguntas rápidas no nosso assistente interativo e receba uma recomendação técnica adaptada aos seus objetivos.",
      cta: "Iniciar Assistente",
    },
    ctaSection: {
      badge: "Vamos Conversar",
      title: "Pronto para elevar a presença digital da sua empresa?",
      description:
        "Vamos conversar sem qualquer compromisso sobre os seus objetivos. Entre em contacto por formulário, chamada ou mensagem direta.",
      whatsappMessage:
        "Olá Mateus, vi o teu website e gostaria de conversar sobre um projeto!",
      whatsappCta: "Falar no WhatsApp",
    },
    testimonials: {
      badge: "O Que Dizem os Clientes",
      title: "Confiança Construída Projecto a Projecto",
      items: [
        {
          quote: "O Mateus transformou completamente a nossa presença digital. Passámos de um site constrangedor a uma referência no nosso setor. Os clientes comentam frequentemente a qualidade do novo website.",
          author: "Dr. Ricardo Silva",
          role: "Sócio-Gerente",
          company: "Silva & Associados",
        },
        {
          quote: "A loja online superou todas as expectativas. O checkout com MB WAY e Multibanco é impecável e o dashboard poupa-nos horas todas as semanas. Recomendo sem hesitar.",
          author: "Ana Martins",
          role: "Fundadora",
          company: "Green Harvest",
        },
        {
          quote: "Precisávamos de uma landing page para Google Ads que convertesse mesmo. O resultado foi uma redução drástica no custo por lead e uma taxa de conversão muito acima da média do setor.",
          author: "Dr. João Costa",
          role: "Diretor Clínico",
          company: "Clínica Sorrir",
        },
      ],
    },
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
        id: "saas",
        title: "Plataformas SaaS & Produtos Digitais",
        badge: "SaaS & Subscrições",
        tagline: "Transforme uma ideia num produto digital escalável com subscrições e multi-tenant.",
        description:
          "Desenvolvo plataformas SaaS completas, desde o MVP até à escala, com autenticação, faturação por subscrição, gestão de organizações multi-tenant e painéis de administração. Tudo pronto para crescer com o seu negócio.",
        includes: [
          "Arquitetura multi-tenant com isolamento de dados por organização",
          "Autenticação segura com login social, magic links e gestão de equipas",
          "Faturação por subscrição com Stripe (planos, upgrades, cancelamentos)",
          "Painel de administração com métricas de negócio e gestão de utilizadores",
          "APIs REST/GraphQL documentadas e webhooks para integrações",
          "Onboarding guiado e emails transacionais automatizados",
          "Infraestrutura cloud escalável com backups e monitorização",
        ],
        businessImpact:
          "Lança um produto digital recorrente com receita previsível, pronto para captar os primeiros clientes e escalar.",
        techStack: ["Next.js App Router", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Auth.js", "Tailwind CSS"],
        idealFor:
          "Founders, startups e empresas que querem lançar um produto digital por subscrição ou monetizar uma ferramenta interna.",
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
    badge: "Portfólio publicado",
    title: "Projetos.",
    description:
      "Oito sites publicados, construídos de ponta a ponta como estudos de caso. Marcas fictícias, decisões reais: estrutura, tipografia, interação e código.",
    pills: [
      "Sites publicados",
      "Código próprio",
      "Acessibilidade em conta",
      "PT/EN quando faz sentido",
    ],
    highlights: {
      badge: "Critérios",
      title: "O que se mantém em cada projeto",
      description:
        "Não há um template único. Há um método: perceber o contexto, escolher a stack mínima e tratar a interface como parte do conteúdo.",
      items: [
        {
          id: "design",
          title: "Identidade antes do template",
          description:
            "Cada marca tem uma voz, uma tipografia e uma paleta próprias. O layout nasce do conteúdo, não de um tema comprado.",
        },
        {
          id: "speed",
          title: "Peso controlado",
          description:
            "Páginas leves, imagens comprimidas e JavaScript só onde acrescenta interação. A stack mínima certa para cada projeto, não a mais popular.",
        },
        {
          id: "seo",
          title: "Semântica e foco",
          description:
            "Headings com hierarquia, landmarks, foco visível e navegação por teclado. Acessibilidade não é uma camada no fim.",
        },
        {
          id: "mobile",
          title: "Responsivo a sério",
          description:
            "A experiência móvel não é uma versão reduzida. Menus, formulários e conteúdo foram pensados para ecrãs pequenos.",
        },
      ],
    },
    process: {
      badge: "Processo",
      title: "Como cada projeto ganha forma",
      description:
        "Do primeiro esboço ao site publicado, sem intermediários e com decisões documentadas.",
      steps: [
        {
          step: "01",
          title: "Contexto & estrutura",
          desc: "Definir o problema, a informação essencial e a arquitetura antes de desenhar.",
        },
        {
          step: "02",
          title: "Identidade & interação",
          desc: "Tipografia, cor, grelha e os gestos que tornam a marca reconhecível.",
        },
        {
          step: "03",
          title: "Código & publicação",
          desc: "Construir com a stack adequada, testar em teclado e mobile, medir e publicar.",
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
      index: "Índice",
      projectCount: "{count} projetos publicados",
      jumpTo: "Ir para o projeto",
      coverAlt: "Página inicial de {name}",
      openSite: "Abrir site",
      published: "Publicado",
      allProjects: "Todos",
    },
  },

  projectDetail: {
    labels: {
      brief: "Brief",
      decisions: "Decisões",
      build: "Construção",
      accessibility: "Acessibilidade & performance",
      specs: "Ficha do projeto",
      type: "Formato",
      status: "Estado",
      published: "Publicado",
      stack: "Stack",
      site: "Site",
      code: "Código",
      privateCode: "Repositório privado",
      role: "Papel",
      roleValue: "Design e desenvolvimento",
      openSite: "Abrir site",
      viewCode: "Ver código",
      allProjects: "Todos os projetos",
      previous: "Anterior",
      next: "Seguinte",
      backToProjects: "Voltar aos projetos",
      disclaimer: "Projeto de portfólio. Marca e dados fictícios.",
      coverAlt: "Página inicial de {name}",
      metricsNote:
        "Sem pontuação Lighthouse publicada. A verificação foi feita no navegador, com teclado, foco visível e movimento reduzido.",
      nextStep: "Próximo passo",
      breadcrumb: "Navegação estrutural",
      pagination: "Navegação entre projetos",
      newWindow: "abre numa nova janela",
      ctaTitle: "Quer uma solução semelhante para o seu negócio?",
      ctaDescription:
        "Podemos conversar em detalhe sobre o seu projeto e desenhar a proposta ideal.",
    },
    studies: {
      "torra-lusa": {
        sector: "Café de especialidade",
        location: "Porto",
        format: "Loja online multi-página",
        summary:
          "Uma loja de café de especialidade que trata a compra como parte do ritual: origem, moagem, frescura e assinatura explicadas sem pressa.",
        brief: [
          "O ponto de partida foi uma torrefação fictícia no Porto, com uma ideia simples: vender café sem transformar a experiência numa lista de SKUs. O site tinha de apresentar origens, blends, cápsulas, acessórios e packs, mas também contar como o café é torrado e como chega à chávena.",
          "O brief pedia uma loja completa — pesquisa, carrinho, checkout e páginas legais — com uma voz editorial que não parecesse uma loja genérica. A marca, os produtos e os dados são fictícios; o exercício foi construir o sistema inteiro.",
        ],
        decisions: [
          {
            title: "Uma loja com tempo próprio",
            text: "Papel quente, castanho e caramelo, Fraunces para títulos e DM Sans para texto. A grelha respira e as fotografias de café ocupam o espaço que normalmente seria ocupado por banners de desconto.",
          },
          {
            title: "Escolher antes de comprar",
            text: "Um pequeno questionário sugere café por método e perfil de sabor; a ficha de produto mostra origem, processo, notas e data de torra. O objetivo era reduzir a dúvida sem esconder informação.",
          },
          {
            title: "Carrinho discreto, checkout claro",
            text: "A adição rápida abre um carrinho lateral com totais e portes; o checkout separa entrega, pagamento e confirmação. Tudo com estados vazios e mensagens de erro escritas em português corrente.",
          },
        ],
        build: [
          "Site multi-página em HTML, CSS e JavaScript modular, com header, footer, carrinho e componentes partilhados injetados a partir de módulos ES.",
          "Catálogo com pesquisa, filtros por categoria e moagem, fichas de produto, assinatura e páginas de FAQ, envios, termos e privacidade.",
          "Carrinho persistido em `localStorage`, checkout demonstrativo, confirmação de encomenda, newsletter e consentimento de cookies. As imagens foram convertidas para WebP.",
        ],
        accessibility: [
          "A navegação móvel e o carrinho prendem o foco enquanto estão abertos e devolvem-no ao botão que os abriu. Os controlos têm rótulos, `aria-expanded` e estados de erro associados aos campos.",
          "As animações respeitam `prefers-reduced-motion` e o site mantém uma hierarquia de headings simples. As páginas de produto e checkout foram verificadas com teclado.",
        ],
        nextStep:
          "Ligar o checkout a um serviço de pagamento real e rever os estados de erro com leitores de ecrã.",
      },
      "cota-zero": {
        sector: "Arquitetura",
        location: "Porto",
        format: "Portefólio de atelier multi-página",
        summary:
          "Um atelier de arquitetura que apresenta seis obras, processo e materiais com a precisão de um desenho técnico — sem transformar o portefólio numa galeria silenciosa.",
        brief: [
          "A Cota Zero é uma marca fictícia de arquitetura no Porto, com seis projetos e uma prática centrada em reabilitação e obra nova. O site tinha de mostrar o atelier, o processo, os materiais e as fichas de projeto sem diluir a identidade num template de arquitetura.",
          "O brief pedia uma linguagem gráfica forte e navegável: um índice de obras, filtros, uma planta interativa e páginas de projeto com dados concretos. O conteúdo e os projetos são inventados para o exercício.",
        ],
        decisions: [
          {
            title: "Tipografia como planta",
            text: "Archivo Black para o wordmark, JetBrains Mono para dados e uma paleta de papel, tinta e laranja-sinal. A grelha e as linhas substituem cartões e sombras.",
          },
          {
            title: "Modo planta",
            text: "O botão «Planta» sobrepõe uma grelha de medição ao site, com medidas e eixos. É um gesto de identidade, mas também uma forma de explicar a lógica do atelier.",
          },
          {
            title: "Índice antes de imagem",
            text: "As obras aparecem primeiro como uma tabela tipográfica, com ano, tipo e localização; a fotografia entra depois, em páginas próprias. O visitante percebe o conjunto antes de abrir uma obra.",
          },
        ],
        build: [
          "Dez páginas HTML/CSS/JS com módulos ES para navegação, intro, contadores, filtros, planta e páginas de projeto. As texturas de betão, corten, madeira, pedra, tijolo e vidro são SVG locais.",
          "Índice de projetos com filtros por obra, ficha de projeto gerada a partir de dados e uma planta sobreponível com gestão de foco e `inert` no conteúdo de fundo.",
          "Fontes WOFF2 locais, imagens WebP com variantes de tamanho e um sistema de componentes partilhado. O JavaScript só carrega os módulos da página atual.",
        ],
        accessibility: [
          "A planta e o menu móvel usam `inert` para retirar o fundo da ordem de foco, devolvem o foco ao gatilho e respondem a Esc. O movimento é reduzido quando `prefers-reduced-motion` está ativo.",
          "Os links têm foco visível e a estrutura de headings acompanha a hierarquia do conteúdo. As imagens de projeto têm texto alternativo descritivo.",
        ],
        nextStep:
          "Auditar o contraste das legendas sobre as texturas e documentar os atalhos da planta.",
      },
      "mendes-valadares": {
        sector: "Advocacia",
        location: "Lisboa",
        format: "Site institucional multi-página",
        summary:
          "Uma sociedade de advogados de Lisboa que explica o trabalho antes de pedir contacto: áreas, equipa, honorários, artigos e perguntas frequentes.",
        brief: [
          "Mendes Valadares & Associados é uma sociedade fictícia em Lisboa, fundada em 2008. O site tinha de transmitir rigor e proximidade sem cair no tom distante de muitos sites jurídicos.",
          "O brief incluía oito áreas de atuação, cinco advogados, artigos, contactos, FAQ e informação sobre honorários. A marca e os dados são fictícios; o exercício foi organizar muita informação sem a esconder atrás de jargão.",
        ],
        decisions: [
          {
            title: "Azulejo e azul profundo",
            text: "A identidade parte do azulejo lisboeta e de um azul de escritório, com bronze para detalhes. DM Sans em pesos médios mantém o texto legível e evita a serifada jurídica óbvia.",
          },
          {
            title: "Números que orientam",
            text: "As secções são numeradas como um processo: áreas, equipa, sobre, artigos, contactos. O estado «Atendimento aberto» é calculado no browser, com hora de Lisboa.",
          },
          {
            title: "Explicar antes do formulário",
            text: "Cada área tem uma ficha com exemplos de questões, a equipa tem perfis e os artigos respondem a dúvidas concretas. O contacto aparece depois da informação, não antes.",
          },
        ],
        build: [
          "Onze páginas HTML/CSS/JS com header, footer, áreas, equipa e artigos gerados a partir de dados partilhados.",
          "Modais nativos para áreas e equipa, acordeões de FAQ, tabs, estado de atendimento, progresso de leitura, mapa carregado após consentimento e formulário de contacto.",
          "Fontes WOFF2 locais, imagens WebP e um conjunto de componentes de interface reutilizáveis. O JavaScript é modular e não depende de frameworks.",
        ],
        accessibility: [
          "Os diálogos usam `<dialog>` nativo, com foco contido e retorno ao gatilho; o menu móvel e o banner de cookies gerem foco e Esc. Há skip link, foco visível e `prefers-reduced-motion`.",
          "As imagens de conteúdo têm texto alternativo e as secções mantêm uma hierarquia de headings estável. O formulário de contacto tem labels e mensagens de erro associadas.",
        ],
        nextStep:
          "Rever os textos legais e testar o formulário com um serviço de email real.",
      },
      "barbearia-sete-colinas": {
        sector: "Barbearia",
        location: "Lisboa",
        format: "Landing page de página única",
        summary:
          "Uma barbearia de bairro em Lisboa com menu de cortes, galeria, equipa e um fluxo de marcação que cabe num scroll.",
        brief: [
          "A Barbearia Sete Colinas é uma marca fictícia na Rua da Madalena, em Lisboa. O site tinha de parecer um espaço real: madeira escura, latão, cadeiras de couro e uma equipa com nome.",
          "O brief era uma página única com serviços e preços, galeria, equipa, testemunhos e marcação. O visitante devia conseguir marcar sem sair da página e sem criar conta.",
        ],
        decisions: [
          {
            title: "Escuro, mas não pesado",
            text: "Cinza-carvão, latão e fotografia quente. A tipografia Inter em tamanhos grandes dá presença ao hero sem competir com a imagem.",
          },
          {
            title: "O menu é o argumento",
            text: "Os serviços aparecem com preço, duração e um botão «Marcar» que pré-seleciona o serviço no formulário. A informação prática fica acima da decoração.",
          },
          {
            title: "Marcação em camadas",
            text: "O formulário pede nome, telemóvel, barbeiro, serviço, data e hora; valida os campos, mostra um resumo e oferece confirmação por WhatsApp. O estado aberto/fechado é calculado a partir do horário.",
          },
        ],
        build: [
          "Uma página HTML/CSS/JS sem dependências, com navegação fixa, secções reveladas ao scroll, contadores, galeria com lightbox e carrossel de testemunhos.",
          "Formulário de marcação com máscara de telemóvel, horários disponíveis por dia, validação no cliente e resumo antes de enviar. O envio é demonstrativo.",
          "Imagens WebP em várias larguras, fontes WOFF2 locais, manifest e metadados de partilha. O JavaScript está dividido por blocos independentes.",
        ],
        accessibility: [
          "O menu móvel e a lightbox gerem foco e fecham com Esc; os campos têm labels, mensagens de erro e estados `aria-invalid`. As animações e o carrossel param quando `prefers-reduced-motion` está ativo.",
          "A navegação tem foco visível e a galeria pode ser percorrida sem rato. O formulário mantém os erros junto dos campos em vez de os resumir longe do contexto.",
        ],
        nextStep:
          "Ligar o formulário a um serviço real de marcações e testar a confirmação por WhatsApp em telemóvel.",
      },
      lumina: {
        sector: "Restaurante",
        location: "Lisboa",
        format: "Aplicação React multi-rota",
        summary:
          "Um restaurante contemporâneo em Lisboa com menu de degustação, nove pratos com página própria, carta de vinhos, galeria e reservas.",
        brief: [
          "Lumina é um restaurante fictício de gastronomia contemporânea em Lisboa. O site tinha de vender uma experiência: sala escura, pratos de autor e uma carta que se lê como uma viagem.",
          "O brief pedia menu, páginas individuais para cada prato, carta de vinhos, galeria, história, reservas e uma versão bilingue PT/EN. A marca, os pratos e as fotografias de demonstração são fictícios.",
        ],
        decisions: [
          {
            title: "A sala antes do menu",
            text: "O hero é uma fotografia de sala em contraluz, com título serifado e um único CTA. O menu surge depois, como uma continuação da experiência.",
          },
          {
            title: "Cada prato tem uma página",
            text: "Os nove pratos têm rota própria, com imagem, descrição e detalhes. A carta de vinhos é uma lista separada, não um PDF.",
          },
          {
            title: "Reserva sem atrito",
            text: "O formulário de reserva pede data, hora, pessoas e contacto; o seletor de data e os estados de erro evitam submissões incompletas.",
          },
        ],
        build: [
          "Aplicação React 18 com Vite, React Router e Tailwind CSS. As rotas incluem casa, sobre, galeria, carta de vinhos, nove pratos e páginas legais.",
          "Dados de pratos e vinhos em módulos próprios; contexto de idioma PT/EN; formulário de reserva com seletor de data e validação; botão de voltar ao topo e estado de abertura.",
          "Build Vite com assets com hash, imagens em `public/` e CSS compilado. A versão de menu para impressão tem uma folha de estilos dedicada.",
        ],
        accessibility: [
          "A aplicação usa landmarks, headings por secção e labels nos campos da reserva. Os contrastes claros sobre fotografia escura foram verificados no navegador.",
          "Ainda não existe uma variante dedicada a `prefers-reduced-motion`; as transições são CSS e ficam como próximo passo.",
        ],
        nextStep:
          "Adicionar uma variante de movimento reduzido e consolidar a fonte display com um fallback local.",
      },
      dentilusa: {
        sector: "Clínica dentária",
        location: "Lisboa",
        format: "Site institucional multi-página",
        summary:
          "Uma clínica dentária em Lisboa que explica tratamentos, preços e o que acontece em cada consulta — com um formulário de marcação longo, mas guiado.",
        brief: [
          "DentiLusa é uma clínica fictícia junto ao Marquês de Pombal. O site tinha de reduzir o medo do dentista: explicar antes de tratar, mostrar a equipa e deixar claro o que custa e o que acontece na primeira consulta.",
          "O brief incluía dez tratamentos, preços, equipa, FAQ, urgências e marcação. A marca, os profissionais e os dados são fictícios.",
        ],
        decisions: [
          {
            title: "Azul clínico, não frio",
            text: "Azul profundo, marfim e uma serifada Fraunces para os títulos. A fotografia da clínica é usada como contexto, não como prova de stock.",
          },
          {
            title: "Explicar o medo",
            text: "Uma secção dedicada responde a quem tem medo: cada passo é explicado, pode pedir pausa e a primeira consulta é só para conhecer. A FAQ responde a dúvidas concretas sobre dor, tempo e preços.",
          },
          {
            title: "Preço e processo à vista",
            text: "Os tratamentos têm descrições curtas e âncoras; a página inicial mostra preços orientativos, formas de pagamento e urgências. O formulário pede o tipo de consulta e o médico preferido.",
          },
        ],
        build: [
          "Quatro páginas HTML/CSS/JS com tratamentos, equipa e preços gerados a partir de dados; navegação com scrollspy, estado aberto/fechado e botão de voltar ao topo.",
          "Formulário de marcação com validação, geração de horas, resumo e rascunho guardado em `localStorage`; FAQ em acordeão, testemunhos em carrossel e consentimento de cookies.",
          "Fontes Google com fallback local, imagens WebP, metadados e manifest. O JavaScript é vanilla e organizado por módulos de página.",
        ],
        accessibility: [
          "Os campos do formulário têm labels, ajuda contextual, mensagens de erro e `aria-invalid`; o foco é visível e a navegação por teclado percorre tratamentos e FAQ. As animações respeitam `prefers-reduced-motion`.",
          "A página de tratamentos usa âncoras com headings próprios e a FAQ mantém o estado aberto/fechado anunciado. O formulário longo foi dividido em blocos para não sobrecarregar o ecrã.",
        ],
        nextStep:
          "Testar o formulário com um serviço de marcações real e rever os limites de comprimento das mensagens.",
      },
      aqualis: {
        sector: "Canalizações",
        location: "Lisboa",
        format: "Site de serviços com páginas dedicadas",
        summary:
          "Uma empresa de canalizações em Lisboa que trata a urgência como produto: telefone visível, preço fechado, chegada em 60 minutos e garantia de 12 meses.",
        brief: [
          "AquaLis é uma marca fictícia de canalizações em Lisboa e arredores. O site tinha de converter em mobile, muitas vezes em situação de urgência, sem prometer o que não pode cumprir.",
          "O brief incluía sete serviços com página própria, zonas, preços orientativos, testemunhos, FAQ, verificação de zona e pedido de orçamento. A marca e os dados são fictícios.",
        ],
        decisions: [
          {
            title: "Telefone primeiro",
            text: "O número 24h aparece no topo, no hero e no rodapé; o botão laranja «Ligar agora» é o CTA principal. O laranja é usado como sinal de urgência, não como decoração.",
          },
          {
            title: "Preço antes do formulário",
            text: "A página mostra preços orientativos, o que está incluído e como o orçamento é calculado. O formulário pede concelho, serviço, urgência, descrição e uma foto opcional.",
          },
          {
            title: "Prova local",
            text: "Zonas de atuação, testemunhos e um processo em quatro passos respondem às dúvidas de quem procura um canalizador local. O mapa do Google só carrega depois do consentimento.",
          },
        ],
        build: [
          "Página inicial e sete páginas de serviço em HTML/CSS/JS, com dados de serviços, preços, zonas e testemunhos em módulos partilhados.",
          "Verificador de zona por código postal, formulário de orçamento com validação e upload de foto, carrossel de testemunhos, FAQ em acordeão e indicador de disponibilidade.",
          "Fontes WOFF2 locais, imagens otimizadas, preferências de cookies e carregamento condicional do mapa. O JavaScript é vanilla, sem dependências.",
        ],
        accessibility: [
          "O menu móvel, o banner de cookies e os acordeões gerem foco e estados `aria-expanded`; os campos têm labels, ajuda e erros associados. As animações e contadores respeitam `prefers-reduced-motion`.",
          "O mapa só é carregado depois do consentimento, o que também evita pedidos externos desnecessários. A navegação de serviço mantém foco visível e uma ordem de headings previsível.",
        ],
        nextStep:
          "Rever os preços orientativos com dados reais e testar o upload de fotos num servidor.",
      },
      forja: {
        sector: "Ginásio",
        location: "Braga",
        format: "Site multi-página",
        summary:
          "Um ginásio em Braga com nove formatos de aula, horário semanal, planos, treinadores e uma aula experimental — tudo com a voz de uma oficina, não de uma app de fitness.",
        brief: [
          "FORJA Training Club é um ginásio fictício em Braga, fundado em 2017. O site tinha de mostrar que o treino é acompanhado e que existe um plano para quem nunca treinou ou quer recomeçar.",
          "O brief incluía horário, aulas, planos, treinadores, instalações, contactos, FAQ e marcação de aula experimental. A marca, os treinadores e os dados são fictícios.",
        ],
        decisions: [
          {
            title: "Uma oficina, não uma app",
            text: "Preto grafite, azul profundo e Anton em maiúsculas. A linguagem visual vem de ferramentas, placas e horários de oficina; o azul marca ação e estado.",
          },
          {
            title: "Horário como peça central",
            text: "A grelha semanal mostra aulas, níveis e treinadores; cada aula tem página própria. O visitante pode filtrar por dia e por formato.",
          },
          {
            title: "Planos sem letras pequenas",
            text: "Os três planos têm preço, condições e um quiz que ajuda a escolher. A aula experimental é o CTA principal em todas as páginas.",
          },
        ],
        build: [
          "Site multi-página com módulos ES e carregamento condicional por rota: UI, motion, home, horário, aulas, planos, quiz, treinadores, instalações, trial e FAQ.",
          "Horário filtrável, páginas de aula, planos, quiz de recomendação, formulário de aula experimental, FAQ e consentimento de cookies. Há uma folha de estilos de impressão para o horário.",
          "Fontes locais, imagens WebP, componentes partilhados e JavaScript sem dependências. O HTML é estático e o conteúdo é renderizado a partir de dados.",
        ],
        accessibility: [
          "O menu e os diálogos gerem foco e fecham com Esc; há skip link, foco visível e `prefers-reduced-motion`. Os formulários têm labels e os acordeões usam `aria-expanded`.",
          "A grelha de horário mantém uma ordem de leitura por dia e por aula, e os cartões de plano expõem preço e condições no próprio conteúdo.",
        ],
        nextStep:
          "Testar o horário e o quiz com leitores de ecrã e ligar a marcação a um calendário real.",
      },
    },
  },

  contact: {
    badge: "Iniciar um Projeto",
    title: "Contacto.",
    description:
      "Tem uma ideia, precisa de um novo website para a sua empresa ou quer renovar uma plataforma existente? Preencha o formulário ou fale comigo diretamente.",
    newsletterBadge: "Recurso Gratuito",
    newsletterTitle: "Quer Receber o Checklist de Conversão?",
    newsletterDesc: "12 pontos para auditar o seu site hoje. Baixe o PDF grátis e comece a converter mais visitantes em clientes.",
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
    responseTimeValue: "24 horas",
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
    newsletterTitle: "Newsletter",
    newsletterNote: "Checklist de conversão e notas técnicas. Sem spam.",
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

  whatsappFloat: {
    aria: "Falar comigo por WhatsApp",
  },

  command: {
    open: "Pesquisa rápida",
    openAria: "Abrir pesquisa rápida (Ctrl+K)",
    placeholder: "Pesquisar páginas, projetos, ações…",
    sections: {
      navigation: "Navegação",
      projects: "Projetos",
      actions: "Ações",
    },
    actions: {
      theme: "Alternar tema (claro / escuro)",
      language: "Alternar idioma (PT / EN)",
      copyEmail: "Copiar endereço de email",
      copied: "Copiado!",
      whatsapp: "Falar por WhatsApp",
      github: "Abrir GitHub",
      linkedin: "Abrir LinkedIn",
    },
    empty: "Sem resultados para",
    hintSelect: "Selecionar",
    hintClose: "Fechar",
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

  themeToggle: {
    switchToLight: "Mudar para tema claro",
    switchToDark: "Mudar para tema escuro",
  },

  mobileNav: {
    language: "Idioma",
    theme: "Modo de Visualização",
  },

  stats: {
    sectionHeading: "O meu trabalho em números",
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
    backHome: "← Voltar à página inicial",
    title: "Política de Privacidade & RGPD",
    lastUpdatedPrefix: "Última atualização:",
    controller: {
      heading: "1. Responsável pelo Tratamento de Dados",
      beforeName:
        "O responsável pelo tratamento dos dados recolhidos através deste website é",
      afterName: ", com endereço eletrónico de contacto em",
    },
    collectedData: {
      heading: "2. Dados Recolhidos e Finalidade",
      intro:
        "Os dados recolhidos através do formulário de contacto (nome, endereço de email, contacto telefónico, tipo de projeto, preferência de contacto e mensagem) destinam-se exclusivamente a:",
      list: [
        "Responder a pedidos de informação e esclarecimento de dúvidas;",
        "Apresentar propostas personalizadas relativas aos serviços solicitados;",
        "Agendamento de reuniões ou chamadas de alinhamento com o utilizador.",
      ],
      neverBefore: "Os seus dados",
      neverStrong: "nunca",
      neverAfter:
        "serão vendidos, cedidos a terceiros para efeitos de marketing ou utilizados para qualquer fim não autorizado.",
    },
    legalBasis: {
      heading: "3. Base Legal para o Tratamento",
      body: "O tratamento dos seus dados fundamenta-se no consentimento expresso prestado pelo utilizador no momento da submissão do formulário de contacto (Artigo 6.º, n.º 1, alínea a) do Regulamento Geral sobre a Proteção de Dados — RGPD).",
    },
    retention: {
      heading: "4. Conservação dos Dados",
      body: "Os dados pessoais serão conservados apenas durante o período necessário para responder à sua solicitação e dar seguimento à eventual relação comercial, sendo eliminados decorrido o prazo legal ou caso solicite o seu apagamento.",
    },
    rights: {
      heading: "5. Direitos do Titular dos Dados",
      beforeLink:
        "Nos termos do RGPD, tem o direito de aceder, retificar, limitar ou solicitar o apagamento dos seus dados pessoais a qualquer momento. Para exercer estes direitos, basta enviar uma mensagem para",
    },
    cookies: {
      heading: "6. Cookies e Rastreamento",
      body: "Este website não utiliza cookies invasivos ou de publicidade direcionada. Utiliza unicamente armazenamento local estritamente necessário para guardar as suas preferências de tema (Dia / Noite) e idioma (PT / EN). Para estatísticas agregadas e anónimas de utilização é empregue o Vercel Analytics, que não recolhe dados pessoais nem define cookies de rastreamento.",
    },
  },

  common: {
    startConversation: "Iniciar Conversa",
  },

  cookieConsent: {
    title: "Gerir Cookies",
    description: "Usamos cookies para melhorar a sua experiência, analisar tráfego e personalizar conteúdo.",
    alwaysActive: "Sempre ativos",
    necessary: {
      title: "Necessários",
      desc: "Essenciais para o funcionamento do site (segurança, rede, acessibilidade).",
    },
    analytics: {
      title: "Analytics",
      desc: "Ajuda-nos a entender como os visitantes interagem (Vercel Analytics, Google Analytics).",
    },
    marketing: {
      title: "Marketing",
      desc: "Usado para anúncios personalizados e medição de campanhas (Meta Pixel, Google Ads).",
    },
    acceptAll: "Aceitar Todos",
    rejectAll: "Apenas Necessários",
    savePreferences: "Guardar Preferências",
    footer: "Pode alterar as suas preferências a qualquer momento na nossa ",
    policyLink: "Política de Privacidade",
    footer2: ".",
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
