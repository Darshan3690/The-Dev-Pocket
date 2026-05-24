import type { NextRequest } from 'next/server';
import { upstashLimit } from '@/lib/rate-limit-upstash';

let mockCreateContactSubmission = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => {
    mockCreateContactSubmission = jest.fn();
    return {
      contactSubmission: {
        create: mockCreateContactSubmission,
      },
    };
  }),
}));

jest.mock('@/lib/rate-limit-upstash', () => ({
  getClientIP: jest.fn(() => '127.0.0.1'),
  upstashLimit: jest.fn(),
}));

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 429 and skips database writes when the rate limit is exceeded', async () => {
    const { POST } = await import('@/app/api/contact/route');

    (upstashLimit as jest.Mock).mockResolvedValue({
      success: false,
      remaining: 0,
      reset: 1234567890,
    });

    const request = new Request('http://localhost/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: 'Verification',
        email: 'verification@example.com',
        message: 'Verify rate limiter',
      }),
    }) as unknown as NextRequest;

    const response = await POST(request);

    expect(upstashLimit).toHaveBeenCalledWith('127.0.0.1:contact', {
      maxRequests: 5,
      windowMs: 60 * 60 * 1000,
    });
    expect(response.status).toBe(429);
    expect(response.headers.get('X-RateLimit-Limit')).toBe('5');
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0');
    expect(response.headers.get('X-RateLimit-Reset')).toBe('1234567890');
    await expect(response.json()).resolves.toMatchObject({
      error: 'Too many requests. Please try again later.',
      resetAt: new Date(1234567890).toISOString(),
    });
    expect(mockCreateContactSubmission).not.toHaveBeenCalled();
  });
});
