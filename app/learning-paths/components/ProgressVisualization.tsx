'use client';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { LearningPath } from '../data/paths';

interface ProgressVisualizationProps {
  path: LearningPath;
}

export default function ProgressVisualization({ path }: ProgressVisualizationProps) {
  // Mock data for visualization
  const weeklyProgress = [
    { week: 1, completed: 1, target: 1, hours: 15 },
    { week: 2, completed: 2, target: 2, hours: 18 },
    { week: 3, completed: 2, target: 3, hours: 14 },
    { week: 4, completed: 3, target: 4, hours: 16 },
    { week: 5, completed: 4, target: 5, hours: 20 },
  ];

  const skillProgress = [
    { name: 'Frontend', progress: 75 },
    { name: 'Backend', progress: 60 },
    { name: 'Database', progress: 45 },
    { name: 'DevOps', progress: 30 },
  ];

  const categoryDistribution = [
    { name: 'Videos', value: 40 },
    { name: 'Documentation', value: 30 },
    { name: 'Projects', value: 20 },
    { name: 'Practice', value: 10 },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-8">
      {/* Weekly Progress */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Weekly Progress</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="completed"
              stroke="#10B981"
              strokeWidth={3}
              name="Completed"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#EF4444"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Skills Progress */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Skill Development</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={skillProgress}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#3B82F6" name="Progress (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Learning Distribution */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Learning Content Distribution</h4>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }: any) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2 space-y-3">
            {categoryDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[idx] }}></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${item.value}%`,
                        backgroundColor: COLORS[idx],
                      }}
                    ></div>
                  </div>
                </div>
                <span className="font-bold text-gray-900 w-12 text-right">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Achievements</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🎯', title: 'Goal Setter', desc: 'Set your first learning goal' },
            { icon: '📚', title: 'First Steps', desc: 'Complete first milestone' },
            { icon: '🔥', title: 'On Fire', desc: '7-day streak' },
            { icon: '🏆', title: 'Champion', desc: 'Complete entire path' },
          ].map((achievement, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 text-center">
              <p className="text-4xl mb-2">{achievement.icon}</p>
              <p className="font-bold text-gray-900">{achievement.title}</p>
              <p className="text-xs text-gray-600 mt-1">{achievement.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
          <h5 className="font-bold text-gray-900 mb-2">Total Hours</h5>
          <p className="text-4xl font-bold text-green-600">{path.totalHours}h</p>
          <p className="text-sm text-gray-600 mt-2">Estimated completion</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
          <h5 className="font-bold text-gray-900 mb-2">Average Rating</h5>
          <p className="text-4xl font-bold text-blue-600">{path.averageRating}★</p>
          <p className="text-sm text-gray-600 mt-2">From {path.communityRecommendations.length} reviews</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
          <h5 className="font-bold text-gray-900 mb-2">Success Rate</h5>
          <p className="text-4xl font-bold text-purple-600">{path.successRate}%</p>
          <p className="text-sm text-gray-600 mt-2">Completion success</p>
        </div>
      </div>
    </div>
  );
}
