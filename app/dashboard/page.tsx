"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface UserStats {
  points: number;
  currentStreak: number;
  dailyGoalProgress: number;
  dailyGoalTarget: number;
  tasksCompleted: number;
  tasksTotal: number;
}

interface DetailedStats {
  quizChartData: Array<{ date: string; averageScore: number; attempts: number }>;
  bookmarkChartData: Array<{ date: string; bookmarks: number }>;
  activityChartData: Array<{ date: string; quizzes: number; bookmarks: number; totalActivity: number }>;
  categoryChartData: Array<{ category: string; averageScore: number; attempts: number }>;
  recentQuizzes: Array<any>;
  recentBookmarks: Array<any>;
  insights: {
    totalQuizzes: number;
    totalBookmarks: number;
    averageQuizScore: number;
    streakDays: number;
    mostActiveDay: { date: string; totalActivity: number };
    topCategory: { category: string; attempts: number };
  };
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function DashboardPage() {
  const [studyBuddyOpen, setStudyBuddyOpen] = useState(false)
  const { isLoaded, user } = useUser()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [detailedStats, setDetailedStats] = useState<DetailedStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [detailedLoading, setDetailedLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && user) {
      fetchUserStats()
      fetchDetailedStats()
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

  const fetchDetailedStats = async () => {
    try {
      const response = await fetch('/api/user-stats/detailed')
      const data = await response.json()
      setDetailedStats(data)
    } catch (error) {
      console.error('Error fetching detailed stats:', error)
    } finally {
      setDetailedLoading(false)
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

      {/* Charts Section */}
      {!detailedLoading && detailedStats && (
        <div className="space-y-6">
          {/* Activity Overview */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Overview (Last 30 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={detailedStats.activityChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="quizzes" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="bookmarks" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quiz Performance */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Performance Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={detailedStats.quizChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
                  <Line type="monotone" dataKey="averageScore" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={detailedStats.categoryChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
                  <Bar dataKey="averageScore" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Quiz Insights</h4>
              <p className="text-2xl font-bold text-blue-600">{detailedStats.insights.totalQuizzes}</p>
              <p className="text-sm text-blue-700">Total Quizzes Taken</p>
              <p className="text-sm text-blue-600 mt-1">Avg Score: {detailedStats.insights.averageQuizScore}%</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Bookmark Insights</h4>
              <p className="text-2xl font-bold text-green-600">{detailedStats.insights.totalBookmarks}</p>
              <p className="text-sm text-green-700">Resources Bookmarked</p>
              <p className="text-sm text-green-600 mt-1">Most active: {detailedStats.insights.mostActiveDay.date || 'N/A'}</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Learning Streak</h4>
              <p className="text-2xl font-bold text-purple-600">{detailedStats.insights.streakDays}</p>
              <p className="text-sm text-purple-700">Days in a row</p>
              <p className="text-sm text-purple-600 mt-1">Top category: {detailedStats.insights.topCategory.category || 'N/A'}</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quiz Attempts</h3>
              <div className="space-y-3">
                {detailedStats.recentQuizzes.length > 0 ? (
                  detailedStats.recentQuizzes.map((quiz, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{quiz.quiz.title}</p>
                        <p className="text-sm text-gray-600">{quiz.quiz.category.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">{quiz.score}/{quiz.total}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(quiz.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent quiz attempts</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookmarks</h3>
              <div className="space-y-3">
                {detailedStats.recentBookmarks.length > 0 ? (
                  detailedStats.recentBookmarks.map((bookmark, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900 truncate">{bookmark.title}</p>
                      <p className="text-sm text-gray-600 truncate">{bookmark.url}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(bookmark.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No recent bookmarks</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

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

          <Link href="/tech-stack-explorer" className="group block">
            <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-amber-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🛠️</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    Tech Stack Explorer
                  </h3>
                  <p className="text-sm text-amber-600 font-medium">Choose wisely</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Explore popular tech stacks, compare features, and discover which stack is perfect for your project.
              </p>
              <div className="mt-4 flex items-center text-amber-600 text-sm font-medium group-hover:text-amber-700">
                Explore Stacks
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>

          <Link href="/learning-paths" className="group block">
            <div className="bg-gradient-to-br from-rose-50 to-pink-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-rose-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-rose-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📚</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                    Learning Path Recommender
                  </h3>
                  <p className="text-sm text-rose-600 font-medium">Personalized journey</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Get personalized learning paths with skill assessments, weekly milestones, and progress tracking.
              </p>
              <div className="mt-4 flex items-center text-rose-600 text-sm font-medium group-hover:text-rose-700">
                Start Learning
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
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
