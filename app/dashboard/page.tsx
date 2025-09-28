"use client"

import { useState } from "react"
import Link from "next/link";

export default function DashboardPage() {
  const [studyBuddyOpen, setStudyBuddyOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Learning Dashboard</h1>
          <p className="text-gray-600">Welcome back! Continue your learning journey</p>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Points</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">1,240</h3>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">🏆</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Streak</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">7 Days</h3>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">🔥</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div>
              <p className="text-sm font-medium text-gray-500">Daily Goal</p>
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tasks Done</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">12/20</h3>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">⚡</span>
            </div>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Link href="/create-roadmap">
              <button className="group bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full text-left h-full">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xl">✨</span>
                </div>
                <h3 className="font-semibold">Create Roadmap</h3>
                <p className="text-blue-100 text-sm mt-1">Plan your learning path</p>
              </button>
            </Link>

            <button 
              onClick={() => setStudyBuddyOpen(true)}
              className="group bg-gradient-to-br from-green-500 to-teal-600 text-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full text-left h-full"
            >
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">🤖</span>
              </div>
              <h3 className="font-semibold">Study Buddy</h3>
              <p className="text-green-100 text-sm mt-1">AI learning assistant</p>
            </button>

            <button className="group bg-gradient-to-br from-purple-500 to-pink-600 text-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full text-left h-full">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">🚀</span>
              </div>
              <h3 className="font-semibold">AI Project Recommender</h3>
              <p className="text-purple-100 text-sm mt-1">Personalized projects</p>
            </button>

            <button className="group bg-gradient-to-br from-orange-500 to-red-500 text-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full text-left h-full">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">📄</span>
              </div>
              <h3 className="font-semibold">Resume Builder</h3>
              <p className="text-orange-100 text-sm mt-1">Build your resume</p>
            </button>

            <button className="group bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full text-left h-full">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">❓</span>
              </div>
              <h3 className="font-semibold">Quiz Center</h3>
              <p className="text-indigo-100 text-sm mt-1">Test your knowledge</p>
            </button>

            <button className="group bg-gradient-to-br from-gray-700 to-gray-900 text-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full text-left h-full">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">📝</span>
              </div>
              <h3 className="font-semibold">Notes / To-Do</h3>
              <p className="text-gray-300 text-sm mt-1">Organize your tasks</p>
            </button>

            <button className="group bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full text-left h-full">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="text-xl">📅</span>
              </div>
              <h3 className="font-semibold">Calendar</h3>
              <p className="text-cyan-100 text-sm mt-1">Schedule your study</p>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced AI Study Buddy Modal */}
      {studyBuddyOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 transform transition-all duration-300 scale-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">🤖</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Study Buddy</h2>
                  <p className="text-sm text-gray-500">Your AI learning assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setStudyBuddyOpen(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-500">×</span>
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <p className="text-gray-700 text-sm">
                Hi! I'm here to help with your questions. What would you like to learn today?
              </p>
            </div>
            
            <textarea
              className="w-full border border-gray-300 p-3 rounded-xl mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none transition-all resize-none"
              rows={4}
              placeholder="Ask me anything about your studies..."
            />
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Press Enter to send</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setStudyBuddyOpen(false)} 
                  className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-5 py-2.5 rounded-xl hover:from-green-600 hover:to-teal-700 transition-all font-medium shadow-md">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}