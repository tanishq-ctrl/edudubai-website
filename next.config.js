/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.in',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // Old Google Sites redirects
      {
        source: '/study-abroad',
        destination: '/',
        permanent: true,
      },
      {
        source: '/training',
        destination: '/corporate-training',
        permanent: true,
      },
      {
        source: '/about-edu-dubai',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/entrance-test-preparation',
        destination: '/courses',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

