import { prisma } from "@/lib/prisma"
import QuizRunner from "./QuizRunner"

interface PageProps {
  params: {
    quizId: string
    categorySlug: string
  }
}

export default async function QuizPlayPage({ params }: PageProps) {
  const { quizId } = params

  const questions = await prisma.question.findMany({
    where: { quizId },
  })

  if (questions.length === 0) {
    return (
      <p className="text-center mt-10 text-slate-700">
        No questions available.
      </p>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Quiz ({questions.length} questions)
      </h1>

      <QuizRunner questions={questions as any} />
    </div>
  )
}
