import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
});

const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["nextra", "nextra-theme-docs"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
      },
    ],
    dangerouslyAllowSVG: true,
    unoptimized: true,
  },
  // Only emit a static export for production builds. In dev, leaving `output`
  // unset lets Next.js's dev-mode CSS pipeline work correctly with Nextra v2.
  ...(isDev ? {} : { output: "export" }),
};

export default withNextra(nextConfig);
