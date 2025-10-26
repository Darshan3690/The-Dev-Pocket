# 🔄 Loading States & Skeletons Documentation

## Overview
A comprehensive collection of beautiful loading states and skeleton components for The Dev Pocket. This feature provides a professional loading experience throughout the application with customizable spinners, skeleton loaders, and loading overlays.

---

## 📦 Components

### Skeleton Components
Located in: `app/components/ui/Skeleton.tsx`

#### 1. **Basic Skeleton**
```tsx
import { Skeleton } from '@/app/components/ui/Skeleton';

<Skeleton 
  variant="text | circular | rectangular | rounded"
  width={200}
  height={20}
  animation="pulse | wave | none"
/>
```

**Props:**
- `variant`: Shape of the skeleton
  - `text`: Small rounded skeleton for text (default height: 16px)
  - `circular`: Perfect circle for avatars
  - `rectangular`: Sharp corners for boxes
  - `rounded`: Rounded corners for cards/images
- `width`: Width in pixels or CSS string (e.g., "100%", "50%")
- `height`: Height in pixels or CSS string
- `animation`: Animation type
  - `pulse`: Subtle breathing effect (default)
  - `wave`: Shimmer wave from left to right
  - `none`: No animation
- `className`: Additional Tailwind classes

#### 2. **Skeleton Card**
Pre-built skeleton for card layouts
```tsx
import { SkeletonCard } from '@/app/components/ui/Skeleton';

<SkeletonCard />
```

Includes:
- Image placeholder (200px height)
- 3 text lines with varying widths

#### 3. **Skeleton List Item**
Pre-built skeleton for list items
```tsx
import { SkeletonListItem } from '@/app/components/ui/Skeleton';

<SkeletonListItem />
```

Includes:
- Circular avatar (48px)
- 2 text lines (title + subtitle)

#### 4. **Skeleton Dashboard Card**
Pre-built skeleton for dashboard stat cards
```tsx
import { SkeletonDashboardCard } from '@/app/components/ui/Skeleton';

<SkeletonDashboardCard />
```

Includes:
- Header text with icon
- Large stat number
- Small description text

#### 5. **Skeleton Table**
Pre-built skeleton for tables
```tsx
import { SkeletonTable } from '@/app/components/ui/Skeleton';

<SkeletonTable 
  rows={5}      // Number of data rows
  columns={4}   // Number of columns
/>
```

Includes:
- Table header row
- Multiple data rows

#### 6. **Skeleton Avatar**
```tsx
import { SkeletonAvatar } from '@/app/components/ui/Skeleton';

<SkeletonAvatar size={48} />
```

#### 7. **Skeleton Text Block**
```tsx
import { SkeletonTextBlock } from '@/app/components/ui/Skeleton';

<SkeletonTextBlock lines={3} />
```

#### 8. **Skeleton Image**
```tsx
import { SkeletonImage } from '@/app/components/ui/Skeleton';

<SkeletonImage aspectRatio="16/9" />
```

---

### Spinner Components
Located in: `app/components/ui/Spinner.tsx`

#### 1. **Basic Spinner**
```tsx
import { Spinner } from '@/app/components/ui/Spinner';

<Spinner 
  size="sm | md | lg | xl"
  variant="default | gradient | dots"
/>
```

**Sizes:**
- `sm`: 16px (4x4) - For buttons
- `md`: 32px (8x8) - For cards
- `lg`: 48px (12x12) - For sections
- `xl`: 64px (16x16) - For full page

**Variants:**
- `default`: Simple circular spinner with border
- `gradient`: Colorful gradient conic spinner (blue→purple)
- `dots`: Three bouncing dots (blue, purple, pink)

#### 2. **Loading Overlay**
Full-screen loading state with backdrop blur
```tsx
import { LoadingOverlay } from '@/app/components/ui/Spinner';

<LoadingOverlay message="Processing your request..." />
```

**Features:**
- Full-screen backdrop with blur
- Centered spinner with gradient effect
- Optional message below spinner
- Dark backdrop (50% opacity)

#### 3. **Inline Loader**
Small loader for buttons and inline use
```tsx
import { InlineLoader } from '@/app/components/ui/Spinner';

<InlineLoader text="Loading..." />
```

#### 4. **Page Loader**
Full-page loading state for route transitions
```tsx
import { PageLoader } from '@/app/components/ui/Spinner';

<PageLoader 
  title="Loading Dashboard..." 
  subtitle="Please wait while we fetch your data"
/>
```

**Features:**
- Full-screen gradient background
- Large gradient spinner
- Title with gradient text
- Optional subtitle
- Centered layout

#### 5. **Button Spinner**
Tiny spinner specifically for buttons
```tsx
import { ButtonSpinner } from '@/app/components/ui/Spinner';

<button disabled={loading}>
  {loading ? <ButtonSpinner /> : 'Submit'}
</button>
```

---

## 🎨 Usage Examples

### 1. Loading Data in a Component
```tsx
'use client';

import { useState, useEffect } from 'react';
import { SkeletonCard } from '@/app/components/ui/Skeleton';

export default function MyComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return <YourActualContent data={data} />;
}
```

### 2. Loading Button State
```tsx
'use client';

import { useState } from 'react';
import { ButtonSpinner } from '@/app/components/ui/Spinner';

export default function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    await submitForm();
    setLoading(false);
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={loading}
      className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-70"
    >
      {loading ? (
        <>
          <ButtonSpinner className="mr-2" />
          <span>Submitting...</span>
        </>
      ) : (
        'Submit'
      )}
    </button>
  );
}
```

