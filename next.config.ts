import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // O Next 16 só permite [75] por omissão e força qualquer `quality` para o
    // valor mais próximo — o hero pedia 85 e recebia 75 (mais compressão).
    qualities: [75, 85, 100],
  },
};

export default nextConfig;
