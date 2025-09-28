"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import skillsData from "../data/skills.json";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./CreateRoadmapPage.css";

// Dynamically import ReactFlow to avoid SSR issues
const ReactFlow = dynamic(() => import("reactflow"), { ssr: false });
import { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

export default function CreateRoadmapPage() {
  const [roadmapTitle, setRoadmapTitle] = useState("");
  const [customRoadmap, setCustomRoadmap] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const roadmapRef = useRef(null);
  const flowRef = useRef(null);

  // Load saved roadmap
  useEffect(() => {
    const savedTitle = localStorage.getItem("customRoadmapTitle");
    const savedRoadmap = localStorage.getItem("customRoadmapNodes");
    if (savedTitle) setRoadmapTitle(JSON.parse(savedTitle));
    if (savedRoadmap) setCustomRoadmap(JSON.parse(savedRoadmap));
  }, []);

  // Save roadmap
  useEffect(() => {
    localStorage.setItem("customRoadmapTitle", JSON.stringify(roadmapTitle));
    localStorage.setItem("customRoadmapNodes", JSON.stringify(customRoadmap));
  }, [roadmapTitle, customRoadmap]);

  // Filter skills based on search
  const filteredSkills = skillsData.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add skill
  const addSkillToRoadmap = (skillToAdd) => {
    if (!customRoadmap.some((skill) => skill.id === skillToAdd.id)) {
      setCustomRoadmap([...customRoadmap, skillToAdd]);
    } else {
      alert(`${skillToAdd.name} is already in your roadmap!`);
    }
  };

  // Remove skill
  const removeSkillFromRoadmap = (skillToRemoveId) => {
    setCustomRoadmap(customRoadmap.filter((s) => s.id !== skillToRemoveId));
  };

  // Clear all skills
  const clearRoadmap = () => {
    if (confirm("Are you sure you want to clear your roadmap?")) {
      setCustomRoadmap([]);
    }
  };

  // Move skill up in order
  const moveSkillUp = (index) => {
    if (index === 0) return;
    const newRoadmap = [...customRoadmap];
    [newRoadmap[index - 1], newRoadmap[index]] = [newRoadmap[index], newRoadmap[index - 1]];
    setCustomRoadmap(newRoadmap);
  };

  // Move skill down in order
  const moveSkillDown = (index) => {
    if (index === customRoadmap.length - 1) return;
    const newRoadmap = [...customRoadmap];
    [newRoadmap[index], newRoadmap[index + 1]] = [newRoadmap[index + 1], newRoadmap[index]];
    setCustomRoadmap(newRoadmap);
  };

  // ReactFlow nodes & edges
  const nodes = customRoadmap.map((skill, index) => ({
    id: skill.id.toString(),
    data: { 
      label: (
        <div className="custom-node">
          <div className="node-header">
            <span className="node-number">{index + 1}</span>
            <button 
              className="node-remove-btn"
              onClick={() => removeSkillFromRoadmap(skill.id)}
              title="Remove skill"
            >
              ×
            </button>
          </div>
          <span className="node-label">{skill.name}</span>
          {skill.category && (
            <span className="node-category">{skill.category}</span>
          )}
        </div>
      )
    },
    position: { x: index * 220, y: index % 2 === 0 ? 100 : 300 },
    style: {
      border: "2px solid #3b82f6",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.2)",
      minWidth: "200px",
      padding: "0",
    },
  }));

  const edges = customRoadmap
    .map((_, index) => {
      if (index === 0) return null;
      return {
        id: `e${customRoadmap[index - 1].id}-${customRoadmap[index].id}`,
        source: customRoadmap[index - 1].id.toString(),
        target: customRoadmap[index].id.toString(),
        animated: true,
        style: { stroke: "#3b82f6", strokeWidth: 2 },
      };
    })
    .filter(Boolean);

  // Enhanced PDF Download with better quality
 const downloadPDF = async () => {
  if (!roadmapRef.current || customRoadmap.length === 0) return;

  setIsDownloading(true);
  setDownloadSuccess(false);

  try {
    // Make PDF-safe
    roadmapRef.current.classList.add('pdf-safe');

    const canvas = await html2canvas(roadmapRef.current, {
      backgroundColor: "#ffffff",
      scale: 3,
      useCORS: true,
      logging: false,
    });

    roadmapRef.current.classList.remove('pdf-safe');

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width * ratio, canvas.height * ratio);
    pdf.save(`${roadmapTitle || "roadmap"}.pdf`);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  } catch (error) {
    console.error("PDF download error:", error);
    alert("Failed to generate PDF. Please try again.");
  } finally {
    setIsDownloading(false);
  }
};


  return (
    <div className="roadmap-creator-container">
      <header className="creator-header">
        <h1>Create Your Learning Roadmap</h1>
        <p className="subtitle">Build your personalized learning journey step by step</p>
      </header>

      <div className="roadmap-title-section">
        <input
          type="text"
          className="roadmap-title-input"
          placeholder="Give your roadmap a title (e.g., 'Frontend Developer Path 2024')"
          value={roadmapTitle}
          onChange={(e) => setRoadmapTitle(e.target.value)}
        />
      </div>

      <div className="creator-layout">
        {/* Left: Skill Library Sidebar */}
        <div className="skill-library">
          <div className="library-header">
            <h2>Skill Library</h2>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          
          <div className="skill-stats">
            <span>{filteredSkills.length} skills available</span>
            <span>{customRoadmap.length} skills added</span>
          </div>

          <div className="skill-list">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  {skill.category && (
                    <span className="skill-category">{skill.category}</span>
                  )}
                  {skill.description && (
                    <p className="skill-description">{skill.description}</p>
                  )}
                </div>
                <button 
                  className="add-skill-btn"
                  onClick={() => addSkillToRoadmap(skill)}
                  title={`Add ${skill.name} to roadmap`}
                >
                  <span className="btn-icon">+</span>
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Roadmap Canvas Main Content */}
        <div className="roadmap-canvas">
          <div className="canvas-header">
            <div className="canvas-title">
              <h2>Your Roadmap</h2>
              {customRoadmap.length > 0 && (
                <span className="skill-count">{customRoadmap.length} skills</span>
              )}
            </div>
            
            <div className="canvas-actions">
              {customRoadmap.length > 0 && (
                <>
                  <button 
                    className="clear-btn"
                    onClick={clearRoadmap}
                    title="Clear all skills"
                  >
                    Clear All
                  </button>
                  <button 
                    className={`download-btn ${isDownloading ? 'downloading' : ''} ${downloadSuccess ? 'success' : ''}`}
                    onClick={downloadPDF}
                    disabled={isDownloading || customRoadmap.length === 0}
                  >
                    {isDownloading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Generating...
                      </>
                    ) : downloadSuccess ? (
                      <>
                        <span className="success-icon">✓</span>
                        Downloaded!
                      </>
                    ) : (
                      <>
                        <span className="download-icon">📄</span>
                        Download PDF
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>

          {customRoadmap.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🗺️</div>
              <h3>Start Building Your Roadmap</h3>
              <p>Add skills from the library to create your personalized learning journey</p>
              <div className="empty-features">
                <div className="feature">
                  <span className="feature-icon">📚</span>
                  <span>Browse skills</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🔍</span>
                  <span>Search & filter</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">📄</span>
                  <span>Export PDF</span>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Skills List for Management */}
              <div className="skills-management">
                <h4>Manage Your Skills Order</h4>
                <div className="skills-list">
                  {customRoadmap.map((skill, index) => (
                    <div key={skill.id} className="managed-skill">
                      <span className="skill-order">{index + 1}</span>
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-actions">
                        <button 
                          onClick={() => moveSkillUp(index)}
                          disabled={index === 0}
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button 
                          onClick={() => moveSkillDown(index)}
                          disabled={index === customRoadmap.length - 1}
                          title="Move down"
                        >
                          ↓
                        </button>
                        <button 
                          onClick={() => removeSkillFromRoadmap(skill.id)}
                          className="remove-btn"
                          title="Remove"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* React Flow Diagram */}
              <div className="flow-container">
                <div 
                  ref={roadmapRef}
                  className="roadmap-pdf-container"
                  style={{ height: "500px", width: "100%", background: "#f9fafb" }}
                >
                  <ReactFlow 
                    nodes={nodes} 
                    edges={edges} 
                    fitView
                    minZoom={0.2}
                    maxZoom={1.5}
                    ref={flowRef}
                  >
                    <MiniMap 
                      style={{ backgroundColor: '#f8fafc' }}
                      nodeColor="#dbeafe"
                    />
                    <Controls 
                      position="bottom-right"
                      showInteractive={false}
                    />
                    <Background gap={20} color="#e2e8f0" />
                  </ReactFlow>
                </div>

                <div className="canvas-tips">
                  <p>💡 <strong>Tips:</strong> Drag to pan • Scroll to zoom • Use controls to navigate</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}