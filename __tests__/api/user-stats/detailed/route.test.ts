import { auth } from '@clerk/nextjs/server';
import { upstashLimit } from '@/lib/rate-limit-upstash';

jest.mock('@clerk/nextjs/server', () => ({
  auth: jest.fn(),
}));

let mockPrismaClient: {
  quizAttempt: {
    findMany: jest.Mock;
  };
  bookmark: {
    findMany: jest.Mock;
  };
  userStats: {
    findUnique: jest.Mock;
  };
};

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => {
    mockPrismaClient = {
      quizAttempt: {
        findMany: jest.fn(),
      },
      bookmark: {
        findMany: jest.fn(),
      },
      userStats: {
        findUnique: jest.fn(),
      },
    };
    return mockPrismaClient;
  }),
}));

jest.mock('@/lib/rate-limit-upstash', () => ({
  upstashLimit: jest.fn(),
}));

describe('GET /api/user-stats/detailed', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 429 when the request exceeds the rate limit', async () => {
    const { GET } = await import('@/app/api/user-stats/detailed/route');

    (auth as unknown as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (upstashLimit as jest.Mock).mockResolvedValue({
      success: false,
      remaining: 0,
      reset: 1234567890,
    });

    const response = await GET();

    expect(upstashLimit).toHaveBeenCalledWith('user_123:stats:detailed', {
      maxRequests: 60,
      windowMs: 60 * 1000,
    });
    expect(response.status).toBe(429);
    expect(response.headers.get('X-RateLimit-Limit')).toBe('60');
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('0');
    expect(response.headers.get('X-RateLimit-Reset')).toBe('1234567890');
    await expect(response.json()).resolves.toMatchObject({
      error: 'Too many requests. Please slow down.',
      resetAt: new Date(1234567890).toISOString(),
    });
    expect(mockPrismaClient.quizAttempt.findMany).not.toHaveBeenCalled();
  });

  it('returns detailed stats with rate limit headers when allowed', async () => {
    const { GET } = await import('@/app/api/user-stats/detailed/route');

    (auth as unknown as jest.Mock).mockResolvedValue({ userId: 'user_123' });
    (upstashLimit as jest.Mock).mockResolvedValue({
      success: true,
      remaining: 59,
      reset: 1234567890,
    });
    mockPrismaClient.quizAttempt.findMany.mockResolvedValue([]);
    mockPrismaClient.bookmark.findMany.mockResolvedValue([]);
    mockPrismaClient.userStats.findUnique.mockResolvedValue({ currentStreak: 4 });

    const response = await GET();

    expect(response.status).toBe(200);
    expect(response.headers.get('X-RateLimit-Limit')).toBe('60');
    expect(response.headers.get('X-RateLimit-Remaining')).toBe('59');
    expect(response.headers.get('X-RateLimit-Reset')).toBe('1234567890');
    await expect(response.json()).resolves.toMatchObject({
      insights: {
        totalQuizzes: 0,
        totalBookmarks: 0,
        streakDays: 4,
      },
    });
  });
});
