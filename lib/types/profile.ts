export interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  website?: string
}

export interface UserProfile {
  id: string
  userId: string
  username: string
  bio?: string
  avatar?: string
  skills?: string[]
  socialLinks?: SocialLinks
  isPublic: boolean
  location?: string
  title?: string
  createdAt: string
  updatedAt: string
}

export interface PublicProfileData {
  username: string
  name?: string
  bio?: string
  avatar?: string
  skills?: string[]
  socialLinks?: SocialLinks
  location?: string
  title?: string
  badges: {
    id: string
    name: string
    description: string
    icon: string
    category: string
    rarity: string
    points: number
    earnedAt: string
  }[]
  stats: {
    points: number
    currentStreak: number
    tasksCompleted: number
    tasksTotal: number
  } | null
}

export interface ProfileFormData {
  username: string
  bio: string
  avatar: string
  skills: string[]
  socialLinks: SocialLinks
  isPublic: boolean
  location: string
  title: string
}
