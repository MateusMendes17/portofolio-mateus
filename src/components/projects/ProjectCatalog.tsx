"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { useLanguage } from "@/context/LanguageContext";
import { projectCategoryLabel } from "@/lib/projectCategory";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "./ProjectPreview";

interface ProjectCatalogProps {
  projects: Project[];
}

type StudyKey = keyof ReturnType<typeof useLanguage>["t"]["projectDetail"]["studies"];

/**
 * Editorial project index.
 *
 * Desktop: a sticky rail follows the entry closest to the viewport centre.
 * Mobile: a compact horizontal index with thumbnails sits above the list.
 * Long screenshots are only requested by ProjectPreview after activation.
 */
export function ProjectCatalog({ projects }: ProjectCatalogProps) {
  const { t, isEnglish } = useLanguage();
  const [railSlug, setRailSlug] = useState<string | null>(null);
  const [centeredSlug, setCenteredSlug] = useState<string | null>(null);
  const [touchLike, setTouchLike] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const entryRefs = useRef<Record<string, HTMLElement | null>>({});

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => set.add(project.category));
    return ["all", ...Array.from(set)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeCategory !== "all" && project.category !== activeCategory) return false;
      return true;
    });
  }, [projects, activeCategory]);

  /* Touch / coarse pointer: only the most-centred card animates. */
  useEffect(() => {
    const query = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouchLike(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  /* One scroll listener feeds both the rail and the touch preview state. */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      let best: { slug: string; distance: number } | null = null;

      for (const project of filteredProjects) {
        const element = entryRefs.current[project.slug];
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > viewportHeight) continue;

        const entryCenter = rect.top + rect.height / 2;
        const distance = Math.abs(entryCenter - viewportHeight / 2);

        if (!best || distance < best.distance) {
          best = { slug: project.slug, distance };
        }
      }

      const nextRail = best?.slug ?? null;
      setRailSlug((current) => (current === nextRail ? current : nextRail));

      // Em touch, só ativamos quando o cartão está mesmo perto do centro.
      // Sem isto, o primeiro cartão parcialmente visível pediria a captura
      // longa no carregamento inicial da página.
      const nextCentered =
        best && best.distance <= viewportHeight * 0.35 ? best.slug : null;
      setCenteredSlug((current) =>
        current === nextCentered ? current : nextCentered
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [filteredProjects]);

  return (
    <div className="mt-14 space-y-8 lg:mt-20">
      {/* Pesquisa + filtros */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const label =
              cat === "all"
                ? isEnglish
                  ? "All"
                  : "Todos"
                : projectCategoryLabel(cat as Project["category"], t);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "border px-3 py-1.5 font-body text-micro font-medium transition-colors",
                  activeCategory === cat
                    ? "border-ink bg-ink text-bg"
                    : "border-line text-muted hover:border-line-strong hover:text-ink"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
        {filteredProjects.length === 0 && (
          <p className="font-body text-sm text-muted">
            {isEnglish ? "No projects found." : "Nenhum projeto encontrado."}
          </p>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-[var(--rail)_minmax(0,1fr)] lg:gap-[var(--rail-gap)]">
        {/* Desktop index rail */}
        <nav className="hidden lg:block" aria-label={t.projects.grid.index}>
          <div className="sticky top-[calc(var(--header-h)+2rem)]">
            <p className="font-body text-label uppercase tracking-[0.12em] text-muted">
              {t.projects.grid.index}
            </p>

            <ol className="mt-5 space-y-0 border-t border-line">
              {filteredProjects.map((project, index) => {
                const isActive = railSlug === project.slug;
                return (
                  <li key={project.slug} className="border-b border-line">
                    <a
                      href={`#${project.slug}`}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "group flex gap-3 py-3 text-sm transition-colors",
                        isActive ? "text-ink" : "text-muted hover:text-ink"
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1 h-px w-4 shrink-0 transition-colors",
                          isActive ? "bg-highlight" : "bg-line group-hover:bg-ink"
                        )}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] tracking-[0.12em] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block leading-snug">{project.name}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>

            <p className="mt-5 font-body text-micro leading-relaxed text-muted">
              {t.projects.grid.projectCount.replace("{count}", String(filteredProjects.length))}
            </p>
            <p className="mt-3 font-body text-micro leading-relaxed text-muted">
              {t.projectDetail.labels.disclaimer}
            </p>
          </div>
        </nav>

        <div className="min-w-0">
          {/* Mobile horizontal index */}
          <nav aria-label={t.projects.grid.index} className="lg:hidden">
            <p className="font-body text-label uppercase tracking-[0.12em] text-muted">
              {t.projects.grid.index}
            </p>
            <div className="-mx-[var(--gutter)] mt-4 overflow-x-auto px-[var(--gutter)] pb-2 scrollbar-none">
              <ol className="flex w-max gap-2">
                {filteredProjects.map((project, index) => (
                  <li key={project.slug}>
                    <a
                      href={`#${project.slug}`}
                      className="flex w-[148px] items-center gap-3 border border-line bg-surface p-2 transition-colors hover:border-line-strong focus-visible:border-ink"
                    >
                      <span className="relative aspect-[4/3] w-11 shrink-0 overflow-hidden border border-line bg-surface-2">
                        <Image
                          src={project.cover.src}
                          alt=""
                          fill
                          sizes="44px"
                          className="object-cover object-top"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-0.5 block truncate text-xs font-medium text-ink">
                          {project.name}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="mt-10 lg:mt-0">
            {filteredProjects.map((project, index) => (
              <ProjectEntry
                key={project.slug}
                project={project}
                index={index}
                centered={touchLike && centeredSlug === project.slug}
                study={t.projectDetail.studies[project.slug as StudyKey]}
                category={projectCategoryLabel(project.category, t)}
                setRef={(element) => {
                  entryRefs.current[project.slug] = element;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectEntryProps {
  project: Project;
  index: number;
  centered: boolean;
  study: ReturnType<typeof useLanguage>["t"]["projectDetail"]["studies"][StudyKey];
  category: string;
  setRef: (element: HTMLElement | null) => void;
}

function ProjectEntry({
  project,
  index,
  centered,
  study,
  category,
  setRef,
}: ProjectEntryProps) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const active = hovered || focused || centered;

  return (
    <article
      id={project.slug}
      ref={setRef}
      className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0 lg:py-14 lg:first:pt-0"
    >
      <Link
        href={`/projetos/${project.slug}`}
        onPointerEnter={(event) => {
          if (event.pointerType !== "touch") setHovered(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType !== "touch") setHovered(false);
        }}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        className="group block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-4 focus-visible:ring-offset-bg"
      >
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-8">
          <div>
            <p className="flex items-center gap-2 font-body text-label uppercase tracking-[0.1em] text-muted">
              <span className="font-mono text-ink">{String(index + 1).padStart(2, "0")}</span>
              <span aria-hidden="true">/</span>
              <span>{category}</span>
            </p>

            <h2 className="mt-3 font-heading text-h2 text-ink transition-colors group-hover:text-ink">
              {project.name}
            </h2>

            <p className="mt-3 max-w-[56ch] font-body text-body text-ink-2">
              {study.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-label text-muted md:justify-end md:pt-1">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />
              {t.projects.grid.published}
            </span>
            <span aria-hidden="true">·</span>
            <span>{study.location}</span>
            <span aria-hidden="true">·</span>
            <span>{study.format}</span>
          </div>
        </div>

        <ProjectPreview
          project={project}
          active={active}
          priority={index === 0}
          className="mt-6"
        />

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2" aria-label={t.projectDetail.labels.stack}>
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="border border-line px-2.5 py-1 font-body text-micro text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>

          <span className="inline-flex items-center gap-2 font-body text-label font-semibold text-ink">
            {t.projects.grid.viewCaseStudy}
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
        <p className="font-body text-micro text-muted">
          {t.projectDetail.labels.disclaimer}
        </p>

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-body text-micro font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
        >
          {t.projects.grid.openSite}
          <span aria-hidden="true">↗</span>
          <span className="sr-only"> ({t.projectDetail.labels.newWindow})</span>
        </a>
      </div>
    </article>
  );
}
