"use client"

import { useState } from "react"
import { Zap, BookOpen, Code, Video, FileText, ArrowRight, Clock, Star, CheckCircle } from "lucide-react"

const quickStartTopics = [
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    icon: "🟨",
    duration: "2 hours",
    lessons: 12,
    rating: 4.9,
    color: "from-yellow-400 to-amber-500"
  },
  {
    id: "react",
    title: "React Basics",
    icon: "⚛️",
    duration: "3 hours",
    lessons: 15,
    rating: 4.8,
    color: "from-cyan-400 to-blue-500"
  },
  {
    id: "typescript",
    title: "TypeScript Essentials",
    icon: "🔷",
    duration: "2.5 hours",
    lessons: 10,
    rating: 4.7,
    color: "from-blue-400 to-indigo-500"
  },
  {
    id: "nodejs",
    title: "Node.js Crash Course",
    icon: "🟢",
    duration: "2 hours",
    lessons: 8,
    rating: 4.8,
    color: "from-green-400 to-emerald-500"
  },
  {
    id: "python",
    title: "Python for Beginners",
    icon: "🐍",
    duration: "3 hours",
    lessons: 14,
    rating: 4.9,
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: "git",
    title: "Git & GitHub",
    icon: "📦",
    duration: "1.5 hours",
    lessons: 6,
    rating: 4.6,
    color: "from-orange-400 to-red-500"
  },
]

export default function QuickStartPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full">
          <Zap className="w-5 h-5 text-pink-600" />
          <span className="text-sm font-medium text-pink-700">Jump Into Learning</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Quick Start
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Get started with any topic in minutes. Our curated quick-start guides help you learn the essentials fast.
        </p>
      </div>

      {/* Quick Start Topics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickStartTopics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopic(topic.id)}
            className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-xl hover:-translate-y-1 text-left group ${
              selectedTopic === topic.id ? "border-pink-500" : "border-slate-200"
            }`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${topic.color} opacity-10 rounded-bl-full`} />
            <span className="text-4xl mb-4 block">{topic.icon}</span>
            <h3 className="text-lg font-semibold text-slate-800 group-hover:text-pink-600 transition-colors mb-2">
              {topic.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {topic.duration}</span>
              <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {topic.lessons} lessons</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-sm"><Star className="w-4 h-4 text-amber-500" /> {topic.rating}</span>
              <span className="inline-flex items-center gap-1 text-pink-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Start <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Learning Path Preview */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">What You&apos;ll Learn</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: Code, text: "Core concepts and syntax" },
            { icon: FileText, text: "Best practices and patterns" },
            { icon: Video, text: "Video tutorials and examples" },
            { icon: CheckCircle, text: "Hands-on exercises" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
              <item.icon className="w-5 h-5 text-pink-500" />
              <span className="text-slate-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
