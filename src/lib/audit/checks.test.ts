import { describe, it, expect } from "vitest";
import {
  checkSecurity,
  checkSeo,
  checkMobile,
  checkAccessibility,
  checkContent,
  checkWeight,
} from "./checks";

describe("Audit Checks", () => {
  describe("checkSecurity", () => {
    it("flags missing HTTPS, missing HSTS, and mixed content", () => {
      const findings = checkSecurity({
        html: '<img src="http://insecure.com/logo.png">',
        headers: {},
        finalUrl: "http://example.com",
        status: 200,
      });

      const ids = findings.map((f) => f.id);
      expect(ids).toContain("security.https.missing");
      expect(ids).toContain("security.hsts.missing");
      expect(ids).toContain("security.xcto.missing");
      expect(ids).toContain("security.mixed-content");
    });

    it("passes secure page with HSTS and nosniff", () => {
      const findings = checkSecurity({
        html: '<img src="https://example.com/logo.png">',
        headers: {
          "strict-transport-security": "max-age=31536000",
          "x-content-type-options": "nosniff",
        },
        finalUrl: "https://example.com",
        status: 200,
      });

      expect(findings.length).toBe(0);
    });
  });

  describe("checkSeo", () => {
    it("flags missing title, description, and multiple H1s", () => {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta name="robots" content="noindex">
          </head>
          <body>
            <h1>First Title</h1>
            <h1>Second Title</h1>
          </body>
        </html>
      `;
      const findings = checkSeo(html);
      const ids = findings.map((f) => f.id);

      expect(ids).toContain("seo.title.missing");
      expect(ids).toContain("seo.metaDescription.missing");
      expect(ids).toContain("seo.h1.multiple");
      expect(ids).toContain("seo.canonical.missing");
      expect(ids).toContain("seo.robots.noindex");
      expect(ids).toContain("seo.lang.missing");
    });

    it("passes clean SEO markup", () => {
      const html = `
        <!DOCTYPE html>
        <html lang="pt-PT">
          <head>
            <title>Clínica Dentária de Lisboa — Cuidados Dentários Avançados</title>
            <meta name="description" content="Tratamentos dentários modernos, implantes e estética dentária com os melhores especialistas em Lisboa. Agende a sua consulta.">
            <link rel="canonical" href="https://example.com">
            <meta property="og:title" content="Clínica Dentária de Lisboa">
            <meta property="og:description" content="Cuidados dentários avançados.">
            <meta property="og:image" content="https://example.com/og.jpg">
            <meta name="twitter:card" content="summary_large_image">
            <script type="application/ld+json">{"@context":"https://schema.org","@type":"Dentist"}</script>
          </head>
          <body>
            <h1>Clínica Dentária de Lisboa</h1>
            <h2>Os Nossos Tratamentos</h2>
          </body>
        </html>
      `;
      const findings = checkSeo(html);
      expect(findings.length).toBe(0);
    });
  });

  describe("checkMobile", () => {
    it("flags missing viewport and missing contact channels", () => {
      const html = "<html><body><p>Sem viewport nem contactos</p></body></html>";
      const findings = checkMobile(html);
      const ids = findings.map((f) => f.id);

      expect(ids).toContain("mobile.viewport.missing");
      expect(ids).toContain("mobile.form.missing");
    });

    it("detects mobile responsive elements and clickable contact links", () => {
      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body>
            <a href="tel:+351912345678">912 345 678</a>
            <a href="mailto:info@example.com">info@example.com</a>
            <a href="https://wa.me/351912345678">WhatsApp</a>
            <form><input type="text"><button type="submit">Enviar</button></form>
            <p>Horário: Segunda a Sexta, 09h às 18h</p>
          </body>
        </html>
      `;
      const findings = checkMobile(html);
      const ids = findings.map((f) => f.id);

      expect(ids).not.toContain("mobile.viewport.missing");
      expect(ids).not.toContain("mobile.viewport.notResponsive");
      expect(ids).not.toContain("mobile.form.missing");
    });
  });

  describe("checkAccessibility", () => {
    it("detects images without alt and inputs without label", () => {
      const html = `
        <html>
          <body>
            <img src="/photo.jpg">
            <input type="text" name="nome">
          </body>
        </html>
      `;
      const findings = checkAccessibility(html);
      const ids = findings.map((f) => f.id);

      expect(ids).toContain("a11y.img.alt.missing");
      expect(ids).toContain("a11y.input.label.missing");
      expect(ids).toContain("a11y.lang.missing");
    });

    it("passes accessible images and inputs with labels", () => {
      const html = `
        <html lang="pt">
          <body>
            <a href="#content">Saltar para o conteúdo</a>
            <main id="content">
              <img src="/photo.jpg" alt="Equipa médica no consultório">
              <label for="name">Nome completo</label>
              <input id="name" type="text" name="name">
            </main>
          </body>
        </html>
      `;
      const findings = checkAccessibility(html);
      expect(findings.length).toBe(0);
    });
  });

  describe("checkContent", () => {
    it("detects missing CTA and missing privacy policy", () => {
      const html = "<html><body><p>Conteúdo simples sem conversão</p></body></html>";
      const findings = checkContent(html);
      const ids = findings.map((f) => f.id);

      expect(ids).toContain("content.cta.aboveFold.missing");
      expect(ids).toContain("content.privacy.missing");
    });

    it("recognizes CTA, privacy policy, and social proof", () => {
      const html = `
        <html>
          <body>
            <header>
              <a href="/contacto" class="btn">Pedir Orçamento Gratuito</a>
            </header>
            <section>
              <p>O que dizem os nossos clientes: testemunho excelente!</p>
            </section>
            <footer>
              <a href="/privacidade">Política de Privacidade</a>
              <div id="cookie-banner">Este site usa cookies.</div>
            </footer>
          </body>
        </html>
      `;
      const findings = checkContent(html);
      const ids = findings.map((f) => f.id);

      expect(ids).not.toContain("content.cta.aboveFold.missing");
      expect(ids).not.toContain("content.privacy.missing");
      expect(ids).not.toContain("content.socialProof.missing");
    });
  });

  describe("checkWeight", () => {
    it("flags images missing dimensions or lazy loading", () => {
      const html = `
        <html>
          <body>
            <img src="/photo1.jpg">
            <img src="/photo2.jpg">
            <img src="/photo3.jpg">
            <img src="/photo4.jpg">
          </body>
        </html>
      `;
      const findings = checkWeight(html);
      const ids = findings.map((f) => f.id);

      expect(ids).toContain("weight.img.noDims");
      expect(ids).toContain("weight.img.noLazy");
    });
  });
});
