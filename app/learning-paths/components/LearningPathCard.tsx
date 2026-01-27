'use client';

import { LearningPath } from '../data/paths';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Users, Clock, Target, TrendingUp } from 'lucide-react';

interface PathCardProps {
  path: LearningPath;
  onStart: (pathId: string) => void;
}

export default function LearningPathCard({ path, onStart }: PathCardProps) {
  const [expanded, setExpanded] = useState(false);

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-orange-100 text-orange-800',
    Expert: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header */}
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900">{path.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{path.description}</p>
          </div>
          <div className="ml-4">
            {expanded ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="bg-blue-50 p-3 rounded text-center">
            <p className="text-xs text-gray-600 font-semibold">Duration</p>
            <p className="text-lg font-bold text-blue-600 mt-1">{path.estimatedWeeks}w</p>
          </div>
          <div className="bg-purple-50 p-3 rounded text-center">
            <p className="text-xs text-gray-600 font-semibold">Total Hours</p>
            <p className="text-lg font-bold text-purple-600 mt-1">{path.totalHours}h</p>
          </div>
          <div className="bg-green-50 p-3 rounded text-center">
            <p className="text-xs text-gray-600 font-semibold">Success Rate</p>
            <p className="text-lg font-bold text-green-600 mt-1">{path.successRate}%</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded text-center">
            <p className="text-xs text-gray-600 font-semibold">Rating</p>
            <p className="text-lg font-bold text-yellow-600 mt-1">
              {path.averageRating}
              <span className="text-sm">★</span>
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${difficultyColors[path.difficulty]}`}>
            {path.difficulty}
          </span>
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold">
            {path.category}
          </span>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-200 p-6 space-y-6">
          {/* Goal */}
          <div>
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Learning Goal
            </h4>
            <p className="text-gray-700">{path.goal}</p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Skills You'll Gain
            </h4>
            <div className="flex flex-wrap gap-2">
              {path.skillsGained.map((skill) => (
                <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          {path.prerequisites.length > 0 && (
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Prerequisites</h4>
              <ul className="space-y-1">
                {path.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Milestones Preview */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              Weekly Milestones ({path.milestones.length} weeks)
            </h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {path.milestones.map((milestone) => (
                <div key={milestone.week} className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">Week {milestone.week}: {milestone.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded whitespace-nowrap ml-2">
                      {milestone.estimatedHours}h
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Capstone Projects</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {path.projects.map((project, idx) => (
                <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded border border-blue-200">
                  <p className="font-semibold text-gray-900 text-sm">{project.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded font-medium">
                      {project.difficulty}
                    </span>
                    <span className="text-xs text-gray-600">{project.estimatedHours}h</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Recommendations */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              Community Reviews ({path.communityRecommendations.length})
            </h4>
            <div className="space-y-3">
              {path.communityRecommendations.map((rec, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-gray-900">{rec.user}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < rec.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{rec.comment}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    ⏱️ Completed in {rec.timeToComplete} weeks
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Learning Resources ({path.resources.length})</h4>
            <div className="space-y-2">
              {path.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-gray-50 hover:bg-blue-50 rounded border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{resource.name}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        <span className="capitalize bg-gray-200 text-gray-800 px-2 py-0.5 rounded text-xs font-semibold mr-2">
                          {resource.type}
                        </span>
                        {resource.estimatedHours} hours
                      </p>
                    </div>
                    <span className="text-blue-600 font-bold">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => onStart(path.id)}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Start Learning Path
          </button>
        </div>
      )}
    </div>
  );
}
