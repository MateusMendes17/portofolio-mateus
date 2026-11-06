/**
 * Perguntas frequentes no tema da home. Usa <details> nativo: as respostas
 * ficam sempre no HTML (bom para SEO) e funciona sem JavaScript.
 */
export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <div className="border-t-[1.5px] border-ink">
      {items.map((item, i) => (
        <details key={item.q} open={i === 0} className="theme-faq border-b-[1.5px] border-ink">
          <summary className="flex min-h-[76px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-heading text-xl tracking-[-0.02em] text-ink sm:text-2xl [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              className="home-plus grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-ink font-body text-2xl"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="m-0 pb-7 text-[1.0625rem] text-muted sm:pr-16">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
