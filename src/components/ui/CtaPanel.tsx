import Link from "next/link";

interface CtaPanelProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/**
 * Painel de conversão comum, no tema do contacto final da home:
 * bloco escuro com acento chartreuse no tema claro e bloco chartreuse
 * no tema escuro (classes `home-contact*` em home.css).
 */
export function CtaPanel({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CtaPanelProps) {
  const secondaryIsExternal = secondaryHref?.startsWith("http") ?? false;
  const pill =
    "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-7 font-semibold no-underline transition-transform hover:scale-105";

  return (
    <section className="px-[var(--gutter)]" data-hide-whatsapp>
      <div className="home-contact code-surface rounded-[40px] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
        {eyebrow && (
          <p className="home-contact-muted m-0 mb-6 inline-flex items-center gap-3 font-mono text-sm">
            <span className="home-dot" aria-hidden="true" />
            {eyebrow}
          </p>
        )}

        <h2 className="m-0max-w-[16ch] font-heading text-[clamp(2.75rem,6.5vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] text-inherit">
          {title}
        </h2>

        <p className="home-contact-muted m-0 mt-6 max-w-[56ch] font-body text-body">{description}</p>

        <div className="mt-10 flex flex-wrap gap-3.5">
          <Link href={primaryHref} className={`home-contact-primary ${pill}`}>
            {primaryLabel} <span aria-hidden="true">→</span>
          </Link>

          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              target={secondaryIsExternal ? "_blank" : undefined}
              rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
              className={`home-contact-line border-[1.5px] text-inherit ${pill}`}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
