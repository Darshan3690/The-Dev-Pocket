Summary:

- Adds recommended composite DB indexes to improve query performance and avoid full-table scans under load.
- Changes made to `prisma/schema.prisma`:
  - `NewsletterSubscriber`: added `@@index([status, subscribedAt])` and `@@index([status, email])`.
  - `ContactSubmission`: added `@@index([status, createdAt])` and `@@index([email, createdAt])`.
- Adds a static unit test `__tests__/prisma/indexes.test.ts` that asserts the schema contains the new indexes.

How to verify locally:
1. Review `prisma/schema.prisma` for new indexes.
2. Run `npm test` to run the static schema test.
3. To apply to the database, run `npx prisma migrate dev --name add-db-indexes` in an environment with a configured `DATABASE_URL`.

Notes:
- Creating the actual migration will alter the database schema. I did not run `prisma migrate` here (no DB access in CI for forks). Please run migrations in your environment or I can add a migration script in a follow-up if you want.
- This PR includes documentation in `bug-reports/BUG-029-db-indexes.md` explaining rationale and reproduction steps.

Refs: BUG-029
