"use client";

import { useMemo, useState } from "react";

/** "AAAA-MM-DD" -> { y, m (0-11), d } */
function parseKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return { y, m: m - 1, d };
}

const pad = (n: number) => String(n).padStart(2, "0");
const keyOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

/**
 * Grelha mensal de largura total, com células visíveis e altura reduzida: só os dias com horários livres (`available`) são selecionáveis.
 * Semana a começar à segunda-feira. As datas são "AAAA-MM-DD" no fuso do visitante.
 */
export function MonthGrid({
  available,
  value,
  onChange,
  today,
  locale,
  label,
}: {
  available: string[];
  value: string | null;
  onChange: (key: string) => void;
  /** Dia de hoje ("AAAA-MM-DD") no fuso do visitante. */
  today: string;
  locale: string;
  label: string;
}) {
  const availableSet = useMemo(() => new Set(available), [available]);
  const first = available[0] ? parseKey(available[0]) : parseKey(today);
  const last = available[available.length - 1] ? parseKey(available[available.length - 1]) : first;

  const [view, setView] = useState({ y: first.y, m: first.m });

  const minIndex = first.y * 12 + first.m;
  const maxIndex = last.y * 12 + last.m;
  const viewIndex = view.y * 12 + view.m;

  const go = (delta: number) => {
    const next = viewIndex + delta;
    if (next < minIndex || next > maxIndex) return;
    setView({ y: Math.floor(next / 12), m: next % 12 });
  };

  const monthLabel = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(view.y, view.m, 1))
  );

  // 2024-01-01 foi uma segunda-feira: serve de base para os nomes dos dias da semana.
  const weekdays = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" });
    const long = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" });
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(Date.UTC(2024, 0, 1 + i));
      return { short: fmt.format(date), long: long.format(date) };
    });
  }, [locale]);

  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate();
  const offset = (new Date(Date.UTC(view.y, view.m, 1)).getUTCDay() + 6) % 7; // segunda = 0
  const cells: Array<number | null> = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const navButton =
    "flex h-7 w-7 items-center justify-center border border-line-strong text-ink transition-colors hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className="w-full" role="group" aria-label={label}>
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => go(-1)} disabled={viewIndex <= minIndex} aria-label="‹" className={navButton}>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <p className="font-body text-sm font-semibold capitalize text-ink" aria-live="polite">
          {monthLabel}
        </p>
        <button type="button" onClick={() => go(1)} disabled={viewIndex >= maxIndex} aria-label="›" className={navButton}>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center">
        {weekdays.map((w) => (
          <span key={w.long} title={w.long} className="py-1 font-body text-micro uppercase tracking-wide text-muted">
            {w.short}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px border border-line bg-line">
        {cells.map((day, i) => {
          if (day === null) return <span key={`vazio-${i}`} className="h-10 bg-bg sm:h-11" aria-hidden="true" />;
          const key = keyOf(view.y, view.m, day);
          const enabled = availableSet.has(key);
          const selected = key === value;
          const isToday = key === today;
          return (
            <button
              key={key}
              type="button"
              disabled={!enabled}
              aria-pressed={selected}
              aria-current={isToday ? "date" : undefined}
              onClick={() => onChange(key)}
              className={`relative h-10 font-body text-sm tabular-nums transition-colors sm:h-11 ${
                selected
                  ? "bg-highlight font-semibold text-accent-ink ring-2 ring-inset ring-ink"
                  : enabled
                    ? "bg-surface font-medium text-ink hover:bg-surface-2"
                    : "cursor-not-allowed bg-bg text-muted/40"
              }`}
            >
              {day}
              {isToday && (
                <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-ink" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
