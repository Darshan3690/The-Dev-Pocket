import { checkRateLimit as checkLimitInmem, RateLimitConfig } from '@/lib/rate-limit';

describe('In-memory rate limiter (sanity checks)', () => {
  it('should allow requests up to the limit and then block', async () => {
    process.env.RATE_LIMIT_MODE = 'INMEM';

    const key = `test:${Date.now()}`;
    const config: RateLimitConfig = { maxRequests: 3, windowMs: 1000 * 60 };

    const r1 = await checkLimitInmem(key, config);
    expect(r1.success).toBe(true);

    const r2 = await checkLimitInmem(key, config);
    expect(r2.success).toBe(true);

    const r3 = await checkLimitInmem(key, config);
    expect(r3.success).toBe(true);

    const r4 = await checkLimitInmem(key, config);
    expect(r4.success).toBe(false);
  });
});
