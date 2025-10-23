import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    return NextResponse.json({ stats: user?.stats });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}
