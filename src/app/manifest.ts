import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import pt from "@/content/strings/pt";

/**
 * Web Manifest — identidade da app ao "adicionar ao ecrã inicial" no telemóvel.
 * Os ícones (icon-192 / icon-512) são gerados a partir da monograma MM e
 * viven em `/public`.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: pt.meta.siteName,
    short_name: SITE_CONFIG.name,
    description: pt.meta.siteDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#1C1816",
    theme_color: "#1C1816",
    lang: SITE_CONFIG.locale,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
