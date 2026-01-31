"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FilterBar from '@/app/components/placement-prep/FilterBar';
import ResourceCard from '@/app/components/placement-prep/ResourceCard';
import { resources, resourceCategories, resourceTypes } from '@/app/data/resources';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter resources based on selected filters
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      const matchesType = selectedType === 'All' || resource.type === selectedType;
      const matchesDifficulty = selectedDifficulty === 'All' || resource.difficulty === selectedDifficulty;
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesType && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedType, selectedDifficulty, searchQuery]);

  // Get filter options with counts
  const categoryOptions = resourceCategories.map(category => ({
    value: category,
    label: category,
    count: category === 'All' ? resources.length : resources.filter(r => r.category === category).length
  }));

  const typeOptions = resourceTypes.map(type => ({
    value: type,
    label: type,
    count: type === 'All' ? resources.length : resources.filter(r => r.type === type).length
  }));

  const difficultyOptions = ['All', 'Beginner', 'Intermediate', 'Advanced'].map(difficulty => ({
    value: difficulty,
    label: difficulty,
    count: difficulty === 'All' ? resources.length : resources.filter(r => r.difficulty === difficulty).length
  }));

  // Get category statistics
  const categoryStats = resourceCategories.slice(1).map(category => {
    const categoryResources = resources.filter(r => r.category === category);
    const beginner = categoryResources.filter(r => r.difficulty === 'Beginner').length;
    const intermediate = categoryResources.filter(r => r.difficulty === 'Intermediate').length;
    const advanced = categoryResources.filter(r => r.difficulty === 'Advanced').length;
    
    return {
      category,
      total: categoryResources.length,
      beginner,
      intermediate,
      advanced,
      icon: getCategoryIcon(category)
    };
  }).filter(stat => stat.total > 0);

  function getCategoryIcon(category: string) {
    const icons: { [key: string]: string } = {
      'DSA Fundamentals': '🧮',
      'Arrays': '📊',
      'Problem Solving': '🧩',
      'System Design': '🏗️',
      'Databases': '🗄️',
      'JavaScript': '🟨',
      'Python': '🐍',
      'React': '⚛️',
      'Backend': '⚙️',
      'Interview Skills': '🎯',
      'Career': '🚀'
    };
    return icons[category] || '📚';
  }

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
            <span>Resources</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                📚 Learning Resources
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Access {resources.length} curated resources including notes, cheat sheets, guides, and external links
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                📊 My Saved Resources
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                🎯 Study Plan
              </Button>
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Resource Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categoryStats.map((stat) => (
              <Card 
                key={stat.category} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCategory === stat.category ? 'ring-2 ring-orange-500 border-orange-500' : ''
                }`}
                onClick={() => setSelectedCategory(stat.category)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{stat.icon}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                      {stat.category}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {stat.total} resources
                    </span>
                    <div className="flex gap-1">
                      {stat.beginner > 0 && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                          {stat.beginner}B
                        </Badge>
                      )}
                      {stat.intermediate > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs">
                          {stat.intermediate}I
                        </Badge>
                      )}
                      {stat.advanced > 0 && (
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs">
                          {stat.advanced}A
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.slice(0, 3).map((resource) => (
              <Card key={resource.id} className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-200 dark:border-orange-800">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">⭐</span>
                    <div>
                      <h3 className="font-semibold text-orange-800 dark:text-orange-300">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-orange-700 dark:text-orange-400">
                        {resource.category}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-400 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 text-xs">
                      {resource.type}
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 text-xs">
                      {resource.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FilterBar
              title="Filter by Category"
              options={categoryOptions}
              selectedValue={selectedCategory}
              onFilterChange={setSelectedCategory}
            />
            <FilterBar
              title="Filter by Type"
              options={typeOptions}
              selectedValue={selectedType}
              onFilterChange={setSelectedType}
            />
            <FilterBar
              title="Filter by Difficulty"
              options={difficultyOptions}
              selectedValue={selectedDifficulty}
              onFilterChange={setSelectedDifficulty}
            />
          </div>
          
          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search resources by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Resources ({filteredResources.length})
            </h2>
            {(selectedCategory !== 'All' || selectedType !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Filtered results
                {selectedCategory !== 'All' && ` • Category: ${selectedCategory}`}
                {selectedType !== 'All' && ` • Type: ${selectedType}`}
                {selectedDifficulty !== 'All' && ` • Difficulty: ${selectedDifficulty}`}
                {searchQuery && ` • Search: "${searchQuery}"`}
              </p>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory('All');
              setSelectedType('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            className="text-gray-600 dark:text-gray-400"
          >
            Clear Filters
          </Button>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your filters or search query
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedType('All');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                }}
                className="bg-orange-600 hover:bg-orange-700 text-white"
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
              🎲 Random Resource
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