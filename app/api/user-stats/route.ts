import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { checkRateLimit } from '@/lib/rate-limit';

// Singleton pattern for Prisma Client to avoid connection pool exhaustion
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting: 60 requests per minute per user
    const rateLimitResult = await checkRateLimit(userId + ':stats', {
      maxRequests: 60,
      windowMs: 60 * 1000, // 1 minute
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Too many requests. Please try again later.",
          resetAt: new Date(rateLimitResult.reset).toISOString()
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '60',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          }
        }
      );
    }

    // Try to find existing user stats
    let user = await prisma.user.findUnique({
      where: { id: userId },
      include: { stats: true },
    });

    // If user doesn't exist, create them with default stats
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: '', // Will be updated from Clerk
          stats: {
            create: {
              points: 0,
              currentStreak: 0,
              dailyGoalTarget: 100,
              dailyGoalProgress: 0,
              tasksCompleted: 0,
              tasksTotal: 0,
            },
          },
        },
        include: { stats: true },
      });
    }

    // If user exists but has no stats, create stats
    if (!user.stats) {
      await prisma.userStats.create({
        data: {
          userId: userId,
          points: 0,
          currentStreak: 0,
          dailyGoalTarget: 100,
          dailyGoalProgress: 0,
          tasksCompleted: 0,
          tasksTotal: 0,
        },
      });

      // Fetch user with stats again
      user = await prisma.user.findUnique({
        where: { id: userId },
        include: { stats: true },
      });
    }

    return NextResponse.json(
      { stats: user?.stats },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': '60',
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}
