import { readFileSync } from 'fs';
import path from 'path';

describe('Prisma schema indexes', () => {
  it('contains recommended composite indexes for NewsletterSubscriber and ContactSubmission', () => {
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma');
    const content = readFileSync(schemaPath, 'utf8');

    expect(content).toMatch(/@@index\(\[status, subscribedAt\]\)/);
    expect(content).toMatch(/@@index\(\[status, email\]\)/);
    expect(content).toMatch(/@@index\(\[status, createdAt\]\)/);
    expect(content).toMatch(/@@index\(\[email, createdAt\]\)/);
  });
});
