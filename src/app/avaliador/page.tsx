import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { AvaliadorView } from "@/components/views/AvaliadorView";

export const metadata: Metadata = pageMetadata({
  title: "Avaliador de Sites — Diagnóstico Rápido e Gratuito",
  description:
    "Analise gratuitamente o seu website e receba um relatório claro do que está bom e do que pode melhorar em segurança, SEO, mobile, acessibilidade e desempenho.",
  path: "/avaliador",
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

// ?url=, ?modo=comparar e ?vs= lêem-se no servidor: a página sai completa no HTML (sem useSearchParams + Suspense).
export default async function AvaliadorPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const urlB = first(params.vs);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Avaliador de Sites — Mateus Mendes",
    url: `${SITE_URL}/avaliador`,
    description:
      "Ferramenta gratuita de auditoria automática da página inicial de websites públicos, com análise determinística de segurança, SEO, usabilidade mobile, acessibilidade e desempenho.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    author: {
      "@type": "Person",
      name: "Mateus Mendes",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <AvaliadorView
        initialUrl={first(params.url)}
        initialCompare={first(params.modo) === "comparar" || urlB !== ""}
        initialUrlB={urlB}
      />
    </>
  );
}
