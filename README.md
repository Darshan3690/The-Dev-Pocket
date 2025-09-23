````markdown
# 📚 The Dev Pocket

The Dev Pocket is an open-source project built to empower **learners, students, and developers** with curated resources, roadmaps, and interactive tools. Whether you're starting out or leveling up, this project will guide you through the journey of web development and beyond.

<p align="center">
  <img src="https://img.shields.io/badge/Hacktoberfest-2025-blueviolet?style=for-the-badge&logo=hackaday" alt="Hacktoberfest Badge" />
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=for-the-badge" alt="Contributions Welcome" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="MIT License" />
  <img src="https://img.shields.io/github/stars/Darshan3690/The-Dev-Pocket?style=for-the-badge" alt="Repo Stars" />
  <img src="https://img.shields.io/github/forks/Darshan3690/The-Dev-Pocket?style=for-the-badge" alt="Repo Forks" />
</p>

---

## 🌟 Features

✨ Curated learning resources for **Web Development**, **DSA**, **AI/ML**, and more  
🛠️ Interactive tools for productivity and coding practice  
🎯 Step-by-step roadmaps for developers at all stages  
🌍 Open-source friendly with **Hacktoberfest participation**  
🤝 Community-driven contributions  

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React.js, TypeScript, Tailwind CSS  
- **Backend**: Next.js (API Routes), Node.js  
- **ORM**: Prisma  
- **Auth**: Clerk  
- **Database**: Supabase  
- **Deployment**: Vercel  

---

## 🚀 Getting Started (Developer Mode)

### 1️⃣ Fork & Clone Repo
```bash
git clone https://github.com/Darshan3690/The-Dev-Pocket.git
cd The-Dev-Pocket
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Supabase (Database)

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy the connection string and add it to your `.env.local` file:

```bash
DATABASE_URL=your_supabase_connection_string
```

### 4️⃣ Run Database Migrations

```bash
npx prisma generate
npx prisma db push
npx prisma studio   # optional, DB UI
```

### 5️⃣ Get API Keys & Configure Environment

**Clerk (Authentication):**

* Go to [Clerk Dashboard](https://dashboard.clerk.com)
* Create a new application
* Add the following to `.env.local`:

```bash
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
```

### 6️⃣ Run Locally

```bash
npm run dev
```

👉 Visit `http://localhost:3000`

---

## 🤝 Contributing

We love contributions from everyone! 💖

### 🚩 Before You Start

⭐ **First, star the repository** — show some love to the project!
🍴 Then, fork it and start contributing 🚀

### Steps to Contribute

1. **Star** this repository ⭐
2. **Fork** the repo
3. Create a feature branch

   ```bash
   git checkout -b feature-xyz
   ```
4. Commit your changes

   ```bash
   git commit -m "feat: add new xyz"
   ```
5. Push to your fork

   ```bash
   git push origin feature-xyz
   ```
6. Open a Pull Request 🚀

📌 Please read our [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE\_OF\_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

---

## 🎯 Hacktoberfest 2025

This project is part of **Hacktoberfest 2025**! 🌍✨

* Submit 6 PRs to win official swag 🎉
* Check the [issues](https://github.com/Darshan3690/The-Dev-Pocket/issues) tagged `hacktoberfest`, `good first issue`, or `help wanted`

---

## 👤 Main Contributor

A huge thanks to:

<a href="https://github.com/Darshan3690">
  <img src="https://avatars.githubusercontent.com/u/150865553?v=4" width="120px" style="border-radius: 50%;" alt="Darshan3690" />
</a>

**Darshan Kushwaha** – Creator & Maintainer 🚀
🔗 [Follow on GitHub](https://github.com/Darshan3690) | [Connect on LinkedIn](https://www.linkedin.com/in/darshan-kushwaha3690/)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it with friends

<p align="center">
  Made with ❤️ by <a href="https://github.com/Darshan3690">Darshan3690</a>
</p>
```
