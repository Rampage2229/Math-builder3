import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["example.com"],
  },
  trailingSlash: false,
};

export default nextConfig;
