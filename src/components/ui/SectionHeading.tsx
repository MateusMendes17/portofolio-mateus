import Link from "next/link";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: {
    href: string;
    label: string;
  };
}

/**
 * Cabeçalho de secção: índice, etiqueta, título e uma coluna de apoio.
 * A hairline superior separa secções sem recorrer a cartões.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-7 border-t border-line pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.55fr)] lg:items-start lg:gap-14">
      <div>
        <div className="flex items-center gap-3 font-body text-label uppercase tracking-[0.13em] text-muted">
          {index && <span className="tabular-nums text-ink">{index}</span>}
          <span className="h-px w-7 bg-line-strong" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>

        <h2 className="mt-4 max-w-[22ch] font-heading text-h2 text-ink">
          {title}
        </h2>
      </div>

      <div className="lg:pt-1">
        {description && (
          <p className="max-w-[50ch] font-body text-body text-ink-2">
            {description}
          </p>
        )}

        {action && (
          <Link
            href={action.href}
            className="group mt-5 inline-flex items-center gap-2 font-body text-label font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink"
          >
            {action.label}
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
