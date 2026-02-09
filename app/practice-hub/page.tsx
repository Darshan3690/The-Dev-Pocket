"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

interface CodingProblem {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topics: string[];
  platforms: {
    name: "LeetCode" | "HackerRank" | "CodeSignal" | "HackerEarth" | "AtCoder" | "Codeforces";
    url: string;
  }[];
  dailyChallenge?: boolean;
  completed?: boolean;
  attempts?: number;
}

interface DailyChallenge {
  date: string;
  problem: CodingProblem;
  timeLimit: number; // in minutes
  completed: boolean;
}

// Daily Coding Challenges
const dailyChallenges: DailyChallenge[] = [
  {
    date: "2026-01-27",
    problem: {
      id: "dc-1",
      title: "Two Sum",
      description: "Find two numbers that add up to a target",
      difficulty: "easy",
      topics: ["Arrays", "Hash Table"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/two-sum/" },
        { name: "HackerRank", url: "https://www.hackerrank.com" },
      ],
      dailyChallenge: true,
      completed: false,
      attempts: 0,
    },
    timeLimit: 30,
    completed: false,
  },
  {
    date: "2026-01-28",
    problem: {
      id: "dc-2",
      title: "Longest Substring Without Repeating Characters",
      description: "Find the length of the longest substring",
      difficulty: "medium",
      topics: ["String", "Hash Table", "Sliding Window"],
      platforms: [
        { name: "LeetCode", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
        { name: "CodeSignal", url: "https://codesignal.com" },
      ],
      dailyChallenge: true,
      completed: false,
      attempts: 0,
    },
    timeLimit: 45,
    completed: false,
  },
];

// Categorized Coding Problems
const codingProblems: CodingProblem[] = [
  // Arrays
  {
    id: "arr-1",
    title: "Two Sum",
    description: "Find two numbers that add up to a target",
    difficulty: "easy",
    topics: ["Arrays"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/two-sum/" },
      { name: "HackerRank", url: "https://www.hackerrank.com/challenges/solve-me-first/" },
    ],
    completed: true,
    attempts: 3,
  },
  {
    id: "arr-2",
    title: "Container With Most Water",
    description: "Find two lines that together with x-axis form a container",
    difficulty: "medium",
    topics: ["Arrays", "Two Pointers"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/container-with-most-water/" },
      { name: "CodeSignal", url: "https://codesignal.com" },
    ],
    completed: false,
    attempts: 1,
  },
  {
    id: "arr-3",
    title: "Median of Two Sorted Arrays",
    description: "Find the median of two sorted arrays",
    difficulty: "hard",
    topics: ["Arrays", "Binary Search"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/" },
      { name: "HackerEarth", url: "https://www.hackerearth.com" },
    ],
    completed: false,
    attempts: 0,
  },

  // Strings
  {
    id: "str-1",
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring",
    difficulty: "medium",
    topics: ["String", "Sliding Window"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
      { name: "CodeSignal", url: "https://codesignal.com" },
    ],
    completed: true,
    attempts: 2,
  },
  {
    id: "str-2",
    title: "Palindrome Number",
    description: "Determine if an integer is a palindrome",
    difficulty: "easy",
    topics: ["String", "Math"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/palindrome-number/" },
      { name: "HackerRank", url: "https://www.hackerrank.com" },
    ],
    completed: true,
    attempts: 1,
  },
  {
    id: "str-3",
    title: "Regular Expression Matching",
    description: "Match strings with regular expressions",
    difficulty: "hard",
    topics: ["String", "Dynamic Programming"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/regular-expression-matching/" },
      { name: "AtCoder", url: "https://atcoder.jp" },
    ],
    completed: false,
    attempts: 0,
  },

  // Trees
  {
    id: "tree-1",
    title: "Binary Tree Level Order Traversal",
    description: "Traverse a binary tree level by level",
    difficulty: "medium",
    topics: ["Trees", "BFS"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
      { name: "HackerRank", url: "https://www.hackerrank.com" },
    ],
    completed: false,
    attempts: 1,
  },
  {
    id: "tree-2",
    title: "Lowest Common Ancestor",
    description: "Find the LCA of two nodes in a binary tree",
    difficulty: "medium",
    topics: ["Trees", "DFS"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
      { name: "CodeSignal", url: "https://codesignal.com" },
    ],
    completed: false,
    attempts: 2,
  },
  {
    id: "tree-3",
    title: "Binary Tree Maximum Path Sum",
    description: "Find the maximum path sum in a binary tree",
    difficulty: "hard",
    topics: ["Trees", "DFS", "Dynamic Programming"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
      { name: "HackerEarth", url: "https://www.hackerearth.com" },
    ],
    completed: false,
    attempts: 0,
  },

  // Graphs
  {
    id: "graph-1",
    title: "Clone Graph",
    description: "Clone an undirected graph",
    difficulty: "medium",
    topics: ["Graphs", "BFS", "DFS"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/clone-graph/" },
      { name: "CodeSignal", url: "https://codesignal.com" },
    ],
    completed: false,
    attempts: 1,
  },
  {
    id: "graph-2",
    title: "Shortest Path in Graph",
    description: "Find the shortest path between two nodes",
    difficulty: "medium",
    topics: ["Graphs", "Dijkstra", "BFS"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/network-delay-time/" },
      { name: "Codeforces", url: "https://codeforces.com" },
    ],
    completed: false,
    attempts: 0,
  },

  // Dynamic Programming
  {
    id: "dp-1",
    title: "Climbing Stairs",
    description: "Count ways to climb stairs",
    difficulty: "easy",
    topics: ["Dynamic Programming"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/climbing-stairs/" },
      { name: "HackerRank", url: "https://www.hackerrank.com" },
    ],
    completed: true,
    attempts: 1,
  },
  {
    id: "dp-2",
    title: "Coin Change",
    description: "Find minimum coins needed for a total",
    difficulty: "medium",
    topics: ["Dynamic Programming"],
    platforms: [
      { name: "LeetCode", url: "https://leetcode.com/problems/coin-change/" },
      { name: "HackerEarth", url: "https://www.hackerearth.com" },
    ],
    completed: false,
    attempts: 2,
  },
];

const allTopics = ["Arrays", "String", "Trees", "Graphs", "Dynamic Programming", "Hash Table", "Two Pointers", "Sliding Window", "BFS", "DFS", "Dijkstra"];

const platformColors: Record<string, string> = {
  LeetCode: "bg-yellow-100 text-yellow-800",
  HackerRank: "bg-green-100 text-green-800",
  CodeSignal: "bg-blue-100 text-blue-800",
  HackerEarth: "bg-purple-100 text-purple-800",
  AtCoder: "bg-red-100 text-red-800",
  Codeforces: "bg-indigo-100 text-indigo-800",
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

export default function PracticeHubPage() {
  const { user } = useUser();
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [completedOnly, setCompletedOnly] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter problems
  const filteredProblems = useMemo(() => {
    return codingProblems.filter((problem) => {
      const matchesDifficulty = selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
      const matchesTopic = selectedTopic === "all" || problem.topics.includes(selectedTopic);
      const matchesSearch =
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCompleted = !completedOnly || problem.completed;

      return matchesDifficulty && matchesTopic && matchesSearch && matchesCompleted;
    });
  }, [selectedDifficulty, selectedTopic, searchQuery, completedOnly]);

  // Calculate stats
  const stats = {
    totalProblems: codingProblems.length,
    completedProblems: codingProblems.filter((p) => p.completed).length,
    totalAttempts: codingProblems.reduce((sum, p) => sum + (p.attempts || 0), 0),
    currentStreak: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
            Coding Practice Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master DSA, competitive programming, and interview questions with daily challenges, curated problems, and progress tracking.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Problems Solved", value: stats.completedProblems, total: stats.totalProblems, icon: "✓" },
            { label: "Total Attempts", value: stats.totalAttempts, icon: "🎯" },
            { label: "Current Streak", value: `${stats.currentStreak} days`, icon: "🔥" },
            { label: "Progress", value: `${Math.round((stats.completedProblems / stats.totalProblems) * 100)}%`, icon: "📈" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              {stat.total && <div className="text-xs text-gray-500 dark:text-gray-400">of {stat.total}</div>}
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Daily Challenge Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-2xl p-8 mb-12 text-white shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">⭐</span>
            <h2 className="text-2xl font-bold">Today&apos;s Coding Challenge</h2>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">{dailyChallenges[0].problem.title}</h3>
            <p className="text-white/90 mb-4">{dailyChallenges[0].problem.description}</p>
            <div className="flex flex-wrap gap-3 items-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white/20`}>Difficulty: {dailyChallenges[0].problem.difficulty}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white/20`}>Time Limit: {dailyChallenges[0].timeLimit} min</span>
              <div className="flex gap-2 ml-auto">
                {dailyChallenges[0].problem.platforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-red-500 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Solve on {platform.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col gap-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search problems by title or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:outline-none transition"
              />
              <span className="absolute right-4 top-3 text-gray-400">🔍</span>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Difficulty Level</label>
                <div className="flex flex-wrap gap-2">
                  {["all", "easy", "medium", "hard"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedDifficulty(level as "all" | "easy" | "medium" | "hard")}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                        selectedDifficulty === level
                          ? `${difficultyColors[level as keyof typeof difficultyColors]} scale-105`
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Topic</label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="all">All Topics</option>
                  {allTopics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              {/* View & Status Controls */}
              <div className="flex flex-col gap-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">View Options</label>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {viewMode === "grid" ? "📋 List" : "🔲 Grid"}
                  </button>
                  <button
                    onClick={() => setCompletedOnly(!completedOnly)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                      completedOnly ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {completedOnly ? "✓ Completed" : "All"}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
              Showing {filteredProblems.length} of {codingProblems.length} problems
            </div>
          </div>
        </motion.div>

        {/* Problems Section */}
        <div className="mb-12">
          {filteredProblems.length > 0 ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
                >
                  {/* Completion Status Indicator */}
                  {problem.completed && (
                    <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-600"></div>
                  )}

                  <div className="p-6">
                    {/* Title and Status */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition">{problem.title}</h3>
                      {problem.completed && <span className="text-2xl">✅</span>}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{problem.description}</p>

                    {/* Difficulty & Attempts */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[problem.difficulty]}`}>
                        {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                      </span>
                      {problem.attempts !== undefined && problem.attempts > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                          {problem.attempts} attempt{problem.attempts > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {problem.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-md"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Platforms */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {problem.platforms.map((platform) => (
                        <span key={platform.name} className={`px-2 py-1 text-xs rounded-md font-semibold ${platformColors[platform.name]}`}>
                          {platform.name}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {problem.platforms.map((platform) => (
                        <a
                          key={platform.name}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors text-center"
                        >
                          {platform.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center">
              <p className="text-xl text-gray-600 dark:text-gray-400">No problems found matching your filters.</p>
              <button
                onClick={() => {
                  setSelectedDifficulty("all");
                  setSelectedTopic("all");
                  setSearchQuery("");
                  setCompletedOnly(false);
                }}
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Platform Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Practice Platforms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "LeetCode", url: "https://leetcode.com", description: "1900+ problems, contests, and subscriptions" },
              { name: "HackerRank", url: "https://www.hackerrank.com", description: "Interview prep, competitive programming" },
              { name: "CodeSignal", url: "https://codesignal.com", description: "Interview simulations and assessments" },
              { name: "HackerEarth", url: "https://www.hackerearth.com", description: "Hackathons and coding challenges" },
              { name: "AtCoder", url: "https://atcoder.jp", description: "Japanese competitive programming platform" },
              { name: "Codeforces", url: "https://codeforces.com", description: "Competitive programming contests" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 border border-gray-200 dark:border-gray-600"
              >
                <div className="font-semibold text-gray-900 dark:text-white mb-1">{platform.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{platform.description}</div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">💡 Pro Tips for Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Consistency is Key",
                description: "Solve at least one problem daily to maintain your streak and build momentum.",
              },
              {
                title: "Start with Easy Problems",
                description: "Build confidence by mastering easy problems before moving to medium and hard.",
              },
              {
                title: "Focus on One Topic",
                description: "Master one data structure or algorithm at a time for better understanding.",
              },
              {
                title: "Track Your Progress",
                description: "Review completed problems weekly and analyze patterns in your mistakes.",
              },
              {
                title: "Understand, Don't Memorize",
                description: "Focus on understanding the approach rather than memorizing solutions.",
              },
              {
                title: "Join Communities",
                description: "Participate in contests and discussions to learn from other programmers.",
              },
            ].map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
