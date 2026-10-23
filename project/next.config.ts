import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
      },
    ],
  },
  trailingSlash: false,
};

export default nextConfig;
