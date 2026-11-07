"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TechItem {
  id: string;
  name: string;
  category: "frontend" | "animation" | "backend" | "seo";
  categoryLabel: string;
  tagline: string;
  businessBenefit: string;
  metric: string;
  metricLabel: string;
  usedFor: string;
}

/** Categorias disponíveis no filtro (inclui "all", que não é categoria de TechItem). */
type FilterTab = "all" | TechItem["category"];

export function TechStackExplorer() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  // `category` chega como string genérica dos strings — restringe-se ao union
  // do TechItem (os ids/categorias são estáticos em pt.ts/en.ts).
  const techItems: TechItem[] = t.stackExplorer.items.map((item) => ({
    ...item,
    category: item.category as TechItem["category"],
  }));

  const [selectedTech, setSelectedTech] = useState<TechItem>(techItems[0]);

  // Keep selected tech synced when language switches
  const currentSelected = techItems.find((item) => item.id === selectedTech.id) || techItems[0];

  const filteredItems =
    activeTab === "all"
      ? techItems
      : techItems.filter((item) => item.category === activeTab);

  return (
    <div className="rounded-[28px] border-[1.5px] border-ink bg-surface p-6 sm:p-10">
      {/* Cabeçalho */}
      <div className="space-y-4 mb-8">
        <div>
          <span className="font-mono text-sm text-muted">
            {t.stackExplorer.badge}
          </span>
          <h2 className="mt-3 font-heading text-[clamp(2.25rem,4.5vw,4rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
            {t.stackExplorer.title}
          </h2>
          <p className="mt-4 text-base text-muted max-w-2xl leading-relaxed">
            {t.stackExplorer.description}
          </p>
        </div>

        {/* Filtros de Categoria Alinhados em Linha Única */}
        <div className="pt-1">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-[20px] bg-surface-hover/70 border border-border/60 max-w-full overflow-x-auto scrollbar-none">
            {([
              { id: "all", label: t.stackExplorer.filters.all },
              { id: "frontend", label: "Frontend" },
              { id: "animation", label: "3D & Motion" },
              { id: "backend", label: t.stackExplorer.filters.backend },
              { id: "seo", label: "Google SEO" },
            ] satisfies { id: FilterTab; label: string }[]).map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? "bg-highlight text-accent-ink shadow-sm"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grelha: Seleção de Tecnologias à Esquerda + Inspetor Detalhado à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Lista de Tecnologias Clicáveis */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredItems.map((tech) => {
            const isSelected = currentSelected.id === tech.id;
            return (
              <button
                key={tech.id}
                type="button"
                onClick={() => setSelectedTech(tech)}
                className={`flex flex-col text-left p-4 rounded-[20px] border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-accent bg-accent-subtle/50 shadow-md ring-1 ring-accent"
                    : "border-border/70 bg-surface/70 hover:border-accent/40 hover:bg-surface-hover"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-heading text-base font-semibold text-ink">
                    {tech.name}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isSelected ? "bg-accent animate-ping" : "bg-border"
                    }`}
                  />
                </div>
                <span className="text-xs text-text-muted">{tech.categoryLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Inspetor Detalhado com Animação */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSelected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="rounded-[20px] border border-accent/30 bg-surface p-6 sm:p-7 shadow-lg relative overflow-hidden"
            >
              {/* Badge de Categoria */}
              <div className="flex items-center justify-between mb-4">
                <span className="rounded-full bg-highlight px-3 py-1 font-mono text-xs text-accent-ink">
                  {currentSelected.categoryLabel}
                </span>
                <span className="text-xs text-text-muted font-mono">
                  stack://{currentSelected.id}
                </span>
              </div>

              <h3 className="font-heading text-[clamp(1.75rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
                {currentSelected.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm font-medium text-accent">
                {currentSelected.tagline}
              </p>

              <div className="mt-5 space-y-4 text-xs sm:text-sm">
                <div className="p-3.5 rounded-[14px] bg-surface-hover/60 border border-border/60">
                  <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">
                    {t.stackExplorer.labels.businessBenefit}
                  </span>
                  <p className="text-text-secondary leading-relaxed">
                    {currentSelected.businessBenefit}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-[14px] bg-surface-hover/60 border border-border/60">
                    <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">
                      {currentSelected.metricLabel}
                    </span>
                    <span className="font-heading text-xl font-bold text-accent">
                      {currentSelected.metric}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[14px] bg-surface-hover/60 border border-border/60">
                    <span className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1">
                      {t.stackExplorer.labels.appliedIn}
                    </span>
                    <span className="text-xs text-text-secondary font-medium block leading-tight">
                      {currentSelected.usedFor}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
