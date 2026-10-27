"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { CalEvent } from "@/lib/constants";
import { CallScheduler } from "@/components/contact/CallScheduler";
import { QuickBooking } from "@/components/contact/QuickBooking";

type Mode = "rapida" | "completa";

/**
 * Separador "Marcar chamada": duração (15/30 min) e dois modos.
 * - Rápida (por omissão): dia + hora numa caixa de combinação + nome e email.
 * - Completa: o calendário do Cal.com embebido (carrega só quando é pedido).
 */
export function CallBooking({ events }: { events: CalEvent[] }) {
  const { isEnglish } = useLanguage();
  const [minutes, setMinutes] = useState(events[0]?.minutes ?? 15);
  const [mode, setMode] = useState<Mode>("rapida");
  const current = events.find((e) => e.minutes === minutes) ?? events[0];
  if (!current) return null;

  return (
    <div>
      {events.length > 1 && (
        <div
          role="radiogroup"
          aria-label={isEnglish ? "Call length" : "Duração da chamada"}
          className="mb-6 inline-flex border border-line-strong"
        >
          {events.map((event) => {
            const active = event.minutes === current.minutes;
            return (
              <button
                key={event.minutes}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setMinutes(event.minutes)}
                className={`px-4 py-2 font-body text-label font-semibold transition-colors ${
                  active ? "bg-ink text-bg" : "text-ink-2 hover:bg-surface-2"
                }`}
              >
                {event.minutes} min
              </button>
            );
          })}
        </div>
      )}

      {mode === "rapida" ? (
        <QuickBooking key={current.minutes} minutes={current.minutes} onUseFullCalendar={() => setMode("completa")} />
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setMode("rapida")}
            className="mb-4 font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
          >
            ← {isEnglish ? "Back to quick booking" : "Voltar à marcação rápida"}
          </button>
          <CallScheduler event={current} />
        </div>
      )}
    </div>
  );
}
