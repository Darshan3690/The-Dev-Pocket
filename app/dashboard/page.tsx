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

