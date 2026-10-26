import { ButtonLink } from "@/components/ui/Button";

interface CtaPanelProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

/**
 * Painel de conversão comum. Inverte as cores do tema (tinta sobre fundo),
 * pelo que o texto usa sempre `text-bg` e o foco passa para `--code-focus`.
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

  return (
    <section className="container-page" data-hide-whatsapp>
      <div className="code-surface relative overflow-hidden border border-ink bg-ink px-6 py-12 text-bg sm:px-10 lg:px-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <p className="flex items-center gap-3 font-body text-label uppercase tracking-[0.14em] text-bg/65">
              <span className="h-1.5 w-1.5 bg-highlight" aria-hidden="true" />
              {eyebrow}
            </p>

            <h2 className="mt-5 max-w-[19ch] font-heading text-h2 text-bg">
              {title}
            </h2>

            <p className="mt-5 max-w-[56ch] font-body text-body text-bg/70">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <ButtonLink
              href={primaryHref}
              size="lg"
              withArrow
              className="w-full justify-center sm:w-auto lg:w-full"
            >
              {primaryLabel}
            </ButtonLink>

            {secondaryHref && secondaryLabel && (
              <ButtonLink
                href={secondaryHref}
                size="lg"
                variant="secondary"
                target={secondaryIsExternal ? "_blank" : undefined}
                rel={secondaryIsExternal ? "noopener noreferrer" : undefined}
                className="w-full justify-center sm:w-auto lg:w-full"
              >
                {secondaryLabel}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
