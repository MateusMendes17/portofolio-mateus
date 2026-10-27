import { parse } from "node-html-parser";
import type { Finding } from "../types";
import { SEVERITY_PENALTY } from "../scoring";

function finding(id: string, category: Finding["category"], severity: Finding["severity"], titleKey: string, whatKey: string, whyKey: string, howKey: string, evidence?: string): Finding {
  return { id, category, severity, titleKey, whatKey, whyKey, howKey, evidence, pointsLost: SEVERITY_PENALTY[severity] };
}

export function checkAccessibility(html: string): Finding[] {
  const out: Finding[] = [];
  const root = parse(html);

  // alt em imagens
  const imgs = root.querySelectorAll("img");
  // alt="" é válido (imagem decorativa); só falta quando o atributo não existe
  const missingAlt = imgs.filter((img) => !img.hasAttribute("alt"));
  if (missingAlt.length > 0) {
    out.push(finding("a11y.img.alt.missing", "accessibility", "medium", "audit.findings.a11y.img.alt.missing.title", "audit.findings.a11y.img.alt.missing.what", "audit.findings.a11y.img.alt.missing.why", "audit.findings.a11y.img.alt.missing.how", `${missingAlt.length} imagem(ns)`));
  }

  // labels em inputs
  const inputs = root.querySelectorAll("input, select, textarea");
  const unlabeled = inputs.filter((el) => {
    const id = el.getAttribute("id");
    const hasLabel = id ? !!root.querySelector(`label[for="${id}"]`) : false;
    const hasAria = !!el.getAttribute("aria-label") || !!el.getAttribute("aria-labelledby");
    const wrappedInLabel = !!el.closest("label");
    return !(hasLabel || hasAria || wrappedInLabel);
  });
  if (unlabeled.length > 0) {
    out.push(finding("a11y.input.label.missing", "accessibility", "medium", "audit.findings.a11y.input.label.missing.title", "audit.findings.a11y.input.label.missing.what", "audit.findings.a11y.input.label.missing.why", "audit.findings.a11y.input.label.missing.how", `${unlabeled.length} campo(s)`));
  }

  // lang (já em seo, mas reforçar como a11y)
  const htmlLang = root.querySelector("html")?.getAttribute("lang");
  if (!htmlLang) {
    out.push(finding("a11y.lang.missing", "accessibility", "medium", "audit.findings.a11y.lang.missing.title", "audit.findings.a11y.lang.missing.what", "audit.findings.a11y.lang.missing.why", "audit.findings.a11y.lang.missing.how"));
  }

  // skip link
  const skipLink = root.querySelector('a[href^="#main"], a[href^="#content"], a[href^="#skip"]');
  if (!skipLink) {
    out.push(finding("a11y.skiplink.missing", "accessibility", "low", "audit.findings.a11y.skiplink.missing.title", "audit.findings.a11y.skiplink.missing.what", "audit.findings.a11y.skiplink.missing.why", "audit.findings.a11y.skiplink.missing.how"));
  }

  return out;
}
