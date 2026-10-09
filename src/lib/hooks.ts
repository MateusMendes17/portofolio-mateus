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
