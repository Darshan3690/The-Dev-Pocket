/**
 * Enhanced Dashboard Component for The Dev Pocket
 * Demonstrates comprehensive accessibility, performance monitoring, and error handling
 */

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

// Import enhanced utilities
import { useAccessibility } from '../lib/accessibility';
import { usePerformanceMonitoring } from '../lib/performance';
import { useErrorHandling } from '../lib/error-handling';

interface DashboardStats {
  totalUsers: number;
  activeProjects: number;
  completedTasks: number;
  learningProgress: number;
}

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'paused';
  progress: number;
  lastUpdated: string;
}

type DashboardData = {
  stats: DashboardStats;
  projects: Project[];
};

const EnhancedDashboard: React.FC = () => {
  const { user } = useUser();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize enhanced utilities
  const { announce, announceSuccess, announceError, focusElement } = useAccessibility();
  const { startTimer, endTimer, measureAsync } = usePerformanceMonitoring();
  const { handleError, wrapAsync } = useErrorHandling();

  // Enhanced data fetching with error handling and performance monitoring
  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await measureAsync<DashboardData>('dashboard-data-fetch', async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate potential failure
        if (Math.random() < 0.1) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        return {
          stats: {
            totalUsers: 1250,
            activeProjects: 8,
            completedTasks: 45,
            learningProgress: 78
          },
          projects: [
            { id: '1', name: 'React Portfolio', status: 'active', progress: 85, lastUpdated: '2025-01-10' },
            { id: '2', name: 'Node.js API', status: 'completed', progress: 100, lastUpdated: '2025-01-08' },
            { id: '3', name: 'TypeScript Learning', status: 'active', progress: 60, lastUpdated: '2025-01-11' },
            { id: '4', name: 'Database Design', status: 'paused', progress: 30, lastUpdated: '2025-01-05' }
          ]
        };
      }, 'api');

      setStats(data.stats);
      setProjects(data.projects);
      announceSuccess('Dashboard data loaded successfully');
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      announceError(`Failed to load dashboard: ${errorMessage}`);
      handleError(err as Error, 'error', 'Dashboard Data Fetch');
    } finally {
      setLoading(false);
    }
  }, [measureAsync, announceSuccess, announceError, handleError]);

  // Enhanced project status update with accessibility
  const updateProjectStatus = useCallback(async (projectId: string, newStatus: Project['status']) => {
    try {
      startTimer(`project-update-${projectId}`);
      
      await measureAsync(`project-status-update-${projectId}`, async () => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setProjects(prev => prev.map(project => 
          project.id === projectId 
            ? { ...project, status: newStatus, lastUpdated: new Date().toISOString().split('T')[0] }
            : project
        ));
      }, 'api');

      announceSuccess(`Project status updated to ${newStatus}`);
      endTimer(`project-update-${projectId}`);
      
    } catch (err) {
      announceError('Failed to update project status');
      handleError(err as Error, 'error', 'Project Status Update');
    }
  }, [startTimer, endTimer, measureAsync, announceSuccess, announceError, handleError]);

  // Enhanced keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }, []);

  // Initialize dashboard on mount
  useEffect(() => {
    const initializeDashboard = wrapAsync(async () => {
      await fetchDashboardData();
    }, 'Dashboard Initialization');

    initializeDashboard();
  }, [fetchDashboardData, wrapAsync]);

  // Enhanced loading state with accessibility
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" role="status" aria-live="polite">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" aria-hidden="true"></div>
          <p className="text-gray-600">Loading dashboard...</p>
          <span className="sr-only">Loading dashboard data, please wait</span>
        </div>
      </div>
    );
  }

  // Enhanced error state with accessibility
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" role="alert" aria-live="assertive">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <svg className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Dashboard</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Retry loading dashboard data"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" role="main" aria-label="Developer dashboard">
      {/* Enhanced header with accessibility */}
      <header className="bg-white shadow-sm border-b border-gray-200" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.firstName || 'Developer'}!
              </h1>
              <p className="text-gray-600">Here&apos;s your development progress overview</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => focusElement('#stats-section')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Jump to statistics section"
              >
                View Stats
              </button>
              <Link
                href="/dashboard/projects"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label="Go to projects page"
              >
                Manage Projects
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced statistics section */}
        <section id="stats-section" className="mb-8" aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="text-xl font-semibold text-gray-900 mb-6">
            Your Progress Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {stats && Object.entries(stats).map(([key, value]) => (
              <div
                key={key}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                role="listitem"
                aria-label={`${key}: ${value}`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enhanced projects section */}
        <section className="mb-8" aria-labelledby="projects-heading">
          <div className="flex items-center justify-between mb-6">
            <h2 id="projects-heading" className="text-xl font-semibold text-gray-900">
              Your Projects
            </h2>
            <button
              onClick={() => announce('Refreshing projects list')}
              className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Refresh projects list"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" role="table" aria-label="Projects table">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200" role="row">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500" role="rowheader">
                <div role="columnheader">Project Name</div>
                <div role="columnheader">Status</div>
                <div role="columnheader">Progress</div>
                <div role="columnheader">Actions</div>
              </div>
            </div>
            
            <div role="rowgroup">
              {projects.map((project) => (
                <div key={project.id} className="px-6 py-4 border-b border-gray-200 hover:bg-gray-50" role="row">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div role="cell">
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-500">Updated: {project.lastUpdated}</p>
                    </div>
                    
                    <div role="cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div role="cell">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${project.progress}%` }}
                            aria-label={`${project.progress}% complete`}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                    </div>
                    
                    <div role="cell">
                      <div className="flex space-x-2">
                        {project.status !== 'completed' && (
                          <button
                            onClick={() => updateProjectStatus(project.id, 'completed')}
                            onKeyDown={(e) => handleKeyDown(e, () => updateProjectStatus(project.id, 'completed'))}
                            className="text-green-600 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label={`Mark ${project.name} as completed`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                        )}
                        
                        {project.status !== 'paused' && (
                          <button
                            onClick={() => updateProjectStatus(project.id, 'paused')}
                            onKeyDown={(e) => handleKeyDown(e, () => updateProjectStatus(project.id, 'paused'))}
                            className="text-yellow-600 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            aria-label={`Pause ${project.name}`}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        )}
                        
                        <button
                          onClick={() => announce(`Opening details for ${project.name}`)}
                          className="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          aria-label={`View details for ${project.name}`}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced quick actions */}
        <section aria-labelledby="quick-actions-heading">
          <h2 id="quick-actions-heading" className="text-xl font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/dashboard/projects/new"
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Create new project"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">New Project</h3>
                  <p className="text-gray-500">Start a new development project</p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/learning"
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Continue learning"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v11.494m-5.22-8.485l10.44 0M17.22 6.253L6.78 17.747M6.78 6.253l10.44 11.494" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Continue Learning</h3>
                  <p className="text-gray-500">Resume your learning path</p>
                </div>
              </div>
            </Link>

            <Link
              href="/dashboard/profile"
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Update profile"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Update Profile</h3>
                  <p className="text-gray-500">Manage your account settings</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EnhancedDashboard;
