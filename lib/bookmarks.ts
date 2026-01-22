export interface Bookmark {
  id: string
  title: string
  url: string
  description?: string
  category: string
  tags: string[]
  createdAt: string
}

const STORAGE_KEY = 'dev-pocket-bookmarks'

// Local storage functions for guest users
export const localBookmarks = {
  getAll: (): Bookmark[] => {
    if (typeof window === 'undefined') return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  add: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Bookmark => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    }
    
    const bookmarks = localBookmarks.getAll()
    const exists = bookmarks.some(b => b.url === bookmark.url)
    
    if (exists) {
      throw new Error('Bookmark already exists')
    }
    
    bookmarks.unshift(newBookmark)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    return newBookmark
  },

  remove: (id: string): void => {
    const bookmarks = localBookmarks.getAll().filter(b => b.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  },

  exists: (url: string): boolean => {
    return localBookmarks.getAll().some(b => b.url === url)
  }
}

// API functions for authenticated users
export const apiBookmarks = {
  getAll: async (category?: string): Promise<Bookmark[]> => {
    const params = category && category !== 'all' ? `?category=${category}` : ''
    const response = await fetch(`/api/bookmarks${params}`)
    if (!response.ok) throw new Error('Failed to fetch bookmarks')
    const data = await response.json()
    return data.bookmarks
  },

  add: async (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Promise<Bookmark> => {
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookmark)
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to add bookmark')
    }
    const data = await response.json()
    return data.bookmark
  },

  remove: async (id: string): Promise<void> => {
    const response = await fetch(`/api/bookmarks/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to remove bookmark')
  },

  exists: async (url: string): Promise<boolean> => {
    try {
      const bookmarks = await apiBookmarks.getAll()
      return bookmarks.some(b => b.url === url)
    } catch {
      return false
    }
  }
}

export const categories = [
  'General',
  'Frontend',
  'Backend',
  'DevOps',
  'Learning',
  'Tools',
  'Documentation'
] as const

export type BookmarkCategory = typeof categories[number]