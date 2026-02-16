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

    // Rate limiting: 100 requests per minute
    const rateLimitResult = await upstashLimit(`user-badges:${userId}`, {
      maxRequests: 100,
      windowMs: 60 * 1000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "100",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      )
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    // Fetch user's badges with badge details
    const where: {
      userId: string
      badge?: { category?: { equals: string } }
    } = { userId }

    if (category) {
      where.badge = {
        category: { equals: category.toUpperCase() },
      }
    }

    const userBadges = await prisma.userBadge.findMany({
      where,
      include: {
        badge: true,
      },
      orderBy: {
        earnedAt: "desc",
      },
    })

    // Calculate stats
    const totalPoints = userBadges.reduce((sum, ub) => sum + ub.badge.points, 0)
    const badgesByCategory = userBadges.reduce((acc, ub) => {
      const cat = ub.badge.category
      acc[cat] = (acc[cat] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const badgesByRarity = userBadges.reduce((acc, ub) => {
      const rarity = ub.badge.rarity
      acc[rarity] = (acc[rarity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Get recent badges (last 7 days)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const recentBadges = userBadges.filter(
      (ub) => new Date(ub.earnedAt) >= sevenDaysAgo
    )

    return NextResponse.json(
      {
        badges: userBadges,
        stats: {
          totalBadges: userBadges.length,
          totalPoints,
          badgesByCategory,
          badgesByRarity,
          recentBadges: recentBadges.length,
        },
      },
      {
        headers: {
          "X-RateLimit-Limit": "100",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    )
  } catch (error) {
    console.error("Error fetching user badges:", error)
    return NextResponse.json(
      { error: "Failed to fetch user badges" },
      { status: 500 }
    )
  }
}
