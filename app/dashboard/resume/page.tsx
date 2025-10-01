"use client";

import React, { useState } from "react";

export default function ResumePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resume Dashboard</h1>
          <p className="text-slate-600 mt-1">Manage your professional resume</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          {isEditing ? "Save Resume" : "Add/Update Resume"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Your Resume</h3>
          <p className="text-slate-600 max-w-md mx-auto">
            {isEditing 
              ? "Edit your resume details here. Add your experience, education, and skills." 
              : "You haven't added a resume yet. Click the button above to create or upload your resume."}
          </p>
          
          {isEditing && (
            <div className="mt-6 max-w-2xl mx-auto text-left space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Professional Summary</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Brief summary of your professional background..."
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                <textarea 
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="List your work experience..."
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}