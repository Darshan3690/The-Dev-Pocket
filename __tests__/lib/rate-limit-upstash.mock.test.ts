import { upstashLimit } from '@/lib/rate-limit-upstash';

// Ensure env vars are set for the adapter to initialize (mocked services will be used)
process.env.UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL || 'http://localhost';
process.env.UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || 'test-token';

jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('@upstash/ratelimit', () => {
  const slidingWindow = jest.fn().mockImplementation((_max: number, _win: string) => ({}));
  const Ratelimit = jest.fn().mockImplementation(() => ({
    limit: async (_id: string) => ({ success: true, remaining: 2, resetAfter: 10000 }),
  }));
  // Attach static helper
  (Ratelimit as any).slidingWindow = slidingWindow;
  return { Ratelimit };
});

describe('Upstash adapter (mocked)', () => {
  it('returns mapped rate limit result', async () => {
    const res = await upstashLimit('test-id', { maxRequests: 5, windowMs: 60 * 60 * 1000 });
    expect(res.success).toBe(true);
    expect(typeof res.remaining).toBe('number');
    expect(typeof res.reset).toBe('number');
  });
});
