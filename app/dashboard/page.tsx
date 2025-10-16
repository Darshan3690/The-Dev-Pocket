"use client"

import { useState } from "react"
import Link from "next/link";

export default function DashboardPage() {
  const [studyBuddyOpen, setStudyBuddyOpen] = useState(false)

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Points</p>
          <h3 className="text-2xl font-bold">1,240</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Streak</p>
          <h3 className="text-2xl font-bold">7 Days 🔥</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Daily Goal</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Tasks Done</p>
          <h3 className="text-2xl font-bold">12/20</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/create-roadmap" className="group block">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">✨</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    AI Roadmap Generator
                  </h3>
                  <p className="text-sm text-blue-600 font-medium">New Feature!</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Create personalized learning paths with AI assistance based on your goals and experience level.
              </p>
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                Create Roadmap 
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📚</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Study Resources</h3>
                <p className="text-sm text-gray-500">Browse library</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Access curated learning materials, tutorials, and documentation.
            </p>
          </div>

          <button 
            onClick={() => setStudyBuddyOpen(true)}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 text-left group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Study Buddy</h3>
                <p className="text-sm text-gray-500">AI Assistant</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Get instant help with coding questions and study guidance.
            </p>
          </button>
        </div>
      </div>

      
      {/* AI Study Buddy Modal (simplified) */}
      {studyBuddyOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-lg font-semibold mb-4">Study Buddy 🤖</h2>
            <textarea
              className="w-full border p-2 rounded-md mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
              placeholder="Ask me anything..."
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setStudyBuddyOpen(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                Close
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
