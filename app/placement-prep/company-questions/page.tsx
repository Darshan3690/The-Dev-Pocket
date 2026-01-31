"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FilterBar from '@/app/components/placement-prep/FilterBar';
import CompanyQuestionCard from '@/app/components/placement-prep/CompanyQuestionCard';
import { companyQuestions, companies, roles, questionTypes } from '@/app/data/companyQuestions';

export default function CompanyQuestionsPage() {
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter questions based on selected filters
  const filteredQuestions = useMemo(() => {
    return companyQuestions.filter(question => {
      const matchesCompany = selectedCompany === 'All' || question.company === selectedCompany;
      const matchesRole = selectedRole === 'All' || question.role === selectedRole;
      const matchesType = selectedType === 'All' || question.type === selectedType;
      const matchesDifficulty = selectedDifficulty === 'All' || question.difficulty === selectedDifficulty;
      const matchesSearch = searchQuery === '' || 
        question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.company.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCompany && matchesRole && matchesType && matchesDifficulty && matchesSearch;
    });
  }, [selectedCompany, selectedRole, selectedType, selectedDifficulty, searchQuery]);

  // Get filter options with counts
  const companyOptions = companies.map(company => ({
    value: company,
    label: company,
    count: company === 'All' ? companyQuestions.length : companyQuestions.filter(q => q.company === company).length
  }));

  const roleOptions = roles.map(role => ({
    value: role,
    label: role,
    count: role === 'All' ? companyQuestions.length : companyQuestions.filter(q => q.role === role).length
  }));

  const typeOptions = questionTypes.map(type => ({
    value: type,
    label: type,
    count: type === 'All' ? companyQuestions.length : companyQuestions.filter(q => q.type === type).length
  }));

  const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'].map(difficulty => ({
    value: difficulty,
    label: difficulty,
    count: difficulty === 'All' ? companyQuestions.length : companyQuestions.filter(q => q.difficulty === difficulty).length
  }));

  // Get company statistics
  const companyStats = companies.slice(1).map(company => {
    const questions = companyQuestions.filter(q => q.company === company);
    const technical = questions.filter(q => q.type === 'Technical').length;
    const behavioral = questions.filter(q => q.type === 'Behavioral').length;
    const systemDesign = questions.filter(q => q.type === 'System Design').length;
    
    return {
      company,
      total: questions.length,
      technical,
      behavioral,
      systemDesign
    };
  }).filter(stat => stat.total > 0);

  const getCompanyLogo = (company: string) => {
    const logos: { [key: string]: string } = {
      'Google': '🔍',
      'Amazon': '📦',
      'Microsoft': '🪟',
      'Meta': '👥',
      'Apple': '🍎',
      'Netflix': '🎬',
      'TCS': '🏢',
      'Infosys': '💼',
      'Wipro': '⚡',
      'Accenture': '🔷',
      'Cognizant': '🔶',
      'HCL': '🏗️'
    };
    return logos[company] || '🏢';
  };

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
            <span>Company Questions</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                🏢 Company-wise Questions
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explore {companyQuestions.length} curated questions from top companies
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline">
                📊 My Saved Questions
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                🎯 Practice Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Company Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Company Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {companyStats.map((stat) => (
              <Card 
                key={stat.company} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedCompany === stat.company ? 'ring-2 ring-purple-500 border-purple-500' : ''
                }`}
                onClick={() => setSelectedCompany(stat.company)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getCompanyLogo(stat.company)}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      {stat.company}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {stat.total} questions
                    </span>
                    <div className="flex gap-1">
                      {stat.technical > 0 && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs">
                          {stat.technical}T
                        </Badge>
                      )}
                      {stat.behavioral > 0 && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-xs">
                          {stat.behavioral}B
                        </Badge>
                      )}
                      {stat.systemDesign > 0 && (
                        <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 text-xs">
                          {stat.systemDesign}S
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FilterBar
              title="Filter by Company"
              options={companyOptions}
              selectedValue={selectedCompany}
              onFilterChange={setSelectedCompany}
            />
            <FilterBar
              title="Filter by Role"
              options={roleOptions}
              selectedValue={selectedRole}
              onFilterChange={setSelectedRole}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              placeholder="Search questions by title or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Questions ({filteredQuestions.length})
            </h2>
            {(selectedCompany !== 'All' || selectedRole !== 'All' || selectedType !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Filtered results
                {selectedCompany !== 'All' && ` • Company: ${selectedCompany}`}
                {selectedRole !== 'All' && ` • Role: ${selectedRole}`}
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
              setSelectedCompany('All');
              setSelectedRole('All');
              setSelectedType('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            className="text-gray-600 dark:text-gray-400"
          >
            Clear Filters
          </Button>
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredQuestions.map((question) => (
              <CompanyQuestionCard key={question.id} question={question} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
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
                  setSelectedCompany('All');
                  setSelectedRole('All');
                  setSelectedType('All');
                  setSelectedDifficulty('All');
                  setSearchQuery('');
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
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
              🎲 Random Question
            </Button>
            <Button variant="outline" size="lg">
              📝 Create Practice Set
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}