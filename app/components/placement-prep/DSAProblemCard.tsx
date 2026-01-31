"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DSAProblem } from '@/app/data/dsaProblems';

interface DSAProblemCardProps {
  problem: DSAProblem;
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

export default function DSAProblemCard({ problem }: DSAProblemCardProps) {
  const [showHints, setShowHints] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-sky-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {problem.title}
          </CardTitle>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Badge className={getDifficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {problem.topic}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {isExpanded ? problem.description : `${problem.description.slice(0, 120)}...`}
          {problem.description.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium text-sm"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>

        {problem.pattern && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Pattern:</span>
            <Badge variant="secondary" className="text-xs">
              {problem.pattern}
            </Badge>
          </div>
        )}

        {(problem.timeComplexity || problem.spaceComplexity) && (
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
            {problem.timeComplexity && (
              <span>
                <strong>Time:</strong> {problem.timeComplexity}
              </span>
            )}
            {problem.spaceComplexity && (
              <span>
                <strong>Space:</strong> {problem.spaceComplexity}
              </span>
            )}
          </div>
        )}

        {problem.hints && problem.hints.length > 0 && (
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 p-0 h-auto font-medium"
            >
              {showHints ? '🙈 Hide Hints' : '💡 Show Hints'}
            </Button>
            
            {showHints && (
              <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-3 space-y-2">
                <h4 className="text-sm font-medium text-sky-800 dark:text-sky-300">Hints:</h4>
                <ul className="space-y-1">
                  {problem.hints.map((hint, index) => (
                    <li key={index} className="text-sm text-sky-700 dark:text-sky-400 flex items-start gap-2">
                      <span className="text-sky-500 mt-0.5">•</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white">
            Solve Problem
          </Button>
          <Button variant="outline" size="sm">
            Add to Practice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}