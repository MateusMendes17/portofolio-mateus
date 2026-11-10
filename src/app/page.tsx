import type { Metadata } from "next";
import { HomeView } from "@/components/views/HomeView";
import { pageMetadata } from "@/lib/seo";

// Título completo (a home é o segmento raiz, não recebe o template da marca).
export const metadata: Metadata = pageMetadata({
  // Até 60 caracteres no título e 160 na descrição (o que o Google mostra sem cortar).
  title: "Mateus Mendes — Programador Web Freelance | Sites e Lojas",
  description:
    "Websites de alto padrão, lojas online com pagamentos integrados e aplicações web à medida em Portugal. Foco em performance, design e conversão.",
  path: "/",
});

export default function Home() {
  return <HomeView />;
}
