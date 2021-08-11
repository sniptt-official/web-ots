/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
]

async function headers() {
  return [
    {
      // Apply security headers to all routes.
      source: '/(.*)',
      headers: securityHeaders
    }
  ]
}

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Disable 'x-powered-by header from Next.js.
  headers
}

module.exports = nextConfig
