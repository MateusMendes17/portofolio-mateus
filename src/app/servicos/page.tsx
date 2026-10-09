import type { Metadata } from "next";
import { ServicosView } from "@/components/views/ServicosView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Serviços de Desenvolvimento Web em Portugal",
  description:
    "Serviços especializados em websites institucionais, landing pages de alta conversão, lojas online e web apps em Portugal. Código limpo, SEO de raiz e máxima autoridade digital.",
  path: "/servicos",
});

export default function ServicosPage() {
  return <ServicosView />;
}
