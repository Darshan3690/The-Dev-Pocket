"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import { motion } from "framer-motion"


interface UserStats {
  points: number;
  currentStreak: number;
  dailyGoalProgress: number;
  dailyGoalTarget: number;
  tasksCompleted: number;
  tasksTotal: number;
}

export default function DashboardPage() {
  const [studyBuddyOpen, setStudyBuddyOpen] = useState(false)
  const { isLoaded, user } = useUser()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentBadges, setRecentBadges] = useState<any[]>([])
  const [badgesLoading, setBadgesLoading] = useState(true)


  useEffect(() => {
    if (isLoaded && user) {
      fetchUserStats()
      fetchRecentBadges()
    }
  }, [isLoaded, user])


  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/user-stats')
      const data = await response.json()
      if (data.stats) {
        setStats(data.stats)
      } else {
        // Set default stats if API returns nothing
        setStats({
          points: 0,
          currentStreak: 0,
          dailyGoalProgress: 0,
          dailyGoalTarget: 100,
          tasksCompleted: 0,
          tasksTotal: 0,
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Set default stats on error
      setStats({
        points: 0,
        currentStreak: 0,
        dailyGoalProgress: 0,
        dailyGoalTarget: 100,
        tasksCompleted: 0,
        tasksTotal: 0,
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentBadges = async () => {
    try {
      const response = await fetch('/api/user-badges?limit=3')
      const data = await response.json()
      if (data.badges) {
        setRecentBadges(data.badges.slice(0, 3))
      }
    } catch (error) {
      console.error('Error fetching badges:', error)
    } finally {
      setBadgesLoading(false)
    }
  }


  const dailyGoalPercentage = stats 
    ? Math.min(100, Math.round((stats.dailyGoalProgress / stats.dailyGoalTarget) * 100))
    : 0

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-500 font-medium mb-2">Points</p>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mt-1"></div>
          ) : (
            <h3 className="text-3xl font-bold text-gray-900">
              {stats?.points.toLocaleString() || 0}
            </h3>
          )}
          {!loading && stats?.points === 0 && (
            <p className="text-xs text-gray-400 mt-1">Complete tasks to earn points</p>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-500 font-medium mb-2">Streak</p>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mt-1"></div>
          ) : (
            <>
              {(stats?.currentStreak || 0) === 0 ? (
                <>
                  <h3 className="text-2xl font-bold text-orange-500">
                    Start today! 🚀
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Begin your learning streak</p>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-orange-500">
                    {stats?.currentStreak || 0} Days 🔥
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Keep it going!</p>
                </>
              )}
            </>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-500 font-medium mb-2">Daily Goal</p>
          {loading ? (
            <div className="h-2.5 bg-gray-200 rounded-full animate-pulse mt-2"></div>
          ) : (
            <>
              {dailyGoalPercentage === 0 ? (
                <>
                  <h3 className="text-xl font-bold text-blue-500">
                    Set your first goal
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Start your journey today</p>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">
                    {dailyGoalPercentage}%
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                      style={{ width: `${dailyGoalPercentage}%` }}
                    ></div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <p className="text-sm text-gray-500 font-medium mb-2">Tasks Done</p>
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse mt-1"></div>
          ) : (
            <>
              {(stats?.tasksTotal || 0) === 0 ? (
                <>
                  <h3 className="text-xl font-bold text-green-500">
                    Create your first task
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Get organized today</p>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-green-600">
                    {stats?.tasksCompleted || 0}/{stats?.tasksTotal || 0}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {stats?.tasksCompleted === stats?.tasksTotal 
                      ? "All done! 🎉" 
                      : `${(stats?.tasksTotal || 0) - (stats?.tasksCompleted || 0)} remaining`}
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Recent Badges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
          <Link 
            href="/dashboard/achievements" 
            className="text-violet-600 hover:text-violet-700 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        
        {badgesLoading ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : recentBadges.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {recentBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-violet-50 to-purple-50 p-4 rounded-xl border border-violet-200 flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-white rounded-lg shadow flex items-center justify-center text-2xl">
                  {badge.badge.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{badge.badge.name}</h3>
                  <p className="text-xs text-gray-500">+{badge.badge.points} points</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 text-center border border-violet-100">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="font-semibold text-gray-900 mb-1">No badges yet</h3>
            <p className="text-sm text-gray-600 mb-3">Complete quizzes and activities to earn your first badge!</p>
            <Link 
              href="/dashboard/quiz" 
              className="inline-flex items-center px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition"
            >
              Start Learning
            </Link>
          </div>
        )}
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
