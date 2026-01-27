'use client';

import { useState, useMemo } from 'react';
import { techStacks, TechStack } from './data/techstacks';
import StackCard from './components/StackCard';
import FilterBar from './components/FilterBar';
import ComparisonTable from './components/ComparisonTable';
import { BarChart3, Zap, Users, TrendingUp } from 'lucide-react';

export default function TechStackExplorerPage() {
  const [filteredStacks, setFilteredStacks] = useState<TechStack[]>(techStacks);
  const [selectedForComparison, setSelectedForComparison] = useState<TechStack[]>([]);
  const [viewMode, setViewMode] = useState<'cards' | 'comparison'>('cards');

  const stats = useMemo(() => {
    return {
      totalStacks: techStacks.length,
      avgDemand: (techStacks.reduce((acc, s) => acc + s.jobMarketDemand, 0) / techStacks.length).toFixed(1),
      mostDemanded: [...techStacks].sort((a, b) => b.jobMarketDemand - a.jobMarketDemand)[0],
      easiestToLearn: techStacks.find((s) => s.learningDifficulty === 'Easy'),
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Tech Stack Explorer</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Explore, compare, and discover the best technology stacks for your next project. Get insights on job
            market demand, learning difficulty, and real-world usage.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Stacks</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalStacks}</p>
              </div>
              <BarChart3 className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Avg Job Demand</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgDemand}/10</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Most Demanded</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.mostDemanded?.name}</p>
              <p className="text-sm text-purple-600 font-semibold mt-1">{stats.mostDemanded?.jobMarketDemand}/10</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Easiest to Learn</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stats.easiestToLearn?.name}</p>
              <p className="text-sm text-yellow-600 font-semibold mt-1">Easy</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              viewMode === 'cards'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Browse Stacks
          </button>
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              viewMode === 'comparison'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }`}
            disabled={selectedForComparison.length === 0}
          >
            Compare ({selectedForComparison.length})
          </button>
        </div>

        {/* Content */}
        {viewMode === 'cards' ? (
          <div className="space-y-8">
            {/* Filter Bar */}
            <FilterBar
              stacks={techStacks}
              onFilterChange={setFilteredStacks}
              selectedForComparison={selectedForComparison}
              onComparisonChange={setSelectedForComparison}
            />

            {/* Stack Cards */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Available Stacks ({filteredStacks.length})
              </h2>
              {filteredStacks.length > 0 ? (
                <div className="space-y-4">
                  {filteredStacks.map((stack) => (
                    <StackCard key={stack.id} stack={stack} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-12 text-center border border-gray-200">
                  <p className="text-gray-600 text-lg">No stacks match your filters. Try adjusting your criteria.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {selectedForComparison.length > 0 && (
              <>
                <FilterBar
                  stacks={techStacks}
                  onFilterChange={setFilteredStacks}
                  selectedForComparison={selectedForComparison}
                  onComparisonChange={setSelectedForComparison}
                />
                <ComparisonTable
                  stacks={selectedForComparison}
                  onRemove={(stackId) =>
                    setSelectedForComparison(selectedForComparison.filter((s) => s.id !== stackId))
                  }
                />
              </>
            )}
          </div>
        )}

        {/* Decision Helper */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Choosing Your Tech Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  1
                </span>
                Consider Your Goals
              </h4>
              <p className="text-gray-700 text-sm">
                What are you building? A startup MVP? An enterprise application? A real-time system? Your project type
                should guide your stack choice.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  2
                </span>
                Check Team Skills
              </h4>
              <p className="text-gray-700 text-sm">
                Does your team know the stack? Learning a new stack takes time. Consider your team&apos;s experience and
                the time you can invest in learning.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  3
                </span>
                Job Market Matters
              </h4>
              <p className="text-gray-700 text-sm">
                If you&apos;re learning for career growth, consider job market demand. Stacks like MERN and Spring Boot
                have strong job markets.
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Takeaways</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                    ✓
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">No One-Size-Fits-All Solution</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Each stack has its strengths and weaknesses. Choose based on your specific needs.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                    ✓
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Community Support Matters</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    A large community means more resources, libraries, and help when you get stuck.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                    ✓
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Learning Difficulty Varies</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Some stacks are easier to learn. Start with what matches your experience level.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-6 w-6 rounded-md bg-blue-500 text-white">
                    ✓
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Scalability Considerations</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Think about your growth plans. Some stacks scale better than others.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Use the tools above to explore, filter, and compare tech stacks. Check out real-world projects, community
            resources, and salary information to make an informed decision.
          </p>
          <a
            href="/career-guidance"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
          >
            Get Career Guidance
          </a>
        </div>
      </div>
    </div>
  );
}
