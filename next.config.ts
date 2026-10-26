import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // O Next 16 só permite [75] por omissão e força qualquer `quality` para o
    // valor mais próximo — o hero pedia 85 e recebia 75 (mais compressão).
    qualities: [75, 85, 100],
  },
  async redirects() {
    // Os seis projetos fictícios da versão anterior foram arquivados. Os URLs
    // antigos continuam a existir para quem os tenha guardado ou indexado.
    const archivedSlugs = [
      "silva-advocacia",
      "green-harvest",
      "clinica-sorrir",
      "taskflow",
      "porto-real-estate",
      "fitlife",
    ];

    return archivedSlugs.map((slug) => ({
      source: `/projetos/${slug}`,
      destination: "/projetos",
      // O Next usa 308 para `permanent: true`; o requisito editorial é 301.
      statusCode: 301,
    }));
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
