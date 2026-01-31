"use client";

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProgressStats from '@/app/components/placement-prep/ProgressStats';

export default function PlacementPrepPage() {
  const modules = [
    {
      id: 'dsa-practice',
      title: 'Practice DSA',
      description: 'Master data structures and algorithms with topic-wise problems, difficulty progression, and helpful hints.',
      icon: '🧮',
      href: '/placement-prep/dsa-practice',
      color: 'border-l-sky-500',
      bgColor: 'bg-sky-50 dark:bg-sky-900/20',
      features: ['150+ Problems', 'Topic-wise Organization', 'Difficulty Levels', 'Hints & Patterns']
    },
    {
      id: 'company-questions',
      title: 'Company-wise Questions',
      description: 'Explore curated question sets from top companies, tagged by role and difficulty level.',
      icon: '🏢',
      href: '/placement-prep/company-questions',
      color: 'border-l-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      features: ['Top Companies', 'Role-based Filtering', 'Question Types', 'Difficulty Tags']
    },
    {
      id: 'interview-prep',
      title: 'Interview Preparation',
      description: 'Comprehensive preparation for HR, technical, and behavioral interview questions.',
      icon: '🎯',
      href: '/placement-prep/interview-prep',
      color: 'border-l-emerald-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      features: ['HR Questions', 'Technical Concepts', 'Behavioral Scenarios', 'STAR Method']
    },
    {
      id: 'resources',
      title: 'Resources',
      description: 'Access curated notes, cheat sheets, guides, and external links for comprehensive learning.',
      icon: '📚',
      href: '/placement-prep/resources',
      color: 'border-l-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      features: ['Study Notes', 'Cheat Sheets', 'External Links', 'Video Courses']
    }
  ];

  const upcomingFeatures = [
    { name: 'Progress Tracking', icon: '📊', status: 'Coming Soon' },
    { name: 'Mock Interviews', icon: '🎤', status: 'In Development' },
    { name: 'Daily Challenges', icon: '⚡', status: 'Planned' },
    { name: 'Study Groups', icon: '👥', status: 'Planned' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-sky-100 dark:bg-sky-900/30 text-sky-800 dark:text-sky-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span>🚀</span>
            <span>Your Complete Placement Companion</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Placement Preparation
            <span className="text-sky-600"> Arena</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Master your placement journey with structured DSA practice, company-specific questions, 
            interview preparation, and curated resources—all in one organized space.
          </p>
        </div>

        {/* Progress Stats */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Your Progress Overview
          </h2>
          <ProgressStats />
        </div>

        {/* Main Modules */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Preparation Modules
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modules.map((module) => (
              <Card key={module.id} className={`hover:shadow-xl transition-all duration-300 border-l-4 ${module.color} group`}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl ${module.bgColor} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                      {module.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {module.title}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {module.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button asChild className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                    <Link href={module.href}>
                      Start {module.title}
                      <span className="ml-2">→</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Upcoming Features
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingFeatures.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {feature.name}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {feature.status}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <Card className="bg-gradient-to-r from-sky-500 to-purple-600 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">150+</div>
                <div className="text-sky-100">DSA Problems</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sky-100">Company Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="text-sky-100">Interview Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">25+</div>
                <div className="text-sky-100">Learning Resources</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to Start Your Placement Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Choose a module above and begin your structured preparation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-700 text-white">
              <Link href="/placement-prep/dsa-practice">
                Start with DSA Practice
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/placement-prep/interview-prep">
                Prepare for Interviews
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}