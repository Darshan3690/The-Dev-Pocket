# 🐛 Bug Report

## 📌 Report Title

**Unhandled JSON Parsing Errors Crash Application**

---

## 📋 Description

Multiple components parse JSON from localStorage without try-catch blocks. When localStorage data becomes corrupted or malformed (common in browsers during updates, extensions, or user tampering), the application crashes with an unhandled exception, showing a white screen to users.

This affects the Job Board page and Resume Builder page, making them completely unusable if localStorage data is corrupted.

---

## 🔄 Steps to Reproduce

**Steps to reproduce the behavior:**

1. Open browser DevTools (F12)
2. Go to Console tab
3. Corrupt localStorage with invalid JSON:
   ```javascript
   localStorage.setItem('savedJobs', '{invalid json syntax');
   ```
4. Navigate to `/job` page
5. See application crash with white screen

**Alternative scenario:**
1. Set malformed resume data:
   ```javascript
   localStorage.setItem('devPocketResume', '{"incomplete": data');
   ```
2. Navigate to `/dashboard/resume`
3. Application crashes

---

## ✅ Expected Behavior

The application should gracefully handle invalid JSON data with fallback values and show a user-friendly message:

**Proper implementation:**
```typescript
try {
  const saved = localStorage.getItem('savedJobs');
  if (saved) {
    setSavedJobs(new Set(JSON.parse(saved)));
  }
} catch (error) {
  console.error('Failed to parse saved jobs:', error);
  // Clear corrupted data
  localStorage.removeItem('savedJobs');
  // Use fallback
  setSavedJobs(new Set());
  // Optionally notify user
  showWarning('Your saved jobs data was corrupted and has been reset');
}
```

---

## 🚫 Actual Behavior

The code directly calls `JSON.parse()` without error handling:

**app/job/page.tsx - Line 144:**
```typescript
const saved = localStorage.getItem('savedJobs');
if (saved) {
  setSavedJobs(new Set(JSON.parse(saved))); // ❌ No try-catch
}
```

**app/dashboard/resume/page.tsx - Line 193:**
```typescript
const savedResume = localStorage.getItem("devPocketResume");
if (savedResume) {
  const resumeData = JSON.parse(savedResume); // ❌ No try-catch
  // ... use resumeData
}
```

**Result:**
- Uncaught SyntaxError: Unexpected token in JSON
- Application white screen (crash)
- Complete loss of functionality
- No user feedback about what went wrong

---

## 📸 Screenshots / Logs

**Console error:**
```
Uncaught SyntaxError: Unexpected token { in JSON at position 0
    at JSON.parse (<anonymous>)
    at page.tsx:144
```

**Visual result:**
- Blank white screen
- No error message to user
- Page completely non-functional
- User must clear localStorage manually to fix

**User impact:**
- Lost progress
- Confusion (no error message)
- Page appears broken
- Bad user experience

---

## 💻 Environment

| Item | Value |
|------|-------|
| **OS** | All (macOS, Windows, Linux) |
| **Browser** | All browsers (Chrome, Firefox, Safari, Edge) |
| **Node.js version** | 20.11.1 |
| **The Dev Pocket version** | Current main branch |
| **Severity** | 🟠 High - Complete page failure |

---

## 📝 Additional Context

- **Frequency:** Whenever localStorage is corrupted (rare but impactful)
- **Common causes of corruption:**
  - Browser updates
  - Browser extensions interfering
  - Users manually editing localStorage
  - Storage quota exceeded mid-write
  - Browser crashes during write
  
- **Affected files:**
  - `app/job/page.tsx` (Line 144)
  - `app/dashboard/resume/page.tsx` (Line 193)

**Related issues:**
- Similar pattern may exist in other files using localStorage
- Should audit entire codebase for unprotected JSON.parse calls

**Recommended universal fix:**
Create a safe localStorage utility:
```typescript
// lib/safe-storage.ts
export const safeGetJSON = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Failed to parse ${key} from localStorage:`, error);
    localStorage.removeItem(key);
    return fallback;
  }
};

export const safeSetJSON = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to save ${key} to localStorage:`, error);
    return false;
  }
};
```

Then use it:
```typescript
const savedJobs = safeGetJSON('savedJobs', []);
setSavedJobs(new Set(savedJobs));
```

---

## ✨ Checklist

- [x] I have searched for existing issues and this is not a duplicate
- [x] I have provided clear, reproducible steps
- [x] I have included relevant environment information
- [x] I have attached screenshots/logs if applicable
- [x] I am using the latest version of The Dev Pocket

---

🙏 **Thanks for reporting!** This affects user experience significantly and should be fixed to prevent application crashes.
