"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { BadgeRarity } from "@prisma/client"

interface BadgeCelebrationProps {
  isOpen: boolean
  onClose: () => void
  badge: {
    name: string
    description: string
    icon: string
    rarity: BadgeRarity
    points: number
  } | null
}

const RARITY_COLORS: Record<BadgeRarity, { bg: string; text: string; border: string }> = {
  COMMON: {
    bg: "from-gray-100 to-gray-200",
    text: "text-gray-800",
    border: "border-gray-300",
  },
  UNCOMMON: {
    bg: "from-green-100 to-green-200",
    text: "text-green-800",
    border: "border-green-300",
  },
  RARE: {
    bg: "from-blue-100 to-blue-200",
    text: "text-blue-800",
    border: "border-blue-300",
  },
  EPIC: {
    bg: "from-purple-100 to-purple-200",
    text: "text-purple-800",
    border: "border-purple-300",
  },
  LEGENDARY: {
    bg: "from-yellow-100 to-orange-200",
    text: "text-yellow-800",
    border: "border-yellow-300",
  },
}

const RARITY_LABELS: Record<BadgeRarity, string> = {
  COMMON: "Common",
  UNCOMMON: "Uncommon",
  RARE: "Rare",
  EPIC: "Epic",
  LEGENDARY: "LEGENDARY!",
}

export default function BadgeCelebration({
  isOpen,
  onClose,
  badge,
}: BadgeCelebrationProps) {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isOpen && badge) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, badge])

  if (!badge) return null

  const colors = RARITY_COLORS[badge.rarity]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Confetti */}
          {showConfetti && (
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={badge.rarity === "LEGENDARY" ? 500 : 200}
              gravity={0.3}
              colors={
                badge.rarity === "LEGENDARY"
                  ? ["#FFD700", "#FFA500", "#FF6347", "#FF69B4", "#9370DB"]
                  : undefined
              }
            />
          )}

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: 50 }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 200,
              }}
              onClick={(e) => e.stopPropagation()}
              className={`
                relative max-w-md w-full rounded-2xl overflow-hidden
                bg-gradient-to-br ${colors.bg} ${colors.border} border-4
                shadow-2xl
              `}
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Content */}
              <div className="relative z-10 p-8 text-center">
                {/* Badge Icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl shadow-xl flex items-center justify-center text-6xl"
                >
                  {badge.icon}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`text-3xl font-bold ${colors.text} mb-2`}
                >
                  Badge Unlocked!
                </motion.h2>

                {/* Badge Name */}
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-gray-900 mb-2"
                >
                  {badge.name}
                </motion.h3>

                {/* Rarity Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className={`
                    inline-block px-4 py-1 rounded-full text-sm font-bold mb-4
                    ${badge.rarity === "LEGENDARY" ? "bg-yellow-400 text-yellow-900 animate-pulse" : "bg-white/50"}
                  `}
                >
                  {RARITY_LABELS[badge.rarity]} Badge
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-700 mb-6"
                >
                  {badge.description}
                </motion.p>

                {/* Points */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center justify-center gap-2 text-lg font-semibold text-gray-900 mb-6"
                >
                  <span>✨</span>
                  <span>+{badge.points} Points Earned!</span>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`
                    px-8 py-3 rounded-xl font-bold text-white shadow-lg
                    bg-gradient-to-r from-violet-600 to-purple-600
                    hover:from-violet-700 hover:to-purple-700
                    transition-all
                  `}
                >
                  Awesome! 🎉
                </motion.button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 text-4xl opacity-20">✨</div>
              <div className="absolute top-4 right-4 text-4xl opacity-20">🎊</div>
              <div className="absolute bottom-4 left-4 text-4xl opacity-20">🏆</div>
              <div className="absolute bottom-4 right-4 text-4xl opacity-20">⭐</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
