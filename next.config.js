/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/projects', destination: '/work', permanent: true },
      { source: '/articles', destination: '/research', permanent: true },
      { source: '/high-desert', destination: 'https://steppe.community', permanent: true },
      { source: '/steppe', destination: 'https://steppe.community', permanent: false },
      { source: '/educloud.html', destination: '/educloud', permanent: true },
      { source: '/high-desert.html', destination: 'https://steppe.community', permanent: true },
      { source: '/Form/contact.html', destination: '/contact', permanent: true },
    ]
  },
}

module.exports = nextConfig
