"use client";

import { useId, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function toNumber(value: string): number {
  const n = Number(value.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

/**
 * Simulação simples: quanto vale melhorar a conversão do site.
 * Os três valores são do próprio visitante; a conta é só visitas × taxa × valor.
 * Não usa estatísticas externas nem promete resultados.
 */
export function LossCalculator() {
  const { isEnglish } = useLanguage();
  const id = useId();
  const [visits, setVisits] = useState("1000");
  const [current, setCurrent] = useState("1");
  const [target, setTarget] = useState("2");
  const [value, setValue] = useState("150");

  const v = toNumber(visits);
  const cur = Math.min(toNumber(current), 100);
  const tar = Math.min(toNumber(target), 100);
  const val = toNumber(value);

  const clientsNow = (v * cur) / 100;
  const clientsAfter = (v * tar) / 100;
  const extraClients = Math.max(0, clientsAfter - clientsNow);
  const extraMonth = extraClients * val;

  const fmtEur = (n: number) =>
    new Intl.NumberFormat(isEnglish ? "en-GB" : "pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
  const fmtNum = (n: number) =>
    new Intl.NumberFormat(isEnglish ? "en-GB" : "pt-PT", { maximumFractionDigits: 1 }).format(n);

  const field = (key: string, label: string, hint: string, val: string, set: (v: string) => void, suffix?: string) => (
    <div>
      <label htmlFor={`${id}-${key}`} className="block font-body text-label font-medium text-ink">
        {label}
      </label>
      <div className="mt-2 flex border border-line bg-bg focus-within:border-ink">
        <input
          id={`${id}-${key}`}
          inputMode="decimal"
          value={val}
          onChange={(e) => set(e.target.value)}
          className="min-w-0 flex-1 bg-transparent px-4 py-2.5 font-body text-sm tabular-nums text-ink outline-none"
        />
        {suffix && <span className="flex items-center px-3 font-body text-sm text-muted">{suffix}</span>}
      </div>
      <p className="mt-1 font-body text-micro text-muted">{hint}</p>
    </div>
  );

  return (
    <div className="border border-line bg-surface p-6 sm:p-8">
      <span className="font-body text-label uppercase tracking-[0.14em] text-muted">
        {isEnglish ? "Simulator" : "Simulador"}
      </span>
      <h2 className="mt-2 font-heading text-h3 font-semibold text-ink">
        {isEnglish ? "What is a better-converting website worth to you?" : "Quanto vale ao seu negócio um site que converte melhor?"}
      </h2>
      <p className="mt-2 max-w-[60ch] font-body text-sm text-ink-2">
        {isEnglish
          ? "Fill in your own numbers. The maths is only visitors × conversion rate × value per client."
          : "Preencha com os seus números. A conta é só visitas × taxa de conversão × valor por cliente."}
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {field("v", isEnglish ? "Visits per month" : "Visitas por mês", isEnglish ? "From Google Analytics or similar" : "Do Google Analytics ou semelhante", visits, setVisits)}
        {field("c", isEnglish ? "Current conversion" : "Conversão atual", isEnglish ? "Visitors who contact/buy" : "Visitantes que contactam/compram", current, setCurrent, "%")}
        {field("t", isEnglish ? "Conversion you aim for" : "Conversão pretendida", isEnglish ? "Your own goal" : "Um objetivo seu", target, setTarget, "%")}
        {field("e", isEnglish ? "Value per client" : "Valor por cliente", isEnglish ? "Average revenue" : "Receita média", value, setValue, "€")}
      </div>

      <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-3" role="status" aria-live="polite">
        <div className="bg-bg p-4">
          <p className="font-heading text-2xl font-semibold tabular-nums text-ink">{fmtNum(clientsNow)}</p>
          <p className="mt-1 font-body text-micro text-muted">{isEnglish ? "clients per month now" : "clientes por mês atualmente"}</p>
        </div>
        <div className="bg-bg p-4">
          <p className="font-heading text-2xl font-semibold tabular-nums text-ink">+{fmtNum(extraClients)}</p>
          <p className="mt-1 font-body text-micro text-muted">{isEnglish ? "extra clients per month at your goal" : "clientes extra por mês no seu objetivo"}</p>
        </div>
        <div className="bg-bg p-4">
          <p className="font-heading text-2xl font-semibold tabular-nums text-ink">{fmtEur(extraMonth)}</p>
          <p className="mt-1 font-body text-micro text-muted">
            {isEnglish ? `per month (${fmtEur(extraMonth * 12)} per year)` : `por mês (${fmtEur(extraMonth * 12)} por ano)`}
          </p>
        </div>
      </div>

      <p className="mt-3 font-body text-micro leading-relaxed text-muted">
        {isEnglish
          ? "A simulation, not a promise: the result depends on your business, traffic and offer."
          : "É uma simulação, não uma promessa: o resultado depende do seu negócio, tráfego e oferta."}
      </p>
    </div>
  );
}
