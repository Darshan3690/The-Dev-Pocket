"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CompanyQuestion } from '@/app/data/companyQuestions';

interface CompanyQuestionCardProps {
  question: CompanyQuestion;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Hard':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Technical':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Behavioral':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'System Design':
      return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

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
    'Accenture': '🔷'
  };
  return logos[company] || '🏢';
};

export default function CompanyQuestionCard({ question }: CompanyQuestionCardProps) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="text-2xl flex-shrink-0">{getCompanyLogo(question.company)}</span>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                {question.question}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {question.company} • {question.role}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Badge className={getDifficultyColor(question.difficulty)}>
              {question.difficulty}
            </Badge>
            <Badge className={getTypeColor(question.type)}>
              {question.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {question.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {question.description}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {question.topic && (
            <Badge variant="outline" className="text-xs">
              {question.topic}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {question.role}
          </Badge>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">
            View Solution
          </Button>
          <Button variant="outline" size="sm">
            Save Question
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}