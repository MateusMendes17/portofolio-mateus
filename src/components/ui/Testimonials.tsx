"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function Testimonials() {
  const { t } = useLanguage();
  const testimonials = t.home.testimonials.items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length, isAnimating]);

  const goTo = (index: number) => {
    if (index !== currentIndex && !isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 400);
    }
  };

  return (
    <section className="cv-auto mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <ScrollReveal direction="up" distance={30}>
      <div className="max-w-2xl mb-12 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-text-secondary shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          {t.home.testimonials.badge}
        </span>
        <h2 className="mt-4 font-heading text-2xl sm:text-3xl font-bold text-text-primary">
          {t.home.testimonials.title}
        </h2>
      </div>
      </ScrollReveal>

      <div className="relative">
        {/* Cards container */}
        <div className="relative h-[280px] sm:h-[240px] md:h-[220px]">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={index === currentIndex ? "absolute inset-0" : "absolute inset-0 invisible pointer-events-none"}
              >
                <div className="relative rounded-3xl border border-border/80 bg-surface/85 backdrop-blur-xl p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500">
                  {/* Quote icon */}
                  <svg
                    className="absolute top-6 right-6 w-16 h-16 text-accent/10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609v7.391h-8.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609v7.391h-9zm2.983-21v8.383c0 4.418 2.346 7.755 5.5 8.941v-8.383h-5.5z" />
                  </svg>

                  {/* Quote text */}
                  <p className="relative z-10 text-base sm:text-lg leading-relaxed text-text-secondary mb-8">
                    {testimonial.quote}
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/60">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-subtle text-accent font-heading text-lg font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-heading text-sm font-bold text-text-primary">{testimonial.author}</p>
                      <p className="text-xs text-text-muted">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goTo(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-accent shadow-[0_0_8px_var(--color-accent)]"
                  : "bg-border hover:bg-border-hover"
              }`}
              aria-label={`Ir para testemunho ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>

        {/* Arrow navigation */}
        <button
          type="button"
          onClick={() => goTo((currentIndex - 1 + testimonials.length) % testimonials.length)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-4 md:left-4 md:-translate-x-0 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur-xl text-text-secondary hover:text-text-primary hover:border-accent transition-all shadow-sm"
          aria-label="Testemunho anterior"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goTo((currentIndex + 1) % testimonials.length)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-4 md:right-4 md:translate-x-0 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur-xl text-text-secondary hover:text-text-primary hover:border-accent transition-all shadow-sm"
          aria-label="Próximo testemunho"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}