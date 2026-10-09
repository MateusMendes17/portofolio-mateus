"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/content/projects";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("todos");

  const filters = t.projects.grid.filters;
  const categoryFilters = [
    { id: "todos", label: filters.all },
    { id: "institucional", label: filters.institucional },
    { id: "loja-online", label: filters.lojaOnline },
    { id: "landing-page", label: filters.landingPage },
    { id: "web-app", label: filters.webApp },
  ];

  const filtered =
    activeFilter === "todos"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Filtros de Categoria */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 p-1 rounded-2xl bg-surface-hover/70 border border-border/60 max-w-full overflow-x-auto scrollbar-none shadow-sm">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveFilter(cat.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-accent text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-text-muted font-medium">
          {t.projects.grid.showing
            .replace("{count}", String(filtered.length))
            .replace("{s}", filtered.length !== 1 ? "s" : "")}
        </span>
      </div>

      {/* Grelha de Cards de Projetos */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-text-muted text-sm">
          {t.projects.grid.empty}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t, isEnglish } = useLanguage();
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const title = isEnglish && project.titleEn ? project.titleEn : project.title;
  const description =
    isEnglish && project.shortDescriptionEn
      ? project.shortDescriptionEn
      : project.shortDescription;
  const categoryLabel =
    isEnglish && project.categoryLabelEn
      ? project.categoryLabelEn
      : project.categoryLabel;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -12 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/projetos/${project.slug}`} className="block h-full">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          className="group relative flex flex-col h-full rounded-3xl border border-border/70 bg-surface/85 backdrop-blur-xl p-6 sm:p-7 overflow-hidden shadow-md hover:shadow-2xl hover:border-accent/40 transition-all duration-300 cursor-pointer"
        >
          {/* Spotlight */}
          <span
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            style={{
              background:
                "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--color-accent-subtle), transparent 80%)",
            }}
            aria-hidden="true"
          />
          {/* Border glow */}
          <span
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--color-accent), transparent 100%)",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "exclude",
              padding: "1.5px",
            }}
            aria-hidden="true"
          />

          {/* Header: Badge & Featured */}
          <div className="flex items-center justify-between gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-wide bg-surface border border-border text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {categoryLabel}
            </span>

            {project.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent-subtle/80 border border-accent/30 text-accent">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                {t.projects.grid.featured}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading text-lg sm:text-xl font-bold tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed text-text-secondary mb-5 flex-1">
            {description}
          </p>

          {/* Preview placeholder */}
          <div className="rounded-2xl border border-border/80 bg-surface-hover/50 p-5 mb-5 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/40" />
              <span className="ml-2 text-[10px] text-text-muted font-mono">
                {project.liveUrl !== "#" ? project.liveUrl?.replace("https://", "") : `${project.slug}.pt`}
              </span>
            </div>

            {/* Skeleton content with subtle animation */}
            <div className="space-y-2.5">
              <div className="h-2 w-3/4 rounded-full bg-border/60 group-hover:bg-accent/20 transition-colors duration-300" />
              <div className="h-2 w-1/2 rounded-full bg-border/60 group-hover:bg-accent/15 transition-colors duration-500" />
              <div className="h-2 w-2/3 rounded-full bg-border/60 group-hover:bg-accent/10 transition-colors duration-700" />
              <div className="h-8 w-24 mt-3 rounded-lg bg-accent/10 group-hover:bg-accent/25 transition-colors duration-300" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-hover px-2.5 py-0.5 text-[11px] font-medium text-text-secondary border border-border/60 transition-colors group-hover:border-accent/25"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer with action */}
          <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs font-semibold text-text-primary mt-auto">
            <span className="transition-colors duration-200 group-hover:text-accent">
              {t.projects.grid.viewCaseStudy}
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface border border-border transition-all duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-white shadow-sm">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
