# 🤝 Contributing Guide

Thank you for your interest in improving **The Dev Pocket**! Your help is valued — whether you contribute code, documentation, designs, or ideas. This guide explains how to get started, what we expect from contributors, and how to make your first PR successful.

---

## 🧭 Quick overview

* Fork the repo, create a branch, make small focused changes, and open a PR.
* See `GOOD_FIRST_ISSUES.md` for bite-sized tasks.
* Read our `CODE_OF_CONDUCT.md` and follow it.

---

## 🍴 How to contribute (step-by-step)

### 1) Fork the repository

Click the **Fork** button in the top-right of the repository page.

![fork this repository](https://docs.github.com/assets/cb-34352/mw-1440/images/help/repository/fork-button.webp)

### 2) Clone your fork

```bash
# HTTPS
git clone https://github.com/<your-username>/The-Dev-Pocket.git
cd The-Dev-Pocket

# or SSH
git clone git@github.com:<your-username>/The-Dev-Pocket.git
cd The-Dev-Pocket
```

![clone this repository](https://docs.github.com/assets/cb-13128/mw-1440/images/help/repository/code-button.webp)

### 3) Create a feature branch

Always create a branch for your work:

```bash
git checkout -b feat/short-description
# or
git checkout -b fix/short-description
```

### 4) Make changes and commit

* Keep changes focused (one feature/fix per PR).
* Follow the existing code style.
* Use sensible commit messages (imperative tense):

```bash
git add .
git commit -m "feat(header): add dark mode toggle"
```

### 5) Test locally

Run the project locally to ensure nothing broke:

```bash
# if using pnpm
pnpm install
pnpm dev

# if using npm
npm install
npm run dev
```

### 6) Push your branch and open a PR

```bash
git push -u origin feat/short-description
```

Go to GitHub → your fork → **Compare & pull request** → pick the upstream `main` as the base and write a clear description.

![compare and pull request](https://camo.githubusercontent.com/e10bdcf31fb3f8ce863dc1dbf9269a23bce9263afcbe9a62d892e9b6e78df1c6/68747470733a2f2f6669727374636f6e747269627574696f6e732e6769746875622e696f2f6173736574732f526561646d652f636f6d706172652d616e642d70756c6c2e706e67)

![submit pull request](https://camo.githubusercontent.com/34a2cf737ba2f5943e3e469aa231e95a0ee4d0888c10dcaa169c1f8413d43333/68747470733a2f2f6669727374636f6e747269627574696f6e732e6769746875622e696f2f6173736574732f526561646d652f7375626d69742d70756c6c2d726571756573742e706e67)

---

## ✅ Pull request checklist (what we expect in a good PR)

* [ ] PR has a clear title and description explaining why the change is needed.
* [ ] Changes are small and focused.
* [ ] Code compiles and runs without errors.
* [ ] Added or updated documentation when applicable.
* [ ] All tests (if any) pass locally.
* [ ] No sensitive information (API keys, passwords) committed.

---

## 💡 What you can work on (ideas & good first issues)

* Add a dark-mode toggle & persist preference.
* Create `CourseCard` component and unit tests.
* Add a small seed script to populate example AI projects.
* Improve landing page accessibility (ARIA, alt text).
* Add missing images/social preview and update README.

Check `GOOD_FIRST_ISSUES.md` for more specific tasks with file pointers.

---

## 🧾 Issue & PR templates (examples)

**Issue template (short)**

```
Title: [bug|feature] Short description

## Describe the bug / feature
Steps to reproduce / expected behavior

## Environment
- OS:
- Browser:
- Node:

## Additional context
```

**PR template**

```markdown
## What does this PR do?
Short description of changes.

## Motivation
Why is this change needed?

## How to test
Steps to verify the change.

## Checklist
- [ ] I followed the contributing guide
- [ ] Tests added (if applicable)
- [ ] Documentation updated
```

---

## 🧰 Development setup (recommended)

1. Install dependencies: `pnpm install` (or `npm install`).
2. Create `.env.local` from `.env.example` and fill secrets (do not commit).
3. Start dev server: `pnpm dev` (or `npm run dev`).

If you prefer Docker or have a local database, include instructions in `README.md`.

---

## 🧑‍⚖️ Code style & commit conventions

* Use TypeScript for new code where possible.
* Keep formatting consistent (Prettier recommended).
* Commit messages: use conventional-ish format e.g. `feat:`, `fix:`, `docs:`.

---

## 👩‍🏫 Reviewing process & maintainers

* Maintainers will review PRs and request changes if needed.
* Be responsive to review comments — small changes help fast merges.
* If maintainers agree a PR is valid but cannot merge, they may tag it `hacktoberfest-accepted`.

---

## 🛡 Security & sensitive data

* Never add secrets, passwords, or private keys to the repo.
* If you discover a security issue, contact the maintainers privately (see `SECURITY.md` if present).

---

## 📬 Contact & support

* Open an issue for help or discussion.
* Join repository Discussions (if enabled) for broader conversation.

---

Thanks for contributing to **The Dev Pocket** — your work helps the whole community grow! 🚀
