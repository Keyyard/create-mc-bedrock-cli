import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
      },
    ],
    dangerouslyAllowSVG: true, // Allow SVG images from remote sources
  }, // Enable remote images from shields.io
  output: 'export', // Enable static export for Next.js 13+
};

export default nextConfig;
