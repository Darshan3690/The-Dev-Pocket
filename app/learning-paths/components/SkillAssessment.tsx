'use client';

import { useState } from 'react';
import { skillAssessmentQuestions } from '../data/paths';
import { CheckCircle, Circle } from 'lucide-react';

interface SkillAssessmentProps {
  onComplete: (scores: Record<string, number>) => void;
}

export default function SkillAssessment({ onComplete }: SkillAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const question = skillAssessmentQuestions[currentQuestion];

  const handleAnswer = (optionIndex: number) => {
    setAnswered((prev) => ({ ...prev, [currentQuestion]: optionIndex }));

    const isCorrect = optionIndex === question.correct;
    const category = question.category;
    const points = isCorrect ? 1 : 0;

    setScores((prev) => ({
      ...prev,
      [category]: (prev[category] || 0) + points,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < skillAssessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScores({});
    setAnswered({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Assessment Results</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(scores).map(([category, score]) => (
            <div key={category} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-gray-700 capitalize mb-2">{category}</p>
              <p className="text-3xl font-bold text-blue-600">
                {score}/{skillAssessmentQuestions.filter((q) => q.category === category).length}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {Math.round((score / skillAssessmentQuestions.filter((q) => q.category === category).length) * 100)}%
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 mb-6">
          <h4 className="font-bold text-gray-900 mb-2">✨ Your Results</h4>
          <p className="text-gray-700">
            Based on your assessment, we've identified your skill level and will recommend personalized learning paths
            that match your experience and goals. Click below to see recommendations!
          </p>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onComplete(scores)}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Get Recommendations
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / skillAssessmentQuestions.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold text-gray-700">Question {currentQuestion + 1}</h3>
          <span className="text-sm text-gray-600">{progress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-bold text-gray-900 mb-6">{question.question}</h4>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                answered[currentQuestion] === index
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-gray-50 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center">
                {answered[currentQuestion] === index ? (
                  <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0" />
                )}
                <span className={answered[currentQuestion] === index ? 'text-gray-900 font-medium' : 'text-gray-700'}>
                  {option}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={answered[currentQuestion] === undefined}
          className="flex-1 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {currentQuestion === skillAssessmentQuestions.length - 1 ? 'Complete' : 'Next'}
        </button>
      </div>

      {/* Question Indicators */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-600 mb-3">Progress</p>
        <div className="flex flex-wrap gap-2">
          {skillAssessmentQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index < currentQuestion
                  ? 'bg-green-500'
                  : index === currentQuestion
                    ? 'bg-blue-600'
                    : answered[index] !== undefined
                      ? 'bg-yellow-500'
                      : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
