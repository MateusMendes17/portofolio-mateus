import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** `horizontal` leva o nome; `icon` é só o monograma. */
  variant: "horizontal" | "icon";
  className?: string;
  priority?: boolean;
}

const FILES = {
  horizontal: {
    light: "/logo-pro-horizontal-claro.png",
    dark: "/logo-pro-horizontal-escuro.png",
    width: 2666,
    height: 720,
  },
  icon: {
    light: "/logo-pro-icone-claro.png",
    dark: "/logo-pro-icone-escuro.png",
    width: 512,
    height: 512,
  },
} as const;

/**
 * Logótipo que segue o tema do site (classe `.dark`, definida pelo next-themes).
 * Só uma das versões está visível; a outra fica `display: none` e, sendo lazy,
 * o browser não a descarrega. A altura vem do `className` (ex.: `h-12`).
 */
export function Logo({ variant, className, priority = false }: LogoProps) {
  const file = FILES[variant];
  const common = {
    width: file.width,
    height: file.height,
    priority,
    sizes: variant === "horizontal" ? "180px" : "48px",
  };

  return (
    <>
      <Image
        {...common}
        alt="Mateus Mendes"
        src={file.light}
        className={cn("logo-light w-auto", className)}
      />
      <Image
        {...common}
        alt="Mateus Mendes"
        src={file.dark}
        className={cn("logo-dark w-auto", className)}
      />
    </>
  );
}

/**
 * Marca em linha: ícone MM, divisor e nome com a função por baixo, como no
 * logótipo horizontal, mas em texto real (nítido e sem caixa de fundo).
 */
export function BrandLockup({
  name,
  className,
  showRole = true,
}: {
  name: string;
  className?: string;
  /** Esconde a linha "Web Developer" (ex.: em espaços muito estreitos). */
  showRole?: boolean;
}) {
  return (
    <span className={cn("flex min-w-0 items-center gap-3", className)}>
      <Logo variant="icon" className="h-10 w-10 shrink-0" />
      <span className="h-8 w-px shrink-0 bg-line-strong/60" aria-hidden="true" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="truncate font-body text-[13px] font-semibold uppercase tracking-[0.14em] text-ink">
          {name}
        </span>
        {showRole && (
          <span className="mt-1.5 hidden font-body text-[9px] uppercase tracking-[0.34em] text-muted sm:block">
            Web Developer
          </span>
        )}
      </span>
    </span>
  );
}
