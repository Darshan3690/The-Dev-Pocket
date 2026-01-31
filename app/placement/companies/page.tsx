'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, Building2 } from 'lucide-react';

const companies = [
  {
    name: 'Google',
    logo: '🔍',
    color: 'bg-blue-500',
    description: 'Search giant focusing on algorithms, system design, and problem-solving skills.',
    totalQuestions: 150,
    roles: ['Software Engineer', 'Senior SWE', 'Staff Engineer'],
  },
  {
    name: 'Amazon',
    logo: '📦',
    color: 'bg-orange-500',
    description: 'E-commerce leader emphasizing leadership principles and scalable solutions.',
    totalQuestions: 120,
    roles: ['SDE I', 'SDE II', 'Principal Engineer'],
  },
  {
    name: 'Microsoft',
    logo: '🪟',
    color: 'bg-blue-600',
    description: 'Technology company focusing on collaborative problem-solving and innovation.',
    totalQuestions: 100,
    roles: ['Software Engineer', 'Senior SWE', 'Principal SWE'],
  },
];

const faqData = [
  {
    company: 'Google',
    role: 'Software Engineer',
    difficulty: 'Medium',
    question: 'How do you approach system design questions at Google?',
    answer: 'Start with requirements gathering, then discuss high-level architecture, dive into components, address scalability, and consider trade-offs. Google values clear communication and systematic thinking.'
  },
  {
    company: 'Google',
    role: 'Software Engineer',
    difficulty: 'Hard',
    question: 'What are Google\'s most common coding interview patterns?',
    answer: 'Graph algorithms, dynamic programming, tree traversals, and string manipulation. Focus on optimal solutions and be prepared to optimize your initial approach.'
  },
  {
    company: 'Amazon',
    role: 'SDE I',
    difficulty: 'Easy',
    question: 'How important are Amazon\'s Leadership Principles?',
    answer: 'Extremely important. Every behavioral question relates to leadership principles. Prepare STAR format stories for each principle, especially Customer Obsession and Ownership.'
  },
  {
    company: 'Amazon',
    role: 'SDE I',
    difficulty: 'Medium',
    question: 'What coding topics does Amazon focus on?',
    answer: 'Trees, graphs, arrays, and strings. Amazon loves questions involving BFS/DFS, sliding window, and two-pointer techniques. Practice on LeetCode with Amazon tag.'
  },
  {
    company: 'Microsoft',
    role: 'Software Engineer',
    difficulty: 'Easy',
    question: 'What makes Microsoft interviews unique?',
    answer: 'Microsoft emphasizes collaboration and growth mindset. They often ask about debugging, code review scenarios, and how you handle feedback and learning.'
  },
  {
    company: 'Microsoft',
    role: 'Software Engineer',
    difficulty: 'Medium',
    question: 'How technical are Microsoft behavioral rounds?',
    answer: 'Microsoft blends technical and behavioral questions. Be ready to discuss technical decisions, architecture choices, and how you\'ve grown from challenges.'
  },
];

export default function CompaniesPage() {
  const [selectedCompany, setSelectedCompany] = useState('Google');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const selectedCompanyData = useMemo(() => {
    return companies.find(c => c.name === selectedCompany);
  }, [selectedCompany]);

  const filteredFAQs = faqData.filter(faq => faq.company === selectedCompany);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/placement"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Placement Arena
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Company Questions</h1>
          <p className="text-gray-600 dark:text-gray-300">Curated question sets from top tech companies</p>
        </div>

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {companies.map((company) => (
            <button
              key={company.name}
              onClick={() => setSelectedCompany(company.name)}
              className={`text-left p-6 rounded-lg border-2 transition-all duration-300 ${
                selectedCompany === company.name
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg ${company.color} flex items-center justify-center text-2xl mr-4`}>
                  {company.logo}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{company.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{company.totalQuestions} questions</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {company.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {company.roles.map((role) => (
                  <span
                    key={role}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Company Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center mb-6">
            <Building2 className="w-6 h-6 text-blue-500 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedCompany} Interview Guide
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {selectedCompanyData?.totalQuestions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Questions</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">85%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">4.2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Difficulty</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions - {selectedCompany}
          </h3>
          
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(faq.difficulty)}`}>
                      {faq.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-xs">
                      {faq.role}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {faq.question}
                    </span>
                  </div>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {expandedFAQ === index && (
                  <div className="px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}