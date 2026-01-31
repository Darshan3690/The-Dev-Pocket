export interface DSAProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  description: string;
  hints?: string[];
  pattern?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

export const dsaProblems: DSAProblem[] = [
  // Arrays
  {
    id: 'arr-001',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    hints: ['Use a hash map to store the complement', 'Iterate through the array once'],
    pattern: 'Hash Map',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  },
  {
    id: 'arr-002',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    topic: 'Arrays',
    description: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
    hints: ['Use Kadane\'s algorithm', 'Keep track of current and maximum sum'],
    pattern: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'arr-003',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    topic: 'Arrays',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.',
    hints: ['Use binary search', 'Partition both arrays'],
    pattern: 'Binary Search',
    timeComplexity: 'O(log(min(m,n)))',
    spaceComplexity: 'O(1)'
  },
  
  // Strings
  {
    id: 'str-001',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    topic: 'Strings',
    description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
    hints: ['Use two pointers', 'Convert to lowercase and filter alphanumeric'],
    pattern: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'str-002',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Strings',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    hints: ['Use sliding window technique', 'Keep track of character positions'],
    pattern: 'Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(m,n))'
  },
  
  // Linked Lists
  {
    id: 'll-001',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    hints: ['Use three pointers: prev, current, next', 'Iterative or recursive approach'],
    pattern: 'Iterative',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'll-002',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    topic: 'Linked Lists',
    description: 'You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.',
    hints: ['Use a dummy node', 'Compare values and link nodes'],
    pattern: 'Two Pointers',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)'
  },
  
  // Trees
  {
    id: 'tree-001',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    topic: 'Trees',
    description: 'Given the root of a binary tree, return its maximum depth.',
    hints: ['Use recursion', 'DFS or BFS approach'],
    pattern: 'DFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)'
  },
  {
    id: 'tree-002',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'Medium',
    topic: 'Trees',
    description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values.',
    hints: ['Use BFS with queue', 'Process level by level'],
    pattern: 'BFS',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(w)'
  },
  
  // Dynamic Programming
  {
    id: 'dp-001',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    topic: 'Dynamic Programming',
    description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.',
    hints: ['Similar to Fibonacci sequence', 'Bottom-up approach'],
    pattern: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  {
    id: 'dp-002',
    title: 'House Robber',
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    description: 'You are a professional robber planning to rob houses along a street. You cannot rob two adjacent houses.',
    hints: ['For each house, decide to rob or not', 'Keep track of max money so far'],
    pattern: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)'
  },
  
  // Graphs
  {
    id: 'graph-001',
    title: 'Number of Islands',
    difficulty: 'Medium',
    topic: 'Graphs',
    description: 'Given an m x n 2D binary grid which represents a map of \'1\'s (land) and \'0\'s (water), return the number of islands.',
    hints: ['Use DFS or BFS', 'Mark visited cells'],
    pattern: 'DFS/BFS',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)'
  },
  
  // Stack & Queue
  {
    id: 'stack-001',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stack',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    hints: ['Use stack to track opening brackets', 'Match closing brackets with stack top'],
    pattern: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)'
  }
];

export const dsaTopics = [
  'All',
  'Arrays',
  'Strings', 
  'Linked Lists',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Stack',
  'Queue',
  'Heaps',
  'Greedy',
  'Backtracking',
  'Binary Search',
  'Sorting'
];

export const difficultyLevels = ['All', 'Easy', 'Medium', 'Hard'] as const;