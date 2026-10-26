import type { Metadata } from "next";
import { SITE_CONFIG, SITE_URL } from "./constants";
import pt from "@/content/strings/pt";

/* ============================================================
   Helper de metadata por página.

   Porque o Next faz um merge **raso** da metadata entre segmentos
   (os campos duplicados do filho substituem os do layout), cada
   página tem de compor a `openGraph`/`twitter` completa — caso
   contrário, todos os links partilhados nas redes sociais mostrariam
   o título e a descrição da home.

   O `title` recebido aqui é SEM o sufixo de marca: o root layout
   aplica sozinho o template "` | Mateus Mendes`" às páginas filhas.
   ============================================================ */

interface PageSeoImage {
  /** Caminho público (/og-cover.jpg) ou URL absoluto. */
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface PageSeo {
  /** Título da página, sem a marca no fim. */
  title: string;
  description: string;
  /** Caminho a partir da raiz, ex.: "/sobre" ("/" para a home). */
  path: string;
  /** Imagem de partilha; por omissão usa a capa genérica do site. */
  image?: PageSeoImage;
}

export function pageMetadata({ title, description, path, image }: PageSeo): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/+$/, "");
  const url = `${SITE_URL}${canonical === "/" ? "" : canonical}`;
  const shareImage = image ?? {
    url: "/og-cover.jpg",
    width: 1200,
    height: 630,
    alt: pt.meta.ogImageAlt,
  };
  const shareImageUrl = shareImage.url.startsWith("http")
    ? shareImage.url
    : `${SITE_URL}${shareImage.url}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: shareImageUrl,
          width: shareImage.width,
          height: shareImage.height,
          alt: shareImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImageUrl],
    },
  };
}
