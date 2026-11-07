"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Cortina chartreuse que varre o ecrã quando se muda de página
 * (não aparece no primeiro carregamento). Só CSS transform; com
 * movimento reduzido não é mostrada (ver home.css).
 */
export function RouteCurtain() {
  const pathname = usePathname();
  const first = useRef(true);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    document.documentElement.classList.add("has-navigated");
    // Reinicia a animação a cada mudança de rota.
    setRun((n) => n + 1);
  }, [pathname]);

  if (run === 0) return null;
  return <div key={run} aria-hidden="true" className="route-curtain" />;
}
