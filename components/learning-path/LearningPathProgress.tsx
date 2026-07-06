'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  url: string;
  category: string;
  difficulty: string | null;
}

interface LearningPathData {
  resources: Resource[];
  completedResourceIds: string[];
  estimatedWeeks: number;
  progress: number;
}

export default function LearningPathProgress() {
  const [data, setData] = useState<LearningPathData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/learning-path');
      if (res.ok) {
        setData(await res.json());
      } else {
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const completeNext = async () => {
    if (!data) return;
    const nextResource = data.resources.find((r) => !data.completedResourceIds.includes(r.id));
    if (!nextResource) return;

    setCompleting(true);
    try {
      const res = await fetch('/api/learning-path/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId: nextResource.id }),
      });
      if (res.ok) {
        await load();
      }
    } finally {
      setCompleting(false);
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading your learning path…</p>;

  if (!data) {
    return (
      <div className="rounded-lg border p-6 text-center">
        <p className="mb-4 text-muted-foreground">
          You have not taken the skill assessment yet.
        </p>
        <Link href="/start-your-path" className="text-blue-600 font-semibold hover:underline">
          Start Your Path
        </Link>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (data.progress / 100) * circumference;
  const nextResource = data.resources.find((r) => !data.completedResourceIds.includes(r.id));

  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-center gap-6">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="10" fill="none" />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#2563eb"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="55" textAnchor="middle" fontSize="18" fontWeight="bold">
            {data.progress}%
          </text>
        </svg>

        <div>
          <p className="font-semibold">
            {data.completedResourceIds.length} / {data.resources.length} resources complete
          </p>
          <p className="text-sm text-muted-foreground">
            Estimated {data.estimatedWeeks} week{data.estimatedWeeks !== 1 ? 's' : ''} to finish
          </p>
          {nextResource && (
            <button
              onClick={completeNext}
              disabled={completing}
              className="mt-2 text-sm text-blue-600 font-semibold hover:underline disabled:opacity-50"
            >
              Mark &quot;{nextResource.title}&quot; complete
            </button>
          )}
          <div className="mt-2">
            <Link href="/start-your-path" className="text-xs text-muted-foreground hover:underline">
              Retake assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
