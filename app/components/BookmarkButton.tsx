"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { localBookmarks, apiBookmarks, type BookmarkCategory } from '@/lib/bookmarks'
import { toast } from 'react-hot-toast'

interface BookmarkButtonProps {
  title: string
  url: string
  description?: string
  category?: BookmarkCategory
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function BookmarkButton({
  title,
  url,
  description,
  category = 'General',
  className = '',
  size = 'md'
}: BookmarkButtonProps) {
  const { isSignedIn } = useUser()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  }

  useEffect(() => {
    checkBookmarkStatus()
  }, [url, isSignedIn])

  const checkBookmarkStatus = async () => {
    try {
      if (isSignedIn) {
        const exists = await apiBookmarks.exists(url)
        setIsBookmarked(exists)
      } else {
        const exists = localBookmarks.exists(url)
        setIsBookmarked(exists)
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error)
    }
  }

  const handleBookmark = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      if (isBookmarked) {
        // Remove bookmark
        if (isSignedIn) {
          const bookmarks = await apiBookmarks.getAll()
          const bookmark = bookmarks.find(b => b.url === url)
          if (bookmark) {
            await apiBookmarks.remove(bookmark.id)
          }
        } else {
          const bookmarks = localBookmarks.getAll()
          const bookmark = bookmarks.find(b => b.url === url)
          if (bookmark) {
            localBookmarks.remove(bookmark.id)
          }
        }
        setIsBookmarked(false)
        toast.success('Bookmark removed')
      } else {
        // Add bookmark
        const bookmarkData = { title, url, description, category, tags: [] }
        
        if (isSignedIn) {
          await apiBookmarks.add(bookmarkData)
        } else {
          localBookmarks.add(bookmarkData)
        }
        setIsBookmarked(true)
        toast.success('Bookmark saved')
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update bookmark'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleBookmark}
      disabled={isLoading}
      className={`
        ${buttonSizeClasses[size]}
        rounded-lg transition-all duration-200
        ${isBookmarked 
          ? 'text-yellow-600 hover:text-yellow-700 bg-yellow-50 hover:bg-yellow-100' 
          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
        }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        ${className}
      `}
      title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <BookmarkCheck className={sizeClasses[size]} />
      ) : (
        <Bookmark className={sizeClasses[size]} />
      )}
    </button>
  )
}