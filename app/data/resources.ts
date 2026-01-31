export interface Resource {
  id: string;
  title: string;
  type: 'Notes' | 'Cheat Sheet' | 'Guide' | 'External Link' | 'Video' | 'Book';
  category: string;
  description: string;
  url?: string;
  content?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime?: string;
  tags: string[];
}

export const resources: Resource[] = [
  // DSA Resources
  {
    id: 'dsa-001',
    title: 'Big O Notation Cheat Sheet',
    type: 'Cheat Sheet',
    category: 'DSA Fundamentals',
    description: 'Quick reference for time and space complexity analysis',
    difficulty: 'Beginner',
    estimatedTime: '15 min',
    tags: ['algorithms', 'complexity', 'fundamentals'],
    content: `
# Big O Notation Cheat Sheet

## Common Time Complexities (Best to Worst):
- O(1) - Constant
- O(log n) - Logarithmic  
- O(n) - Linear
- O(n log n) - Linearithmic
- O(n²) - Quadratic
- O(2^n) - Exponential
- O(n!) - Factorial

## Data Structure Operations:
- Array Access: O(1)
- Array Search: O(n)
- Array Insertion: O(n)
- Array Deletion: O(n)

- Hash Table Access: O(1)
- Hash Table Search: O(1)
- Hash Table Insertion: O(1)
- Hash Table Deletion: O(1)
    `
  },
  {
    id: 'dsa-002',
    title: 'Array Algorithms Guide',
    type: 'Guide',
    category: 'Arrays',
    description: 'Comprehensive guide to array manipulation techniques',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    tags: ['arrays', 'algorithms', 'two-pointers', 'sliding-window']
  },
  {
    id: 'dsa-003',
    title: 'LeetCode Patterns',
    type: 'External Link',
    category: 'Problem Solving',
    description: 'Common patterns for solving coding interview problems',
    url: 'https://leetcode.com/discuss/general-discussion/458695/dynamic-programming-patterns',
    difficulty: 'Advanced',
    estimatedTime: '2 hours',
    tags: ['patterns', 'dynamic-programming', 'leetcode']
  },

  // System Design Resources
  {
    id: 'sd-001',
    title: 'System Design Primer',
    type: 'External Link',
    category: 'System Design',
    description: 'Learn how to design large-scale systems',
    url: 'https://github.com/donnemartin/system-design-primer',
    difficulty: 'Advanced',
    estimatedTime: '10 hours',
    tags: ['system-design', 'scalability', 'architecture']
  },
  {
    id: 'sd-002',
    title: 'Database Design Fundamentals',
    type: 'Notes',
    category: 'Databases',
    description: 'Key concepts in database design and normalization',
    difficulty: 'Intermediate',
    estimatedTime: '1 hour',
    tags: ['databases', 'sql', 'normalization'],
    content: `
# Database Design Fundamentals

## Normalization Forms:
1. **1NF**: Eliminate duplicate columns, create separate tables for related data
2. **2NF**: Meet 1NF + remove partial dependencies
3. **3NF**: Meet 2NF + remove transitive dependencies

## ACID Properties:
- **Atomicity**: All or nothing
- **Consistency**: Valid state transitions
- **Isolation**: Concurrent execution isolation
- **Durability**: Committed changes persist
    `
  },

  // Programming Languages
  {
    id: 'lang-001',
    title: 'JavaScript ES6+ Features',
    type: 'Cheat Sheet',
    category: 'JavaScript',
    description: 'Modern JavaScript features every developer should know',
    difficulty: 'Intermediate',
    estimatedTime: '30 min',
    tags: ['javascript', 'es6', 'modern-js'],
    content: `
# JavaScript ES6+ Features

## Arrow Functions:
\`\`\`javascript
const add = (a, b) => a + b;
\`\`\`

## Destructuring:
\`\`\`javascript
const {name, age} = person;
const [first, second] = array;
\`\`\`

## Template Literals:
\`\`\`javascript
const message = \`Hello \${name}!\`;
\`\`\`

## Promises & Async/Await:
\`\`\`javascript
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}
\`\`\`
    `
  },
  {
    id: 'lang-002',
    title: 'Python for Coding Interviews',
    type: 'Guide',
    category: 'Python',
    description: 'Essential Python concepts and libraries for interviews',
    difficulty: 'Beginner',
    estimatedTime: '1 hour',
    tags: ['python', 'interviews', 'data-structures']
  },

  // Web Development
  {
    id: 'web-001',
    title: 'React Hooks Cheat Sheet',
    type: 'Cheat Sheet',
    category: 'React',
    description: 'Quick reference for React Hooks',
    difficulty: 'Intermediate',
    estimatedTime: '20 min',
    tags: ['react', 'hooks', 'frontend'],
    content: `
# React Hooks Cheat Sheet

## useState:
\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

## useEffect:
\`\`\`javascript
useEffect(() => {
  // Effect logic
  return () => {
    // Cleanup
  };
}, [dependencies]);
\`\`\`

## useContext:
\`\`\`javascript
const value = useContext(MyContext);
\`\`\`

## Custom Hooks:
\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(count + 1);
  return { count, increment };
}
\`\`\`
    `
  },
  {
    id: 'web-002',
    title: 'REST API Best Practices',
    type: 'Guide',
    category: 'Backend',
    description: 'Guidelines for designing RESTful APIs',
    difficulty: 'Intermediate',
    estimatedTime: '45 min',
    tags: ['rest', 'api', 'backend', 'http']
  },

  // Interview Preparation
  {
    id: 'interview-001',
    title: 'STAR Method Guide',
    type: 'Guide',
    category: 'Interview Skills',
    description: 'Structure your behavioral interview answers effectively',
    difficulty: 'Beginner',
    estimatedTime: '20 min',
    tags: ['behavioral', 'interview', 'communication'],
    content: `
# STAR Method for Behavioral Interviews

## Structure:
- **S**ituation: Set the context
- **T**ask: Describe your responsibility  
- **A**ction: Explain what you did
- **R**esult: Share the outcome

## Example:
**Question**: "Tell me about a time you solved a difficult problem"

**Answer**:
- **Situation**: Our e-commerce site was experiencing slow load times during peak hours
- **Task**: I was responsible for identifying and fixing the performance issues
- **Action**: I analyzed the code, found N+1 queries, implemented caching, and optimized database queries
- **Result**: Reduced page load time by 60% and improved user satisfaction scores by 25%
    `
  },
  {
    id: 'interview-002',
    title: 'Salary Negotiation Tips',
    type: 'Guide',
    category: 'Career',
    description: 'How to negotiate your salary effectively',
    difficulty: 'Advanced',
    estimatedTime: '30 min',
    tags: ['salary', 'negotiation', 'career']
  },

  // Books and External Resources
  {
    id: 'book-001',
    title: 'Cracking the Coding Interview',
    type: 'Book',
    category: 'Interview Preparation',
    description: 'The classic guide to technical interviews',
    url: 'https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850',
    difficulty: 'Intermediate',
    estimatedTime: '20 hours',
    tags: ['book', 'interviews', 'algorithms']
  },
  {
    id: 'video-001',
    title: 'System Design Interview Course',
    type: 'Video',
    category: 'System Design',
    description: 'Comprehensive video course on system design interviews',
    url: 'https://www.youtube.com/watch?v=UzLMhqg3_Wc',
    difficulty: 'Advanced',
    estimatedTime: '8 hours',
    tags: ['video', 'system-design', 'interviews']
  }
];

export const resourceCategories = [
  'All',
  'DSA Fundamentals',
  'Arrays',
  'Problem Solving',
  'System Design',
  'Databases',
  'JavaScript',
  'Python',
  'React',
  'Backend',
  'Interview Skills',
  'Career'
];

export const resourceTypes = [
  'All',
  'Notes',
  'Cheat Sheet', 
  'Guide',
  'External Link',
  'Video',
  'Book'
] as const;