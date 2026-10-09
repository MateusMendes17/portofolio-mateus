import type { Metadata } from "next";
import { ContactoView } from "@/components/views/ContactoView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contacto — Orçamentos e Projetos Web",
  description:
    "Entre em contacto direto com Mateus Mendes para discutir o seu projeto de website, loja online ou aplicação web em Portugal.",
  path: "/contacto",
});

export default function ContactoPage() {
  return <ContactoView />;
}
