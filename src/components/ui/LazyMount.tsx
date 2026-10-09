"use client";

import React, { useEffect, useRef, useState } from "react";

interface LazyMountProps {
  children: React.ReactNode;
  /** Altura reservada enquanto o conteúdo ainda não montou (evita saltos de layout). */
  minHeight?: number;
  /** Quanto pré-carregar cedo, em relação ao viewport (ex.: "300px"). */
  rootMargin?: string;
}

/**
 * Adia a montagem dos filhos até estarem perto do viewport.
 *
 * Usa-se em conjunto com `next/dynamic`: assim os componentes pesados ficam
 * fora do bundle inicial e o browser só descarrega o chunk (e o React só gasta
 * CPU a montá-los) quando o utilizador chega perto da secção. Em telemóvel
 * isto reduz o trabalho da main thread na hora mais crítica — a do primeiro
 * ecrã.
 */
export function LazyMount({
  children,
  minHeight = 420,
  rootMargin = "300px",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Sem IntersectionObserver (browsers muito antigos) → monta logo, de raiz.
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} style={visible ? undefined : { minHeight }}>
      {visible ? children : null}
    </div>
  );
}
