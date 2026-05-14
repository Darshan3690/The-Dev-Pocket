"use client"

import { motion } from "framer-motion"
import { BadgeCategory, BadgeRarity } from "@prisma/client"

interface BadgeCardProps {
  id: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: BadgeRarity
  points: number
  earned: boolean
  earnedAt?: string | null
  onClick?: () => void
  showDetails?: boolean
}

const RARITY_COLORS: Record<BadgeRarity, string> = {
  COMMON: "from-gray-400 to-gray-500 border-gray-300",
  UNCOMMON: "from-green-400 to-green-500 border-green-300",
  RARE: "from-blue-400 to-blue-500 border-blue-300",
  EPIC: "from-purple-400 to-purple-500 border-purple-300",
  LEGENDARY: "from-yellow-400 to-orange-500 border-yellow-300",
}

const RARITY_BG: Record<BadgeRarity, string> = {
  COMMON: "bg-gray-50",
  UNCOMMON: "bg-green-50",
  RARE: "bg-blue-50",
  EPIC: "bg-purple-50",
  LEGENDARY: "bg-yellow-50",
}

const CATEGORY_ICONS: Record<BadgeCategory, string> = {
  LEARNING: "📚",
  STREAK: "🔥",
  SOCIAL: "🤝",
  MILESTONE: "🏆",
}

const CATEGORY_LABELS: Record<BadgeCategory, string> = {
  LEARNING: "Learning",
  STREAK: "Streak",
  SOCIAL: "Social",
  MILESTONE: "Milestone",
}

export default function BadgeCard({
  name,
  description,
  icon,
  category,
  rarity,
  points,
  earned,
  earnedAt,
  onClick,
  showDetails = true,
}: BadgeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: earned ? 1.05 : 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl border-2 p-4 cursor-pointer
        transition-all duration-300
        ${earned ? RARITY_COLORS[rarity] : "from-gray-200 to-gray-300 border-gray-200"}
        ${earned ? "bg-gradient-to-br shadow-lg" : "bg-gray-100 opacity-60"}
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-4 -top-4 text-6xl">
          {CATEGORY_ICONS[category]}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className={`
            w-14 h-14 rounded-xl flex items-center justify-center text-3xl
            ${earned ? "bg-white/80 shadow-md" : "bg-gray-200"}
          `}>
            {icon}
          </div>
          {earned && (
            <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-full text-xs font-semibold shadow-sm">
              <span>✨</span>
              <span>{points} pts</span>
            </div>
          )}
        </div>

        {/* Badge Info */}
        <div className="space-y-1">
          <h3 className={`font-bold text-lg ${earned ? "text-gray-900" : "text-gray-500"}`}>
            {name}
          </h3>
          {showDetails && (
            <p className={`text-sm ${earned ? "text-gray-700" : "text-gray-400"}`}>
              {description}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <div className={`
            inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
            ${earned ? "bg-white/60" : "bg-gray-200"}
          `}>
            <span>{CATEGORY_ICONS[category]}</span>
            <span className={earned ? "text-gray-700" : "text-gray-500"}>
              {CATEGORY_LABELS[category]}
            </span>
          </div>

          {earned ? (
            <div className="text-xs font-medium text-gray-600 bg-white/60 px-2 py-1 rounded-full">
              {earnedAt
                ? `Earned ${new Date(earnedAt).toLocaleDateString()}`
                : "Earned!"}
            </div>
          ) : (
            <div className="text-xs font-medium text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
              🔒 Locked
            </div>
          )}
        </div>
      </div>

      {/* Shine Effect for Earned Badges */}
      {earned && rarity === "LEGENDARY" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      )}
    </motion.div>
  )
}
