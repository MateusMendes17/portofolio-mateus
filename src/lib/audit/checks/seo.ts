import { parse } from "node-html-parser";
import type { Finding } from "../types";
import { SEVERITY_PENALTY } from "../scoring";

function finding(id: string, category: Finding["category"], severity: Finding["severity"], titleKey: string, whatKey: string, whyKey: string, howKey: string, evidence?: string): Finding {
  return { id, category, severity, titleKey, whatKey, whyKey, howKey, evidence, pointsLost: SEVERITY_PENALTY[severity] };
}

export function checkSeo(html: string): Finding[] {
  const out: Finding[] = [];
  const root = parse(html);
  const head = root.querySelector("head");

  // title
  const title = head?.querySelector("title")?.text?.trim() ?? "";
  if (!title) {
    out.push(finding("seo.title.missing", "seo", "high", "audit.findings.seo.title.missing.title", "audit.findings.seo.title.missing.what", "audit.findings.seo.title.missing.why", "audit.findings.seo.title.missing.how"));
  } else if (title.length < 30 || title.length > 60) {
    out.push(finding("seo.title.length", "seo", "medium", "audit.findings.seo.title.length.title", "audit.findings.seo.title.length.what", "audit.findings.seo.title.length.why", "audit.findings.seo.title.length.how", `${title.length} caracteres`));
  }

  // meta description
  const metaDesc = head?.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "";
  if (!metaDesc) {
    out.push(finding("seo.metaDescription.missing", "seo", "high", "audit.findings.seo.metaDescription.missing.title", "audit.findings.seo.metaDescription.missing.what", "audit.findings.seo.metaDescription.missing.why", "audit.findings.seo.metaDescription.missing.how"));
  } else if (metaDesc.length < 70 || metaDesc.length > 160) {
    out.push(finding("seo.metaDescription.length", "seo", "medium", "audit.findings.seo.metaDescription.length.title", "audit.findings.seo.metaDescription.length.what", "audit.findings.seo.metaDescription.length.why", "audit.findings.seo.metaDescription.length.how", `${metaDesc.length} caracteres`));
  }

  // h1 único
  const h1s = root.querySelectorAll("h1");
  if (h1s.length === 0) {
    out.push(finding("seo.h1.missing", "seo", "high", "audit.findings.seo.h1.missing.title", "audit.findings.seo.h1.missing.what", "audit.findings.seo.h1.missing.why", "audit.findings.seo.h1.missing.how"));
  } else if (h1s.length > 1) {
    out.push(finding("seo.h1.multiple", "seo", "medium", "audit.findings.seo.h1.multiple.title", "audit.findings.seo.h1.multiple.what", "audit.findings.seo.h1.multiple.why", "audit.findings.seo.h1.multiple.how", `${h1s.length} h1`));
  }

  // hierarquia de títulos (saltos)
  const headings = root.querySelectorAll("h1,h2,h3,h4,h5,h6");
  let prevLevel = 0;
  let broken = false;
  for (const h of headings) {
    const level = Number(h.tagName.slice(1));
    if (prevLevel > 0 && level - prevLevel > 1) { broken = true; break; }
    prevLevel = level;
  }
  if (broken) {
    out.push(finding("seo.headings.hierarchy", "seo", "low", "audit.findings.seo.headings.hierarchy.title", "audit.findings.seo.headings.hierarchy.what", "audit.findings.seo.headings.hierarchy.why", "audit.findings.seo.headings.hierarchy.how"));
  }

  // canonical
  const canonical = head?.querySelector('link[rel="canonical"]')?.getAttribute("href");
  if (!canonical) {
    out.push(finding("seo.canonical.missing", "seo", "low", "audit.findings.seo.canonical.missing.title", "audit.findings.seo.canonical.missing.what", "audit.findings.seo.canonical.missing.why", "audit.findings.seo.canonical.missing.how"));
  }

  // robots meta
  const robotsMeta = head?.querySelector('meta[name="robots"]')?.getAttribute("content")?.toLowerCase() ?? "";
  if (robotsMeta.includes("noindex")) {
    out.push(finding("seo.robots.noindex", "seo", "high", "audit.findings.seo.robots.noindex.title", "audit.findings.seo.robots.noindex.what", "audit.findings.seo.robots.noindex.why", "audit.findings.seo.robots.noindex.how"));
  }

  // Open Graph
  const ogTitle = head?.querySelector('meta[property="og:title"]');
  const ogDesc = head?.querySelector('meta[property="og:description"]');
  const ogImage = head?.querySelector('meta[property="og:image"]');
  if (!ogTitle || !ogDesc || !ogImage) {
    out.push(finding("seo.og.incomplete", "seo", "medium", "audit.findings.seo.og.incomplete.title", "audit.findings.seo.og.incomplete.what", "audit.findings.seo.og.incomplete.why", "audit.findings.seo.og.incomplete.how"));
  }

  // Twitter card
  const twitterCard = head?.querySelector('meta[name="twitter:card"]');
  if (!twitterCard) {
    out.push(finding("seo.twitter.missing", "seo", "low", "audit.findings.seo.twitter.missing.title", "audit.findings.seo.twitter.missing.what", "audit.findings.seo.twitter.missing.why", "audit.findings.seo.twitter.missing.how"));
  }

  // JSON-LD
  const jsonLd = head?.querySelectorAll('script[type="application/ld+json"]') ?? [];
  let validJsonLd = 0;
  for (const s of jsonLd) {
    try { JSON.parse(s.text); validJsonLd++; } catch { /* invalid */ }
  }
  if (jsonLd.length === 0) {
    out.push(finding("seo.jsonld.missing", "seo", "low", "audit.findings.seo.jsonld.missing.title", "audit.findings.seo.jsonld.missing.what", "audit.findings.seo.jsonld.missing.why", "audit.findings.seo.jsonld.missing.how"));
  } else if (validJsonLd < jsonLd.length) {
    out.push(finding("seo.jsonld.invalid", "seo", "medium", "audit.findings.seo.jsonld.invalid.title", "audit.findings.seo.jsonld.invalid.what", "audit.findings.seo.jsonld.invalid.why", "audit.findings.seo.jsonld.invalid.how"));
  }

  // lang no html
  const htmlLang = root.querySelector("html")?.getAttribute("lang");
  if (!htmlLang) {
    out.push(finding("seo.lang.missing", "seo", "medium", "audit.findings.seo.lang.missing.title", "audit.findings.seo.lang.missing.what", "audit.findings.seo.lang.missing.why", "audit.findings.seo.lang.missing.how"));
  }

  // sitemap.xml e robots.txt: verificados em Fase 3? marcar como não verificável aqui (info)
  // (serão verificados por fetch adicional opcional; por agora não bloquear)

  return out;
}
