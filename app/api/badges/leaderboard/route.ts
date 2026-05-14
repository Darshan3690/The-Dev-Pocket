import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { upstashLimit } from "@/lib/rate-limit-upstash"
import { auth } from "@clerk/nextjs/server"

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limiting: 50 requests per minute
    const rateLimitResult = await upstashLimit("badges:leaderboard", {
      maxRequests: 50,
      windowMs: 60 * 1000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "50",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = Math.min(parseInt(searchParams.get("limit") || "10"), 50)
    const period = searchParams.get("period") || "all" // all, week, month

    // Calculate date filter
    let dateFilter = {}
    if (period === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      dateFilter = { earnedAt: { gte: weekAgo } }
    } else if (period === "month") {
      const monthAgo = new Date()
      monthAgo.setDate(monthAgo.getDate() - 30)
      dateFilter = { earnedAt: { gte: monthAgo } }
    }

    // Get top users by badge count and points
    const leaderboard = await prisma.userBadge.groupBy({
      by: ["userId"],
      where: dateFilter,
      _count: {
        badgeId: true,
      },
      _sum: {
        badge: {
          points: true,
        },
      },
      orderBy: [
        {
          _count: {
            badgeId: "desc",
          },
        },
      ],
      take: limit,
    })

    // Get user details and badge info
    const enrichedLeaderboard = await Promise.all(
      leaderboard.map(async (entry, index) => {
        const user = await prisma.user.findUnique({
          where: { id: entry.userId },
          select: { id: true, name: true, email: true },
        })

        // Get user's rarest badge
        const rarestBadge = await prisma.userBadge.findFirst({
          where: { userId: entry.userId },
          include: { badge: true },
          orderBy: {
            badge: {
              rarity: "desc",
            },
          },
        })

        // Get recent badges (last 3)
        const recentBadges = await prisma.userBadge.findMany({
          where: { userId: entry.userId },
          include: { badge: true },
          orderBy: { earnedAt: "desc" },
          take: 3,
        })

        return {
          rank: index + 1,
          userId: entry.userId,
          user: {
            name: user?.name || user?.email?.split("@")[0] || "Anonymous",
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.userId}`,
          },
          stats: {
            totalBadges: entry._count.badgeId,
            totalPoints: entry._sum.badge?.points || 0,
          },
          rarestBadge: rarestBadge?.badge || null,
          recentBadges: recentBadges.map((ub) => ub.badge),
        }
      })
    )

    // Get current user's rank
    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
    })

    const userStats = {
      totalBadges: userBadges.length,
      totalPoints: userBadges.reduce((sum, ub) => sum + ub.badge.points, 0),
      rank: null as number | null,
    }

    // Calculate user's rank
    const allUsers = await prisma.userBadge.groupBy({
      by: ["userId"],
      _count: { badgeId: true },
      orderBy: { _count: { badgeId: "desc" } },
    })

    const userRank = allUsers.findIndex((u) => u.userId === userId) + 1
    if (userRank > 0) {
      userStats.rank = userRank
    }

    return NextResponse.json(
      {
        leaderboard: enrichedLeaderboard,
        userStats,
        period,
      },
      {
        headers: {
          "X-RateLimit-Limit": "50",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    )
  } catch (error) {
    console.error("Error fetching badge leaderboard:", error)
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    )
  }
}
