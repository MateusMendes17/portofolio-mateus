import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { PROJECTS } from "@/content/projects";

/* ============================================================
   sitemap.xml — lista todas as rotas indexáveis do site.
   Quando criares uma página nova, acrescenta-a aqui (as rotas
   dinâmicas dos projetos são geradas a partir de PROJECTS).

   Nota: não há `alternates.languages` porque o PT/EN é um toggle
   client-side — existe apenas UMA URL por página, e apontar hreflang
   de dois idiomas para a mesma URL é inválido para o Google. Se um dia
   existirem rotas /en/..., é aqui que se declara cada alternativa.
   ============================================================ */

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/sobre`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/servicos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projetos`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      // Não está em NAV_ITEMS (é linkada no footer) — não pode faltar.
      url: `${SITE_URL}/privacidade`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...PROJECTS.map((project) => ({
      url: `${SITE_URL}/projetos/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return pages;
}
