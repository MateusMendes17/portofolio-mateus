import type { NavItem } from "./types";

/* ============================================================
   Site-wide constants — Portfólio Mateus Mendes
   ============================================================ */

export const SITE_CONFIG = {
  name: "Mateus Mendes",
  url: "https://mateusmendes.pt",
  locale: "pt-PT",
  email: "mateusmm.dev@gmail.com",
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
  github: "https://github.com/MateusMendes17",
  linkedin: "https://www.linkedin.com/in/mateus-lucas-mendes-0538b7333/",
  whatsapp: `https://wa.me/351917810763`,
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Projetos", href: "/projetos" },
  { label: "Avaliador", href: "/avaliador" },
  { label: "Contacto", href: "/contacto" },
];

/**
 * Mapeamento de rotas para chaves de tradução em t.nav.*
 * Usado por Header e Footer para evitar duplicação.
 */
export const NAV_LABEL_KEYS: Record<string, "home" | "about" | "services" | "projects" | "audit" | "contact"> = {
  "/": "home",
  "/sobre": "about",
  "/servicos": "services",
  "/projetos": "projects",
  "/avaliador": "audit",
  "/contacto": "contact",
};

function parseHttpsUrl(raw: string | undefined): string | null {
  const value = raw?.trim();
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Páginas de agendamento do Cal.com (ex.: https://cal.com/o-seu-utilizador/15min).
 * `NEXT_PUBLIC_CAL_URL` é a chamada de 15 min; `NEXT_PUBLIC_CAL_URL_30` (opcional) a de 30 min.
 * Sem valor válido, os botões de marcação não aparecem.
 */
export const CAL_URL: string | null = parseHttpsUrl(process.env.NEXT_PUBLIC_CAL_URL);
export const CAL_URL_30: string | null = parseHttpsUrl(process.env.NEXT_PUBLIC_CAL_URL_30);

export interface CalEvent {
  minutes: number;
  url: string;
}

/** Durações disponíveis para marcar (da mais curta para a mais longa). */
export const CAL_EVENTS: CalEvent[] = [
  ...(CAL_URL ? [{ minutes: 15, url: CAL_URL }] : []),
  ...(CAL_URL_30 ? [{ minutes: 30, url: CAL_URL_30 }] : []),
];
