import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { AvaliadorView } from "@/components/views/AvaliadorView";

export const metadata: Metadata = pageMetadata({
  title: "Avaliador de Sites — Diagnóstico Rápido e Gratuito",
  description:
    "Analise gratuitamente o seu website e receba um relatório claro do que está bom e do que pode melhorar em segurança, SEO, mobile, acessibilidade e desempenho.",
  path: "/avaliador",
});

export default function AvaliadorPage() {
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
      <Suspense>
        <AvaliadorView />
      </Suspense>
    </>
  );
}
