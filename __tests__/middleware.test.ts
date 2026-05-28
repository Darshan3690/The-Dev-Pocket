jest.mock('@clerk/nextjs/server', () => ({
  clerkMiddleware: jest.fn((handler) => handler),
  createRouteMatcher: jest.fn(() => () => false),
}));

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => ({ headers: new Headers() })),
  },
}), { virtual: true });

import { buildCsp, crossOriginOpenerPolicy } from '@/middleware';

describe('buildCsp', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('normalizes multi-line CSP overrides into a single header-safe line', () => {
    process.env.CONTENT_SECURITY_POLICY = `default-src 'self';
script-src 'self' https://example.com;
connect-src 'self' https://api.example.com`;

    expect(buildCsp()).toBe(
      "default-src 'self'; script-src 'self' https://example.com; connect-src 'self' https://api.example.com",
    );
  });

  it('allows websocket connections in development CSP', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.CONTENT_SECURITY_POLICY;
    delete process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

    expect(buildCsp()).toContain(
      "connect-src 'self' https://api.clerk.com https://clerk.com https://*.clerk.accounts.dev ws: wss:",
    );
  });

  it('hardens COOP to same-origin', () => {
    expect(crossOriginOpenerPolicy).toBe('same-origin');
  });
});