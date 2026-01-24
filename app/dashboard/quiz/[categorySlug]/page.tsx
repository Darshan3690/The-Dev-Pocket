// app/dashboard/quiz/[categorySlug]/page.tsx
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import QuizList from "./quiz-list"

interface PageProps {
  params: {
    categorySlug: string
  }
}

export default async function CategoryQuizPage({ params }: PageProps) {
  const { categorySlug } = params

  const category = await prisma.quizCategory.findUnique({
    where: { slug: categorySlug },
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-black">
        {category.name} Quizzes
      </h1>

      <QuizList categorySlug={categorySlug} />
    </div>
  )
}
