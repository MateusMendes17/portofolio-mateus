"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/content/projects";
import { useLanguage } from "@/context/LanguageContext";
import { projectCategoryLabel } from "@/lib/projectCategory";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CAL_URL, SITE_CONFIG, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { SITE_METRICS } from "@/content/site-metrics";
import { MeasuredMetrics } from "@/components/audit/MeasuredMetrics";
import { cn } from "@/lib/utils";
import { KineticName } from "@/components/home/KineticName";
import "@/components/home/home.css";

/** Categorias e pesos reais do Avaliador (ver docs/avaliador-metodologia.md). */
const AUDIT_CATEGORIES = [
  { pt: "Segurança e base", en: "Security & basics", weight: 18 },
  { pt: "SEO técnico", en: "Technical SEO", weight: 18 },
  { pt: "Mobile e usabilidade", en: "Mobile & usability", weight: 14 },
  { pt: "Desempenho (Google PageSpeed)", en: "Performance (Google PageSpeed)", weight: 14 },
  { pt: "Acessibilidade básica", en: "Basic accessibility", weight: 12 },
  { pt: "Conteúdo e conversão", en: "Content & conversion", weight: 12 },
  { pt: "Peso da página", en: "Page weight", weight: 12 },
] as const;

const SERVICE_ANCHORS = ["websites", "lojas-online", "web-apps"] as const;

const STACK = ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Framer Motion", "Node.js"];

/** Copy nova desta home. O resto vem de src/content/strings. */
const COPY = {
  pt: {
    available: "Disponível para novos projetos",
    lisbon: "Lisboa",
    reply: "Resposta em 24h",
    leadA: "Programador web freelance. Crio websites, lojas online e apps ",
    leadB: "que fazem o seu negócio crescer.",
    badge: "PEDIR ORÇAMENTO • RESPOSTA EM 24H • ",
    badgeLabel: "Pedir orçamento",
    bandServices: ["Websites", "Lojas online", "Apps web", "MB WAY", "Multibanco", "SEO"],
    projectsTitle: "Projetos",
    projectsNote: "Projetos-conceito com marcas fictícias e código real, aberto no GitHub.",
    projectsAll: "Ver todos os projetos",
    servicesTitleA: "O que ",
    servicesTitleB: "faço",
    servicesMore: "Saber mais",
    whyTitleA: "Sem agência.",
    whyTitleB: "Sem surpresas.",
    why: [
      ["Contacto direto", "Fala com quem escreve o código"],
      ["Propriedade total", "Domínio, código e dados são seus"],
      ["Faturação legal", "Tudo faturado e transparente"],
    ],
    auditEyebrow: "Ferramenta gratuita",
    auditTitle: "O seu site está a perder clientes?",
    auditLabel: "Endereço do site",
    auditPlaceholder: "www.o-seu-site.pt",
    auditButton: "Avaliar",
    auditWeight: "peso",
    processTitle: "Processo",
    faqTitle: "FAQ",
    contactEyebrow: "Respondo em menos de 24 horas",
    contactA: "Vamos",
    contactB: "falar? ↗",
    contactForm: "Formulário de contacto",
    bookCall: "Marcar chamada",
    auditCompare: "Comparar com um concorrente",
    auditNote: "Apenas a página inicial · relatórios não são guardados · relatório em PDF disponível",
    proofTitleA: "Não confie na minha palavra. ",
    proofTitleB: "Confirme.",
    proofNote:
      "Estou a começar, por isso ainda não tenho avaliações de clientes para mostrar. Mostro o que pode confirmar: código que pode ler, números que pode medir e uma ferramenta que pode testar.",
    proof: [
      ["Código aberto", "A maioria dos projetos publicados tem o repositório no GitHub. Pode ler como foram construídos.", "Ver GitHub"],
      ["Números medidos", "Cada página de projeto mostra resultados do Lighthouse e do Avaliador, com a data da medição.", "Ver projetos"],
      ["Uma ferramenta para me testar", "Corra o Avaliador neste mesmo site, ou no do seu concorrente, e julgue o trabalho pelo resultado.", "Avaliar este site"],
    ],
    measuredTitle: "Este site, medido",
  },
  en: {
    available: "Available for new projects",
    lisbon: "Lisbon",
    reply: "Reply within 24h",
    leadA: "Freelance web developer. I build websites, online stores and apps ",
    leadB: "that grow your business.",
    badge: "GET A QUOTE • REPLY WITHIN 24H • ",
    badgeLabel: "Get a quote",
    bandServices: ["Websites", "Online stores", "Web apps", "MB WAY", "Multibanco", "SEO"],
    projectsTitle: "Projects",
    projectsNote: "Concept projects with fictional brands and real code, open on GitHub.",
    projectsAll: "See all projects",
    servicesTitleA: "What I ",
    servicesTitleB: "do",
    servicesMore: "Learn more",
    whyTitleA: "No agency.",
    whyTitleB: "No surprises.",
    why: [
      ["Direct contact", "Talk to the person writing the code"],
      ["Full ownership", "Domain, code and data are yours"],
      ["Proper invoicing", "Everything invoiced and transparent"],
    ],
    auditEyebrow: "Free tool",
    auditTitle: "Is your website losing customers?",
    auditLabel: "Website address",
    auditPlaceholder: "www.your-site.com",
    auditButton: "Audit",
    auditWeight: "weight",
    processTitle: "Process",
    faqTitle: "FAQ",
    contactEyebrow: "I reply in under 24 hours",
    contactA: "Let's",
    contactB: "talk? ↗",
    contactForm: "Contact form",
    bookCall: "Book a call",
    auditCompare: "Compare with a competitor",
    auditNote: "Home page only · reports are not stored · PDF report available",
    proofTitleA: "Don't take my word for it. ",
    proofTitleB: "Check it.",
    proofNote:
      "I am starting out, so I have no client reviews to show yet. What I can show is code you can read, numbers you can measure and a tool you can test.",
    proof: [
      ["Open code", "Most published projects have their repository on GitHub. You can read how they are built.", "See GitHub"],
      ["Measured numbers", "Each project page shows Lighthouse and Evaluator results, with the measurement date.", "See projects"],
      ["A tool to test me", "Run the Evaluator on this very site, or on your competitor's, and judge the work by the result.", "Evaluate this site"],
    ],
    measuredTitle: "This site, measured",
  },
} as const;

