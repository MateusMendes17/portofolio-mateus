import { NextRequest } from "next/server";
import { z } from "zod";
import { isAllowedOrigin } from "@/lib/audit/cache";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { CONTACT_FROM, CONTACT_RECIPIENT } from "@/lib/contact-email";
import { normalizeEmail, verifyUnsubscribeToken } from "@/lib/newsletter-token";

export const runtime = "nodejs";

const bodySchema = z.object({
  email: z.string().trim().email().max(254),
  token: z.string().max(128),
});

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

/** Tenta marcar o contacto como "unsubscribed" na audiência do Resend (se existir e a chave o permitir). */
async function unsubscribeFromAudience(email: string, apiKey: string): Promise<void> {
  const audienceId = process.env.RESEND_AUDIENCE_ID?.trim();
  if (!audienceId) return;
  try {
    await fetch(`https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ unsubscribed: true }),
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    // Sem audiência acessível, o aviso por email abaixo garante que o pedido não se perde.
  }
}

/** Avisa o dono do site para remover o endereço de qualquer lista (funciona com chaves só de envio). */
async function notifyOwner(email: string, apiKey: string): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM,
        to: [CONTACT_RECIPIENT],
        subject: "Cancelamento da newsletter",
        html: `<p>Este endereço pediu para cancelar a newsletter. Remova-o de qualquer lista e não volte a enviar-lhe emails de marketing:</p><p><strong>${email.replace(/[<>&"']/g, "")}</strong></p>`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * POST /api/newsletter/unsubscribe
 * - Da página de cancelamento: JSON { email, token }.
 * - Do cabeçalho List-Unsubscribe (um clique): query ?e=…&t=…
 * Nunca regista o email nos logs.
 */
export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request.headers)) return json({ error: "Origem não permitida." }, 403);

  const params = request.nextUrl.searchParams;
  let candidate: unknown = { email: params.get("e") ?? "", token: params.get("t") ?? "" };
  if ((request.headers.get("content-type") ?? "").includes("application/json")) {
    // Corpo JSON da página de cancelamento; se vier vazio, valem os parâmetros do link.
    const fromBody = await request.json().catch(() => null);
    if (fromBody) candidate = fromBody;
  }

  const parsed = bodySchema.safeParse(candidate);
  if (!parsed.success) return json({ error: "Ligação inválida." }, 400);

  const email = normalizeEmail(parsed.data.email);
  if (!verifyUnsubscribeToken(email, parsed.data.token)) {
    return json({ error: "Ligação inválida ou expirada." }, 400);
  }

  const rl = checkRateLimit(`unsub:${getClientIp(request)}`, 10, 60 * 60 * 1000);
  if (!rl.allowed) {
    return json({ error: `Demasiados pedidos. Tente novamente em ${rl.retryAfterSeconds}s.` }, 429, {
      "Retry-After": String(rl.retryAfterSeconds),
    });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return json({ error: "O serviço de email não está configurado." }, 503);

  await unsubscribeFromAudience(email, apiKey);
  const notified = await notifyOwner(email, apiKey);
  if (!notified) {
    console.error("[newsletter] cancelamento: não foi possível avisar o dono");
    return json({ error: "Não foi possível registar o pedido. Responda ao email da newsletter." }, 502);
  }

  return json({ ok: true });
}
