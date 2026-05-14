"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "course" | "tutorial" | "documentation" | "tool" | "practice";
  level: "beginner" | "intermediate" | "advanced";
  free: boolean;
  tags: string[];
}

const webDevResources: Resource[] = [
  {
    id: "1",
    title: "MDN Web Docs",
    description: "Complete web development documentation and tutorials",
    url: "https://developer.mozilla.org",
    type: "documentation",
    level: "beginner",
    free: true,
    tags: ["HTML", "CSS", "JavaScript", "Web APIs"]
  },
  {
    id: "2",
    title: "freeCodeCamp",
    description: "Free coding bootcamp with hands-on projects",
    url: "https://freecodecamp.org",
    type: "course",
    level: "beginner",
    free: true,
    tags: ["HTML", "CSS", "JavaScript", "React", "Node.js"]
  },
  {
    id: "3",
    title: "React Official Docs",
    description: "Official React documentation and tutorials",
    url: "https://react.dev",
    type: "documentation",
    level: "intermediate",
    free: true,
    tags: ["React", "JSX", "Hooks", "Components"]
  },
  {
    id: "4",
    title: "CSS-Tricks",
    description: "CSS tutorials, tips, and tricks",
    url: "https://css-tricks.com",
    type: "tutorial",
    level: "intermediate",
    free: true,
    tags: ["CSS", "Flexbox", "Grid", "Animations"]
  },
  {
    id: "5",
    title: "JavaScript.info",
    description: "Modern JavaScript tutorial from basics to advanced",
    url: "https://javascript.info",
    type: "tutorial",
    level: "beginner",
    free: true,
    tags: ["JavaScript", "ES6+", "DOM", "Async"]
  },
  {
    id: "6",
    title: "Next.js Learn",
    description: "Interactive Next.js tutorial",
    url: "https://nextjs.org/learn",
    type: "course",
    level: "intermediate",
    free: true,
    tags: ["Next.js", "React", "SSR", "API Routes"]
  },
  {
    id: "7",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework documentation",
    url: "https://tailwindcss.com/docs",
    type: "documentation",
    level: "beginner",
    free: true,
    tags: ["CSS", "Tailwind", "Utility Classes", "Responsive"]
  },
  {
    id: "8",
    title: "TypeScript Handbook",
    description: "Official TypeScript documentation",
    url: "https://typescriptlang.org/docs",
    type: "documentation",
    level: "intermediate",
    free: true,
    tags: ["TypeScript", "Types", "Interfaces", "Generics"]
  },
  {
    id: "9",
    title: "CodePen",
    description: "Online code editor for front-end development",
    url: "https://codepen.io",
    type: "tool",
    level: "beginner",
    free: true,
    tags: ["HTML", "CSS", "JavaScript", "Practice"]
  },
  {
    id: "10",
    title: "Frontend Mentor",
    description: "Real-world frontend challenges",
    url: "https://frontendmentor.io",
    type: "practice",
    level: "intermediate",
    free: true,
    tags: ["HTML", "CSS", "JavaScript", "Projects"]
  }
];

const WebDevPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = webDevResources.filter(resource => {
    const matchesLevel = selectedLevel === "all" || resource.level === selectedLevel;
    const matchesType = selectedType === "all" || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesLevel && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course": return "🎓";
      case "tutorial": return "📚";
      case "documentation": return "📖";
      case "tool": return "🛠️";
      case "practice": return "💻";
      default: return "📄";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Web Development Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive collection of tutorials, courses, and tools to master web development
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-wrap gap-4 justify-center">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="course">Courses</option>
              <option value="tutorial">Tutorials</option>
              <option value="documentation">Documentation</option>
              <option value="tool">Tools</option>
              <option value="practice">Practice</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🗺️ Recommended Learning Path
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Foundation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">HTML, CSS, JavaScript basics</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Frameworks</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">React, Vue, or Angular</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Full Stack</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Backend, databases, deployment</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(resource.level)}`}>
                    {resource.level}
                  </span>
                </div>
                {resource.free && (
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                    FREE
                  </span>
                )}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {resource.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Visit Resource
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No resources found matching your criteria.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default WebDevPage;