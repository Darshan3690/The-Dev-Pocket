"use client"

import { useState } from "react"
import { Users, MessageSquare, ThumbsUp, Eye, Search, Plus, TrendingUp, Clock, Tag } from "lucide-react"

const forumCategories = [
  { id: "general", name: "General Discussion", posts: 234, color: "bg-blue-500" },
  { id: "help", name: "Help & Support", posts: 156, color: "bg-green-500" },
  { id: "showcase", name: "Project Showcase", posts: 89, color: "bg-purple-500" },
  { id: "jobs", name: "Jobs & Opportunities", posts: 67, color: "bg-amber-500" },
  { id: "resources", name: "Learning Resources", posts: 123, color: "bg-pink-500" },
]

const trendingPosts = [
  {
    title: "Best practices for React Server Components in 2024",
    author: "Sarah Chen",
    avatar: "SC",
    category: "General Discussion",
    replies: 45,
    views: 1234,
    likes: 89,
    time: "2 hours ago",
    tags: ["React", "Next.js", "RSC"]
  },
  {
    title: "How I landed my first developer job - My journey",
    author: "Mike Johnson",
    avatar: "MJ",
    category: "General Discussion",
    replies: 78,
    views: 2567,
    likes: 156,
    time: "5 hours ago",
    tags: ["Career", "Interview", "Tips"]
  },
  {
    title: "Need help with TypeScript generics",
    author: "Alex Rivera",
    avatar: "AR",
    category: "Help & Support",
    replies: 23,
    views: 456,
    likes: 34,
    time: "1 day ago",
    tags: ["TypeScript", "Help"]
  },
]

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">Community Forum</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Community Forum
          </h1>
          <p className="text-slate-600 mt-2">Connect, share, and learn with fellow developers</p>
        </div>
        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <Plus className="w-5 h-5" />
          New Post
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search discussions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {forumCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              selectedCategory === cat.id
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-slate-700 border border-slate-200 hover:border-blue-300"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${cat.color}`} />
            {cat.name}
            <span className="text-xs opacity-70">({cat.posts})</span>
          </button>
        ))}
      </div>

      {/* Trending Posts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-semibold text-slate-800">Trending Discussions</h2>
        </div>
        <div className="space-y-4">
          {trendingPosts.map((post, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:border-blue-200 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {post.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-3">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {post.time}
                    </span>
                    <span>•</span>
                    <span>{post.category}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                        <Tag className="w-3 h-3" /> {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" /> {post.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {post.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" /> {post.likes} likes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
