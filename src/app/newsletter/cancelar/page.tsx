import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsletterUnsubscribe } from "@/components/ui/NewsletterUnsubscribe";

// Ligações pessoais com token: não devem aparecer nos motores de pesquisa.
export const metadata: Metadata = {
  title: "Cancelar newsletter",
  robots: { index: false, follow: false },
};

export default function NewsletterCancelarPage() {
  return (
    <main className="flex min-h-[60vh] flex-col">
      <Suspense>
        <NewsletterUnsubscribe />
      </Suspense>
    </main>
  );
}
