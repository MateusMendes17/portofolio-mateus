"use client";

import React from "react";

/**
 * Floating 3D geometric shapes — CSS-only animation.
 * No Framer Motion, no per-frame JS. Pure CSS keyframes for maximum performance.
 */
interface FloatingElementsProps {
  className?: string;
  count?: number;
  variant?: "default" | "hero" | "minimal";
}

const SHAPES = [
  // Cube wireframe
  (props: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" className={props.className} style={props.style} fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="30,20 70,20 85,40 45,40" />
      <polygon points="30,20 30,60 45,80 45,40" />
      <polygon points="70,20 70,60 85,80 85,40" />
      <polygon points="30,60 70,60 85,80 45,80" />
    </svg>
  ),
  // Diamond
  (props: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" className={props.className} style={props.style} fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="50,10 80,50 50,90 20,50" />
      <line x1="20" y1="50" x2="80" y2="50" />
    </svg>
  ),
  // Triangle
  (props: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" className={props.className} style={props.style} fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="50,15 85,80 15,80" />
      <line x1="50" y1="15" x2="50" y2="80" />
    </svg>
  ),
  // Sphere wireframe
  (props: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" className={props.className} style={props.style} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="50" cy="50" r="35" />
      <ellipse cx="50" cy="50" rx="35" ry="12" />
      <ellipse cx="50" cy="50" rx="12" ry="35" />
    </svg>
  ),
  // Hexagon
  (props: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 100 100" className={props.className} style={props.style} fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="50,15 82,32 82,68 50,85 18,68 18,32" />
      <line x1="50" y1="15" x2="50" y2="85" />
    </svg>
  ),
];

// Fixed positions (deterministic — no hydration mismatch)
const POSITIONS = [
  { left: "8%",  top: "12%", size: 32, dur: "22s", delay: "0s" },
  { left: "85%", top: "8%",  size: 28, dur: "26s", delay: "-4s" },
  { left: "72%", top: "65%", size: 36, dur: "20s", delay: "-8s" },
  { left: "15%", top: "78%", size: 30, dur: "24s", delay: "-2s" },
  { left: "50%", top: "40%", size: 24, dur: "28s", delay: "-6s" },
  { left: "35%", top: "20%", size: 26, dur: "23s", delay: "-10s" },
  { left: "60%", top: "85%", size: 34, dur: "25s", delay: "-3s" },
  { left: "92%", top: "45%", size: 22, dur: "27s", delay: "-7s" },
];

export function FloatingElements({
  className = "",
  count = 6,
  variant = "default",
}: FloatingElementsProps) {
  const opacityBase = variant === "hero" ? 0.12 : variant === "minimal" ? 0.05 : 0.08;
  const itemCount = Math.min(count, POSITIONS.length);

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {POSITIONS.slice(0, itemCount).map((pos, i) => {
        const ShapeComponent = SHAPES[i % SHAPES.length];
        return (
          <div
            key={i}
            className="absolute floating-shape"
            style={{
              left: pos.left,
              top: pos.top,
              width: pos.size,
              height: pos.size,
              animationDuration: pos.dur,
              animationDelay: pos.delay,
            }}
          >
            <ShapeComponent
              className="w-full h-full"
              style={{ color: "var(--color-accent)", opacity: opacityBase }}
            />
          </div>
        );
      })}
    </div>
  );
}
