import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { BackToTop } from "@/components/ui/BackToTop";
import { SITE_CONFIG, SITE_URL } from "@/lib/constants";
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
        url: "/logo.jpg",
        width: 1024,
        height: 469,
        alt: `${SITE_CONFIG.name} — monograma MM`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pt.meta.siteName,
    description: pt.meta.siteDescription,
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

