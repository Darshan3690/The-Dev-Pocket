"use client";
import React, { useState, useCallback } from 'react';
import { Sparkles, Target, TrendingUp, Book, Award, ChevronRight, Check, ArrowRight, Star, Clock, Users } from 'lucide-react';

// Enhanced Types
interface UserProfile {
  currentLevel: string;
  targetRole: string;
  timeCommitment: string;
  interests: string[];
  experience: string;
  preferredLearningStyle: string;
  goals: string[];
  timeline: string;
}

interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  resources: Resource[];
  prerequisites: string[];
  order: number;
  completed: boolean;
  progress: number;
  estimatedHours: number;
  skills: string[];
  assessments: Assessment[];
}

interface Resource {
  title: string;
  type: 'course' | 'article' | 'video' | 'book' | 'project' | 'practice' | 'certification';
  url: string;
  platform: string;
  rating: number;
  reviews: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  isFree: boolean;
  description: string;
}

interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'project' | 'coding' | 'interview';
  description: string;
  estimatedTime: string;
}

interface GeneratedRoadmap {
  id: string;
  title: string;
  description: string;
  estimatedDuration: string;
  totalHours: number;
  nodes: RoadmapNode[];
  milestones: string[];
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completionRate: number;
  createdAt: string;
  updatedAt: string;
}

 

