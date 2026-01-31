"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Accordion from '@/app/components/Accordion';
import FilterBar from '@/app/components/placement-prep/FilterBar';
import { interviewQuestions, interviewCategories } from '@/app/data/interviewQuestions';

export default function InterviewPrepPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter questions based on selected filters
  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter(question => {
      const matchesCategory = selectedCategory === 'All' || question.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
      const matchesSearch = searchQuery === '' || 
        question.question.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesDifficulty && matchesSearch;
    });
  }, [selectedCategory, selectedDifficulty, searchQuery]);

  // Get filter options with counts
  const categoryOptions = interviewCategories.map(category => ({
    value: category,
    label: category,
    count: category === 'All' ? interviewQuestions.length : interviewQuestions.filter(q => q.category === category).length
  }));

  const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'].map(difficulty => ({
    value: difficulty,
    label: difficulty,
    count: difficulty === 'All' ? interviewQuestions.length : interviewQuestions.filter(q => q.difficulty === difficulty).length
  }));

  // Get category statistics
  const categoryStats = interviewCategories.slice(1).map(category => {
    const questions = interviewQuestions.filter(q => q.category === category);
    const easy = questions.filter(q => q.difficulty === 'Easy').length;
    const medium = questions.filter(q => q.difficulty === 'Medium').length;
    const hard = questions.filter(q => q.difficulty === 'Hard').length;
    
    return {
      category,
      total: questions.length,
      easy,
      medium,
      hard,
      icon: category === 'HR' ? '👔' : category === 'Technical' ? '💻' : '🧠'
    };
  }).filter(stat => stat.total > 0);

  // Convert questions to accordion format
  const accordionItems = filteredQuestions.map(question => ({
    id: question.id,
    question: question.question,
    answer: (
      <div className="space-y-4">
        <div className="flex gap-2 mb-3">
          <Badge className={
            question.category === 'HR' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
            question.category === 'Technical' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
          }>
            {question.category}
          </Badge>
          <Badge className={
            question.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
            question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
          }>
            {question.difficulty}
          </Badge>
        </div>
        
        {question.tips && question.tips.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">💡 Tips:</h4>
            <ul className="space-y-1">
              {question.tips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {question.sampleAnswer && (
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">📝 Sample Answer:</h4>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3">
              <p className="text-sm text-emerald-800 dark:text-emerald-300 italic">
                "{question.sampleAnswer}"
              </p>
            </div>
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Practice Answer
          </Button>
          <Button variant="outline" size="sm">
            Save Question
          </Button>
        </div>
      </div>
    )
  }));

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
            <span>Interview Preparation</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                🎯 Interview Preparation
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Master {interviewQuestions.length} essential interview questions across HR, Technical, and Behavioral categories
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                📊 My Progress
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                🎤 Mock Interview
              </Button>
            </div>
          </div>
        </div>

        {/* Category Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Question Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryStats.map((stat) => (
              <Card 
                key={stat.category} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCategory === stat.category ? 'ring-2 ring-emerald-500 border-emerald-500' : ''
                }`}
                onClick={() => setSelectedCategory(stat.category)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{stat.icon}</span>
                    <div>
                      <CardTitle className="text-lg">{stat.category}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.total} questions
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    {stat.easy > 0 && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs">
                        {stat.easy} Easy
                      </Badge>
                    )}
                    {stat.medium > 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs">
                        {stat.medium} Medium
                      </Badge>
                    )}
                    {stat.hard > 0 && (
                      <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs">
                        {stat.hard} Hard
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* STAR Method Guide */}
        <Card className="mb-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              ⭐ STAR Method for Behavioral Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
                  S
                </div>
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">Situation</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Set the context</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
                  T
                </div>
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">Task</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Describe responsibility</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
                  A
                </div>
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">Action</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Explain what you did</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-2">
                  R
                </div>
                <h4 className="font-semibold text-emerald-800 dark:text-emerald-300">Result</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Share the outcome</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FilterBar
              title="Filter by Category"
              options={categoryOptions}
              selectedValue={selectedCategory}
              onFilterChange={setSelectedCategory}
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
              placeholder="Search interview questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Interview Questions ({filteredQuestions.length})
            </h2>
            {(selectedCategory !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Filtered results
                {selectedCategory !== 'All' && ` • Category: ${selectedCategory}`}
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
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            className="text-gray-600 dark:text-gray-400"
          >
            Clear Filters
          </Button>
        </div>

        {/* Questions Accordion */}
        {filteredQuestions.length > 0 ? (
          <div className="mb-8">
            <Accordion items={accordionItems} />
          </div>
        ) : (
          <Card className="text-center py-12 mb-8">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your filters or search query
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              📈 View My Progress
            </Button>
            <Button variant="outline" size="lg">
              🎲 Random Question
            </Button>
            <Button variant="outline" size="lg">
              📝 Create Practice Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}