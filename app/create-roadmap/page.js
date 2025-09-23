"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Use next/link
import skillsData from '../data/skills.json'; // Adjusted import path
import './CreateRoadmapPage.css'; // We will create this CSS file next

const CreateRoadmapPage = () => {
  // State to hold the title of the custom roadmap
  const [roadmapTitle, setRoadmapTitle] = useState('');
  // State to hold the list of skills (nodes) in the custom roadmap
  const [customRoadmap, setCustomRoadmap] = useState([]);

  // --- LOCAL STORAGE LOGIC ---
  // On initial load, try to get the saved roadmap from localStorage
  useEffect(() => {
    const savedTitle = localStorage.getItem('customRoadmapTitle');
    const savedRoadmap = localStorage.getItem('customRoadmapNodes');
    
    if (savedTitle) {
      setRoadmapTitle(JSON.parse(savedTitle));
    }
    if (savedRoadmap) {
      setCustomRoadmap(JSON.parse(savedRoadmap));
    }
  }, []); // Empty array means this runs only once on mount

  // Whenever the title or roadmap changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem('customRoadmapTitle', JSON.stringify(roadmapTitle));
    localStorage.setItem('customRoadmapNodes', JSON.stringify(customRoadmap));
  }, [roadmapTitle, customRoadmap]);

  // --- ROADMAP MANIPULATION LOGIC ---
  const addSkillToRoadmap = (skillToAdd) => {
    if (!customRoadmap.some(skill => skill.id === skillToAdd.id)) {
      setCustomRoadmap([...customRoadmap, skillToAdd]);
    } else {
      alert(`${skillToAdd.name} is already in your roadmap!`);
    }
  };

  const removeSkillFromRoadmap = (skillToRemoveId) => {
    setCustomRoadmap(customRoadmap.filter(skill => skill.id !== skillToRemoveId));
  };

  return (
    <div className="roadmap-creator-container">
      <h1>Create Your Custom Learning Roadmap</h1>
      <input
        type="text"
        className="roadmap-title-input"
        placeholder="Enter your roadmap title (e.g., Frontend Master)"
        value={roadmapTitle}
        onChange={(e) => setRoadmapTitle(e.target.value)}
      />

      <div className="creator-layout">
        {/* Left Column: Library of all available skills */}
        <div className="skill-library">
          <h2>Skill Library</h2>
          <div className="skill-list">
            {skillsData.map(skill => (
              <div key={skill.id} className="skill-item">
                <span>{skill.name}</span>
                <button onClick={() => addSkillToRoadmap(skill)}>+</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: The user's custom roadmap canvas */}
        <div className="roadmap-canvas">
          <h2>Your Roadmap</h2>
          {customRoadmap.length === 0 ? (
            <p className="empty-message">Add skills from the library to get started!</p>
          ) : (
            <div className="roadmap-nodes">
              {customRoadmap.map((node, index) => (
                <div key={node.id} className="roadmap-node">
                  <span className="node-index">{index + 1}</span>
                  <span className="node-name">{node.name}</span>
                  <button onClick={() => removeSkillFromRoadmap(node.id)} className="remove-btn">×</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateRoadmapPage;