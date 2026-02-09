import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // For GitHub Pages with repo name, uncomment:
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
};

export default nextConfig;