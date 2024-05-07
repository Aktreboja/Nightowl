/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/image/*',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        pathname: '/**/*',
      },
      {
        protocol: 'https',
        hostname: '**.spotifycdn.com',
        pathname: '/**/*',
      },
    ],
  },
};

module.exports = nextConfig;
