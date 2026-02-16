"use client"

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { Search, Filter, ExternalLink, Trash2, Plus, Tag } from 'lucide-react'
import { localBookmarks, apiBookmarks, categories, type Bookmark } from '@/lib/bookmarks'
import { toast } from 'react-hot-toast'

export default function BookmarksPage() {
  const { isSignedIn } = useUser()
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadBookmarks()
  }, [isSignedIn])

  useEffect(() => {
    filterBookmarks()
  }, [bookmarks, searchQuery, selectedCategory])

  const loadBookmarks = async () => {
    try {
      setLoading(true)
      let data: Bookmark[]
      
      if (isSignedIn) {
        data = await apiBookmarks.getAll()
      } else {
        data = localBookmarks.getAll()
      }
      
      setBookmarks(data)
    } catch (error) {
      toast.error('Failed to load bookmarks')
    } finally {
      setLoading(false)
    }
  }

  const filterBookmarks = () => {
    let filtered = bookmarks

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(b => b.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(b => 
        b.title.toLowerCase().includes(query) ||
        b.description?.toLowerCase().includes(query) ||
        b.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    setFilteredBookmarks(filtered)
  }

  const handleDelete = async (id: string) => {
    try {
      if (isSignedIn) {
        await apiBookmarks.remove(id)
      } else {
        localBookmarks.remove(id)
      }
      
      setBookmarks(prev => prev.filter(b => b.id !== id))
      toast.success('Bookmark deleted')
    } catch (error) {
      toast.error('Failed to delete bookmark')
    }
  }

  const handleAdd = async (formData: FormData) => {
    try {
      const bookmarkData = {
        title: formData.get('title') as string,
        url: formData.get('url') as string,
        description: formData.get('description') as string || undefined,
        category: formData.get('category') as string || 'General',
        tags: []
      }

      let newBookmark: Bookmark
      
      if (isSignedIn) {
        newBookmark = await apiBookmarks.add(bookmarkData)
      } else {
        newBookmark = localBookmarks.add(bookmarkData)
      }
      
      setBookmarks(prev => [newBookmark, ...prev])
      setShowAddForm(false)
      toast.success('Bookmark added')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add bookmark'
      toast.error(message)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
          <p className="text-gray-600">
            {bookmarks.length} saved {bookmarks.length === 1 ? 'resource' : 'resources'}
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Bookmark
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {bookmarks.length === 0 ? 'No bookmarks yet' : 'No bookmarks found'}
          </h3>
          <p className="text-gray-600">
            {bookmarks.length === 0 
              ? 'Start saving your favorite resources and tools'
              : 'Try adjusting your search or filter criteria'
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {bookmark.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {new URL(bookmark.url).hostname}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded"
                    title="Open link"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(bookmark.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                    title="Delete bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {bookmark.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {bookmark.description}
                </p>
              )}
              
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {bookmark.category}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(bookmark.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Bookmark Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleAdd(new FormData(e.currentTarget))
              }}
              className="p-6 space-y-4"
            >
              <h2 className="text-lg font-semibold text-gray-900">Add Bookmark</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Resource title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL *
                </label>
                <input
                  name="url"
                  type="url"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description (optional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Bookmark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}