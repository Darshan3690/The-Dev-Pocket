'use client';

import { useState } from 'react';
import { learningPaths, LearningPath, getRecommendedPath } from './data/paths';
import SkillAssessment from './components/SkillAssessment';
import LearningPathCard from './components/LearningPathCard';
import MilestoneTracker from './components/MilestoneTracker';
import ProgressVisualization from './components/ProgressVisualization';
import { Zap, BookOpen, TrendingUp, Users, Clock, Target } from 'lucide-react';

type ViewMode = 'home' | 'assessment' | 'browse' | 'tracking' | 'visualization';

export default function LearningPathsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [assessmentScores, setAssessmentScores] = useState<Record<string, number> | null>(null);
  const [recommendedPath, setRecommendedPath] = useState<LearningPath | null>(null);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const handleAssessmentComplete = (scores: Record<string, number>) => {
    setAssessmentScores(scores);
    const recommended = getRecommendedPath(scores);
    setRecommendedPath(recommended);
    setSelectedPath(recommended);
    setViewMode('tracking');
  };

  const handleStartPath = (pathId: string) => {
    const path = learningPaths.find((p) => p.id === pathId);
    if (path) {
      setSelectedPath(path);
      setViewMode('tracking');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Learning Path Recommender</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Discover personalized learning paths tailored to your goals, skills, and experience level.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        {(viewMode === 'tracking' || viewMode === 'visualization' || viewMode === 'browse') && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setViewMode('home')}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setViewMode('assessment')}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium transition-colors"
            >
              Assessment
            </button>
            <button
              onClick={() => setViewMode('browse')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'browse'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Browse All Paths
            </button>
            {selectedPath && (
              <>
                <button
                  onClick={() => setViewMode('tracking')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'tracking'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Track Progress
                </button>
                <button
                  onClick={() => setViewMode('visualization')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    viewMode === 'visualization'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Visualize Progress
                </button>
              </>
            )}
          </div>
        )}

        {/* Home View */}
        {viewMode === 'home' && (
          <div className="space-y-12">
            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Assessment</h3>
                <p className="text-gray-600">
                  Take a quick skill assessment quiz to discover your current knowledge level and receive tailored
                  recommendations.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Goal-Based Paths</h3>
                <p className="text-gray-600">
                  Choose from 5+ carefully curated learning paths aligned with real career goals and industry demands.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Track Weekly Progress</h3>
                <p className="text-gray-600">
                  Monitor your journey with interactive milestone tracking, progress visualization, and community
                  insights.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Take our skill assessment to get personalized learning path recommendations based on your experience
                level and career goals.
              </p>
              <button
                onClick={() => setViewMode('assessment')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-colors text-lg"
              >
                Start Assessment
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <p className="text-gray-600 text-sm font-semibold">Total Paths</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{learningPaths.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                <p className="text-gray-600 text-sm font-semibold">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {(
                    learningPaths.reduce((acc, p) => acc + p.averageRating, 0) / learningPaths.length
                  ).toFixed(1)}
                  ★
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                <p className="text-gray-600 text-sm font-semibold">Total Resources</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {learningPaths.reduce((acc, p) => acc + p.resources.length, 0)}+
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                <p className="text-gray-600 text-sm font-semibold">Avg Success Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {Math.round(learningPaths.reduce((acc, p) => acc + p.successRate, 0) / learningPaths.length)}%
                </p>
              </div>
            </div>

            {/* Featured Paths */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Learning Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learningPaths.slice(0, 3).map((path) => (
                  <div key={path.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{path.description}</p>
                    <div className="flex items-center gap-4 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{path.estimatedWeeks}w</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="font-medium">{path.successRate}% success</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartPath(path.id)}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    >
                      Start Path
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Assessment View */}
        {viewMode === 'assessment' && (
          <div className="max-w-2xl mx-auto">
            <div className="mb-6">
              <button
                onClick={() => setViewMode('home')}
                className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium transition-colors"
              >
                ← Back
              </button>
            </div>
            <SkillAssessment onComplete={handleAssessmentComplete} />
          </div>
        )}

        {/* Browse View */}
        {viewMode === 'browse' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Learning Paths ({learningPaths.length})</h2>
            <div className="space-y-4">
              {learningPaths.map((path) => (
                <LearningPathCard key={path.id} path={path} onStart={handleStartPath} />
              ))}
            </div>
          </div>
        )}

        {/* Tracking View */}
        {viewMode === 'tracking' && selectedPath && (
          <MilestoneTracker path={selectedPath} currentWeek={1} />
        )}

        {/* Visualization View */}
        {viewMode === 'visualization' && selectedPath && (
          <ProgressVisualization path={selectedPath} />
        )}

        {/* Recommendation Banner */}
        {recommendedPath && viewMode !== 'assessment' && (
          <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Recommended for You</h3>
            <p className="text-gray-700 mb-4">
              Based on your skill assessment, we recommend the <span className="font-bold">{recommendedPath.title}</span>
              . This path is perfect for your level and goals.
            </p>
            <button
              onClick={() => handleStartPath(recommendedPath.id)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors"
            >
              Start Recommended Path
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
