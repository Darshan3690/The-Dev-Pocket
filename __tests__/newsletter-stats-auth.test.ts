// Mock @prisma/client globally in these tests so module imports don't attempt real DB connections
jest.mock('@prisma/client', () => {
  class MockPrisma {
    newsletterSubscriber = {
      count: jest.fn().mockResolvedValue(2),
      findMany: jest.fn().mockResolvedValue([]),
    };
  }
  return { PrismaClient: MockPrisma };
});

describe('GET /api/newsletter/stats authentication', () => {
  beforeAll(() => {
    // Ensure DATABASE_URL is set so Prisma doesn't throw validation errors during client init (mock prevents real calls)
    process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/testdb';
  });

  afterEach(() => {
    jest.resetModules();
    delete process.env.NEWSLETTER_STATS_TOKEN;
  });

  it('returns 401 when NEWSLETTER_STATS_TOKEN is set and header not provided', async () => {
    process.env.NEWSLETTER_STATS_TOKEN = 'supersecret';

    // Import route after setting env and without mocking prisma (should not be reached)
    const { GET } = await import('@/app/api/newsletter/route');

    const res = await GET(new Request('https://example.com'));
    const json = await res.json();
    expect(res.status).toBe(401);
    expect(json.error).toBe('Unauthorized');
  });

  it('allows access when correct token is provided', async () => {
    process.env.NEWSLETTER_STATS_TOKEN = 'supersecret';

    // Ensure modules are reset so mocks are applied at import time
    jest.resetModules();

    // Mock Prisma before importing the route so the module-level prisma uses our mock
    jest.doMock('@prisma/client', () => {
      class MockPrisma {
        newsletterSubscriber = {
          count: jest.fn().mockResolvedValue(2),
          findMany: jest.fn().mockResolvedValue([]),
        };
      }
      return { PrismaClient: MockPrisma };
    });

    const { GET } = await import('@/app/api/newsletter/route');

    const req = new Request('https://example.com', { headers: { 'x-admin-token': 'supersecret' } });
    const res = await GET(req);

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.stats).toBeDefined();
  });
});
