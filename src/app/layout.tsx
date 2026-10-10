import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { BackToTop } from "@/components/ui/BackToTop";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SITE_CONFIG, SITE_URL, SOCIAL_LINKS } from "@/lib/constants";
import { LanguageProvider } from "@/context/LanguageContext";
import pt from "@/content/strings/pt";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: pt.meta.siteName,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: pt.meta.siteDescription,
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_URL,
    siteName: SITE_CONFIG.name,
    title: pt.meta.siteName,
    description: pt.meta.siteDescription,
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: pt.meta.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pt.meta.siteName,
    description: pt.meta.siteDescription,
    images: ["/og-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ============================================================
   DADOS ESTRUTURADOS (JSON-LD)
   Person + WebSite + ProfessionalService — usados pelo Google
   para resultados enriquecidos e painel de conhecimento.
   O texto é sempre o PT (é o que os crawlers indexam); a troca
   PT/EN é client-side na mesma URL, por isso não há hreflang.
   ============================================================ */
const personId = `${SITE_URL}/#mateus-mendes`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_CONFIG.name,
      jobTitle: pt.meta.jobTitle,
      description: pt.meta.siteDescription,
      url: SITE_URL,
      email: `mailto:${SITE_CONFIG.email}`,
      telephone: SITE_CONFIG.phone,
      image: `${SITE_URL}/logo.jpg`,
      sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
      knowsLanguage: ["pt-PT", "en"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: pt.meta.siteName,
      description: pt.meta.siteDescription,
      inLanguage: SITE_CONFIG.locale,
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#servicos`,
      name: pt.meta.siteName,
      description: pt.services.description,
      url: SITE_URL,
      image: `${SITE_URL}/logo.jpg`,
      founder: { "@id": personId },
      areaServed: "Portugal",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: pt.services.badge,
        itemListElement: pt.services.items.map((item, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: item.title,
            description: item.tagline,
          },
        })),
      },
    },
  ],
};

/* `<` escapado impede que um valor com "</script>" feche a tag cedo. */
const structuredDataJson = JSON.stringify(structuredData).replace(/</g, "\\u003c");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-PT"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-bg text-text-primary">
        {/*
          Fallback sem JS: as animações de revelação (framer-motion) SSRam com
          opacity/transform escondidos; sem JavaScript o conteúdo ficaria
          invisível. Este <noscript> força a visibilidade nesse caso.
        */}
        <noscript>
          <style>{`.anim-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredDataJson }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>
              <a href="#main-content" className="skip-to-content">
                Saltar para o conteúdo
              </a>
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <BackToTop />
              <WhatsAppFloat />
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
        {/* Telemetria de campo (só no ambiente da Vercel; cookieless) */}
        {process.env.VERCEL && <Analytics />}
        {process.env.VERCEL && <SpeedInsights />}
      </body>
    </html>
  );
}
