"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

/** Só é carregada aqui, no peso usado pelo nome. */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  variable: "--font-kinetic",
});

const DEFAULT_ROWS = ["MATEUS", "MENDES"] as const;
const DEFAULT_SPECS = [
  "Bricolage Grotesque · 800",
  "font-size: min(18.5vw, 30svh)",
  "letter-spacing: −0.04em",
  "line-height: 0.82",
] as const;

/** Atraso até a lente aparecer sozinha (depois da entrada das letras). */
const LENS_DELAY = 1700;

/**
 * Nome em tipografia gigante com uma lente "raio-X": por cima do nome
 * sólido passa uma lente circular que mostra o esqueleto das letras
 * (contornos, grelha, linhas-guia e medidas). Ao entrar, a lente passeia
 * sozinha; com rato, segue o cursor com atraso suave.
 *
 * Só se animam a posição e o raio da lente (clip-path) e o anel
 * (transform), por isso o texto nunca é recalculado.
 */
export function HeroName({
  className,
  rows: words = DEFAULT_ROWS,
  label = "Mateus Mendes",
  bandRow = 1,
  specs = DEFAULT_SPECS,
  as: Tag = "h1",
  compact = false,
}: {
  className?: string;
  /** Linhas de texto em maiúsculas (por omissão, o nome). */
  rows?: readonly string[];
  /** Texto para leitores de ecrã. */
  label?: string;
  /** Linha com a faixa chartreuse por trás (null = nenhuma). */
  bandRow?: number | null;
  /** Medidas mostradas nos cantos da lente. */
  specs?: readonly string[];
  /** Elemento: h1 no topo da home; div quando já há outro título (ex.: 404). */
  as?: "h1" | "div";
  /** Letras juntas em vez de espalhadas pela largura (para palavras curtas). */
  compact?: boolean;
}) {
  const { isEnglish } = useLanguage();
  const rootRef = useRef<HTMLHeadingElement & HTMLDivElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const lens = lensRef.current;
    const ring = ringRef.current;
    if (!root || !lens || !ring) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let width = 0;
    let height = 0;
    let maxRadius = 0;
    const measure = () => {
      width = lens.offsetWidth;
      height = lens.offsetHeight;
      maxRadius = Math.max(70, Math.min(190, height * 0.3));
      ring.style.width = ring.style.height = `${maxRadius * 2}px`;
    };
    measure();

    const current = { x: width / 2, y: height / 2, r: 0 };
    const target = { x: width / 2, y: height / 2, r: 0 };

    let mode: "idle" | "wander" | "pointer" = "idle";
    let started = false;
    let visible = true;
    let frame = 0;
    let last = 0;
    let resumeTimer = 0;

    const apply = () => {
      lens.style.setProperty("--x", `${current.x.toFixed(1)}px`);
      lens.style.setProperty("--y", `${current.y.toFixed(1)}px`);
      lens.style.setProperty("--r", `${Math.max(0, current.r).toFixed(1)}px`);
      const scale = maxRadius > 0 ? current.r / maxRadius : 0;
      ring.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      ring.style.opacity = current.r > 2 ? "1" : "0";
    };

    const tick = (now: number) => {
      frame = 0;
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;

      if (mode === "wander") {
        const t = now * 0.001;
        target.x = width * (0.5 + 0.36 * Math.sin(t * 0.42));
        target.y = height * (0.5 + 0.28 * Math.sin(t * 0.67 + 1.2));
        target.r = maxRadius * 0.82;
      }

      // Seguimento suave, independente da taxa de fotogramas.
      const ease = reduceMotion ? 1 : 1 - Math.pow(1 - 0.12, dt / 16);
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.r += (target.r - current.r) * ease;
      apply();

      const settled =
        Math.abs(target.x - current.x) < 0.2 &&
        Math.abs(target.y - current.y) < 0.2 &&
        Math.abs(target.r - current.r) < 0.2;
      if (visible && (mode === "wander" || !settled)) frame = requestAnimationFrame(tick);
      else last = 0;
    };

    const loop = () => {
      if (!frame && visible) frame = requestAnimationFrame(tick);
    };

    const startWander = () => {
      if (reduceMotion) return;
      mode = "wander";
      // Entra a partir do centro, a crescer.
      if (current.r < 1) {
        current.x = target.x = width / 2;
        current.y = target.y = height / 2;
      }
      loop();
    };

    const startTimer = window.setTimeout(() => {
      started = true;
      if (mode === "idle") startWander();
    }, reduceMotion ? 0 : LENS_DELAY);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const rect = lens.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
      target.r = maxRadius;
      if (mode !== "pointer") {
        mode = "pointer";
        // Sem salto: se a lente estava escondida, nasce debaixo do cursor.
        if (current.r < 1) {
          current.x = target.x;
          current.y = target.y;
        }
      }
      window.clearTimeout(resumeTimer);
      loop();
    };

    const onLeave = () => {
      if (mode !== "pointer") return;
      target.r = 0;
      mode = "idle";
      loop();
      // Volta a passear sozinha pouco depois de o rato sair.
      resumeTimer = window.setTimeout(() => {
        if (mode === "idle" && started) startWander();
      }, 2600);
    };

    const onResize = () => {
      measure();
      loop();
    };

    // Pausa quando o topo sai do ecrã ou o separador fica escondido.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible) loop();
    });
    observer.observe(root);
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) loop();
    };

    if (canHover) {
      root.addEventListener("pointermove", onMove);
      root.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    apply();

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(resumeTimer);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const rows = (animate: boolean) =>
    words.map((word, row) => {
      const start = words.slice(0, row).reduce((sum, w) => sum + w.length, 0);
      const letters = (
        <span className={cn("hero-name-row", !animate && "hero-name-row--guides")}>
          {word.split("").map((char, i) => (
            <span
              key={i}
              className={animate ? "hero-name-letter" : undefined}
              style={animate ? ({ "--i": start + i } as CSSProperties) : undefined}
            >
              {char}
            </span>
          ))}
        </span>
      );
      return (
        <span key={word} className={cn("block", row === bandRow && animate && "hero-name-band")}>
          {letters}
        </span>
      );
    });

  return (
    <Tag ref={rootRef} className={cn(display.variable, "hero-name m-0 font-normal", compact && "hero-name--compact", className)}>
      <span className="sr-only">{label}</span>

      <span aria-hidden="true" className="hero-name-base">
        {rows(true)}
      </span>

      {/* Palco um pouco maior do que o texto, para a lente não ser cortada nas pontas. */}
      <span aria-hidden="true" className="hero-name-stage">
        <span ref={lensRef} className="hero-name-lens">
          <span className="hero-name-lens-inner">{rows(false)}</span>
          {(["tl", "tr", "bl", "br"] as const).map((corner, i) =>
            specs[i] ? (
              <span key={corner} className={`hero-name-spec hero-name-spec--${corner}`}>
                {specs[i]}
              </span>
            ) : null
          )}
        </span>
        <span ref={ringRef} className="hero-name-ring">
          <span className="hero-name-ring-label">{isEnglish ? "x-ray" : "raio-x"}</span>
        </span>
      </span>
    </Tag>
  );
}
