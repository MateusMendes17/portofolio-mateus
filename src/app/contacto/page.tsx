import type { Metadata } from "next";
import { ContactoView } from "@/components/views/ContactoView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contacto — Orçamentos e Projetos Web",
  description:
    "Entre em contacto direto com Mateus Mendes para discutir o seu projeto de website, loja online ou aplicação web em Portugal.",
  path: "/contacto",
});

// Os parâmetros do URL (?aba=chamada) lêem-se no servidor: assim a página sai completa no HTML,
// sem o `useSearchParams` + Suspense que a deixava vazia até ao JavaScript (e fazia o rodapé saltar).
export default async function ContactoPage({ searchParams }: { searchParams: Promise<{ aba?: string }> }) {
  const { aba } = await searchParams;
  return <ContactoView initialTab={aba === "chamada" ? "chamada" : "mensagem"} />;
}
