"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import BadgeCard from "./BadgeCard"
import { BadgeCategory, BadgeRarity } from "@prisma/client"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: BadgeRarity
  points: number
  earned: boolean
  earnedAt: string | null
}

interface BadgeGridProps {
  badges: Badge[]
  filterable?: boolean
  groupByCategory?: boolean
  onBadgeClick?: (badge: Badge) => void
}

const CATEGORY_ORDER: BadgeCategory[] = [
  BadgeCategory.LEARNING,
  BadgeCategory.STREAK,
  BadgeCategory.SOCIAL,
  BadgeCategory.MILESTONE,
]

const CATEGORY_LABELS: Record<BadgeCategory, string> = {
  LEARNING: "📚 Learning",
  STREAK: "🔥 Streaks",
  SOCIAL: "🤝 Social",
  MILESTONE: "🏆 Milestones",
}

export default function BadgeGrid({
  badges,
  filterable = true,
  groupByCategory = true,
  onBadgeClick,
}: BadgeGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<BadgeCategory | "ALL">("ALL")
  const [selectedRarity, setSelectedRarity] = useState<BadgeRarity | "ALL">("ALL")

  // Filter badges
  const filteredBadges = badges.filter((badge) => {
    if (selectedCategory !== "ALL" && badge.category !== selectedCategory) {
      return false
    }
    if (selectedRarity !== "ALL" && badge.rarity !== selectedRarity) {
      return false
    }
    return true
  })

  // Group by category if enabled
  const groupedBadges = groupByCategory
    ? CATEGORY_ORDER.map((category) => ({
        category,
        label: CATEGORY_LABELS[category],
        badges: filteredBadges.filter((b) => b.category === category),
      })).filter((group) => group.badges.length > 0)
    : [{ category: "ALL" as const, label: "All Badges", badges: filteredBadges }]

  // Stats
  const earnedCount = badges.filter((b) => b.earned).length
  const totalPoints = badges
    .filter((b) => b.earned)
    .reduce((sum, b) => sum + b.points, 0)

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Your Achievements</h2>
            <p className="text-violet-100">
              {earnedCount} of {badges.length} badges earned
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">✨ {totalPoints}</div>
            <div className="text-sm text-violet-100">Total Points</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(earnedCount / badges.length) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-violet-100 mt-2 text-right">
            {Math.round((earnedCount / badges.length) * 100)}% Complete
          </p>
        </div>
      </div>

      {/* Filters */}
      {filterable && (
        <div className="flex flex-wrap gap-3">
          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                selectedCategory === "ALL"
                  ? "bg-violet-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {CATEGORY_ORDER.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-violet-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>

          {/* Rarity Filter */}
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value as BadgeRarity | "ALL")}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 border-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="ALL">All Rarities</option>
            <option value="COMMON">Common</option>
            <option value="UNCOMMON">Uncommon</option>
            <option value="RARE">Rare</option>
            <option value="EPIC">Epic</option>
            <option value="LEGENDARY">Legendary</option>
          </select>
        </div>
      )}

      {/* Badge Groups */}
      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {groupedBadges.map((group) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {groupByCategory && (
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {group.label}
                  <span className="text-sm font-normal text-gray-500">
                    ({group.badges.filter((b) => b.earned).length}/{group.badges.length})
                  </span>
                </h3>
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.badges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    {...badge}
                    onClick={() => onBadgeClick?.(badge)}
                  />
                ))}
              </div>

              {group.badges.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No badges found in this category
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredBadges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No badges found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or complete activities to earn badges!
          </p>
        </div>
      )}
    </div>
  )
}
