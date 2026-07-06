'use client';

import { useEffect, useState } from 'react';

const SECTION_OPTIONS = [
  { value: 'new_resources', label: 'New Resources' },
  { value: 'top_picks', label: 'Top Picks' },
  { value: 'community_highlights', label: 'Community Highlights' },
];

const FREQUENCY_OPTIONS = [
  { value: 'weekly', label: 'Weekly (Sunday)' },
  { value: 'biweekly', label: 'Bi-weekly' },
];

const DIFFICULTY_OPTIONS = ['', 'beginner', 'intermediate', 'advanced'];

interface PreviewContent {
  newResources: Array<{ id: string; title: string; url: string }>;
  topPicks: Array<{ id: string; title: string; url: string }>;
  communityHighlights: Array<{ id: string; title: string; url: string }>;
}

export default function DigestPreferences() {
  const [frequency, setFrequency] = useState('weekly');
  const [sections, setSections] = useState<string[]>(['new_resources', 'top_picks']);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<PreviewContent | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/digest/preferences');
      if (res.ok) {
        const data = await res.json();
        if (data.subscription) {
          setFrequency(data.subscription.frequency);
          setSections(data.subscription.sections);
          setDifficultyFilter(data.subscription.difficultyFilter || '');
        }
      }
    })();
  }, []);

  const toggleSection = (value: string) => {
    setSections((prev) => (prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]));
  };

  const loadPreview = async () => {
    setLoadingPreview(true);
    try {
      const params = new URLSearchParams({
        sections: sections.join(','),
        frequency,
        ...(difficultyFilter ? { difficulty: difficultyFilter } : {}),
      });
      const res = await fetch(`/api/digest/preview?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setPreview(data.content);
      }
    } finally {
      setLoadingPreview(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/digest/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frequency, sections, difficultyFilter: difficultyFilter || undefined }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || 'Failed to save preferences');
        return;
      }

      setMessage('Digest preferences saved!');
    } catch {
      setMessage('Failed to save preferences. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Digest Frequency</h3>
        <div className="flex gap-3">
          {FREQUENCY_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="frequency"
                value={opt.value}
                checked={frequency === opt.value}
                onChange={() => setFrequency(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Content Sections</h3>
        <div className="flex flex-col gap-2">
          {SECTION_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={sections.includes(opt.value)}
                onChange={() => toggleSection(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Difficulty Filter</h3>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="flex h-10 items-center rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {DIFFICULTY_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d === '' ? 'All levels' : d.charAt(0).toUpperCase() + d.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving || sections.length === 0}
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Preferences'}
        </button>
        <button
          onClick={loadPreview}
          disabled={loadingPreview || sections.length === 0}
          className="px-4 py-2 rounded-md border text-sm font-medium disabled:opacity-50"
        >
          {loadingPreview ? 'Loading…' : 'Preview This Week'}
        </button>
      </div>

      {message && <p className="text-sm text-muted-foreground">{message}</p>}

      {preview && (
        <div className="border rounded-lg p-4 space-y-3">
          <h4 className="font-semibold">Preview</h4>
          {preview.newResources.length > 0 && (
            <div>
              <p className="text-sm font-medium">New This Week</p>
              <ul className="text-sm list-disc list-inside">
                {preview.newResources.map((r) => (
                  <li key={r.id}>{r.title}</li>
                ))}
              </ul>
            </div>
          )}
          {preview.topPicks.length > 0 && (
            <div>
              <p className="text-sm font-medium">Top Picks</p>
              <ul className="text-sm list-disc list-inside">
                {preview.topPicks.map((r) => (
                  <li key={r.id}>{r.title}</li>
                ))}
              </ul>
            </div>
          )}
          {preview.communityHighlights.length > 0 && (
            <div>
              <p className="text-sm font-medium">Community Highlights</p>
              <ul className="text-sm list-disc list-inside">
                {preview.communityHighlights.map((r) => (
                  <li key={r.id}>{r.title}</li>
                ))}
              </ul>
            </div>
          )}
          {preview.newResources.length === 0 &&
            preview.topPicks.length === 0 &&
            preview.communityHighlights.length === 0 && (
              <p className="text-sm text-muted-foreground">Nothing to show yet for the selected sections.</p>
            )}
        </div>
      )}
    </div>
  );
}