const EASE = [0.22, 1, 0.36, 1] as const;

/** Entrada ao fazer scroll. Respeita o reducedMotion do MotionConfig. */
function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function useLisbonTime(locale: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString(locale, {
          timeZone: "Europe/Lisbon",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, [locale]);
  return time;
}

function Band({ items, reverse, className }: { items: readonly string[]; reverse?: boolean; className: string }) {
  const sequence = (hidden: boolean) => (
    <span aria-hidden={hidden || undefined} className="flex gap-10 pr-10">
      {items.map((item) => (
        <span key={item} className="flex gap-10">
          <span>{item}</span>
          <span aria-hidden="true">✳</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={cn("absolute -inset-x-[5%] overflow-hidden py-5", className)}>
      <div
        className="home-band font-heading text-[clamp(2rem,3.4vw,2.75rem)] font-semibold whitespace-nowrap"
        data-reverse={reverse || undefined}
      >
        {sequence(false)}
        {sequence(true)}
      </div>
    </div>
  );
}

export function HomeView() {
  const { isEnglish, t } = useLanguage();
  const c = isEnglish ? COPY.en : COPY.pt;
  const pathname = usePathname();
  const router = useRouter();
  const time = useLisbonTime(isEnglish ? "en-GB" : "pt-PT");
  const [auditUrl, setAuditUrl] = useState("");
  const [openFaq, setOpenFaq] = useState<number>(0);

  const featuredProjects = PROJECTS.filter((project) => project.featured).slice(0, 3);
  const services = SERVICE_ANCHORS.map((anchor, index) => ({
    ...t.home.servicesPreview.items[index],
    anchor,
  }));
  const whatsappUrl = getWhatsAppUrl(pathname, isEnglish ? "en" : "pt", "home");
  const proofLinks = [
    { href: SOCIAL_LINKS.github, external: true },
    { href: "/projetos", external: false },
    { href: `/avaliador?url=${encodeURIComponent(SITE_URL)}`, external: false },
  ];

  function handleAudit(event: FormEvent) {
    event.preventDefault();
    const value = auditUrl.trim();
    router.push(value ? `/avaliador?url=${encodeURIComponent(value)}` : "/avaliador");
  }

  // Cartões de serviço: superfície, chartreuse e invertido (bg-ink inverte sozinho no tema escuro).
  const serviceStyles = [
    { card: "bg-surface text-ink border border-line", stroke: "var(--ink)", text: "text-muted" },
    { card: "bg-highlight text-accent-ink", stroke: "var(--accent-ink)", text: "text-accent-ink/75" },
    { card: "bg-ink text-bg", stroke: "var(--bg)", text: "text-bg/70" },
  ];

  return (
    <div className="overflow-x-clip bg-bg text-ink">
      {/* ============ HERO ============ */}
      <section
        id="topo"
        className="relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden px-[var(--gutter)]"
      >
        <div aria-hidden="true" className="home-hero-bg pointer-events-none absolute inset-0 -z-10" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-4 border-b border-ink py-4 font-mono text-sm"
        >
          <span className="inline-flex items-center gap-3">
            <span className="home-dot" aria-hidden="true" />
            {c.available}
          </span>
          <span className="hidden gap-6 text-muted sm:flex">
            <span>
              {c.lisbon} {time}
            </span>
            <span>{c.reply}</span>
          </span>
        </motion.div>

        <div className="flex flex-1 flex-wrap items-center justify-between gap-8 py-8">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="m-0 max-w-[720px] font-heading text-[clamp(1.5rem,2.3vw,2.375rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
          >
            {c.leadA}
            <span className="home-hl">{c.leadB}</span>
            {CAL_URL && (
              <Link
                href="/contacto?aba=chamada"
                className="mt-5 block w-fit font-body text-base font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
              >
                {c.bookCall} →
              </Link>
            )}
          </motion.p>

          <motion.div
            className="ml-auto"
            initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            <Link
              href="/contacto"
              aria-label={c.badgeLabel}
              className="home-badge relative grid size-[120px] shrink-0 sm:size-[170px] place-items-center rounded-full border-[1.5px] border-accent-ink bg-highlight text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
            >
              <svg className="home-badge-ring absolute inset-0 h-full w-full" viewBox="0 0 170 170" aria-hidden="true">
                <defs>
                  <path id="home-badge-circle" d="M85,85 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
                </defs>
                <text fill="currentColor" className="font-mono text-[13px] tracking-[3.2px]">
                  <textPath href="#home-badge-circle">{c.badge}</textPath>
                </text>
              </svg>
              <span className="home-badge-arrow text-[30px] leading-none sm:text-[40px]" aria-hidden="true">
                →
              </span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="pb-[2vw]"
        >
          <KineticName />
        </motion.div>
      </section>

      {/* ============ FAIXAS ============ */}
      <section aria-label="Stack" className="relative mt-5 h-[260px] overflow-hidden">
        <Band items={STACK} className="top-12 -rotate-3 bg-ink text-bg" />
        <Band
          items={c.bandServices}
          reverse
          className="top-[132px] rotate-2 border-y-[1.5px] border-accent-ink bg-highlight text-accent-ink"
        />
      </section>

      {/* ============ PROJETOS ============ */}
      <section id="projetos" className="px-[var(--gutter)] py-[var(--section)]">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="m-0 font-heading text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
            {c.projectsTitle}
            <sup className="ml-2 align-top font-mono text-lg tracking-normal text-muted">
              ({String(featuredProjects.length).padStart(2, "0")})
            </sup>
          </h2>
          <p className="m-0 max-w-[360px] text-muted">{c.projectsNote}</p>
        </Reveal>

        <div className="border-t-[1.5px] border-ink">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug}>
              <Link
                href={`/projetos/${project.slug}`}
                className="home-prow relative flex flex-wrap items-center gap-6 border-b-[1.5px] border-ink px-[2vw] py-9 text-ink no-underline outline-none"
              >
                <span className="home-prow-meta w-[60px] font-mono text-sm text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="home-prow-name flex-[1_1_360px] font-heading text-[clamp(2.5rem,5.6vw,5.5rem)] leading-none font-semibold tracking-[-0.04em]">
                  {project.name}
                </span>
                <span className="home-prow-meta flex-[0_1_260px] font-mono text-sm text-muted">
                  {projectCategoryLabel(project.category, t)}
                </span>
                <span className="home-prow-arrow text-4xl" aria-hidden="true">
                  →
                </span>
                <span className="home-prow-preview" aria-hidden="true">
                  <Image
                    src={project.cover.src}
                    alt=""
                    width={project.cover.width}
                    height={project.cover.height}
                    sizes="320px"
                    className="h-full w-full object-cover"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-body text-[11px] leading-relaxed text-muted">{t.projectDetail.labels.disclaimer}</p>
        <Reveal className="mt-10">
          <Link
            href="/projetos"
            className="inline-flex min-h-[52px] items-center gap-3 rounded-full border-[1.5px] border-ink px-7 font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
          >
            {c.projectsAll} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      {/* ============ SERVIÇOS ============ */}
      <section id="servicos" className="px-[var(--gutter)] pb-[var(--section)]">
        <Reveal>
          <h2 className="m-0 mb-14 font-heading text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
            {c.servicesTitleA}
            <span className="home-stroke">{c.servicesTitleB}</span>
          </h2>
        </Reveal>
        <div className="flex flex-wrap gap-5">
          {services.map((service, index) => {
            const style = serviceStyles[index];
            return (
              <Reveal key={service.anchor} delay={index * 0.08} className="min-w-0 flex-[1_1_320px]">
                <Link
                  href={`/servicos#${service.anchor}`}
                  className={cn(
                    "home-svc flex min-h-[420px] flex-col gap-5 rounded-[28px] p-9 no-underline",
                    style.card
                  )}
                >
                  <span
                    className="font-heading text-[120px] leading-[0.8] font-semibold text-transparent"
                    style={{ WebkitTextStroke: `2px ${style.stroke}` }}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="m-0 mt-auto font-heading text-[2rem] leading-[1.05] font-semibold text-inherit">
                    {service.title}
                  </h3>
                  <p className={cn("m-0", style.text)}>{service.description}</p>
                  <span className="font-semibold">
                    {c.servicesMore} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ============ PORQUÊ + AVALIADOR ============ */}
      <section className="flex flex-wrap gap-5 px-[var(--gutter)] pb-[var(--section)]">
        <Reveal className="flex min-w-0 flex-[1_1_460px] flex-col gap-7 rounded-[28px] border-[1.5px] border-ink p-10">
          <h2 className="m-0 font-heading text-[clamp(2.5rem,4.4vw,4rem)] leading-[0.95] font-semibold tracking-[-0.04em]">
            {c.whyTitleA}
            <br />
            <span className="home-hl">{c.whyTitleB}</span>
          </h2>
          <dl className="m-0 flex flex-col">
            {c.why.map(([title, desc], i) => (
              <div
                key={title}
                className={cn(
                  "flex justify-between gap-5 border-t border-line py-[18px]",
                  i === c.why.length - 1 && "border-b"
                )}
              >
                <dt className="text-lg font-semibold">{title}</dt>
                <dd className="m-0 text-right text-muted">{desc}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="code-surface relative flex min-w-0 flex-[1_1_460px] flex-col gap-5 overflow-hidden rounded-[28px] border border-[var(--code-line)] bg-[var(--code-bg)] p-10 text-[var(--code-ink)]">
          <div className="home-scan" aria-hidden="true" />
          <span className="font-mono text-sm text-[var(--code-accent)]">{c.auditEyebrow}</span>
          <h2 className="m-0 font-heading text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none font-semibold tracking-[-0.04em] text-inherit">
            {c.auditTitle}
          </h2>
          <form onSubmit={handleAudit} className="flex flex-wrap gap-2.5">
            <label htmlFor="home-audit-url" className="sr-only">
              {c.auditLabel}
            </label>
            <input
              id="home-audit-url"
              type="text"
              inputMode="url"
              value={auditUrl}
              onChange={(event) => setAuditUrl(event.target.value)}
              placeholder={c.auditPlaceholder}
              className="min-h-14 min-w-0 flex-[1_1_220px] rounded-full border border-[var(--code-line)] bg-[var(--code-surface)] px-5 text-[var(--code-ink)] placeholder:text-[var(--code-muted)] focus:border-[var(--code-accent)] focus:outline-none"
            />
            <button
              type="submit"
              className="min-h-14 cursor-pointer rounded-full bg-highlight px-7 font-semibold text-accent-ink transition-transform hover:scale-105"
            >
              {c.auditButton}
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link
              href="/avaliador?modo=comparar"
              className="font-medium text-[var(--code-ink)] underline decoration-[var(--code-line)] underline-offset-4 hover:decoration-[var(--code-accent)]"
            >
              {c.auditCompare} →
            </Link>
            <span className="font-mono text-xs text-[var(--code-muted)]">{c.auditNote}</span>
          </div>
          <ul className="m-0 mt-2 flex list-none flex-col gap-3.5 p-0">
            {AUDIT_CATEGORIES.map((category, i) => (
              <li key={category.pt}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span>{isEnglish ? category.en : category.pt}</span>
                  <span className="font-mono text-[var(--code-muted)]">
                    {c.auditWeight} {category.weight}%
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--code-line)]">
                  <motion.div
                    className="h-full rounded-full bg-highlight"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(category.weight / 18) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: EASE, delay: 0.1 * i }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ============ PROCESSO ============ */}
      <section id="processo" className="px-[var(--gutter)] pb-[var(--section)]">
        <Reveal>
          <h2 className="m-0 mb-14 font-heading text-[clamp(3.5rem,8vw,8rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
            {c.processTitle}
          </h2>
        </Reveal>
        <ol className="m-0 flex list-none flex-wrap border-t-[1.5px] border-ink p-0">
          {t.services.process.steps.map((step, i) => (
            <li key={step.step} className="min-w-0 flex-[1_1_260px]">
              <Reveal delay={i * 0.08} className="py-8 pr-7">
                <span className="inline-block bg-highlight px-2 py-0.5 font-mono text-sm text-accent-ink">
                  {step.step}
                </span>
                <h3 className="m-0 mt-4 font-heading text-[1.75rem] leading-[1.05] font-semibold">{step.title}</h3>
                <p className="m-0 mt-3 text-muted">{step.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ PROVAS VERIFICÁVEIS ============ */}
      <section id="provas" className="px-[var(--gutter)] pb-[var(--section)]">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="m-0 max-w-[14ch] font-heading text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
            {c.proofTitleA}
            <span className="home-hl">{c.proofTitleB}</span>
          </h2>
          <p className="m-0 max-w-[420px] text-muted">{c.proofNote}</p>
        </Reveal>
        <div className="flex flex-wrap gap-5">
          {c.proof.map(([title, text, cta], i) => {
            const link = proofLinks[i];
            const linkClass =
              "mt-auto inline-flex min-h-[48px] w-fit items-center gap-2 rounded-full border-[1.5px] border-ink px-6 font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg";
            return (
              <Reveal
                key={title}
                delay={i * 0.08}
                className="home-svc flex min-h-[280px] min-w-0 flex-[1_1_300px] flex-col gap-4 rounded-[28px] border-[1.5px] border-ink bg-surface p-8"
              >
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="m-0 font-heading text-[1.75rem] leading-[1.05] font-semibold">{title}</h3>
                <p className="m-0 text-muted">{text}</p>
                {link.external ? (
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {cta} <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <Link href={link.href} className={linkClass}>
                    {cta} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>
        {SITE_METRICS.site && (
          <Reveal className="mt-5">
            <MeasuredMetrics measurement={SITE_METRICS.site} title={c.measuredTitle} />
          </Reveal>
        )}
      </section>

      {/* ============ ASSISTENTE (QUIZ) ============ */}
      <section className="px-[var(--gutter)] pb-[var(--section)]">
        <Reveal className="flex flex-wrap items-center justify-between gap-8 rounded-[28px] bg-highlight p-10 text-accent-ink">
          <div className="min-w-0 flex-[1_1_420px]">
            <span className="font-mono text-sm">{t.home.quizTeaser.badge}</span>
            <h2 className="m-0 mt-3 max-w-[22ch] font-heading text-[clamp(2rem,3.6vw,3.25rem)] leading-none font-semibold tracking-[-0.04em] text-inherit">
              {t.home.quizTeaser.title}
            </h2>
            <p className="m-0 mt-4 max-w-[56ch] text-accent-ink/75">{t.home.quizTeaser.description}</p>
          </div>
          <Link
            href="/sobre"
            className="inline-flex min-h-[56px] items-center gap-3 rounded-full bg-accent-ink px-8 font-semibold text-highlight no-underline transition-transform hover:scale-105"
          >
            {t.home.quizTeaser.cta} <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="flex flex-wrap gap-12 px-[var(--gutter)] pb-[var(--section)]">
        <Reveal className="flex-[1_1_300px]">
          <h2 className="m-0 font-heading text-[clamp(3rem,6vw,6rem)] leading-[0.9] font-semibold tracking-[-0.05em]">
            {c.faqTitle}
          </h2>
        </Reveal>
        <div className="min-w-0 flex-[2_1_560px] border-t-[1.5px] border-ink">
          {t.services.faq.items.map((item, i) => {
            const open = openFaq === i;
            const panelId = `home-faq-${i}`;
            return (
              <div key={item.q} className="border-b-[1.5px] border-ink">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="flex min-h-[76px] w-full cursor-pointer items-center justify-between gap-6 bg-transparent py-5 text-left font-heading text-2xl tracking-[-0.02em] text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--focus)]"
                >
                  <span>{item.q}</span>
                  <span
                    className="home-plus grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-ink font-body text-2xl"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={panelId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="m-0 pr-16 pb-7 text-[1.0625rem] text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ CONTACTO ============ */}
      <section id="contacto" className="home-contact rounded-t-[40px] px-[var(--gutter)] pt-[var(--section)] pb-16">
        <Reveal>
          <span className="home-contact-muted inline-flex items-center gap-3 font-mono text-sm">
            <span className="home-dot" aria-hidden="true" />
            {c.contactEyebrow}
          </span>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="home-contact-cta mt-7 block font-heading text-[15vw] leading-[0.85] font-semibold tracking-[-0.06em] text-inherit no-underline"
          >
            {c.contactA}
            <br />
            <span className="home-contact-accent">{c.contactB}</span>
          </a>
        </Reveal>
        <Reveal className="mt-14 flex flex-wrap gap-3.5" delay={0.1}>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="inline-flex min-h-[52px] items-center rounded-full home-contact-primary px-7 font-semibold no-underline transition-transform hover:scale-105"
          >
            {SITE_CONFIG.email}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="home-contact-line inline-flex min-h-[52px] items-center rounded-full border-[1.5px] px-7 font-semibold text-inherit no-underline transition-transform hover:scale-105"
          >
            WhatsApp {SITE_CONFIG.phone}
          </a>
          <Link
            href="/contacto"
            className="home-contact-line inline-flex min-h-[52px] items-center rounded-full border-[1.5px] px-7 font-semibold text-inherit no-underline transition-transform hover:scale-105"
          >
            {c.contactForm} <span aria-hidden="true" className="ml-2">→</span>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
