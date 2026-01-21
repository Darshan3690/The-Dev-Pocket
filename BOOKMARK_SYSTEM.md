# Bookmark System Documentation

## Overview

The Bookmark System allows users to save, organize, and quickly access their favorite developer resources directly within The Dev Pocket platform. It supports both authenticated users (with database storage) and guest users (with local storage).

## Features

- ✅ **Save Resources**: Bookmark any resource with title, URL, description, and category
- ✅ **Local Storage Fallback**: Works for guest users without authentication
- ✅ **Database Storage**: Persistent storage for authenticated users
- ✅ **Categories**: Organize bookmarks by Frontend, Backend, DevOps, Learning, Tools, etc.
- ✅ **Search & Filter**: Find bookmarks quickly with search and category filters
- ✅ **Duplicate Prevention**: Prevents saving the same URL twice
- ✅ **Responsive UI**: Works seamlessly on desktop and mobile

## Components

### BookmarkButton
Reusable component that can be added to any resource card.

```tsx
import BookmarkButton from '@/app/components/BookmarkButton'

<BookmarkButton
  title="React Documentation"
  url="https://react.dev"
  description="Official React docs"
  category="Frontend"
  size="md"
/>
```

### Bookmarks Page
Full-featured page for managing saved bookmarks at `/dashboard/bookmarks`.

## API Endpoints

### GET /api/bookmarks
Fetch user's bookmarks with optional category filter.

```typescript
// Get all bookmarks
const response = await fetch('/api/bookmarks')

// Get bookmarks by category
const response = await fetch('/api/bookmarks?category=Frontend')
```

### POST /api/bookmarks
Create a new bookmark.

```typescript
const response = await fetch('/api/bookmarks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Resource Title',
    url: 'https://example.com',
    description: 'Optional description',
    category: 'Frontend',
    tags: ['react', 'javascript']
  })
})
```

### DELETE /api/bookmarks/[id]
Remove a bookmark.

```typescript
const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
  method: 'DELETE'
})
```

## Database Schema

```prisma
model Bookmark {
  id          String   @id @default(uuid())
  userId      String
  title       String
  url         String
  description String?
  category    String   @default("General")
  tags        String[] @default([])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, url])
  @@index([userId])
  @@index([category])
}
```

## Local Storage Structure

For guest users, bookmarks are stored in localStorage with key `dev-pocket-bookmarks`:

```typescript
interface Bookmark {
  id: string
  title: string
  url: string
  description?: string
  category: string
  tags: string[]
  createdAt: string
}
```

## Usage Examples

### Adding Bookmark Button to Resource Cards

```tsx
// In any component with resources
import BookmarkButton from '@/app/components/BookmarkButton'

const ResourceCard = ({ resource }) => (
  <div className="resource-card">
    <div className="header">
      <h3>{resource.title}</h3>
      <BookmarkButton
        title={resource.title}
        url={resource.url}
        description={resource.description}
        category={resource.category}
      />
    </div>
    {/* Rest of card content */}
  </div>
)
```

### Using Bookmark Utilities

```typescript
import { localBookmarks, apiBookmarks } from '@/lib/bookmarks'
import { useUser } from '@clerk/nextjs'

const { isSignedIn } = useUser()

// Add bookmark
const bookmark = {
  title: 'React Docs',
  url: 'https://react.dev',
  category: 'Frontend',
  tags: []
}

if (isSignedIn) {
  await apiBookmarks.add(bookmark)
} else {
  localBookmarks.add(bookmark)
}

// Check if bookmark exists
const exists = isSignedIn 
  ? await apiBookmarks.exists(url)
  : localBookmarks.exists(url)
```

## Categories

Available bookmark categories:
- General
- Frontend
- Backend
- DevOps
- Learning
- Tools
- Documentation

## Testing

Run bookmark tests:
```bash
npm test __tests__/bookmarks/bookmark.test.tsx
```

## Navigation

- **Main Navigation**: Resources link in navbar
- **Dashboard**: "My Bookmarks" in sidebar
- **Quick Access**: Bookmark buttons on resource cards

## Future Enhancements

- [ ] User-defined tags
- [ ] Sync across devices
- [ ] Recommendation system based on saved resources
- [ ] Export/import bookmarks
- [ ] Bookmark collections/folders
- [ ] Social sharing of bookmark collections