import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { SITE_CONFIG } from "@/lib/constants";
import { resolveText, type Locale } from "./text";
import type { AuditResult, Finding } from "./types";

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 48;
const CONTENT_W = PAGE_W - MARGIN * 2;

const INK = rgb(0.043, 0.043, 0.047);
const MUTED = rgb(0.39, 0.39, 0.37);
const LINE = rgb(0.85, 0.85, 0.82);
const ACCENT = rgb(0.72, 0.9, 0.2);

const L = {
  pt: {
    title: "Relatório do Avaliador de Sites",
    analyzed: "Analisado em",
    overall: "Nota geral",
    categories: "Notas por categoria",
    improvements: "O que melhorar (por prioridade)",
    strengths: "O que já está bom",
    limitations: "Limitações desta análise",
    what: "O que é",
    why: "Porque importa",
    how: "Como corrigir",
    evidence: "Evidência",
    unavailable: "Indisponível",
    perf: "Desempenho (Lighthouse mobile)",
    none: "Nenhum ponto a melhorar foi detetado.",
    footer: "Quer que eu trate disto? Fale comigo:",
    severity: { high: "Prioridade alta", medium: "Prioridade média", low: "Prioridade baixa", info: "" },
    categoriesNames: { security: "Segurança", seo: "SEO", mobile: "Mobile", accessibility: "Acessibilidade", content: "Conteúdo", performance: "Desempenho", weight: "Peso da página" },
    locale: "pt-PT",
  },
  en: {
    title: "Website Evaluator Report",
    analyzed: "Analyzed on",
    overall: "Overall score",
    categories: "Scores by category",
    improvements: "What to improve (by priority)",
    strengths: "What is already good",
    limitations: "Limitations of this analysis",
    what: "What it is",
    why: "Why it matters",
    how: "How to fix it",
    evidence: "Evidence",
    unavailable: "Unavailable",
    perf: "Performance (Lighthouse mobile)",
    none: "No improvement points were detected.",
    footer: "Want me to take care of this? Get in touch:",
    severity: { high: "High priority", medium: "Medium priority", low: "Low priority", info: "" },
    categoriesNames: { security: "Security", seo: "SEO", mobile: "Mobile", accessibility: "Accessibility", content: "Content", performance: "Performance", weight: "Page weight" },
    locale: "en-GB",
  },
} as const;

/** A fonte padrão do PDF só codifica Latin-1: troca o resto por equivalentes simples. */
function safe(text: string): string {
  return text
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .replace(/[→✓✔]/g, "")
    .replace(/[^\u0009\u000A -~ -ÿ]/g, "?");
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of safe(text).split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const next = line ? `${line} ${word}` : word;
      if (font.widthOfTextAtSize(next, size) <= maxWidth) {
        line = next;
      } else {
        if (line) lines.push(line);
        line = word;
      }
    }
    lines.push(line);
  }
  return lines;
}

type TextOpts = { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb>; indent?: number; gap?: number };

