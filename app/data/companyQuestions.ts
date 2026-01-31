export interface CompanyQuestion {
  id: string;
  company: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  role: string;
  type: 'Technical' | 'Behavioral' | 'System Design';
  topic?: string;
  description?: string;
}

export const companyQuestions: CompanyQuestion[] = [
  // Google
  {
    id: 'google-001',
    company: 'Google',
    question: 'Design a URL Shortener like bit.ly',
    difficulty: 'Hard',
    role: 'SDE',
    type: 'System Design',
    description: 'Design a scalable URL shortening service with custom aliases, analytics, and high availability.'
  },
  {
    id: 'google-002',
    company: 'Google',
    question: 'Implement LRU Cache',
    difficulty: 'Medium',
    role: 'SDE',
    type: 'Technical',
    topic: 'Data Structures',
    description: 'Design and implement a data structure for Least Recently Used (LRU) cache.'
  },
  {
    id: 'google-003',
    company: 'Google',
    question: 'Tell me about a time you disagreed with your manager',
    difficulty: 'Medium',
    role: 'SDE',
    type: 'Behavioral',
    description: 'Behavioral question to assess conflict resolution and communication skills.'
  },
  
  // Amazon
  {
    id: 'amazon-001',
    company: 'Amazon',
    question: 'Two Sum Problem',
    difficulty: 'Easy',
    role: 'SDE Intern',
    type: 'Technical',
    topic: 'Arrays',
    description: 'Given an array of integers, return indices of two numbers that add up to a target.'
  },
  {
    id: 'amazon-002',
    company: 'Amazon',
    question: 'Design Amazon\'s recommendation system',
    difficulty: 'Hard',
    role: 'SDE-2',
    type: 'System Design',
    description: 'Design a scalable recommendation system for e-commerce platform.'
  },
  {
    id: 'amazon-003',
    company: 'Amazon',
    question: 'Describe a time when you had to work with limited resources',
    difficulty: 'Medium',
    role: 'SDE',
    type: 'Behavioral',
    description: 'Leadership principle: Frugality - accomplish more with less.'
  },
  
  // Microsoft
  {
    id: 'microsoft-001',
    company: 'Microsoft',
    question: 'Reverse a Linked List',
    difficulty: 'Easy',
    role: 'SDE',
    type: 'Technical',
    topic: 'Linked Lists',
    description: 'Reverse a singly linked list iteratively and recursively.'
  },
  {
    id: 'microsoft-002',
    company: 'Microsoft',
    question: 'Design Microsoft Teams',
    difficulty: 'Hard',
    role: 'Senior SDE',
    type: 'System Design',
    description: 'Design a real-time communication platform with video, chat, and file sharing.'
  },
  
  // Meta (Facebook)
  {
    id: 'meta-001',
    company: 'Meta',
    question: 'Valid Parentheses',
    difficulty: 'Easy',
    role: 'SDE',
    type: 'Technical',
    topic: 'Stack',
    description: 'Check if a string of parentheses is valid using stack data structure.'
  },
  {
    id: 'meta-002',
    company: 'Meta',
    question: 'Design Facebook News Feed',
    difficulty: 'Hard',
    role: 'SDE-2',
    type: 'System Design',
    description: 'Design a scalable news feed system for social media platform.'
  },
  
  // Apple
  {
    id: 'apple-001',
    company: 'Apple',
    question: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    role: 'SDE',
    type: 'Technical',
    topic: 'Trees',
    description: 'Traverse a binary tree level by level using BFS.'
  },
  
  // Netflix
  {
    id: 'netflix-001',
    company: 'Netflix',
    question: 'Design Netflix Video Streaming',
    difficulty: 'Hard',
    role: 'Senior SDE',
    type: 'System Design',
    description: 'Design a global video streaming platform with CDN and recommendation system.'
  },
  
  // Indian Companies
  {
    id: 'tcs-001',
    company: 'TCS',
    question: 'Find the largest element in an array',
    difficulty: 'Easy',
    role: 'Analyst',
    type: 'Technical',
    topic: 'Arrays',
    description: 'Write a program to find the largest element in an array.'
  },
  {
    id: 'infosys-001',
    company: 'Infosys',
    question: 'Check if a string is palindrome',
    difficulty: 'Easy',
    role: 'Systems Engineer',
    type: 'Technical',
    topic: 'Strings',
    description: 'Check if a given string reads the same forwards and backwards.'
  },
  {
    id: 'wipro-001',
    company: 'Wipro',
    question: 'Fibonacci Series',
    difficulty: 'Easy',
    role: 'Project Engineer',
    type: 'Technical',
    topic: 'Dynamic Programming',
    description: 'Generate Fibonacci series up to n terms.'
  },
  {
    id: 'accenture-001',
    company: 'Accenture',
    question: 'Why do you want to work at Accenture?',
    difficulty: 'Easy',
    role: 'Associate Software Engineer',
    type: 'Behavioral',
    description: 'Common HR question about motivation and company fit.'
  }
];

export const companies = [
  'All',
  'Google',
  'Amazon', 
  'Microsoft',
  'Meta',
  'Apple',
  'Netflix',
  'TCS',
  'Infosys',
  'Wipro',
  'Accenture',
  'Cognizant',
  'HCL'
];

export const roles = [
  'All',
  'SDE',
  'SDE Intern',
  'SDE-2',
  'Senior SDE',
  'Analyst',
  'Systems Engineer',
  'Project Engineer',
  'Associate Software Engineer'
];

export const questionTypes = [
  'All',
  'Technical',
  'Behavioral', 
  'System Design'
] as const;