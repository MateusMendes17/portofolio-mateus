import { CAL_EVENTS, type CalEvent } from "@/lib/constants";

/**
 * Marcação rápida via API pública do Cal.com (sem chave: os eventos são públicos).
 * Só usada no servidor — o browser fala com /api/booking, que limita pedidos e valida entradas.
 */
export const CAL_API = "https://api.cal.com/v2";
export const CAL_SLOTS_VERSION = "2024-09-04";
export const CAL_BOOKINGS_VERSION = "2024-08-13";

export interface ResolvedEvent {
  username: string;
  slug: string;
  event: CalEvent;
}

/** "https://cal.com/utilizador/15min" -> { username: "utilizador", slug: "15min" } */
export function resolveEvent(minutes: number): ResolvedEvent | null {
  const event = CAL_EVENTS.find((e) => e.minutes === minutes);
  if (!event) return null;
  try {
    const [username, slug] = new URL(event.url).pathname.split("/").filter(Boolean);
    return username && slug ? { username, slug, event } : null;
  } catch {
    return null;
  }
}

/** Aceita só fusos horários IANA reconhecidos pelo runtime (ex.: "Europe/Lisbon"). */
export function validTimeZone(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    new Intl.DateTimeFormat("en", { timeZone: value });
    return value;
  } catch {
    return null;
  }
}
