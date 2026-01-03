// Mock Prisma globally for tests in this file to avoid real DB connections
jest.mock('@prisma/client', () => {
  class MockPrisma {
    contactSubmission = { create: jest.fn().mockResolvedValue({ id: 'abc' }) };
  }
  return { PrismaClient: MockPrisma };
});

describe('POST /api/contact CSRF protection', () => {
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

  it('returns 403 when CSRF_PROTECTION enabled and token missing', async () => {
    process.env.CSRF_PROTECTION = 'true';
    process.env.CSRF_PROTECTION_TOKEN = 'supersecret';

    const { POST } = await import('@/app/api/contact/route');

    const req = new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A', email: 'a@b.com', message: 'hi' }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toMatch(/CSRF/i);
  });

  it('allows request when CSRF_PROTECTION enabled and correct token present', async () => {
    process.env.CSRF_PROTECTION = 'true';
    process.env.CSRF_PROTECTION_TOKEN = 'supersecret';

    // Ensure module cache is reset so mocks apply to imports
    jest.resetModules();

    // Mock Prisma to avoid DB calls
    jest.doMock('@prisma/client', () => {
      class MockPrisma {
        contactSubmission = { create: jest.fn().mockResolvedValue({ id: 'abc' }) };
      }
      return { PrismaClient: MockPrisma };
    });

    const { POST } = await import('@/app/api/contact/route');

    const req = new Request('https://example.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-token': 'supersecret' },
      body: JSON.stringify({ name: 'A', email: 'a@b.com', message: 'hi' }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
