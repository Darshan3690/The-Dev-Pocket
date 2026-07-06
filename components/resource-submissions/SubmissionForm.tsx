'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const CATEGORIES = ['article', 'video', 'course', 'tool', 'documentation'];
const DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

interface SubmissionFormProps {
  onSuccess?: () => void;
}

export default function SubmissionForm({ onSuccess }: SubmissionFormProps) {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[0]);
  const [tagsInput, setTagsInput] = useState('');
  const [ogLoading, setOgLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleUrlBlur = async () => {
    if (!url) return;
    try {
      new URL(url);
    } catch {
      return;
    }

    setOgLoading(true);
    try {
      const res = await fetch(`/api/og-preview?url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.title && !title) setTitle(data.title);
        if (data.description && !description) setDescription(data.description);
      }
    } catch {
      // OG preview is a convenience feature; failures should not block submission
    } finally {
      setOgLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url || !title || !category || !difficulty) {
      setError('URL, title, category, and difficulty are required');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 5);

    setSubmitting(true);
    try {
      const res = await fetch('/api/resource-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, title, description, category, difficulty, tags }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to submit resource');
        return;
      }

      setUrl('');
      setTitle('');
      setDescription('');
      setCategory(CATEGORIES[0]);
      setDifficulty(DIFFICULTIES[0]);
      setTagsInput('');

      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }
    } catch {
      setError('Failed to submit resource. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="submission-url" className="block text-sm font-medium mb-1">
          URL
        </label>
        <Input
          id="submission-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={handleUrlBlur}
          placeholder="https://example.com/great-article"
          required
        />
        {ogLoading && <p className="text-xs text-muted-foreground mt-1">Fetching preview…</p>}
      </div>

      <div>
        <label htmlFor="submission-title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <Input
          id="submission-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resource title"
          required
        />
      </div>

      <div>
        <label htmlFor="submission-description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="submission-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What makes this resource worth sharing?"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="submission-category" className="block text-sm font-medium mb-1">
            Category
          </label>
          <select
            id="submission-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="submission-difficulty" className="block text-sm font-medium mb-1">
            Difficulty
          </label>
          <select
            id="submission-difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="submission-tags" className="block text-sm font-medium mb-1">
          Tags (comma-separated, max 5)
        </label>
        <Input
          id="submission-tags"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="react, hooks, performance"
        />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Resource'}
      </Button>
    </form>
  );
}
