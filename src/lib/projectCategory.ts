import type { ProjectCategory } from "@/content/projects";
import type { Strings } from "@/content/strings/pt";

/**
 * Category copy lives in the strings file, not in project data. This keeps
 * the PT/EN mirror in one place and avoids duplicating labels on eight items.
 */
export function projectCategoryLabel(
  category: ProjectCategory,
  t: Strings
): string {
  switch (category) {
    case "loja-online":
      return t.projects.grid.filters.lojaOnline;
    case "landing-page":
      return t.projects.grid.filters.landingPage;
    case "web-app":
    case "saas":
      return t.projects.grid.filters.webApp;
    case "institucional":
    default:
      return t.projects.grid.filters.institucional;
  }
}
