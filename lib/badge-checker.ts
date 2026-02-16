import { PrismaClient, Badge, UserBadge, UserStats } from "@prisma/client"
import {
  BADGE_DEFINITIONS,
  BadgeDefinition,
  BadgeCriteria,
  getBadgeBySlug,
} from "./badges"

export interface BadgeCheckContext {
  userId: string
  quizCompleted?: {
    quizId: string
    score: number
    total: number
    percentage: number
  }
  resourceViewed?: {
    resourceId: string
  }
  dailyGoalCompleted?: boolean
  streakUpdated?: boolean
  currentStreak?: number
  totalPoints?: number
  tasksCompleted?: number
  totalQuizzesCompleted?: number
  highScoreQuizzes?: number
  perfectQuizzes?: number
  totalResourcesViewed?: number
  dailyGoalsCompleted?: number
}

export interface BadgeAwardResult {
  awarded: boolean
  badge?: Badge
  alreadyHad?: boolean
  error?: string
}

export class BadgeChecker {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  /**
   * Check and award badges based on activity context
   */
  async checkAndAwardBadges(
    context: BadgeCheckContext
  ): Promise<BadgeAwardResult[]> {
    const results: BadgeAwardResult[] = []

    // Get user's current badges
    const userBadges = await this.prisma.userBadge.findMany({
      where: { userId: context.userId },
      include: { badge: true },
    })

    const earnedBadgeSlugs = new Set(userBadges.map((ub) => ub.badge.slug))

    // Get all active badges from DB
    const dbBadges = await this.prisma.badge.findMany({
      where: { isActive: true },
    })

    // Check each badge
    for (const badgeDef of BADGE_DEFINITIONS) {
      // Skip if already earned
      if (earnedBadgeSlugs.has(badgeDef.slug)) {
        continue
      }

      // Find corresponding DB badge
      const dbBadge = dbBadges.find((b) => b.slug === badgeDef.slug)
      if (!dbBadge) {
        continue
      }

      // Check if criteria is met
      const shouldAward = this.checkCriteria(badgeDef.criteria, context)
      if (shouldAward) {
        const result = await this.awardBadge(context.userId, dbBadge.id, {
          context,
          criteria: badgeDef.criteria,
        })
        results.push(result)
      }
    }

    return results
  }

  /**
   * Check if criteria is met based on context
   */
  private checkCriteria(
    criteria: BadgeCriteria,
    context: BadgeCheckContext
  ): boolean {
    switch (criteria.type) {
      case "FIRST_LOGIN":
        return true // Always awarded on first check

      case "QUIZ_COMPLETED":
        return (
          (context.totalQuizzesCompleted || 0) >= criteria.count ||
          (context.quizCompleted &&
            (context.totalQuizzesCompleted || 1) >= criteria.count)
        )

      case "QUIZ_SCORE":
        if (!context.quizCompleted) return false
        return context.quizCompleted.percentage >= criteria.minPercentage

      case "PERFECT_QUIZ":
        return (context.perfectQuizzes || 0) >= criteria.count

      case "STREAK_DAYS":
        return (context.currentStreak || 0) >= criteria.days

      case "POINTS_EARNED":
        return (context.totalPoints || 0) >= criteria.points

      case "RESOURCES_VIEWED":
        return (context.totalResourcesViewed || 0) >= criteria.count

      case "TASKS_COMPLETED":
        return (context.tasksCompleted || 0) >= criteria.count

      case "DAILY_GOAL_COMPLETED":
        return (context.dailyGoalsCompleted || 0) >= criteria.count

      default:
        return false
    }
  }

