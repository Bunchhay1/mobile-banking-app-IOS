/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/banking/:path*',
        destination: 'http://localhost:8080/api/:path*'
      },
      {
        source: '/api/notifications/:path*',
        destination: 'http://localhost:8084/api/:path*'
      },
      {
        source: '/api/promotions/:path*',
        destination: 'http://localhost:8083/api/:path*'
      },
      {
        source: '/api/ai/:path*',
        destination: 'http://localhost:50051/:path*'
      },
      {
        source: '/api/gateway/:path*',
        destination: 'http://localhost:8000/:path*'
      }
    ]
  }
}

module.exports = nextConfig
