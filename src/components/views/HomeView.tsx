"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PROJECTS } from "@/content/projects";
import { useLanguage } from "@/context/LanguageContext";
import { projectCategoryLabel } from "@/lib/projectCategory";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { ButtonLink } from "@/components/ui/Button";
import { CtaPanel } from "@/components/ui/CtaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal3D } from "@/components/ui/TextAnimations";

const SERVICE_ANCHORS = ["websites", "lojas-online", "web-apps"] as const;

export function HomeView() {
  const { isEnglish, t } = useLanguage();
  const pathname = usePathname();

  const [heroPosition, setHeroPosition] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    if (heroPaused) return;
    const id = window.setInterval(() => {
      setHeroPosition((current) => (current + 1) % PROJECTS.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [heroPaused]);

  const heroProject = PROJECTS[heroPosition] ?? PROJECTS[0];
  const heroIndex = heroPosition + 1;
  const heroStudy =
    t.projectDetail.studies[heroProject.slug as keyof typeof t.projectDetail.studies];
  const heroCategory = projectCategoryLabel(heroProject.category, t);

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

  const whatsappUrl = getWhatsAppUrl(pathname, isEnglish ? "en" : "pt", "home");

  return (
    <div className="pb-20 lg:pb-24">
      {/* 01 — Hero editorial: uma promessa, um projeto publicado, zero ruído. */}
      <section className="relative overflow-hidden pt-8 lg:pt-12">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-40 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/80 to-bg" />
        </div>
        <div className="container-page relative z-10">
          <div className="grid gap-12 border-b border-line pb-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.78fr)] lg:gap-16 lg:pb-16">
            <div className="flex flex-col justify-between">
            <div>
              <p className="flex items-start gap-2.5 font-body text-label uppercase tracking-[0.12em] text-muted">
                <span
                  className="mt-[0.4em] h-1.5 w-1.5 shrink-0 bg-highlight ring-1 ring-ink/25"
                  aria-hidden="true"
                />
                {t.home.hero.availability}
              </p>

              <h1 className="mt-8 max-w-[13ch] font-heading text-display font-semibold text-ink">
                <TextReveal3D>{t.home.hero.titleBefore}</TextReveal3D>{" "}
                <span className="block text-muted">
                  <TextReveal3D>{t.home.hero.titleAccent}</TextReveal3D>
                </span>
              </h1>

              <p className="mt-6 max-w-[48ch] font-body text-lead text-ink-2">
                {t.home.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ButtonLink
                  href="/contacto"
                  size="lg"
                  withArrow
                  className="w-full justify-center sm:w-auto"
                >
                  {t.home.hero.ctaPrimary}
                </ButtonLink>
                <ButtonLink
                  href="/projetos"
                  size="lg"
                  variant="secondary"
                  className="w-full justify-center sm:w-auto"
                >
                  {t.home.hero.ctaSecondary}
                </ButtonLink>
              </div>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-line pt-5">
              <div>
                <dt className="font-body text-[10px] uppercase tracking-[0.12em] text-muted">
                  {t.home.hero.stats.projects}
                </dt>
                <dd className="mt-1 font-heading text-sm text-ink tabular-nums">
                  {String(PROJECTS.length).padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt className="font-body text-[10px] uppercase tracking-[0.12em] text-muted">
                  {t.home.hero.stats.location}
                </dt>
                <dd className="mt-1 font-heading text-sm text-ink">
                  {t.footer.location}
                </dd>
              </div>
              <div>
                <dt className="font-body text-[10px] uppercase tracking-[0.12em] text-muted">
                  {t.home.hero.stats.response}
                </dt>
                <dd className="mt-1 font-heading text-sm text-ink">
                  {t.footer.responseTimeValue}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <div className="flex items-center justify-between border-t border-line pt-2 font-body text-[10px] uppercase tracking-[0.13em] text-muted">
              <span className="tabular-nums">
                {String(heroIndex).padStart(2, "0")} /{" "}
                {String(PROJECTS.length).padStart(2, "0")}
              </span>
              <span>{t.projectDetail.labels.published}</span>
            </div>

            <Link
              href={`/projetos/${heroProject.slug}`}
              className="group mt-4 block"
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
              onFocus={() => setHeroPaused(true)}
              onBlur={() => setHeroPaused(false)}
            >
              <div className="relative aspect-[16/10] overflow-hidden border border-line-strong bg-surface-2 transition-shadow duration-300 group-hover:shadow-lg">
                <Image
                  src={heroProject.cover.src}
                  alt={t.projectDetail.labels.coverAlt.replace(
                    "{name}",
                    heroProject.name
                  )}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.015]"
                />
              </div>

              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="font-heading text-h3 text-ink">
                  {heroProject.name}
                </h2>
                <span className="shrink-0 font-body text-micro text-muted">
                  {heroCategory}
                </span>
              </div>

              <p className="mt-2 max-w-[46ch] font-body text-sm text-ink-2">
                {heroStudy.summary}
              </p>
              <p className="mt-3 font-body text-[11px] leading-relaxed text-muted">
                {t.projectDetail.labels.disclaimer}
              </p>
            </Link>
          </div>
        </div>
        </div>
      </section>

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

      {/* 04 — Três projetos selecionados. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <SectionHeading
          index="04"
          eyebrow={t.home.featuredProjects.badge}
          title={t.home.featuredProjects.title}
          description={t.home.featuredProjects.description}
          action={{
            href: "/projetos",
            label: t.home.featuredProjects.viewAll,
          }}
        />

        <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => {
            const study =
              t.projectDetail.studies[
                project.slug as keyof typeof t.projectDetail.studies
              ];
            const category = projectCategoryLabel(project.category, t);

            return (
                <Link
                  key={project.slug}
                  href={`/projetos/${project.slug}`}
                  className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between border-t border-line pt-2 font-body text-[10px] uppercase tracking-[0.13em] text-muted">
                  <span className="tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{t.projectDetail.labels.published}</span>
                </div>

                <div className="relative mt-3 aspect-[16/10] overflow-hidden border border-line-strong bg-surface-2">
                  <Image
                    src={project.cover.src}
                    alt={t.projectDetail.labels.coverAlt.replace(
                      "{name}",
                      project.name
                    )}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="font-heading text-h3 text-ink">
                    {project.name}
                  </h3>
                  <span className="shrink-0 font-body text-micro text-muted">
                    {category}
                  </span>
                </div>

                <p className="mt-2 font-body text-sm leading-relaxed text-ink-2">
                  {study.summary}
                </p>

                <div className="mt-auto pt-4">
                  <p className="font-body text-[11px] leading-relaxed text-muted">
                    {t.projectDetail.labels.disclaimer}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors group-hover:decoration-ink">
                    {t.projects.grid.viewCaseStudy}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      </ScrollReveal>

      {/* 05 — Diferenciais de trabalho. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <SectionHeading
          index="05"
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

      {/* 06 — Assistente interativo. */}
      <ScrollReveal direction="up" distance={40}>
      <section className="container-page mt-24 lg:mt-32">
        <div className="grid gap-8 border-y border-line py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-14">
          <div>
            <p className="flex items-center gap-3 font-body text-label uppercase tracking-[0.13em] text-muted">
              <span className="tabular-nums text-ink">06</span>
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

      {/* 07 — Conversão final. */}
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
