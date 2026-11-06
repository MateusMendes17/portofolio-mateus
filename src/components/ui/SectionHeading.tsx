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
 * Cabeçalho de secção no tema da home: etiqueta em mono com índice
 * chartreuse, título grande e uma coluna de apoio.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
      <div className="min-w-0 flex-[1_1_520px]">
        <div className="flex items-center gap-3 font-mono text-sm text-muted">
          {index && (
            <span className="bg-highlight px-2 py-0.5 tabular-nums text-accent-ink">{index}</span>
          )}
          <span>{eyebrow}</span>
        </div>

        <h2 className="m-0 mt-5 max-w-[18ch] font-heading text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
          {title}
        </h2>
      </div>

      {(description || action) && (
        <div className="min-w-0 flex-[0_1_420px]">
          {description && <p className="m-0 font-body text-body text-muted">{description}</p>}

          {action && (
            <Link
              href={action.href}
              className="mt-6 inline-flex min-h-[48px] items-center gap-3 rounded-full border-[1.5px] border-ink px-6 font-semibold text-ink no-underline transition-colors hover:bg-ink hover:text-bg"
            >
              {action.label} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
