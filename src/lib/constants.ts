import type { NavItem } from "./types";

/* ============================================================
   Site-wide constants — Portfólio Mateus Mendes
   ============================================================ */

export const SITE_CONFIG = {
  name: "Mateus Mendes",
  url: "https://mateusmendes.pt", // [SUBSTITUIR] URL final
  locale: "pt-PT",
  email: "mateuslm799@gmail.com",
  phone: "+351 917 810 763",
  whatsapp: "351917810763",
  responseTime: "24 horas",
} as const;

/**
 * URL base canónica do site, sem barra final.
 * `NEXT_PUBLIC_SITE_URL` tem prioridade (ver `.env.local.example`) e
 * `SITE_CONFIG.url` serve de fallback em builds sem a env definida.
 * Usada pela metadata do root layout, pelo sitemap.xml e pelo robots.txt.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? SITE_CONFIG.url
).replace(/\/+$/, "");

export const SOCIAL_LINKS = {
  github: "https://github.com/mateusmendes", // [SUBSTITUIR]
  linkedin: "https://linkedin.com/in/mateusmendes", // [SUBSTITUIR]
  whatsapp: `https://wa.me/351917810763`,
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Contacto", href: "/contacto" },
];
