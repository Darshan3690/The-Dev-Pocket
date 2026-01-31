import { Metadata } from 'next';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import { BookOpen, Building2, MessageSquare, FileText, Target, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Placement Preparation Arena | The Dev Pocket',
  description: 'Complete placement preparation hub with DSA practice, company questions, interview prep, and resources.',
};

const modules = [
  {
    title: 'DSA Practice',
    description: 'Master data structures and algorithms with topic-wise problems and difficulty progression.',
    icon: BookOpen,
    href: '/placement/dsa',
    color: 'bg-blue-500',
    hoverColor: 'hover:bg-blue-600',
  },
  {
    title: 'Company Questions',
    description: 'Curated question sets from top tech companies with role-based filtering.',
    icon: Building2,
    href: '/placement/companies',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
  },
  {
    title: 'Interview Prep',
    description: 'HR, technical, and behavioral questions to ace your interviews.',
    icon: MessageSquare,
    href: '/placement/interviews',
    color: 'bg-purple-500',
    hoverColor: 'hover:bg-purple-600',
  },
  {
    title: 'Resources',
    description: 'Notes, cheat sheets, video links, and practice platforms.',
    icon: FileText,
    href: '/placement/resources',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
  },
];

export default function PlacementPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Placement Preparation
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Arena
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Your one-stop hub for placement success. Master DSA, practice company questions, 
              prepare for interviews, and access curated resources - all in one place.
            </p>
            
            <SignedIn>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-500" />
                  Your Progress Dashboard
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">0</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Problems Solved</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                  Keep up the great work!
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Link
                key={module.title}
                href={module.href}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg ${module.color} ${module.hoverColor} transition-colors duration-300 mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {module.description}
                  </p>
                  
                  <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                    Start Practicing
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Placements?</h2>
          <p className="text-xl opacity-90 mb-8">Join thousands of students who have successfully landed their dream jobs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/placement/dsa"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start DSA Practice
            </Link>
            <Link
              href="/placement/companies"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Company Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}