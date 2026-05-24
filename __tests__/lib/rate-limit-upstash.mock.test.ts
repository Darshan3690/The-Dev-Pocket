const mockLimit = jest.fn();

jest.mock('@upstash/redis', () => ({
  Redis: jest.fn().mockImplementation((config: { url: string; token: string }) => ({
    config,
  })),
}));

jest.mock('@upstash/ratelimit', () => {
  const slidingWindow = jest.fn((tokens: number, window: string) => ({
    tokens,
    window,
  }));

  const Ratelimit = jest.fn().mockImplementation((config: unknown) => ({
    config,
    limit: mockLimit,
  }));

  Object.assign(Ratelimit, { slidingWindow });

  return { Ratelimit };
});

import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { __resetUpstashLimitCacheForTests, upstashLimit } from '../../lib/rate-limit-upstash';

const mockRatelimit = Ratelimit as unknown as jest.Mock;
const mockSlidingWindow = Ratelimit.slidingWindow as unknown as jest.Mock;
const mockRedis = Redis as unknown as jest.Mock;

describe('Upstash adapter (mocked)', () => {
  const originalUrl = process.env.UPSTASH_REDIS_REST_URL;
  const originalToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  beforeEach(() => {
    jest.clearAllMocks();
    __resetUpstashLimitCacheForTests();
    process.env.UPSTASH_REDIS_REST_URL = 'https://upstash.example';
    process.env.UPSTASH_REDIS_REST_TOKEN = 'test-token';
    mockLimit.mockResolvedValue({
      success: true,
      remaining: 2,
      reset: 1234567890,
    });
  });

  afterAll(() => {
    if (originalUrl === undefined) {
      delete process.env.UPSTASH_REDIS_REST_URL;
    } else {
      process.env.UPSTASH_REDIS_REST_URL = originalUrl;
    }

    if (originalToken === undefined) {
      delete process.env.UPSTASH_REDIS_REST_TOKEN;
    } else {
      process.env.UPSTASH_REDIS_REST_TOKEN = originalToken;
    }
  });

  it('initializes the Upstash SDK with a limiter algorithm', async () => {
    const res = await upstashLimit('test-id', { maxRequests: 5, windowMs: 60 * 60 * 1000 });

    expect(res).toEqual({
      success: true,
      remaining: 2,
      reset: 1234567890,
    });
    expect(mockRedis).toHaveBeenCalledWith({
      url: 'https://upstash.example',
      token: 'test-token',
    });
    expect(mockSlidingWindow).toHaveBeenCalledWith(5, '3600 s');

    const constructorConfig = mockRatelimit.mock.calls[0][0];
    expect(constructorConfig).toMatchObject({
      redis: expect.objectContaining({
        config: {
          url: 'https://upstash.example',
          token: 'test-token',
        },
      }),
      limiter: { tokens: 5, window: '3600 s' },
    });
    expect(constructorConfig).not.toHaveProperty('slidingWindow');
    expect(constructorConfig).not.toHaveProperty('limit');
  });

  it('reuses the limiter for the same policy without crashing', async () => {
    await upstashLimit('first-id', { maxRequests: 5, windowMs: 60 * 60 * 1000 });
    await upstashLimit('second-id', { maxRequests: 5, windowMs: 60 * 60 * 1000 });

    expect(mockRatelimit).toHaveBeenCalledTimes(1);
    expect(mockSlidingWindow).toHaveBeenCalledTimes(1);
    expect(mockLimit).toHaveBeenNthCalledWith(1, 'first-id');
    expect(mockLimit).toHaveBeenNthCalledWith(2, 'second-id');
  });

  it('caches independent limiters for different policies', async () => {
    await upstashLimit('newsletter-id', { maxRequests: 3, windowMs: 60 * 60 * 1000 });
    await upstashLimit('contact-id', { maxRequests: 5, windowMs: 60 * 60 * 1000 });
    await upstashLimit('stats-id', { maxRequests: 60, windowMs: 60 * 1000 });
    await upstashLimit('newsletter-id-again', { maxRequests: 3, windowMs: 60 * 60 * 1000 });

    expect(mockRatelimit).toHaveBeenCalledTimes(3);
    expect(mockSlidingWindow).toHaveBeenNthCalledWith(1, 3, '3600 s');
    expect(mockSlidingWindow).toHaveBeenNthCalledWith(2, 5, '3600 s');
    expect(mockSlidingWindow).toHaveBeenNthCalledWith(3, 60, '60 s');
  });

  it('throws a descriptive error when Upstash credentials are missing', async () => {
    delete process.env.UPSTASH_REDIS_REST_URL;

    await expect(
      upstashLimit('test-id', { maxRequests: 5, windowMs: 60 * 60 * 1000 })
    ).rejects.toThrow('Missing Upstash configuration');
  });
});
