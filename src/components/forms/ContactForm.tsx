"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { Button } from "../ui/Button";
import { WhatsAppIcon } from "../ui/Icons";
import { SOCIAL_LINKS } from "@/lib/constants";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectOption {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
}

/* Ícones por id — os textos vivem em t.contact.form.* */
const PROJECT_TYPE_ICONS: Record<string, React.ReactNode> = {
  "site-institucional": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1" />
    </svg>
  ),
  "landing-page": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  "loja-online": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  "web-app": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18M3 9h18" />
    </svg>
  ),
  "manutencao-redesign": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  ),
  outro: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  ),
};

const PREFERENCE_ICONS: Record<string, React.ReactNode> = {
  chamada: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  whatsapp: <WhatsAppIcon className="w-5 h-5" />,
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  outro: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  ),
};

export function ContactForm() {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    otherProjectType: "",
    contactPreference: "",
    otherContactPreference: "",
    features: [],
    message: "",
    consent: false,
    honeypot: "",
  });

  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const projectTypes: ProjectOption[] = t.contact.form.projectTypes.map((item) => ({
    ...item,
    icon: PROJECT_TYPE_ICONS[item.id],
  }));

  const contactPreferences = t.contact.form.contactPreferences.map((item) => ({
    ...item,
    icon: PREFERENCE_ICONS[item.id],
  }));

  const featureTags = t.contact.form.featureTags;
  const toggleFeature = (tag: string) => {
    setFormData((prev) => {
      const current = prev.features || [];
      const updated = current.includes(tag)
        ? current.filter((f) => f !== tag)
        : [...current, tag];
      return { ...prev, features: updated };
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (stepErrors[name]) {
      setStepErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Validação do Passo 1
  const handleNextStep1 = () => {
    if (!formData.projectType) {
      setStepErrors({
        projectType: t.contact.form.errors.selectProjectType,
      });
      return;
    }
    if (formData.projectType === "outro" && (!formData.otherProjectType || formData.otherProjectType.trim().length < 3)) {
      setStepErrors({
        otherProjectType: t.contact.form.errors.describeProjectType,
      });
      return;
    }
    setStepErrors({});
    setCurrentStep(2);
  };

  // Validação do Passo 2
  const handleNextStep2 = () => {
    if (!formData.contactPreference) {
      setStepErrors({
        contactPreference: t.contact.form.errors.selectContactPreference,
      });
      return;
    }
    if (formData.contactPreference === "outro" && (!formData.otherContactPreference || formData.otherContactPreference.trim().length < 3)) {
      setStepErrors({
        otherContactPreference: t.contact.form.errors.specifyContactPreference,
      });
      return;
    }
    setStepErrors({});
    setCurrentStep(3);
  };

  // Submissão final no Passo 3
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setServerMessage("");

    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      // Mapeia TODOS os erros do schema para a UI (nome, email, telefone,
      // mensagem, consentimento, tipo de projeto, preferência de contacto...).
      const { fieldErrors } = z.flattenError(validation.error);
      const nextErrors: Record<string, string> = {};

      for (const [field, messages] of Object.entries(fieldErrors)) {
        const first = Array.isArray(messages) ? messages[0] : undefined;
        if (first) nextErrors[field] = first;
      }

      setStepErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
        setServerMessage(result.message || t.contact.form.errors.submitSuccessFallback);
      } else {
        setSubmitStatus("error");
        setServerMessage(result.message || t.contact.form.errors.submitErrorFallback);
      }
    } catch {
      setSubmitStatus("error");
      setServerMessage(t.contact.form.errors.networkError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProjectTypeTitle =
    formData.projectType === "outro" && formData.otherProjectType
      ? t.contact.form.otherPrefix + formData.otherProjectType
      : projectTypes.find((p) => p.id === formData.projectType)?.title || formData.projectType;

  const selectedContactPreferenceTitle =
    formData.contactPreference === "outro" && formData.otherContactPreference
      ? t.contact.form.otherPrefix + formData.otherContactPreference
      : contactPreferences.find((c) => c.id === formData.contactPreference)?.title || formData.contactPreference;

  return (
    <div className="rounded-3xl border border-border/80 bg-surface/90 backdrop-blur-xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
      {/* Barra de Progresso por Fases */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-text-secondary mb-3">
          <span className="uppercase tracking-wider text-[11px] font-bold text-accent">
            {t.contact.form.steps.phase.replace("{current}", String(currentStep))}
          </span>
          <span className="text-text-muted">
            {currentStep === 1 && t.contact.form.steps.titles[0]}
            {currentStep === 2 && t.contact.form.steps.titles[1]}
            {currentStep === 3 && t.contact.form.steps.titles[2]}
          </span>
        </div>

        {/* Stepper visual */}
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((step) => {
            const isCompleted = currentStep > step;
            const isCurrent = currentStep === step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => {
                  if (step < currentStep) setCurrentStep(step as 1 | 2 | 3);
                }}
                disabled={step > currentStep}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-accent cursor-pointer hover:opacity-80"
                    : isCurrent
                    ? "bg-accent shadow-sm"
                    : "bg-surface-hover cursor-not-allowed"
                }`}
                title={t.contact.form.steps.goToPhase.replace("{step}", String(step))}
              />
            );
          })}
        </div>
      </div>

      {/* SUCESSO: Ecrã de Confirmação */}
      {submitStatus === "success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 space-y-6"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary">
              {t.contact.form.success.title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t.contact.form.success.thanksBefore}
              <strong className="text-text-primary">{formData.name}</strong>
              {t.contact.form.success.thanksAfter}
              <strong className="text-accent">{selectedProjectTypeTitle}</strong>.
            </p>
            <p className="text-xs text-text-muted mt-2">
              {t.contact.form.success.contactBefore}
              <strong className="text-text-primary">{selectedContactPreferenceTitle}</strong>
              {t.contact.form.success.contactAfter}
            </p>
          </div>

          {/* Atalho WhatsApp */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(
                t.contact.form.success.whatsappMessage.replace("{project}", selectedProjectTypeTitle)
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 text-xs font-bold transition-all shadow-md hover:shadow-lg"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{t.contact.form.success.whatsappCta}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setSubmitStatus("idle");
                setCurrentStep(1);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  projectType: "",
                  otherProjectType: "",
                  contactPreference: "",
                  otherContactPreference: "",
                  features: [],
                  message: "",
                  consent: false,
                  honeypot: "",
                });
              }}
              className="px-5 py-3 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              {t.contact.form.success.sendAnother}
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Campo oculto anti-spam */}
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Mensagem de Erro de Servidor */}
          {submitStatus === "error" && (
            <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-destructive text-xs flex items-center gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-destructive text-white font-bold text-xs">
                !
              </span>
              <span>{serverMessage}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ==============================================================
                FASE 1: TIPO DE PROJETO
                ============================================================== */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
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
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, projectType: pt.id }));
                            if (stepErrors.projectType) {
                              setStepErrors((prev) => {
                                const next = { ...prev };
                                delete next.projectType;
                                return next;
                              });
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              setFormData((prev) => ({ ...prev, projectType: pt.id }));
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
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-accent px-2 py-0.5 rounded-full bg-accent-subtle">
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
                    onClick={handleNextStep1}
                  >
                    {t.contact.form.step1.next}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ==============================================================
                FASE 2: PREFERÊNCIA DE CONTACTO & FUNCIONALIDADES
                ============================================================== */}
            {currentStep === 2 && (
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
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, contactPreference: cp.id }));
                              if (stepErrors.contactPreference) {
                                setStepErrors((prev) => {
                                  const next = { ...prev };
                                  delete next.contactPreference;
                                  return next;
                                });
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                setFormData((prev) => ({ ...prev, contactPreference: cp.id }));
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
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {t.contact.form.step2.back}
                  </button>

                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    withArrow
                    onClick={handleNextStep2}
                  >
                    {t.contact.form.step2.next}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ==============================================================
                FASE 3: DADOS DE CONTACTO & MENSAGEM FINAL
                ============================================================== */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-text-primary">
                    {t.contact.form.step3.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                    {t.contact.form.step3.description}
                  </p>
                </div>

                {/* Resumo Dinâmico das Fases Anteriores */}
                <div className="rounded-2xl border border-accent/20 bg-accent-subtle/30 p-4 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-text-primary uppercase tracking-wider text-[10px]">
                      {t.contact.form.step3.summaryTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-accent hover:underline font-semibold text-[11px] cursor-pointer"
                    >
                      {t.contact.form.step3.summaryEdit}
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-text-secondary">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-text-primary">
                      <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                      </svg>
                      {selectedProjectTypeTitle}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-text-primary">
                      <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      {t.contact.form.step3.summaryPreference} {selectedContactPreferenceTitle}
                    </span>
                    {formData.features && formData.features.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1.5">
                          <svg className="w-3.5 h-3.5 text-accent shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {formData.features.length} {t.contact.form.step3.summaryFeatures}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Nome & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      {t.contact.form.step3.nameLabel} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.contact.form.step3.namePlaceholder}
                      disabled={isSubmitting}
                      className={`w-full rounded-2xl border bg-surface/70 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                        stepErrors.name ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
                      }`}
                    />
                    {stepErrors.name && <p className="mt-1.5 text-xs text-destructive">{stepErrors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                      {t.contact.form.step3.emailLabel} <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.contact.form.step3.emailPlaceholder}
                      disabled={isSubmitting}
                      className={`w-full rounded-2xl border bg-surface/70 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                        stepErrors.email ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
                      }`}
                    />
                    {stepErrors.email && <p className="mt-1.5 text-xs text-destructive">{stepErrors.email}</p>}
                  </div>
                </div>

                {/* Telefone / WhatsApp */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                    {t.contact.form.step3.phoneLabel}{" "}
                    {formData.contactPreference === "chamada" || formData.contactPreference === "whatsapp" ? (
                      <span className="text-accent">
                        {t.contact.form.step3.phoneRequired}
                      </span>
                    ) : (
                      <span className="text-text-muted font-normal">
                        {t.contact.form.step3.phoneOptional}
                      </span>
                    )}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t.contact.form.step3.phonePlaceholder}
                    disabled={isSubmitting}
                    className={`w-full rounded-2xl border bg-surface/70 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent ${
                      stepErrors.phone ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
                    }`}
                  />
                  {stepErrors.phone && <p className="mt-1.5 text-xs text-destructive">{stepErrors.phone}</p>}
                </div>

                {/* Mensagem / Detalhes */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-2">
                    {t.contact.form.step3.messageLabel}{" "}
                    <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t.contact.form.step3.messagePlaceholder}
                    disabled={isSubmitting}
                    className={`w-full rounded-2xl border bg-surface/70 p-4 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent resize-y ${
                      stepErrors.message ? "border-destructive ring-1 ring-destructive" : "border-border/80 hover:border-accent/40"
                    }`}
                  />
                  <div className="flex justify-between items-center mt-1">
                    {stepErrors.message ? (
                      <p className="text-xs text-destructive">{stepErrors.message}</p>
                    ) : <span />}
                    <span className="text-[11px] text-text-muted">{formData.message.length}/2000</span>
                  </div>
                </div>

                {/* Checkbox de RGPD */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="mt-0.5 h-4 w-4 rounded-md border-border text-accent focus:ring-accent cursor-pointer accent-accent"
                    />
                    <span className="text-xs text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors">
                      {t.contact.form.step3.consentBefore}
                      <Link href="/privacidade" className="text-accent underline underline-offset-2 hover:opacity-80">
                        {t.contact.form.step3.consentLink}
                      </Link>
                      .
                    </span>
                  </label>
                  {stepErrors.consent && <p className="mt-1.5 text-xs text-destructive">{stepErrors.consent}</p>}
                </div>

                {/* Botões Finais de Submissão */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-bold text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 order-2 sm:order-1 cursor-pointer"
                  >
                    {t.contact.form.step3.back}
                  </button>

                  <Button
                    type="submit"
                    variant="contact"
                    size="lg"
                    withArrow
                    disabled={isSubmitting}
                    className="w-full sm:w-auto order-1 sm:order-2"
                  >
                    {isSubmitting
                      ? t.contact.form.step3.submitting
                      : t.contact.form.step3.submit}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      )}
    </div>
  );
}
