"use client"

import Image from "next/image"
import { Play } from "lucide-react"

interface QuizCardProps {
  name: string
  icon?: string | null
  questions: number
  color: string
  selected: boolean
  onSelect: () => void
}

export default function QuizCard({
  name,
  icon,
  questions,
  color,
  selected,
  onSelect,
}: QuizCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 text-left group ${
        selected ? "border-violet-500" : "border-slate-200"
      }`}
    >
      {/* Decorative gradient blob */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${color} opacity-10 rounded-bl-full`}
      />

      {/* Icon wrapper */}
      <div className="w-12 h-12 mb-4 rounded-xl bg-slate-50 flex items-center justify-center">
        <div className="relative w-8 h-8">
          {icon ? (
            <Image
              src={icon}
              alt={`${name} logo`}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <span className="text-xl">📘</span> // fallback icon
          )}
        </div>
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold text-slate-800 group-hover:text-violet-600 transition-colors">
        {name}
      </h3>
      <p className="text-sm text-slate-500">{questions} questions</p>

      {/* Hover action */}
      <div className="mt-4 flex items-center gap-2 text-violet-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <Play className="w-4 h-4" />
        Start Quiz
      </div>
    </button>
  )
}
