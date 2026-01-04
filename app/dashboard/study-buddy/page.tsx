"use client"

import { useState } from "react"
import { UserPlus, Users, MessageCircle, Video, Calendar, Search, Star, MapPin } from "lucide-react"

const studyBuddies = [
  {
    name: "Emma Wilson",
    avatar: "EW",
    skills: ["React", "TypeScript", "Node.js"],
    timezone: "PST (UTC-8)",
    rating: 4.9,
    sessions: 45,
    status: "online"
  },
  {
    name: "James Chen",
    avatar: "JC",
    skills: ["Python", "Machine Learning", "FastAPI"],
    timezone: "EST (UTC-5)",
    rating: 4.8,
    sessions: 32,
    status: "online"
  },
  {
    name: "Sofia Garcia",
    avatar: "SG",
    skills: ["JavaScript", "Vue.js", "CSS"],
    timezone: "CET (UTC+1)",
    rating: 4.7,
    sessions: 28,
    status: "away"
  },
]

export default function StudyBuddyPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
          <UserPlus className="w-5 h-5 text-purple-600" />
          <span className="text-sm font-medium text-purple-700">Find Learning Partners</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Study Buddy
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Connect with fellow developers for pair programming, code reviews, and collaborative learning sessions.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <Users className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800">2,450+</p>
          <p className="text-sm text-slate-500">Active Members</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <Video className="w-8 h-8 text-pink-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800">890</p>
          <p className="text-sm text-slate-500">Sessions This Week</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 text-center">
          <Calendar className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-slate-800">15k+</p>
          <p className="text-sm text-slate-500">Total Sessions</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by skills, name, or timezone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        />
      </div>

      {/* Study Buddies List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Available Study Buddies</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {studyBuddies.map((buddy, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {buddy.avatar}
                  </div>
                  <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                    buddy.status === "online" ? "bg-green-500" : "bg-yellow-500"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{buddy.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="w-3 h-3" /> {buddy.timezone}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {buddy.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-lg">{skill}</span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-500" /> {buddy.rating}</span>
                <span>{buddy.sessions} sessions</span>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
