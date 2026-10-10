"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { useLanguage } from "@/context/LanguageContext";

/* Ícones (JSX) por opção — os títulos/descrições vivem em t.quiz.* */
const GOAL_ICONS: Record<string, ReactNode> = {
  authority: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2 3 7h18l-9-5Z" />
    </svg>
  ),
  leads: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  ecommerce: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  webapp: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18M3 9h18M3 15h18" />
    </svg>
  ),
};

const STAGE_ICONS: Record<string, ReactNode> = {
  idea: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6M10 22h4" />
    </svg>
  ),
  ready: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
    </svg>
  ),
  redesign: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  ),
};

const PRIORITY_ICONS: Record<string, ReactNode> = {
  speed: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  design: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  ),
  mobile: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
};

/* Links de resultado — iguais em ambas as línguas (só o texto muda). */
const RESULT_LINKS = {
  ecommerce: { serviceLink: "/servicos#lojas-online", contactQuery: "loja-online" },
  leads: { serviceLink: "/servicos#landing-pages", contactQuery: "landing-page" },
  webapp: { serviceLink: "/servicos#web-apps", contactQuery: "web-app" },
  website: { serviceLink: "/servicos#websites", contactQuery: "site-institucional" },
} as const;

type ResultKey = keyof typeof RESULT_LINKS;

interface QuizAnswer {
  goal?: "ecommerce" | "leads" | "authority" | "webapp";
  stage?: "idea" | "ready" | "redesign";
  priority?: "speed" | "design" | "mobile";
}

interface SolutionResult {
  title: string;
  badge: string;
  description: string;
  highlights: string[];
  serviceLink: string;
  contactQuery: string;
}

export function ProjectQuiz() {
  const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState<1 | 2 | 3 | 4>(1);
  const [answers, setAnswers] = useState<QuizAnswer>({});

  const selectAnswer = <K extends keyof QuizAnswer>(
    field: K,
    value: QuizAnswer[K],
    nextStep: 1 | 2 | 3 | 4
  ) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
    setCurrentQuestion(nextStep);
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestion(1);
  };

  const calculateResult = (): SolutionResult => {
    const key: ResultKey =
      answers.goal === "ecommerce" || answers.goal === "leads" || answers.goal === "webapp"
        ? answers.goal
        : "website";
    const text = t.quiz.results[key];

    return {
      title: text.title,
      badge: t.quiz.resultsBadge,
      description: text.description,
      highlights: text.highlights,
      ...RESULT_LINKS[key],
    };
  };

  const result = calculateResult();

  return (
    <div className="rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
      {/* Cabeçalho */}
      <div className="max-w-2xl mb-8">
        <span className="text-xs uppercase tracking-wider font-bold text-accent">
          {t.quiz.badge}
        </span>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-1">
          {t.quiz.title}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-text-secondary">
          {t.quiz.description}
        </p>
      </div>

      {/* Indicador de passos do quiz */}
      {currentQuestion < 4 && (
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                currentQuestion >= step ? "bg-accent" : "bg-surface-hover"
              }`}
            />
          ))}
          <span className="text-xs font-bold text-accent ml-2">
            {currentQuestion}/3
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ==============================================================
            PERGUNTA 1
            ============================================================== */}
        {currentQuestion === 1 && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary">
              {t.quiz.questions.goal}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {t.quiz.goalOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectAnswer("goal", opt.id as QuizAnswer["goal"], 2)}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-border/80 bg-surface/70 text-left hover:border-accent hover:bg-surface-hover/80 transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface border border-border text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors">
                    {GOAL_ICONS[opt.id]}
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                      {opt.title}
                    </h3>
                    <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==============================================================
            PERGUNTA 2
            ============================================================== */}
        {currentQuestion === 2 && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary">
                {t.quiz.questions.stage}
              </h3>
              <button
                type="button"
                onClick={() => setCurrentQuestion(1)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                {t.quiz.previousQuestion}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {t.quiz.stageOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectAnswer("stage", opt.id as QuizAnswer["stage"], 3)}
                  className="flex flex-col p-4 rounded-2xl border border-border/80 bg-surface/70 text-left hover:border-accent hover:bg-surface-hover/80 transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors mb-3">
                    {STAGE_ICONS[opt.id]}
                  </div>
                  <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==============================================================
            PERGUNTA 3
            ============================================================== */}
        {currentQuestion === 3 && (
          <motion.div
            key="q3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary">
                {t.quiz.questions.priority}
              </h3>
              <button
                type="button"
                onClick={() => setCurrentQuestion(2)}
                className="text-xs font-semibold text-accent hover:underline"
              >
                {t.quiz.previousQuestion}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {t.quiz.priorityOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => selectAnswer("priority", opt.id as QuizAnswer["priority"], 4)}
                  className="flex flex-col p-4 rounded-2xl border border-border/80 bg-surface/70 text-left hover:border-accent hover:bg-surface-hover/80 transition-all duration-200 group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors mb-3">
                    {PRIORITY_ICONS[opt.id]}
                  </div>
                  <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                    {opt.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">{opt.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ==============================================================
            RESULTADO FINAL
            ============================================================== */}
        {currentQuestion === 4 && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-accent/40 bg-gradient-to-br from-surface to-accent-subtle/30 p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-accent px-3 py-1 rounded-full bg-accent-subtle">
                  {result.badge}
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary mt-2">
                  {result.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={resetQuiz}
                className="text-xs font-semibold text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 self-start sm:self-auto"
              >
                <span>↺</span> {t.quiz.retake}
              </button>
            </div>

            <p className="text-sm leading-relaxed text-text-secondary">
              {result.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wider font-bold text-text-primary">
                {t.quiz.includesTitle}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {result.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link href={`/contacto?tipo=${result.contactQuery}`}>
                <Button variant="contact" size="md" withArrow>
                  {t.quiz.discussSolution}
                </Button>
              </Link>
              <Link href={result.serviceLink}>
                <Button variant="secondary" size="md">
                  {t.quiz.exploreService}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
