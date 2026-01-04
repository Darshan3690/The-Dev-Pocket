"use client"

import { useState } from "react"
import { Brain, Trophy, Clock, Target, Play, CheckCircle, XCircle } from "lucide-react"

const quizCategories = [
  { id: "javascript", name: "JavaScript", icon: "🟨", questions: 50, color: "from-yellow-400 to-amber-500" },
  { id: "react", name: "React", icon: "⚛️", questions: 40, color: "from-cyan-400 to-blue-500" },
  { id: "python", name: "Python", icon: "🐍", questions: 45, color: "from-green-400 to-emerald-500" },
  { id: "typescript", name: "TypeScript", icon: "🔷", questions: 35, color: "from-blue-400 to-indigo-500" },
  { id: "css", name: "CSS", icon: "🎨", questions: 30, color: "from-pink-400 to-purple-500" },
  { id: "nodejs", name: "Node.js", icon: "🟢", questions: 35, color: "from-lime-400 to-green-500" },
]

const recentQuizzes = [
  { name: "JavaScript Basics", score: 85, total: 100, date: "2 days ago" },
  { name: "React Hooks", score: 90, total: 100, date: "5 days ago" },
  { name: "CSS Flexbox", score: 75, total: 100, date: "1 week ago" },
]

export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full">
          <Brain className="w-5 h-5 text-violet-600" />
          <span className="text-sm font-medium text-violet-700">Test Your Knowledge</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Quiz Center
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Challenge yourself with quizzes on various programming topics. 
          Track your progress and improve your skills.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <Trophy className="w-8 h-8 text-amber-500 mb-3" />
          <p className="text-2xl font-bold text-slate-800">1,250</p>
          <p className="text-sm text-slate-500">Total Points</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <Target className="w-8 h-8 text-emerald-500 mb-3" />
          <p className="text-2xl font-bold text-slate-800">83%</p>
          <p className="text-sm text-slate-500">Avg. Score</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <CheckCircle className="w-8 h-8 text-blue-500 mb-3" />
          <p className="text-2xl font-bold text-slate-800">24</p>
          <p className="text-sm text-slate-500">Quizzes Completed</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <Clock className="w-8 h-8 text-purple-500 mb-3" />
          <p className="text-2xl font-bold text-slate-800">5h 30m</p>
          <p className="text-sm text-slate-500">Time Spent</p>
        </div>
      </div>

      {/* Quiz Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Choose a Topic</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quizCategories.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => setSelectedQuiz(quiz.id)}
              className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-xl hover:-translate-y-1 text-left group ${
                selectedQuiz === quiz.id ? "border-violet-500" : "border-slate-200"
              }`}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${quiz.color} opacity-10 rounded-bl-full`} />
              <span className="text-4xl mb-4 block">{quiz.icon}</span>
              <h3 className="text-lg font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">
                {quiz.name}
              </h3>
              <p className="text-sm text-slate-500">{quiz.questions} questions</p>
              <div className="mt-4 flex items-center gap-2 text-violet-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4" /> Start Quiz
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Quizzes */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentQuizzes.map((quiz, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  quiz.score >= 80 ? "bg-green-100" : quiz.score >= 60 ? "bg-yellow-100" : "bg-red-100"
                }`}>
                  {quiz.score >= 80 ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-slate-800">{quiz.name}</p>
                  <p className="text-sm text-slate-500">{quiz.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-800">{quiz.score}%</p>
                <p className="text-sm text-slate-500">{quiz.score}/{quiz.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
