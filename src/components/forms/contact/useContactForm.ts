"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { type ContactFormData } from "@/lib/validations";
import { PROJECT_TYPE_ICONS, PREFERENCE_ICONS, type ProjectOption, type PreferenceOption } from "./icons";

// O módulo de validação importa `zod`, que é pesado (~45 kB gzip). Carregá-lo
// de forma assíncrona (dynamic import) na submissão mantém o bundle inicial da
// página mais leve, o que melhora o LCP. Só o tipo `ContactFormData` é
// importado estaticamente (o TypeScript remove-o em tempo de compilação).
async function loadValidation() {
  return import("@/lib/validations");
}

export type FormStep = 1 | 2 | 3;

export type SubmitStatus = "idle" | "success" | "error";

const EMPTY_FORM: ContactFormData = {
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
};

/**
 * Controlador do formulário de contacto em 3 fases.
 * Concentra estado, validação por fase e submissão — a UI fica nas
 * componentes FormStep* / FormSuccess, todas consumidoras deste tipo.
 */
export function useContactForm() {
  const { t } = useLanguage();

  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const projectTypes: ProjectOption[] = t.contact.form.projectTypes.map((item) => ({
    ...item,
    icon: PROJECT_TYPE_ICONS[item.id],
  }));

  const contactPreferences: PreferenceOption[] = t.contact.form.contactPreferences.map((item) => ({
    ...item,
    icon: PREFERENCE_ICONS[item.id],
  }));

  const featureTags = t.contact.form.featureTags;

  const goToStep = (step: FormStep) => setCurrentStep(step);

  const clearError = (field: string) => {
    setStepErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const selectProjectType = (id: string) => {
    setFormData((prev) => ({ ...prev, projectType: id }));
    clearError("projectType");
  };

  const selectContactPreference = (id: string) => {
    setFormData((prev) => ({ ...prev, contactPreference: id }));
    clearError("contactPreference");
  };

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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    clearError(name);
  };

  // Validação do Passo 1
  const nextStep1 = () => {
    if (!formData.projectType) {
      setStepErrors({ projectType: t.contact.form.errors.selectProjectType });
      return;
    }
    if (
      formData.projectType === "outro" &&
      (!formData.otherProjectType || formData.otherProjectType.trim().length < 3)
    ) {
      setStepErrors({ otherProjectType: t.contact.form.errors.describeProjectType });
      return;
    }
    setStepErrors({});
    setCurrentStep(2);
  };

  // Validação do Passo 2
  const nextStep2 = () => {
    if (!formData.contactPreference) {
      setStepErrors({ contactPreference: t.contact.form.errors.selectContactPreference });
      return;
    }
    if (
      formData.contactPreference === "outro" &&
      (!formData.otherContactPreference || formData.otherContactPreference.trim().length < 3)
    ) {
      setStepErrors({ otherContactPreference: t.contact.form.errors.specifyContactPreference });
      return;
    }
    setStepErrors({});
    setCurrentStep(3);
  };

  // Submissão final no Passo 3
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setServerMessage("");

    const { contactFormSchema, flattenFieldErrors } = await loadValidation();
    const validation = contactFormSchema.safeParse(formData);
    if (!validation.success) {
      // Mapeia TODOS os erros do schema para a UI (nome, email, telefone,
      // mensagem, consentimento, tipo de projeto, preferência de contacto...).
      setStepErrors(flattenFieldErrors(validation.error));
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

  const reset = () => {
    setSubmitStatus("idle");
    setServerMessage("");
    setCurrentStep(1);
    setFormData(EMPTY_FORM);
  };

  const selectedProjectTypeTitle =
    formData.projectType === "outro" && formData.otherProjectType
      ? t.contact.form.otherPrefix + formData.otherProjectType
      : projectTypes.find((p) => p.id === formData.projectType)?.title || formData.projectType;

  const selectedContactPreferenceTitle =
    formData.contactPreference === "outro" && formData.otherContactPreference
      ? t.contact.form.otherPrefix + formData.otherContactPreference
      : contactPreferences.find((c) => c.id === formData.contactPreference)?.title || formData.contactPreference;

  return {
    currentStep,
    goToStep,
    formData,
    stepErrors,
    isSubmitting,
    submitStatus,
    serverMessage,
    projectTypes,
    contactPreferences,
    featureTags,
    selectedProjectTypeTitle,
    selectedContactPreferenceTitle,
    selectProjectType,
    selectContactPreference,
    toggleFeature,
    handleInputChange,
    nextStep1,
    nextStep2,
    handleSubmit,
    reset,
  };
}

export type ContactFormController = ReturnType<typeof useContactForm>;
