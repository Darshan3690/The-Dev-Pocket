"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Bot, Sparkles, Lightbulb, ArrowRight, Loader2, Check } from "lucide-react"
import { localBookmarks, apiBookmarks } from "@/lib/bookmarks"
import { toast } from "react-hot-toast"

const projectCategories = [
  { id: "web", name: "Web Development", icon: "🌐" },
  { id: "mobile", name: "Mobile Apps", icon: "📱" },
  { id: "ai", name: "AI/ML Projects", icon: "🤖" },
  { id: "backend", name: "Backend/APIs", icon: "⚙️" },
  { id: "fullstack", name: "Full Stack", icon: "🚀" },
]

type SkillLevel = "beginner" | "intermediate" | "advanced"

interface Project {
  id: string
  title: string
  description: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  tech: string[]
  category: string
}

const allProjects: Project[] = [
  { id: "web-1", title: "Personal Portfolio Website", description: "Build a modern portfolio to showcase your work with animations and responsive design.", difficulty: "Beginner", tech: ["React", "Tailwind CSS", "Framer Motion"], category: "web" },
  { id: "web-2", title: "Recipe Finder App", description: "Search and save recipes using a public food API, with filtering by ingredients and diet.", difficulty: "Beginner", tech: ["JavaScript", "HTML/CSS", "REST API"], category: "web" },
  { id: "web-3", title: "Markdown Note Editor", description: "A live-preview markdown editor with local storage persistence and export to PDF.", difficulty: "Intermediate", tech: ["React", "Marked.js", "IndexedDB"], category: "web" },
  { id: "web-4", title: "Real-Time Collaborative Whiteboard", description: "Multi-user drawing canvas with live cursors and shape sync over WebSockets.", difficulty: "Advanced", tech: ["React", "Canvas API", "Socket.IO"], category: "web" },
  { id: "mobile-1", title: "Habit Tracker App", description: "Track daily habits with streaks, reminders, and simple charts.", difficulty: "Beginner", tech: ["React Native", "AsyncStorage"], category: "mobile" },
  { id: "mobile-2", title: "Expense Splitter", description: "Split group expenses and track who owes what, with offline support.", difficulty: "Intermediate", tech: ["Flutter", "SQLite"], category: "mobile" },
  { id: "mobile-3", title: "Fitness Workout Planner", description: "Build custom workout routines with timers, video demos, and progress tracking.", difficulty: "Advanced", tech: ["React Native", "Firebase", "Push Notifications"], category: "mobile" },
  { id: "ai-1", title: "Sentiment Analyzer", description: "Classify text sentiment using a pretrained model, with a simple web UI.", difficulty: "Beginner", tech: ["Python", "Hugging Face", "Streamlit"], category: "ai" },
  { id: "ai-2", title: "Image Caption Generator", description: "Generate captions for uploaded images using a vision-language model.", difficulty: "Intermediate", tech: ["Python", "PyTorch", "Flask"], category: "ai" },
  { id: "ai-3", title: "AI Chat Assistant", description: "Build a conversational AI assistant using modern LLM APIs and streaming responses.", difficulty: "Advanced", tech: ["Python", "FastAPI", "OpenAI", "WebSockets"], category: "ai" },
  { id: "backend-1", title: "URL Shortener Service", description: "A simple API that shortens URLs and tracks click counts.", difficulty: "Beginner", tech: ["Node.js", "Express", "SQLite"], category: "backend" },
  { id: "backend-2", title: "Task Management API", description: "Create a RESTful API with authentication, CRUD operations, and database integration.", difficulty: "Intermediate", tech: ["Node.js", "Express", "PostgreSQL", "JWT"], category: "backend" },
  { id: "backend-3", title: "Rate-Limited Payments Gateway", description: "Design a payment processing API with idempotency, retries, and rate limiting.", difficulty: "Advanced", tech: ["Node.js", "Redis", "Stripe API"], category: "backend" },
  { id: "fullstack-1", title: "Personal Blog Platform", description: "A blog with markdown posts, comments, and a simple admin panel.", difficulty: "Beginner", tech: ["Next.js", "Prisma", "SQLite"], category: "fullstack" },
  { id: "fullstack-2", title: "E-Commerce Storefront", description: "A shop with product listings, cart, and checkout flow using a test payment provider.", difficulty: "Intermediate", tech: ["Next.js", "Stripe", "PostgreSQL"], category: "fullstack" },
  { id: "fullstack-3", title: "Team Project Management Tool", description: "A Kanban-style board with real-time updates, similar to Trello, for small teams.", difficulty: "Advanced", tech: ["Next.js", "WebSockets", "PostgreSQL", "Redis"], category: "fullstack" },
]

const DIFFICULTY_BY_LEVEL: Record<SkillLevel, Project["difficulty"]> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
}

const RESULT_COUNT = 4

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// Filters by category + skill level. Category is never abandoned once
// selected - if there's no exact difficulty match within it, the rest of
// that category is shown instead of falling back to the full project pool.
function getMatchingProjects(category: string | null, skillLevel: SkillLevel): Project[] {
  const targetDifficulty = DIFFICULTY_BY_LEVEL[skillLevel]

  const byCategory = category ? allProjects.filter((p) => p.category === category) : allProjects
  if (byCategory.length === 0) return allProjects

  const exact = byCategory.filter((p) => p.difficulty === targetDifficulty)
  return exact.length > 0 ? exact : byCategory
}

export default function ProjectsPage() {
  const { isSignedIn } = useUser()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [skillLevel, setSkillLevel] = useState<SkillLevel>("intermediate")
  const [recommendedProjects, setRecommendedProjects] = useState<Project[]>(() =>
    shuffle(getMatchingProjects(null, "intermediate")).slice(0, RESULT_COUNT)
  )
  const [startedProjectIds, setStartedProjectIds] = useState<Set<string>>(new Set())

  // Re-roll recommendations whenever the filters change, so selecting a
  // category/skill level visibly affects what's shown - not just "Generate".
  useEffect(() => {
    const matches = getMatchingProjects(selectedCategory, skillLevel)
    setRecommendedProjects(shuffle(matches).slice(0, RESULT_COUNT))
  }, [selectedCategory, skillLevel])

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const matches = getMatchingProjects(selectedCategory, skillLevel)
      setRecommendedProjects(shuffle(matches).slice(0, RESULT_COUNT))
      setIsGenerating(false)
    }, 600)
  }

  const handleStartProject = async (project: Project) => {
    try {
      const bookmarkData = {
        title: project.title,
        url: `/dashboard/projects#${project.id}`,
        description: project.description,
        category: "Projects",
        tags: [project.difficulty.toLowerCase(), ...project.tech.map((t) => t.toLowerCase())],
      }

      if (isSignedIn) {
        await apiBookmarks.add(bookmarkData)
      } else {
        localBookmarks.add(bookmarkData)
      }

      setStartedProjectIds((prev) => new Set(prev).add(project.id))
      toast.success("Saved to your bookmarks")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to save project"
      toast.error(message)
    }
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
          {(["beginner", "intermediate", "advanced"] as const).map((level) => (
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
          {recommendedProjects.map((project) => (
            <div
              key={project.id}
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
              <button
                onClick={() => handleStartProject(project)}
                disabled={startedProjectIds.has(project.id)}
                className="inline-flex items-center gap-2 text-emerald-600 font-medium text-sm group-hover:gap-3 transition-all disabled:text-slate-400 disabled:cursor-default"
              >
                {startedProjectIds.has(project.id) ? (
                  <>
                    <Check className="w-4 h-4" /> Saved to Bookmarks
                  </>
                ) : (
                  <>
                    Start Project <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}