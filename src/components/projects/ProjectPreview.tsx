"use client";

import Image from "next/image";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { Project } from "@/content/projects";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

let reducedMotionQuery: MediaQueryList | null = null;

function getReducedMotionQuery() {
  if (!reducedMotionQuery) {
    reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return reducedMotionQuery;
}

function subscribeReducedMotion(callback: () => void) {
  const query = getReducedMotionQuery();
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return getReducedMotionQuery().matches;
}

function getServerReducedMotionSnapshot() {
  return false;
}

interface ProjectPreviewProps {
  project: Project;
  /** Hover, keyboard focus or the most-centred card on touch. */
  active: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Cover-first preview.
 *
 * The long screenshot is deliberately absent from the DOM until the card is
 * activated. That keeps the initial /projetos payload to eight covers instead
 * of eight full-page captures (~1.7 MB). Once requested, the image is cached by
 * the browser and the CSS animation scrolls it at a constant speed.
 */
export function ProjectPreview({
  project,
  active,
  priority = false,
  className,
}: ProjectPreviewProps) {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );

  const hostname = useMemo(() => {
    try {
      return new URL(project.liveUrl).hostname.replace(/^www\./, "");
    } catch {
      return project.liveUrl.replace(/^https?:\/\//, "");
    }
  }, [project.liveUrl]);

  const coverAlt = t.projectDetail.labels.coverAlt.replace("{name}", project.name);

  return (
    <div
      className={cn("project-preview", className)}
      data-active={active}
      data-loaded={loaded}
      data-reduced-motion={reducedMotion}
    >
      <div className="project-preview__bar" aria-hidden="true">
        <span className="project-preview__dots">
          <span className="project-preview__dot" />
          <span className="project-preview__dot" />
          <span className="project-preview__dot" />
        </span>
        <span className="project-preview__url">{hostname}</span>
        <span className="project-preview__state">{t.projects.grid.published}</span>
      </div>

      <div className="project-preview__media">
        <Image
          src={project.cover.src}
          alt={coverAlt}
          fill
          sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, (min-width: 768px) 86vw, 92vw"
          priority={priority}
          className="project-preview__cover"
        />

        {active && !reducedMotion && (
          <Image
            src={project.long.src}
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 58vw, (min-width: 768px) 86vw, 92vw"
            className="project-preview__long"
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}
