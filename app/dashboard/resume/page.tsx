"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Download, Plus, Trash2, Save } from "lucide-react";

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export default function ResumeBuilderPage() {
  const router = useRouter();
  
  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    website: ""
  });

  // Education State
  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  ]);

  // Experience State
  const [experience, setExperience] = useState<Experience[]>([
    {
      id: "1",
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  ]);

  // Skills State
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "", level: 3 }
  ]);

  // Handle personal info changes
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  // Handle education changes
  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setEducation(prev => 
      prev.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  // Add new education entry
  const addEducation = () => {
    setEducation(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ]);
  };

  // Remove education entry
  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(prev => prev.filter(edu => edu.id !== id));
    }
  };

  // Handle experience changes
  const handleExperienceChange = (id: string, field: keyof Experience, value: string) => {
    setExperience(prev => 
      prev.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  // Add new experience entry
  const addExperience = () => {
    setExperience(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ]);
  };

  // Remove experience entry
  const removeExperience = (id: string) => {
    if (experience.length > 1) {
      setExperience(prev => prev.filter(exp => exp.id !== id));
    }
  };

  // Handle skill changes
  const handleSkillChange = (id: string, field: keyof Skill, value: string | number) => {
    setSkills(prev => 
      prev.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    );
  };

  // Add new skill
  const addSkill = () => {
    setSkills(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        name: "",
        level: 3
      }
    ]);
  };

  // Remove skill
  const removeSkill = (id: string) => {
    if (skills.length > 1) {
      setSkills(prev => prev.filter(skill => skill.id !== id));
    }
  };

  // Save resume to localStorage
  const saveResume = () => {
    const resumeData = {
      personalInfo,
      education,
      experience,
      skills
    };

    try {
      localStorage.setItem("devPocketResume", JSON.stringify(resumeData));
      // Return structured result for easier testing and integration
      return { ok: true };
    } catch (error: any) {
      console.error("Failed to save resume:", error);
      // Return result so callers/tests can assert failure without depending on alerts
      return { ok: false, error };
    }
  };

  // Load resume from localStorage
  const loadResume = () => {
    try {
      const savedResume = localStorage.getItem("devPocketResume");
      if (savedResume) {
        const resumeData = JSON.parse(savedResume);
        setPersonalInfo(resumeData.personalInfo);
        setEducation(resumeData.education);
        setExperience(resumeData.experience);
        setSkills(resumeData.skills);
        alert("Resume loaded successfully!");
      } else {
        alert("No saved resume found.");
      }
    } catch (error) {
      console.error('Failed to parse saved resume:', error);
      // Clear corrupted data
      localStorage.removeItem("devPocketResume");
      alert("Resume data was corrupted and has been reset. Please create a new resume.");
    }
  };

  // Export as JSON
  const exportAsJSON = () => {
    const resumeData = {
      personalInfo,
      education,
      experience,
      skills
    };
    const dataStr = JSON.stringify(resumeData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'my-resume.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="text-blue-600" />
              Resume Builder
            </h1>
            <p className="text-slate-600 mt-2">
              Create a professional resume for your career journey
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={loadResume}
              className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Load
            </button>
            <button 
              onClick={saveResume}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button 
              onClick={exportAsJSON}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-8">
              {/* Personal Information */}
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="(123) 456-7890"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      value={personalInfo.address}
                      onChange={(e) => handlePersonalInfoChange("address", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={personalInfo.linkedin}
                      onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Website
                    </label>
                    <input
                      type="url"
                      value={personalInfo.website}
                      onChange={(e) => handlePersonalInfoChange("website", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Education
                  </h2>
                  <button
                    onClick={addEducation}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="border border-slate-200 rounded-xl p-4 relative">
                      {education.length > 1 && (
                        <button
                          onClick={() => removeEducation(edu.id)}
                          className="absolute -top-3 -right-3 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Institution
                          </label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="University Name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Degree
                          </label>
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Bachelor of Science"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="month"
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(edu.id, "startDate", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="month"
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(edu.id, "endDate", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Present"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={edu.description}
                            onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows={3}
                            placeholder="Describe your education experience..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Work Experience */}
              <section>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Work Experience
                  </h2>
                  <button
                    onClick={addExperience}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="border border-slate-200 rounded-xl p-4 relative">
                      {experience.length > 1 && (
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="absolute -top-3 -right-3 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Company Name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Position
                          </label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Job Title"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="month"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="month"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Present"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows={3}
                            placeholder="Describe your responsibilities and achievements..."
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Skills
                  </h2>
                  <button
                    onClick={addSkill}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center gap-4 p-3 border border-slate-200 rounded-xl relative">
                      {skills.length > 1 && (
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="absolute -top-2 -right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                      
                      <div className="flex-1">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => handleSkillChange(skill.id, "name", e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          placeholder="Skill name"
                        />
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">Level:</span>
                        <select
                          value={skill.level}
                          onChange={(e) => handleSkillChange(skill.id, "level", parseInt(e.target.value))}
                          className="px-2 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          {[1, 2, 3, 4, 5].map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              Resume Preview
            </h2>
            
            <div className="bg-slate-50 rounded-xl p-6 min-h-[500px]">
              {/* Personal Info Preview */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">
                  {personalInfo.fullName || "Your Name"}
                </h1>
                
                <div className="mt-2 space-y-1">
                  {personalInfo.email && (
                    <p className="text-slate-700">{personalInfo.email}</p>
                  )}
                  {personalInfo.phone && (
                    <p className="text-slate-700">{personalInfo.phone}</p>
                  )}
                  {personalInfo.address && (
                    <p className="text-slate-700">{personalInfo.address}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-2">
                    {personalInfo.linkedin && (
                      <a 
                        href={personalInfo.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {personalInfo.website && (
                      <a 
                        href={personalInfo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Education Preview */}
              {education.some(edu => edu.institution || edu.degree) && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-3 pb-1 border-b border-slate-300">
                    Education
                  </h2>
                  <div className="space-y-4">
                    {education.map((edu) => (
                      (edu.institution || edu.degree) && (
                        <div key={edu.id} className="pl-1">
                          <h3 className="font-semibold text-slate-900">
                            {edu.degree} {edu.degree && edu.institution && "at"} {edu.institution}
                          </h3>
                          {(edu.startDate || edu.endDate) && (
                            <p className="text-slate-600 text-sm">
                              {edu.startDate ? new Date(edu.startDate).getFullYear() : ""} - 
                              {edu.endDate ? new Date(edu.endDate).getFullYear() : " Present"}
                            </p>
                          )}
                          {edu.description && (
                            <p className="text-slate-700 mt-1 text-sm">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Experience Preview */}
              {experience.some(exp => exp.company || exp.position) && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 mb-3 pb-1 border-b border-slate-300">
                    Experience
                  </h2>
                  <div className="space-y-4">
                    {experience.map((exp) => (
                      (exp.company || exp.position) && (
                        <div key={exp.id} className="pl-1">
                          <h3 className="font-semibold text-slate-900">
                            {exp.position} {exp.position && exp.company && "at"} {exp.company}
                          </h3>
                          {(exp.startDate || exp.endDate) && (
                            <p className="text-slate-600 text-sm">
                              {exp.startDate ? new Date(exp.startDate).getFullYear() : ""} - 
                              {exp.endDate ? new Date(exp.endDate).getFullYear() : " Present"}
                            </p>
                          )}
                          {exp.description && (
                            <p className="text-slate-700 mt-1 text-sm">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Preview */}
              {skills.some(skill => skill.name) && (
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 mb-3 pb-1 border-b border-slate-300">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      skill.name && (
                        <div 
                          key={skill.id} 
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill.name}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!personalInfo.fullName && 
               !education.some(edu => edu.institution || edu.degree) && 
               !experience.some(exp => exp.company || exp.position) && 
               !skills.some(skill => skill.name) && (
                <div className="flex flex-col items-center justify-center h-96 text-slate-500">
                  <FileText className="w-16 h-16 mb-4" />
                  <p className="text-lg">Fill in your details to build your resume</p>
                  <p className="text-sm mt-2 text-center">
                    Start by adding your personal information, education, experience, and skills
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}