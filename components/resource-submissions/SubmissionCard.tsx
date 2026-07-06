'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

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

interface SubmissionCardProps {
  submission: Submission;
  hasVoted?: boolean;
}

export default function SubmissionCard({ submission, hasVoted = false }: SubmissionCardProps) {
  const [voteCount, setVoteCount] = useState(submission.voteCount);
  const [voted, setVoted] = useState(hasVoted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVote = async () => {
    if (loading || voted) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/resource-submissions/${submission.id}/vote`, {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to vote');
        return;
      }

      setVoteCount(data.voteCount);
      setVoted(true);
    } catch {
      setError('Failed to vote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <a
            href={submission.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:underline"
          >
            {submission.title}
          </a>
          {submission.description && (
            <p className="text-sm text-muted-foreground mt-1">{submission.description}</p>
          )}
          <div className="flex gap-2 mt-2 text-xs">
            <span className="px-2 py-1 rounded-full bg-gray-100">{submission.category}</span>
            <span className="px-2 py-1 rounded-full bg-gray-100">{submission.difficulty}</span>
            <span className="px-2 py-1 rounded-full bg-gray-100">{submission.status}</span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Button
            type="button"
            variant={voted ? 'secondary' : 'default'}
            disabled={loading || voted}
            onClick={handleVote}
          >
            {voted ? 'Voted' : 'Upvote'}
          </Button>
          <span className="text-sm text-muted-foreground">{voteCount} votes</span>
        </div>
      </div>
      {error && <p className="text-xs text-red-600 mt-2">{error}</p>}
    </div>
  );
}