const PersonalizedRoadmapGenerator: React.FC = () => {
  const [step, setStep] = useState<'profile' | 'generating' | 'result'>('profile');
  const [profile, setProfile] = useState<UserProfile>({
    currentLevel: '',
    targetRole: '',
    timeCommitment: '',
    interests: [],
    experience: '',
    preferredLearningStyle: '',
    goals: [],
    timeline: ''
  });
  const [generatedRoadmap, setGeneratedRoadmap] = useState<GeneratedRoadmap | null>(null);
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);

  // Simulated AI roadmap generation
  const generateRoadmap = useCallback(() => {
    setStep('generating');
    
    setTimeout(() => {
      const roadmap: GeneratedRoadmap = {
        id: `roadmap-${Date.now()}`,
        title: `${profile.targetRole} Learning Path`,
        description: `Personalized roadmap tailored for ${profile.currentLevel} developers aiming to become ${profile.targetRole}`,
        estimatedDuration: profile.timeCommitment === 'full-time' ? '3-4 months' : profile.timeCommitment === 'part-time' ? '6-8 months' : '9-12 months',
        totalHours: profile.timeCommitment === 'full-time' ? 480 : profile.timeCommitment === 'part-time' ? 720 : 960,
        tags: [profile.targetRole.toLowerCase(), profile.currentLevel.toLowerCase(), ...profile.interests.map(i => i.toLowerCase())],
        difficulty: profile.currentLevel.toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
        completionRate: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        milestones: [
          'Complete fundamentals',
          'Build 3 portfolio projects',
          'Master core technologies',
          'Prepare for interviews',
          'Land target role'
        ],
        nodes: generateNodes(profile)
      };
      
      setGeneratedRoadmap(roadmap);
      setStep('result');
    }, 2500);
  }, [profile, generateNodes]);

  const createResource = (title: string, type: Resource['type'], url: string, platform: string, level: Resource['level'] = 'beginner', isFree: boolean = true): Resource => ({
    title,
    type,
    url,
    platform,
    rating: 4.5,
    reviews: Math.floor(Math.random() * 1000) + 100,
    duration: type === 'course' ? '10-20 hours' : type === 'video' ? '2-5 hours' : '1-3 hours',
    level,
    isFree,
    description: `High-quality ${type} covering ${title.toLowerCase()}`
  });

  const generateNodes = (prof: UserProfile): RoadmapNode[] => {
    const baseNodes: RoadmapNode[] = [];
    let order = 1;

    if (prof.targetRole.toLowerCase().includes('frontend')) {
      baseNodes.push(
        {
          id: 'html-css',
          title: 'HTML & CSS Fundamentals',
          description: 'Master the building blocks of web development',
          category: 'Fundamentals',
          duration: '2-3 weeks',
          difficulty: 'beginner',
          order: order++,
          prerequisites: [],
          completed: false,
          progress: 0,
          estimatedHours: 40,
          skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'Grid'],
          assessments: [
            { id: 'html-quiz', title: 'HTML Fundamentals Quiz', type: 'quiz', description: 'Test your HTML knowledge', estimatedTime: '30 minutes' },
            { id: 'css-project', title: 'Build a Landing Page', type: 'project', description: 'Create a responsive landing page', estimatedTime: '4 hours' }
          ],
          resources: [
            createResource('HTML & CSS Course', 'course', '#', 'freeCodeCamp', 'beginner', true),
            createResource('CSS Grid Guide', 'article', '#', 'CSS Tricks', 'beginner', true)
          ]
        },
        {
          id: 'javascript',
          title: 'JavaScript Essentials',
          description: 'Learn modern JavaScript and ES6+ features',
          category: 'Core Skills',
          duration: '4-6 weeks',
          difficulty: 'intermediate',
          order: order++,
          prerequisites: ['html-css'],
          completed: false,
          progress: 0,
          estimatedHours: 60,
          skills: ['ES6+', 'DOM Manipulation', 'Async/Await', 'Promises', 'Functions'],
          assessments: [
            { id: 'js-quiz', title: 'JavaScript Fundamentals Quiz', type: 'quiz', description: 'Test your JS knowledge', estimatedTime: '45 minutes' },
            { id: 'js-project', title: 'Interactive Web App', type: 'project', description: 'Build a dynamic web application', estimatedTime: '8 hours' }
          ],
          resources: [
            createResource('JavaScript.info', 'course', '#', 'javascript.info', 'intermediate', true),
            createResource('You Don&apos;t Know JS', 'book', '#', 'GitHub', 'intermediate', true)
          ]
        },
        {
          id: 'react',
          title: 'React Development',
          description: 'Build interactive UIs with React',
          category: 'Framework',
          duration: '6-8 weeks',
          difficulty: 'intermediate',
          order: order++,
          prerequisites: ['javascript'],
          completed: false,
          progress: 0,
          estimatedHours: 80,
          skills: ['React Components', 'JSX', 'Hooks', 'State Management', 'Props'],
          assessments: [
            { id: 'react-quiz', title: 'React Concepts Quiz', type: 'quiz', description: 'Test your React knowledge', estimatedTime: '30 minutes' },
            { id: 'react-app', title: 'Build a React App', type: 'project', description: 'Create a full React application', estimatedTime: '12 hours' }
          ],
          resources: [
            createResource('React Official Docs', 'course', '#', 'React.dev', 'intermediate', true),
            createResource('Full React Course', 'video', '#', 'YouTube', 'intermediate', true)
          ]
        },
        {
          id: 'projects',
          title: 'Portfolio Projects',
          description: 'Build 3 production-ready applications',
          category: 'Practice',
          duration: '8-10 weeks',
          difficulty: 'advanced',
          order: order++,
          prerequisites: ['react'],
          completed: false,
          progress: 0,
          estimatedHours: 120,
          skills: ['Project Planning', 'Version Control', 'Deployment', 'Testing', 'Debugging'],
          assessments: [
            { id: 'portfolio-review', title: 'Portfolio Review', type: 'project', description: 'Present your completed projects', estimatedTime: '2 hours' },
            { id: 'code-review', title: 'Code Quality Review', type: 'coding', description: 'Code review session', estimatedTime: '1 hour' }
          ],
          resources: [
            createResource('Project Ideas', 'article', '#', 'Dev.to', 'advanced', true),
            createResource('Build Real Apps', 'project', '#', 'GitHub', 'advanced', true)
          ]
        }
      );
    } else if (prof.targetRole.toLowerCase().includes('backend')) {
      baseNodes.push(
        {
          id: 'server-basics',
          title: 'Server-Side Fundamentals',
          description: 'Understand HTTP, REST APIs, and server concepts',
          category: 'Fundamentals',
          duration: '3-4 weeks',
          difficulty: 'beginner',
          order: order++,
          prerequisites: [],
          completed: false,
          progress: 0,
          estimatedHours: 40,
          skills: ['HTTP', 'REST', 'APIs'],
          assessments: [],
          resources: [
            createResource('HTTP Basics', 'article', '#', 'MDN', 'beginner', true),
            createResource('REST API Design', 'course', '#', 'Udemy', 'beginner', true)
          ]
        },
        {
          id: 'nodejs',
          title: 'Node.js & Express',
          description: 'Build scalable backend services',
          category: 'Core Skills',
          duration: '6-8 weeks',
          difficulty: 'intermediate',
          order: order++,
          prerequisites: ['server-basics'],
          completed: false,
          progress: 0,
          estimatedHours: 70,
          skills: ['Node.js', 'Express', 'Middleware'],
          assessments: [],
          resources: [
            createResource('Node.js Complete Guide', 'course', '#', 'Udemy', 'intermediate', true),
            createResource('Express Documentation', 'article', '#', 'Express', 'intermediate', true)
          ]
        },
        {
          id: 'databases',
          title: 'Database Design & SQL',
          description: 'Master relational and NoSQL databases',
          category: 'Data',
          duration: '5-6 weeks',
          difficulty: 'intermediate',
          order: order++,
          prerequisites: ['nodejs'],
          completed: false,
          progress: 0,
          estimatedHours: 60,
          skills: ['SQL', 'PostgreSQL', 'MongoDB'],
          assessments: [],
          resources: [
            createResource('SQL Fundamentals', 'course', '#', 'Khan Academy', 'intermediate', true),
            createResource('MongoDB University', 'course', '#', 'MongoDB', 'intermediate', true)
          ]
        },
        {
          id: 'api-projects',
          title: 'Build RESTful APIs',
          description: 'Create production-ready backend services',
          category: 'Practice',
          duration: '8-10 weeks',
          difficulty: 'advanced',
          order: order++,
          prerequisites: ['databases'],
          completed: false,
          progress: 0,
          estimatedHours: 90,
          skills: ['API Design', 'Authentication', 'Testing'],
          assessments: [],
          resources: [
            createResource('API Best Practices', 'article', '#', 'Dev.to', 'advanced', true),
            createResource('Microservices Tutorial', 'video', '#', 'YouTube', 'advanced', true)
          ]
        }
      );
    } else {
      baseNodes.push(
        {
          id: 'programming-basics',
          title: 'Programming Fundamentals',
          description: 'Learn core programming concepts',
          category: 'Fundamentals',
          duration: '4-6 weeks',
          difficulty: 'beginner',
          order: order++,
          prerequisites: [],
          completed: false,
          progress: 0,
          estimatedHours: 50,
          skills: ['Variables', 'Loops', 'Functions'],
          assessments: [],
          resources: [
            createResource('CS50', 'course', '#', 'Harvard', 'beginner', true),
            createResource('Algorithms Course', 'course', '#', 'Coursera', 'beginner', true)
          ]
        },
        {
          id: 'chosen-language',
          title: 'Master Your Language',
          description: 'Deep dive into your chosen programming language',
          category: 'Core Skills',
          duration: '6-8 weeks',
          difficulty: 'intermediate',
          order: order++,
          prerequisites: ['programming-basics'],
          completed: false,
          progress: 0,
          estimatedHours: 70,
          skills: ['Advanced Syntax', 'Best Practices'],
          assessments: [],
          resources: [
            createResource('Language Documentation', 'article', '#', 'Official Docs', 'intermediate', true),
            createResource('Advanced Concepts', 'course', '#', 'Pluralsight', 'intermediate', true)
          ]
        }
      );
    }

    return baseNodes;
  };

  const handleInterestToggle = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Profile Form
  if (step === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6 shadow-lg">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
              AI-Powered Learning Path
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Tell us about yourself and let our advanced AI craft a personalized roadmap tailored to your goals
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>Takes 2-3 minutes</span>
              <span className="mx-2">•</span>
              <Users className="w-4 h-4" />
              <span>Trusted by 10,000+ developers</span>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8 md:p-10 space-y-8">
            
            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white text-sm font-bold">1</div>
                <span className="text-gray-800 font-medium">Profile Setup</span>
              </div>
              <div className="text-gray-500 text-sm">Step 1 of 3</div>
            </div>

            {/* Current Level */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-cyan-600" />
                <label className="text-lg font-semibold text-gray-800">
                  What&apos;s your current skill level?
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'Beginner', desc: 'Just starting out', icon: '🌱' },
                  { value: 'Intermediate', desc: 'Some experience', icon: '🚀' },
                  { value: 'Advanced', desc: 'Experienced pro', icon: '⭐' }
                ].map(level => (
                  <button
                    key={level.value}
                    onClick={() => setProfile(prev => ({ ...prev, currentLevel: level.value }))}
                    className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      profile.currentLevel === level.value
                        ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-blue-50 shadow-lg shadow-cyan-500/25'
                        : 'border-gray-200 bg-white hover:border-cyan-300 hover:bg-cyan-50/50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{level.icon}</div>
                    <div className="font-bold text-gray-800 text-lg mb-1">{level.value}</div>
                    <div className="text-gray-600 text-sm">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Role */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-blue-600" />
                <label className="text-lg font-semibold text-gray-800">
                  What&apos;s your dream role?
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={profile.targetRole}
                  onChange={(e) => setProfile(prev => ({ ...prev, targetRole: e.target.value }))}
                  placeholder="e.g., Frontend Developer, Data Scientist, Full-Stack Engineer"
                  className="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all text-gray-800 placeholder-gray-500 text-lg backdrop-blur-sm shadow-inner"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Time Commitment */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-teal-600" />
                <label className="text-lg font-semibold text-gray-800">
                  How much time can you dedicate?
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'full-time', label: 'Full-time', desc: '30+ hrs/week', icon: '🔥' },
                  { value: 'part-time', label: 'Part-time', desc: '15-20 hrs/week', icon: '⚡' },
                  { value: 'casual', label: 'Casual', desc: '5-10 hrs/week', icon: '🌙' }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setProfile(prev => ({ ...prev, timeCommitment: option.value }))}
                    className={`group p-5 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                      profile.timeCommitment === option.value
                        ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-lg shadow-teal-500/25'
                        : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-bold text-gray-800 text-lg mb-1">{option.label}</div>
                    <div className="text-gray-600 text-sm">{option.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-5 h-5 text-amber-600" />
                <label className="text-lg font-semibold text-gray-800">
                  What excites you? (Select all that apply)
                </label>
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Web Development', icon: '🌐' },
                  { name: 'Mobile Apps', icon: '📱' },
                  { name: 'Cloud', icon: '☁️' },
                  { name: 'AI/ML', icon: '🤖' },
                  { name: 'DevOps', icon: '⚙️' },
                  { name: 'Security', icon: '🔒' },
                  { name: 'Databases', icon: '💾' },
                  { name: 'UI/UX', icon: '🎨' }
                ].map(interest => (
                  <button
                    key={interest.name}
                    onClick={() => handleInterestToggle(interest.name)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                      profile.interests.includes(interest.name)
                        ? 'border-amber-500 bg-gradient-to-r from-amber-50 to-yellow-50 text-gray-800 shadow-lg shadow-amber-500/25'
                        : 'border-gray-200 text-gray-700 bg-white hover:border-amber-300 hover:bg-amber-50/50'
                    }`}
                  >
                    <span className="text-lg">{interest.icon}</span>
                    <span className="font-medium">{interest.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <Book className="w-5 h-5 text-indigo-600" />
                <label className="text-lg font-semibold text-gray-800">
                  Tell us about your experience (optional)
                </label>
              </div>
              <textarea
                value={profile.experience}
                onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
                placeholder="Share any relevant experience, projects, or technologies you've worked with..."
                rows={4}
                className="w-full px-6 py-4 bg-white/70 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none transition-all resize-none text-gray-800 placeholder-gray-500 text-lg backdrop-blur-sm shadow-inner"
              />
            </div>

            {/* Generate Button */}
            <div className="pt-6">
              <button
                onClick={generateRoadmap}
                disabled={!profile.currentLevel || !profile.targetRole || !profile.timeCommitment}
                className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white font-bold py-5 rounded-2xl hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
              >
                <Sparkles className="w-6 h-6" />
                Generate My AI Roadmap
                <ArrowRight className="w-6 h-6" />
              </button>
              
              {(!profile.currentLevel || !profile.targetRole || !profile.timeCommitment) && (
                <p className="text-center text-gray-500 text-sm mt-3">
                  Please complete the required fields above
                </p>
              )}
            </div>
          </div>

          {/* Bottom Info */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generating State
  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-6 animate-pulse shadow-lg">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">
            Crafting Your Perfect Learning Path...
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Our AI is analyzing your profile and generating a personalized roadmap
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600 uppercase">Your Personalized Path</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {generatedRoadmap?.title}
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                {generatedRoadmap?.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-800">Estimated: {generatedRoadmap?.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-gray-800">{generatedRoadmap?.nodes.length} Learning Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-gray-800">{generatedRoadmap?.milestones.length} Milestones</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setStep('profile')}
              className="ml-4 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors text-gray-800"
            >
              Create New
            </button>
          </div>

          {/* Milestones */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Key Milestones</h3>
            <div className="flex flex-wrap gap-2">
              {generatedRoadmap?.milestones.map((milestone, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
                  <Check className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-800">{milestone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap Nodes */}
        <div className="space-y-4">
          {generatedRoadmap?.nodes.map((node) => (
            <div
              key={node.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Order Badge */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {node.order}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(node.difficulty)}`}>
                            {node.difficulty}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                            {node.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{node.title}</h3>
                        <p className="text-gray-600">{node.description}</p>
                      </div>
                      <button
                        onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                        className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ChevronRight className={`w-5 h-5 transition-transform ${selectedNode?.id === node.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {node.duration}
                      </span>
                      {node.prerequisites.length > 0 && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Requires: {node.prerequisites.length} prerequisite(s)
                        </span>
                      )}
                    </div>

                    {/* Expanded Resources */}
                    {selectedNode?.id === node.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-3">Recommended Resources</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {node.resources.map((resource, resIdx) => (
                            <a
                              key={resIdx}
                              href={resource.url}
                              className="flex items-start gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                            >
                              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Book className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {resource.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {resource.type} • {resource.platform}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-gray-100">
                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600" style={{ width: '0%' }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
            Save to Dashboard
          </button>
          <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-all">
            Share Roadmap
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRoadmapGenerator;
