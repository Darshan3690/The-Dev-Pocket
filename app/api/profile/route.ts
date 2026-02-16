import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import { upstashLimit } from "@/lib/rate-limit-upstash"

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// GET /api/profile - Get current user's profile
export async function GET() {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limiting: 60 requests per minute per user
    const rateLimitResult = await upstashLimit(userId + ":profile", {
      maxRequests: 60,
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
            "X-RateLimit-Limit": "60",
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimitResult.reset.toString(),
          },
        }
      )
    }

    // Get user with profile
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(
      { profile: user.profile },
      {
        status: 200,
        headers: {
          "X-RateLimit-Limit": "60",
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.reset.toString(),
        },
      }
    )
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}

// POST /api/profile - Create or update current user's profile
export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Rate limiting: 30 requests per minute per user for updates
    const rateLimitResult = await upstashLimit(userId + ":profile:update", {
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

    const body = await request.json()
    const {
      username,
      bio,
      avatar,
      skills,
      socialLinks,
      isPublic,
      location,
      title,
    } = body

    // Validate required fields
    if (!username || username.trim().length < 3) {
      return NextResponse.json(
        { error: "Username must be at least 3 characters" },
        { status: 400 }
      )
    }

    // Validate username format (alphanumeric, underscores, hyphens only)
    const usernameRegex = /^[a-zA-Z0-9_-]+$/
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          error:
            "Username can only contain letters, numbers, underscores, and hyphens",
        },
        { status: 400 }
      )
    }

    // Check if username is already taken by another user
    const existingProfile = await prisma.userProfile.findUnique({
      where: { username: username.toLowerCase() },
    })

    if (existingProfile && existingProfile.userId !== userId) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 409 }
      )
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: "", // Will be updated from Clerk
        },
      })
    }

    // Upsert profile
    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: {
        username: username.toLowerCase(),
        bio: bio || null,
        avatar: avatar || null,
        skills: skills || [],
        socialLinks: socialLinks || {},
        isPublic: isPublic !== undefined ? isPublic : true,
        location: location || null,
        title: title || null,
      },
      create: {
        userId,
        username: username.toLowerCase(),
        bio: bio || null,
        avatar: avatar || null,
        skills: skills || [],
        socialLinks: socialLinks || {},
        isPublic: isPublic !== undefined ? isPublic : true,
        location: location || null,
        title: title || null,
      },
    })

    return NextResponse.json(
      { profile },
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
    console.error("Error updating profile:", error)
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    )
  }
}
