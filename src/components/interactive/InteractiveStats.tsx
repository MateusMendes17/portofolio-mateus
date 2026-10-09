"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export function InteractiveStats() {
  const { t } = useLanguage();
  const [activeStat, setActiveStat] = useState<string | null>(null);

  const stats = t.stats.items;

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
                {isActive ? t.stats.clickToClose : t.stats.clickToLearnMore}
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
