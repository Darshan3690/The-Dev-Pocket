import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { upstashLimit } from "@/lib/rate-limit-upstash"
import { auth } from "@clerk/nextjs/server"
import { BadgeChecker } from "@/lib/badge-checker"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limiting: 30 requests per minute (more strict for write operations)
    const rateLimitResult = await upstashLimit(`badges:check:${userId}`, {
      maxRequests: 30,
      windowMs: 60 * 1000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": "30",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      )
    }

    // Parse request body
    const body = await request.json()
    const { action, data } = body

    // Initialize badge checker
    const checker = new BadgeChecker(prisma)

    let results

    switch (action) {
      case "QUIZ_COMPLETED":
        if (!data?.quizId || data?.score === undefined || !data?.total) {
          return NextResponse.json(
            { error: "Missing quiz data (quizId, score, total required)" },
            { status: 400 }
          )
        }
        results = await checker.checkQuizBadges(userId, {
          quizId: data.quizId,
          score: data.score,
          total: data.total,
        })
        break

      case "STREAK_CHECK":
        results = await checker.checkStreakBadges(userId)
        break

      case "RESOURCE_VIEWED":
        if (!data?.resourceId) {
          return NextResponse.json(
            { error: "Missing resourceId" },
            { status: 400 }
          )
        }
        results = await checker.checkResourceBadges(userId, data.resourceId)
        break

      case "DAILY_GOAL_COMPLETED":
        results = await checker.checkDailyGoalBadges(userId)
        break

      case "WELCOME":
        const welcomeResult = await checker.awardWelcomeBadge(userId)
        results = [welcomeResult]
        break

      default:
        return NextResponse.json(
          { error: "Invalid action. Valid actions: QUIZ_COMPLETED, STREAK_CHECK, RESOURCE_VIEWED, DAILY_GOAL_COMPLETED, WELCOME" },
          { status: 400 }
        )
    }

    // Filter successful awards
    const awardedBadges = results.filter((r) => r.awarded && r.badge)

    return NextResponse.json(
      {
        success: true,
        awarded: awardedBadges.length > 0,
        badges: awardedBadges.map((r) => r.badge),
        totalChecked: results.length,
      },
      {
        headers: {
          "X-RateLimit-Limit": "30",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    )
  } catch (error) {
    console.error("Error checking badges:", error)
    return NextResponse.json(
      { error: "Failed to check badges" },
      { status: 500 }
    )
  }
}
