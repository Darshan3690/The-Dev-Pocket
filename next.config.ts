import type { NextConfig } from "next";

/**
 * Security headers are opt-in via the `SECURITY_HEADERS` environment variable.
 * - Set `SECURITY_HEADERS=true` to enable the default headers.
 * - Override `CONTENT_SECURITY_POLICY` to customize CSP.
 */

export function generateSecurityHeaders() {
  const enabled = process.env.SECURITY_HEADERS === 'true';
  if (!enabled) return [];

  // Default Content Security Policy - conservative and can be overridden
  const defaultCSP = process.env.CONTENT_SECURITY_POLICY || "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https:; frame-ancestors 'self';";

  return [
    { key: 'Content-Security-Policy', value: defaultCSP },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'Permissions-Policy', value: "camera=(), microphone=(), geolocation=()" },
  ];
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: generateSecurityHeaders(),
      },
    ];
  },
};

export default nextConfig;
