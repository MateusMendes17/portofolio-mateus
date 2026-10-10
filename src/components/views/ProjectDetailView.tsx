"use client";

import Link from "next/link";
import type { Project } from "@/content/projects";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectDetailViewProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const { isEnglish, t } = useLanguage();

  const title = isEnglish && project.titleEn ? project.titleEn : project.title;
  const description =
    isEnglish && project.shortDescriptionEn
      ? project.shortDescriptionEn
      : project.shortDescription;
  const categoryLabel =
    isEnglish && project.categoryLabelEn
      ? project.categoryLabelEn
      : project.categoryLabel;
  const challenge =
    isEnglish && project.challengeEn ? project.challengeEn : project.challenge;
  const solution =
    isEnglish && project.solutionEn ? project.solutionEn : project.solution;
  const results =
    isEnglish && project.resultsEn ? project.resultsEn : project.results;
  const features =
    isEnglish && project.featuresEn ? project.featuresEn : project.features;

  const prevTitle =
    prevProject && (isEnglish && prevProject.titleEn ? prevProject.titleEn : prevProject.title);
  const nextTitle =
    nextProject && (isEnglish && nextProject.titleEn ? nextProject.titleEn : nextProject.title);

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-16">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Navegação estrutural" className="flex items-center gap-2 text-xs text-text-muted">
        <Link href="/" className="hover:text-text-primary transition-colors">
          {t.nav.home}
        </Link>
        <span>/</span>
        <Link href="/projetos" className="hover:text-text-primary transition-colors">
          {t.nav.projects}
        </Link>
        <span>/</span>
        <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">
          {title}
        </span>
      </nav>

      {/* 2. Cabeçalho do Case Study */}
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-surface border border-border text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            {categoryLabel}
          </span>
          <span className="rounded-full bg-surface-hover px-3 py-1 text-xs text-text-muted border border-border/60">
            {project.year}
          </span>
          <span className="rounded-full bg-surface-hover px-3 py-1 text-xs text-text-muted border border-border/60">
            {t.projectDetail.clientLabel}: {project.client}
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary">
          {title}
        </h1>

        <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-3xl">
          {description}
        </p>

        {/* Tags de Tecnologias */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-xl border border-border/80 bg-surface/80 px-3 py-1 text-xs font-medium text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* 3. Mockup / Preview Interativo */}
      <section className="rounded-3xl border border-border/80 bg-gradient-to-b from-surface via-surface/90 to-surface-hover/70 p-6 sm:p-10 shadow-lg overflow-hidden">
        {/* Barra de Navegador Mockup */}
        <div className="flex items-center justify-between pb-6 border-b border-border/60 mb-8">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-destructive/40" />
            <span className="h-3 w-3 rounded-full bg-amber-400/40" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/40" />
            <span className="ml-3 text-xs text-text-muted font-mono bg-surface-hover px-3 py-1 rounded-lg border border-border/60">
              {project.liveUrl !== "#" ? project.liveUrl?.replace("https://", "") : `${project.slug}.pt`}
            </span>
          </div>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider hidden sm:inline">
            {t.projectDetail.previewLabel}
          </span>
        </div>

        {/* Visualização de Layout */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/60 bg-surface/90 p-8 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-hover border border-border text-text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
            <p className="text-sm text-text-secondary max-w-xl mx-auto">
              {t.projectDetail.previewDescription}
            </p>
          </div>

          {/* Destaques Rápidos da Solução */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {results.map((res, i) => (
              <div key={i} className="rounded-xl border border-border/70 bg-surface/60 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-surface-hover border border-border text-text-primary">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-text-primary">
                    {t.projectDetail.impactLabel}
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">{res}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Desafio & Solução */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Desafio */}
        <div className="rounded-3xl border border-border/80 bg-surface/70 p-7 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-hover border border-border text-text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-text-primary">
              {t.projectDetail.challengeTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {challenge}
          </p>
        </div>

        {/* Solução */}
        <div className="rounded-3xl border border-border/80 bg-surface/70 p-7 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-hover border border-border text-text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="m9 12 2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-text-primary">
              {t.projectDetail.solutionTitle}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            {solution}
          </p>
        </div>
      </section>

      {/* 5. Funcionalidades Desenvolvidas */}
      <section className="rounded-3xl border border-border/80 bg-surface/60 p-8 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-semibold text-accent uppercase tracking-wider">
            {t.projectDetail.featuresBadge}
          </span>
          <h2 className="mt-1 font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            {t.projectDetail.featuresTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {features.map((feat, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-border/60 bg-surface p-4"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-surface-hover border border-border text-text-primary mt-0.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-text-secondary leading-relaxed font-medium">
                {feat}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testemunho (se existir) */}
      {project.testimonial && (
        <section className="rounded-3xl border border-border/80 bg-surface/80 p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-6 text-text-muted">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 3-2 5-5 5v3zm14 0c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h4c0 3-2 5-5 5v3z" />
            </svg>
          </div>
          <blockquote className="text-lg sm:text-xl italic text-text-primary leading-relaxed">
            &ldquo;
            {isEnglish && project.testimonial.quoteEn
              ? project.testimonial.quoteEn
              : project.testimonial.quote}
            &rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-hover border border-border font-bold text-text-primary text-sm">
              {project.testimonial.author.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm text-text-primary">{project.testimonial.author}</p>
              <p className="text-xs text-text-muted">
                {isEnglish && project.testimonial.roleEn
                  ? project.testimonial.roleEn
                  : project.testimonial.role}{" "}
                — {project.client}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* 7. Navegação entre Projetos */}
      <footer className="pt-8 border-t border-border/60">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projetos/${prevProject.slug}`}
              className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border group-hover:border-accent">
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="m15 19-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-xs text-text-muted block uppercase tracking-wider">
                  {t.projectDetail.previous}
                </span>
                <span className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {prevTitle}
                </span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <Link href="/projetos">
            <Button variant="secondary" size="sm">
              {t.projectDetail.allProjects}
            </Button>
          </Link>

          {nextProject ? (
            <Link
              href={`/projetos/${nextProject.slug}`}
              className="flex items-center gap-3 text-sm text-text-secondary hover:text-text-primary transition-colors group"
            >
              <div className="text-right">
                <span className="text-xs text-text-muted block uppercase tracking-wider">
                  {t.projectDetail.next}
                </span>
                <span className="font-semibold text-text-primary group-hover:text-accent transition-colors">
                  {nextTitle}
                </span>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface border border-border group-hover:border-accent">
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 rounded-3xl border border-border/80 bg-surface/70 p-8 sm:p-10 text-center space-y-4">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
            {t.projectDetail.ctaTitle}
          </h3>
          <p className="text-sm text-text-secondary max-w-xl mx-auto">
            {t.projectDetail.ctaDescription}
          </p>
          <div className="pt-2">
            <Link href="/contacto">
              <Button variant="primary" withArrow>
                {t.common.startConversation}
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
