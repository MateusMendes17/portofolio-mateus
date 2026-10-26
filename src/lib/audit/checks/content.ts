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
  const firstSection = body?.querySelector("header, section, main, .hero");
  const ctaRegex = /contacto|contact|fale connosco|pedir (orçamento|orcamento)|começar|start|get started|agendar/i;
  const hasCtaAboveFold = !!firstSection && ctaRegex.test(firstSection.innerHTML ?? "");
  if (!hasCtaAboveFold) {
    out.push(finding("content.cta.aboveFold.missing", "content", "medium", "audit.findings.content.cta.aboveFold.missing.title", "audit.findings.content.cta.aboveFold.missing.what", "audit.findings.content.cta.aboveFold.missing.why", "audit.findings.content.cta.aboveFold.missing.how"));
  }

  // Prova social
  const socialProofRegex = /testemunho|depoimento|review|avaliação|avaliacao|cliente|cases? of success|casos de sucesso/i;
  if (!socialProofRegex.test(html)) {
    out.push(finding("content.socialProof.missing", "content", "low", "audit.findings.content.socialProof.missing.title", "audit.findings.content.socialProof.missing.what", "audit.findings.content.socialProof.missing.why", "audit.findings.content.socialProof.missing.how"));
  }

  // Política de privacidade
  const privacyLink = root.querySelector('a[href*="privacidade"], a[href*="privacy"]');
  if (!privacyLink) {
    out.push(finding("content.privacy.missing", "content", "medium", "audit.findings.content.privacy.missing.title", "audit.findings.content.privacy.missing.what", "audit.findings.content.privacy.missing.why", "audit.findings.content.privacy.missing.how"));
  }

  // Aviso de cookies (indício)
  const cookieBannerRegex = /cookie|consentimento|consent/i;
  if (!cookieBannerRegex.test(html)) {
    out.push(finding("content.cookies.notice.missing", "content", "low", "audit.findings.content.cookies.notice.missing.title", "audit.findings.content.cookies.notice.missing.what", "audit.findings.content.cookies.notice.missing.why", "audit.findings.content.cookies.notice.missing.how"));
  }

  return out;
}
