'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

const interviewSections = [
  {
    title: 'HR Questions',
    icon: '👥',
    color: 'bg-blue-500',
    questions: [
      {
        question: 'Tell me about yourself.',
        answer: 'Structure your answer using present-past-future format. Start with your current role/studies, briefly mention relevant past experiences, and conclude with your career goals and why you\'re interested in this position.'
      },
      {
        question: 'Why do you want to work here?',
        answer: 'Research the company thoroughly. Mention specific aspects like their mission, products, culture, or recent achievements that align with your values and career goals. Show genuine interest and enthusiasm.'
      },
      {
        question: 'What are your strengths and weaknesses?',
        answer: 'For strengths, choose relevant ones with examples. For weaknesses, pick real ones you\'re actively working to improve, and explain the steps you\'re taking to address them.'
      },
      {
        question: 'Where do you see yourself in 5 years?',
        answer: 'Show ambition while being realistic. Align your goals with potential growth paths at the company. Mention skill development, leadership opportunities, and increased responsibilities.'
      },
      {
        question: 'Why are you leaving your current job?',
        answer: 'Stay positive and focus on growth opportunities, learning new skills, or career advancement. Never speak negatively about your current employer or colleagues.'
      }
    ]
  },
  {
    title: 'Technical Questions',
    icon: '💻',
    color: 'bg-green-500',
    questions: [
      {
        question: 'Explain the difference between SQL and NoSQL databases.',
        answer: 'SQL databases are relational with structured schemas, ACID compliance, and use SQL queries. NoSQL databases are non-relational, schema-flexible, horizontally scalable, and include document, key-value, column-family, and graph types.'
      },
      {
        question: 'What is the difference between REST and GraphQL?',
        answer: 'REST uses multiple endpoints with fixed data structures and standard HTTP methods. GraphQL uses a single endpoint, allows clients to request specific data, provides real-time subscriptions, and offers better performance for complex queries.'
      },
      {
        question: 'Explain Object-Oriented Programming principles.',
        answer: 'The four main principles are: Encapsulation (bundling data and methods), Inheritance (creating new classes based on existing ones), Polymorphism (same interface, different implementations), and Abstraction (hiding complex implementation details).'
      },
      {
        question: 'What is the difference between synchronous and asynchronous programming?',
        answer: 'Synchronous programming executes code sequentially, blocking until each operation completes. Asynchronous programming allows multiple operations to run concurrently without blocking, using callbacks, promises, or async/await patterns.'
      },
      {
        question: 'Explain the concept of Big O notation.',
        answer: 'Big O notation describes the upper bound of algorithm complexity in terms of time or space. It helps compare algorithm efficiency as input size grows. Common complexities include O(1), O(log n), O(n), O(n log n), O(n²), and O(2^n).'
      }
    ]
  },
  {
    title: 'Behavioral Questions',
    icon: '🎯',
    color: 'bg-purple-500',
    questions: [
      {
        question: 'Describe a challenging project you worked on.',
        answer: 'Use the STAR method (Situation, Task, Action, Result). Describe the context, your specific responsibilities, the actions you took to overcome challenges, and the positive outcomes achieved.'
      },
      {
        question: 'How do you handle conflicts with team members?',
        answer: 'Emphasize communication, active listening, and finding common ground. Describe a specific example where you addressed a conflict professionally, focused on the issue rather than personalities, and reached a mutually beneficial solution.'
      },
      {
        question: 'Tell me about a time you failed and how you handled it.',
        answer: 'Choose a real failure where you learned something valuable. Explain what went wrong, take responsibility, describe what you learned, and how you applied those lessons to prevent similar issues in the future.'
      },
      {
        question: 'Describe a time when you had to learn something new quickly.',
        answer: 'Highlight your learning agility and resourcefulness. Explain the situation, your learning approach (research, practice, seeking help), the timeline, and how you successfully applied the new knowledge.'
      },
      {
        question: 'How do you prioritize tasks when everything seems urgent?',
        answer: 'Discuss your prioritization framework (impact vs effort, deadlines, stakeholder needs). Mention tools or methods you use, how you communicate with stakeholders, and provide a specific example of successful prioritization.'
      }
    ]
  }
];

export default function InterviewsPage() {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleSection = (sectionIndex: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionIndex)) {
      newExpanded.delete(sectionIndex);
    } else {
      newExpanded.add(sectionIndex);
    }
    setExpandedSections(newExpanded);
  };

  const toggleQuestion = (sectionIndex: number, questionIndex: number) => {
    const key = `${sectionIndex}-${questionIndex}`;
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedQuestions(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/placement"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Placement Arena
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Interview Preparation</h1>
          <p className="text-gray-600 dark:text-gray-300">Master HR, technical, and behavioral interview questions</p>
        </div>

        {/* Interview Sections */}
        <div className="space-y-6">
          {interviewSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg ${section.color} flex items-center justify-center text-xl mr-4`}>
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <span className="ml-3 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded text-sm">
                    {section.questions.length} questions
                  </span>
                </div>
                {expandedSections.has(sectionIndex) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {/* Questions List */}
              {expandedSections.has(sectionIndex) && (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {section.questions.map((item, questionIndex) => (
                    <div key={questionIndex}>
                      <button
                        onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium text-gray-900 dark:text-white pr-4">
                          {item.question}
                        </span>
                        {expandedQuestions.has(`${sectionIndex}-${questionIndex}`) ? (
                          <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      
                      {expandedQuestions.has(`${sectionIndex}-${questionIndex}`) && (
                        <div className="px-6 pb-4 bg-gray-50 dark:bg-gray-700/50">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">💡 Interview Tips</h3>
          <ul className="space-y-2 text-blue-800 dark:text-blue-200">
            <li>• Practice your answers out loud, but don't memorize them word-for-word</li>
            <li>• Research the company, role, and interviewer beforehand</li>
            <li>• Prepare thoughtful questions to ask the interviewer</li>
            <li>• Use the STAR method for behavioral questions</li>
            <li>• Arrive early and dress appropriately for the company culture</li>
          </ul>
        </div>
      </div>
    </div>
  );
}