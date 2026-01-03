"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { showError } from '@/lib/toast';
import { Search, MapPin, Briefcase, DollarSign, Clock, Star, Bookmark, Filter, X, TrendingUp, Users, Building2, ExternalLink } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experience: string;
  skills: string[];
  description: string;
  posted: string;
  matchScore: number;
  remote: boolean;
  featured: boolean;
  applicants: number;
  companySize: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$120k - $160k',
    experience: '5-7 years',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    description: 'We are looking for an experienced frontend developer to join our growing team...',
    posted: '2 days ago',
    matchScore: 95,
    remote: true,
    featured: true,
    applicants: 45,
    companySize: '500-1000'
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'StartupHub Inc',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$100k - $140k',
    experience: '3-5 years',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
    description: 'Join our fast-paced startup environment and build scalable web applications...',
    posted: '1 week ago',
    matchScore: 88,
    remote: false,
    featured: false,
    applicants: 67,
    companySize: '50-100'
  },
  {
    id: '3',
    title: 'React Native Developer',
    company: 'MobileFirst Co',
    location: 'Austin, TX',
    type: 'Contract',
    salary: '$90k - $120k',
    experience: '2-4 years',
    skills: ['React Native', 'JavaScript', 'iOS', 'Android'],
    description: 'Build cutting-edge mobile applications for iOS and Android platforms...',
    posted: '3 days ago',
    matchScore: 82,
    remote: true,
    featured: true,
    applicants: 32,
    companySize: '100-500'
  },
  {
    id: '4',
    title: 'Backend Developer',
    company: 'DataDrive Systems',
    location: 'Seattle, WA',
    type: 'Full-time',
    salary: '$110k - $150k',
    experience: '4-6 years',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    description: 'Design and develop robust backend systems for our data-intensive applications...',
    posted: '5 days ago',
    matchScore: 79,
    remote: true,
    featured: false,
    applicants: 58,
    companySize: '1000+'
  },
  {
    id: '5',
    title: 'UI/UX Designer & Frontend Dev',
    company: 'DesignLabs',
    location: 'Remote',
    type: 'Part-time',
    salary: '$60k - $80k',
    experience: '2-3 years',
    skills: ['Figma', 'HTML', 'CSS', 'JavaScript'],
    description: 'Create beautiful user experiences and implement them with clean code...',
    posted: '1 day ago',
    matchScore: 75,
    remote: true,
    featured: false,
    applicants: 23,
    companySize: '10-50'
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'CloudScale Networks',
    location: 'Boston, MA',
    type: 'Full-time',
    salary: '$130k - $170k',
    experience: '5-8 years',
    skills: ['Kubernetes', 'AWS', 'Terraform', 'CI/CD'],
    description: 'Manage and optimize our cloud infrastructure and deployment pipelines...',
    posted: '4 days ago',
    matchScore: 71,
    remote: true,
    featured: true,
    applicants: 41,
    companySize: '500-1000'
  }
];

export default function JobSearchPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [minMatchScore, setMinMatchScore] = useState(0);

  // Load saved jobs from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedJobs');
      if (saved) {
        setSavedJobs(new Set(JSON.parse(saved)));
      }
    } catch (error) {
      console.error('Failed to parse saved jobs:', error);
      // Clear corrupted data
      localStorage.removeItem('savedJobs');
      setSavedJobs(new Set());
    }
  }, []);

  // Save jobs to localStorage
  const toggleSaveJob = (jobId: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) {
      newSaved.delete(jobId);
    } else {
      newSaved.add(jobId);
    }
    setSavedJobs(newSaved);
    try {
      localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSaved)));
    } catch (error) {
      console.error('Failed to save jobs:', error);
      showError('Failed to save job. Please free up storage or try again.');
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesType = selectedJobType === 'all' || job.type.toLowerCase() === selectedJobType.toLowerCase();
    const matchesScore = job.matchScore >= minMatchScore;
    
    return matchesSearch && matchesLocation && matchesType && matchesScore;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                Job Search & Matching
              </h1>
              <p className="text-lg text-gray-600">
                Find your perfect role with AI-powered job matching
              </p>
            </div>
            <Link
              href="/"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full font-semibold hover:shadow-lg transition"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by job title, company, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="relative md:w-64">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:border-blue-500 transition flex items-center gap-2"
            >
              <Filter size={20} />
              Filters
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Match Score: {minMatchScore}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={minMatchScore}
                    onChange={(e) => setMinMatchScore(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedJobType('all');
                      setMinMatchScore(0);
                      setLocationFilter('');
                      setSearchTerm('');
                    }}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-blue-600" />
              <span><strong>{filteredJobs.length}</strong> jobs found</span>
            </div>
            <div className="flex items-center gap-2">
              <Bookmark size={16} className="text-blue-600" />
              <span><strong>{savedJobs.size}</strong> saved jobs</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={16} className="text-blue-600" />
              <span><strong>{filteredJobs.filter(j => j.featured).length}</strong> featured jobs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No jobs found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition cursor-pointer border-2 ${
                    selectedJob?.id === job.id ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                        {job.featured && (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      <p className="text-blue-600 font-semibold text-lg mb-3">{job.company}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaveJob(job.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                      <Bookmark
                        size={20}
                        className={savedJobs.has(job.id) ? 'fill-blue-600 text-blue-600' : 'text-gray-400'}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase size={16} />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <DollarSign size={16} />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{job.posted}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="relative w-12 h-12">
                          <svg className="transform -rotate-90 w-12 h-12">
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="#e5e7eb"
                              strokeWidth="4"
                              fill="none"
                            />
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke={job.matchScore >= 80 ? '#10b981' : job.matchScore >= 60 ? '#f59e0b' : '#ef4444'}
                              strokeWidth="4"
                              fill="none"
                              strokeDasharray={`${job.matchScore * 1.25} ${125}`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                            {job.matchScore}%
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Match Score</p>
                          <p className={`text-sm font-bold ${
                            job.matchScore >= 80 ? 'text-green-600' : job.matchScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {job.matchScore >= 80 ? 'Excellent' : job.matchScore >= 60 ? 'Good' : 'Fair'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users size={16} />
                        <span>{job.applicants} applicants</span>
                      </div>
                    </div>
                    {job.remote && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                        🌐 Remote
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
              {selectedJob ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedJob.title}</h2>
                    <p className="text-blue-600 font-semibold text-lg mb-4">{selectedJob.company}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin size={18} className="text-blue-600" />
                        <span>{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Briefcase size={18} className="text-blue-600" />
                        <span>{selectedJob.type} • {selectedJob.experience}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <DollarSign size={18} className="text-blue-600" />
                        <span className="font-semibold">{selectedJob.salary}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Building2 size={18} className="text-blue-600" />
                        <span>{selectedJob.companySize} employees</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold text-gray-800 mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{selectedJob.description}</p>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-xl hover:shadow-lg transition flex items-center justify-center gap-2">
                        Apply Now
                        <ExternalLink size={18} />
                      </button>
                      <button
                        onClick={() => toggleSaveJob(selectedJob.id)}
                        className={`w-full py-3 ${
                          savedJobs.has(selectedJob.id)
                            ? 'bg-blue-50 text-blue-600 border-2 border-blue-600'
                            : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                        } font-semibold rounded-xl hover:shadow-md transition`}
                      >
                        {savedJobs.has(selectedJob.id) ? '✓ Saved' : 'Save Job'}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">👆</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Select a job</h3>
                  <p className="text-gray-600">Click on any job to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}