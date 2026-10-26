import type { Metadata } from "next";
import { ProjetosView } from "@/components/views/ProjetosView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Projetos publicados — Estudos de caso",
  description:
    "Oito sites publicados, construídos de ponta a ponta: lojas, sites institucionais, landing pages e uma aplicação React. Marcas fictícias, decisões reais.",
  path: "/projetos",
});

export default function ProjetosPage() {
  return <ProjetosView />;
}
