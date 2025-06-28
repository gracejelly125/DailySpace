/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ognergsumubgxomxyped.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
