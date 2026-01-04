# 🧩 Essential DSA Problem Solving Patterns

A quick reference guide to identifying which algorithm pattern to use based on the problem statement. This bridges the gap between theory and application.

| Pattern Name | When to Use (Clues) | Common Problems |
| :--- | :--- | :--- |
| **1. Sliding Window** | Input is a linear data structure (Array/String/List). You need to find a subarray/substring of a specific size or satisfying a condition. | *Max sum subarray of size K*, *Longest substring with K distinct characters*. |
| **2. Two Pointers** | Input is a **sorted** array or list. You need to find pairs or triplets that satisfy a condition, or reverse/move elements. | *Pair with target sum*, *Remove duplicates from sorted array*, *Squaring a sorted array*. |
| **3. Fast & Slow Pointers** | Dealing with a Cyclic LinkedList or Array. You need to find the middle element or detect a cycle. | *LinkedList Cycle detection*, *Middle of LinkedList*, *Happy Number*. |
| **4. Merge Intervals** | You are dealing with overlapping time intervals. | *Merge overlapping intervals*, *Insert Interval*, *Meeting Rooms problem*. |
| **5. Top 'K' Elements** | You need to find the specific 'K' smallest, largest, or most frequent elements. | *Kth largest number*, *Top K frequent numbers*, *K closest points to origin*. |
| **6. Modified Binary Search** | Input is sorted (or rotated sorted). You need to search for an element in `O(log n)`. | *Search in Rotated Sorted Array*, *Find Minimum in Rotated Sorted Array*. |

---

### 💡 Pro Tip for Interviews
Don't jump straight to code. First, identify the pattern:
1. Is it sorted? -> Think **Binary Search** or **Two Pointers**.
2. Is it asking for a contiguous sub-part? -> Think **Sliding Window**.
3. Is it asking for top/bottom K items? -> Think **Heap (Priority Queue)**.