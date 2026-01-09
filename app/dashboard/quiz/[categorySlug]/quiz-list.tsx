"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Quiz {
  id: string
  title: string
  difficulty: string
  totalQuestions: number
}

export default function QuizList({
  categorySlug,
}: {
  categorySlug: string
}) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const res = await fetch(`/api/quiz/${categorySlug}`)
        const data = await res.json()
        setQuizzes(data)
      } catch (err) {
        console.error("Failed to load quizzes", err)
      } finally {
        setLoading(false)
      }
    }

    fetchQuizzes()
  }, [categorySlug])

  if (loading) {
    return <p className="text-slate-500">Loading quizzes...</p>
  }

  if (!quizzes.length) {
    return <p className="text-slate-500">No quizzes available.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {quizzes.map((quiz) => (
        <Link
          key={quiz.id}
          href={`/dashboard/quiz/${categorySlug}/${quiz.id}`}
          className="block bg-white border rounded-xl p-4 hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold">{quiz.title}</h3>
          <p className="text-sm text-slate-500">
            {quiz.totalQuestions} questions · {quiz.difficulty}
          </p>
        </Link>
      ))}
    </div>
  )
}
