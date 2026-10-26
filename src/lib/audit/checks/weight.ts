import { parse } from "node-html-parser";
import type { Finding } from "../types";
import { SEVERITY_PENALTY } from "../scoring";

function finding(id: string, category: Finding["category"], severity: Finding["severity"], titleKey: string, whatKey: string, whyKey: string, howKey: string, evidence?: string): Finding {
  return { id, category, severity, titleKey, whatKey, whyKey, howKey, evidence, pointsLost: SEVERITY_PENALTY[severity] };
}

export function checkWeight(html: string): Finding[] {
  const out: Finding[] = [];
  const root = parse(html);

  // Tamanho do HTML
  const bytes = Buffer.byteLength(html, "utf8");
  if (bytes > 200 * 1024) {
    out.push(finding("weight.html.large", "weight", "medium", "audit.findings.weight.html.large.title", "audit.findings.weight.html.large.what", "audit.findings.weight.html.large.why", "audit.findings.weight.html.large.how", `${Math.round(bytes / 1024)} KB`));
  } else if (bytes > 100 * 1024) {
    out.push(finding("weight.html.medium", "weight", "low", "audit.findings.weight.html.medium.title", "audit.findings.weight.html.medium.what", "audit.findings.weight.html.medium.why", "audit.findings.weight.html.medium.how", `${Math.round(bytes / 1024)} KB`));
  }

  // nº de scripts
  const scripts = root.querySelectorAll("script[src]");
  if (scripts.length > 15) {
    out.push(finding("weight.scripts.many", "weight", "medium", "audit.findings.weight.scripts.many.title", "audit.findings.weight.scripts.many.what", "audit.findings.weight.scripts.many.why", "audit.findings.weight.scripts.many.how", `${scripts.length} scripts`));
  }

  // nº de folhas de estilo
  const styles = root.querySelectorAll('link[rel="stylesheet"]');
  if (styles.length > 5) {
    out.push(finding("weight.css.many", "weight", "low", "audit.findings.weight.css.many.title", "audit.findings.weight.css.many.what", "audit.findings.weight.css.many.why", "audit.findings.weight.css.many.how", `${styles.length} folhas`));
  }

  // imagens sem width/height
  const imgs = root.querySelectorAll("img");
  const noDims = imgs.filter((img) => !img.getAttribute("width") || !img.getAttribute("height"));
  if (noDims.length > 0) {
    out.push(finding("weight.img.noDims", "weight", "medium", "audit.findings.weight.img.noDims.title", "audit.findings.weight.img.noDims.what", "audit.findings.weight.img.noDims.why", "audit.findings.weight.img.noDims.how", `${noDims.length} imagem(ns)`));
  }

  // imagens sem lazy loading (exceto primeira)
  const noLazy = imgs.filter((img, i) => i > 0 && img.getAttribute("loading") !== "lazy");
  if (noLazy.length > 2) {
    out.push(finding("weight.img.noLazy", "weight", "low", "audit.findings.weight.img.noLazy.title", "audit.findings.weight.img.noLazy.what", "audit.findings.weight.img.noLazy.why", "audit.findings.weight.img.noLazy.how", `${noLazy.length} imagem(ns)`));
  }

  return out;
}
