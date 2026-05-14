import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import { upstashLimit } from "@/lib/rate-limit-upstash"

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// GET /api/profile/check-username?username=xyz - Check if username is available
export async function GET(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limiting: 30 requests per minute per user
    const rateLimitResult = await upstashLimit(userId + ":check-username", {
      maxRequests: 30,
      windowMs: 60 * 1000,
    })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please slow down.",
          resetAt: new Date(rateLimitResult.reset).toISOString(),
        },
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

    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username || username.trim().length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters" },
        { status: 400 }
      )
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_-]+$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          error:
            "Username can only contain letters, numbers, underscores, and hyphens",
          available: false,
        },
        { status: 200 }
      )
    }

    // Check if username exists
    const existingProfile = await prisma.userProfile.findUnique({
      where: { username: username.toLowerCase() },
      select: { userId: true },
    })

    // If no profile found, username is available
    if (!existingProfile) {
      return NextResponse.json(
        { available: true, username: username.toLowerCase() },
        {
          status: 200,
          headers: {
            "X-RateLimit-Limit": "30",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      )
    }

    // If profile exists but belongs to current user, it's available for them
    if (existingProfile.userId === userId) {
      return NextResponse.json(
        { available: true, username: username.toLowerCase(), ownUsername: true },
        {
          status: 200,
          headers: {
            "X-RateLimit-Limit": "30",
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      )
    }

    // Username is taken by another user
    return NextResponse.json(
      { available: false, username: username.toLowerCase() },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "30",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    )
  } catch (error) {
    console.error("Error checking username:", error)
    return NextResponse.json(
      { error: "Failed to check username availability" },
      { status: 500 }
    )
  }
}
