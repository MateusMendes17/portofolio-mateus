"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TechItem {
  id: string;
  name: string;
  category: "frontend" | "animation" | "backend" | "seo";
  categoryLabel: string;
  tagline: string;
  businessBenefit: string;
  metric: string;
  metricLabel: string;
  usedFor: string;
}

/** Categorias disponíveis no filtro (inclui "all", que não é categoria de TechItem). */
type FilterTab = "all" | TechItem["category"];

export function TechStackExplorer() {
  const { isEnglish } = useLanguage();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const techItems: TechItem[] = isEnglish
    ? [
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
      ]
    : [
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
      ];

  const [selectedTech, setSelectedTech] = useState<TechItem>(techItems[0]);

  // Keep selected tech synced when language switches
  const currentSelected = techItems.find((item) => item.id === selectedTech.id) || techItems[0];

  const filteredItems =
    activeTab === "all"
      ? techItems
      : techItems.filter((item) => item.category === activeTab);

  return (
    <div className="rounded-3xl border border-border/80 bg-surface/80 backdrop-blur-xl p-6 sm:p-10 shadow-sm">
      {/* Cabeçalho */}
      <div className="space-y-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-accent">
            {isEnglish ? "Interactive Explorer" : "Explorador Interativo"}
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-1">
            {isEnglish
              ? "My Tech Stack & Business Value"
              : "A Minha Stack & o Valor que Traz ao Seu Negócio"}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            {isEnglish
              ? "Click on any technology to inspect its real impact on your website speed, security, and revenue."
              : "Clique em qualquer tecnologia para inspecionar o seu impacto real na velocidade, segurança e vendas da sua empresa."}
          </p>
        </div>

        {/* Filtros de Categoria Alinhados em Linha Única */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-surface-hover/70 border border-border/60 max-w-full overflow-x-auto scrollbar-none">
            {([
              { id: "all", label: isEnglish ? "All" : "Todas" },
              { id: "frontend", label: "Frontend" },
              { id: "animation", label: "3D & Motion" },
              { id: "backend", label: isEnglish ? "Backend & Payments" : "Backend & Pagamentos" },
              { id: "seo", label: "Google SEO" },
            ] satisfies { id: FilterTab; label: string }[]).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`rounded-xl px-3.5 sm:px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? "bg-accent text-white shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grelha: Seleção de Tecnologias à Esquerda + Inspetor Detalhado à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lista de Tecnologias Clicáveis */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredItems.map((tech) => {
            const isSelected = currentSelected.id === tech.id;
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => setSelectedTech(tech)}
                className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-accent bg-accent-subtle/50 shadow-md ring-1 ring-accent"
                    : "border-border/70 bg-surface/70 hover:border-accent/40 hover:bg-surface-hover"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-heading text-sm font-bold text-text-primary">
                    {tech.name}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected ? "bg-accent animate-ping" : "bg-border"
                    }`}
                  />
                </div>
                <span className="text-[11px] text-text-muted">{tech.categoryLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Inspetor Detalhado com Animação */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSelected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-accent/30 bg-surface p-6 sm:p-7 shadow-lg relative overflow-hidden"
            >
              {/* Badge de Categoria */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent-subtle">
                  {currentSelected.categoryLabel}
                </span>
                <span className="text-xs text-text-muted font-mono">
                  stack://{currentSelected.id}
                </span>
              </div>

              <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                {currentSelected.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-accent">
                {currentSelected.tagline}
              </p>

              <div className="mt-5 space-y-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-surface-hover/60 border border-border/60">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                    {isEnglish ? "Business Benefit" : "Benefício para o Seu Negócio"}
                  </span>
                  <p className="text-text-secondary leading-relaxed">
                    {currentSelected.businessBenefit}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-surface-hover/60 border border-border/60">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                      {currentSelected.metricLabel}
                    </span>
                    <span className="font-heading text-xl font-bold text-accent">
                      {currentSelected.metric}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-surface-hover/60 border border-border/60">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-text-muted mb-1">
                      {isEnglish ? "Applied In" : "Aplica-se em"}
                    </span>
                    <span className="text-xs text-text-secondary font-medium block leading-tight">
                      {currentSelected.usedFor}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
