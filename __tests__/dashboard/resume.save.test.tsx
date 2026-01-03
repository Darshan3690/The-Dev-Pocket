import { renderHook, act } from '@testing-library/react';
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
    const original = window.localStorage.setItem;
    window.localStorage.setItem = () => {
      throw new Error('Quota exceeded');
    };

    const { result } = renderHook(() => useResumeSave());
    const out = result.current.saveResume();

    expect(out.ok).toBe(false);
    expect(out.error).toBeDefined();

    // restore
    window.localStorage.setItem = original;
  });
});