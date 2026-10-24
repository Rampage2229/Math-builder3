import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: process.env.VERCEL_URL ? `/${process.env.VERCEL_URL.split('-')[0]}` : "",
  i18n: {
    locales: ["en", "ca", "es"],
    defaultLocale: "en",
  },
  output: "standalone",
};

export default nextConfig;
