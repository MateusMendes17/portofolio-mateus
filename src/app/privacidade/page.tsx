import type { Metadata } from "next";
import { PrivacidadeView } from "@/components/views/PrivacidadeView";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Política de Privacidade",
  description: "Política de privacidade e proteção de dados pessoais de acordo com o RGPD — Mateus Mendes.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return <PrivacidadeView />;
}
