# 🤝 Contributing to VibeCI

Thank you for your interest in improving **VibeCI**! Whether you contribute bug fixes, new check runners, MCP tool enhancements, or documentation, your help is appreciated.

---

## 🧭 Quick Overview

* Fork the repo, create a branch, make small focused changes, and open a PR.
* Read our `CODE_OF_CONDUCT.md` and follow it.
* Run `npm run typecheck` and `npm run build` before opening a pull request.

---

## 🍴 How to Contribute (Step-by-Step)

### 1) Fork the Repository
Click the **Fork** button on the GitHub repository.

### 2) Clone Your Fork
```bash
git clone https://github.com/<your-username>/the_dev_pocket.git
cd the_dev_pocket
```

### 3) Create a Feature Branch
```bash
git checkout -b feat/short-description
# or
git checkout -b fix/short-description
```

### 4) Install Dependencies & Build
```bash
npm install
npm run build
```

### 5) Make Changes & Test Locally
* Ensure code compiles: `npm run typecheck`
* Build CLI bundle: `npm run build`
* Test CLI commands locally: `npx tsx src/index.ts --help`
* Ensure the anti-cheat auditor passes: `npx tsx src/index.ts verify`

### 6) Commit & Push
```bash
git add .
git commit -m "feat(core): add new environment gap detector"
git push -u origin feat/short-description
```

### 7) Open a Pull Request
Open a PR against the `main` branch with a clear description of the problem solved.

---

## ✅ Pull Request Checklist

* [ ] PR has a clear title and description explaining the change.
* [ ] Changes are focused and minimal.
* [ ] TypeScript compiles cleanly (`npm run typecheck`).
* [ ] Build succeeds (`npm run build`).
* [ ] No anti-cheat violations or disabled rules introduced.
* [ ] Documentation updated if CLI options or MCP tools changed.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
