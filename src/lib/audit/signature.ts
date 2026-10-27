import { createHmac, timingSafeEqual } from "node:crypto";
import type { AuditResult } from "./types";

/**
 * Assinatura da análise: o servidor assina o resultado que devolve ao browser e só gera o
 * PDF (ou envia o email) a partir de um resultado com assinatura válida. Assim o relatório
 * não depende de uma cache em memória (que na Vercel é por instância) e ninguém consegue
 * fabricar conteúdos para o enviar por email em nome do site.
 *
 * Segredo: `NEWSLETTER_SECRET`; se faltar, usa a `RESEND_API_KEY`.
 */
function secret(): string | null {
  return process.env.NEWSLETTER_SECRET?.trim() || process.env.RESEND_API_KEY?.trim() || null;
}

/** Forma canónica: sem a própria assinatura nem o indicador de cache (que mudam sem alterar a análise). */
function canonical(result: AuditResult): string {
  return JSON.stringify({ ...result, signature: undefined, fromCache: false });
}

export function signResult(result: AuditResult): string | null {
  const key = secret();
  if (!key) return null;
  return createHmac("sha256", key).update(`audit:${canonical(result)}`).digest("hex");
}

export function verifyResult(result: AuditResult): boolean {
  const expected = signResult(result);
  const given = result.signature;
  if (!expected || typeof given !== "string" || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}
