"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `true` depois da hidratação, `false` durante o SSR e na renderização de
 * hidratação.
 *
 * Implementado com `useSyncExternalStore` em vez de `useState` + `useEffect`
 * porque um `setState` síncrono dentro de um efeito é reprovado pelas regras do
 * React (`react-hooks/set-state-in-effect`) e porque `getServerSnapshot`
 * garante que o valor inicial corresponde ao HTML do servidor — sem mismatch de
 * hidratação.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return () => {};
  }
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getReducedMotionSnapshot = () =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false;

const getReducedMotionServerSnapshot = () => false;

/**
 * `true` quando o sistema operativo declara `prefers-reduced-motion: reduce`.
 *
 * `matchMedia` é um sistema externo ao React, por isso é lido com
 * `useSyncExternalStore`: o servidor e a hidratação devolvem `false` (sem
 * mismatch) e a preferência é reativa — se mudar em tempo de execução, todos
 * os consumidores atualizam.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}
