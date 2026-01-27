'use client';

import { LearningPath } from '../data/paths';
import { useState } from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface MilestoneTrackerProps {
  path: LearningPath;
  currentWeek: number;
}

export default function MilestoneTracker({ path, currentWeek }: MilestoneTrackerProps) {
  const [completedMilestones, setCompletedMilestones] = useState<number[]>([]);

  const toggleMilestone = (week: number) => {
    setCompletedMilestones((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );
  };

  const progress = (completedMilestones.length / path.milestones.length) * 100;
  const nextMilestone = path.milestones.find((m) => !completedMilestones.includes(m.week));

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{path.title}</h3>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-600 font-semibold">Progress</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {completedMilestones.length}/{path.milestones.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">Time Invested</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {completedMilestones.reduce((acc, week) => {
                const milestone = path.milestones.find((m) => m.week === week);
                return acc + (milestone?.estimatedHours || 0);
              }, 0)}
              <span className="text-lg">h</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">Remaining</p>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {path.milestones.length - completedMilestones.length}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 font-semibold">Completion</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">{progress.toFixed(0)}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {completedMilestones.length === path.milestones.length
              ? '🎉 Congratulations! Path completed!'
              : nextMilestone
                ? `Next: Week ${nextMilestone.week} - ${nextMilestone.title}`
                : 'Get started!'}
          </p>
        </div>
      </div>

      {/* Milestones Timeline */}
      <div className="space-y-4">
        <h4 className="font-bold text-gray-900 mb-4">Weekly Milestones</h4>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-purple-300 to-indigo-300"></div>

          {/* Milestones */}
          <div className="space-y-6">
            {path.milestones.map((milestone, idx) => {
              const isCompleted = completedMilestones.includes(milestone.week);
              const isCurrent = currentWeek === milestone.week;

              return (
                <div key={milestone.week} className="relative pl-20">
                  {/* Circle indicator */}
                  <button
                    onClick={() => toggleMilestone(milestone.week)}
                    className="absolute -left-3 top-0 focus:outline-none transition-transform hover:scale-110"
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-12 h-12 text-green-500 bg-white rounded-full" />
                    ) : isCurrent ? (
                      <div className="w-12 h-12 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    ) : (
                      <Circle className="w-12 h-12 text-gray-400 bg-white rounded-full border-4 border-white" />
                    )}
                  </button>

                  {/* Content Card */}
                  <div
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      isCompleted
                        ? 'bg-green-50 border-green-200'
                        : isCurrent
                          ? 'bg-blue-50 border-blue-300 shadow-lg'
                          : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                    onClick={() => toggleMilestone(milestone.week)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-gray-900">
                          Week {milestone.week}: {milestone.title}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                      </div>
                      <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-2">
                        {milestone.estimatedHours}h
                      </span>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2 mt-4 pl-4 border-l-2 border-gray-300">
                      {milestone.tasks.map((task, taskIdx) => (
                        <div key={taskIdx} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <p className="text-sm text-gray-700">{task}</p>
                        </div>
                      ))}
                    </div>

                    {/* Resources */}
                    {milestone.resources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-300">
                        <p className="text-xs font-semibold text-gray-600 mb-2">Resources:</p>
                        <div className="flex flex-wrap gap-2">
                          {milestone.resources.map((resource) => (
                            <span key={resource} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                              {resource}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    {isCompleted && (
                      <div className="mt-4 pt-4 border-t border-green-300 text-center">
                        <p className="text-sm font-bold text-green-600">✅ Completed</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-600 font-semibold">Total Hours Tracked</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{path.totalHours}h</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600 font-semibold">Average Rating</p>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {path.averageRating}
            <span className="text-lg">★</span>
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-600 font-semibold">Success Rate</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{path.successRate}%</p>
        </div>
      </div>
    </div>
  );
}
