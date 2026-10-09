"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function InteractiveStats() {
  const { isEnglish } = useLanguage();
  const [activeStat, setActiveStat] = useState<string | null>(null);

  const stats = isEnglish
    ? [
        {
          id: "speed",
          metric: "< 0.8s",
          label: "Lightning-Fast Loading",
          badge: "Performance",
          details: "Top scores on Google PageSpeed ensuring no visitor bounces due to slow loading times.",
        },
        {
          id: "custom",
          metric: "100%",
          label: "Tailor-Made Code",
          badge: "Quality",
          details: "No bloated templates or vulnerable plugins. Every line is hand-crafted for your business goals.",
        },
        {
          id: "response",
          metric: "< 24h",
          label: "Response Time",
          badge: "Communication",
          details: "Dedicated direct contact via WhatsApp, email, or scheduled call throughout the entire cycle.",
        },
        {
          id: "roi",
          metric: "100%",
          label: "Conversion Focus",
          badge: "Results",
          details: "Interfaces structured to turn passive visitors into engaged leads and loyal paying clients.",
        },
      ]
    : [
        {
          id: "speed",
          metric: "< 0.8s",
          label: "Carregamento Relâmpago",
          badge: "Performance",
          details: "Pontuações máximas no Google PageSpeed para que nenhum visitante desista por lentidão.",
        },
        {
          id: "custom",
          metric: "100%",
          label: "Código Sob Medida",
          badge: "Qualidade",
          details: "Sem templates reciclados ou plugins vulneráveis. Cada linha é pensada para as suas necessidades.",
        },
        {
          id: "response",
          metric: "< 24h",
          label: "Tempo de Resposta",
          badge: "Comunicação",
          details: "Acompanhamento próximo por WhatsApp, email ou chamada direta durante todo o processo.",
        },
        {
          id: "roi",
          metric: "100%",
          label: "Foco em Conversão",
          badge: "Resultados",
          details: "Estrutura desenhada para transformar utilizadores casuais em contactos e clientes pagantes.",
        },
      ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat) => {
        const isActive = activeStat === stat.id;
        return (
          <motion.div
            key={stat.id}
            whileHover={{ y: -4 }}
            onClick={() => setActiveStat(isActive ? null : stat.id)}
            className={`rounded-2xl border p-6 transition-all duration-300 cursor-pointer backdrop-blur-xl relative overflow-hidden ${
              isActive
                ? "border-accent bg-accent-subtle/50 shadow-md ring-1 ring-accent"
                : "border-border/80 bg-surface/80 hover:border-accent/40 hover:bg-surface"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-2 py-0.5 rounded-full bg-accent-subtle">
                {stat.badge}
              </span>
              <span className="text-[10px] text-text-muted">
                {isActive
                  ? (isEnglish ? "Click to close" : "Clique para fechar")
                  : (isEnglish ? "Click to learn more" : "Clique para saber mais")}
              </span>
            </div>

            <div className="font-heading text-3xl sm:text-4xl font-extrabold text-text-primary mb-1">
              {stat.metric}
            </div>

            <h4 className="font-heading text-sm font-bold text-text-primary mb-2">
              {stat.label}
            </h4>

            <p className="text-xs text-text-secondary leading-relaxed">
              {stat.details}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
