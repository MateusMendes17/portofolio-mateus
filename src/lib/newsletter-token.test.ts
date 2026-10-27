import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  unsubscribeOneClickUrl,
  unsubscribePageUrl,
  unsubscribeToken,
  verifyUnsubscribeToken,
} from "./newsletter-token";

describe("newsletter-token", () => {
  const original = { secret: process.env.NEWSLETTER_SECRET, resend: process.env.RESEND_API_KEY };

  beforeEach(() => {
    process.env.NEWSLETTER_SECRET = "segredo-de-teste";
  });

  afterEach(() => {
    process.env.NEWSLETTER_SECRET = original.secret;
    process.env.RESEND_API_KEY = original.resend;
  });

  it("valida o token do próprio email, sem distinguir maiúsculas", () => {
    const token = unsubscribeToken("Ana@Exemplo.pt");
    expect(token).toBeTruthy();
    expect(verifyUnsubscribeToken("ana@exemplo.pt", token!)).toBe(true);
  });

  it("rejeita o token de outro email ou um token adulterado", () => {
    const token = unsubscribeToken("ana@exemplo.pt")!;
    expect(verifyUnsubscribeToken("outra@exemplo.pt", token)).toBe(false);
    expect(verifyUnsubscribeToken("ana@exemplo.pt", token.slice(0, -1) + "0")).toBe(false);
    expect(verifyUnsubscribeToken("ana@exemplo.pt", "curto")).toBe(false);
  });

  it("sem nenhum segredo configurado não gera ligações", () => {
    delete process.env.NEWSLETTER_SECRET;
    delete process.env.RESEND_API_KEY;
    expect(unsubscribeToken("ana@exemplo.pt")).toBeNull();
    expect(unsubscribePageUrl("ana@exemplo.pt")).toBeNull();
    expect(verifyUnsubscribeToken("ana@exemplo.pt", "x".repeat(64))).toBe(false);
  });

  it("gera ligações com o email normalizado e o token", () => {
    const page = unsubscribePageUrl("Ana@Exemplo.pt")!;
    expect(page).toContain("/newsletter/cancelar?e=ana%40exemplo.pt&t=");
    expect(unsubscribeOneClickUrl("ana@exemplo.pt")).toContain("/api/newsletter/unsubscribe?e=ana%40exemplo.pt&t=");
  });
});
