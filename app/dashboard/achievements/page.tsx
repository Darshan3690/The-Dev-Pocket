"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import BadgeGrid from "@/components/badges/BadgeGrid"
import BadgeCelebration from "@/components/badges/BadgeCelebration"
import { motion } from "framer-motion"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: "LEARNING" | "STREAK" | "SOCIAL" | "MILESTONE"
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY"
  points: number
  earned: boolean
  earnedAt: string | null
}

interface BadgeStats {
  totalBadges: number
  totalPoints: number
  badgesByCategory: Record<string, number>
  badgesByRarity: Record<string, number>
  recentBadges: number
}

export default function AchievementsPage() {
  const { isLoaded, user } = useUser()
  const [badges, setBadges] = useState<Badge[]>([])
  const [stats, setStats] = useState<BadgeStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      fetchBadges()
    }
  }, [isLoaded, user])

  const fetchBadges = async () => {
    try {
      const response = await fetch("/api/badges")
      const data = await response.json()

      if (data.badges) {
        setBadges(data.badges)
      }

      // Also fetch user badge stats
      const statsResponse = await fetch("/api/user-badges")
      const statsData = await statsResponse.json()

      if (statsData.stats) {
        setStats(statsData.stats)
      }
    } catch (error) {
      console.error("Error fetching badges:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleBadgeClick = (badge: Badge) => {
    setSelectedBadge(badge)
    if (badge.earned) {
      setShowCelebration(true)
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="space-y-8">
        <div className="h-32 bg-gray-200 rounded-xl animate-pulse" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600 mt-1">
            Earn badges by learning, maintaining streaks, and reaching milestones
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-violet-600 hover:text-violet-700 font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* Quick Stats */}
      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalBadges}
            </div>
            <div className="text-sm text-gray-500">Badges Earned</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="text-3xl mb-2">✨</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalPoints}
            </div>
            <div className="text-sm text-gray-500">Total Points</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.recentBadges}
            </div>
            <div className="text-sm text-gray-500">This Week</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="text-3xl mb-2">💎</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.badgesByRarity?.RARE || 0}
            </div>
            <div className="text-sm text-gray-500">Rare Badges</div>
          </motion.div>
        </div>
      )}

      {/* Category Breakdown */}
      {stats?.badgesByCategory && (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Progress by Category
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(stats.badgesByCategory).map(([category, count]) => (
              <div key={category} className="flex items-center gap-3">
                <div
                  className={`
                  w-12 h-12 rounded-lg flex items-center justify-center text-xl
                  ${
                    category === "LEARNING"
                      ? "bg-blue-100"
                      : category === "STREAK"
                      ? "bg-orange-100"
                      : category === "SOCIAL"
                      ? "bg-green-100"
                      : "bg-purple-100"
                  }
                `}
                >
                  {category === "LEARNING" && "📚"}
                  {category === "STREAK" && "🔥"}
                  {category === "SOCIAL" && "🤝"}
                  {category === "MILESTONE" && "🏆"}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-500 capitalize">
                    {category.toLowerCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Badge Grid */}
      <BadgeGrid
        badges={badges}
        onBadgeClick={handleBadgeClick}
        filterable={true}
        groupByCategory={true}
      />

      {/* Empty State */}
      {badges.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No badges yet
          </h3>
          <p className="text-gray-500 mb-6">
            Start your learning journey to earn your first badge!
          </p>
          <Link
            href="/dashboard/quiz"
            className="inline-flex items-center px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition"
          >
            Take a Quiz
          </Link>
        </div>
      )}

      {/* Badge Celebration Modal */}
      <BadgeCelebration
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        badge={selectedBadge}
      />
    </div>
  )
}
