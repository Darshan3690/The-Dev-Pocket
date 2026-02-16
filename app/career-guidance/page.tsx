"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

interface CareerPath {
  id: string;
  name: string;
  description: string;
  icon: string;
  salaryRanges: {
    level: "junior" | "mid" | "senior" | "lead";
    experience: string;
    min: number;
    max: number;
    currency: string;
  }[];
  requiredSkills: {
    category: string;
    skills: string[];
  }[];
  demandLevel: "high" | "medium" | "low";
  growthRate: number;
  jobsAvailable: number;
}

interface InterviewTip {
  id: string;
  title: string;
  description: string;
  category: "technical" | "behavioral" | "system-design" | "preparation";
  difficulty: "beginner" | "intermediate" | "advanced";
}

interface CompanyHiringTrend {
  id: string;
  company: string;
  logo: string;
  roles: string[];
  hiringRate: "actively" | "moderately" | "slowly";
  averageSalary: number;
  processSteps: number;
  timeToHire: string;
  specializations: string[];
}

const careerPaths: CareerPath[] = [
  {
    id: "frontend",
    name: "Frontend Developer",
    description: "Build beautiful, interactive user interfaces and web applications",
    icon: "🎨",
    salaryRanges: [
      { level: "junior", experience: "0-2 years", min: 40000, max: 60000, currency: "$" },
      { level: "mid", experience: "2-5 years", min: 70000, max: 100000, currency: "$" },
      { level: "senior", experience: "5-8 years", min: 110000, max: 150000, currency: "$" },
      { level: "lead", experience: "8+ years", min: 150000, max: 250000, currency: "$" },
    ],
    requiredSkills: [
      { category: "Core Languages", skills: ["HTML", "CSS", "JavaScript", "TypeScript"] },
      { category: "Frameworks & Libraries", skills: ["React", "Vue.js", "Angular", "Next.js"] },
      { category: "Tools & Technologies", skills: ["Git", "Webpack", "REST APIs", "GraphQL"] },
      { category: "Soft Skills", skills: ["UI/UX Understanding", "Communication", "Problem Solving"] },
    ],
    demandLevel: "high",
    growthRate: 8.5,
    jobsAvailable: 15420,
  },
  {
    id: "backend",
    name: "Backend Developer",
    description: "Design scalable server-side applications and APIs",
    icon: "⚙️",
    salaryRanges: [
      { level: "junior", experience: "0-2 years", min: 45000, max: 65000, currency: "$" },
      { level: "mid", experience: "2-5 years", min: 80000, max: 120000, currency: "$" },
      { level: "senior", experience: "5-8 years", min: 130000, max: 180000, currency: "$" },
      { level: "lead", experience: "8+ years", min: 170000, max: 280000, currency: "$" },
    ],
    requiredSkills: [
      { category: "Programming Languages", skills: ["Python", "Java", "Go", "Node.js", "C++"] },
      { category: "Databases", skills: ["SQL", "PostgreSQL", "MongoDB", "Redis"] },
      { category: "Frameworks", skills: ["Django", "Spring Boot", "FastAPI", "Express.js"] },
      { category: "Cloud & DevOps", skills: ["AWS", "Docker", "Kubernetes", "CI/CD"] },
    ],
    demandLevel: "high",
    growthRate: 9.2,
    jobsAvailable: 18750,
  },
  {
    id: "devops",
    name: "DevOps Engineer",
    description: "Manage infrastructure, deployment, and system reliability",
    icon: "🚀",
    salaryRanges: [
      { level: "junior", experience: "0-2 years", min: 60000, max: 80000, currency: "$" },
      { level: "mid", experience: "2-5 years", min: 95000, max: 135000, currency: "$" },
      { level: "senior", experience: "5-8 years", min: 150000, max: 200000, currency: "$" },
      { level: "lead", experience: "8+ years", min: 190000, max: 300000, currency: "$" },
    ],
    requiredSkills: [
      { category: "Cloud Platforms", skills: ["AWS", "Azure", "Google Cloud", "Terraform"] },
      { category: "Containerization", skills: ["Docker", "Kubernetes", "Container Registry"] },
      { category: "Scripting", skills: ["Bash", "Python", "PowerShell"] },
      { category: "Monitoring & Logging", skills: ["Prometheus", "ELK Stack", "Grafana"] },
    ],
    demandLevel: "high",
    growthRate: 10.1,
    jobsAvailable: 12300,
  },
  {
    id: "fullstack",
    name: "Full Stack Developer",
    description: "Work across the entire application stack, front and back",
    icon: "🔄",
    salaryRanges: [
      { level: "junior", experience: "0-2 years", min: 50000, max: 70000, currency: "$" },
      { level: "mid", experience: "2-5 years", min: 85000, max: 125000, currency: "$" },
      { level: "senior", experience: "5-8 years", min: 140000, max: 190000, currency: "$" },
      { level: "lead", experience: "8+ years", min: 180000, max: 280000, currency: "$" },
    ],
    requiredSkills: [
      { category: "Frontend", skills: ["React", "TypeScript", "CSS", "Responsive Design"] },
      { category: "Backend", skills: ["Node.js", "Python", "Database Design", "APIs"] },
      { category: "DevOps", skills: ["Docker", "AWS", "Git", "CI/CD"] },
      { category: "Soft Skills", skills: ["System Design", "Testing", "Documentation"] },
    ],
    demandLevel: "high",
    growthRate: 8.8,
    jobsAvailable: 16200,
  },
  {
    id: "mobile",
    name: "Mobile Developer",
    description: "Create apps for iOS, Android, and cross-platform platforms",
    icon: "📱",
    salaryRanges: [
      { level: "junior", experience: "0-2 years", min: 45000, max: 65000, currency: "$" },
      { level: "mid", experience: "2-5 years", min: 80000, max: 120000, currency: "$" },
      { level: "senior", experience: "5-8 years", min: 130000, max: 170000, currency: "$" },
      { level: "lead", experience: "8+ years", min: 160000, max: 250000, currency: "$" },
    ],
    requiredSkills: [
      { category: "Native Development", skills: ["Swift", "Kotlin", "Java"] },
      { category: "Cross-Platform", skills: ["React Native", "Flutter", "Dart"] },
      { category: "Tools & Platforms", skills: ["Xcode", "Android Studio", "Firebase"] },
      { category: "UI/UX Design", skills: ["Mobile UX", "Responsive Design", "Animations"] },
    ],
    demandLevel: "high",
    growthRate: 7.5,
    jobsAvailable: 9800,
  },
  {
    id: "datascience",
    name: "Data Science Engineer",
    description: "Extract insights and build ML models from data",
    icon: "📊",
    salaryRanges: [
      { level: "junior", experience: "0-2 years", min: 55000, max: 75000, currency: "$" },
      { level: "mid", experience: "2-5 years", min: 95000, max: 140000, currency: "$" },
      { level: "senior", experience: "5-8 years", min: 150000, max: 210000, currency: "$" },
      { level: "lead", experience: "8+ years", min: 200000, max: 350000, currency: "$" },
    ],
    requiredSkills: [
      { category: "Languages", skills: ["Python", "R", "SQL", "Scala"] },
      { category: "ML Frameworks", skills: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost"] },
      { category: "Big Data", skills: ["Spark", "Hadoop", "Kafka", "SQL"] },
      { category: "Statistics", skills: ["Statistics", "Linear Algebra", "Probability"] },
    ],
    demandLevel: "high",
    growthRate: 9.8,
    jobsAvailable: 11500,
  },
];

const interviewTips: InterviewTip[] = [
  {
    id: "tip-1",
    title: "Master Data Structures & Algorithms",
    description: "Focus on arrays, linked lists, trees, graphs, and sorting. Practice on LeetCode, HackerRank, and CodeSignal for at least 2-3 months.",
    category: "technical",
    difficulty: "intermediate",
  },
  {
    id: "tip-2",
    title: "System Design is Critical",
    description: "Learn to design scalable systems. Understand databases, caching, load balancing, and microservices architecture. Practice with real-world problems.",
    category: "system-design",
    difficulty: "advanced",
  },
  {
    id: "tip-3",
    title: "Prepare STAR Method Responses",
    description: "Structure behavioral answers using STAR: Situation, Task, Action, Result. Practice storytelling with real examples from your projects.",
    category: "behavioral",
    difficulty: "beginner",
  },
  {
    id: "tip-4",
    title: "Know Your Resume Inside Out",
    description: "Be prepared to explain every project, technology, and responsibility on your resume. Expect deep-dive questions on your most recent work.",
    category: "behavioral",
    difficulty: "beginner",
  },
  {
    id: "tip-5",
    title: "Practice Coding Under Pressure",
    description: "Use mock interviews on platforms like Pramp or Interview Kickstart. Simulate real conditions with time limits and record yourself.",
    category: "preparation",
    difficulty: "intermediate",
  },
  {
    id: "tip-6",
    title: "Ask Intelligent Questions",
    description: "At the end of interviews, ask about company culture, tech stack, team structure, and growth opportunities. This shows genuine interest.",
    category: "behavioral",
    difficulty: "beginner",
  },
  {
    id: "tip-7",
    title: "Study Production Code",
    description: "Read open-source projects on GitHub. Understand how real companies structure their codebase, write tests, and handle edge cases.",
    category: "technical",
    difficulty: "advanced",
  },
  {
    id: "tip-8",
    title: "Master Debugging Skills",
    description: "Learn to use debuggers, write tests, and trace code execution. Companies value engineers who can solve problems methodically.",
    category: "technical",
    difficulty: "intermediate",
  },
];

const companyHiringTrends: CompanyHiringTrend[] = [
  {
    id: "google",
    company: "Google",
    logo: "🔵",
    roles: ["Backend Engineer", "Frontend Engineer", "ML Engineer", "DevOps Engineer"],
    hiringRate: "actively",
    averageSalary: 185000,
    processSteps: 5,
    timeToHire: "2-3 months",
    specializations: ["Search", "Cloud", "AI/ML", "Android"],
  },
  {
    id: "meta",
    company: "Meta",
    logo: "📘",
    roles: ["Full Stack Engineer", "ML Engineer", "Systems Engineer"],
    hiringRate: "actively",
    averageSalary: 195000,
    processSteps: 4,
    timeToHire: "6-8 weeks",
    specializations: ["React", "GraphQL", "Mobile", "Infrastructure"],
  },
  {
    id: "amazon",
    company: "Amazon",
    logo: "🟠",
    roles: ["Backend Engineer", "DevOps Engineer", "Solutions Architect", "Data Engineer"],
    hiringRate: "actively",
    averageSalary: 175000,
    processSteps: 5,
    timeToHire: "8-10 weeks",
    specializations: ["AWS", "Distributed Systems", "Cloud", "E-commerce"],
  },
  {
    id: "microsoft",
    company: "Microsoft",
    logo: "🪟",
    roles: ["Software Engineer", "Cloud Engineer", "AI Engineer"],
    hiringRate: "actively",
    averageSalary: 180000,
    processSteps: 4,
    timeToHire: "6-8 weeks",
    specializations: ["Azure", ".NET", "Cloud", "Enterprise"],
  },
  {
    id: "apple",
    company: "Apple",
    logo: "🍎",
    roles: ["iOS Engineer", "Systems Engineer", "ML Engineer"],
    hiringRate: "moderately",
    averageSalary: 200000,
    processSteps: 5,
    timeToHire: "10-12 weeks",
    specializations: ["Swift", "Hardware", "Security", "Performance"],
  },
  {
    id: "netflix",
    company: "Netflix",
    logo: "🎬",
    roles: ["Full Stack Engineer", "Data Engineer", "Platform Engineer"],
    hiringRate: "moderately",
    averageSalary: 190000,
    processSteps: 4,
    timeToHire: "6-8 weeks",
    specializations: ["Streaming", "Data", "Personalization", "Microservices"],
  },
];

const salaryChartData = [
  { level: "Junior (0-2y)", frontend: 50, backend: 55, devops: 70, fullstack: 60, mobile: 55, ds: 65 },
  { level: "Mid (2-5y)", frontend: 85, backend: 100, devops: 115, fullstack: 105, mobile: 100, ds: 117 },
  { level: "Senior (5-8y)", frontend: 130, backend: 155, devops: 175, fullstack: 165, mobile: 150, ds: 180 },
  { level: "Lead (8+y)", frontend: 200, backend: 225, devops: 245, fullstack: 230, mobile: 205, ds: 275 },
];

export default function CareerGuidancePage() {
  const { user } = useUser();
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null);
  const [selectedTipCategory, setSelectedTipCategory] = useState<string>("all");
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);

  const filteredTips = useMemo(() => {
    return selectedTipCategory === "all" ? interviewTips : interviewTips.filter((tip) => tip.category === selectedTipCategory);
  }, [selectedTipCategory]);

  const selectedPath = careerPaths.find((path) => path.id === selectedCareerPath);

  const demandColors = {
    high: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-red-100 text-red-800",
  };

  const hiringRateColors = {
    actively: "bg-green-500",
    moderately: "bg-yellow-500",
    slowly: "bg-red-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4">
            Career Guidance Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Navigate your tech career with insights on roles, salaries, skills, and interview preparation from industry professionals.
          </p>
        </motion.div>

        {/* Career Paths Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Career Paths in Tech</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {careerPaths.map((path, index) => (
              <motion.button
                key={path.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCareerPath(selectedCareerPath === path.id ? null : path.id)}
                className={`text-left p-6 rounded-xl shadow-lg transition-all transform hover:scale-105 ${
                  selectedCareerPath === path.id
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl ring-2 ring-blue-300"
                    : "bg-white dark:bg-gray-800 hover:shadow-xl"
                }`}
              >
                <div className="text-4xl mb-3">{path.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${selectedCareerPath === path.id ? "text-white" : "text-gray-900 dark:text-white"}`}>
                  {path.name}
                </h3>
                <p className={`text-sm mb-4 ${selectedCareerPath === path.id ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                  {path.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${selectedCareerPath === path.id ? "bg-white/20 text-white" : demandColors[path.demandLevel]}`}>
                    {path.demandLevel.charAt(0).toUpperCase() + path.demandLevel.slice(1)} Demand
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${selectedCareerPath === path.id ? "bg-white/20 text-white" : "bg-blue-100 text-blue-800"}`}>
                    {path.jobsAvailable.toLocaleString()} jobs
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detailed Career Path Info */}
          {selectedPath && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <span className="text-5xl">{selectedPath.icon}</span>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedPath.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">Growth Rate: {selectedPath.growthRate}% annually</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Salary Ranges */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Salary Expectations</h4>
                  <div className="space-y-4">
                    {selectedPath.salaryRanges.map((salary, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-900 dark:text-white capitalize">{salary.level}</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">{salary.experience}</span>
                        </div>
                        <div className="relative w-full h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full"
                            style={{ width: `${(salary.max / 350000) * 100}%` }}
                          ></div>
                          <div
                            className="absolute top-0 h-full border-l-2 border-blue-600"
                            style={{ left: `${(salary.min / 350000) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {salary.currency}
                          {(salary.min / 1000).toFixed(0)}K - {salary.currency}
                          {(salary.max / 1000).toFixed(0)}K
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Required Skills</h4>
                  <div className="space-y-4">
                    {selectedPath.requiredSkills.map((skillGroup, idx) => (
                      <div key={idx} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-lg">
                        <h5 className="font-semibold text-gray-900 dark:text-white mb-3">{skillGroup.category}</h5>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.skills.map((skill, sidx) => (
                            <span key={sidx} className="px-3 py-1 bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 text-sm rounded-full font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Salary Comparison Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Salary Comparison by Role & Experience</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Experience Level</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">Frontend</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">Backend</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">DevOps</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">Full Stack</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">Mobile</th>
                  <th className="text-right py-4 px-4 font-semibold text-gray-900 dark:text-white">Data Science</th>
                </tr>
              </thead>
              <tbody>
                {salaryChartData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{row.level}</td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">${row.frontend}K</td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">${row.backend}K</td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">${row.devops}K</td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">${row.fullstack}K</td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">${row.mobile}K</td>
                    <td className="py-4 px-4 text-right text-gray-700 dark:text-gray-300">${row.ds}K</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Interview Preparation Tips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Interview Preparation Guide</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8">
            {["all", "technical", "behavioral", "system-design", "preparation"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedTipCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedTipCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500"
                }`}
              >
                {category === "all" ? "All Tips" : category.replace("-", " ").charAt(0).toUpperCase() + category.replace("-", " ").slice(1)}
              </button>
            ))}
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-2xl">
                    {tip.category === "technical" && "💻"}
                    {tip.category === "behavioral" && "🤝"}
                    {tip.category === "system-design" && "🏗️"}
                    {tip.category === "preparation" && "📝"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 text-xs rounded font-semibold capitalize ${
                        tip.difficulty === "beginner"
                          ? "bg-green-100 text-green-800"
                          : tip.difficulty === "intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}>
                        {tip.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Hiring Trends */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Company Hiring Trends</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {companyHiringTrends.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                {/* Company Header */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{company.logo}</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{company.company}</h3>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                        company.hiringRate === "actively"
                          ? hiringRateColors.actively
                          : company.hiringRate === "moderately"
                            ? hiringRateColors.moderately
                            : hiringRateColors.slowly
                      }`}
                    >
                      {company.hiringRate.charAt(0).toUpperCase() + company.hiringRate.slice(1)} Hiring
                    </span>
                  </div>
                </div>

                {/* Company Details */}
                <div className="p-6 space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Average Salary</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">${(company.averageSalary / 1000).toFixed(0)}K</div>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">Time to Hire</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">{company.timeToHire}</div>
                    </div>
                  </div>

                  {/* Open Roles */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Actively Hiring For:</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.roles.map((role, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-lg">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specializations */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Specializations:</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.specializations.map((spec, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg font-semibold">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">🎯 Career Development Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Build a Strong Portfolio",
                description: "Showcase your best projects on GitHub. Quality > Quantity. Contribute to open-source projects.",
              },
              {
                title: "Network Actively",
                description: "Attend tech meetups, conferences, and webinars. Build relationships on LinkedIn and Twitter.",
              },
              {
                title: "Keep Learning",
                description: "Stay updated with latest technologies. Take courses, read blogs, and follow industry leaders.",
              },
              {
                title: "Negotiate Smartly",
                description: "Research salary ranges on Levels.fyi and Blind. Don't accept the first offer. Know your worth.",
              },
              {
                title: "Specialize & Generalize",
                description: "Have expertise in one area but be competent across the stack. Versatility makes you valuable.",
              },
              {
                title: "Mentor & Lead",
                description: "Help junior developers. Leadership skills are critical for growth into senior roles and management.",
              },
            ].map((tip, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white shadow-2xl"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Advance Your Career?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Create a personalized roadmap, connect with mentors, and track your progress towards your dream role.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/create-roadmap"
              className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Create Roadmap
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 bg-white/20 border-2 border-white text-white font-bold rounded-lg hover:bg-white/30 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
