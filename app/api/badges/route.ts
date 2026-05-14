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
    const rateLimitResult = await upstashLimit("badges:list", {
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
    const rarity = searchParams.get("rarity")

    // Build where clause
    const where: {
      isActive: boolean
      category?: { equals: string }
      rarity?: { equals: string }
    } = { isActive: true }

    if (category) {
      where.category = { equals: category.toUpperCase() }
    }

    if (rarity) {
      where.rarity = { equals: rarity.toUpperCase() }
    }

    // Fetch all badges
    const badges = await prisma.badge.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    })

    // Get user's earned badges
    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
    })

    const earnedBadgeIds = new Set(userBadges.map((ub) => ub.badgeId))

    // Format response
    const formattedBadges = badges.map((badge) => ({
      ...badge,
      earned: earnedBadgeIds.has(badge.id),
      earnedAt: userBadges.find((ub) => ub.badgeId === badge.id)?.earnedAt || null,
    }))

    return NextResponse.json(
      {
        badges: formattedBadges,
        total: formattedBadges.length,
        earned: userBadges.length,
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
    console.error("Error fetching badges:", error)
    return NextResponse.json(
      { error: "Failed to fetch badges" },
      { status: 500 }
    )
  }
}
