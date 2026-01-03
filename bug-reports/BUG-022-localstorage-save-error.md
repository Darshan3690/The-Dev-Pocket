# 🐛 Bug Report

## 📌 Report Title

**Uncaught error when saving resume to localStorage (QuotaExceeded / disabled storage)**

---

## 📋 Description

The `saveResume()` function in `app/dashboard/resume/page.tsx` directly calls `localStorage.setItem(...)` without error handling. If localStorage is full, disabled, or throws (QuotaExceededError), this will throw and may break the UI or leave the resume state inconsistent.

**File:** `app/dashboard/resume/page.tsx`

---

## 🔄 Steps to Reproduce

1. Open the app in a browser with localStorage disabled or quota exceeded (e.g., run automated test that mocks localStorage.setItem to throw).
2. Fill in resume fields and click save.
3. Observe an uncaught exception and the UI may not show a helpful error message.

---

## ✅ Expected Behavior

Saving should be wrapped in try-catch. On failure, the app should log the error and show a user-friendly message (toast/alert), leaving application state consistent.

---

## 🚫 Actual Behavior

`localStorage.setItem("devPocketResume", JSON.stringify(resumeData));` is called without try-catch; errors propagate to the UI and may cause unexpected behavior.

---

## 📸 Proof / Code Excerpt

```tsx
// app/dashboard/resume/page.tsx
const saveResume = () => {
  const resumeData = { personalInfo, education, experience, skills };
  // ❌ No try-catch
  localStorage.setItem("devPocketResume", JSON.stringify(resumeData));
  alert("Resume saved successfully!");
};
```

---

## 💻 Environment

| Item | Value |
|------|-------|
| **OS** | Any |
| **Node** | N/A |
| **Severity** | 🟠 Moderate - UI reliability |

---

## 🛠 Suggested Fix

Wrap the localStorage operation in try-catch and show a helpful error message on failure. Example:

```tsx
try {
  localStorage.setItem("devPocketResume", JSON.stringify(resumeData));
  alert("Resume saved successfully!");
} catch (error) {
  console.error('Failed to save resume:', error);
  alert('Failed to save resume. Please free up storage or try again.');
}
```

---

## ✨ Checklist

- [x] Repro steps provided
- [x] Fix suggestion provided

---

I'll open a PR that applies this fix and adds a test mock to ensure saveResume handles storage errors gracefully.
