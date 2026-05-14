"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import BadgeCelebration from "@/components/badges/BadgeCelebration"

interface Question {
  id: string
  text: string
  options: string[]
  correct: number
}

interface EarnedBadge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY"
  points: number
}

export default function QuizRunner({ 
  questions, 
  quizId 
}: { 
  questions: Question[]
  quizId: string
}) {
  const { user } = useUser()
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [earnedBadges, setEarnedBadges] = useState<EarnedBadge[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0)


  const question = questions[current]
  const options = question.options
  const progress = ((current + 1) / questions.length) * 100

  function handleAnswer(index: number) {
    setSelected(index)
    setAnswered(true)

    if (index === question.correct) {
      setScore((s) => s + 1)
    }
  }

  function handleNext() {
    if (current + 1 === questions.length) {
      setFinished(true)
      // Check for badges after quiz completion
      checkBadges()
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  async function checkBadges() {
    if (!user) return

    try {
      const response = await fetch("/api/badges/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "QUIZ_COMPLETED",
          data: {
            quizId,
            score,
            total: questions.length,
          },
        }),
      })

      const data = await response.json()

      if (data.awarded && data.badges.length > 0) {
        setEarnedBadges(data.badges)
        setCurrentBadgeIndex(0)
        setShowCelebration(true)
      }
    } catch (error) {
      console.error("Error checking badges:", error)
    }
  }

  function handleCelebrationClose() {
    if (currentBadgeIndex < earnedBadges.length - 1) {
      // Show next badge
      setCurrentBadgeIndex((prev) => prev + 1)
    } else {
      // All badges shown
      setShowCelebration(false)
      setEarnedBadges([])
      setCurrentBadgeIndex(0)
    }
  }


  function restartQuiz() {
    setCurrent(0)
    setSelected(null)
    setAnswered(false)
    setScore(0)
    setFinished(false)
  }

  /* ===================== RESULT SCREEN ===================== */
  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-6 border border-slate-200">
            <h1 className="text-3xl font-bold text-slate-900">
              Quiz Completed 🎉
            </h1>

            <p className="text-lg text-slate-700">
              You scored
            </p>

            <div className="text-5xl font-extrabold text-violet-600">
              {score} / {questions.length}
            </div>

            <p className="text-slate-600">
              ({percentage}%)
            </p>

            <div
              className={`text-lg font-semibold ${
                percentage >= 70
                  ? "text-green-600"
                  : percentage >= 40
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {percentage >= 70
                ? "Excellent work!"
                : percentage >= 40
                ? "Good effort!"
                : "Keep practicing!"}
            </div>

            {/* Badge Notification */}
            {earnedBadges.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-sm text-yellow-800 font-medium mb-2">
                  🏆 New Badge{earnedBadges.length > 1 ? "s" : ""} Earned!
                </p>
                <div className="flex justify-center gap-2">
                  {earnedBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="w-10 h-10 bg-white rounded-lg shadow flex items-center justify-center text-xl"
                      title={badge.name}
                    >
                      {badge.icon}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={restartQuiz}
              className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700"
            >
              Restart Quiz
            </button>
          </div>
        </div>

        {/* Badge Celebration */}
        <BadgeCelebration
          isOpen={showCelebration}
          onClose={handleCelebrationClose}
          badge={earnedBadges[currentBadgeIndex] || null}
        />
      </>
    )
  }


  /* ===================== QUIZ SCREEN ===================== */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-8">

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600">
            <span>
              Question {current + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-violet-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <p className="text-xl font-medium text-slate-900">
          {question.text}
        </p>

        {/* Options */}
        <div className="space-y-3 text-slate-900">
          {options.map((option, index) => {
            let styles =
              "border-slate-200 bg-white hover:bg-slate-50"

            if (answered) {
              if (index === question.correct) {
                styles =
                  "border-green-500 bg-green-50 text-green-700"
              } else if (index === selected) {
                styles =
                  "border-red-500 bg-red-50 text-red-700"
              } else {
                styles =
                  "border-slate-200 opacity-60"
              }
            } else if (selected === index) {
              styles =
                "border-violet-500 bg-violet-50"
            }

            return (
              <button
                key={index}
                disabled={answered}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 rounded-xl border text-left font-medium transition ${styles}`}
              >
                {option}
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          disabled={!answered}
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 disabled:opacity-40"
        >
          {current + 1 === questions.length ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  )
}
