"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextReveal3DProps {
  children: string;
  className?: string;
  /** Stagger delay between characters (seconds) */
  charDelay?: number;
  /** Animation duration per character */
  duration?: number;
  /** Only animate once */
  once?: boolean;
  /** Split mode */
  splitBy?: "char" | "word";
  /** 3D flip effect */
  rotateEffect?: boolean;
}

/**
 * Animates text with a 3D character-by-character or word-by-word reveal.
 * Each letter flips in from below with a slight rotation.
 */
export function TextReveal3D({
  children,
  className = "",
  charDelay = 0.03,
  duration = 0.5,
  once = true,
  splitBy = "word",
  rotateEffect = true,
}: TextReveal3DProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const units = splitBy === "char" ? children.split("") : children.split(" ");

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`}
      style={{ perspective: "600px" }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          className="inline-block"
          initial={{
            opacity: 0,
            y: 20,
            rotateX: rotateEffect ? 45 : 0,
          }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }
              : {
                  opacity: 0,
                  y: 20,
                  rotateX: rotateEffect ? 45 : 0,
                }
          }
          transition={{
            duration,
            delay: i * charDelay,
            ease: [0.25, 1, 0.5, 1],
          }}
          style={{
            transformOrigin: "bottom center",
            display: "inline-block",
            willChange: "transform, opacity",
          }}
        >
          {unit}
          {splitBy === "word" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

