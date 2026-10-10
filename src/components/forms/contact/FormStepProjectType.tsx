"use client";

import { motion } from "framer-motion";
import { Button } from "../../ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import type { ContactFormController } from "./useContactForm";

/** Fase 1: seleção do tipo de projeto (com campo expansível "Outro"). */
export function FormStepProjectType({ form }: { form: ContactFormController }) {
  const { t } = useLanguage();
  const {
    formData,
    stepErrors,
    projectTypes,
    selectProjectType,
    handleInputChange,
    nextStep1,
  } = form;

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.25 }}
      className="anim-reveal space-y-6"
    >
      <div>
        <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
          {t.contact.form.step1.title}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-text-secondary">
          {t.contact.form.step1.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {projectTypes.map((pt) => {
          const isSelected = formData.projectType === pt.id;
          return (
            <div key={pt.id} className="flex flex-col">
              <div
                role="button"
                tabIndex={0}
                onClick={() => selectProjectType(pt.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    selectProjectType(pt.id);
                  }
                }}
                className={`group relative flex items-start gap-4 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-accent bg-accent-subtle/50 shadow-md ring-1 ring-accent"
                    : "border-border/80 bg-surface/60 hover:border-accent/40 hover:bg-surface-hover/50"
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-colors ${
                    isSelected
                      ? "bg-accent text-white border-accent"
                      : "bg-surface text-text-primary border-border group-hover:text-accent group-hover:border-accent/40"
                  }`}
                >
                  {pt.icon}
                </div>

                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-heading text-sm sm:text-base font-bold text-text-primary">
                      {pt.title}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-accent px-2 py-0.5 rounded-full bg-accent-subtle">
                      {pt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {pt.description}
                  </p>
                </div>

                <div className="shrink-0 mt-1">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                      isSelected
                        ? "bg-accent border-accent text-white"
                        : "border-border/80 bg-surface"
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Campo de texto expansível se a opção for 'Outro' */}
              {pt.id === "outro" && isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 pl-4 pr-1"
                >
                  <label htmlFor="otherProjectType" className="block text-xs font-bold text-text-primary mb-1.5">
                    {t.contact.form.step1.otherLabel}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="otherProjectType"
                    name="otherProjectType"
                    value={formData.otherProjectType || ""}
                    onChange={handleInputChange}
                    placeholder={t.contact.form.step1.otherPlaceholder}
                    className={`w-full rounded-xl border bg-surface px-4 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                      stepErrors.otherProjectType ? "border-destructive ring-1 ring-destructive" : "border-border"
                    }`}
                  />
                  {stepErrors.otherProjectType && (
                    <p className="mt-1 text-xs text-destructive">{stepErrors.otherProjectType}</p>
                  )}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {stepErrors.projectType && (
        <p className="text-xs font-semibold text-destructive">{stepErrors.projectType}</p>
      )}

      <div className="pt-4 flex justify-end">
        <Button
          type="button"
          variant="primary"
          size="md"
          withArrow
          onClick={nextStep1}
        >
          {t.contact.form.step1.next}
        </Button>
      </div>
    </motion.div>
  );
}
