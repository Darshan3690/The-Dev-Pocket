import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Briefcase, ArrowLeft, Trophy, Award, Target, Zap } from "lucide-react"
import { PrismaClient } from "@prisma/client"
import BadgeGrid from "@/components/badges/BadgeGrid"

const globalForPrisma = global as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

interface ProfilePageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params
  
  try {
    const profile = await prisma.userProfile.findUnique({
      where: { username: username.toLowerCase() },
      include: { user: { select: { name: true } } },
    })

    if (!profile || !profile.isPublic) {
      return {
        title: "Profile Not Found | DevPocket",
      }
    }

    return {
      title: `${profile.user.name || profile.username}'s Profile | DevPocket`,
      description: profile.bio || `Check out ${profile.user.name || profile.username}'s learning journey on DevPocket`,
    }
  } catch {
    return {
      title: "Profile | DevPocket",
    }
  }
}

export default async function PublicProfilePage({ params }: ProfilePageProps) {
  const { username } = await params

  try {
    // Get profile with all related data
    const profile = await prisma.userProfile.findUnique({
      where: { username: username.toLowerCase() },
      include: {
        user: {
          select: {
            id: true,
            name: true,
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

    // Handle private or non-existent profiles
    if (!profile || !profile.isPublic) {
      notFound()
    }

    // Format badges for the BadgeGrid component
    const formattedBadges = profile.user.badges.map((userBadge) => ({
      id: userBadge.badge.id,
      name: userBadge.badge.name,
      description: userBadge.badge.description,
      icon: userBadge.badge.icon,
      category: userBadge.badge.category,
      rarity: userBadge.badge.rarity,
      points: userBadge.badge.points,
      earned: true,
      earnedAt: userBadge.earnedAt.toISOString(),
    }))

    // Get recent badges (last 3)
    const recentBadges = formattedBadges.slice(0, 3)

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Profile Info */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden sticky top-8">
                {/* Cover */}
                <div className="h-32 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600" />

                <div className="px-6 pb-6">
                  {/* Avatar */}
                  <div className="relative -mt-16 mb-4">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-700 shadow-lg">
                      {profile.avatar ? (
                        <Image
                          src={profile.avatar}
                          alt={profile.user.name || profile.username}
                          width={128}
                          height={128}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900 dark:to-purple-900">
                          <span className="text-4xl">👤</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="mb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {profile.user.name || profile.username}
                    </h1>
                    {profile.title && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1">
                        <Briefcase className="w-4 h-4" />
                        <span className="text-sm">{profile.title}</span>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      @{profile.username}
                    </p>
                  </div>

                  {/* Bio */}
                  {profile.bio && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {profile.bio}
                    </p>
                  )}

                  {/* Location */}
                  {profile.location && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  )}

                  {/* Skills */}
                  {profile.skills && (profile.skills as string[]).length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(profile.skills as string[]).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {profile.socialLinks && Object.keys(profile.socialLinks as object).length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Connect
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(profile.socialLinks as { github?: string; linkedin?: string; twitter?: string; website?: string }).github && (
                          <a
                            href={(profile.socialLinks as { github?: string }).github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            GitHub
                          </a>
                        )}
                        {(profile.socialLinks as { linkedin?: string }).linkedin && (
                          <a
                            href={(profile.socialLinks as { linkedin?: string }).linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            LinkedIn
                          </a>
                        )}
                        {(profile.socialLinks as { twitter?: string }).twitter && (
                          <a
                            href={(profile.socialLinks as { twitter?: string }).twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg text-sm text-sky-700 dark:text-sky-300 hover:bg-sky-200 dark:hover:bg-sky-900/50 transition"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Twitter
                          </a>
                        )}
                        {(profile.socialLinks as { website?: string }).website && (
                          <a
                            href={(profile.socialLinks as { website?: string }).website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-sm text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Achievements */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Overview */}
              {profile.user.stats && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Learning Stats
                  </h2>
                  
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-violet-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Points</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {profile.user.stats.points.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-orange-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Streak</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {profile.user.stats.currentStreak} days
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Tasks</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {profile.user.stats.tasksCompleted}/{profile.user.stats.tasksTotal}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Trophy className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Badges</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {formattedBadges.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Badges */}
              {recentBadges.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Recent Achievements
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {recentBadges.map((badge) => (
                      <div
                        key={badge.id}
                        className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-violet-100 dark:border-violet-800"
                      >
                        <div className="text-3xl mb-2">{badge.icon}</div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          {badge.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          +{badge.points} points
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Badges */}
              {formattedBadges.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    All Badges
                  </h2>
                  <BadgeGrid
                    badges={formattedBadges}
                    filterable={true}
                    groupByCategory={true}
                  />
                </div>
              )}

              {/* Empty State */}
              {formattedBadges.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    No badges yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    This user hasn&apos;t earned any badges yet. Check back soon!
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-lg p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Join the Community
                </h3>
                <p className="text-violet-100 mb-4">
                  Create your own profile and start tracking your learning journey
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-white text-violet-600 rounded-xl font-semibold hover:bg-violet-50 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch {
    notFound()
  }
}
