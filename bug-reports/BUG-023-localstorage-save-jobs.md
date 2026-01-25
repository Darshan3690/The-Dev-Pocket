# 🐛 Bug Report

## 📌 Report Title

**Uncaught error when saving jobs to localStorage - toggleSaveJob lacks error handling**

---

## 📋 Description

The `toggleSaveJob()` function in `app/job/page.tsx` calls `localStorage.setItem(...)` without error handling. If localStorage is full, disabled, or throws (QuotaExceededError), the function can throw, which may create a bad user experience and leave UI state inconsistent.

**File:** `app/job/page.tsx`

---

## 🔄 Steps to Reproduce

1. Mock or disable localStorage (or simulate QuotaExceeded) in the browser or test environment.
2. Click the save job button to trigger `toggleSaveJob()`.
3. Observe an uncaught exception or missing user feedback.

---

## ✅ Expected Behavior

Saving a job should be wrapped in try-catch. On failure, the app should log the error and show a user-friendly message (toast/alert) without breaking the UI.

---

## 🚫 Actual Behavior

`localStorage.setItem('savedJobs', JSON.stringify(Array.from(newSaved)));` is called without try-catch and may throw if storage fails.

---

## 📸 Proof / Code Excerpt

The current implementation already includes try-catch error handling:

```tsx
// app/job/page.tsx
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
```

---

## 💻 Environment

| Item | Value |
|------|-------|
| **OS** | Any |
| **Node** | N/A |
| **Severity** | ✅ Resolved - Error handling implemented |

---

## 🛠 Status

The fix has been implemented. The toggleSaveJob function now handles localStorage errors gracefully, logging errors and showing a user-friendly toast without breaking the UI. The setSavedJobs is inside the try block to keep UI state consistent.

---

## ✨ Checklist

- [x] Repro steps provided
- [x] Fix implemented and tested
- [x] Bug report updated to reflect current status

---

This bug has been resolved. No further action required.
