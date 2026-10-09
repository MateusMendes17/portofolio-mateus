"use client";

import React from "react";

interface TiltCard3DProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Lightweight 3D tilt card — pure CSS hover effect.
 * No Framer Motion springs or per-frame JS computations.
 */
export function TiltCard3D({
  children,
  className = "",
}: TiltCard3DProps) {
  return (
    <div className={`tilt-card-3d h-full w-full flex flex-col ${className}`}>
      {children}
    </div>
  );
}
