import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";
import { pageMetadata } from "@/lib/seo";

// Título completo (a home é o segmento raiz, não recebe o template da marca).
export const metadata: Metadata = pageMetadata({
  title: "Mateus Mendes — Desenvolvedor Web Freelance | Websites & E-Commerce",
  description:
    "Desenvolvimento de websites de alto padrão, lojas online com pagamentos integrados e aplicações web à medida em Portugal. Foco em performance, design e conversão.",
  path: "/",
});

export default function Home() {
  return <HomeView />;
}
