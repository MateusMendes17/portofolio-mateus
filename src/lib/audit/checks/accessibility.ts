import { parse, type HTMLElement } from "node-html-parser";
import type { Finding } from "../types";
import { SEVERITY_PENALTY } from "../scoring";

function finding(id: string, category: Finding["category"], severity: Finding["severity"], titleKey: string, whatKey: string, whyKey: string, howKey: string, evidence?: string): Finding {
  return { id, category, severity, titleKey, whatKey, whyKey, howKey, evidence, pointsLost: SEVERITY_PENALTY[severity] };
}

/** Escondido para todos (não só visualmente): não precisa de rótulo. */
function isHidden(el: HTMLElement): boolean {
  return !!el.closest(
    '[aria-hidden="true"], [hidden], [style*="display:none"], [style*="display: none"], .d-none, .hidden, .is-hidden'
  );
}

export function checkAccessibility(html: string): Finding[] {
  const out: Finding[] = [];
  const root = parse(html);

  // alt em imagens
  const imgs = root.querySelectorAll("img");
  // alt="" é válido (imagem decorativa); só falta quando o atributo não existe
  // (imagens marcadas como decorativas por role/aria-hidden também contam como resolvidas)
  const missingAlt = imgs.filter(
    (img) =>
      !img.hasAttribute("alt") &&
      !/^(presentation|none)$/i.test(img.getAttribute("role") ?? "") &&
      img.getAttribute("aria-hidden") !== "true"
  );
  if (missingAlt.length > 0) {
    out.push(finding("a11y.img.alt.missing", "accessibility", "medium", "audit.findings.a11y.img.alt.missing.title", "audit.findings.a11y.img.alt.missing.what", "audit.findings.a11y.img.alt.missing.why", "audit.findings.a11y.img.alt.missing.how", `${missingAlt.length} imagem(ns)`));
  }

  // labels em inputs
  // Ignora campos sem rótulo visível por natureza (hidden, botões) e escondidos de
  // propósito (honeypots anti-spam com aria-hidden).
  const NO_LABEL_TYPES = /^(hidden|submit|button|reset|image)$/i;
  const labelFor = new Set(root.querySelectorAll("label[for]").map((l) => l.getAttribute("for")));
  const inputs = root
    .querySelectorAll("input, select, textarea")
    .filter((el) => !NO_LABEL_TYPES.test(el.getAttribute("type") ?? "") && !isHidden(el));
  const unlabeled = inputs.filter((el) => {
    const id = el.getAttribute("id");
    const hasLabel = id ? labelFor.has(id) : false;
    const hasAria = !!el.getAttribute("aria-label") || !!el.getAttribute("aria-labelledby") || !!el.getAttribute("title");
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

  // skip link: um dos primeiros links é uma âncora interna para o conteúdo
  const SKIP_TEXT = /skip|saltar|ir para o conte|passar ao conte|conte[uú]do principal|main content/i;
  const SKIP_HREF = /^#(main|content|conteudo|skip|primary|page|maincontent)/i;
  const firstLinks = root.querySelectorAll("a[href]").slice(0, 10);
  const skipLink = firstLinks.some((a) => {
    const href = a.getAttribute("href") ?? "";
    return href.startsWith("#") && href.length > 1 && (SKIP_HREF.test(href) || SKIP_TEXT.test(a.text));
  });
  if (!skipLink) {
    out.push(finding("a11y.skiplink.missing", "accessibility", "low", "audit.findings.a11y.skiplink.missing.title", "audit.findings.a11y.skiplink.missing.what", "audit.findings.a11y.skiplink.missing.why", "audit.findings.a11y.skiplink.missing.how"));
  }

  return out;
}
