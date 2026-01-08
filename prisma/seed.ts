import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


async function main() {
  /* -------------------------
     1. Categories
  ------------------------- */

  const categoriesData = [
    {
      name: "JavaScript",
      slug: "javascript",
      iconUrl: "/quiz-icons/javascript.png",
      totalQuestions: 2,
    },
    {
      name: "Python",
      slug: "python",
      iconUrl: "/quiz-icons/python.png",
      totalQuestions: 0,
    },
  ]

  for (const category of categoriesData) {
    await prisma.quizCategory.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log("✅ Categories seeded")

  /* -------------------------
     2. Quiz
  ------------------------- */

  const jsCategory = await prisma.quizCategory.findUnique({
    where: { slug: "javascript" },
  })

  if (!jsCategory) throw new Error("JavaScript category not found")

  const jsQuiz = await prisma.quiz.create({
    data: {
      title: "JavaScript Basics",
      description: "Fundamentals of JavaScript",
      difficulty: "easy",
      totalQuestions: 2,
      categoryId: jsCategory.id,
    },
  })

  console.log("✅ Quiz seeded")

  /* -------------------------
     3. Questions
  ------------------------- */

  await prisma.question.createMany({
    data: [
      {
        quizId: jsQuiz.id,
        text: "Which keyword is used to declare a constant?",
        options: ["var", "let", "const", "define"],
        correct: 2,
      },
      {
        quizId: jsQuiz.id,
        text: "Which type is NOT a JavaScript primitive?",
        options: ["String", "Number", "Object", "Boolean"],
        correct: 2,
      },
    ],
  })

  console.log("✅ Questions seeded")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
