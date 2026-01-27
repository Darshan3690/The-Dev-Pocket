'use client';

import { TechStack, getDifficultyColor, getDemandColor, getCommunitySizeIcon } from '../data/techstacks';
import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface StackCardProps {
  stack: TechStack;
}

export default function StackCard({ stack }: StackCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900">{stack.name}</h3>
            <p className="text-gray-600 mt-1">{stack.description}</p>
          </div>
          <div className="ml-4">
            {expanded ? (
              <ChevronUp className="w-6 h-6 text-gray-600" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-600" />
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-600 font-semibold">Difficulty</div>
            <div className={`text-sm font-bold mt-1 ${getDifficultyColor(stack.learningDifficulty).split(' ')[2]}`}>
              {stack.learningDifficulty}
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-600 font-semibold">Job Demand</div>
            <div className={`text-lg font-bold mt-1 ${getDemandColor(stack.jobMarketDemand)}`}>
              {stack.jobMarketDemand}/10
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-600 font-semibold">Setup</div>
            <div className="text-sm font-bold mt-1 text-blue-600">{stack.setupComplexity}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded">
            <div className="text-xs text-gray-600 font-semibold">Scalability</div>
            <div className="text-sm font-bold mt-1 text-purple-600">{stack.scalability}</div>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-gray-200 p-6 space-y-6">
          {/* Technologies */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {stack.technologies.map((tech) => (
                <span key={tech} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-green-600 mb-3">✓ Pros</h4>
              <ul className="space-y-2">
                {stack.pros.map((pro, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-green-600 mr-2">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-red-600 mb-3">✗ Cons</h4>
              <ul className="space-y-2">
                {stack.cons.map((con, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start">
                    <span className="text-red-600 mr-2">−</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Use Cases */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Best For</h4>
              <ul className="space-y-1">
                {stack.bestFor.map((useCase, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    • {useCase}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Not Best For</h4>
              <ul className="space-y-1">
                {stack.notBestFor.map((useCase, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    • {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Salary Info */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Estimated Salaries (USA)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <div className="text-sm text-gray-600 font-semibold">Junior Level</div>
                <div className="text-lg font-bold text-blue-600 mt-1">{stack.estimatedSalary.junior}</div>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <div className="text-sm text-gray-600 font-semibold">Mid Level</div>
                <div className="text-lg font-bold text-green-600 mt-1">{stack.estimatedSalary.mid}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded">
                <div className="text-sm text-gray-600 font-semibold">Senior Level</div>
                <div className="text-lg font-bold text-purple-600 mt-1">{stack.estimatedSalary.senior}</div>
              </div>
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Community & Support</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 font-semibold mb-2">Community Size</div>
                <div className="text-2xl">{getCommunitySizeIcon(stack.communitySize)}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{stack.communitySize}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <div className="text-sm text-gray-600 font-semibold mb-2">Resources</div>
                <div className="space-y-2">
                  <a
                    href={stack.communityLinks.forum}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Stack Overflow
                  </a>
                  <a
                    href={stack.communityLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    GitHub
                  </a>
                  {stack.communityLinks.discord && (
                    <a
                      href={stack.communityLinks.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Discord Community
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Real World Projects */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Real-World Projects Using {stack.acronym}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stack.realWorldProjects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-50 hover:bg-gray-100 p-4 rounded transition-colors border border-gray-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-semibold text-gray-900">{project.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 mt-1 ml-2 flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
