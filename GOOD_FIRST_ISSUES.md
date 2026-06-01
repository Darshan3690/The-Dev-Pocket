# Good First Issues

Welcome to The Dev Pocket! We're glad you're interested in contributing. This document outlines beginner-friendly issues that are great starting points for new contributors.

## About This Project

The Dev Pocket is a developer resources hub built with Next.js, TypeScript, and Prisma. We value:
- **Small, focused changes** - Don't try to fix everything at once
- **Well-defined scope** - Each issue should have clear requirements
- **Low risk** - These changes won't break existing functionality
- **Learning opportunities** - You'll understand part of the codebase after completing these

---

## Good First Issues

### Issue 1: Add JSDoc to `job/page.tsx` match score calculation

**Files to look at:** `app/job/page.tsx` (lines 398-401)

**What needs to be done:**
The job listing page calculates match scores using a hardcoded magic number `1.25` in the SVG strokeDasharray calculation:
```tsx
strokeDasharray={`${job.matchScore * 1.25} ${125}`}
```
This magic number represents the circle's circumference calculation (2 * π * 20 ≈ 125). Add a JSDoc comment explaining this calculation to make it maintainable.

**Why it's a good first issue:**
- Isolated change in a single file
- No logic changes, just documentation
- Easy to verify (just check the comment was added)
- Teaches you about the codebase structure

**Expected difficulty:** Easy

---

### Issue 2: Improve error message in `localBookmarks.add()`

**Files to look at:** `lib/bookmarks.ts` (lines 25-42)

**What needs to be done:**
The `localBookmarks.add()` function throws a generic error message "Bookmark already exists" when a duplicate URL is detected. Improve this to include:
- The URL that caused the conflict (without logging sensitive data)
- A suggestion like "Please use a different URL or remove the existing bookmark"

**Why it's a good first issue:**
- Simple function with clear boundaries
- Only modifies an error message string
- Teaches you about the bookmarks module structure
- No tests can break

**Expected difficulty:** Easy

---

### Issue 3: Add TypeScript interface for Contact API response

**Files to look at:** `app/api/contact/route.ts` (lines 73-87)

**What needs to be done:**
The POST `/api/contact` endpoint returns different response shapes for success and error cases but lacks TypeScript interfaces. Create an interface for:
- `ContactSuccessResponse` (with `success`, `message`, `id`)
- `ContactErrorResponse` (with `error`)

Add these as exported types at the top of the file for potential reuse.

**Why it's a good first issue:**
- Pure TypeScript typing task
- No runtime logic changes
- Teaches you about the API response patterns
- Easy to verify with TypeScript compiler

**Expected difficulty:** Easy

---

### Issue 4: Document rate limit constants in `lib/rate-limit.ts`

**Files to look at:** `lib/rate-limit.ts` (lines 1-16)

**What needs to be done:**
The rate limiter module has a `NOTE` comment about avoiding background intervals in serverless environments (line 13-16), but it could be expanded into proper JSDoc documentation. Add:
- Module-level JSDoc explaining the in-memory rate limiter purpose
- Document the `RateLimitEntry` interface with proper JSDoc
- Note when to use the in-memory vs Redis-backed rate limiter

**Why it's a good first issue:**
- Documentation-only change
- Single file, well-defined scope
- Teaches you about the project's rate limiting approach
- No code logic changes

**Expected difficulty:** Easy

---

### Issue 5: Add missing `size` prop validation in `BookmarkButton`

**Files to look at:** `app/components/BookmarkButton.tsx` (lines 9-16, 30-40)

**What needs to be done:**
The `BookmarkButton` component accepts a `size` prop with type `'sm' | 'md' | 'lg'` and has corresponding `sizeClasses` and `buttonSizeClasses` objects. However, there's no runtime validation. Add a simple check at the start of the component that defaults to `'md'` if an invalid value is passed (defensive coding).

This ensures the component won't break if someone passes an invalid size value.

**Why it's a good first issue:**
- Simple validation logic
- Clear cause and effect
- Teaches component prop handling patterns
- Low-risk change with defensive intent

**Expected difficulty:** Easy/Medium

---

## Getting Help

If you have questions about any of these issues:
1. Check the existing codebase to understand patterns
2. Look at similar implementations for consistency
3. Feel free to ask in issues/comments if something is unclear

## PR Guidelines

- Keep changes focused and small
- Include a brief description of what you changed
- Test locally before submitting
- Follow the existing code style and patterns