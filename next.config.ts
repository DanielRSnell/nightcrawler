import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  // When exporting to static, images need special handling
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for cleaner URLs in static export
  trailingSlash: true,
};

export default nextConfig;
