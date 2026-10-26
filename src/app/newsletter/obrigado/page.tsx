"use client";

import { Suspense } from "react";
import { NewsletterThankYou } from "@/components/ui/NewsletterThankYou";

export default function NewsletterObrigadoPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent" /></div>}>
        <NewsletterThankYou />
      </Suspense>
    </main>
  );
}