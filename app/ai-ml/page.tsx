"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "course" | "tutorial" | "documentation" | "tool" | "practice" | "dataset";
  level: "beginner" | "intermediate" | "advanced";
  free: boolean;
  tags: string[];
}

const aiMlResources: Resource[] = [
  {
    id: "1",
    title: "Machine Learning Course - Andrew Ng",
    description: "Stanford's famous ML course by Andrew Ng on Coursera",
    url: "https://coursera.org/learn/machine-learning",
    type: "course",
    level: "beginner",
    free: true,
    tags: ["Machine Learning", "Python", "Mathematics", "Algorithms"]
  },
  {
    id: "2",
    title: "Fast.ai Practical Deep Learning",
    description: "Practical deep learning for coders",
    url: "https://fast.ai",
    type: "course",
    level: "intermediate",
    free: true,
    tags: ["Deep Learning", "PyTorch", "Computer Vision", "NLP"]
  },
  {
    id: "3",
    title: "Kaggle Learn",
    description: "Free micro-courses in data science and ML",
    url: "https://kaggle.com/learn",
    type: "course",
    level: "beginner",
    free: true,
    tags: ["Data Science", "Python", "Pandas", "Machine Learning"]
  },
  {
    id: "4",
    title: "TensorFlow Documentation",
    description: "Official TensorFlow tutorials and guides",
    url: "https://tensorflow.org/tutorials",
    type: "documentation",
    level: "intermediate",
    free: true,
    tags: ["TensorFlow", "Deep Learning", "Neural Networks", "Python"]
  },
  {
    id: "5",
    title: "PyTorch Tutorials",
    description: "Official PyTorch learning resources",
    url: "https://pytorch.org/tutorials",
    type: "documentation",
    level: "intermediate",
    free: true,
    tags: ["PyTorch", "Deep Learning", "Neural Networks", "Python"]
  },
  {
    id: "6",
    title: "Scikit-learn User Guide",
    description: "Comprehensive guide to scikit-learn",
    url: "https://scikit-learn.org/stable/user_guide.html",
    type: "documentation",
    level: "beginner",
    free: true,
    tags: ["Scikit-learn", "Machine Learning", "Python", "Algorithms"]
  },
  {
    id: "7",
    title: "Google Colab",
    description: "Free Jupyter notebook environment with GPU support",
    url: "https://colab.research.google.com",
    type: "tool",
    level: "beginner",
    free: true,
    tags: ["Jupyter", "Python", "GPU", "Cloud Computing"]
  },
  {
    id: "8",
    title: "Hugging Face Hub",
    description: "Pre-trained models and datasets for NLP and ML",
    url: "https://huggingface.co",
    type: "tool",
    level: "intermediate",
    free: true,
    tags: ["NLP", "Transformers", "Pre-trained Models", "Datasets"]
  },
  {
    id: "9",
    title: "Papers With Code",
    description: "Latest ML papers with code implementations",
    url: "https://paperswithcode.com",
    type: "documentation",
    level: "advanced",
    free: true,
    tags: ["Research Papers", "Code", "State-of-the-art", "Benchmarks"]
  },
  {
    id: "10",
    title: "Kaggle Competitions",
    description: "Data science competitions and datasets",
    url: "https://kaggle.com/competitions",
    type: "practice",
    level: "intermediate",
    free: true,
    tags: ["Competitions", "Datasets", "Practice", "Community"]
  },
  {
    id: "11",
    title: "OpenAI Cookbook",
    description: "Examples and guides for using OpenAI API",
    url: "https://cookbook.openai.com",
    type: "tutorial",
    level: "intermediate",
    free: true,
    tags: ["OpenAI", "GPT", "API", "LLM"]
  },
  {
    id: "12",
    title: "UCI ML Repository",
    description: "Collection of databases for ML research",
    url: "https://archive.ics.uci.edu/ml",
    type: "dataset",
    level: "beginner",
    free: true,
    tags: ["Datasets", "Research", "Classification", "Regression"]
  }
];

const AiMlPage = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResources = aiMlResources.filter(resource => {
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
      case "dataset": return "📊";
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI/ML Learning Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master Artificial Intelligence and Machine Learning with curated courses, tools, and datasets
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
              placeholder="Search AI/ML resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="course">Courses</option>
              <option value="tutorial">Tutorials</option>
              <option value="documentation">Documentation</option>
              <option value="tool">Tools</option>
              <option value="practice">Practice</option>
              <option value="dataset">Datasets</option>
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
            🧠 AI/ML Learning Path
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mathematics</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Statistics, Linear Algebra, Calculus</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐍</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Programming</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Python, NumPy, Pandas, Matplotlib</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Machine Learning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Algorithms, Scikit-learn, Model Training</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧠</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Deep Learning</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Neural Networks, TensorFlow, PyTorch</p>
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
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
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

export default AiMlPage;