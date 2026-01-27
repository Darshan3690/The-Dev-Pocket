'use client';

import { useState } from 'react';
import { TechStack } from '../data/techstacks';
import { X } from 'lucide-react';

interface FilterBarProps {
  stacks: TechStack[];
  onFilterChange: (filtered: TechStack[]) => void;
  selectedForComparison: TechStack[];
  onComparisonChange: (selected: TechStack[]) => void;
}

export default function FilterBar({
  stacks,
  onFilterChange,
  selectedForComparison,
  onComparisonChange,
}: FilterBarProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [selectedJobDemand, setSelectedJobDemand] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const difficulties = ['Easy', 'Medium', 'Hard', 'Very Hard'];

  const applyFilters = (difficulty: string[], jobDemand: number | null, query: string) => {
    let filtered = stacks;

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (stack) =>
          stack.name.toLowerCase().includes(query.toLowerCase()) ||
          stack.description.toLowerCase().includes(query.toLowerCase()) ||
          stack.technologies.some((tech) => tech.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Difficulty filter
    if (difficulty.length > 0) {
      filtered = filtered.filter((stack) => difficulty.includes(stack.learningDifficulty));
    }

    // Job demand filter
    if (jobDemand !== null) {
      filtered = filtered.filter((stack) => stack.jobMarketDemand >= jobDemand);
    }

    onFilterChange(filtered);
  };

  const handleDifficultyChange = (diff: string) => {
    const newDifficulty = selectedDifficulty.includes(diff)
      ? selectedDifficulty.filter((d) => d !== diff)
      : [...selectedDifficulty, diff];
    setSelectedDifficulty(newDifficulty);
    applyFilters(newDifficulty, selectedJobDemand, searchQuery);
  };

  const handleJobDemandChange = (demand: number | null) => {
    setSelectedJobDemand(demand);
    applyFilters(selectedDifficulty, demand, searchQuery);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    applyFilters(selectedDifficulty, selectedJobDemand, query);
  };

  const toggleComparison = (stack: TechStack) => {
    const isSelected = selectedForComparison.some((s) => s.id === stack.id);
    if (isSelected) {
      onComparisonChange(selectedForComparison.filter((s) => s.id !== stack.id));
    } else if (selectedForComparison.length < 3) {
      onComparisonChange([...selectedForComparison, stack]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 space-y-6">
      {/* Search */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">Search Stacks</label>
        <input
          type="text"
          placeholder="Search by name, description, or technology..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Learning Difficulty</label>
          <div className="space-y-2">
            {difficulties.map((diff) => (
              <label key={diff} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedDifficulty.includes(diff)}
                  onChange={() => handleDifficultyChange(diff)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{diff}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Job Demand Filter */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">Minimum Job Market Demand</label>
          <div className="space-y-2">
            {[
              { label: 'Show All', value: null },
              { label: 'High (8+)', value: 8 },
              { label: 'Medium (6+)', value: 6 },
              { label: 'Any (0+)', value: 0 },
            ].map(({ label, value }) => (
              <label key={label} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="demand"
                  checked={selectedJobDemand === value}
                  onChange={() => handleJobDemandChange(value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Selector */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-3">
          Compare Stacks (Select up to 3)
        </label>
        <div className="space-y-2">
          {stacks.map((stack) => (
            <button
              key={stack.id}
              onClick={() => toggleComparison(stack)}
              className={`w-full text-left px-4 py-2 rounded-lg border transition-colors ${
                selectedForComparison.some((s) => s.id === stack.id)
                  ? 'bg-blue-100 border-blue-500 text-blue-900'
                  : selectedForComparison.length >= 3
                    ? 'bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300'
              }`}
              disabled={selectedForComparison.length >= 3 && !selectedForComparison.some((s) => s.id === stack.id)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{stack.name}</span>
                {selectedForComparison.some((s) => s.id === stack.id) && (
                  <span className="text-lg">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
