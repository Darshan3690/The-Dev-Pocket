import Link from 'next/link';
import { ArrowLeft, FileText, BookOpen, Play, Code, ExternalLink } from 'lucide-react';

const resourceCategories = [
  {
    title: 'Notes',
    icon: FileText,
    color: 'bg-blue-500',
    description: 'Comprehensive study notes and documentation',
    items: [
      { name: 'DSA Quick Reference', type: 'PDF', size: '2.3 MB' },
      { name: 'System Design Notes', type: 'PDF', size: '4.1 MB' },
      { name: 'JavaScript Concepts', type: 'PDF', size: '1.8 MB' },
      { name: 'Database Fundamentals', type: 'PDF', size: '3.2 MB' },
      { name: 'OOP Principles Guide', type: 'PDF', size: '1.5 MB' }
    ]
  },
  {
    title: 'Cheat Sheets',
    icon: BookOpen,
    color: 'bg-green-500',
    description: 'Quick reference guides and formula sheets',
    items: [
      { name: 'Big O Complexity Chart', type: 'PNG', size: '0.8 MB' },
      { name: 'SQL Commands Reference', type: 'PDF', size: '1.2 MB' },
      { name: 'Git Commands Cheat Sheet', type: 'PDF', size: '0.9 MB' },
      { name: 'Python Syntax Guide', type: 'PDF', size: '1.1 MB' },
      { name: 'React Hooks Reference', type: 'PDF', size: '0.7 MB' }
    ]
  },
  {
    title: 'Video Links',
    icon: Play,
    color: 'bg-purple-500',
    description: 'Curated video tutorials and lectures',
    items: [
      { name: 'Dynamic Programming Explained', type: 'YouTube', duration: '45 min' },
      { name: 'System Design Interview', type: 'YouTube', duration: '1h 20min' },
      { name: 'Binary Trees Masterclass', type: 'YouTube', duration: '2h 15min' },
      { name: 'Graph Algorithms Course', type: 'YouTube', duration: '3h 30min' },
      { name: 'Mock Interview Sessions', type: 'YouTube', duration: '1h 45min' }
    ]
  },
  {
    title: 'Practice Platforms',
    icon: Code,
    color: 'bg-orange-500',
    description: 'Online coding platforms and practice sites',
    items: [
      { name: 'LeetCode', type: 'Platform', problems: '2500+' },
      { name: 'HackerRank', type: 'Platform', problems: '1800+' },
      { name: 'CodeChef', type: 'Platform', problems: '3000+' },
      { name: 'Codeforces', type: 'Platform', problems: '5000+' },
      { name: 'InterviewBit', type: 'Platform', problems: '1200+' }
    ]
  }
];

export default function ResourcesPage() {
  const handleResourceClick = (item: any) => {
    // TODO: Implement resource navigation/download logic
    console.log('Resource clicked:', item.name);
  };

  const handleViewAll = (categoryTitle: string) => {
    // TODO: Implement view all navigation
    console.log('View all clicked for:', categoryTitle);
  };

  const handleJoinCommunity = () => {
    // TODO: Implement community join logic
    console.log('Join community clicked');
  };

  const handleRequestResources = () => {
    // TODO: Implement resource request logic
    console.log('Request resources clicked');
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/placement"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Placement Arena
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Resources</h1>
          <p className="text-gray-600 dark:text-gray-300">Curated learning materials and practice platforms</p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resourceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.title}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Category Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-3">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mr-4`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {category.items.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleResourceClick(item)}
                      className="w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span className="mr-3">{item.type}</span>
                            {item.size && <span>• {item.size}</span>}
                            {item.duration && <span>• {item.duration}</span>}
                            {item.problems && <span>• {item.problems} problems</span>}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* View All Button */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700">
                  <button 
                  onClick={() => handleViewAll(category.title)}
                  className="w-full text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                >
                    View All {category.title}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Resources Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Need More Resources?</h2>
            <p className="text-lg opacity-90 mb-6">
              Join our community to access exclusive content and get personalized recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleJoinCommunity()}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Join Community
              </button>
              <button 
                onClick={() => handleRequestResources()}
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Request Resources
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Study Plans</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Structured learning paths for different roles</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Practice Tests</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mock interviews and coding assessments</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Discussion Forum</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Connect with peers and mentors</p>
          </div>
        </div>
      </div>
    </div>
  );
}