"use client";

import { useState } from "react";
import { Bricolage_Grotesque } from "next/font/google";
import { cn } from "@/lib/utils";

/**
 * Bricolage Grotesque tem eixos de peso (200–800) e largura (75–100),
 * o que permite as letras "respirarem". Só é carregada aqui.
 */
const kinetic = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  display: "swap",
  variable: "--font-kinetic",
});

type LetterState = "wave" | "h0" | "h1" | "h2" | "rest";

const ROWS = ["MATEUS", "MENDES"] as const;

/**
 * Nome em tipografia gigante. Sem interação, passa uma onda de peso pelas
 * letras; ao passar o rato, a letra debaixo do cursor fica fina e as
 * vizinhas engrossam aos poucos. Em ecrãs táteis fica só a onda.
 */
export function KineticName({ className }: { className?: string }) {
  const [hover, setHover] = useState(-1);

  function stateFor(index: number): LetterState {
    if (hover < 0) return "wave";
    const distance = Math.abs(index - hover);
    if (distance === 0) return "h0";
    if (distance === 1) return "h1";
    if (distance === 2) return "h2";
    return "rest";
  }

  return (
    <h1
      className={cn(kinetic.variable, "m-0 font-normal", className)}
      onPointerLeave={() => setHover(-1)}
    >
      <span className="sr-only">Mateus Mendes</span>
      {ROWS.map((word, row) => {
        const start = ROWS.slice(0, row).reduce((sum, w) => sum + w.length, 0);
        return (
          <span
            key={word}
            aria-hidden="true"
            className={cn("home-name-row", row === 1 && "home-mark")}
          >
            {word.split("").map((char, i) => {
              const index = start + i;
              return (
                <span
                  key={index}
                  className="home-letter"
                  data-state={stateFor(index)}
                  style={{ animationDelay: `${(index * 0.12).toFixed(2)}s` }}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setHover(index);
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
