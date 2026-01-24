// quiz/quizData.ts

export const quizCategories = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: "/quiz-icons/javascript.png",
    questions: 50,
    color: "from-yellow-400 to-amber-500",
  },
  {
    id: "react",
    name: "React",
    icon: "/quiz-icons/react.png",
    questions: 40,
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: "python",
    name: "Python",
    icon: "/quiz-icons/python.png",
    questions: 45,
    color: "from-green-400 to-emerald-500",
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "/quiz-icons/typescript.png",
    questions: 35,
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "css",
    name: "CSS",
    icon: "/quiz-icons/css.png",
    questions: 30,
    color: "from-pink-400 to-purple-500",
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: "/quiz-icons/nodejs.png",
    questions: 35,
    color: "from-lime-400 to-green-500",
  },
]

export const recentQuizzes = [
  { name: "JavaScript Basics", score: 85, total: 100, date: "2 days ago" },
  { name: "React Hooks", score: 90, total: 100, date: "5 days ago" },
  { name: "CSS Flexbox", score: 75, total: 100, date: "1 week ago" },
]
