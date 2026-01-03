# ✨ Feature Request

## 📋 Description

The application currently has **zero test coverage** - no unit tests, integration tests, component tests, or end-to-end tests. The `package.json` even has a placeholder test script that does nothing:

```json
"test": "echo \"No tests specified\" && exit 0"
```

For a production application handling user data, database operations, and authentication, this creates significant risks:
- No confidence in code changes
- Higher chance of bugs reaching production
- Difficult to refactor safely
- No regression testing
- Poor code documentation through tests

This feature request is to implement a comprehensive testing suite covering all critical application flows.

---

## 🤔 Motivation

**Why is testing critical?**

1. **Prevent regressions:** Ensure new features don't break existing functionality
2. **Safe refactoring:** Refactor with confidence knowing tests will catch breaks
3. **Code documentation:** Tests serve as living documentation
4. **Faster development:** Catch bugs early in development, not in production
5. **Better code quality:** Writing testable code improves architecture
6. **Onboarding:** New contributors can understand code through tests

**Current risks without tests:**
- Critical bugs like Prisma connection pool exhaustion went unnoticed
- XSS vulnerabilities not caught
- API validation errors only discovered in production
- Database schema changes could break application silently

---

## 🛠 Proposed Solution

Implement a comprehensive test suite using modern testing tools:

### 1. **Unit Tests (Jest + Testing Library)**

Test individual functions and utilities:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event jest-environment-jsdom
```

**Example test file structure:**
```
__tests__/
  ├── lib/
  │   ├── toast.test.tsx
  │   ├── accessibility.test.tsx
  │   └── error-handling.test.tsx
  ├── components/
  │   ├── Navbar.test.tsx
  │   ├── Footer.test.tsx
  │   └── GlobalSearch.test.tsx
  └── api/
      ├── contact.test.ts
      ├── newsletter.test.ts
      └── user-stats.test.ts
```

**Example unit test:**
```typescript
// __tests__/lib/toast.test.tsx
import { showSuccess, showError } from '@/lib/toast';

describe('Toast Utilities', () => {
  it('should display success toast', () => {
    const toast = showSuccess('Test message');
    expect(toast).toBeDefined();
  });

  it('should display error toast with custom duration', () => {
    const toast = showError('Error message', 5000);
    expect(toast).toBeDefined();
  });
});
```

### 2. **Integration Tests**

Test API routes with database interactions:

```typescript
// __tests__/api/contact.integration.test.ts
import { POST } from '@/app/api/contact/route';
import { PrismaClient } from '@prisma/client';

// Use a singleton Prisma client in tests to avoid exhausting the connection pool
// or mock Prisma entirely for unit tests. Example singleton pattern for tests:
//
// const prisma = (globalThis as any).__testPrisma ?? new PrismaClient();
// if (!(globalThis as any).__testPrisma) {
//   (globalThis as any).__testPrisma = prisma;
// }
//
// Also, clean up test data between tests (afterEach) to keep the test DB deterministic.

const prisma = new PrismaClient();

describe('Contact API Integration', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create contact submission', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });

  it('should reject invalid email', async () => {
    const request = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        message: 'Test message'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

### 3. **Component Tests**

Test React components with user interactions:

```typescript
// __tests__/components/Navbar.test.tsx
import { render, screen } from '@testing-library/react';
import Navbar from '@/app/components/Navbar';

describe('Navbar Component', () => {
  it('should render navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should show login button when signed out', () => {
    render(<Navbar />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
```

### 4. **E2E Tests (Playwright)**

Test critical user flows end-to-end:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

```typescript
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test('should submit contact form successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/contact');
  
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'Test message');
  
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.toast-success')).toBeVisible();
  await expect(page.locator('.toast-success')).toContainText('Message sent successfully');
});

test('should show validation error for empty fields', async ({ page }) => {
  await page.goto('http://localhost:3000/contact');
  
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.toast-error')).toBeVisible();
});
```

### 5. **Test Configuration**

**jest.config.js:**
```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
```

**package.json updates:**
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

### 6. **CI/CD Integration**

Add GitHub Actions workflow:

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: postgres
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: app_test
        ports:
          - 5432:5432
        options: >-
          --health-cmd="pg_isready -U postgres"
          --health-interval=10s
          --health-timeout=5s
          --health-retries=5
    env:
      DATABASE_URL: postgres://postgres:postgres@localhost:5432/app_test
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm start &
      - run: npx playwright install --with-deps
      - run: npm run test:coverage
      - run: npm run test:e2e


> Note: For Playwright E2E tests, ensure the app is running (above we start the server), or use Playwright's `webServer` setting in `playwright.config.ts` to auto-start the app. Also ensure `DATABASE_URL` or a test DB is accessible in CI. For forked PRs that include workflows which run tests or deploy previews, a repository maintainer will need to approve the workflow run and authorize any Vercel preview deployments.
```

---

## 🔄 Alternatives Considered

1. **Vitest instead of Jest**
   - Pros: Faster, better TypeScript support
   - Cons: Less mature ecosystem
   
2. **Cypress instead of Playwright**
   - Pros: Better debugging UI
   - Cons: Slower, less powerful

3. **No testing (current state)**
   - Pros: Faster initial development
   - Cons: Technical debt, production bugs, unsafe refactoring

---

## 📸 Screenshots / Mockups

**Coverage report example:**
```
------------------|---------|----------|---------|---------|-------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|-------------------
All files         |   85.71 |    78.26 |   82.35 |   85.71 |
 lib              |   92.31 |    88.89 |   90.91 |   92.31 |
  toast.tsx       |     100 |      100 |     100 |     100 |
  utils.ts        |   84.62 |    77.78 |   81.82 |   84.62 | 23-25,42
 app/api          |   78.95 |    66.67 |   75.00 |   78.95 |
  contact/route.ts|   80.00 |    70.00 |   75.00 |   80.00 | 45-47
------------------|---------|----------|---------|---------|-------------------
```

---

## 💻 Additional Context

**Testing priority order:**

1. **Critical (Week 1):**
   - API route tests (prevent data corruption)
   - Database operation tests (prevent data loss)
   - Authentication flow tests

2. **High (Week 2):**
   - Component tests for forms
   - E2E tests for critical user paths
   - Utility function tests

3. **Medium (Week 3):**
   - UI component tests
   - Edge case coverage
   - Performance tests

4. **Low (Week 4):**
   - Visual regression tests
   - Accessibility tests
   - Load tests

**Resources needed:**
- 2-3 weeks development time
- Testing library setup (~1 day)
- Writing initial tests (~1-2 weeks)
- CI/CD integration (~1 day)

**Benefits:**
- 80%+ code coverage goal
- Catch bugs before production
- Confident deployments
- Better code quality
- Easier onboarding for contributors

---

🙏 Thank you for considering this critical improvement to The Dev Pocket's code quality and reliability!
