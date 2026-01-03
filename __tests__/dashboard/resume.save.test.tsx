import { renderHook } from '@testing-library/react';
import { useState } from 'react';

// A tiny harness to test saveResume's localStorage behavior
function useResumeSave() {
  const [personalInfo] = useState({ name: 'Test' });
  const [education] = useState([]);
  const [experience] = useState([]);
  const [skills] = useState([]);

  const saveResume = () => {
    const resumeData = { personalInfo, education, experience, skills };
    try {
      localStorage.setItem('devPocketResume', JSON.stringify(resumeData));
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  };

  return { saveResume };
}

describe('saveResume', () => {
  it('handles localStorage errors gracefully', () => {
    // mock localStorage.setItem to throw
    const originalStorage = window.localStorage;
    // Replace storage with a thrower implementation
    const thrower = jest.fn(() => { throw new Error('Quota exceeded'); });
    Object.defineProperty(window, 'localStorage', { value: { setItem: thrower }, configurable: true });

    const { result } = renderHook(() => useResumeSave());
    try {    // confirm the mocked setItem actually throws as expected
    expect(() => window.localStorage.setItem('x', 'y')).toThrow('Quota exceeded');
      const out = result.current.saveResume();

      expect(out.ok).toBe(false);
      expect(out.error).toBeDefined();
    } finally {
      // restore
      Object.defineProperty(window, 'localStorage', { value: originalStorage, configurable: true });
    }
  });
});