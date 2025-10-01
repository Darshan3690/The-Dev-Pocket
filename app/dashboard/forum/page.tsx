"use client";

import { useState } from "react";
import { Plus, MessageCircle, User, Calendar, ThumbsUp, Reply } from "lucide-react";

type ForumPost = {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  replies: number;
};

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>([
    { 
      id: 1, 
      title: "Welcome to the Community Forum!", 
      content: "This is the place to discuss development topics, share resources, and connect with other developers.", 
      author: "Admin", 
      date: "2025-09-30", 
      likes: 24, 
      replies: 8 
    },
    { 
      id: 2, 
      title: "Best practices for React hooks", 
      content: "What are your favorite patterns for organizing custom hooks in larger applications?", 
      author: "DevUser123", 
      date: "2025-09-29", 
      likes: 15, 
      replies: 5 
    },
    { 
      id: 3, 
      title: "Recommended learning resources for TypeScript", 
      content: "Looking for advanced TypeScript resources. What books or courses have you found most helpful?", 
      author: "CodeLearner", 
      date: "2025-09-28", 
      likes: 18, 
      replies: 12 
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handleAddPost = () => {
    if (newPost.title.trim() === "" && newPost.content.trim() === "") return;
    
    const post: ForumPost = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      author: "You",
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      replies: 0
    };
    
    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Forum Dashboard</h1>
          <p className="text-slate-600 mt-1">Connect with other developers and share knowledge</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white rounded-2xl border border-slate-200/60 p-5 hover:shadow-lg transition-all duration-200 hover:border-slate-300/60"
          >
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-slate-900 text-lg">{post.title}</h3>
              <span className="text-xs text-slate-500 whitespace-nowrap">{post.date}</span>
            </div>
            
            <p className="text-slate-600 mt-3">{post.content}</p>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{post.author}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{post.likes}</span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <Reply className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{post.replies} replies</span>
                </div>
              </div>
              
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                View Thread
              </button>
            </div>
          </div>
        ))}
        
        {/* Empty state placeholder */}
        {posts.length === 0 && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300/50 p-8 text-center">
            <MessageCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No forum posts yet</h3>
            <p className="text-slate-500">Be the first to start a discussion</p>
          </div>
        )}
      </div>

      {/* Add Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
            <div className="flex justify-between items-center border-b border-slate-200/60 p-5">
              <h2 className="text-lg font-semibold text-slate-900">Create New Post</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-500 transition-colors"
              >
                <Plus className="w-5 h-5 rotate-45" />
              </button>
            </div>
            
            <div className="p-5 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Post title"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What would you like to discuss?"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-5 border-t border-slate-200/60">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPost}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200"
              >
                Post Discussion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}