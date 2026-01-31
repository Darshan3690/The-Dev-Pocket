"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Resource } from '@/app/data/resources';

interface ResourceCardProps {
  resource: Resource;
}

const getTypeIcon = (type: string) => {
  const icons: { [key: string]: string } = {
    'Notes': '📝',
    'Cheat Sheet': '📋',
    'Guide': '📖',
    'External Link': '🔗',
    'Video': '🎥',
    'Book': '📚'
  };
  return icons[type] || '📄';
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Advanced':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  }
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [showContent, setShowContent] = useState(false);

  const handleAction = () => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else if (resource.content) {
      setShowContent(!showContent);
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <span className="text-2xl flex-shrink-0">{getTypeIcon(resource.type)}</span>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                {resource.title}
              </CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {resource.category}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-shrink-0">
            <Badge className={getDifficultyColor(resource.difficulty)}>
              {resource.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {resource.type}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {resource.description}
        </p>

        {resource.estimatedTime && (
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>⏱️</span>
            <span>Estimated time: {resource.estimatedTime}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          {resource.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {showContent && resource.content && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {resource.content}
            </pre>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={handleAction}
          >
            {resource.url ? 'Open Link' : resource.content ? (showContent ? 'Hide Content' : 'View Content') : 'Access Resource'}
          </Button>
          <Button variant="outline" size="sm">
            Save Resource
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}