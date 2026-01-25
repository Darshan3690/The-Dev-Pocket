# TODO: Implement Resource Management System

## Database Model
- [ ] Add Resource model to prisma/schema.prisma with fields: id, title, description, url, category, tags (Json array), author, createdAt, updatedAt

## API Routes
- [ ] Create app/api/resources/route.ts for GET (list with search/filter/pagination) and POST (create)
- [ ] Create app/api/resources/[id]/route.ts for GET, PUT, DELETE individual resources

## Pages
- [ ] Create app/resources/page.tsx for listing resources with UI for search, filtering by category, pagination
- [ ] Create app/resources/[id]/page.tsx for viewing individual resource details

## Admin Dashboard
- [ ] Create app/dashboard/resources/page.tsx for admins to add/edit resources

## Followup Steps
- [ ] Set up environment variables (DATABASE_URL and DIRECT_URL) in .env file
- [ ] Run prisma generate and migrate
- [ ] Test API endpoints
- [ ] Ensure UI works with search and pagination
