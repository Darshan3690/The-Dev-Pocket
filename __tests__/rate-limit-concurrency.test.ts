import { checkRateLimit } from '@/lib/rate-limit';

describe('in-memory rate limiter concurrency', () => {
  it('should not allow more than maxRequests when called concurrently', async () => {
    const key = `test-concurrency:${Date.now()}:${Math.random()}`;
    const config = { maxRequests: 3, windowMs: 60 * 1000 };

    // Fire many concurrent calls
    const attempts = Array.from({ length: 10 }).map(() => checkRateLimit(key, config));
    const results = await Promise.all(attempts);

    const successCount = results.filter(r => r.success).length;

    expect(successCount).toBeLessThanOrEqual(config.maxRequests);
    expect(results.filter(r => !r.success).length).toBeGreaterThanOrEqual(7);
  });
});
