export interface Milestone {
  week: number;
  title: string;
  description: string;
  tasks: string[];
  resources: string[];
  estimatedHours: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  goal: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedWeeks: number;
  totalHours: number;
  skillsGained: string[];
  prerequisites: string[];
  resources: {
    name: string;
    link: string;
    type: 'course' | 'documentation' | 'tutorial' | 'book' | 'project';
    estimatedHours: number;
  }[];
  milestones: Milestone[];
  projects: {
    name: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    estimatedHours: number;
  }[];
  communityRecommendations: {
    user: string;
    rating: number;
    comment: string;
    timeToComplete: number;
  }[];
  successRate: number; // percentage
  averageRating: number; // 1-5
}

export const learningPaths: LearningPath[] = [
  {
    id: 'web-dev-fullstack',
    title: 'Full Stack Web Developer',
    description: 'Master modern web development from frontend to backend',
    goal: 'Build production-ready web applications',
    category: 'Web Development',
    difficulty: 'Intermediate',
    estimatedWeeks: 24,
    totalHours: 240,
    skillsGained: ['React', 'Node.js', 'MongoDB', 'REST APIs', 'Authentication', 'Deployment'],
    prerequisites: ['HTML/CSS basics', 'JavaScript fundamentals'],
    resources: [
      {
        name: 'The Complete JavaScript Course 2024',
        link: 'https://www.udemy.com/course/the-complete-javascript-course-2024-from-zero-to-expert/',
        type: 'course',
        estimatedHours: 69,
      },
      {
        name: 'React - The Complete Guide',
        link: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
        type: 'course',
        estimatedHours: 48,
      },
      {
        name: 'Node.js - The Complete Guide',
        link: 'https://www.udemy.com/course/nodejs-the-complete-guide/',
        type: 'course',
        estimatedHours: 40,
      },
      {
        name: 'MDN Web Docs',
        link: 'https://developer.mozilla.org/',
        type: 'documentation',
        estimatedHours: 30,
      },
      {
        name: 'Full Stack Open',
        link: 'https://fullstackopen.com/',
        type: 'tutorial',
        estimatedHours: 30,
      },
    ],
    milestones: [
      {
        week: 1,
        title: 'JavaScript Fundamentals',
        description: 'Master core JavaScript concepts',
        tasks: [
          'Variables and data types',
          'Functions and scope',
          'Object-oriented programming',
          'Async/Promises',
        ],
        resources: ['The Complete JavaScript Course 2024'],
        estimatedHours: 15,
      },
      {
        week: 5,
        title: 'React Basics',
        description: 'Build interactive UIs with React',
        tasks: [
          'Components and JSX',
          'State and Props',
          'Hooks (useState, useEffect)',
          'Component composition',
        ],
        resources: ['React - The Complete Guide'],
        estimatedHours: 20,
      },
      {
        week: 10,
        title: 'Backend Development',
        description: 'Create robust server-side applications',
        tasks: [
          'Express server setup',
          'Routing and middleware',
          'Database basics',
          'RESTful APIs',
        ],
        resources: ['Node.js - The Complete Guide'],
        estimatedHours: 20,
      },
      {
        week: 16,
        title: 'Database & Authentication',
        description: 'Master data persistence and security',
        tasks: [
          'MongoDB/SQL fundamentals',
          'Schema design',
          'User authentication',
          'Security best practices',
        ],
        resources: ['Full Stack Open'],
        estimatedHours: 18,
      },
      {
        week: 20,
        title: 'Full Stack Integration',
        description: 'Connect frontend and backend',
        tasks: [
          'Frontend-backend communication',
          'API integration',
          'Error handling',
          'Testing',
        ],
        resources: ['MDN Web Docs', 'Full Stack Open'],
        estimatedHours: 16,
      },
      {
        week: 24,
        title: 'Deployment & Polish',
        description: 'Deploy to production',
        tasks: [
          'Deployment to Heroku/Vercel',
          'Performance optimization',
          'SEO optimization',
          'Final project completion',
        ],
        resources: ['Full Stack Open'],
        estimatedHours: 12,
      },
    ],
    projects: [
      {
        name: 'Todo Application',
        description: 'Build a MERN todo app with authentication',
        difficulty: 'Easy',
        estimatedHours: 12,
      },
      {
        name: 'Blog Platform',
        description: 'Create a multi-user blogging platform',
        difficulty: 'Medium',
        estimatedHours: 24,
      },
      {
        name: 'E-commerce Store',
        description: 'Build a complete e-commerce platform',
        difficulty: 'Hard',
        estimatedHours: 40,
      },
    ],
    communityRecommendations: [
      {
        user: 'John Developer',
        rating: 5,
        comment:
          'This path helped me transition from frontend to full stack. Highly recommended!',
        timeToComplete: 20,
      },
      {
        user: 'Sarah Coder',
        rating: 5,
        comment: 'Well-structured milestones and great projects to build. Very practical.',
        timeToComplete: 24,
      },
      {
        user: 'Mike Learning',
        rating: 4,
        comment: 'Great content but requires solid JavaScript fundamentals to start.',
        timeToComplete: 28,
      },
    ],
    successRate: 78,
    averageRating: 4.7,
  },
  {
    id: 'python-data-science',
    title: 'Python Data Science',
    description: 'Learn data analysis, visualization, and machine learning',
    goal: 'Become proficient in data science with Python',
    category: 'Data Science',
    difficulty: 'Intermediate',
    estimatedWeeks: 20,
    totalHours: 200,
    skillsGained: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Statistics'],
    prerequisites: ['Python basics', 'Math fundamentals'],
    resources: [
      {
        name: 'Python for Data Analysis',
        link: 'https://www.oreilly.com/library/view/python-for-data-analysis/',
        type: 'book',
        estimatedHours: 35,
      },
      {
        name: 'Complete Machine Learning Course',
        link: 'https://www.udemy.com/course/complete-machine-learning-and-data-science-zero-to-mastery/',
        type: 'course',
        estimatedHours: 50,
      },
      {
        name: 'Statistics for Data Science',
        link: 'https://www.coursera.org/learn/statistics-data-science',
        type: 'course',
        estimatedHours: 40,
      },
      {
        name: 'Kaggle Learn',
        link: 'https://www.kaggle.com/learn',
        type: 'tutorial',
        estimatedHours: 30,
      },
    ],
    milestones: [
      {
        week: 1,
        title: 'Python Essentials',
        description: 'Refresh Python skills for data science',
        tasks: [
          'Data types and structures',
          'Functions and libraries',
          'File I/O',
          'OOP basics',
        ],
        resources: ['Python for Data Analysis'],
        estimatedHours: 12,
      },
      {
        week: 5,
        title: 'Data Manipulation',
        description: 'Master Pandas and NumPy',
        tasks: [
          'DataFrames and Series',
          'Data cleaning',
          'Aggregation and grouping',
          'Merging datasets',
        ],
        resources: ['Python for Data Analysis'],
        estimatedHours: 16,
      },
      {
        week: 10,
        title: 'Data Visualization',
        description: 'Create compelling visualizations',
        tasks: ['Matplotlib basics', 'Seaborn plots', 'Interactive visualizations', 'Dashboards'],
        resources: ['Kaggle Learn'],
        estimatedHours: 12,
      },
      {
        week: 15,
        title: 'Statistics & Probability',
        description: 'Understand statistical foundations',
        tasks: [
          'Descriptive statistics',
          'Probability distributions',
          'Hypothesis testing',
          'Correlation analysis',
        ],
        resources: ['Statistics for Data Science'],
        estimatedHours: 18,
      },
      {
        week: 20,
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to ML algorithms',
        tasks: [
          'Supervised learning',
          'Unsupervised learning',
          'Model evaluation',
          'Feature engineering',
        ],
        resources: ['Complete Machine Learning Course'],
        estimatedHours: 20,
      },
    ],
    projects: [
      {
        name: 'Exploratory Data Analysis',
        description: 'Analyze and visualize a real dataset',
        difficulty: 'Easy',
        estimatedHours: 8,
      },
      {
        name: 'Predictive Modeling',
        description: 'Build and train a machine learning model',
        difficulty: 'Medium',
        estimatedHours: 20,
      },
      {
        name: 'End-to-End Data Science Project',
        description: 'Complete project from data collection to deployment',
        difficulty: 'Hard',
        estimatedHours: 32,
      },
    ],
    communityRecommendations: [
      {
        user: 'Data Dan',
        rating: 5,
        comment: 'Comprehensive path with practical projects. Really solid!',
        timeToComplete: 18,
      },
      {
        user: 'Analytics Amy',
        rating: 5,
        comment: 'Great balance of theory and practice. Perfect for career switchers.',
        timeToComplete: 22,
      },
    ],
    successRate: 72,
    averageRating: 4.6,
  },
  {
    id: 'mobile-ios-dev',
    title: 'iOS App Development',
    description: 'Build native iOS applications with Swift and SwiftUI',
    goal: 'Create production-ready iOS applications',
    category: 'Mobile Development',
    difficulty: 'Intermediate',
    estimatedWeeks: 18,
    totalHours: 180,
    skillsGained: ['Swift', 'SwiftUI', 'Core Data', 'APIs', 'Testing', 'App Store Publishing'],
    prerequisites: ['Programming fundamentals', 'Object-oriented concepts'],
    resources: [
      {
        name: 'SwiftUI Essentials',
        link: 'https://developer.apple.com/tutorials/swiftui',
        type: 'documentation',
        estimatedHours: 30,
      },
      {
        name: 'The Complete iOS App Development Course',
        link: 'https://www.udemy.com/course/complete-ios-app-development-bootcamp/',
        type: 'course',
        estimatedHours: 60,
      },
      {
        name: 'Swift Programming Language Guide',
        link: 'https://docs.swift.org/swift-book',
        type: 'documentation',
        estimatedHours: 25,
      },
      {
        name: 'iOS App Development with Swift',
        link: 'https://www.coursera.org/specializations/app-development',
        type: 'course',
        estimatedHours: 45,
      },
    ],
    milestones: [
      {
        week: 1,
        title: 'Swift Fundamentals',
        description: 'Learn Swift programming language',
        tasks: ['Variables and types', 'Control flow', 'Functions', 'Collections'],
        resources: ['Swift Programming Language Guide'],
        estimatedHours: 14,
      },
      {
        week: 5,
        title: 'SwiftUI Basics',
        description: 'Master SwiftUI for UI development',
        tasks: [
          'Views and modifiers',
          'State and binding',
          'Navigation',
          'Form handling',
        ],
        resources: ['SwiftUI Essentials'],
        estimatedHours: 16,
      },
      {
        week: 10,
        title: 'Data Management',
        description: 'Work with Core Data and APIs',
        tasks: [
          'Core Data basics',
          'CRUD operations',
          'API integration',
          'JSON parsing',
        ],
        resources: ['The Complete iOS App Development Course'],
        estimatedHours: 18,
      },
      {
        week: 15,
        title: 'Advanced Features',
        description: 'Implement advanced iOS capabilities',
        tasks: [
          'Location services',
          'Notifications',
          'Background tasks',
          'Testing',
        ],
        resources: ['iOS App Development with Swift'],
        estimatedHours: 16,
      },
      {
        week: 18,
        title: 'App Store Deployment',
        description: 'Publish your app to the App Store',
        tasks: [
          'App signing and provisioning',
          'Publishing process',
          'App Store optimization',
          'Marketing strategies',
        ],
        resources: ['SwiftUI Essentials'],
        estimatedHours: 12,
      },
    ],
    projects: [
      {
        name: 'Weather App',
        description: 'Fetch and display weather data',
        difficulty: 'Easy',
        estimatedHours: 10,
      },
      {
        name: 'Social Media App',
        description: 'Build a feature-rich social app',
        difficulty: 'Medium',
        estimatedHours: 28,
      },
      {
        name: 'E-commerce App',
        description: 'Create a full e-commerce iOS app',
        difficulty: 'Hard',
        estimatedHours: 36,
      },
    ],
    communityRecommendations: [
      {
        user: 'iOS Ivan',
        rating: 5,
        comment: 'Best iOS learning path I found. SwiftUI focus is great!',
        timeToComplete: 16,
      },
      {
        user: 'App Developer Alice',
        rating: 4,
        comment: 'Good content but needs more advanced topics coverage.',
        timeToComplete: 20,
      },
    ],
    successRate: 68,
    averageRating: 4.5,
  },
  {
    id: 'devops-cloud',
    title: 'DevOps & Cloud Engineering',
    description: 'Master DevOps practices, containerization, and cloud platforms',
    goal: 'Become a DevOps professional',
    category: 'DevOps',
    difficulty: 'Advanced',
    estimatedWeeks: 20,
    totalHours: 220,
    skillsGained: ['Docker', 'Kubernetes', 'AWS/Azure', 'CI/CD', 'Infrastructure as Code', 'Monitoring'],
    prerequisites: ['Linux basics', 'Networking fundamentals', 'Development experience'],
    resources: [
      {
        name: 'Docker & Kubernetes Complete Guide',
        link: 'https://www.udemy.com/course/docker-kubernetes-the-complete-guide/',
        type: 'course',
        estimatedHours: 50,
      },
      {
        name: 'AWS Solutions Architect',
        link: 'https://aws.amazon.com/training/',
        type: 'course',
        estimatedHours: 60,
      },
      {
        name: 'Terraform Documentation',
        link: 'https://www.terraform.io/docs',
        type: 'documentation',
        estimatedHours: 20,
      },
      {
        name: 'CI/CD with GitLab/GitHub',
        link: 'https://docs.gitlab.com/ee/ci/',
        type: 'documentation',
        estimatedHours: 25,
      },
    ],
    milestones: [
      {
        week: 1,
        title: 'Linux & Networking',
        description: 'Foundation skills for DevOps',
        tasks: [
          'Linux command line',
          'Networking basics',
          'File systems',
          'User and permissions',
        ],
        resources: ['Docker & Kubernetes Complete Guide'],
        estimatedHours: 16,
      },
      {
        week: 5,
        title: 'Containerization',
        description: 'Master Docker',
        tasks: ['Docker basics', 'Images and containers', 'Docker Compose', 'Registry'],
        resources: ['Docker & Kubernetes Complete Guide'],
        estimatedHours: 18,
      },
      {
        week: 10,
        title: 'Orchestration',
        description: 'Learn Kubernetes',
        tasks: [
          'Kubernetes architecture',
          'Deployments and services',
          'ConfigMaps and secrets',
          'Scaling',
        ],
        resources: ['Docker & Kubernetes Complete Guide'],
        estimatedHours: 20,
      },
      {
        week: 15,
        title: 'Cloud Platforms',
        description: 'AWS/Azure fundamentals',
        tasks: ['Cloud services', 'EC2/VMs', 'Storage', 'Databases', 'Load balancing'],
        resources: ['AWS Solutions Architect'],
        estimatedHours: 22,
      },
      {
        week: 20,
        title: 'Infrastructure & CI/CD',
        description: 'Automation and infrastructure as code',
        tasks: [
          'Terraform basics',
          'CI/CD pipelines',
          'Monitoring and logging',
          'Disaster recovery',
        ],
        resources: ['Terraform Documentation', 'CI/CD with GitLab/GitHub'],
        estimatedHours: 20,
      },
    ],
    projects: [
      {
        name: 'Dockerize Application',
        description: 'Containerize a web application',
        difficulty: 'Easy',
        estimatedHours: 6,
      },
      {
        name: 'Kubernetes Deployment',
        description: 'Deploy app to Kubernetes cluster',
        difficulty: 'Medium',
        estimatedHours: 16,
      },
      {
        name: 'End-to-End DevOps Pipeline',
        description: 'Complete CI/CD pipeline with infrastructure',
        difficulty: 'Hard',
        estimatedHours: 28,
      },
    ],
    communityRecommendations: [
      {
        user: 'DevOps Dave',
        rating: 5,
        comment: 'Comprehensive DevOps path. Helped me land my first DevOps role!',
        timeToComplete: 18,
      },
    ],
    successRate: 65,
    averageRating: 4.4,
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles, tools, and user experience design',
    goal: 'Create beautiful and intuitive user interfaces',
    category: 'Design',
    difficulty: 'Beginner',
    estimatedWeeks: 12,
    totalHours: 120,
    skillsGained: ['Design principles', 'Figma', 'User research', 'Prototyping', 'Accessibility', 'Design systems'],
    prerequisites: ['Basic design sense', 'No coding required'],
    resources: [
      {
        name: 'Figma Design Tutorial',
        link: 'https://www.figma.com/resources/learn-design/',
        type: 'tutorial',
        estimatedHours: 20,
      },
      {
        name: 'Design of Everyday Things',
        link: 'https://www.oreilly.com/library/view/the-design-of/9780465072972/',
        type: 'book',
        estimatedHours: 15,
      },
      {
        name: 'UX Design Fundamentals',
        link: 'https://www.udemy.com/course/ux-design-fundamentals/',
        type: 'course',
        estimatedHours: 40,
      },
    ],
    milestones: [
      {
        week: 1,
        title: 'Design Principles',
        description: 'Learn fundamental design concepts',
        tasks: ['Color theory', 'Typography', 'Layout and grid', 'Visual hierarchy'],
        resources: ['Design of Everyday Things'],
        estimatedHours: 12,
      },
      {
        week: 4,
        title: 'Figma Mastery',
        description: 'Master Figma design tool',
        tasks: ['Interface basics', 'Components', 'Prototyping', 'Collaboration'],
        resources: ['Figma Design Tutorial'],
        estimatedHours: 16,
      },
      {
        week: 8,
        title: 'UX Research',
        description: 'Understand user research methods',
        tasks: [
          'User personas',
          'User interviews',
          'Usability testing',
          'Analytics',
        ],
        resources: ['UX Design Fundamentals'],
        estimatedHours: 14,
      },
      {
        week: 12,
        title: 'Design Systems & Accessibility',
        description: 'Build scalable design solutions',
        tasks: [
          'Design systems',
          'Accessibility standards',
          'Design for inclusion',
          'Portfolio',
        ],
        resources: ['Figma Design Tutorial'],
        estimatedHours: 12,
      },
    ],
    projects: [
      {
        name: 'Mobile App Redesign',
        description: 'Redesign an existing mobile app',
        difficulty: 'Easy',
        estimatedHours: 12,
      },
      {
        name: 'Website Design System',
        description: 'Create a complete design system',
        difficulty: 'Medium',
        estimatedHours: 20,
      },
    ],
    communityRecommendations: [
      {
        user: 'Designer Diana',
        rating: 5,
        comment: 'Perfect starting point for UX/UI. Great mix of theory and practice!',
        timeToComplete: 12,
      },
    ],
    successRate: 82,
    averageRating: 4.8,
  },
];

