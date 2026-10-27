import { createHmac, timingSafeEqual } from "node:crypto";
import { SITE_URL } from "@/lib/constants";

/**
 * Ligações de cancelamento assinadas: o email vai no URL e um HMAC impede que alguém
 * cancele (ou use a rota para enviar avisos) em nome de endereços que não tem.
 *
 * Segredo: `NEWSLETTER_SECRET`; se faltar, usa a `RESEND_API_KEY` (já é um segredo de servidor).
 */
function secret(): string | null {
  return process.env.NEWSLETTER_SECRET?.trim() || process.env.RESEND_API_KEY?.trim() || null;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function unsubscribeToken(email: string): string | null {
  const key = secret();
  if (!key) return null;
  return createHmac("sha256", key).update(`unsubscribe:${normalizeEmail(email)}`).digest("hex");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expected = unsubscribeToken(email);
  if (!expected || token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

/** Página com o botão de confirmação (para o link no corpo do email). */
export function unsubscribePageUrl(email: string): string | null {
  const token = unsubscribeToken(email);
  if (!token) return null;
  return `${SITE_URL}/newsletter/cancelar?e=${encodeURIComponent(normalizeEmail(email))}&t=${token}`;
}

/** Endpoint de um clique (cabeçalho List-Unsubscribe, usado pelo Gmail/Apple Mail). */
export function unsubscribeOneClickUrl(email: string): string | null {
  const token = unsubscribeToken(email);
  if (!token) return null;
  return `${SITE_URL}/api/newsletter/unsubscribe?e=${encodeURIComponent(normalizeEmail(email))}&t=${token}`;
}
