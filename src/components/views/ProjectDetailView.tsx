"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/content/projects";
import type { Strings } from "@/content/strings/pt";
import { useLanguage } from "@/context/LanguageContext";
import { projectCategoryLabel } from "@/lib/projectCategory";
import { SITE_METRICS } from "@/content/site-metrics";
import { MeasuredMetrics } from "@/components/audit/MeasuredMetrics";

interface ProjectDetailViewProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

type StudyKey = keyof Strings["projectDetail"]["studies"];

export function ProjectDetailView({
  project,
  prevProject,
  nextProject,
}: ProjectDetailViewProps) {
  const { t } = useLanguage();
  const labels = t.projectDetail.labels;
  const study = t.projectDetail.studies[project.slug as StudyKey];
  const category = projectCategoryLabel(project.category, t);

  const hostname = getHostname(project.liveUrl);

  const specs = [
    { label: labels.type, value: study.format },
    { label: labels.status, value: labels.published },
    { label: labels.role, value: labels.roleValue },
    { label: labels.stack, value: project.techStack.join(" · ") },
  ];

  return (
    <article className="pb-24">
      <header className="container-page pt-28 lg:pt-36">
        <nav
          aria-label={labels.breadcrumb}
          className="flex flex-wrap items-center gap-2 font-body text-micro text-muted"
        >
          <Link
            href="/projetos"
            className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
          >
            {labels.allProjects}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-ink" aria-current="page">
            {project.name}
          </span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.42fr)] lg:items-end lg:gap-16">
          <div>
            <p className="flex flex-wrap items-center gap-2 font-body text-label uppercase tracking-[0.12em] text-muted">
              <span>{category}</span>
              <span aria-hidden="true">·</span>
              <span>{study.location}</span>
              <span aria-hidden="true">·</span>
              <span>{study.format}</span>
            </p>

            <h1 className="mt-4 font-heading text-display font-semibold text-ink">
              {project.name}
            </h1>

            <p className="mt-5 max-w-[62ch] font-body text-lead text-ink-2">
              {study.summary}
            </p>

            <p className="mt-6 inline-flex border border-line bg-surface px-3 py-2 font-body text-micro text-muted">
              {labels.disclaimer}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center border border-[var(--accent-button-border)] bg-highlight px-5 font-body text-sm font-semibold text-accent-ink transition-colors duration-[var(--duration-160)] hover:bg-highlight-hover"
            >
              {labels.openSite}
              <span className="ml-2" aria-hidden="true">
                ↗
              </span>
              <span className="sr-only"> ({labels.newWindow})</span>
            </a>

            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center border border-line-strong px-5 font-body text-sm font-semibold text-ink transition-colors duration-[var(--duration-160)] hover:bg-surface-2"
              >
                {labels.viewCode}
                <span className="sr-only"> ({labels.newWindow})</span>
              </a>
            ) : (
              <span className="inline-flex h-11 items-center border border-line px-5 font-body text-sm text-muted">
                {labels.privateCode}
              </span>
            )}
          </div>
        </div>

        <figure className="mt-10 overflow-hidden border border-line-strong bg-surface-2">
          <div className="flex h-8 items-center gap-2 border-b border-line bg-surface-2 px-3">
            <span className="inline-flex gap-1" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
              <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
              <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
            </span>
            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap font-body text-[10px] text-muted">
              {hostname}
            </span>
            <span className="ml-auto font-body text-[9px] font-semibold uppercase tracking-[0.08em] text-muted">
              {labels.published}
            </span>
          </div>

          <div className="relative aspect-[16/10]">
            <Image
              src={project.cover.src}
              alt={labels.coverAlt.replace("{name}", project.name)}
              fill
              priority
              sizes="(min-width: 1280px) 1120px, (min-width: 768px) 92vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        </figure>
      </header>

      <div className="container-page mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.34fr)] lg:gap-16">
        <div className="min-w-0">
          <CaseSection id="brief" index="01" title={labels.brief}>
            <div className="space-y-4">
              {study.brief.map((paragraph) => (
                <p key={paragraph} className="font-body text-body text-ink-2">
                  <CaseText text={paragraph} />
                </p>
              ))}
            </div>
          </CaseSection>

          <CaseSection id="decisions" index="02" title={labels.decisions}>
            <ol className="space-y-6">
              {study.decisions.map((item, index) => (
                <li key={item.title} className="grid gap-2 sm:grid-cols-[2rem_minmax(0,1fr)]">
                  <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 max-w-[64ch] font-body text-sm leading-relaxed text-muted">
                      <CaseText text={item.text} />
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </CaseSection>

          <CaseSection id="build" index="03" title={labels.build}>
            <ul className="space-y-4">
              {study.build.map((paragraph, index) => (
                <li
                  key={paragraph}
                  className="grid gap-2 sm:grid-cols-[2rem_minmax(0,1fr)]"
                >
                  <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="max-w-[64ch] font-body text-sm leading-relaxed text-muted">
                    <CaseText text={paragraph} />
                  </p>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="accessibility" index="04" title={labels.accessibility}>
            <div className="space-y-4">
              {study.accessibility.map((paragraph) => (
                <p key={paragraph} className="max-w-[64ch] font-body text-body text-ink-2">
                  <CaseText text={paragraph} />
                </p>
              ))}
            </div>

            {SITE_METRICS[project.slug] && (
              <MeasuredMetrics measurement={SITE_METRICS[project.slug]} className="mt-6" />
            )}

            <div className="mt-6 border-l-2 border-highlight bg-surface px-4 py-3">
              <p className="font-body text-micro leading-relaxed text-muted">
                {labels.metricsNote}
              </p>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <p className="font-body text-label uppercase tracking-[0.1em] text-muted">
                {labels.nextStep}
              </p>
              <p className="mt-2 max-w-[64ch] font-body text-sm leading-relaxed text-ink-2">
                <CaseText text={study.nextStep} />
              </p>
            </div>
          </CaseSection>

          <nav
            aria-label={labels.pagination}
            className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2"
          >
            {prevProject ? (
              <Link
                href={`/projetos/${prevProject.slug}`}
                className="group flex min-h-24 flex-col justify-between bg-bg p-4 transition-colors hover:bg-surface"
              >
                <span className="font-body text-micro uppercase tracking-[0.1em] text-muted">
                  ← {labels.previous}
                </span>
                <span className="mt-3 font-heading text-lg text-ink">
                  {prevProject.name}
                </span>
              </Link>
            ) : (
              <Link
                href="/projetos"
                className="group flex min-h-24 flex-col justify-between bg-bg p-4 transition-colors hover:bg-surface"
              >
                <span className="font-body text-micro uppercase tracking-[0.1em] text-muted">
                  ← {labels.backToProjects}
                </span>
                <span className="mt-3 font-heading text-lg text-ink">
                  {t.projects.title}
                </span>
              </Link>
            )}

            {nextProject ? (
              <Link
                href={`/projetos/${nextProject.slug}`}
                className="group flex min-h-24 flex-col items-end justify-between bg-bg p-4 text-right transition-colors hover:bg-surface"
              >
                <span className="font-body text-micro uppercase tracking-[0.1em] text-muted">
                  {labels.next} →
                </span>
                <span className="mt-3 font-heading text-lg text-ink">
                  {nextProject.name}
                </span>
              </Link>
            ) : (
              <Link
                href="/contacto"
                className="group flex min-h-24 flex-col items-end justify-between bg-bg p-4 text-right transition-colors hover:bg-surface"
              >
                <span className="font-body text-micro uppercase tracking-[0.1em] text-muted">
                  {t.projects.cta.badge} →
                </span>
                <span className="mt-3 font-heading text-lg text-ink">
                  {t.nav.cta}
                </span>
              </Link>
            )}
          </nav>
        </div>

        <aside className="hidden lg:block" aria-label={labels.specs}>
          <div className="sticky top-[calc(var(--header-h)+2rem)]">
            <Specs
              specs={specs}
              project={project}
              hostname={hostname}
              labels={labels}
            />
          </div>
        </aside>
      </div>

      <div className="container-page mt-8 lg:hidden">
        <details className="group border border-line bg-surface">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-body text-label uppercase tracking-[0.1em] text-ink [&::-webkit-details-marker]:hidden">
            {labels.specs}
            <span
              aria-hidden="true"
              className="text-base leading-none transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="border-t border-line p-4">
            <Specs
              specs={specs}
              project={project}
              hostname={hostname}
              labels={labels}
              showTitle={false}
            />
          </div>
        </details>
      </div>

      <section className="container-page mt-20">
        <div className="code-surface bg-ink px-6 py-10 text-bg sm:px-10 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <p className="font-body text-label uppercase tracking-[0.12em] text-bg/60">
                {t.projects.cta.badge}
              </p>
              <h2 className="mt-3 max-w-[24ch] font-heading text-h3 text-bg">
                {labels.ctaTitle}
              </h2>
              <p className="mt-4 max-w-[54ch] font-body text-sm leading-relaxed text-bg/70">
                {labels.ctaDescription}
              </p>
            </div>
            <Link
              href="/contacto"
              className="inline-flex h-11 items-center justify-center border border-[var(--accent-button-border)] bg-highlight px-6 font-body text-sm font-semibold text-accent-ink transition-colors duration-[var(--duration-160)] hover:bg-highlight-hover"
            >
              {t.nav.cta}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

/** Renderiza `termos técnicos` como código inline, sem mostrar as crases. */
function CaseText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`)/g);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("`") && part.endsWith("`") ? (
          <code
            key={index}
            className="rounded-sm bg-surface px-1 py-0.5 font-mono text-[0.88em] text-ink"
          >
            {part.slice(1, -1)}
          </code>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}

interface CaseSectionProps {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}

function CaseSection({ id, index, title, children }: CaseSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-line py-9 first:border-t-0 first:pt-0"
    >
      <div className="grid gap-5 md:grid-cols-[132px_minmax(0,1fr)] md:gap-8">
        <div>
          <span className="font-mono text-[10px] tracking-[0.12em] text-muted">
            {index}
          </span>
          <h2
            id={`${id}-title`}
            className="mt-2 font-body text-label uppercase tracking-[0.1em] text-ink"
          >
            {title}
          </h2>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

interface SpecsProps {
  specs: { label: string; value: string }[];
  project: Project;
  hostname: string;
  labels: Strings["projectDetail"]["labels"];
  showTitle?: boolean;
}

function Specs({ specs, project, hostname, labels, showTitle = true }: SpecsProps) {
  return (
    <div className={showTitle ? "border-t border-line pt-5" : undefined}>
      {showTitle && (
        <p className="font-body text-label uppercase tracking-[0.12em] text-muted">
          {labels.specs}
        </p>
      )}

      <dl
        className={
          showTitle
            ? "mt-4 divide-y divide-line border-b border-line"
            : "divide-y divide-line border-b border-line"
        }
      >
        {specs.map((spec) => (
          <div key={spec.label} className="grid gap-1 py-3">
            <dt className="font-body text-micro uppercase tracking-[0.08em] text-muted">
              {spec.label}
            </dt>
            <dd className="font-body text-sm leading-relaxed text-ink">{spec.value}</dd>
          </div>
        ))}

        <div className="grid gap-1 py-3">
          <dt className="font-body text-micro uppercase tracking-[0.08em] text-muted">
            {labels.site}
          </dt>
          <dd>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all font-body text-sm text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
            >
              {hostname}
              <span className="sr-only"> ({labels.newWindow})</span>
            </a>
          </dd>
        </div>

        <div className="grid gap-1 py-3">
          <dt className="font-body text-micro uppercase tracking-[0.08em] text-muted">
            {labels.code}
          </dt>
          <dd>
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all font-body text-sm text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
              >
                GitHub
                <span className="sr-only"> ({labels.newWindow})</span>
              </a>
            ) : (
              <span className="font-body text-sm text-muted">{labels.privateCode}</span>
            )}
          </dd>
        </div>
      </dl>

      <p className="mt-4 font-body text-micro leading-relaxed text-muted">
        {labels.disclaimer}
      </p>
    </div>
  );
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "");
  }
}
