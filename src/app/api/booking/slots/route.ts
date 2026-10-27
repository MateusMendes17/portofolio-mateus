import { NextRequest } from "next/server";
import { CAL_API, CAL_SLOTS_VERSION, resolveEvent, validTimeZone } from "@/lib/cal-booking";

export const runtime = "nodejs";

const DAYS_AHEAD = 21;

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

/**
 * GET /api/booking/slots?minutes=15&timeZone=Europe/Lisbon
 * Devolve os horários livres dos próximos dias como instantes ISO (UTC).
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const resolved = resolveEvent(Number(params.get("minutes")));
  if (!resolved) return json({ error: "Duração inválida." }, 400);
  const timeZone = validTimeZone(params.get("timeZone")) ?? "Europe/Lisbon";

  const start = new Date();
  const end = new Date(start.getTime() + DAYS_AHEAD * 24 * 60 * 60 * 1000);
  const query = new URLSearchParams({
    username: resolved.username,
    eventTypeSlug: resolved.slug,
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
    timeZone,
  });

  try {
    const res = await fetch(`${CAL_API}/slots?${query}`, {
      headers: { "cal-api-version": CAL_SLOTS_VERSION },
      signal: AbortSignal.timeout(10_000),
      next: { revalidate: 30 },
    });
    if (!res.ok) {
      console.error(`[booking] slots: Cal.com respondeu ${res.status}`);
      return json({ error: "Não foi possível obter os horários." }, 502);
    }
    const body = (await res.json()) as { data?: Record<string, Array<{ start?: string }>> };
    const now = Date.now();
    const slots = Object.values(body.data ?? {})
      .flat()
      .map((s) => s.start)
      .filter((s): s is string => typeof s === "string" && new Date(s).getTime() > now)
      .sort();

    return json({ slots }, 200, { "Cache-Control": "public, max-age=30" });
  } catch (error) {
    console.error("[booking] slots: falha", error instanceof Error ? error.name : "erro");
    return json({ error: "Não foi possível obter os horários." }, 502);
  }
}
