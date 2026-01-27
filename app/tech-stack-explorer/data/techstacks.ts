export interface TechStack {
  id: string;
  name: string;
  acronym: string;
  description: string;
  technologies: string[];
  pros: string[];
  cons: string[];
  learningDifficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  jobMarketDemand: number; // 1-10
  communitySize: 'Small' | 'Medium' | 'Large' | 'Very Large';
  communityLinks: {
    forum: string;
    github: string;
    discord?: string;
  };
  realWorldProjects: {
    name: string;
    description: string;
    link: string;
  }[];
  estimatedSalary: {
    junior: string;
    mid: string;
    senior: string;
  };
  bestFor: string[];
  notBestFor: string[];
  setupComplexity: 'Simple' | 'Medium' | 'Complex';
  scalability: 'Limited' | 'Good' | 'Excellent';
}

export const techStacks: TechStack[] = [
  {
    id: 'mern',
    name: 'MERN Stack',
    acronym: 'MERN',
    description: 'MongoDB, Express, React, Node.js - A JavaScript-based full-stack solution',
    technologies: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript'],
    pros: [
      'Single language (JavaScript) across the stack',
      'Large, active community with extensive resources',
      'Excellent developer tools and libraries',
      'JSON-based databases seamlessly integrate',
      'Great for rapid development',
      'Strong job market demand',
    ],
    cons: [
      'Can be slow for CPU-intensive operations',
      'Requires careful memory management in Node.js',
      'Not ideal for real-time systems without additional tools',
      'Learning curve for beginners',
      'Callback complexity without async/await mastery',
    ],
    learningDifficulty: 'Medium',
    jobMarketDemand: 9,
    communitySize: 'Very Large',
    communityLinks: {
      forum: 'https://stackoverflow.com/questions/tagged/mern',
      github: 'https://github.com/MERN',
      discord: 'https://discord.gg/mern',
    },
    realWorldProjects: [
      {
        name: 'Uber',
        description: 'Uses Node.js and React for its web platform',
        link: 'https://www.uber.com',
      },
      {
        name: 'Netflix',
        description: 'Uses Node.js for backend services',
        link: 'https://www.netflix.com',
      },
      {
        name: 'Airbnb',
        description: 'Leverages Node.js and React',
        link: 'https://www.airbnb.com',
      },
      {
        name: 'Dropbox',
        description: 'Uses React for web interface',
        link: 'https://www.dropbox.com',
      },
    ],
    estimatedSalary: {
      junior: '$70,000 - $90,000',
      mid: '$100,000 - $130,000',
      senior: '$140,000 - $180,000+',
    },
    bestFor: [
      'Web applications',
      'Single Page Applications (SPAs)',
      'Real-time applications with WebSockets',
      'API-driven development',
      'Rapid prototyping',
    ],
    notBestFor: [
      'CPU-intensive computations',
      'Desktop applications',
      'System-level programming',
      'Embedded systems',
    ],
    setupComplexity: 'Medium',
    scalability: 'Excellent',
  },
  {
    id: 'mean',
    name: 'MEAN Stack',
    acronym: 'MEAN',
    description: 'MongoDB, Express, Angular, Node.js - Enterprise-focused JavaScript stack',
    technologies: ['MongoDB', 'Express.js', 'Angular', 'Node.js', 'TypeScript'],
    pros: [
      'TypeScript support for better code organization',
      'Excellent for large enterprise applications',
      'Comprehensive Angular framework',
      'Strong typing reduces bugs',
      'Full MVC pattern implementation',
      'Great documentation',
    ],
    cons: [
      'Steeper learning curve than MERN',
      'Angular is verbose and complex',
      'Slower development compared to React',
      'Heavier bundle sizes',
      'Smaller job market than MERN',
    ],
    learningDifficulty: 'Hard',
    jobMarketDemand: 6,
    communitySize: 'Large',
    communityLinks: {
      forum: 'https://stackoverflow.com/questions/tagged/mean-stack',
      github: 'https://github.com/angular/angular',
      discord: 'https://discord.gg/angular',
    },
    realWorldProjects: [
      {
        name: 'Google Cloud Console',
        description: 'Built with Angular',
        link: 'https://console.cloud.google.com',
      },
      {
        name: 'Microsoft Office 365',
        description: 'Uses modern web technologies',
        link: 'https://www.office.com',
      },
      {
        name: 'IBM Cloud',
        description: 'Uses Node.js and Angular',
        link: 'https://www.ibm.com/cloud',
      },
    ],
    estimatedSalary: {
      junior: '$75,000 - $95,000',
      mid: '$105,000 - $135,000',
      senior: '$145,000 - $185,000+',
    },
    bestFor: [
      'Enterprise applications',
      'Large-scale projects',
      'Type-safe development',
      'MVC pattern requirements',
    ],
    notBestFor: [
      'Simple projects',
      'Rapid prototyping',
      'Small teams',
    ],
    setupComplexity: 'Complex',
    scalability: 'Excellent',
  },
  {
    id: 'lamp',
    name: 'LAMP Stack',
    acronym: 'LAMP',
    description: 'Linux, Apache, MySQL, PHP - The classic web stack',
    technologies: ['Linux', 'Apache', 'MySQL', 'PHP'],
    pros: [
      'Well-established and stable',
      'Low barrier to entry',
      'Excellent shared hosting support',
      'Large legacy ecosystem',
      'Simple deployment',
      'Cost-effective',
    ],
    cons: [
      'Outdated paradigms',
      'Monolithic architecture',
      'Poor performance compared to modern stacks',
      'Limited scalability',
      'Declining job market',
      'Not suitable for modern applications',
    ],
    learningDifficulty: 'Easy',
    jobMarketDemand: 3,
    communitySize: 'Large',
    communityLinks: {
      forum: 'https://stackoverflow.com/questions/tagged/lamp',
      github: 'https://github.com/php/php-src',
    },
    realWorldProjects: [
      {
        name: 'WordPress',
        description: 'The most popular LAMP-based platform',
        link: 'https://wordpress.com',
      },
      {
        name: 'Drupal',
        description: 'Content management system',
        link: 'https://www.drupal.org',
      },
      {
        name: 'Magento',
        description: 'E-commerce platform',
        link: 'https://magento.com',
      },
    ],
    estimatedSalary: {
      junior: '$50,000 - $65,000',
      mid: '$70,000 - $90,000',
      senior: '$95,000 - $120,000',
    },
    bestFor: [
      'Content management systems',
      'Traditional websites',
      'Shared hosting environments',
      'Learning web basics',
    ],
    notBestFor: [
      'Modern single-page applications',
      'Real-time applications',
      'Highly scalable systems',
      'Microservices architecture',
    ],
    setupComplexity: 'Simple',
    scalability: 'Limited',
  },
  {
    id: 'jamstack',
    name: 'JAMstack',
    acronym: 'JAMstack',
    description: 'JavaScript, APIs, Markup - A modern approach to building fast web applications',
    technologies: ['JavaScript', 'APIs', 'Markup', 'Static Site Generator', 'CDN'],
    pros: [
      'Exceptional performance',
      'Better security (no servers)',
      'Easy scalability via CDN',
      'Simple deployment',
      'Low hosting costs',
      'Great for SEO',
    ],
    cons: [
      'Limited for dynamic content',
      'Build times can be slow',
      'Not ideal for real-time features',
      'Complex for heavily dynamic applications',
      'Requires API infrastructure',
    ],
    learningDifficulty: 'Medium',
    jobMarketDemand: 7,
    communitySize: 'Large',
    communityLinks: {
      forum: 'https://stackoverflow.com/questions/tagged/jamstack',
      github: 'https://github.com/topics/jamstack',
      discord: 'https://discord.gg/jamstack',
    },
    realWorldProjects: [
      {
        name: 'Netlify',
        description: 'JAMstack platform and CDN',
        link: 'https://www.netlify.com',
      },
      {
        name: 'Gatsby Cloud',
        description: 'Gatsby hosting and CMS',
        link: 'https://www.gatsbyjs.com',
      },
      {
        name: 'Vercel',
        description: 'Next.js hosting platform',
        link: 'https://vercel.com',
      },
      {
        name: 'Stripe',
        description: 'Uses modern frontend architecture',
        link: 'https://stripe.com',
      },
    ],
    estimatedSalary: {
      junior: '$75,000 - $95,000',
      mid: '$105,000 - $135,000',
      senior: '$140,000 - $180,000+',
    },
    bestFor: [
      'Static sites and blogs',
      'Marketing websites',
      'Documentation sites',
      'E-commerce platforms',
      'High-performance applications',
    ],
    notBestFor: [
      'Real-time collaborative apps',
      'Heavily dynamic content',
      'Complex backend logic',
    ],
    setupComplexity: 'Medium',
    scalability: 'Excellent',
  },
  {
    id: 'next',
    name: 'Next.js Stack',
    acronym: 'Next.js',
    description: 'React meta-framework with built-in optimization for production applications',
    technologies: ['React', 'Next.js', 'Node.js', 'Vercel', 'TypeScript'],
    pros: [
      'Built-in optimization and performance features',
      'Server-side rendering out of the box',
      'Excellent developer experience',
      'Seamless deployment with Vercel',
      'Static generation and incremental static regeneration',
      'Strong community support',
    ],
    cons: [
      'Vendor lock-in with Vercel',
      'Learning curve for advanced features',
      'Requires Node.js server (can add complexity)',
      'Initial setup more complex than static sites',
    ],
    learningDifficulty: 'Medium',
    jobMarketDemand: 8,
    communitySize: 'Very Large',
    communityLinks: {
      forum: 'https://github.com/vercel/next.js/discussions',
      github: 'https://github.com/vercel/next.js',
      discord: 'https://discord.gg/bUG7V5H',
    },
    realWorldProjects: [
      {
        name: 'TikTok',
        description: 'Uses Next.js for web platform',
        link: 'https://www.tiktok.com',
      },
      {
        name: 'Hulu',
        description: 'Modern web streaming platform',
        link: 'https://www.hulu.com',
      },
      {
        name: 'Twitch',
        description: 'Uses React and modern frameworks',
        link: 'https://www.twitch.tv',
      },
      {
        name: 'GitHub',
        description: 'Uses modern frontend technologies',
        link: 'https://github.com',
      },
    ],
    estimatedSalary: {
      junior: '$80,000 - $100,000',
      mid: '$110,000 - $140,000',
      senior: '$150,000 - $200,000+',
    },
    bestFor: [
      'Full-stack applications',
      'E-commerce sites',
      'High-performance web apps',
      'SEO-critical projects',
      'Production applications',
    ],
    notBestFor: [
      'Static blogs (unless needed)',
      'Desktop applications',
    ],
    setupComplexity: 'Medium',
    scalability: 'Excellent',
  },
  {
    id: 'django',
    name: 'Django Stack',
    acronym: 'Django',
    description: 'Python Django framework with React/Vue for comprehensive full-stack development',
    technologies: ['Python', 'Django', 'PostgreSQL', 'React/Vue.js', 'REST API'],
    pros: [
      'Batteries-included framework',
      'Excellent ORM (Object-Relational Mapping)',
      'Strong admin panel out of the box',
      'Great documentation and community',
      'Rapid development',
      'Excellent for data-driven applications',
    ],
    cons: [
      'Monolithic architecture',
      'Slower than compiled languages',
      'Less suitable for real-time applications',
      'Can be over-engineered for simple projects',
      'Memory footprint can be large',
    ],
    learningDifficulty: 'Medium',
    jobMarketDemand: 7,
    communitySize: 'Large',
    communityLinks: {
      forum: 'https://stackoverflow.com/questions/tagged/django',
      github: 'https://github.com/django/django',
      discord: 'https://discord.gg/django',
    },
    realWorldProjects: [
      {
        name: 'Instagram',
        description: 'Built with Django',
        link: 'https://www.instagram.com',
      },
      {
        name: 'Spotify',
        description: 'Uses Python for backend services',
        link: 'https://www.spotify.com',
      },
      {
        name: 'Pinterest',
        description: 'Uses Python and Django',
        link: 'https://www.pinterest.com',
      },
      {
        name: 'Disqus',
        description: 'Comment system built with Django',
        link: 'https://disqus.com',
      },
    ],
    estimatedSalary: {
      junior: '$75,000 - $95,000',
      mid: '$105,000 - $135,000',
      senior: '$145,000 - $185,000+',
    },
    bestFor: [
      'Data-intensive applications',
      'Content management systems',
      'Rapid development',
      'Prototyping',
      'Backend APIs',
    ],
    notBestFor: [
      'Real-time applications',
      'Lightweight APIs',
      'Desktop applications',
    ],
    setupComplexity: 'Medium',
    scalability: 'Good',
  },
  {
    id: 'spring',
    name: 'Spring Boot Stack',
    acronym: 'Spring Boot',
    description: 'Java Spring framework with React for enterprise-grade applications',
    technologies: ['Java', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL/MySQL', 'React'],
    pros: [
      'Enterprise-ready and stable',
      'Comprehensive ecosystem',
      'Excellent scalability',
      'Strong typing with Java',
      'High performance',
      'Large corporate backing',
    ],
    cons: [
      'Verbose boilerplate code',
      'Steep learning curve',
      'Slower development compared to scripted languages',
      'JVM startup time',
      'Resource-intensive',
    ],
    learningDifficulty: 'Hard',
    jobMarketDemand: 8,
    communitySize: 'Very Large',
    communityLinks: {
      forum: 'https://stackoverflow.com/questions/tagged/spring-boot',
      github: 'https://github.com/spring-projects/spring-boot',
      discord: 'https://discord.gg/spring',
    },
    realWorldProjects: [
      {
        name: 'LinkedIn',
        description: 'Built on Java and Spring',
        link: 'https://www.linkedin.com',
      },
      {
        name: 'Twitter',
        description: 'Uses Java backend',
        link: 'https://twitter.com',
      },
      {
        name: 'Uber',
        description: 'Uses Java for backend services',
        link: 'https://www.uber.com',
      },
      {
        name: 'Airbnb',
        description: 'Microservices with Java/Spring',
        link: 'https://www.airbnb.com',
      },
    ],
    estimatedSalary: {
      junior: '$85,000 - $105,000',
      mid: '$120,000 - $150,000',
      senior: '$160,000 - $210,000+',
    },
    bestFor: [
      'Enterprise applications',
      'Microservices',
      'High-scale systems',
      'Financial applications',
      'Complex business logic',
    ],
    notBestFor: [
      'Rapid prototyping',
      'Small projects',
      'Real-time applications',
    ],
    setupComplexity: 'Complex',
    scalability: 'Excellent',
  },
  {
    id: 'dotnet',
    name: '.NET Stack',
    acronym: '.NET',
    description: 'Microsoft .NET framework with C# for cross-platform applications',
    technologies: ['C#', '.NET Core', 'ASP.NET Core', 'SQL Server/PostgreSQL', 'React/Angular'],
    pros: [
      'Excellent performance',
      'Strong typing with C#',
      'Comprehensive Microsoft ecosystem',
      'Great tooling with Visual Studio',
      'Cross-platform with .NET Core',
      'Enterprise support',
    ],
    cons: [
      'Historically Windows-only',
      'Steeper learning curve',
      'Licensing costs for enterprise',
      'Less trendy than JavaScript stacks',
      'Smaller startup ecosystem',
    ],
    learningDifficulty: 'Hard',
    jobMarketDemand: 7,
    communitySize: 'Large',
    communityLinks: {
      forum: 'https://stackoverflow.com/questions/tagged/asp.net-core',
      github: 'https://github.com/dotnet/core',
      discord: 'https://discord.gg/dotnet',
    },
    realWorldProjects: [
      {
        name: 'Stack Overflow',
        description: 'Built with .NET',
        link: 'https://stackoverflow.com',
      },
      {
        name: 'GoPro',
        description: 'Uses .NET technology',
        link: 'https://gopro.com',
      },
      {
        name: 'Microsoft Teams',
        description: 'Built with .NET',
        link: 'https://www.microsoft.com/teams',
      },
    ],
    estimatedSalary: {
      junior: '$80,000 - $100,000',
      mid: '$115,000 - $145,000',
      senior: '$155,000 - $200,000+',
    },
    bestFor: [
      'Enterprise applications',
      'Windows ecosystem integration',
      'Real-time applications (SignalR)',
      'Cloud applications (Azure)',
      'Game development',
    ],
    notBestFor: [
      'Startups with Linux-only infrastructure',
      'Mobile-first applications',
      'Serverless architectures',
    ],
    setupComplexity: 'Complex',
    scalability: 'Excellent',
  },
  {
    id: 'serverless',
    name: 'Serverless Stack',
    acronym: 'Serverless',
    description: 'Function-as-a-Service with cloud services like AWS Lambda, Firebase, or Vercel',
    technologies: ['AWS Lambda', 'Firebase', 'API Gateway', 'DynamoDB', 'React/Vue'],
    pros: [
      'No server maintenance',
      'Auto-scaling built-in',
      'Pay-as-you-go pricing',
      'Fast deployments',
      'Less operational overhead',
      'Great for event-driven architectures',
    ],
    cons: [
      'Cold start latency',
      'Complex debugging',
      'Vendor lock-in',
      'Not suitable for long-running tasks',
      'Difficult for traditional databases',
      'Steep learning curve for DevOps',
    ],
    learningDifficulty: 'Hard',
    jobMarketDemand: 7,
    communitySize: 'Medium',
    communityLinks: {
      forum: 'https://stackoverflow.com/questions/tagged/aws-lambda',
      github: 'https://github.com/serverless/serverless',
      discord: 'https://discord.gg/serverless',
    },
    realWorldProjects: [
      {
        name: 'Amazon',
        description: 'Uses Lambda for various microservices',
        link: 'https://www.amazon.com',
      },
      {
        name: 'Netflix',
        description: 'Uses serverless for certain workloads',
        link: 'https://www.netflix.com',
      },
      {
        name: 'Coca-Cola',
        description: 'Uses AWS serverless',
        link: 'https://www.coca-cola.com',
      },
    ],
    estimatedSalary: {
      junior: '$85,000 - $110,000',
      mid: '$120,000 - $155,000',
      senior: '$165,000 - $220,000+',
    },
    bestFor: [
      'Event-driven applications',
      'APIs and microservices',
      'Scheduled tasks',
      'Data processing pipelines',
      'IoT applications',
    ],
    notBestFor: [
      'Long-running processes',
      'Real-time applications',
      'Complex state management',
      'GPU-intensive workloads',
    ],
    setupComplexity: 'Complex',
    scalability: 'Excellent',
  },
];

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Hard':
      return 'bg-orange-100 text-orange-800 border-orange-300';
    case 'Very Hard':
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getDemandColor = (demand: number) => {
  if (demand >= 8) return 'text-green-600';
  if (demand >= 6) return 'text-yellow-600';
  if (demand >= 4) return 'text-orange-600';
  return 'text-red-600';
};

export const getCommunitySizeIcon = (size: string) => {
  switch (size) {
    case 'Very Large':
      return '★★★★★';
    case 'Large':
      return '★★★★☆';
    case 'Medium':
      return '★★★☆☆';
    case 'Small':
      return '★★☆☆☆';
    default:
      return '★☆☆☆☆';
  }
};
