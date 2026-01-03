import { upstashLimit } from '@/lib/rate-limit-upstash';

jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation(() => ({})),
}));

jest.mock('@upstash/ratelimit', () => ({
  Ratelimit: jest.fn().mockImplementation(() => ({
    limit: async (id: string) => ({ success: true, remaining: 2, resetAfter: 10000 }),
  })),
  slidingWindow: jest.fn().mockImplementation((max: number, win: string) => ({})),
}));

describe('Upstash adapter (mocked)', () => {
  it('returns mapped rate limit result', async () => {
    const res = await upstashLimit('test-id', { maxRequests: 5, windowMs: 60 * 60 * 1000 });
    expect(res.success).toBe(true);
    expect(typeof res.remaining).toBe('number');
    expect(typeof res.reset).toBe('number');
  });
});
