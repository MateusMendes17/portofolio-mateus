"use client";

import { useLanguage } from "@/context/LanguageContext";

export function SkipLink() {
  const { t } = useLanguage();

  return (
    <a href="#main-content" className="skip-to-content">
      {t.nav.skipToContent}
    </a>
  );
}
