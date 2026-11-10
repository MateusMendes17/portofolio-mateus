import { parse } from "node-html-parser";
import type { Finding } from "../types";
import { SEVERITY_PENALTY } from "../scoring";
import { checkSecurity } from "./security";
import { checkSeo } from "./seo";
import { checkMobile } from "./mobile";
import { checkAccessibility } from "./accessibility";
import { checkContent } from "./content";
import { checkWeight } from "./weight";

export interface CheckInput {
  html: string;
  headers: Record<string, string>;
  finalUrl: string;
  status: number;
}

/**
 * Verificações que dependem do conteúdo da página. Num site que só desenha o
 * conteúdo com JavaScript, o HTML inicial está vazio e dariam falsos negativos.
 */
const CONTENT_DEPENDENT = /^(seo\.h1\.|seo\.headings\.|content\.(cta|socialProof|privacy)\.|mobile\.(tel|mailto|whatsapp|form|map|hours)\.|a11y\.(img|input|skiplink)\.|weight\.img\.)/;

const MOUNT_POINTS = "#root, #app, #__next, #__nuxt, #q-app, #svelte, app-root, [ng-version], [data-reactroot]";

/**
 * Conteúdo desenhado no cliente: há scripts, quase não há texto visível e há um
 * sinal de aplicação JavaScript (ponto de montagem vazio, aviso "ative o
 * JavaScript" ou nenhum texto de todo). Uma página curta mas real não conta.
 */
export function isJsOnlyShell(html: string): boolean {
  const root = parse(html);
  if (root.querySelectorAll("script").length === 0) return false;
  const body = root.querySelector("body");
  if (!body) return false;
  const noscript = body.querySelectorAll("noscript").map((n) => n.text).join(" ");
  body.querySelectorAll("script, style, noscript, template, svg").forEach((el) => el.remove());
  const textLength = body.text.replace(/\s+/g, " ").trim().length;
  if (textLength >= 150) return false;
  const emptyMount = body.querySelectorAll(MOUNT_POINTS).some((el) => el.text.trim().length < 20);
  return textLength < 30 || emptyMount || /javascript/i.test(noscript);
}

export function runAllChecks(input: CheckInput): Finding[] {
  const findings = [
    ...checkSecurity({ html: input.html, headers: input.headers, finalUrl: input.finalUrl, status: input.status }),
    ...checkSeo(input.html, input.headers),
    ...checkMobile(input.html),
    ...checkAccessibility(input.html),
    ...checkContent(input.html),
    ...checkWeight(input.html),
  ];
  if (!isJsOnlyShell(input.html)) return findings;

  return [
    {
      id: "seo.jsOnly",
      category: "seo",
      severity: "high",
      titleKey: "audit.findings.seo.jsOnly.title",
      whatKey: "audit.findings.seo.jsOnly.what",
      whyKey: "audit.findings.seo.jsOnly.why",
      howKey: "audit.findings.seo.jsOnly.how",
      pointsLost: SEVERITY_PENALTY.high,
    },
    ...findings.filter((f) => !CONTENT_DEPENDENT.test(f.id)),
  ];
}

export { checkSecurity, checkSeo, checkMobile, checkAccessibility, checkContent, checkWeight };
