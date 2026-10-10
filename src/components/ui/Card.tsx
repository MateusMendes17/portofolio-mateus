"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  badgeVariant?: "default" | "accent" | "success";
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  metrics?: { label: string; value: string };
  preview?: React.ReactNode; // Elemento gráfico visual interativo (Mockup/Widget 3D)
  actionText?: string;
  featured?: boolean;
}

/**
 * Card Moderno de Alto Nível com fator "UAU":
 * - Efeito 3D Tilt (inclinação tátil no espaço tridimensional com perspectiva)
 * - Spotlight suave e reflexo de borda dinâmico que reage ao cursor
 * - Área para Preview Visual / Mockup interativo em cada card
 * - Vidro acetinado com blur, tags dinâmicas e micro-interações
 */
export function Card({
  className,
  badge,
  badgeVariant = "default",
  icon,
  title,
  subtitle,
  description,
  tags,
  metrics,
  preview,
  actionText = "Explorar",
  featured = false,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Efeito 3D Tilt suave e tracking do spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calcula rotação com base no centro do card (máx 6 graus para subtileza elegante)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setRotate({ x: rotateX, y: rotateY });

    // Atualiza coordenadas CSS para o spotlight
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  const badgeStyles = {
    default: "bg-surface border border-border text-text-secondary",
    accent: "bg-accent-subtle/80 border border-accent/30 text-accent font-semibold",
    success: "bg-success-subtle/70 border border-success/30 text-success font-semibold",
  }[badgeVariant];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered
          ? "transform 150ms ease-out, box-shadow 300ms ease-out"
          : "transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 500ms ease-out",
        transformStyle: "preserve-3d",
      }}
      className={cn(
        // Base e formato moderno em cantos arredondados generosos
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7 select-none cursor-pointer",
        "bg-surface/85 backdrop-blur-xl border border-border/70",
        "shadow-md hover:shadow-2xl hover:border-accent/40",
        featured && "ring-1 ring-accent/30 border-accent/40 shadow-lg",
        className
      )}
      {...props}
    >
      {/* Luz difusa de fundo que acompanha o cursor (Spotlight) */}
      <span
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        style={{
          background:
            "radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--color-accent-subtle), transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* Reflexo luminoso da borda de precisão ao passar o cursor */}
      <span
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(220px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--color-accent), transparent 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          padding: "1.5px",
        }}
        aria-hidden="true"
      />

      <div style={{ transform: "translateZ(18px)" }}>
        {/* Topo do Card: Ícone e Badge */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-subtle border border-accent/25 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white shadow-sm">
              {icon}
            </div>
          ) : (
            <div className="h-2 w-8 rounded-full bg-accent/30 transition-all duration-300 group-hover:w-14 group-hover:bg-accent" />
          )}

          {badge && (
            <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs tracking-wide", badgeStyles)}>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {badge}
            </span>
          )}
        </div>

        {/* Subtítulo & Título Principal com destaque */}
        {subtitle && (
          <p className="text-xs uppercase tracking-wider font-bold text-accent mb-1">
            {subtitle}
          </p>
        )}

        <h3 className="font-heading text-xl font-bold tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent mb-2.5">
          {title}
        </h3>

        {/* Descrição clara e concisa */}
        <p className="text-sm leading-relaxed text-text-secondary mb-5">
          {description}
        </p>

        {/* Elemento Gráfico Visual / Mockup (Fator UAU) */}
        {preview && (
          <div className="my-3 overflow-hidden rounded-2xl border border-border/80 bg-surface/60 transition-all duration-300 group-hover:border-accent/30 group-hover:bg-surface/90 shadow-inner">
            {preview}
          </div>
        )}

        {/* Métrica / Destaque Visual se fornecido */}
        {metrics && (
          <div className="mt-4 rounded-xl border border-border/70 bg-surface/70 p-3 transition-all duration-300 group-hover:border-accent/30 flex items-center justify-between">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
              {metrics.label}
            </span>
            <span className="text-xs font-bold text-text-primary">
              {metrics.value}
            </span>
          </div>
        )}

        {/* Tags de competências / tecnologias */}
        {tags && tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-hover px-2.5 py-0.5 text-xs font-medium text-text-secondary border border-border/60 transition-colors group-hover:border-accent/25"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Rodapé do Card com Ação Interativa e Profundidade 3D */}
      <div
        style={{ transform: "translateZ(24px)" }}
        className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-semibold text-text-primary"
      >
        <span className="transition-colors duration-200 group-hover:text-accent">
          {actionText}
        </span>

        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-surface border border-border transition-all duration-300 group-hover:translate-x-1 group-hover:border-accent group-hover:bg-accent group-hover:text-white shadow-sm">
          <svg
            className="w-3.5 h-3.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
