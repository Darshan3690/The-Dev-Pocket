import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';

function useToggleSaveJob() {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const toggleSaveJob = (jobId: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) newSaved.delete(jobId);
    else newSaved.add(jobId);
    setSavedJobs(newSaved);
    try {
      localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSaved)));
      return { ok: true };
    } catch (error) {
      console.error('Failed to save jobs:', error);
      return { ok: false, error };
    }
  };
  return { toggleSaveJob };
}

describe('toggleSaveJob', () => {
  it('handles localStorage errors gracefully', () => {
    const original = window.localStorage.setItem;
    window.localStorage.setItem = () => { throw new Error('Quota exceeded'); };

    const { result } = renderHook(() => useToggleSaveJob());
    const out = result.current.toggleSaveJob('job-1');

    expect(out.ok).toBe(false);
    expect(out.error).toBeDefined();

    window.localStorage.setItem = original;
  });
});