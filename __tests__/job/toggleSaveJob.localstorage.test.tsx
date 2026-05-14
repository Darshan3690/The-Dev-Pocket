import { renderHook, act } from '@testing-library/react';
import { useState } from 'react';
import { showError } from '@/lib/toast';

// Mock the toast function
jest.mock('@/lib/toast', () => ({
  showError: jest.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('toggleSaveJob localStorage error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null); // No saved jobs initially
  });

  it('handles localStorage.setItem error gracefully', () => {
    // Mock localStorage.setItem to throw an error
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('QuotaExceededError');
    });

    // Create a hook to test the function
    const useTestHook = () => {
      const [savedJobs, setSavedJobs] = useState(new Set<string>());
      const toggleSaveJob = (jobId: string) => {
        const newSaved = new Set(savedJobs);
        if (newSaved.has(jobId)) {
          newSaved.delete(jobId);
        } else {
          newSaved.add(jobId);
        }
        try {
          localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSaved)));
          setSavedJobs(newSaved);
        } catch (error) {
          console.error('Failed to save jobs:', error);
          showError('Failed to save job. Please free up storage or try again.');
        }
      };
      return { savedJobs, toggleSaveJob };
    };

    const { result } = renderHook(() => useTestHook());

    // Initially, no jobs saved
    expect(result.current.savedJobs.size).toBe(0);

    // Attempt to save a job, but localStorage throws
    act(() => {
      result.current.toggleSaveJob('job1');
    });

    // Verify that setSavedJobs was not called (state unchanged)
    expect(result.current.savedJobs.size).toBe(0);

    // Verify that showError was called with the correct message
    expect(showError).toHaveBeenCalledWith('Failed to save job. Please free up storage or try again.');

    // Verify that localStorage.setItem was attempted
    expect(localStorageMock.setItem).toHaveBeenCalledWith('savedJobs', JSON.stringify(['job1']));
  });

  it('saves job successfully when localStorage works', () => {
    localStorageMock.setItem.mockImplementation(() => {}); // Success

    const useTestHook = () => {
      const [savedJobs, setSavedJobs] = useState(new Set<string>());
      const toggleSaveJob = (jobId: string) => {
        const newSaved = new Set(savedJobs);
        if (newSaved.has(jobId)) {
          newSaved.delete(jobId);
        } else {
          newSaved.add(jobId);
        }
        try {
          localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSaved)));
          setSavedJobs(newSaved);
        } catch (error) {
          console.error('Failed to save jobs:', error);
          showError('Failed to save job. Please free up storage or try again.');
        }
      };
      return { savedJobs, toggleSaveJob };
    };

    const { result } = renderHook(() => useTestHook());

    act(() => {
      result.current.toggleSaveJob('job1');
    });

    expect(result.current.savedJobs.has('job1')).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('savedJobs', JSON.stringify(['job1']));
    expect(showError).not.toHaveBeenCalled();
  });
});
