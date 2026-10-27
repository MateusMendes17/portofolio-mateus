"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PROJECTS } from "@/content/projects";
import { useLanguage } from "@/context/LanguageContext";
import { projectCategoryLabel } from "@/lib/projectCategory";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { CAL_URL, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { SITE_METRICS } from "@/content/site-metrics";
import { MeasuredMetrics } from "@/components/audit/MeasuredMetrics";
import { ButtonLink } from "@/components/ui/Button";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

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

export function HomeView() {
  const { isEnglish, t } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [auditUrl, setAuditUrl] = useState("");

  function handleAudit(event: FormEvent) {
    event.preventDefault();
    const value = auditUrl.trim();
    router.push(value ? `/avaliador?url=${encodeURIComponent(value)}` : "/avaliador");
  }


  const featuredProjects = PROJECTS.filter((project) => project.featured).slice(0, 3);

  const metrics = [
    t.home.metrics.speed,
    t.home.metrics.code,
    t.home.metrics.direct,
    t.home.metrics.seo,
  ];

  const services = SERVICE_ANCHORS.map((anchor, index) => {
    const item = t.home.servicesPreview.items[index];
    return { ...item, anchor };
  });

  const keywords = Array.from(new Set(services.flatMap((service) => service.tags)));

  const whatsappUrl = getWhatsAppUrl(pathname, isEnglish ? "en" : "pt", "home");

  return (
    <div className="pb-20 lg:pb-24">
      {/* 01 — Intro compacta + projetos logo no primeiro ecrã. */}
      <section className="border-b border-line">
        <div className="container-page pb-14 pt-12 lg:pb-20 lg:pt-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div>
              <p className="rise flex items-center gap-2.5 font-body text-label uppercase tracking-[0.12em] text-muted">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping bg-highlight opacity-60" />
                  <span className="relative inline-flex h-2 w-2 bg-highlight ring-1 ring-ink/30" />
                </span>
                {t.home.hero.availability}
              </p>
              <h1 style={{ "--d": "90ms" } as React.CSSProperties} className="rise mt-4 max-w-[32ch] font-heading text-h3 font-semibold text-ink">
                {t.home.hero.titleBefore}{" "}
                <span className="text-muted">{t.home.hero.titleAccent}</span>
              </h1>
              <p style={{ "--d": "180ms" } as React.CSSProperties} className="rise mt-3 max-w-[58ch] font-body text-body text-ink-2">
                {t.home.hero.subtitle}
              </p>

              <form
                onSubmit={handleAudit}
                style={{ "--d": "230ms" } as React.CSSProperties}
                className="rise mt-6 max-w-[34rem]"
              >
                <label
                  htmlFor="home-audit-url"
                  className="font-body text-micro uppercase tracking-[0.12em] text-muted"
                >
                  {t.home.hero.audit.label}
                </label>
                <div className="mt-2 flex border border-line-strong bg-surface focus-within:border-ink">
                  <input
                    id="home-audit-url"
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    value={auditUrl}
                    onChange={(event) => setAuditUrl(event.target.value)}
                    placeholder={t.home.hero.audit.placeholder}
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 font-body text-sm text-ink outline-none placeholder:text-muted"
                  />
                  <button
                    type="submit"
                    className="shrink-0 border-l border-line-strong bg-highlight px-5 font-body text-label font-semibold text-accent-ink transition-colors hover:bg-highlight-hover"
                  >
                    {t.home.hero.audit.cta} →
                  </button>
                </div>
              </form>
            </div>

            <div style={{ "--d": "270ms" } as React.CSSProperties} className="rise flex flex-wrap items-center gap-3">
              <ButtonLink href="/contacto" withArrow>
                {t.home.hero.ctaPrimary}
              </ButtonLink>
              <ButtonLink href="/projetos" variant="secondary">
                {t.home.hero.ctaSecondary}
              </ButtonLink>
            {CAL_URL && (
              <Link
                href="/contacto?aba=chamada"
                className="font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
              >
                {isEnglish ? "Book a call" : "Marcar chamada"} →
              </Link>
            )}
            </div>
          </div>

          <dl style={{ "--d": "360ms" } as React.CSSProperties} className="rise mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-4 font-body text-micro text-muted">
            <div className="flex gap-2">
              <dt className="uppercase tracking-[0.12em]">{t.home.hero.stats.location}</dt>
              <dd className="text-ink">{t.footer.location}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="uppercase tracking-[0.12em]">{t.home.hero.stats.response}</dt>
              <dd className="text-ink">{t.footer.responseTimeValue}</dd>
            </div>
          </dl>

          <div style={{ "--d": "440ms" } as React.CSSProperties} className="rise mt-12 flex items-baseline justify-between gap-4">
            <h2 className="font-body text-label uppercase tracking-[0.13em] text-muted">
              {t.home.featuredProjects.badge}
            </h2>
            <Link
              href="/projetos"
              className="font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              {t.home.featuredProjects.viewAll} →
            </Link>
          </div>

          <div className="mt-5 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/projetos/${project.slug}`}
                style={{ "--d": `${520 + index * 110}ms` } as React.CSSProperties}
                className="rise-y group block transition-transform duration-300 motion-safe:hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] overflow-hidden border border-line-strong bg-surface-2">
                  <Image
                    src={project.cover.src}
                    alt={t.projectDetail.labels.coverAlt.replace("{name}", project.name)}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-ink">
                    {project.name}
                  </h3>
                  <span className="shrink-0 font-body text-micro text-muted">
                    {projectCategoryLabel(project.category, t)}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 font-body text-[11px] leading-relaxed text-muted">
            {t.projectDetail.labels.disclaimer}
          </p>
        </div>
      </section>

      {/* 01.5 — Avaliador de Sites: a ferramenta que me distingue, logo a seguir ao topo. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-12 lg:mt-16" aria-labelledby="home-audit-title">
        <div className="border border-line-strong bg-surface p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
            <div>
              <span className="font-body text-label uppercase tracking-[0.14em] text-muted">
                {isEnglish ? "Free tool · no sign-up" : "Ferramenta gratuita · sem registo"}
              </span>
              <h2 id="home-audit-title" className="mt-2 font-heading text-h2 font-semibold text-ink">
                {isEnglish ? "Is your current website losing clients?" : "O seu website atual está a perder clientes?"}
              </h2>
              <p className="mt-3 max-w-[52ch] font-body text-body text-ink-2">
                {isEnglish
                  ? "Paste your address and get, in about 30 seconds, a plain-language report: what is fine, what to fix first and why it matters for your business. Every point comes from a real check, with no invented scores."
                  : "Cole o endereço e receba, em cerca de 30 segundos, um relatório em linguagem simples: o que está bem, o que corrigir primeiro e porque importa para o seu negócio. Cada ponto vem de uma verificação real, sem notas inventadas."}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <ButtonLink href="/avaliador" size="lg" withArrow>
                  {isEnglish ? "Evaluate my website" : "Avaliar o meu site"}
                </ButtonLink>
                <ButtonLink href="/avaliador?modo=comparar" variant="secondary" size="lg">
                  {isEnglish ? "Compare with a competitor" : "Comparar com um concorrente"}
                </ButtonLink>
              </div>
              <p className="mt-4 font-body text-micro text-muted">
                {isEnglish
                  ? "Home page only · reports are not stored · PDF report available"
                  : "Apenas a página inicial · relatórios não são guardados · relatório em PDF disponível"}
              </p>
            </div>

            <div>
              <p className="font-body text-micro uppercase tracking-[0.12em] text-muted">
                {isEnglish ? "What is measured (weight in the score)" : "O que é medido (peso na nota)"}
              </p>
              <ul className="mt-3 divide-y divide-line border border-line bg-bg">
                {AUDIT_CATEGORIES.map((c) => (
                  <li key={c.pt} className="flex items-center justify-between gap-4 px-4 py-2.5 font-body text-sm">
                    <span className="text-ink">{isEnglish ? c.en : c.pt}</span>
                    <span className="flex items-center gap-3">
                      <span className="hidden h-1.5 w-24 bg-surface-2 sm:block" aria-hidden="true">
                        <span className="block h-full bg-highlight" style={{ width: `${(c.weight / 18) * 100}%` }} />
                      </span>
                      <span className="w-9 text-right tabular-nums text-muted">{c.weight}%</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* Faixa de tecnologias em loop (CSS puro, só transform). */}
      <div className="marquee border-b border-line py-4" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {keywords.map((word) => (
                <li
                  key={word}
                  className="flex items-center gap-6 pr-6 font-heading text-lg tracking-[-0.02em] text-muted"
                >
                  {word}
                  <span className="h-1.5 w-1.5 bg-highlight ring-1 ring-ink/30" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* 02 — Princípios de trabalho, sem widgets de pontuações não medidas. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-12 lg:mt-16">
        <h2 className="mb-4 font-body text-label uppercase tracking-[0.13em] text-muted">
          {t.home.metrics.sectionHeading}
        </h2>
        <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <article
              key={metric.title}
              className="border-b border-line py-7 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0 transition-all duration-300 hover:-translate-y-1 hover:bg-surface/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-micro tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.12em] text-muted">
                  {metric.unit}
                </span>
              </div>

              <h3 className="mt-8 max-w-[16ch] font-heading text-[1.4rem] tracking-[-0.03em] text-ink">
                {metric.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-2">
                {metric.description}
              </p>
            </article>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* 03 — Serviços. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <SectionHeading
          index="03"
          eyebrow={t.home.servicesPreview.badge}
          title={t.home.servicesPreview.title}
          description={t.home.servicesPreview.description}
          action={{
            href: "/servicos",
            label: t.home.servicesPreview.viewAll,
          }}
        />

        <div className="mt-10 grid border-t border-line lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.anchor}
              className="border-b border-line py-8 lg:border-b-0 lg:border-r lg:px-7 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-micro tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-[10px] uppercase tracking-[0.12em] text-muted">
                  {service.badge}
                </span>
              </div>

              <p className="mt-8 font-body text-[10px] uppercase tracking-[0.12em] text-muted">
                {service.subtitle}
              </p>
              <h3 className="mt-2 font-heading text-h3 text-ink">
                <Link
                  href={`/servicos#${service.anchor}`}
                  className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-line-strong"
                >
                  {service.title}
                </Link>
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ink-2">
                {service.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="flex items-center gap-2 font-body text-micro text-muted"
                  >
                    <span
                      className="h-1 w-1 bg-line-strong"
                      aria-hidden="true"
                    />
                    {tag}
                  </li>
                ))}
              </ul>

              <Link
                href="/contacto"
                className="group mt-6 inline-flex items-center gap-2 font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
              >
                {service.action}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* 04 — Diferenciais de trabalho. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <SectionHeading
          index="04"
          eyebrow={t.home.aboutPreview.badge}
          title={t.home.aboutPreview.title}
          description={t.home.aboutPreview.description}
        />

        <div className="mt-10 grid border-t border-line sm:grid-cols-3">
          {t.home.aboutPreview.pillars.map((pillar) => (
            <article
              key={pillar.num}
              className="border-b border-line py-7 sm:border-b-0 sm:border-r sm:pr-7 sm:last:border-r-0 sm:last:pr-0 sm:[&:not(:first-child)]:pl-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
            >
              <span className="font-body text-micro tabular-nums text-muted">
                {pillar.num}
              </span>
              <h3 className="mt-6 max-w-[18ch] font-heading text-[1.4rem] tracking-[-0.03em] text-ink">
                {pillar.title}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-ink-2">
                {pillar.desc}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 font-body text-sm text-muted">
          {t.home.aboutPreview.footerNote}{" "}
          <Link
            href="/sobre"
            className="font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            {t.home.aboutPreview.footerLink}
          </Link>
        </p>
      </section>
      </ScrollReveal>

      {/* 05 — Assistente interativo. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <div className="grid gap-8 border-y border-line py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
          <div>
            <p className="flex items-center gap-3 font-body text-label uppercase tracking-[0.13em] text-muted">
              <span className="tabular-nums text-ink">05</span>
              <span className="h-px w-7 bg-line-strong" aria-hidden="true" />
              {t.home.quizTeaser.badge}
            </p>
            <h2 className="mt-4 max-w-[26ch] font-heading text-h2 text-ink">
              {t.home.quizTeaser.title}
            </h2>
            <p className="mt-4 max-w-[56ch] font-body text-body text-ink-2">
              {t.home.quizTeaser.description}
            </p>
          </div>

          <ButtonLink href="/sobre" size="lg" withArrow className="justify-self-start lg:justify-self-end">
            {t.home.quizTeaser.cta}
          </ButtonLink>
        </div>
      </section>
      </ScrollReveal>


      {/* Processo de trabalho em 4 passos. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <SectionHeading
          index="06"
          eyebrow={t.services.process.badge}
          title={t.services.process.title}
        />
        <div className="relative mt-10">
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 block h-px origin-left bg-ink"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
            {t.services.process.steps.map((step) => (
              <li
                key={step.step}
                className="border-b border-line py-7 sm:pr-6 lg:border-b-0 lg:[&:not(:first-child)]:pl-6"
              >
                <span className="font-body text-micro tabular-nums text-muted">
                  {step.step}
                </span>
                <h3 className="mt-5 font-heading text-[1.25rem] tracking-[-0.03em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-2">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      </ScrollReveal>

      {/* Provas verificáveis: sem clientes ainda, só o que qualquer visitante pode confirmar. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <SectionHeading
          eyebrow={isEnglish ? "Verifiable proof" : "Provas verificáveis"}
          title={isEnglish ? "Don't take my word for it. Check it yourself." : "Não confie na minha palavra. Confirme."}
          description={
            isEnglish
              ? "I am starting out, so I have no client reviews to show yet. What I can show is code you can read, numbers you can measure and a tool you can test."
              : "Estou a começar, por isso ainda não tenho avaliações de clientes para mostrar. Mostro o que pode confirmar: código que pode ler, números que pode medir e uma ferramenta que pode testar."
          }
        />
        <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-3">
          {[
            {
              title: isEnglish ? "Open code" : "Código aberto",
              text: isEnglish
                ? "Most published projects have their repository on GitHub. You can read how they are built."
                : "A maioria dos projetos publicados tem o repositório no GitHub. Pode ler como foram construídos.",
              href: SOCIAL_LINKS.github,
              cta: isEnglish ? "See GitHub" : "Ver GitHub",
              external: true,
            },
            {
              title: isEnglish ? "Measured numbers" : "Números medidos",
              text: isEnglish
                ? "Each project page shows Lighthouse and Evaluator results, with the measurement date."
                : "Cada página de projeto mostra resultados do Lighthouse e do Avaliador, com a data da medição.",
              href: "/projetos",
              cta: isEnglish ? "See projects" : "Ver projetos",
              external: false,
            },
            {
              title: isEnglish ? "A tool to test me" : "Uma ferramenta para me testar",
              text: isEnglish
                ? "Run the Evaluator on this very site, or on your competitor's, and judge the work by the result."
                : "Corra o Avaliador neste mesmo site, ou no do seu concorrente, e julgue o trabalho pelo resultado.",
              href: `/avaliador?url=${encodeURIComponent(SITE_URL)}`,
              cta: isEnglish ? "Evaluate this site" : "Avaliar este site",
              external: false,
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col justify-between bg-bg p-6">
              <div>
                <h3 className="font-heading text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 font-body text-sm leading-relaxed text-ink-2">{item.text}</p>
              </div>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 self-start font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                >
                  {item.cta} ↗
                </a>
              ) : (
                <Link
                  href={item.href}
                  className="mt-5 self-start font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                >
                  {item.cta} →
                </Link>
              )}
            </div>
          ))}
        </div>

        {SITE_METRICS.site && (
          <MeasuredMetrics
            measurement={SITE_METRICS.site}
            title={isEnglish ? "This site, measured" : "Este site, medido"}
            className="mt-6"
          />
        )}
      </section>
      </ScrollReveal>

      {/* Perguntas frequentes — <details> nativo, sem JS. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <SectionHeading
          index="07"
          eyebrow={t.services.faq.badge}
          title={t.services.faq.title}
        />
        <div className="mt-10 border-t border-line">
          {t.services.faq.items.map((item) => (
            <details key={item.q} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-lg tracking-[-0.02em] text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-body text-xl text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[70ch] font-body text-sm leading-relaxed text-ink-2">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
      </ScrollReveal>

      {/* 08 — Conversão final. */}
      <ScrollReveal direction="up" distance={40}>
      <div className="mt-24 lg:mt-32">
        <CtaPanel
          eyebrow={t.home.ctaSection.badge}
          title={t.home.ctaSection.title}
          description={t.home.ctaSection.description}
          primaryHref="/contacto"
          primaryLabel={t.common.startConversation}
          secondaryHref={whatsappUrl}
          secondaryLabel={t.home.ctaSection.whatsappCta}
        />
      </div>
      </ScrollReveal>
    </div>
  );
}
