"use client"

import { useState, useEffect } from "react"
import { Brain, Trophy, Clock, Target, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"


import StatCard from "./StatCard"
import QuizCard from "./QuizCard"
import { recentQuizzes } from "./quizData"


export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [quizCategories, setQuizCategories] = useState<any[]>([])
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()


  useEffect(() => {
  async function fetchCategories() {
    try {
      const res = await fetch("/api/quiz/categories")
      const data = await res.json()
      setQuizCategories(data)
    } catch (err) {
      console.error("Failed to fetch quiz categories", err)
    } finally {
      setLoading(false)
    }
  }

  fetchCategories()
}, [])

const handleSelectCategory = async (slug: string) => {
  setSelectedQuiz(slug)


  try {
    const res = await fetch(`/api/quiz/by-category/${slug}`)
    const data = await res.json()
    setQuizzes(data)
  } catch (err) {
    console.error("Failed to fetch quizzes", err)
  }
}

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full">
          <Brain className="w-5 h-5 text-violet-600" />
          <span className="text-sm font-medium text-violet-700">
            Test Your Knowledge
          </span>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Quiz Center
        </h1>

        <p className="text-slate-600 max-w-2xl mx-auto">
          Challenge yourself with quizzes on various programming topics.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Trophy className="w-8 h-8 text-amber-500" />} value="1,250" label="Total Points" />
        <StatCard icon={<Target className="w-8 h-8 text-emerald-500" />} value="83%" label="Avg. Score" />
        <StatCard icon={<CheckCircle className="w-8 h-8 text-blue-500" />} value="24" label="Quizzes Completed" />
        <StatCard icon={<Clock className="w-8 h-8 text-purple-500" />} value="5h 30m" label="Time Spent" />
      </div>

      {/* Quiz Categories */}
      <div>
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Choose a Topic
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {loading ? (
            <p className="text-slate-500">Loading quizzes...</p>
          ) : (
            quizCategories.map((quiz) => (

            <QuizCard
              key={quiz.id}
              name={quiz.name}
              icon={quiz.iconUrl}
              questions={quiz.totalQuestions}
              color="from-violet-400 to-purple-500"
              selected={selectedQuiz === quiz.id}
              onSelect={() => {
                console.log("ROUTING TO:", `/dashboard/quiz/${quiz.slug}/${quiz.id}`)
                router.push(`/dashboard/quiz/${quiz.slug}/${quiz.id}`)
              }}
            />

            ))
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {recentQuizzes.map((quiz, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div>
                <p className="font-medium text-slate-800">{quiz.name}</p>
                <p className="text-sm text-slate-500">{quiz.date}</p>
              </div>
              <p className="font-bold">{quiz.score}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

