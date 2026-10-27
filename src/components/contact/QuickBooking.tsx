"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { TimeCombobox } from "@/components/contact/TimeCombobox";
import { MonthGrid } from "@/components/contact/MonthGrid";

type Load = "loading" | "ready" | "error";

/** "2026-10-28" no fuso do visitante. */
function dayKey(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

/**
 * Marcação rápida: escolhe-se o dia, escreve-se ou escolhe-se a hora numa caixa de
 * combinação e confirma-se com nome e email. Os horários vêm do Cal.com via /api/booking/slots.
 */
export function QuickBooking({ minutes, onUseFullCalendar }: { minutes: number; onUseFullCalendar: () => void }) {
  const { isEnglish } = useLanguage();
  const locale = isEnglish ? "en-GB" : "pt-PT";
  const timeZone = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Lisbon", []);

  const [load, setLoad] = useState<Load>("loading");
  const [slots, setSlots] = useState<string[]>([]);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [gridKey, setGridKey] = useState(0);
  const [today] = useState(() => dayKey(new Date(), timeZone));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  useEffect(() => {
    // O componente é remontado (key) ao mudar a duração, por isso o estado começa limpo.
    const controller = new AbortController();
    fetch(`/api/booking/slots?minutes=${minutes}&timeZone=${encodeURIComponent(timeZone)}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("slots"))))
      .then((data: { slots: string[] }) => {
        setSlots(data.slots);
        setLoad("ready");
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setLoad("error");
      });
    return () => controller.abort();
  }, [minutes, timeZone]);

  const days = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const iso of slots) {
      const key = dayKey(new Date(iso), timeZone);
      map.set(key, [...(map.get(key) ?? []), iso]);
    }
    return Array.from(map, ([key, list]) => ({ key, slots: list }));
  }, [slots, timeZone]);

  const timeFmt = useMemo(() => new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }), [locale, timeZone]);
  const longFmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: false, timeZone }),
    [locale, timeZone]
  );

  const selectedDay = days.find((d) => d.key === day);
  const options = (selectedDay?.slots ?? []).map((iso) => ({ value: iso, label: timeFmt.format(new Date(iso)) }));
  const first = slots[0];

  function pickFirst() {
    if (!first) return;
    setDay(dayKey(new Date(first), timeZone));
    setSlot(first);
    setGridKey((k) => k + 1); // volta a abrir a grelha no mês do primeiro horário
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!slot) {
      setError(isEnglish ? "Choose a day and a time." : "Escolha o dia e a hora.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minutes,
          start: slot,
          name,
          email,
          timeZone,
          notes: notes || undefined,
          locale: isEnglish ? "en" : "pt",
          honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? (isEnglish ? "Something went wrong. Please try again." : "Algo correu mal. Tente novamente."));
        if (res.status === 409) setSlot(null);
        return;
      }
      const text = longFmt.format(new Date(slot));
      setDone(text.charAt(0).toUpperCase() + text.slice(1));
    } catch {
      setError(isEnglish ? "Something went wrong. Please try again." : "Algo correu mal. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="border border-line-strong bg-bg p-6" role="status">
        <p className="font-body text-label uppercase tracking-[0.12em] text-muted">
          {isEnglish ? "Call booked" : "Chamada marcada"}
        </p>
        <p className="mt-2 font-heading text-h3 font-semibold text-ink">{done}</p>
        <p className="mt-3 max-w-[52ch] font-body text-sm text-ink-2">
          {isEnglish
            ? `Duration: ${minutes} minutes (${timeZone}). A confirmation with the call details is on its way to your email.`
            : `Duração: ${minutes} minutos (${timeZone}). Vai receber no email a confirmação com os detalhes da chamada.`}
        </p>
      </div>
    );
  }

  if (load === "loading") {
    return (
      <p className="py-6 font-body text-sm text-muted" role="status">
        {isEnglish ? "Loading available times…" : "A carregar horários disponíveis…"}
      </p>
    );
  }

  if (load === "error" || days.length === 0) {
    return (
      <div className="border border-line bg-bg p-5" role="status">
        <p className="font-body text-sm text-ink-2">
          {load === "error"
            ? isEnglish
              ? "Could not load the times right now."
              : "Não foi possível carregar os horários agora."
            : isEnglish
              ? "There are no free times in the coming days."
              : "Não há horários livres nos próximos dias."}
        </p>
        <button
          type="button"
          onClick={onUseFullCalendar}
          className="mt-3 font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          {isEnglish ? "Open the full calendar" : "Abrir o calendário completo"} →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="space-y-5">
        <div>
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-body text-label font-medium text-ink">{isEnglish ? "1. Day" : "1. Dia"}</p>
            <button
              type="button"
              onClick={pickFirst}
              className="font-body text-micro font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              {isEnglish ? "Next available" : "Primeiro livre"} →
            </button>
          </div>
          <MonthGrid
            key={gridKey}
            available={days.map((d) => d.key)}
            value={day}
            onChange={(key) => {
              setDay(key);
              setSlot(null);
            }}
            today={today}
            locale={locale}
            label={isEnglish ? "Day" : "Dia"}
          />
        </div>

        <div className="max-w-xs">
          <TimeCombobox
            options={options}
            value={slot}
            onChange={setSlot}
            label={isEnglish ? "2. Time (type or choose)" : "2. Hora (escreva ou escolha)"}
            placeholder={day ? (isEnglish ? "e.g. 14:30" : "ex.: 14:30") : isEnglish ? "Choose a day first" : "Escolha primeiro o dia"}
            emptyText={isEnglish ? "No free time matches" : "Nenhum horário livre corresponde"}
          />
          <p className="mt-1 font-body text-micro text-muted">
            {isEnglish ? `Times in ${timeZone} · ${minutes} min` : `Horas em ${timeZone} · ${minutes} min`}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="block font-body text-label font-medium text-ink">
            {isEnglish ? "3. Name" : "3. Nome"}
          </label>
          <input
            id="booking-name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full border border-line-strong bg-bg px-4 py-3 font-body text-sm text-ink outline-none focus:border-ink"
          />
        </div>
        <div>
          <label htmlFor="booking-email" className="block font-body text-label font-medium text-ink">
            Email
          </label>
          <input
            id="booking-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border border-line-strong bg-bg px-4 py-3 font-body text-sm text-ink outline-none focus:border-ink"
          />
        </div>
      </div>

      <div>
        <label htmlFor="booking-notes" className="block font-body text-label font-medium text-ink">
          {isEnglish ? "What do you want to talk about? (optional)" : "Sobre o que quer falar? (opcional)"}
        </label>
        <textarea
          id="booking-notes"
          rows={2}
          maxLength={500}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder={isEnglish ? "Your website address or a short description" : "O endereço do seu site ou uma breve descrição"}
          className="mt-2 w-full border border-line-strong bg-bg px-4 py-3 font-body text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
        />
      </div>

      {/* Honeypot: invisível para pessoas, preenchido por bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
      />

      {error && (
        <p className="border border-destructive/30 bg-destructive/5 p-3 font-body text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="border border-ink bg-highlight px-6 py-3 font-body text-label font-semibold text-accent-ink transition-colors hover:bg-highlight-hover disabled:opacity-60"
        >
          {sending ? (isEnglish ? "Booking…" : "A marcar…") : isEnglish ? "Confirm booking" : "Confirmar marcação"}
        </button>
        <button
          type="button"
          onClick={onUseFullCalendar}
          className="font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
        >
          {isEnglish ? "Use the full calendar" : "Usar o calendário completo"}
        </button>
      </div>

      <p className="font-body text-micro leading-relaxed text-muted">
        {isEnglish
          ? "To book, your name, email and notes are sent to Cal.com, which sends you the confirmation. They are not stored on this site."
          : "Para marcar, o seu nome, email e notas são enviados ao Cal.com, que lhe envia a confirmação. Não ficam guardados neste site."}
      </p>
    </form>
  );
}
