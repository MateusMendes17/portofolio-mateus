import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { checkSeo, checkMobile, checkAccessibility, checkContent, checkWeight, runAllChecks, isJsOnlyShell } from "./checks";
import { isBotChallenge, decodeBody } from "./safe-fetch";
import { resolveText } from "./text";

/** Regressões de falsos positivos encontrados ao testar sites reais (2026-11-10). */
describe("Avaliador: precisão", () => {
  const ids = (findings: { id: string }[]) => findings.map((f) => f.id);

  it("aceita JSON-LD no body (Next.js e outros põem-no fora do <head>)", () => {
    const html = `<html><head><title>x</title></head><body><script type="application/ld+json">{"@type":"Person"}</script></body></html>`;
    expect(ids(checkSeo(html))).not.toContain("seo.jsonld.missing");
  });

  it("deteta noindex no cabeçalho X-Robots-Tag", () => {
    expect(ids(checkSeo("<html><head></head></html>", { "x-robots-tag": "noindex" }))).toContain("seo.robots.noindex");
  });

  it("ignora campos hidden, botões e honeypots sem rótulo", () => {
    const html = `<form><input type="hidden" name="t"><input type="submit"><div aria-hidden="true"><input name="hp"></div><input id="e"><label for="e">Email</label></form>`;
    expect(ids(checkAccessibility(html))).not.toContain("a11y.input.label.missing");
  });

  it("reconhece skip links com outros nomes de âncora", () => {
    const html = `<body><a href="#conteudo">Saltar para o conteúdo</a><main id="conteudo"></main></body>`;
    expect(ids(checkAccessibility(html))).not.toContain("a11y.skiplink.missing");
  });

  it("telefone ligado por WhatsApp conta como clicável", () => {
    const html = `<body><a href="https://wa.me/351912345678">+351 912 345 678</a></body>`;
    const found = ids(checkMobile(html));
    expect(found).not.toContain("mobile.tel.missing");
    expect(found).not.toContain("mobile.whatsapp.missing");
  });

  it("não exige formulário na home quando há link para a página de contacto", () => {
    const html = `<body><a href="/contacto">Contacto</a></body>`;
    expect(ids(checkMobile(html))).not.toContain("mobile.form.missing");
  });

  it("só pede horário a negócios locais (com morada ou telefone)", () => {
    expect(ids(checkMobile("<body><p>Software para equipas</p></body>"))).not.toContain("mobile.hours.missing");
    expect(ids(checkMobile("<body><p>Morada: Rua A, Lisboa</p></body>"))).toContain("mobile.hours.missing");
  });

  it("só pede aviso de cookies quando há rastreamento", () => {
    expect(ids(checkContent("<body><p>Olá</p></body>"))).not.toContain("content.cookies.notice.missing");
    const tracked = `<head><script src="https://www.googletagmanager.com/gtag/js?id=G-1"></script></head><body></body>`;
    expect(ids(checkContent(tracked))).toContain("content.cookies.notice.missing");
  });

  it("não exige width/height em imagens fill do next/image", () => {
    expect(ids(checkWeight(`<img src="a.jpg" alt="" data-nimg="fill" style="position:absolute;width:100%;height:100%">`))).not.toContain("weight.img.noDims");
  });

  it("deteta sites só com JavaScript e não inventa falhas de conteúdo", () => {
    const shell = `<html lang="pt"><head><title>App</title></head><body><div id="root"></div><script src="/app.js"></script></body></html>`;
    expect(isJsOnlyShell(shell)).toBe(true);
    const found = ids(runAllChecks({ html: shell, headers: {}, finalUrl: "https://x.pt/", status: 200 }));
    expect(found).toContain("seo.jsOnly");
    expect(found).not.toContain("seo.h1.missing");
    expect(found).not.toContain("content.privacy.missing");
  });

  it("não confunde uma página curta mas real com um site só de JavaScript", () => {
    const short = `<html><body><header><a href="/">Início</a></header><p>Morada: Rua A. Telefone 912 345 678.</p><script src="/analytics.js"></script></body></html>`;
    expect(isJsOnlyShell(short)).toBe(false);
    const noscript = `<html><body><noscript>Ative o JavaScript para usar esta aplicação.</noscript><div id="app"></div><script src="/a.js"></script></body></html>`;
    expect(isJsOnlyShell(noscript)).toBe(true);
  });

  it("reconhece páginas de desafio anti-bots", () => {
    expect(isBotChallenge(403, { "cf-mitigated": "challenge" }, "")).toBe(true);
    expect(isBotChallenge(503, {}, "<title>Just a moment...</title>")).toBe(true);
    expect(isBotChallenge(200, {}, "<title>Loja</title>")).toBe(false);
  });

  it("descodifica páginas em ISO-8859-1", () => {
    const body = Buffer.from("<p>Página</p>", "latin1");
    expect(decodeBody(body, "text/html; charset=ISO-8859-1")).toContain("Página");
  });

  it("todas as verificações têm texto em PT e EN", () => {
    const src = ["accessibility", "content", "index", "mobile", "security", "seo", "weight"]
      .map((f) => readFileSync(`src/lib/audit/checks/${f}.ts`, "utf8"))
      .concat(readFileSync("src/lib/audit/report.ts", "utf8"))
      .join("\n");
    const keys = [...new Set(src.match(/audit\.findings\.[\w.]+/g) ?? [])].filter((k) => /\.(title|what|why|how)$/.test(k));
    expect(keys.length).toBeGreaterThan(50);
    const missing = keys.flatMap((k) => (["pt", "en"] as const).filter((l) => !resolveText(k, l)).map((l) => `${l}:${k}`));
    expect(missing).toEqual([]);
  });
});

describe("Avaliador: precisão (2)", () => {
  const ids = (findings: { id: string }[]) => findings.map((f) => f.id);

  it("reconhece ações de loja/assinatura como CTA e ignora classes no HTML", () => {
    expect(ids(checkContent(`<body><header><a href="/loja">Comprar agora</a></header></body>`))).not.toContain("content.cta.aboveFold.missing");
    expect(ids(checkContent(`<body><header><span class="contact-icon"></span><a href="/">Início</a></header></body>`))).toContain("content.cta.aboveFold.missing");
  });

  it("ignora campos escondidos (d-none, hidden, display:none)", () => {
    const html = `<body><input class="d-none" type="number"><input hidden><div style="display:none"><input></div></body>`;
    expect(ids(checkAccessibility(html))).not.toContain("a11y.input.label.missing");
  });
});
