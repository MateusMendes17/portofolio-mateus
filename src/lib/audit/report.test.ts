import { describe, it, expect, vi } from "vitest";
import { buildReport } from "./report";
import * as safeFetchModule from "./safe-fetch";

describe("buildReport", () => {
  it("generates deterministic scores, categories, strengths and improvements", async () => {
    vi.spyOn(safeFetchModule, "safeFetch").mockResolvedValueOnce({
      ok: true,
      url: "https://example.com",
      status: 200,
      headers: {
        "content-type": "text/html",
        "strict-transport-security": "max-age=31536000",
        "x-content-type-options": "nosniff",
      },
      html: `
        <!DOCTYPE html>
        <html lang="pt-PT">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Empresa Exemplo — Soluções de Engenharia em Portugal</title>
            <meta name="description" content="Especialistas em engenharia e tecnologia com projetos inovadores em Portugal. Contacte-nos hoje.">
            <link rel="canonical" href="https://example.com">
          </head>
          <body>
            <h1>Empresa Exemplo</h1>
            <a href="tel:+351912345678">912 345 678</a>
            <footer>
              <a href="/privacidade">Política de Privacidade</a>
            </footer>
          </body>
        </html>
      `,
    });

    const report = await buildReport({ url: "https://example.com" });

    expect("error" in report).toBe(false);
    if ("error" in report) return;

    expect(report.url).toBe("https://example.com");
    expect(report.overallScore).toBeGreaterThan(50);
    expect(report.categories.length).toBe(7);
    expect(report.strengths.length).toBeGreaterThan(0);
    expect(report.limitations.length).toBe(4);

    const strengthIds = report.strengths.map((s) => s.id);
    expect(strengthIds).toContain("strengths.https");
    expect(strengthIds).toContain("strengths.hsts");
    expect(strengthIds).toContain("strengths.title");
    expect(strengthIds).toContain("strengths.h1");
    expect(strengthIds).toContain("strengths.viewport");
  });

  it("handles fetch errors gracefully", async () => {
    vi.spyOn(safeFetchModule, "safeFetch").mockResolvedValueOnce({
      ok: false,
      error: "inaccessible",
      message: "O site está inacessível.",
    });

    const report = await buildReport({ url: "https://unreachable-site.invalid" });
    expect("error" in report).toBe(true);
    if ("error" in report) {
      expect(report.error).toBe("O site está inacessível.");
    }
  });
});
