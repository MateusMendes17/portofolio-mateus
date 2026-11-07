import type { Metadata } from "next";
import { Suspense } from "react";
import { NewsletterThankYou } from "@/components/ui/NewsletterThankYou";

// Página de confirmação pós-subscrição: não interessa aos motores de pesquisa.
export const metadata: Metadata = {
  title: "Subscrição confirmada",
  robots: { index: false, follow: false },
};

export default function NewsletterObrigadoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-ink border-t-transparent" />
          </div>
        }
      >
        <NewsletterThankYou />
      </Suspense>
    </div>
  );
}
