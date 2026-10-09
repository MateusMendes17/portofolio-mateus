"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { PROJECTS } from "@/content/projects";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/ScrollReveal";
import { TiltCard3D } from "@/components/ui/TiltCard3D";
import { FloatingElements } from "@/components/ui/FloatingElements";
import { TextReveal3D } from "@/components/ui/TextAnimations";

/* Ícones por id — os textos vivem em t.projects.* */
const HIGHLIGHT_ICONS: Record<string, ReactNode> = {
  design: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  speed: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  seo: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  mobile: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
};

/* Ordem fixa: corresponde a t.projects.pills */
const PILL_ICONS: ReactNode[] = [
  <svg key="star" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>,
  <svg key="bolt" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>,
  <svg key="search" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>,
  <svg key="phone" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>,
];

export function ProjetosView() {
  const { t } = useLanguage();

  const highlights = t.projects.highlights.items;
  const pills = t.projects.pills;
  const steps = t.projects.process.steps;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-24 relative">
      <FloatingElements count={5} variant="minimal" />

      {/* 1. Header do Portfólio */}
      <section className="space-y-6 relative z-10">
        <ScrollReveal direction="up" distance={40}>
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {t.projects.badge}
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
            <TextReveal3D>{t.projects.title}</TextReveal3D>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed">
            {t.projects.description}
          </p>
        </div>
        </ScrollReveal>

        {/* Badges / Selos de Qualidade Horizontais */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2">
          {pills.map((label, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-text-secondary shadow-sm transition-colors hover:border-accent/40"
            >
              <span className="text-text-primary">{PILL_ICONS[i]}</span>
              {label}
            </span>
          ))}
        </div>
      </section>



      {/* 2. Grelha com Filtros Interativos e Projetos (Corte Visual Invertido) */}
      <section 
        id="trabalhos" 
        className="relative w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] dark dark:light bg-background text-text-primary py-24 border-y border-border transition-colors duration-500"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ProjectGrid projects={PROJECTS} />
        </div>
      </section>

      {/* 3. Padrões de Engenharia */}
      <section className="space-y-8 relative z-10">
        <ScrollReveal direction="up" distance={30}>
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {t.projects.highlights.badge}
          </span>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            <TextReveal3D>{t.projects.highlights.title}</TextReveal3D>
          </h2>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
            {t.projects.highlights.description}
          </p>
        </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" stagger={0.12}>
          {highlights.map((h, i) => (
            <StaggerItem key={i}>
            <TiltCard3D className="h-full">
            <div
              className="flex flex-col justify-between rounded-2xl border border-border/70 bg-surface/60 p-6 transition-all duration-200 hover:border-accent/40 hover:bg-surface/80 h-full shimmer-scan"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-hover text-text-primary border border-border/80 mb-4">
                  {HIGHLIGHT_ICONS[h.id]}
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2">{h.title}</h3>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">{h.description}</p>
              </div>
            </div>
            </TiltCard3D>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 4. Metodologia de Trabalho */}
      <section className="relative rounded-3xl border border-border/80 bg-surface/60 p-8 sm:p-12 z-10">
        <ScrollReveal direction="up" distance={30}>
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {t.projects.process.badge}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-text-primary">
            <TextReveal3D>{t.projects.process.title}</TextReveal3D>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
            {t.projects.process.description}
          </p>
        </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
          {steps.map((st) => (
            <StaggerItem key={st.step}>
            <div className="rounded-2xl border border-border/60 bg-surface p-6 h-full hover:border-accent/40 transition-colors">
              <span className="text-3xl font-bold font-heading text-accent/80">{st.step}</span>
              <h3 className="mt-3 text-lg font-bold text-text-primary">{st.title}</h3>
              <p className="mt-2 text-sm text-text-secondary leading-relaxed">{st.desc}</p>
            </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* 5. Call to Action */}
      <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-surface via-surface/90 to-surface-hover/80 p-8 sm:p-14 text-center z-10 animate-gradient-mesh">
        <FloatingElements count={3} variant="minimal" />
        <ScrollReveal direction="up" distance={40}>
        <div className="mx-auto max-w-2xl space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary shadow-sm">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {t.projects.cta.badge}
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
            {t.projects.cta.title}
          </h2>

          <p className="text-base text-text-secondary leading-relaxed">
            {t.projects.cta.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/contacto">
              <Button variant="primary" size="lg" withArrow className="font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                {t.common.startConversation}
              </Button>
            </Link>
            <Link href="/servicos">
              <Button variant="secondary" size="lg" className="hover:scale-105 transition-all">
                {t.projects.cta.secondary}
              </Button>
            </Link>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
