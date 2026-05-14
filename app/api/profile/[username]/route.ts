import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

// GET /api/profile/[username] - Get public profile by username
export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      )
    }

    // Get profile with user data
    const profile = await prisma.userProfile.findUnique({
      where: { username: username.toLowerCase() },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            stats: true,
            badges: {
              include: {
                badge: true,
              },
              orderBy: {
                earnedAt: "desc",
              },
            },
          },
        },
      },
    })

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      )
    }

    // Check if profile is public
    if (!profile.isPublic) {
      return NextResponse.json(
        { error: "This profile is private" },
        { status: 403 }
      )
    }

    // Format the response
    const publicProfile = {
      username: profile.username,
      name: profile.user.name,
      bio: profile.bio,
      avatar: profile.avatar,
      skills: profile.skills,
      socialLinks: profile.socialLinks,
      location: profile.location,
      title: profile.title,
      badges: profile.user.badges.map((userBadge) => ({
        id: userBadge.badge.id,
        name: userBadge.badge.name,
        description: userBadge.badge.description,
        icon: userBadge.badge.icon,
        category: userBadge.badge.category,
        rarity: userBadge.badge.rarity,
        points: userBadge.badge.points,
        earnedAt: userBadge.earnedAt.toISOString(),
      })),
      stats: profile.user.stats
        ? {
            points: profile.user.stats.points,
            currentStreak: profile.user.stats.currentStreak,
            tasksCompleted: profile.user.stats.tasksCompleted,
            tasksTotal: profile.user.stats.tasksTotal,
          }
        : null,
    }

    return NextResponse.json({ profile: publicProfile }, { status: 200 })
  } catch (error) {
    console.error("Error fetching public profile:", error)
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    )
  }
}
