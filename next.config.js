/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'nolan.co.jp',
      },
      {
        protocol: 'https',
        hostname: 'www.briller-hair.com',
      },
      {
        protocol: 'https',
        hostname: 'shinomaru-sekkotu.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig