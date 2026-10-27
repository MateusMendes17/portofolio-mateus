import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { signResult, verifyResult } from "./signature";
import type { AuditResult } from "./types";

const base: AuditResult = {
  url: "https://example.com/",
  originalUrl: "https://example.com/",
  analyzedAt: "2026-10-27T12:00:00.000Z",
  overallScore: 80,
  categories: [],
  strengths: [],
  improvements: [],
  limitations: [],
  performance: null,
  fromCache: false,
};

describe("assinatura da análise", () => {
  const original = { secret: process.env.NEWSLETTER_SECRET, resend: process.env.RESEND_API_KEY };

  beforeEach(() => {
    process.env.NEWSLETTER_SECRET = "segredo-de-teste";
  });
  afterEach(() => {
    process.env.NEWSLETTER_SECRET = original.secret;
    process.env.RESEND_API_KEY = original.resend;
  });

  it("valida uma análise assinada, mesmo depois de passar por JSON e de mudar fromCache", () => {
    const signed = { ...base, signature: signResult(base)! };
    const roundTrip = JSON.parse(JSON.stringify({ ...signed, fromCache: true })) as AuditResult;
    expect(verifyResult(roundTrip)).toBe(true);
  });

  it("rejeita uma análise adulterada ou sem assinatura", () => {
    const signed = { ...base, signature: signResult(base)! };
    expect(verifyResult({ ...signed, overallScore: 100 })).toBe(false);
    expect(verifyResult({ ...signed, url: "https://outro.pt/" })).toBe(false);
    expect(verifyResult({ ...base })).toBe(false);
  });

  it("sem segredo configurado nunca valida", () => {
    delete process.env.NEWSLETTER_SECRET;
    delete process.env.RESEND_API_KEY;
    expect(signResult(base)).toBeNull();
    expect(verifyResult({ ...base, signature: "x".repeat(64) })).toBe(false);
  });
});
