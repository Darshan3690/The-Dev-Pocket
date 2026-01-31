"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProgressStatsProps {
  className?: string;
}

export default function ProgressStats({ className = "" }: ProgressStatsProps) {
  // Mock data for progress tracking
  const stats = {
    problemsSolved: 45,
    totalProblems: 150,
    currentStreak: 7,
    longestStreak: 12,
    weeklyGoal: 10,
    weeklyProgress: 6,
    topicProgress: [
      { topic: 'Arrays', solved: 12, total: 20, percentage: 60 },
      { topic: 'Strings', solved: 8, total: 15, percentage: 53 },
      { topic: 'Trees', solved: 6, total: 18, percentage: 33 },
      { topic: 'Dynamic Programming', solved: 4, total: 25, percentage: 16 }
    ]
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {/* Overall Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-sky-600">
                {stats.problemsSolved}
              </span>
              <span className="text-sm text-gray-500">
                / {stats.totalProblems}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-sky-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.problemsSolved / stats.totalProblems) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {Math.round((stats.problemsSolved / stats.totalProblems) * 100)}% Complete
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Current Streak */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span className="text-2xl font-bold text-orange-600">
                {stats.currentStreak}
              </span>
              <span className="text-sm text-gray-500">days</span>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Longest: {stats.longestStreak} days
            </p>
            <Badge variant="secondary" className="text-xs">
              Keep it up! 🎯
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Weekly Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">
                {stats.weeklyProgress}
              </span>
              <span className="text-sm text-gray-500">
                / {stats.weeklyGoal}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {stats.weeklyGoal - stats.weeklyProgress} problems to go
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Topic Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Topic Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {stats.topicProgress.slice(0, 3).map((topic, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium truncate">{topic.topic}</span>
                  <span className="text-gray-500">{topic.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(topic.percentage)}`}
                    style={{ width: `${topic.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-2">
              +{stats.topicProgress.length - 3} more topics
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}