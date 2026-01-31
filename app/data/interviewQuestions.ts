export interface InterviewQuestion {
  id: string;
  category: 'HR' | 'Technical' | 'Behavioral';
  question: string;
  tips: string[];
  sampleAnswer?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const interviewQuestions: InterviewQuestion[] = [
  // HR Questions
  {
    id: 'hr-001',
    category: 'HR',
    question: 'Tell me about yourself',
    difficulty: 'Easy',
    tips: [
      'Keep it professional and relevant to the role',
      'Follow the present-past-future format',
      'Highlight key achievements and skills',
      'Keep it concise (2-3 minutes max)'
    ],
    sampleAnswer: 'I am a software engineer with 2 years of experience in full-stack development. Currently, I work at XYZ company where I develop web applications using React and Node.js. In my previous role, I successfully led a team project that improved system performance by 30%. I am passionate about creating efficient solutions and am excited about the opportunity to contribute to your team\'s innovative projects.'
  },
  {
    id: 'hr-002',
    category: 'HR',
    question: 'Why do you want to work here?',
    difficulty: 'Medium',
    tips: [
      'Research the company thoroughly',
      'Mention specific company values or projects',
      'Connect your goals with company mission',
      'Show genuine enthusiasm'
    ]
  },
  {
    id: 'hr-003',
    category: 'HR',
    question: 'What are your strengths and weaknesses?',
    difficulty: 'Medium',
    tips: [
      'Choose strengths relevant to the job',
      'Provide specific examples',
      'For weaknesses, show how you\'re improving',
      'Be honest but strategic'
    ]
  },
  {
    id: 'hr-004',
    category: 'HR',
    question: 'Where do you see yourself in 5 years?',
    difficulty: 'Medium',
    tips: [
      'Show ambition but be realistic',
      'Align with company growth opportunities',
      'Focus on skill development',
      'Demonstrate commitment'
    ]
  },
  {
    id: 'hr-005',
    category: 'HR',
    question: 'Why are you leaving your current job?',
    difficulty: 'Hard',
    tips: [
      'Stay positive about previous employers',
      'Focus on growth opportunities',
      'Mention career advancement',
      'Avoid negative comments'
    ]
  },

  // Technical Questions
  {
    id: 'tech-001',
    category: 'Technical',
    question: 'Explain the difference between SQL and NoSQL databases',
    difficulty: 'Medium',
    tips: [
      'Discuss structure differences',
      'Mention scalability aspects',
      'Give use case examples',
      'Talk about ACID properties'
    ],
    sampleAnswer: 'SQL databases are relational with structured schemas, using tables with rows and columns. They follow ACID properties and are great for complex queries. NoSQL databases are non-relational, more flexible with schema, and better for horizontal scaling. SQL is ideal for financial systems, while NoSQL works well for social media or IoT applications.'
  },
  {
    id: 'tech-002',
    category: 'Technical',
    question: 'What is the difference between REST and GraphQL?',
    difficulty: 'Medium',
    tips: [
      'Explain data fetching differences',
      'Discuss over-fetching and under-fetching',
      'Mention single endpoint vs multiple endpoints',
      'Talk about caching strategies'
    ]
  },
  {
    id: 'tech-003',
    category: 'Technical',
    question: 'Explain Object-Oriented Programming principles',
    difficulty: 'Easy',
    tips: [
      'Cover all four pillars: Encapsulation, Inheritance, Polymorphism, Abstraction',
      'Provide real-world examples',
      'Explain benefits of each principle',
      'Mention how they improve code maintainability'
    ]
  },
  {
    id: 'tech-004',
    category: 'Technical',
    question: 'How does garbage collection work?',
    difficulty: 'Hard',
    tips: [
      'Explain memory management',
      'Discuss different GC algorithms',
      'Mention generational collection',
      'Talk about performance implications'
    ]
  },
  {
    id: 'tech-005',
    category: 'Technical',
    question: 'What is the difference between synchronous and asynchronous programming?',
    difficulty: 'Medium',
    tips: [
      'Explain blocking vs non-blocking operations',
      'Discuss callbacks, promises, and async/await',
      'Mention use cases for each approach',
      'Talk about performance implications'
    ]
  },

  // Behavioral Questions
  {
    id: 'behavioral-001',
    category: 'Behavioral',
    question: 'Describe a challenging project you worked on',
    difficulty: 'Medium',
    tips: [
      'Use the STAR method (Situation, Task, Action, Result)',
      'Choose a relevant technical challenge',
      'Highlight problem-solving skills',
      'Quantify the impact if possible'
    ],
    sampleAnswer: 'In my previous role, I was tasked with optimizing a slow-performing API that was causing user complaints. The system was taking 5+ seconds to respond. I analyzed the code, identified N+1 query problems, implemented database indexing, and added caching. The result was a 80% improvement in response time, reducing it to under 1 second, which significantly improved user satisfaction.'
  },
  {
    id: 'behavioral-002',
    category: 'Behavioral',
    question: 'Tell me about a time you had to work with a difficult team member',
    difficulty: 'Hard',
    tips: [
      'Focus on conflict resolution',
      'Show empathy and understanding',
      'Highlight communication skills',
      'Demonstrate professional maturity'
    ]
  },
  {
    id: 'behavioral-003',
    category: 'Behavioral',
    question: 'Describe a time when you had to learn a new technology quickly',
    difficulty: 'Medium',
    tips: [
      'Show adaptability and learning agility',
      'Mention specific learning strategies',
      'Highlight successful implementation',
      'Discuss how you stayed updated'
    ]
  },
  {
    id: 'behavioral-004',
    category: 'Behavioral',
    question: 'Tell me about a time you failed and how you handled it',
    difficulty: 'Hard',
    tips: [
      'Choose a real failure with learning outcomes',
      'Show accountability and ownership',
      'Highlight lessons learned',
      'Demonstrate growth mindset'
    ]
  },
  {
    id: 'behavioral-005',
    category: 'Behavioral',
    question: 'Describe a time when you had to meet a tight deadline',
    difficulty: 'Medium',
    tips: [
      'Show time management skills',
      'Highlight prioritization abilities',
      'Mention collaboration if applicable',
      'Discuss successful delivery'
    ]
  }
];

export const interviewCategories = ['All', 'HR', 'Technical', 'Behavioral'] as const;