import type { Metadata } from "next";
import { SobreView } from "@/components/views/SobreView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sobre Mim — Programador Web em Portugal",
  description:
    "Conheça o Mateus Mendes, programador web em Portugal. Descubra a stack tecnológica, metodologia de trabalho e encontre a solução ideal para o seu projeto com o assistente interativo.",
  path: "/sobre",
});

export default function SobrePage() {
  return <SobreView />;
}
