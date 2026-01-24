# TODO: Implement Upstash Rate Limiting on API Routes

## Tasks
- [x] Update `/api/contact` POST to use Upstash rate limiter (5 requests/hour per IP)
- [x] Update `/api/newsletter` POST to use Upstash rate limiter (3 requests/hour per IP)
- [x] Add rate limiting to `/api/newsletter` DELETE (5 requests/hour per IP)
- [x] Update `/api/user-stats` GET to use Upstash rate limiter (60 requests/minute per user)
- [x] Test the changes to ensure rate limiting works correctly
