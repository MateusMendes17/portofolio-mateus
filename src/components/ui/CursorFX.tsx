"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], [role='switch'], [role='tab'], summary, label[for], [data-cursor]";
const TEXT_INPUT = "input, textarea, select, [contenteditable='true']";

/**
 * Efeitos de rato (só desktop com rato e sem movimento reduzido):
 * - um anel que segue o cursor com atraso suave e cresce, chartreuse,
 *   sobre links e botões (o cursor nativo continua visível);
 * - elementos com `data-magnetic` são puxados ligeiramente para o rato.
 *
 * Tudo é feito com `transform`/`translate` num único loop de animação,
 * que pára quando o rato está parado.
 */
export function CursorFX() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const pos = { x: -100, y: -100 };
    const cur = { x: -100, y: -100, s: 1 };
    let targetScale = 1;
    let frame = 0;
    let visible = false;
    let magnet: HTMLElement | null = null;

    const tick = () => {
      frame = 0;
      cur.x += (pos.x - cur.x) * 0.2;
      cur.y += (pos.y - cur.y) * 0.2;
      cur.s += (targetScale - cur.s) * 0.2;
      ring.style.transform = `translate3d(${cur.x.toFixed(1)}px, ${cur.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${cur.s.toFixed(3)})`;
      if (Math.abs(pos.x - cur.x) > 0.1 || Math.abs(pos.y - cur.y) > 0.1 || Math.abs(targetScale - cur.s) > 0.005) {
        frame = requestAnimationFrame(tick);
      }
    };
    const loop = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const releaseMagnet = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pos.x = event.clientX;
      pos.y = event.clientY;
      if (!visible) {
        visible = true;
        cur.x = pos.x;
        cur.y = pos.y;
        ring.style.opacity = "1";
      }

      const el = event.target instanceof Element ? event.target : null;
      const overText = !!el?.closest(TEXT_INPUT);
      const overLink = !overText && !!el?.closest(INTERACTIVE);
      targetScale = overText ? 0.4 : overLink ? 2.2 : 1;
      ring.dataset.active = overLink ? "true" : "false";

      // Magnético: puxa o elemento até 30% da distância ao centro (máx. ~14px).
      const next = el?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (next !== magnet) releaseMagnet();
      magnet = next;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        const clamp = (v: number) => Math.max(-14, Math.min(14, v * 0.3));
        magnet.style.translate = `${clamp(dx).toFixed(1)}px ${clamp(dy).toFixed(1)}px`;
      }
      loop();
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      releaseMagnet();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      releaseMagnet();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ringRef} aria-hidden="true" className="cursor-ring" />;
}
