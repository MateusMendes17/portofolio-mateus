"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeroName } from "@/components/home/HeroName";
import { useLanguage } from "@/context/LanguageContext";

/* ============================================================
   Página 404 — renderizada dentro do root layout (Header/Footer
   incluídos) para qualquer URL que não corresponda a uma rota.

   O "404" gigante usa a mesma lente raio-X do nome da home, com o
   endereço pedido nas medidas da lente. A Next injeta sozinha
   `<meta name="robots" content="noindex" />` nas respostas 404.
   ============================================================ */

export default function NotFound() {
  const { t, isEnglish } = useLanguage();
  const pathname = usePathname();

  // O not-found normal não aceita metadata e a Next repõe o título por
  // omissão depois de hidratar: repõe-se o da 404 sempre que mudar.
  useEffect(() => {
    const wanted = `${t.notFound.headline} | Mateus Mendes`;
    const apply = () => {
      if (document.title !== wanted) document.title = wanted;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [t.notFound.headline]);

  const links = [
    { href: "/projetos", label: t.nav.projects, note: isEnglish ? "Live sites and case studies" : "Sites publicados e estudos de caso" },
    { href: "/servicos", label: t.nav.services, note: isEnglish ? "What I build and how" : "O que faço e como" },
    { href: "/avaliador", label: t.nav.audit, note: isEnglish ? "Free website audit" : "Avalie o seu site de graça" },
    { href: "/contacto", label: t.nav.contact, note: isEnglish ? "Reply within 24h" : "Resposta em 24h" },
  ];

  const openSearch = () =>
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true, metaKey: true }));

  const shortPath = pathname.length > 28 ? `${pathname.slice(0, 28)}…` : pathname;

  return (
    <div className="relative isolate overflow-hidden px-[var(--gutter)] pb-20 lg:pb-28">
      <div aria-hidden="true" className="theme-intro-bg pointer-events-none absolute inset-0 -z-10" />

      <p className="rise m-0 flex flex-wrap items-center justify-between gap-3 border-b border-ink py-4 font-mono text-sm text-ink">
        <span className="inline-flex items-center gap-3">
          <span className="inline-block size-[9px] rounded-full bg-destructive" aria-hidden="true" />
          {isEnglish ? "Error 404" : "Erro 404"}
        </span>
        <span className="max-w-full truncate text-muted">{pathname}</span>
      </p>

      <div className="mt-10 lg:mt-14">
        <HeroName
          as="div"
          compact
          rows={["404"]}
          label="404"
          bandRow={0}
          className="w-fit"
          specs={[
            isEnglish ? "status: 404 Not Found" : "estado: 404 Não encontrado",
            `GET ${shortPath}`,
            isEnglish ? "route: none" : "rota: nenhuma",
            "font-weight: 800",
          ]}
        />
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <h1 className="m-0 max-w-[16ch] font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.045em] text-ink">
            {t.notFound.headline}.{" "}
            <span className="home-hl">{isEnglish ? "The code is fine." : "O código está bem."}</span>
          </h1>
          <p className="m-0 mt-6 max-w-[52ch] text-lg leading-relaxed text-muted">
            {t.notFound.description}{" "}
            {isEnglish ? "Pick a path below or search the site." : "Escolha um caminho abaixo ou pesquise no site."}
          </p>

          <nav aria-label={t.notFound.navLabel} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              data-magnetic
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border-[1.5px] border-accent-ink bg-highlight px-7 font-semibold text-accent-ink no-underline transition-transform hover:scale-105"
            >
              {t.notFound.backHome} <span aria-hidden="true" className="ml-2">→</span>
            </Link>
            <button
              type="button"
              onClick={openSearch}
              className="inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-full border-[1.5px] border-ink px-7 font-semibold text-ink transition-colors hover:bg-ink hover:text-bg"
            >
              {isEnglish ? "Search the site" : "Pesquisar no site"}
              <kbd className="rounded-full border border-current/30 px-2 py-0.5 font-mono text-[11px]">Ctrl K</kbd>
            </button>
          </nav>
        </div>

        <ul className="m-0 list-none border-t-[1.5px] border-ink p-0">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="theme-row group flex items-center justify-between gap-6 border-b-[1.5px] border-ink px-3 py-5 no-underline"
              >
                <span>
                  <span className="block font-heading text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight font-semibold tracking-[-0.03em] text-ink">
                    {link.label}
                  </span>
                  <span className="block text-sm text-muted">{link.note}</span>
                </span>
                <span className="text-3xl text-ink transition-transform duration-500 group-hover:-rotate-45" aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
