## Summary
- improve heading and supporting text contrast in the homepage support/help section
- strengthen card title, description, and CTA text colors for better readability in dark mode
- add visible focus rings to help-section navigation cards so interactive states stay easier to track

## Testing
- `git diff --check`
- `npm.cmd run build` *(fails in this checkout because `prisma` is not available on PATH for the script)*
- `node node_modules\eslint\bin\eslint.js app/page.tsx` *(fails in this checkout because the local ESLint setup cannot resolve `next/core-web-vitals`)*

Fixes #343
