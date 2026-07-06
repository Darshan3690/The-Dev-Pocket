'use client';

import { useEffect, useState } from 'react';
import SubmissionForm from '@/components/resource-submissions/SubmissionForm';
import SubmissionCard from '@/components/resource-submissions/SubmissionCard';

interface Submission {
  id: string;
  title: string;
  description: string | null;
  url: string;
  category: string;
  difficulty: string;
  status: string;
  voteCount: number;
  createdAt: string;
}

const SORT_OPTIONS = [
  { value: 'most-voted', label: 'Most Voted' },
  { value: 'newest', label: 'Newest' },
  { value: 'trending', label: 'Trending' },
];

export default function CommunitySubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [sort, setSort] = useState('most-voted');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/resource-submissions?sort=${sort}`);
        const data = await res.json();
        if (!cancelled) setSubmissions(data.submissions || []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [sort]);

  const refresh = async () => {
    const res = await fetch(`/api/resource-submissions?sort=${sort}`);
    const data = await res.json();
    setSubmissions(data.submissions || []);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Community Submissions</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          {showForm ? 'Hide form' : 'Submit a resource'}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 border rounded-lg p-6">
          <SubmissionForm
            onSuccess={() => {
              setShowForm(false);
              refresh();
            }}
          />
        </div>
      )}

      <div className="flex gap-2 mb-6">
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setSort(opt.value)}
            className={`px-3 py-1 rounded-full text-sm ${
              sort === opt.value ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading submissions…</p>
      ) : submissions.length === 0 ? (
        <p className="text-muted-foreground">No submissions yet. Be the first to share one!</p>
      ) : (
        <div className="space-y-4">
          {submissions.map((s) => (
            <SubmissionCard key={s.id} submission={s} />
          ))}
        </div>
      )}
    </main>
  );
}
