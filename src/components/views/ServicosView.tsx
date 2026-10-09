"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { TextReveal3D } from "@/components/ui/TextAnimations";

export function ServicosView() {
  const { isEnglish, t } = useLanguage();
  
  // Horizontal Scroll Setup
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  const servicesList = isEnglish
    ? [
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
          idealFor: "SMEs, law firms, consultants, medical clinics, real estate agencies, and premium service providers.",
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
          idealFor: "Product launches, lead generation for events/courses, service professionals, and seasonal promotions.",
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
          idealFor: "Apparel brands, artisanal crafts, retail, digital products, and businesses scaling online.",
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
          idealFor: "Startups, businesses with heavy manual workflows, membership communities, and scaling companies.",
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
          idealFor: "Businesses with existing sites looking to modernize or outsource technical management with confidence.",
        },
      ]
    : [
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
          idealFor: "PMEs, gabinetes de advocacia, consultores, clínicas médicas, imobiliárias e prestadores de serviços.",
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
          idealFor: "Lançamento de novos produtos, captação de leads para cursos/eventos, prestadores de serviços e promoções sazonais.",
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
          idealFor: "Marcas próprias de roupa, artesanato, retalho, produtos digitais e empresas que pretendem vender online.",
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
          idealFor: "Startups, empresas com processos manuais pesados, portais de membros e negócios em fase de escalabilidade.",
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
          idealFor: "Empresas com sites existentes que pretendem modernizar ou terceirizar a gestão técnica com total confiança.",
        },
      ];

  const standards = isEnglish
    ? [
        {
          title: "100% Code Ownership",
          description:
            "All source code, domains, and access credentials belong entirely to you. No hidden lock-in fees or hostage files.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          ),
        },
        {
          title: "Instant Speed (< 1s)",
          description:
            "Sub-second Core Web Vitals with server-side rendering. Every second saved translates to higher conversion rates and Google rankings.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          ),
        },
        {
          title: "Native Google SEO Architecture",
          description:
            "HTML5 semantic structure, Schema.org microdata, Open Graph social share tags, and dynamic sitemaps configured from day one.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          ),
        },
        {
          title: "Effortless Content Autonomy",
          description:
            "Intuitive administration dashboard allowing any team member to update texts, products, or photos without touching code.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 8h10M7 12h10M7 16h6" />
            </svg>
          ),
        },
        {
          title: "Flawless Mobile Experience",
          description:
            "Engineered with a mobile-first philosophy, meticulously tested across iPhone, Android, tablet, and desktop viewports.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
          ),
        },
        {
          title: "Compliant Invoicing & Direct Support",
          description:
            "Official legal invoicing with direct communication and guidance from the developer who engineered your platform.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
          ),
        },
      ]
    : [
        {
          title: "100% Propriedade do Código",
          description:
            "Todo o código fonte, domínio e credenciais de acesso são inteiramente entregues a si. Sem taxas ocultas de fidelização nem retenção de ficheiros.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          ),
        },
        {
          title: "Velocidade Instantânea (< 1s)",
          description:
            "Otimização rigorosa de Core Web Vitals e renderização no servidor. Cada segundo de atraso poupado representa mais vendas e melhor classificação no Google.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          ),
        },
        {
          title: "Google SEO Estruturado de Raiz",
          description:
            "Estrutura semântica HTML5, micro-dados Schema.org, Open Graph para partilhas em redes sociais e Sitemap XML configurados desde o primeiro dia.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          ),
        },
        {
          title: "Autonomia de Gestão de Conteúdos",
          description:
            "Painel intuitivo e limpo onde qualquer membro da sua equipa pode adicionar novos produtos, alterar fotos ou atualizar textos sem tocar em código.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M7 8h10M7 12h10M7 16h6" />
            </svg>
          ),
        },
        {
          title: "Experiência Mobile Impecável",
          description:
            "Desenvolvido com abordagem Mobile-First. Testado em dezenas de resoluções de iPhone, Android, tablets e computadores para garantir perfeição.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
          ),
        },
        {
          title: "Faturação Legal & Suporte Direto",
          description:
            "Emissão de fatura com NIF nos termos da lei portuguesa. Acompanhamento e esclarecimento de dúvidas diretamente com quem construiu o seu projeto.",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
            </svg>
          ),
        },
      ];

  const steps = isEnglish
    ? [
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
      ]
    : [
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
      ];

  const faqs = isEnglish
    ? [
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
      ]
    : [
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
      ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-24">
      {/* Floating 3D Geometric Elements for Page Background */}
      <FloatingElements count={3} variant="minimal" />

      {/* 1. Cabeçalho de Alto Impacto */}
      <section className="max-w-3xl relative z-10">
        <ScrollReveal direction="up" distance={40}>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary mb-3 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          {isEnglish ? "Web Development Services" : "Serviços de Desenvolvimento Web"}
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
          <TextReveal3D>{isEnglish ? "Services." : "Serviços."}</TextReveal3D>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed">
          {isEnglish
            ? "From high-converting landing pages to prestigious corporate websites and custom e-commerce platforms. Every project is crafted with clean code, sub-second speed, and meticulous attention to detail."
            : "Desde uma landing page de alta conversão até um website institucional de prestígio ou uma plataforma de e-commerce sob medida. Cada projeto é executado com código limpo, velocidade e atenção obsessiva ao detalhe."}
        </p>

        {/* Atalhos Rápidos */}
        <div className="mt-8 flex flex-wrap gap-2 pt-2">
          {servicesList.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-accent transition-all"
            >
              {item.title.split(" — ")[0].split(" & ")[0]} ↓
            </a>
          ))}
        </div>
        </ScrollReveal>
      </section>

      {/* 2. Lista dos 5 Serviços */}
      <section className="space-y-12 sm:space-y-20 relative z-10">
        {servicesList.map((service) => (
          <ScrollReveal key={service.id} direction="up" distance={40} scale={0.98}>
          <div
            id={service.id}
            className="rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-8 sm:p-12 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-10">
              {/* Lado Esquerdo */}
              <div className="lg:max-w-lg space-y-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-accent px-3 py-1 rounded-full bg-accent-subtle">
                    {service.badge}
                  </span>
                </div>

                <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
                  {service.title}
                </h2>

                <p className="text-base font-semibold text-text-primary">
                  {service.tagline}
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-text-secondary">
                  {service.description}
                </p>

                <div className="rounded-xl border border-accent/20 bg-accent-subtle/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                    {isEnglish ? "Business Impact" : "Impacto para o seu Negócio"}
                  </p>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-medium">
                    {service.businessImpact}
                  </p>
                </div>

                <div className="pt-2 text-xs text-text-muted">
                  <p>
                    <strong className="text-text-primary font-semibold">
                      {isEnglish ? "Recommended for:" : "Recomendado para:"}
                    </strong>{" "}
                    {service.idealFor}
                  </p>
                </div>

                <div className="pt-3">
                  <Link href="/contacto">
                    <Button variant="primary" size="md" withArrow>
                      {isEnglish ? "Discuss this Service" : "Falar sobre este Serviço"}
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Lado Direito: Entregáveis */}
              <div className="lg:flex-1 rounded-2xl border border-border/70 bg-surface-hover/50 p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="font-heading text-xs uppercase tracking-wider font-bold text-text-primary">
                    {isEnglish ? "Deliverables & Capabilities" : "Entregáveis & Especificações"}
                  </span>
                  <span className="text-[11px] text-text-muted">
                    {isEnglish ? "Included as Standard" : "Incluído de Raiz"}
                  </span>
                </div>

                <ul className="space-y-3 pt-2">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent mt-0.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="leading-relaxed font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted block mb-2">
                    {isEnglish ? "Key Technologies" : "Tecnologias Utilizadas"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-surface border border-border px-2.5 py-1 text-[11px] font-medium text-text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        ))}
      </section>

      {/* 3. Padrões de Excelência */}
      <section className="space-y-8 relative z-10">
        <ScrollReveal direction="up" distance={30}>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {isEnglish ? "Engineering Standards" : "Padrões de Engenharia"}
          </span>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            <TextReveal3D>{isEnglish ? "Guarantees built into every solution" : "Garantias aplicadas a todos os projetos"}</TextReveal3D>
          </h2>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            {isEnglish
              ? "Regardless of the solution selected, all projects adhere strictly to high-standard benchmarks."
              : "Independentemente do serviço escolhido, estes princípios são rigorosamente respeitados em qualquer entrega."}
          </p>
        </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.12}>
          {standards.map((std, i) => (
            <StaggerItem key={i}><TiltCard3D>
            <div
              className="rounded-2xl border border-border/70 bg-surface/70 p-6 space-y-3 transition-all hover:border-accent/40 h-full shimmer-scan"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-hover border border-border text-text-primary">
                {std.icon}
              </div>
              <h3 className="font-heading text-base font-bold text-text-primary">{std.title}</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{std.description}</p>
            </div>
            </TiltCard3D></StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. Processo em 4 Etapas (Horizontal Scroll Invertido) */}
      <section ref={targetRef} className="relative h-[250vh] w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] dark dark:light bg-background text-text-primary py-12 border-y border-border transition-colors duration-500">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="sticky top-24 h-[65vh] min-h-[500px] flex flex-col justify-center overflow-hidden">
            
            {/* Cabeçalho Fixo */}
            <ScrollReveal direction="up" distance={30} className="max-w-2xl mb-12 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                {isEnglish ? "Transparent Workflow" : "Processo de Trabalho"}
              </span>
              <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold">
                <TextReveal3D>{isEnglish ? "How we collaborate step-by-step" : "Como trabalhamos do início ao fim"}</TextReveal3D>
              </h2>
            </ScrollReveal>

            {/* Área de Movimento Horizontal */}
            <div className="relative flex-1 flex items-center">
              <motion.div style={{ x }} className="flex gap-6 w-[280vw] sm:w-[150vw] lg:w-[110vw] pr-[50vw]">
                {steps.map((st) => (
                  <div 
                    key={st.step} 
                    className="w-[75vw] sm:w-[45vw] lg:w-[30vw] shrink-0 rounded-2xl border border-border bg-surface p-6 sm:p-8 hover:border-accent transition-colors shadow-sm"
                  >
                    <span className="text-4xl sm:text-5xl font-bold font-heading text-accent/40 block mb-6">{st.step}</span>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3">{st.title}</h3>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{st.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="space-y-6 relative z-10">
        <ScrollReveal direction="up" distance={30}>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {isEnglish ? "Questions & Answers" : "Perguntas Frequentes"}
          </span>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            <TextReveal3D>{isEnglish ? "Common questions clarified" : "Dúvidas comuns esclarecidas"}</TextReveal3D>
          </h2>
        </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" stagger={0.12}>
          {faqs.map((faq, i) => (
            <StaggerItem key={i}>
            <div className="rounded-2xl border border-border/60 bg-surface p-6 space-y-2 hover:border-accent/30 transition-colors h-full">
              <h3 className="font-heading text-base font-bold text-text-primary">{faq.q}</h3>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{faq.a}</p>
            </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 6. Call to Action */}
      <section className="mx-auto">
        <ScrollReveal direction="up" distance={50} scale={0.95}>
        <div className="relative rounded-3xl sm:rounded-[2.5rem] border border-accent/40 bg-surface/90 backdrop-blur-xl p-8 sm:p-14 text-center shadow-xl space-y-6 overflow-hidden">
          {/* Floating 3D elements in CTA */}
          <FloatingElements count={4} variant="minimal" />
          
          <div className="relative z-10">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
              {isEnglish
                ? "Ready to build your solution?"
                : "Pronto para avançar com a sua solução digital?"}
            </h2>
            <p className="text-base text-text-secondary max-w-xl mx-auto mt-5">
              {isEnglish
                ? "Reach out directly. We will evaluate your goals and outline the perfect strategy."
                : "Entre em contacto direto. Vamos avaliar o seu caso em detalhe e desenhar a proposta ideal."}
            </p>
            
            <div className="pt-2 mt-8 flex justify-center">
              <Link href="/contacto">
                <Button variant="primary" size="lg" withArrow className="font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  {t.hero.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
