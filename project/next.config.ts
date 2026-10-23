import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    appDir: true,
  },
  i18n: {
    locales: ['en', 'ca', 'es'],
    defaultLocale: 'en',
  },
  // Disable middleware locale detection since we handle it in middleware.ts
  // and want the [locale] segment approach
  skipMiddlewareUrlNormalizer: true,
};

export default nextConfig;
