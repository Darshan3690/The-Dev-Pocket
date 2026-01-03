import { __testResetRateLimit } from '@/lib/rate-limit';

// Mock Prisma client used in route (shared across imports so tests can set expectations)
const sharedNewsletterSubscriber = {
  findUnique: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  count: jest.fn(),
  findMany: jest.fn(),
};

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      newsletterSubscriber: sharedNewsletterSubscriber,
    })),
  };
});

const makeRequest = (body: object) => {
  return {
    json: async () => body,
    headers: { get: jest.fn(() => undefined) },
    url: 'http://localhost/api/newsletter',
  } as unknown as Request;
};


describe('POST /api/newsletter', () => {
  beforeEach(() => {
    // Reset in-memory rate limiting state between tests
    __testResetRateLimit();

    // Reset mocks
    jest.resetModules();
    const { PrismaClient } = require('@prisma/client');
    const client = new PrismaClient();
    client.newsletterSubscriber.findUnique.mockReset();
    client.newsletterSubscriber.create.mockReset();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('returns 201 and rate limit headers on subscribe', async () => {
    const { POST } = await import('@/app/api/newsletter/route');

    const { PrismaClient } = require('@prisma/client');
    const client = new PrismaClient();
    client.newsletterSubscriber.findUnique.mockResolvedValue(null);
    client.newsletterSubscriber.create.mockResolvedValue({ id: 'sub_1', email: 'a@example.com' });

    const req = makeRequest({ email: 'a@example.com', name: 'Alice' });

    const res = await POST(req as any);
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.message).toMatch(/Successfully subscribed/);
    expect(res.headers.get('X-RateLimit-Limit')).toBe('3');
    expect(res.headers.get('X-RateLimit-Remaining')).toBe('2');
    expect(res.headers.get('X-RateLimit-Reset')).toBeDefined();
  });

  it('enforces rate limit after 3 requests', async () => {
    const { POST } = await import('@/app/api/newsletter/route');

    const { PrismaClient } = require('@prisma/client');
    const client = new PrismaClient();
    client.newsletterSubscriber.findUnique.mockResolvedValue(null);
    client.newsletterSubscriber.create.mockResolvedValue({ id: 'sub', email: 'x@example.com' });

    // Make 3 allowed requests
    for (let i = 0; i < 3; i++) {
      const req = makeRequest({ email: `user${i}@example.com` });
      const res = await POST(req as any);
      expect(res.status === 201 || res.status === 200).toBeTruthy();
    }

    // Fourth request should be rate limited
    const req4 = makeRequest({ email: 'blocked@example.com' });
    const res4 = await POST(req4 as any);
    const body4 = await res4.json();

    expect(res4.status).toBe(429);
    expect(body4.error).toMatch(/Too many requests/);
    expect(res4.headers.get('X-RateLimit-Limit')).toBe('3');
    expect(res4.headers.get('X-RateLimit-Remaining')).toBe('0');
  });

  it('returns 400 for invalid email', async () => {
    const { POST } = await import('@/app/api/newsletter/route');

    const req = makeRequest({ email: 'not-an-email' });
    const res = await POST(req as any);
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toMatch(/Valid email is required/);
  });



});
