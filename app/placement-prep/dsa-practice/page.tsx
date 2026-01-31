"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FilterBar from '@/app/components/placement-prep/FilterBar';
import DSAProblemCard from '@/app/components/placement-prep/DSAProblemCard';
import { dsaProblems, dsaTopics, difficultyLevels } from '@/app/data/dsaProblems';

export default function DSAPracticePage() {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter problems based on selected filters
  const filteredProblems = useMemo(() => {
    return dsaProblems.filter(problem => {
      const matchesTopic = selectedTopic === 'All' || problem.topic === selectedTopic;
      const matchesDifficulty = selectedDifficulty === 'All' || problem.difficulty === selectedDifficulty;
      const matchesSearch = searchQuery === '' || 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        problem.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesTopic && matchesDifficulty && matchesSearch;
    });
  }, [selectedTopic, selectedDifficulty, searchQuery]);

  // Get topic options with counts
  const topicOptions = dsaTopics.map(topic => ({
    value: topic,
    label: topic,
    count: topic === 'All' ? dsaProblems.length : dsaProblems.filter(p => p.topic === topic).length
  }));

  // Get difficulty options with counts
  const difficultyOptions = difficultyLevels.map(difficulty => ({
    value: difficulty,
    label: difficulty,
    count: difficulty === 'All' ? dsaProblems.length : dsaProblems.filter(p => p.difficulty === difficulty).length
  }));

  // Get topic statistics
  const topicStats = dsaTopics.slice(1).map(topic => {
    const problems = dsaProblems.filter(p => p.topic === topic);
    const easy = problems.filter(p => p.difficulty === 'Easy').length;
    const medium = problems.filter(p => p.difficulty === 'Medium').length;
    const hard = problems.filter(p => p.difficulty === 'Hard').length;
    
    return {
      topic,
      total: problems.length,
      easy,
      medium,
      hard
    };
  }).filter(stat => stat.total > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Link href="/placement-prep" className="hover:text-sky-600 dark:hover:text-sky-400">
              Placement Prep
            </Link>
            <span>→</span>
            <span>DSA Practice</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                🧮 DSA Practice Arena
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Master data structures and algorithms with {dsaProblems.length} carefully curated problems
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                📊 View Progress
              </Button>
              <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                🎯 Daily Challenge
              </Button>
            </div>
          </div>
        </div>

        {/* Topic Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Topic Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topicStats.map((stat) => (
              <Card 
                key={stat.topic} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedTopic === stat.topic ? 'ring-2 ring-sky-500 border-sky-500' : ''
                }`}
                onClick={() => setSelectedTopic(stat.topic)}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {stat.topic}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {stat.total} problems
                    </span>
                    <div className="flex gap-1">
                      {stat.easy > 0 && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                          {stat.easy}E
                        </Badge>
                      )}
                      {stat.medium > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs">
                          {stat.medium}M
                        </Badge>
                      )}
                      {stat.hard > 0 && (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs">
                          {stat.hard}H
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <FilterBar
                title="Filter by Topic"
                options={topicOptions}
                selectedValue={selectedTopic}
                onFilterChange={setSelectedTopic}
              />
            </div>
            <div className="flex-1">
              <FilterBar
                title="Filter by Difficulty"
                options={difficultyOptions}
                selectedValue={selectedDifficulty}
                onFilterChange={setSelectedDifficulty}
              />
            </div>
          </div>
          
          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search problems by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Problems ({filteredProblems.length})
            </h2>
            {(selectedTopic !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Filtered results
                {selectedTopic !== 'All' && ` • Topic: ${selectedTopic}`}
                {selectedDifficulty !== 'All' && ` • Difficulty: ${selectedDifficulty}`}
                {searchQuery && ` • Search: "${searchQuery}"`}
              </p>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedTopic('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            className="text-gray-600 dark:text-gray-400"
          >
            Clear Filters
          </Button>
        </div>

        {/* Problems Grid */}
        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <DSAProblemCard key={problem.id} problem={problem} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No problems found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your filters or search query
              </p>
              <Button
                onClick={() => {
                  setSelectedTopic('All');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                }}
                className="bg-sky-600 hover:bg-sky-700 text-white"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              📈 View My Progress
            </Button>
            <Button variant="outline" size="lg">
              🎲 Random Problem
            </Button>
            <Button variant="outline" size="lg">
              📝 Create Study Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}