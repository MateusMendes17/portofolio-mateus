import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  aside?: ReactNode;
}

/**
 * Cabeçalho editorial partilhado pelas páginas interiores.
 * Mantém a mesma grelha, escala e hairlines da página de projetos.
 */
export function PageIntro({ eyebrow, title, description, aside }: PageIntroProps) {
  return (
    <section className="container-page pt-20 pb-4 lg:pt-28">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-start lg:gap-16">
        <div>
          <p className="flex items-center gap-3 font-body text-label uppercase tracking-[0.14em] text-muted">
            <span className="h-px w-8 bg-ink" aria-hidden="true" />
            {eyebrow}
          </p>

          <h1 className="mt-5 font-heading text-display font-semibold text-ink">
            {title}
          </h1>
        </div>

        <div className="max-w-[52ch]">
          <p className="font-body text-lead text-ink-2">{description}</p>
          {aside}
        </div>
      </div>
    </section>
  );
}
