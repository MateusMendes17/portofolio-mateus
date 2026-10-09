import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/* ============================================================
   robots.txt — abre o site aos crawlers e aponta para o sitemap.
   /api/ fica de fora: os endpoints não têm interesse para indexes.
   ============================================================ */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
