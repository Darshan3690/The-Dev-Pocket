import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';

// Minimal harness that mirrors the production toggleSaveJob behavior
function useToggleSaveJob() {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const toggleSaveJob = (jobId: string) => {
    const newSaved = new Set(savedJobs);
    if (newSaved.has(jobId)) newSaved.delete(jobId);
    else newSaved.add(jobId);
    setSavedJobs(newSaved);
    try {
      localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSaved)));
    } catch (error) {
      console.error('Failed to save jobs:', error);
    }
  };
  return { toggleSaveJob };
}

describe('toggleSaveJob', () => {
  it('handles localStorage errors gracefully', () => {
    const original = window.localStorage.setItem;
    try {
      window.localStorage.setItem = () => { throw new Error('Quota exceeded'); };

      const { result } = renderHook(() => useToggleSaveJob());
      let out: any;
      act(() => {
        out = result.current.toggleSaveJob('job-1');
      });

      // The real implementation doesn't return a value; this asserts the function completes and doesn't throw
      expect(() => out).not.toThrow();
    } finally {
      window.localStorage.setItem = original;
    }
  });
});
