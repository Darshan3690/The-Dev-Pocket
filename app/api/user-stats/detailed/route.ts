import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

// Singleton pattern for Prisma Client
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Add rate limiting back when path resolution is fixed

    // Get user activity over the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Quiz performance data
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: {
        userId,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      include: {
        quiz: {
          include: {
            category: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // Bookmark trends
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      orderBy: { createdAt: 'asc' }
    });

    // User stats
    const userStats = await prisma.userStats.findUnique({
      where: { userId }
    });

    // Process quiz data for charts
    const quizPerformanceByDate = quizAttempts.reduce((acc: Record<string, { totalScore: number; totalPossible: number; attempts: number }>, attempt: any) => {
      const date = attempt.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { totalScore: 0, totalPossible: 0, attempts: 0 };
      }
      acc[date].totalScore += attempt.score;
      acc[date].totalPossible += attempt.total;
      acc[date].attempts += 1;
      return acc;
    }, {} as Record<string, { totalScore: number; totalPossible: number; attempts: number }>);

    const quizChartData = Object.entries(quizPerformanceByDate).map(([date, data]: [string, { totalScore: number; totalPossible: number; attempts: number }]) => ({
      date,
      averageScore: Math.round((data.totalScore / data.totalPossible) * 100),
      attempts: data.attempts
    }));

    // Process bookmark data
    const bookmarksByDate = bookmarks.reduce((acc: Record<string, number>, bookmark: any) => {
      const date = bookmark.createdAt.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const bookmarkChartData = Object.entries(bookmarksByDate).map(([date, count]) => ({
      date,
      bookmarks: count
    }));

    // Activity data (combining quizzes and bookmarks)
    const allDates = new Set([
      ...Object.keys(quizPerformanceByDate),
      ...Object.keys(bookmarksByDate)
    ]);

    const activityChartData = Array.from(allDates).sort().map(date => ({
      date,
      quizzes: quizPerformanceByDate[date]?.attempts || 0,
      bookmarks: bookmarksByDate[date] || 0,
      totalActivity: (quizPerformanceByDate[date]?.attempts || 0) + (bookmarksByDate[date] || 0)
    }));

    // Quiz performance by category
    const categoryPerformance = quizAttempts.reduce((acc: Record<string, { totalScore: number; totalPossible: number; attempts: number }>, attempt: any) => {
      const category = attempt.quiz.category.name;
      if (!acc[category]) {
        acc[category] = { totalScore: 0, totalPossible: 0, attempts: 0 };
      }
      acc[category].totalScore += attempt.score;
      acc[category].totalPossible += attempt.total;
      acc[category].attempts += 1;
      return acc;
    }, {} as Record<string, { totalScore: number; totalPossible: number; attempts: number }>);

    const categoryChartData = Object.entries(categoryPerformance).map(([category, data]: [string, { totalScore: number; totalPossible: number; attempts: number }]) => ({
      category,
      averageScore: Math.round((data.totalScore / data.totalPossible) * 100),
      attempts: data.attempts
    }));

    // Recent activity summary
    const recentQuizzes = quizAttempts.slice(-5).reverse();
    const recentBookmarks = bookmarks.slice(-5).reverse();

    const insights = {
      totalQuizzes: quizAttempts.length,
      totalBookmarks: bookmarks.length,
      averageQuizScore: quizAttempts.length > 0
        ? Math.round((quizAttempts.reduce((sum: number, a: any) => sum + a.score, 0) /
                     quizAttempts.reduce((sum: number, a: any) => sum + a.total, 0)) * 100)
        : 0,
      streakDays: userStats?.currentStreak || 0,
      mostActiveDay: activityChartData.reduce((max, day) =>
        day.totalActivity > max.totalActivity ? day : max,
        activityChartData[0] || { date: '', totalActivity: 0 }
      ),
      topCategory: categoryChartData.reduce((top, cat) =>
        cat.attempts > top.attempts ? cat : top,
        categoryChartData[0] || { category: '', attempts: 0 }
      )
    };

    return NextResponse.json({
      quizChartData,
      bookmarkChartData,
      activityChartData,
      categoryChartData,
      recentQuizzes,
      recentBookmarks,
      insights
    }, {
      status: 200
    });

  } catch (error) {
    console.error('Error fetching detailed user stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch detailed user stats' },
      { status: 500 }
    );
  }
}