const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({    
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
  },
  images: {
      domains: ["localhost:3000"]
  },
  publicExcludes: ["!robots.txt", "!static"],
  env: {
      STAGE: 'development',
      WebsiteBaseUri: 'http://localhost:3000',
      APIURI: 'http://localhost:54218',
      AUTHORITYURI: 'https://localhost:44303',
      client_id: 'postman',
      client_secret: 'postman-secret',
      CompanyName: "AuthScape",
      stripePublicKey: "",
      cookieDomain: "localhost"
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/(.*)',
        headers: [
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN'
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()'
        },
        // {
        //   key: 'Content-Security-Policy',
        //   value: "script-src 'self' unsafe-inline *.yourdomain.com localhost
        // },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        }]
      }
    ]
  },
  output: "standalone"
});