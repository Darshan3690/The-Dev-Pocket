'use client';

import { TechStack, getDifficultyColor, getDemandColor } from '../data/techstacks';
import { X } from 'lucide-react';

interface ComparisonTableProps {
  stacks: TechStack[];
  onRemove: (stackId: string) => void;
}

export default function ComparisonTable({ stacks, onRemove }: ComparisonTableProps) {
  if (stacks.length === 0) {
    return null;
  }

  const comparisonMetrics = [
    { label: 'Technologies', key: 'technologies' },
    { label: 'Learning Difficulty', key: 'learningDifficulty' },
    { label: 'Job Market Demand', key: 'jobMarketDemand' },
    { label: 'Community Size', key: 'communitySize' },
    { label: 'Setup Complexity', key: 'setupComplexity' },
    { label: 'Scalability', key: 'scalability' },
    { label: 'Best For', key: 'bestFor' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Stack Comparison</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 w-32">Metric</th>
              {stacks.map((stack) => (
                <th key={stack.id} className="px-6 py-4 text-left text-sm font-bold text-gray-900 min-w-48">
                  <div className="flex items-center justify-between">
                    <span>{stack.name}</span>
                    <button
                      onClick={() => onRemove(stack.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors ml-2"
                      aria-label={`Remove ${stack.name} from comparison`}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonMetrics.map((metric, idx) => (
              <tr key={metric.key} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-sm font-bold text-gray-900 border-r border-gray-200">
                  {metric.label}
                </td>
                {stacks.map((stack) => (
                  <td key={stack.id} className="px-6 py-4 text-sm text-gray-700">
                    {metric.key === 'technologies' ? (
                      <div className="flex flex-wrap gap-2">
                        {(stack[metric.key as keyof TechStack] as string[]).slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {(stack[metric.key as keyof TechStack] as string[]).length > 3 && (
                          <span className="text-gray-600 text-xs">
                            +{(stack[metric.key as keyof TechStack] as string[]).length - 3} more
                          </span>
                        )}
                      </div>
                    ) : metric.key === 'learningDifficulty' ? (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(stack.learningDifficulty)}`}>
                        {stack.learningDifficulty}
                      </span>
                    ) : metric.key === 'jobMarketDemand' ? (
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(10)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${i < stack.jobMarketDemand ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className={`ml-2 font-bold ${getDemandColor(stack.jobMarketDemand)}`}>
                          {stack.jobMarketDemand}/10
                        </span>
                      </div>
                    ) : metric.key === 'bestFor' ? (
                      <ul className="space-y-1">
                        {(stack[metric.key as keyof TechStack] as string[]).slice(0, 2).map((item, i) => (
                          <li key={i} className="text-gray-700">
                            • {item}
                          </li>
                        ))}
                        {(stack[metric.key as keyof TechStack] as string[]).length > 2 && (
                          <li className="text-gray-600 text-xs">
                            +{(stack[metric.key as keyof TechStack] as string[]).length - 2} more
                          </li>
                        )}
                      </ul>
                    ) : (
                      <span className="font-medium">{String(stack[metric.key as keyof TechStack])}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Salary Comparison */}
      <div className="px-6 py-4 border-t border-gray-200">
        <h4 className="font-bold text-gray-900 mb-4">Estimated Salary Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['junior', 'mid', 'senior'].map((level) => (
            <div key={level}>
              <h5 className="font-semibold text-gray-700 mb-3 capitalize">{level} Level</h5>
              <div className="space-y-2">
                {stacks.map((stack) => (
                  <div key={stack.id} className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium text-gray-900">{stack.name}</p>
                    <p className="text-sm text-blue-600 font-semibold">
                      {stack.estimatedSalary[level as keyof typeof stack.estimatedSalary]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
