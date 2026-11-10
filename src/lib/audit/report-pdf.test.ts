/** Relatório completo (com PageSpeed simulado) → assinatura e PDF em PT/EN, sem rede. */
import { test, expect, vi } from "vitest";
vi.mock("./safe-fetch", async (orig) => {
  const m = await orig<typeof import("./safe-fetch")>();
  return { ...m, safeFetch: async (url: string) => ({ ok: true, url, status: 200, headers: { "content-type": "text/html" },
    html: url.includes("spa") ? `<html lang="pt"><head><title>App</title></head><body><div id="root"></div><script src="/a.js"></script></body></html>`
      : `<html><head><title>Loja</title><script src="https://www.googletagmanager.com/gtag/js"></script></head><body><header><a href="/">Início</a></header><p>Morada: Rua A. Telefone 912 345 678. Página com acentuação.</p><img src="a.jpg"><input id="q"></body></html>` }) };
});
vi.mock("./pagespeed", () => ({ fetchPageSpeed: async () => ({ scores: { performance: 41, accessibility: 80, bestPractices: 90, seo: 70 }, metrics: { lcp: 5200, cls: 0.2, tbt: 600 }, opportunities: [{ id: "unused-javascript", title: "Reduce unused JavaScript", savingsMs: 900 }], fetchedAt: new Date().toISOString() }) }));
import { buildReport } from "./report";
import { buildAuditPdf } from "./pdf";
import { signResult, verifyResult } from "./signature";
import { resolveText } from "./text";
process.env.NEWSLETTER_SECRET ??= "segredo-de-teste";
test("relatório: textos, assinatura e PDF para página normal e site só com JavaScript", async () => {
  for (const url of ["https://loja.pt/", "https://spa.pt/"]) {
    const r = await buildReport({ url });
    if ("error" in r) throw new Error(r.error);
    const perf = r.categories.find((c) => c.category === "performance")!;
    expect(perf.score).toBe(41);
    expect(r.improvements.some((f) => f.id === "seo.jsOnly")).toBe(url.includes("spa"));
    for (const f of [...r.improvements, ...r.strengths]) for (const l of ["pt", "en"] as const) for (const k of [f.titleKey, f.whatKey, f.whyKey, f.howKey]) expect(resolveText(k, l), `${l} ${k}`).not.toBe("");
    r.signature = signResult(r)!;
    expect(verifyResult(r)).toBe(true);
    expect(verifyResult({ ...r, overallScore: 100 })).toBe(false);
    for (const l of ["pt", "en"] as const) { const pdf = await buildAuditPdf(r, l); expect(Buffer.from(pdf).subarray(0, 4).toString()).toBe("%PDF"); }
  }
});
