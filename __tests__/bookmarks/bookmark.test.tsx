import { localBookmarks } from '@/lib/bookmarks'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-uuid-' + Math.random().toString(36).substr(2, 9)
  }
})

describe('Bookmark System', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('Local Storage Bookmarks', () => {
    test('should add a bookmark', () => {
      const bookmark = {
        title: 'Test Resource',
        url: 'https://example.com',
        description: 'A test resource',
        category: 'General' as const,
        tags: ['test']
      }

      const result = localBookmarks.add(bookmark)

      expect(result).toMatchObject(bookmark)
      expect(result.id).toBeDefined()
      expect(result.createdAt).toBeDefined()
    })

    test('should get all bookmarks', () => {
      const bookmark1 = localBookmarks.add({
        title: 'Resource 1',
        url: 'https://example1.com',
        category: 'Frontend' as const,
        tags: []
      })

      const bookmark2 = localBookmarks.add({
        title: 'Resource 2',
        url: 'https://example2.com',
        category: 'Backend' as const,
        tags: []
      })

      const bookmarks = localBookmarks.getAll()
      expect(bookmarks).toHaveLength(2)
      expect(bookmarks[0]).toMatchObject(bookmark2) // Most recent first
      expect(bookmarks[1]).toMatchObject(bookmark1)
    })

    test('should remove a bookmark', () => {
      const bookmark = localBookmarks.add({
        title: 'Test Resource',
        url: 'https://example.com',
        category: 'General' as const,
        tags: []
      })

      localBookmarks.remove(bookmark.id)
      const bookmarks = localBookmarks.getAll()
      expect(bookmarks).toHaveLength(0)
    })

    test('should check if bookmark exists', () => {
      const url = 'https://example.com'
      
      expect(localBookmarks.exists(url)).toBe(false)
      
      localBookmarks.add({
        title: 'Test Resource',
        url,
        category: 'General' as const,
        tags: []
      })
      
      expect(localBookmarks.exists(url)).toBe(true)
    })

    test('should prevent duplicate bookmarks', () => {
      const bookmarkData = {
        title: 'Test Resource',
        url: 'https://example.com',
        category: 'General' as const,
        tags: []
      }

      localBookmarks.add(bookmarkData)
      
      expect(() => {
        localBookmarks.add(bookmarkData)
      }).toThrow('Bookmark already exists')
    })
  })
})