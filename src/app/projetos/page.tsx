import type { Metadata } from "next";
import { ProjetosView } from "@/components/views/ProjetosView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Portfólio & Trabalhos de Desenvolvimento Web",
  description:
    "Explore projetos selecionados de websites institucionais, e-commerce, landing pages de alta conversão e aplicações web desenvolvidos à medida.",
  path: "/projetos",
});

export default function ProjetosPage() {
  return <ProjetosView />;
}
