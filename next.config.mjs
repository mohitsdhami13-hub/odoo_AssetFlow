/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  env: {
    // Automatically derive AUTH_URL from Vercel's own VERCEL_URL at build time.
    // This means AUTH_URL and AUTH_TRUST_HOST don't need to be manually set
    // in the Vercel dashboard — they're always available at runtime.
    AUTH_URL: process.env.AUTH_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST || '1',
  },
};

export default nextConfig;
