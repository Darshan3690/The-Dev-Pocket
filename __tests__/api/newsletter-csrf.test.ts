// Mock Prisma globally for tests in this file to avoid real DB connections
jest.mock('@prisma/client', () => {
  class MockPrisma {
    newsletterSubscriber = {
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({ id: '123', email: 'test@example.com' }),
      update: jest.fn().mockResolvedValue({}),
    };
  }
  return { PrismaClient: MockPrisma };
});

describe('CSRF protection for /api/newsletter', () => {
  beforeAll(() => {
    process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/testdb';
  });

  afterEach(async () => {
    jest.resetModules();
    delete process.env.CSRF_PROTECTION;
    delete process.env.CSRF_PROTECTION_TOKEN;
    // Reset in-memory rate limiter state so tests are isolated
    const { __testResetRateLimit } = await import('@/lib/rate-limit');
    __testResetRateLimit();
  });

  it('POST returns 403 when CSRF token missing and protection enabled', async () => {
    process.env.CSRF_PROTECTION = 'true';
    process.env.CSRF_PROTECTION_TOKEN = 'token123';

    const { POST } = await import('@/app/api/newsletter/route');

    const req = new Request('https://example.com/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(403);
  });

  it('DELETE returns 403 when CSRF token missing and protection enabled', async () => {
    process.env.CSRF_PROTECTION = 'true';
    process.env.CSRF_PROTECTION_TOKEN = 'token123';

    // Ensure module cache is reset so mocks apply to imports
    jest.resetModules();

    // Mock Prisma to avoid DB calls
    jest.doMock('@prisma/client', () => {
      class MockPrisma {
        newsletterSubscriber = {
          findUnique: jest.fn().mockResolvedValue({ id: '1', email: 'a@b.com', status: 'active' }),
          update: jest.fn().mockResolvedValue({}),
        };
      }
      return { PrismaClient: MockPrisma };
    });

    const { DELETE } = await import('@/app/api/newsletter/route');

    const url = new URL('https://example.com/api/newsletter');
    url.searchParams.set('email', 'a@b.com');

    const req = new Request(url.toString(), { method: 'DELETE' });
    const res = await DELETE(req as any);
    expect(res.status).toBe(403);
  });

  it('allows POST/DELETE when correct token provided', async () => {
    process.env.CSRF_PROTECTION = 'true';
    process.env.CSRF_PROTECTION_TOKEN = 'token123';

    // Ensure module cache is reset so mocks apply to imports
    jest.resetModules();

    // Mock Prisma behavior
    jest.doMock('@prisma/client', () => {
      class MockPrisma {
        newsletterSubscriber = {
          findUnique: jest.fn().mockResolvedValue(null),
          create: jest.fn().mockResolvedValue({ id: '123', email: 'test@example.com' }),
          update: jest.fn().mockResolvedValue({}),
        };
      }
      return { PrismaClient: MockPrisma };
    });

    const { POST, DELETE } = await import('@/app/api/newsletter/route');

    const postReq = new Request('https://example.com/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': 'token123' },
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const postRes = await POST(postReq as any);
    expect([200, 201]).toContain(postRes.status);

    const url = new URL('https://example.com/api/newsletter');
    url.searchParams.set('email', 'test@example.com');

    const delReq = new Request(url.toString(), { method: 'DELETE', headers: { 'x-csrf-token': 'token123' } });
    const delRes = await DELETE(delReq as any);
    expect([200, 404]).toContain(delRes.status);
  });
});
