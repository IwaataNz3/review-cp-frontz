import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Libera as imagens dos produtos vindas da DummyJSON no next/image.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.dummyjson.com" }],
  },
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