### 3. Loading Overlay for Actions
```tsx
'use client';

import { useState } from 'react';
import { LoadingOverlay } from '@/app/components/ui/Spinner';

export default function MyPage() {
  const [processing, setProcessing] = useState(false);

  const handleDelete = async () => {
    setProcessing(true);
    await deleteItems();
    setProcessing(false);
  };

  return (
    <>
      {processing && <LoadingOverlay message="Deleting items..." />}
      <button onClick={handleDelete}>Delete All</button>
    </>
  );
}
```

### 4. Next.js Loading UI with Suspense
Create a `loading.tsx` file in your app route:

```tsx
// app/dashboard/loading.tsx
import { SkeletonDashboardCard } from '@/app/components/ui/Skeleton';

export default function DashboardLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <SkeletonDashboardCard />
      <SkeletonDashboardCard />
      <SkeletonDashboardCard />
      <SkeletonDashboardCard />
    </div>
  );
}
```

Then in your layout:
```tsx
import { Suspense } from 'react';
import { InlineLoader } from '@/app/components/ui/Spinner';

export default function Layout({ children }) {
  return (
    <Suspense fallback={<InlineLoader text="Loading..." />}>
      {children}
    </Suspense>
  );
}
```

---

## 🎯 Best Practices

### 1. Match Skeleton to Content
Your skeleton should mirror the actual content structure:
```tsx
// If your actual content looks like this:
<div className="flex items-center gap-4">
  <img className="w-12 h-12 rounded-full" />
  <div>
    <h3>John Doe</h3>
    <p>Developer</p>
  </div>
</div>

// Your skeleton should look like this:
<div className="flex items-center gap-4">
  <Skeleton variant="circular" width={48} height={48} />
  <div className="flex-1 space-y-2">
    <Skeleton variant="text" width="60%" />
    <Skeleton variant="text" width="40%" />
  </div>
</div>
```

### 2. Use Appropriate Animation
- **Pulse**: Best for most cases, subtle and professional
- **Wave**: Good for highlighting loading, but can be distracting if overused
- **None**: Use for static placeholders or when animation might cause performance issues

### 3. Consider Dark Mode
All components automatically support dark mode:
```tsx
// This works in both light and dark mode
<Skeleton variant="text" />
```

### 4. Accessibility
- Loading states should announce to screen readers
- Use `aria-live` regions for dynamic content
- Provide meaningful loading messages

```tsx
<div aria-live="polite" aria-busy="true">
  <span className="sr-only">Loading dashboard data</span>
  <SkeletonDashboardCard />
</div>
```

### 5. Performance
- Use CSS animations (already implemented) instead of JavaScript
- Avoid too many animated elements on one page
- Consider using `animation="none"` for many simultaneous skeletons

---

## 🎨 Customization

### Custom Skeleton Widths
```tsx
<Skeleton variant="text" width="100%" />
<Skeleton variant="text" width="80%" />
<Skeleton variant="text" width="60%" />
```

### Custom Colors
Use className to override:
```tsx
<Skeleton 
  variant="rounded"
  className="bg-blue-200 dark:bg-blue-800"
/>
```

### Custom Animation Duration
Modify in `globals.css`:
```css
.animate-shimmer {
  animation: shimmer 2s infinite linear; /* Change 2s to your preference */
}
```

---

## 📁 File Structure

```
app/
├── components/
│   └── ui/
│       ├── Skeleton.tsx      # All skeleton variants
│       └── Spinner.tsx        # All spinner variants
├── dashboard/
│   └── loading.tsx            # Dashboard loading state
├── loading-demo/
│   └── page.tsx               # Demo page showcasing all loaders
└── globals.css                # Shimmer animation keyframes

lib/
└── utils.ts                   # cn() className utility
```

---

## 🚀 Demo Page

Visit `/loading-demo` to see:
- All spinner variants and sizes
- Interactive button loading demo
- Overlay and page loader demos
- All skeleton component types
- Usage examples and code snippets

---

## 🔧 Dependencies

```json
{
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.5"
}
```

Install with:
```bash
npm install clsx tailwind-merge
```

---

## 📊 Component Summary

| Component | Use Case | Props | Variants |
|-----------|----------|-------|----------|
| `Skeleton` | Basic placeholders | variant, width, height, animation | text, circular, rectangular, rounded |
| `SkeletonCard` | Card layouts | className | - |
| `SkeletonListItem` | List items | className | - |
| `SkeletonDashboardCard` | Dashboard stats | className | - |
| `SkeletonTable` | Tables | rows, columns | - |
| `Spinner` | Loading indicators | size, variant | default, gradient, dots |
| `LoadingOverlay` | Full-screen loading | message | - |
| `InlineLoader` | Inline loading | text | - |
| `PageLoader` | Page transitions | title, subtitle | - |
| `ButtonSpinner` | Button loading | className | - |

---

## 💡 Tips

1. **Consistent Loading Experience**: Use the same loading patterns across your app
2. **Quick Feedback**: Show loading states for operations longer than 300ms
3. **Perceived Performance**: Skeleton screens make the app feel faster
4. **Graceful Degradation**: Always have fallback loading states
5. **Test Both Modes**: Verify loaders look good in light and dark mode

---

## 📝 License

Part of The Dev Pocket project. See main LICENSE file.

---

**Happy Loading! 🎉**
