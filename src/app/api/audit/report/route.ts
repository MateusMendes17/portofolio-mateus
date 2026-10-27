import { NextRequest } from "next/server";
import { z } from "zod";
import { normalizeUrl } from "@/lib/audit/safe-fetch";
import { getCachedAudit, isAllowedOrigin } from "@/lib/audit/cache";
import { buildAuditPdf } from "@/lib/audit/pdf";
import { sendAuditReportEmail } from "@/lib/audit/report-email";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  url: z.string().min(1).max(2048),
  locale: z.enum(["pt", "en"]).default("pt"),
  delivery: z.enum(["download", "email"]),
  email: z.string().email().max(254).optional(),
  consent: z.boolean().optional(),
  honeypot: z.string().optional(),
});

function json(body: unknown, status: number, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

/**
 * POST /api/audit/report
 * Gera o PDF a partir da análise em cache (não volta a analisar o site).
 * - delivery "download": devolve o PDF.
 * - delivery "email": envia o PDF ao visitante (requer email e consentimento).
 */
export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request.headers)) return json({ error: "Origem não permitida." }, 403);
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) {
    return json({ error: "Content-Type inválido." }, 415);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "JSON inválido." }, 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return json({ error: "Dados inválidos." }, 400);
  const data = parsed.data;

  if (data.honeypot) return json({ ok: true }, 200);

  const rl = checkRateLimit(`report:${getClientIp(request)}`, 10, 60 * 60 * 1000);
  if (!rl.allowed) {
    return json({ error: `Limite excedido. Tente novamente em ${rl.retryAfterSeconds}s.` }, 429, {
      "Retry-After": String(rl.retryAfterSeconds),
    });
  }

  const normalized = normalizeUrl(data.url);
  if (!normalized) return json({ error: "URL inválido." }, 400);

  const result = getCachedAudit(normalized);
  if (!result) {
    return json({ error: "A análise expirou. Volte a analisar o site para gerar o relatório." }, 410);
  }

  if (data.delivery === "email" && (!data.email || data.consent !== true)) {
    return json({ error: "Indique o email e autorize o envio." }, 400);
  }

  const pdf = await buildAuditPdf(result, data.locale);

  if (data.delivery === "download") {
    const host = (() => {
      try {
        return new URL(result.url).host.replace(/[^a-z0-9.-]/gi, "");
      } catch {
        return "site";
      }
    })();
    return new Response(Buffer.from(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="relatorio-${host}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const sent = await sendAuditReportEmail({ to: data.email!, locale: data.locale, result, pdf });
  if (sent.status === "enviado") return json({ ok: true }, 200);
  if (sent.status === "sem-chave") return json({ error: "O envio por email não está configurado." }, 503);
  return json({ error: "Não foi possível enviar o email. Pode descarregar o PDF." }, 502);
}
