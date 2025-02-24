import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'i.scdn.co',
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      '@spotify/web-api-ts-sdk',
      '@spotify/web-api-ts-sdk/types',
      '@chakra-ui/react',
    ],
  },
};

export default nextConfig;
