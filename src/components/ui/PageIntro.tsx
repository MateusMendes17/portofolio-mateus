import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  aside?: ReactNode;
}

/**
 * Cabeçalho partilhado pelas páginas interiores, no tema da home:
 * barra de estado com o ponto "disponível", fundo topográfico e
 * título em tipografia gigante.
 */
export function PageIntro({ eyebrow, title, description, aside }: PageIntroProps) {
  return (
    <section className="relative isolate overflow-hidden px-[var(--gutter)] pb-14 lg:pb-20">
      <div aria-hidden="true" className="theme-intro-bg pointer-events-none absolute inset-0 -z-10" />

      <p className="m-0 flex flex-wrap items-center gap-3 border-b border-ink py-4 font-mono text-sm text-ink">
        <span className="home-dot" aria-hidden="true" />
        {eyebrow}
      </p>

      <h1 className="m-0 mt-10 max-w-[16ch] font-heading text-[clamp(3rem,8vw,8rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-ink lg:mt-14">
        {title}
      </h1>

      <div className="mt-8 max-w-[60ch] lg:mt-10">
        <p className="m-0 font-heading text-[clamp(1.25rem,1.8vw,1.75rem)] leading-[1.3] tracking-[-0.02em] text-ink-2">
          {description}
        </p>
        {aside}
      </div>
    </section>
  );
}
