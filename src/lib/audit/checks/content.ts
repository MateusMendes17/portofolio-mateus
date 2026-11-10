import { parse } from "node-html-parser";
import type { Finding } from "../types";
import { SEVERITY_PENALTY } from "../scoring";

function finding(id: string, category: Finding["category"], severity: Finding["severity"], titleKey: string, whatKey: string, whyKey: string, howKey: string, evidence?: string): Finding {
  return { id, category, severity, titleKey, whatKey, whyKey, howKey, evidence, pointsLost: SEVERITY_PENALTY[severity] };
}

export function checkContent(html: string): Finding[] {
  const out: Finding[] = [];
  const root = parse(html);

  // CTA acima da dobra (indício: botão/link com palavras-chave no topo)
  const body = root.querySelector("body");
  // Lê-se o texto dos links/botões do cabeçalho e da primeira secção (não o HTML,
  // para classes como "contact-icon" não contarem), com ações de vários tipos de site.
  const zones = [body?.querySelector("header"), body?.querySelector("main, section, .hero")].filter((z) => !!z);
  const controls = zones.flatMap((z) => z!.querySelectorAll("a, button").slice(0, 40));
  const ctaRegex = /contact|fale connosco|or[çc]amento|come[çc]ar|\bstart|get started|agend|marcar|reserv|\bbook|\bcompr|\bbuy\b|\bshop\b|\bloja|encomend|\border\b|subscrev|\bassin|subscribe|sign up|registar|inscrev|experiment|\btry\b|\bdemo\b|\bpedir|request|quote|\bligar|\bcall\b|whatsapp/i;
  const hasCtaAboveFold = controls.some((el) => ctaRegex.test(el.text) || ctaRegex.test(el.getAttribute("aria-label") ?? ""));
  if (!hasCtaAboveFold) {
    out.push(finding("content.cta.aboveFold.missing", "content", "medium", "audit.findings.content.cta.aboveFold.missing.title", "audit.findings.content.cta.aboveFold.missing.what", "audit.findings.content.cta.aboveFold.missing.why", "audit.findings.content.cta.aboveFold.missing.how"));
  }

  // Prova social
  const socialProofRegex = /testemunho|depoimento|review|avaliação|avaliacao|cliente|cases? of success|casos de sucesso/i;
  const visible = parse(html);
  visible.querySelectorAll("script, style, noscript").forEach((el) => el.remove());
  if (!socialProofRegex.test(visible.text)) {
    out.push(finding("content.socialProof.missing", "content", "low", "audit.findings.content.socialProof.missing.title", "audit.findings.content.socialProof.missing.what", "audit.findings.content.socialProof.missing.why", "audit.findings.content.socialProof.missing.how"));
  }

  // Política de privacidade
  const privacyLink = root.querySelector('a[href*="privacidade"], a[href*="privacy"]');
  if (!privacyLink) {
    out.push(finding("content.privacy.missing", "content", "medium", "audit.findings.content.privacy.missing.title", "audit.findings.content.privacy.missing.what", "audit.findings.content.privacy.missing.why", "audit.findings.content.privacy.missing.how"));
  }

  // Aviso de cookies: só é exigido quando há ferramentas de rastreamento
  // (um site sem cookies de terceiros não precisa de banner).
  const trackerRegex = /googletagmanager\.com|google-analytics\.com|gtag\(|connect\.facebook\.net|fbq\(|hotjar\.com|clarity\.ms|static\.ads-twitter|snap\.licdn\.com|analytics\.tiktok\.com/i;
  const consentRegex = /cookiebot|onetrust|cookieyes|iubenda|complianz|cookie-?consent|cookie-?banner|cookie-?notice|consentimento|gerir cookies|aceitar cookies|accept cookies|usamos cookies|utilizamos cookies|we use cookies/i;
  if (trackerRegex.test(html) && !consentRegex.test(html)) {
    out.push(finding("content.cookies.notice.missing", "content", "medium", "audit.findings.content.cookies.notice.missing.title", "audit.findings.content.cookies.notice.missing.what", "audit.findings.content.cookies.notice.missing.why", "audit.findings.content.cookies.notice.missing.how"));
  }

  return out;
}
