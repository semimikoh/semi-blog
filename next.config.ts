import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
