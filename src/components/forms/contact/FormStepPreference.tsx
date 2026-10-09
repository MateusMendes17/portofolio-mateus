"use client";

import { motion } from "framer-motion";
import { Button } from "../../ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import type { ContactFormController } from "./useContactForm";

/** Fase 2: preferência de contacto + funcionalidades pretendidas (multi-select). */
export function FormStepPreference({ form }: { form: ContactFormController }) {
  const { t } = useLanguage();
  const {
    formData,
    stepErrors,
    contactPreferences,
    featureTags,
    selectContactPreference,
    toggleFeature,
    handleInputChange,
    nextStep2,
    goToStep,
  } = form;

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      <div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
          {t.contact.form.step2.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          {t.contact.form.step2.description}
        </p>
      </div>

      {/* Secção A: Preferência de Contacto */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
          {t.contact.form.step2.preferenceLabel}{" "}
          <span className="text-accent">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contactPreferences.map((cp) => {
            const isSelected = formData.contactPreference === cp.id;
            return (
              <div key={cp.id} className="flex flex-col">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => selectContactPreference(cp.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      selectContactPreference(cp.id);
                    }
                  }}
                  className={`rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer h-full flex flex-col justify-between ${
                    isSelected
                      ? "border-accent bg-accent-subtle/50 shadow-sm ring-1 ring-accent"
                      : "border-border/80 bg-surface/60 hover:border-accent/40 hover:bg-surface-hover/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="text-text-primary group-hover:text-accent">
                          {cp.icon}
                        </div>
                        <span className="font-heading text-sm font-bold text-text-primary">
                          {cp.title}
                        </span>
                      </div>
                      <div
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "bg-accent border-accent text-white" : "border-border"
                        }`}
                      >
                        {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-text-secondary leading-relaxed">{cp.desc}</p>
                  </div>
                </div>

                {/* Se for Outro meio */}
                {cp.id === "outro" && isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2.5"
                  >
                    <label htmlFor="otherContactPreference" className="block text-xs font-bold text-text-primary mb-1">
                      {t.contact.form.step2.otherLabel}{" "}
                      <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="otherContactPreference"
                      name="otherContactPreference"
                      value={formData.otherContactPreference || ""}
                      onChange={handleInputChange}
                      placeholder={t.contact.form.step2.otherPlaceholder}
                      className={`w-full rounded-xl border bg-surface px-4 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                        stepErrors.otherContactPreference ? "border-destructive ring-1 ring-destructive" : "border-border"
                      }`}
                    />
                    {stepErrors.otherContactPreference && (
                      <p className="mt-1 text-xs text-destructive">{stepErrors.otherContactPreference}</p>
                    )}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
        {stepErrors.contactPreference && (
          <p className="text-xs font-semibold text-destructive">{stepErrors.contactPreference}</p>
        )}
      </div>

      {/* Secção B: Funcionalidades Pretendidas (Multi-select) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
            {t.contact.form.step2.featuresLabel}
          </label>
          <span className="text-[11px] text-text-muted">
            {t.contact.form.step2.featuresHint}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {featureTags.map((tag) => {
            const isSelected = formData.features?.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleFeature(tag)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-accent bg-accent text-white shadow-sm"
                    : "border-border/80 bg-surface/70 text-text-primary hover:border-accent/50 hover:bg-surface-hover"
                }`}
              >
                <span>{isSelected ? "✓" : "+"}</span>
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Botões de Navegação */}
      <div className="pt-4 flex items-center justify-between border-t border-border/60">
        <button
          type="button"
          onClick={() => goToStep(1)}
          className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          {t.contact.form.step2.back}
        </button>

        <Button
          type="button"
          variant="primary"
          size="md"
          withArrow
          onClick={nextStep2}
        >
          {t.contact.form.step2.next}
        </Button>
      </div>
    </motion.div>
  );
}