export async function buildAuditPdf(result: AuditResult, locale: Locale): Promise<Uint8Array> {
  const t = L[locale];
  const pdf = await PDFDocument.create();
  pdf.setTitle(safe(`${t.title} - ${result.url}`));
  pdf.setAuthor(SITE_CONFIG.name);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let page: PDFPage = pdf.addPage([PAGE_W, PAGE_H]);
  let y = PAGE_H - MARGIN;

  const ensure = (needed: number) => {
    if (y - needed < MARGIN + 24) {
      page = pdf.addPage([PAGE_W, PAGE_H]);
      y = PAGE_H - MARGIN;
    }
  };

  const text = (value: string, opts: TextOpts = {}) => {
    const size = opts.size ?? 10;
    const font = opts.font ?? regular;
    const indent = opts.indent ?? 0;
    for (const line of wrap(value, font, size, CONTENT_W - indent)) {
      ensure(size + 4);
      page.drawText(line, { x: MARGIN + indent, y: y - size, size, font, color: opts.color ?? INK });
      y -= size + 4;
    }
    y -= opts.gap ?? 0;
  };

  const heading = (value: string) => {
    ensure(40);
    y -= 10;
    page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_W - MARGIN, y }, thickness: 0.7, color: LINE });
    y -= 6;
    text(value, { size: 13, font: bold, gap: 4 });
  };

  // Cabeçalho
  page.drawRectangle({ x: MARGIN, y: y - 4, width: 36, height: 4, color: ACCENT });
  y -= 16;
  text(t.title, { size: 20, font: bold, gap: 2 });
  text(result.url, { size: 11, color: MUTED });
  text(`${t.analyzed} ${new Date(result.analyzedAt).toLocaleString(t.locale, { timeZone: "Europe/Lisbon" })}`, {
    size: 9,
    color: MUTED,
    gap: 8,
  });

  ensure(70);
  const scoreText = `${result.overallScore}`;
  page.drawText(scoreText, { x: MARGIN, y: y - 40, size: 44, font: bold, color: INK });
  page.drawText("/ 100", { x: MARGIN + bold.widthOfTextAtSize(scoreText, 44) + 6, y: y - 40, size: 14, font: regular, color: MUTED });
  page.drawText(t.overall, { x: MARGIN, y: y - 56, size: 9, font: regular, color: MUTED });
  y -= 70;

  // Categorias
  heading(t.categories);
  for (const c of result.categories) {
    ensure(18);
    const unavailable = c.available === false;
    page.drawText(safe(t.categoriesNames[c.category]), { x: MARGIN, y: y - 10, size: 10, font: regular, color: INK });
    const barX = MARGIN + 150;
    const barW = 260;
    page.drawRectangle({ x: barX, y: y - 10, width: barW, height: 7, color: rgb(0.93, 0.93, 0.9) });
    if (!unavailable) page.drawRectangle({ x: barX, y: y - 10, width: (barW * c.score) / 100, height: 7, color: ACCENT });
    page.drawText(unavailable ? safe(t.unavailable) : `${c.score}`, { x: barX + barW + 12, y: y - 10, size: 10, font: bold, color: INK });
    y -= 18;
  }

  if (result.performance) {
    const m = result.performance.metrics;
    const parts = [
      result.performance.scores.performance !== null ? `Lighthouse ${result.performance.scores.performance}/100` : null,
      m.lcp !== null ? `LCP ${(m.lcp / 1000).toFixed(1)} s` : null,
      m.cls !== null ? `CLS ${m.cls.toFixed(2)}` : null,
      m.tbt !== null ? `TBT ${m.tbt} ms` : null,
    ].filter(Boolean);
    if (parts.length) text(`${t.perf}: ${parts.join("  |  ")}`, { size: 9, color: MUTED });
  }

  // Melhorias
  heading(t.improvements);
  if (result.improvements.length === 0) text(t.none, { color: MUTED });
  const block = (f: Finding) => {
    ensure(70);
    const sev = t.severity[f.severity];
    text(resolveText(f.titleKey, locale) || f.id, { size: 11, font: bold });
    if (sev) text(sev + (f.evidence ? `  -  ${t.evidence}: ${f.evidence}` : ""), { size: 8.5, color: MUTED, gap: 2 });
    const parts: Array<[string, string]> = [
      [t.what, f.whatKey],
      [t.why, f.whyKey],
      [t.how, f.howKey],
    ];
    for (const [label, key] of parts) {
      const body = resolveText(key, locale);
      if (body) text(`${label}: ${body}`, { size: 9.5, indent: 8 });
    }
    y -= 8;
  };
  result.improvements.forEach(block);

  // Pontos fortes
  if (result.strengths.length) {
    heading(t.strengths);
    for (const f of result.strengths) text(`- ${resolveText(f.titleKey, locale) || f.id}`, { size: 10 });
  }

  // Limitações
  heading(t.limitations);
  for (const key of result.limitations) text(`- ${resolveText(key, locale)}`, { size: 9, color: MUTED });

  y -= 14;
  ensure(50);
  text(t.footer, { size: 10, font: bold });
  text(`${SITE_CONFIG.name}  |  ${SITE_CONFIG.email}`, { size: 10 });

  const pages = pdf.getPages();
  pages.forEach((p, i) => {
    p.drawText(safe(`${SITE_CONFIG.name}  -  ${i + 1}/${pages.length}`), { x: MARGIN, y: 28, size: 8, font: regular, color: MUTED });
  });

  return pdf.save();
}
