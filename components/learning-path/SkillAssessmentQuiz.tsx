'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  topic: string;
  text: string;
}

const OPTIONS = ['Beginner', 'Basic', 'Intermediate', 'Advanced'];

const QUESTIONS: Question[] = [
  { topic: 'Web Fundamentals', text: 'How comfortable are you with semantic HTML?' },
  { topic: 'Web Fundamentals', text: 'How comfortable are you with CSS layout (flexbox/grid)?' },
  { topic: 'Web Fundamentals', text: 'How comfortable are you with browser dev tools?' },
  { topic: 'Web Fundamentals', text: 'How comfortable are you with accessibility (a11y) basics?' },
  { topic: 'JavaScript/TypeScript', text: 'How comfortable are you with ES6+ syntax?' },
  { topic: 'JavaScript/TypeScript', text: 'How comfortable are you with async/await and promises?' },
  { topic: 'JavaScript/TypeScript', text: 'How comfortable are you with TypeScript generics?' },
  { topic: 'JavaScript/TypeScript', text: 'How comfortable are you with state management patterns?' },
  { topic: 'DevOps/Tools', text: 'How comfortable are you with Git branching workflows?' },
  { topic: 'DevOps/Tools', text: 'How comfortable are you with CI/CD pipelines?' },
  { topic: 'DevOps/Tools', text: 'How comfortable are you with Docker containers?' },
  { topic: 'DevOps/Tools', text: 'How comfortable are you with cloud deployment (Vercel/AWS)?' },
];

export default function SkillAssessmentQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleAnswer = async (value: number) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/learning-path/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: updated }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to generate learning path');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Failed to generate learning path. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitting) {
    return <p className="text-muted-foreground">Generating your personalized learning path…</p>;
  }

  const question = QUESTIONS[step];

  return (
    <div className="max-w-lg mx-auto">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700 mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all"
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Question {step + 1} of {QUESTIONS.length} · {question.topic}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-6">{question.text}</h2>

      <div className="grid grid-cols-1 gap-3">
        {OPTIONS.map((label, value) => (
          <button
            key={label}
            onClick={() => handleAnswer(value)}
            className="text-left px-4 py-3 rounded-lg border hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
