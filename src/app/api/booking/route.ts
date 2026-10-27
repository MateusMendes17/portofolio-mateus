import { NextRequest } from "next/server";
import { z } from "zod";
import { isAllowedOrigin } from "@/lib/audit/cache";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { CAL_API, CAL_BOOKINGS_VERSION, resolveEvent, validTimeZone } from "@/lib/cal-booking";

export const runtime = "nodejs";

const schema = z.object({
  minutes: z.number().int(),
  start: z.string().datetime({ offset: true }),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  timeZone: z.string().max(64),
  notes: z.string().trim().max(500).optional(),
  locale: z.enum(["pt", "en"]).default("pt"),
  honeypot: z.string().optional(),
});

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

/**
 * POST /api/booking — cria a marcação no Cal.com (que envia as confirmações por email).
 * Nunca regista nome, email ou notas nos logs.
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
  if (!parsed.success) return json({ error: "Verifique o nome e o email." }, 400);
  const data = parsed.data;

  if (data.honeypot) return json({ ok: true }); // bots: simular sucesso

  const resolved = resolveEvent(data.minutes);
  const timeZone = validTimeZone(data.timeZone);
  if (!resolved || !timeZone) return json({ error: "Pedido inválido." }, 400);
  if (new Date(data.start).getTime() <= Date.now()) {
    return json({ error: "Esse horário já passou. Escolha outro." }, 400);
  }

  const rl = checkRateLimit(`booking:${getClientIp(request)}`, 5, 60 * 60 * 1000);
  if (!rl.allowed) {
    return json({ error: `Demasiados pedidos. Tente novamente em ${rl.retryAfterSeconds}s.` }, 429, {
      "Retry-After": String(rl.retryAfterSeconds),
    });
  }

  try {
    const res = await fetch(`${CAL_API}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "cal-api-version": CAL_BOOKINGS_VERSION },
      body: JSON.stringify({
        start: new Date(data.start).toISOString(),
        eventTypeSlug: resolved.slug,
        username: resolved.username,
        attendee: { name: data.name, email: data.email, timeZone, language: data.locale },
        ...(data.notes ? { bookingFieldsResponses: { notes: data.notes } } : {}),
      }),
      signal: AbortSignal.timeout(15_000),
    });

    if (res.ok) return json({ ok: true });

    // Só o estado vai para o log: o corpo pode ecoar dados do visitante.
    console.error(`[booking] Cal.com respondeu ${res.status}`);
    const detail = await res.text().catch(() => "");
    if (res.status === 400 || res.status === 409) {
      const taken = /available|booked|conflict|busy/i.test(detail);
      return json(
        { error: taken ? "Esse horário já não está disponível. Escolha outro." : "Não foi possível confirmar a marcação." },
        taken ? 409 : 400
      );
    }
    return json({ error: "Não foi possível confirmar a marcação. Tente o calendário completo." }, 502);
  } catch (error) {
    console.error("[booking] falha:", error instanceof Error ? error.name : "erro");
    return json({ error: "Não foi possível confirmar a marcação. Tente o calendário completo." }, 502);
  }
}