  /**
   * Award a badge to a user
   */
  private async awardBadge(
    userId: string,
    badgeId: string,
    metadata?: Record<string, unknown>
  ): Promise<BadgeAwardResult> {
    try {
      // Check if user already has this badge
      const existing = await this.prisma.userBadge.findUnique({
        where: {
          userId_badgeId: {
            userId,
            badgeId,
          },
        },
      })

      if (existing) {
        return { awarded: false, alreadyHad: true }
      }

      // Award the badge
      const userBadge = await this.prisma.userBadge.create({
        data: {
          userId,
          badgeId,
          metadata: metadata || {},
        },
        include: { badge: true },
      })

      // Update user points
      await this.prisma.userStats.updateMany({
        where: { userId },
        data: {
          points: {
            increment: userBadge.badge.points,
          },
        },
      })

      return { awarded: true, badge: userBadge.badge }
    } catch (error) {
      console.error("Error awarding badge:", error)
      return {
        awarded: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  /**
   * Get user's stats for badge checking
   */
  async getUserStatsForCheck(userId: string): Promise<Partial<BadgeCheckContext>> {
    const [userStats, quizStats, badgeStats] = await Promise.all([
      this.prisma.userStats.findUnique({
        where: { userId },
      }),
      this.getQuizStats(userId),
      this.getBadgeStats(userId),
    ])

    return {
      userId,
      currentStreak: userStats?.currentStreak || 0,
      totalPoints: userStats?.points || 0,
      tasksCompleted: userStats?.tasksCompleted || 0,
      ...quizStats,
      ...badgeStats,
    }
  }

  /**
   * Get quiz-related stats
   */
  private async getQuizStats(userId: string) {
    const attempts = await this.prisma.quizAttempt.findMany({
      where: { userId },
    })

    const totalQuizzesCompleted = attempts.length
    const perfectQuizzes = attempts.filter(
      (a) => a.score === a.total && a.total > 0
    ).length
    const highScoreQuizzes = attempts.filter((a) => a.score / a.total >= 0.8).length

    return {
      totalQuizzesCompleted,
      perfectQuizzes,
      highScoreQuizzes,
    }
  }

  /**
   * Get badge-related stats
   */
  private async getBadgeStats(userId: string) {
    // This would track resources viewed, daily goals, etc.
    // For now, return defaults
    return {
      totalResourcesViewed: 0,
      dailyGoalsCompleted: 0,
    }
  }

  /**
   * Check badges after quiz completion
   */
  async checkQuizBadges(
    userId: string,
    quizData: {
      quizId: string
      score: number
      total: number
    }
  ): Promise<BadgeAwardResult[]> {
    const percentage = Math.round((quizData.score / quizData.total) * 100)

    const context: BadgeCheckContext = {
      userId,
      quizCompleted: {
        ...quizData,
        percentage,
      },
      ...(await this.getUserStatsForCheck(userId)),
    }

    return this.checkAndAwardBadges(context)
  }

  /**
   * Check badges on daily login/streak update
   */
  async checkStreakBadges(userId: string): Promise<BadgeAwardResult[]> {
    const context = await this.getUserStatsForCheck(userId)
    context.streakUpdated = true

    return this.checkAndAwardBadges(context as BadgeCheckContext)
  }

  /**
   * Check badges on resource view
   */
  async checkResourceBadges(
    userId: string,
    resourceId: string
  ): Promise<BadgeAwardResult[]> {
    const context: BadgeCheckContext = {
      userId,
      resourceViewed: { resourceId },
      ...(await this.getUserStatsForCheck(userId)),
    }

    // Increment resource view count (would need a separate tracking table in production)
    context.totalResourcesViewed = (context.totalResourcesViewed || 0) + 1

    return this.checkAndAwardBadges(context)
  }

  /**
   * Check badges on daily goal completion
   */
  async checkDailyGoalBadges(userId: string): Promise<BadgeAwardResult[]> {
    const context = await this.getUserStatsForCheck(userId)
    context.dailyGoalCompleted = true
    context.dailyGoalsCompleted = (context.dailyGoalsCompleted || 0) + 1

    return this.checkAndAwardBadges(context as BadgeCheckContext)
  }

  /**
   * Award welcome badge on first login
   */
  async awardWelcomeBadge(userId: string): Promise<BadgeAwardResult> {
    const welcomeBadge = await this.prisma.badge.findUnique({
      where: { slug: "welcome-badge" },
    })

    if (!welcomeBadge) {
      return { awarded: false, error: "Welcome badge not found" }
    }

    return this.awardBadge(userId, welcomeBadge.id, { type: "FIRST_LOGIN" })
  }
}

// Singleton instance
let badgeCheckerInstance: BadgeChecker | null = null

export function getBadgeChecker(prisma: PrismaClient): BadgeChecker {
  if (!badgeCheckerInstance) {
    badgeCheckerInstance = new BadgeChecker(prisma)
  }
  return badgeCheckerInstance
}
