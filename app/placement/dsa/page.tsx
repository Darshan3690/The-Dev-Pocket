'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import { ArrowLeft, Eye, EyeOff, Lightbulb, CheckCircle } from 'lucide-react';

const topics = [
  'Arrays', 'Strings', 'Trees', 'Graphs', 'DP', 'Heaps'
];

const difficulties = ['Easy', 'Medium', 'Hard'];

const problems = [
  {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    hint: 'Use a hash map to store the complement of each number.',
    solution: 'Create a hash map, iterate through array, check if target-current exists in map.'
  },
  {
    id: 2,
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Strings',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    hint: 'Use a stack to keep track of opening brackets.',
    solution: 'Push opening brackets to stack, pop when closing bracket matches top of stack.'
  },
  {
    id: 3,
    title: 'Binary Tree Inorder Traversal',
    difficulty: 'Easy',
    topic: 'Trees',
    description: 'Given the root of a binary tree, return the inorder traversal of its nodes\' values.',
    hint: 'Recursively traverse left subtree, visit root, then right subtree.',
    solution: 'Use recursion: traverse(left) -> visit(root) -> traverse(right).'
  },
  {
    id: 4,
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs',
    description: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
    hint: 'Use DFS or BFS to explore connected components.',
    solution: 'Iterate through grid, when you find \'1\', increment count and DFS to mark all connected \'1\'s.'
  },
  {
    id: 5,
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topic: 'DP',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps.',
    hint: 'Think about how many ways to reach step n from steps n-1 and n-2.',
    solution: 'dp[i] = dp[i-1] + dp[i-2], base cases: dp[1] = 1, dp[2] = 2.'
  },
  {
    id: 6,
    title: 'Kth Largest Element',
    difficulty: 'Medium',
    topic: 'Heaps',
    description: 'Find the kth largest element in an unsorted array.',
    hint: 'Use a min heap of size k.',
    solution: 'Maintain a min heap of size k, the root will be the kth largest element.'
  },
  {
    id: 7,
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Strings',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    hint: 'Use sliding window technique with a hash set.',
    solution: 'Use two pointers and a set to track characters in current window.'
  },
  {
    id: 8,
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    topic: 'Arrays',
    description: 'Given an integer array nums, find the contiguous subarray with the largest sum.',
    hint: 'Use Kadane\'s algorithm.',
    solution: 'Keep track of current sum and maximum sum, reset current sum if it becomes negative.'
  }
];

export default function DSAPage() {
  const [selectedTopic, setSelectedTopic] = useState('Arrays');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [visibleHints, setVisibleHints] = useState<Set<number>>(new Set());
  const [visibleSolutions, setVisibleSolutions] = useState<Set<number>>(new Set());

  const filteredProblems = useMemo(() => {
    return problems.filter(problem => {
      const topicMatch = problem.topic === selectedTopic;
      const difficultyMatch = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
      return topicMatch && difficultyMatch;
    });
  }, [selectedTopic, selectedDifficulty]);

  const toggleHint = (problemId: number) => {
    const newVisible = new Set(visibleHints);
    if (newVisible.has(problemId)) {
      newVisible.delete(problemId);
    } else {
      newVisible.add(problemId);
    }
    setVisibleHints(newVisible);
  };

  const toggleSolution = (problemId: number) => {
    const newVisible = new Set(visibleSolutions);
    if (newVisible.has(problemId)) {
      newVisible.delete(problemId);
    } else {
      newVisible.add(problemId);
    }
    setVisibleSolutions(newVisible);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/placement"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Placement Arena
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">DSA Practice</h1>
          <p className="text-gray-600 dark:text-gray-300">Master data structures and algorithms with structured practice</p>
        </div>

        <SignedIn>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-gray-900 dark:text-white font-medium">Today's Progress</span>
              </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">0/5 problems completed</div>
            </div>
            <div className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </SignedIn>

        {/* Topic Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    selectedTopic === topic
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedDifficulty('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedDifficulty === 'All'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {difficulties.map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedDifficulty === difficulty
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-6">
          {filteredProblems.map((problem) => (
            <div key={problem.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {problem.title}
                  </h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {problem.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => toggleHint(problem.id)}
                  className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors"
                >
                  <Lightbulb className="w-4 h-4 mr-2" />
                  {visibleHints.has(problem.id) ? 'Hide Hint' : 'Show Hint'}
                </button>
                
                <button
                  onClick={() => toggleSolution(problem.id)}
                  className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                >
                  {visibleSolutions.has(problem.id) ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {visibleSolutions.has(problem.id) ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>
              
              {visibleHints.has(problem.id) && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-yellow-800 dark:text-yellow-300">
                    <strong>Hint:</strong> {problem.hint}
                  </p>
                </div>
              )}
              
              {visibleSolutions.has(problem.id) && (
                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400">
                  <p className="text-green-800 dark:text-green-300">
                    <strong>Solution:</strong> {problem.solution}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}