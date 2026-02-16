import { BadgeCategory, BadgeRarity } from "@prisma/client"

export interface BadgeDefinition {
  slug: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: BadgeRarity
  points: number
  order: number
  criteria: BadgeCriteria
}

export type BadgeCriteria =
  | { type: "QUIZ_COMPLETED"; count: number }
  | { type: "QUIZ_SCORE"; minScore: number; minPercentage: number }
  | { type: "PERFECT_QUIZ"; count: number }
  | { type: "STREAK_DAYS"; days: number }
  | { type: "POINTS_EARNED"; points: number }
  | { type: "RESOURCES_VIEWED"; count: number }
  | { type: "TASKS_COMPLETED"; count: number }
  | { type: "FIRST_LOGIN" }
  | { type: "DAILY_GOAL_COMPLETED"; count: number }

// All badge definitions
export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  // LEARNING BADGES
  {
    slug: "first-quiz",
    name: "First Steps",
    description: "Complete your first quiz",
    icon: "🎯",
    category: BadgeCategory.LEARNING,
    rarity: BadgeRarity.COMMON,
    points: 10,
    order: 1,
    criteria: { type: "QUIZ_COMPLETED", count: 1 },
  },
  {
    slug: "quiz-enthusiast",
    name: "Quiz Enthusiast",
    description: "Complete 5 quizzes",
    icon: "📚",
    category: BadgeCategory.LEARNING,
    rarity: BadgeRarity.COMMON,
    points: 25,
    order: 2,
    criteria: { type: "QUIZ_COMPLETED", count: 5 },
  },
  {
    slug: "quiz-master",
    name: "Quiz Master",
    description: "Complete 25 quizzes",
    icon: "🏆",
    category: BadgeCategory.LEARNING,
    rarity: BadgeRarity.RARE,
    points: 100,
    order: 3,
    criteria: { type: "QUIZ_COMPLETED", count: 25 },
  },
  {
    slug: "perfect-score",
    name: "Perfectionist",
    description: "Get a perfect score on any quiz",
    icon: "⭐",
    category: BadgeCategory.LEARNING,
    rarity: BadgeRarity.UNCOMMON,
    points: 50,
    order: 4,
    criteria: { type: "PERFECT_QUIZ", count: 1 },
  },
  {
    slug: "knowledge-seeker",
    name: "Knowledge Seeker",
    description: "Score 80% or higher on 10 quizzes",
    icon: "🧠",
    category: BadgeCategory.LEARNING,
    rarity: BadgeRarity.UNCOMMON,
    points: 75,
    order: 5,
    criteria: { type: "QUIZ_SCORE", minScore: 0, minPercentage: 80 },
  },

  // STREAK BADGES
  {
    slug: "streak-starter",
    name: "Streak Starter",
    description: "Maintain a 3-day learning streak",
    icon: "🔥",
    category: BadgeCategory.STREAK,
    rarity: BadgeRarity.COMMON,
    points: 15,
    order: 10,
    criteria: { type: "STREAK_DAYS", days: 3 },
  },
  {
    slug: "week-warrior",
    name: "Week Warrior",
    description: "Maintain a 7-day learning streak",
    icon: "⚡",
    category: BadgeCategory.STREAK,
    rarity: BadgeRarity.UNCOMMON,
    points: 50,
    order: 11,
    criteria: { type: "STREAK_DAYS", days: 7 },
  },
  {
    slug: "fortnight-champion",
    name: "Fortnight Champion",
    description: "Maintain a 14-day learning streak",
    icon: "🌟",
    category: BadgeCategory.STREAK,
    rarity: BadgeRarity.RARE,
    points: 100,
    order: 12,
    criteria: { type: "STREAK_DAYS", days: 14 },
  },
  {
    slug: "monthly-master",
    name: "Monthly Master",
    description: "Maintain a 30-day learning streak",
    icon: "👑",
    category: BadgeCategory.STREAK,
    rarity: BadgeRarity.EPIC,
    points: 250,
    order: 13,
    criteria: { type: "STREAK_DAYS", days: 30 },
  },
  {
    slug: "century-streak",
    name: "Century Streak",
    description: "Maintain a 100-day learning streak",
    icon: "💯",
    category: BadgeCategory.STREAK,
    rarity: BadgeRarity.LEGENDARY,
    points: 1000,
    order: 14,
    criteria: { type: "STREAK_DAYS", days: 100 },
  },

  // SOCIAL BADGES
  {
    slug: "resource-explorer",
    name: "Resource Explorer",
    description: "View 10 learning resources",
    icon: "🔍",
    category: BadgeCategory.SOCIAL,
    rarity: BadgeRarity.COMMON,
    points: 15,
    order: 20,
    criteria: { type: "RESOURCES_VIEWED", count: 10 },
  },
  {
    slug: "resource-guru",
    name: "Resource Guru",
    description: "View 50 learning resources",
    icon: "📖",
    category: BadgeCategory.SOCIAL,
    rarity: BadgeRarity.UNCOMMON,
    points: 50,
    order: 21,
    criteria: { type: "RESOURCES_VIEWED", count: 50 },
  },

  // MILESTONE BADGES
  {
    slug: "point-collector",
    name: "Point Collector",
    description: "Earn 100 points",
    icon: "💰",
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.COMMON,
    points: 20,
    order: 30,
    criteria: { type: "POINTS_EARNED", points: 100 },
  },
  {
    slug: "point-hunter",
    name: "Point Hunter",
    description: "Earn 500 points",
    icon: "💎",
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.UNCOMMON,
    points: 50,
    order: 31,
    criteria: { type: "POINTS_EARNED", points: 500 },
  },
  {
    slug: "point-millionaire",
    name: "Point Millionaire",
    description: "Earn 1000 points",
    icon: "🏅",
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.RARE,
    points: 100,
    order: 32,
    criteria: { type: "POINTS_EARNED", points: 1000 },
  },
  {
    slug: "task-starter",
    name: "Task Starter",
    description: "Complete your first 5 tasks",
    icon: "✅",
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.COMMON,
    points: 15,
    order: 33,
    criteria: { type: "TASKS_COMPLETED", count: 5 },
  },
  {
    slug: "task-champion",
    name: "Task Champion",
    description: "Complete 50 tasks",
    icon: "🚀",
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.RARE,
    points: 100,
    order: 34,
    criteria: { type: "TASKS_COMPLETED", count: 50 },
  },
  {
    slug: "daily-goal-crusher",
    name: "Daily Goal Crusher",
    description: "Complete your daily goal 7 times",
    icon: "🎯",
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.UNCOMMON,
    points: 50,
    order: 35,
    criteria: { type: "DAILY_GOAL_COMPLETED", count: 7 },
  },
  {
    slug: "welcome-badge",
    name: "Welcome Aboard",
    description: "Join the Dev Pocket community",
    icon: "👋",
    category: BadgeCategory.MILESTONE,
    rarity: BadgeRarity.COMMON,
    points: 5,
    order: 0,
    criteria: { type: "FIRST_LOGIN" },
  },
]

// Helper function to get badge by slug
export function getBadgeBySlug(slug: string): BadgeDefinition | undefined {
  return BADGE_DEFINITIONS.find((badge) => badge.slug === slug)
}

// Helper function to get badges by category
export function getBadgesByCategory(category: BadgeCategory): BadgeDefinition[] {
  return BADGE_DEFINITIONS.filter((badge) => badge.category === category).sort(
    (a, b) => a.order - b.order
  )
}

// Helper function to get all active badges
export function getAllBadges(): BadgeDefinition[] {
  return BADGE_DEFINITIONS.sort((a, b) => a.order - b.order)
}

// Rarity colors for UI
export const RARITY_COLORS: Record<BadgeRarity, string> = {
  COMMON: "from-gray-400 to-gray-500",
  UNCOMMON: "from-green-400 to-green-500",
  RARE: "from-blue-400 to-blue-500",
  EPIC: "from-purple-400 to-purple-500",
  LEGENDARY: "from-yellow-400 to-orange-500",
}

// Rarity labels
export const RARITY_LABELS: Record<BadgeRarity, string> = {
  COMMON: "Common",
  UNCOMMON: "Uncommon",
  RARE: "Rare",
  EPIC: "Epic",
  LEGENDARY: "Legendary",
}