export const skillAssessmentQuestions = [
  {
    id: 'q1',
    category: 'frontend',
    difficulty: 1,
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlinks and Text Markup Language',
    ],
    correct: 0,
  },
  {
    id: 'q2',
    category: 'frontend',
    difficulty: 2,
    question: 'In React, what is the purpose of useState hook?',
    options: [
      'To manage component state',
      'To create static variables',
      'To replace Redux',
      'To handle HTTP requests',
    ],
    correct: 0,
  },
  {
    id: 'q3',
    category: 'backend',
    difficulty: 1,
    question: 'What is a REST API?',
    options: [
      'Representational State Transfer Application Programming Interface',
      'Remote Elementary System Transfer API',
      'Real-time Electronic Service Transfer API',
      'Responsive Elementary Structures Transfer API',
    ],
    correct: 0,
  },
  {
    id: 'q4',
    category: 'backend',
    difficulty: 2,
    question: 'Which of these is NOT a Node.js framework?',
    options: ['Express', 'Django', 'Fastify', 'Nest.js'],
    correct: 1,
  },
  {
    id: 'q5',
    category: 'database',
    difficulty: 2,
    question: 'What is ACID in database transactions?',
    options: [
      'Atomicity, Consistency, Isolation, Durability',
      'Availability, Consistency, Integration, Data',
      'Accurate, Consistent, Integrated, Durable',
      'None of the above',
    ],
    correct: 0,
  },
  {
    id: 'q6',
    category: 'devops',
    difficulty: 2,
    question: 'What does Docker container isolate?',
    options: [
      'Application and its dependencies',
      'Only database',
      'Only network',
      'Nothing',
    ],
    correct: 0,
  },
];

export const getRecommendedPath = (scores: Record<string, number>): LearningPath | null => {
  const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

  if (avgScore < 0.3) {
    return learningPaths[0]; // Full Stack (foundational)
  } else if (avgScore < 0.6) {
    return learningPaths[1]; // Data Science (intermediate)
  } else if (avgScore < 0.8) {
    return learningPaths[3]; // DevOps (advanced)
  } else {
    return learningPaths[4]; // Design (specialized)
  }
};
