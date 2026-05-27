/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/projects', destination: '/work', permanent: true },
      { source: '/articles', destination: '/research', permanent: true },
      { source: '/high-desert', destination: '/work', permanent: false },
    ]
  },
}

module.exports = nextConfig
