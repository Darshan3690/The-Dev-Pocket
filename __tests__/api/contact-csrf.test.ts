describe('POST /api/contact CSRF protection', () => {
  afterEach(() => {
    jest.resetModules();
    delete process.env.CSRF_PROTECTION;
    delete process.env.CSRF_PROTECTION_TOKEN;
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
