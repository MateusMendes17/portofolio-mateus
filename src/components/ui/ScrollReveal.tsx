"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Direction from which the element enters */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Distance the element travels (px) */
  distance?: number;
  /** Once = animate only once; false = animate every time */
  once?: boolean;
  /** Scale effect on entry */
  scale?: number;
  /** 3D rotate on entry (degrees) */
  rotateX?: number;
  rotateY?: number;
  /** InView threshold (0-1) */
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  scale = 1,
  rotateX = 0,
  rotateY = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
        scale,
        rotateX,
        rotateY,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateX: 0,
              rotateY: 0,
            }
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              scale,
              rotateX,
              rotateY,
            }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Stagger Container + Item for grid animations
   ───────────────────────────────────────────── */

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay between children (seconds) */
  stagger?: number;
  /** Once = animate only once */
  once?: boolean;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className = "",
  stagger = 0.1,
  once = true,
  threshold = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  scale?: number;
  rotateX?: number;
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
  distance = 30,
  scale = 0.95,
  rotateX = 0,
}: StaggerItemProps) {
  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = directionMap[direction];

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          x: offset.x,
          y: offset.y,
          scale,
          rotateX,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 1, 0.5, 1],
          },
        },
      }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
