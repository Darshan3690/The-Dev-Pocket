import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import validateEnv from './lib/env';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about(.*)',
  '/contact(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/faq(.*)',
  '/practice-hub(.*)',
  '/job(.*)',
  '/shortcuts(.*)',
  '/privacy(.*)',
  '/terms(.*)',
  '/resources(.*)',
  '/search(.*)',
  '/feedback(.*)',
  '/web-dev(.*)',
  '/career-guidance(.*)',
  '/create-roadmap(.*)',
  '/loading-demo(.*)',
  '/toast-demo(.*)',
  '/profile(.*)',
])

export function buildCsp(): string {
  const cspOverride = process.env.CONTENT_SECURITY_POLICY?.trim();

  if (cspOverride) {
    return cspOverride.replace(/[\r\n]+/g, ' ').replace(/\s{2,}/g, ' ');
  }

  const isDev = process.env.NODE_ENV !== 'production';
  const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;
  const clerkFrontendApiHost = clerkFrontendApi ? `https://${clerkFrontendApi}` : null;

  const scriptSrc = [
    "'self'",
    "'unsafe-inline'", // Required by next-themes bootstrap script unless nonce/hash is added
    'https://js.clerk.com',
    'https://*.clerk.accounts.dev',
    ...(clerkFrontendApiHost ? [clerkFrontendApiHost] : []),
    ...(isDev ? ["'unsafe-eval'"] : []),
  ];

  const styleSrc = [
    "'self'",
    "'unsafe-inline'", // Required by several component libraries and Clerk widgets
    'https://fonts.googleapis.com',
  ];

  const connectSrc = [
    "'self'",
    'https://api.clerk.com',
    'https://clerk.com',
    'https://*.clerk.accounts.dev',
    ...(clerkFrontendApiHost ? [clerkFrontendApiHost] : []),
    ...(isDev ? ['ws:', 'wss:'] : []),
  ];

  const frameSrc = [
    "'self'",
    'https://clerk.com',
    'https://*.clerk.accounts.dev',
  ];

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    `script-src ${scriptSrc.join(' ')}`,
    `style-src ${styleSrc.join(' ')}`,
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src ${connectSrc.join(' ')}`,
    `frame-src ${frameSrc.join(' ')}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    ...(isDev ? [] : ['upgrade-insecure-requests']),
  ];

  return directives.join('; ');
}

const contentSecurityPolicy = buildCsp();
export const crossOriginOpenerPolicy = 'same-origin';

function applySecurityHeaders(response: Response): Response {
  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Permissions-Policy', 'accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), microphone=(), midi=(), payment=(), usb=()');
  response.headers.set('Cross-Origin-Opener-Policy', crossOriginOpenerPolicy);
  response.headers.set('Cross-Origin-Resource-Policy', 'same-site');
  response.headers.set('X-DNS-Prefetch-Control', 'off');

  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  return response;
}

// Validate environment early in non-test runtimes so misconfiguration fails fast
if (process.env.NODE_ENV !== 'test') validateEnv();

export default clerkMiddleware(async (auth, req) => {
  // Skip auth check if using dummy keys (CI environment)
  if (process.env.CLERK_SECRET_KEY === 'dummy') {
    return applySecurityHeaders(NextResponse.next());
  }
  
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  return applySecurityHeaders(NextResponse.next());
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};