"use client"

import { useState } from "react"
import { Bot, Sparkles, Code, Lightbulb, ArrowRight, Loader2 } from "lucide-react"

const projectCategories = [
  { id: "web", name: "Web Development", icon: "🌐" },
  { id: "mobile", name: "Mobile Apps", icon: "📱" },
  { id: "ai", name: "AI/ML Projects", icon: "🤖" },
  { id: "backend", name: "Backend/APIs", icon: "⚙️" },
  { id: "fullstack", name: "Full Stack", icon: "🚀" },
]

const sampleProjects = [
  {
    title: "Personal Portfolio Website",
    description: "Build a modern portfolio to showcase your work with animations and responsive design.",
    difficulty: "Beginner",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    category: "web"
  },
  {
    title: "Task Management API",
    description: "Create a RESTful API with authentication, CRUD operations, and database integration.",
    difficulty: "Intermediate",
    tech: ["Node.js", "Express", "PostgreSQL", "JWT"],
    category: "backend"
  },
  {
    title: "AI Chat Assistant",
    description: "Build a conversational AI assistant using modern LLM APIs and streaming responses.",
    difficulty: "Advanced",
    tech: ["Python", "FastAPI", "OpenAI", "WebSockets"],
    category: "ai"
  },
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [skillLevel, setSkillLevel] = useState("intermediate")

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full">
          <Bot className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">AI-Powered Recommendations</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          AI Project Recommender
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Get personalized project ideas based on your skills, interests, and career goals. 
          Our AI analyzes your profile to suggest the perfect next project.
        </p>
      </div>

      {/* Skill Level Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Your Skill Level</h2>
        <div className="flex flex-wrap gap-3">
          {["beginner", "intermediate", "advanced"].map((level) => (
            <button
              key={level}
              onClick={() => setSkillLevel(level)}
              className={`px-6 py-3 rounded-xl font-medium capitalize transition-all ${
                skillLevel === level
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Select a Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-xl text-center transition-all ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700"
              }`}
            >
              <span className="text-2xl mb-2 block">{cat.icon}</span>
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Ideas...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Project Ideas
            </>
          )}
        </button>
      </div>

      {/* Sample Projects */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Recommended Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {sampleProjects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                  project.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {project.difficulty}
                </span>
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg">
                    {t}
                  </span>
                ))}
              </div>
              <button className="inline-flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all">
                Start Project <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
