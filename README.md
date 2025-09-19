# 📚 The Dev Pocket

The Dev Pocket is an open-source project built to empower **learners, students, and developers** with curated resources, roadmaps, and interactive tools. Whether you're starting out or leveling up, this project will guide you through the journey of web development and beyond.

![Hacktoberfest Badge](https://img.shields.io/badge/Hacktoberfest-2025-blueviolet?style=for-the-badge\&logo=hackaday)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=for-the-badge)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

---

## 🌟 Features

* 📖 Curated learning resources for **Web Development**, **DSA**, **AI/ML**, and more
* 🛠️ Interactive tools for productivity and coding practice
* 🎯 Step-by-step roadmaps for developers at all stages
* 🌍 Open-source friendly with **Hacktoberfest participation**
* 🤝 Community-driven contributions

---

## 🛠️ Tech Stack

* **Frontend**: Next.js, TypeScript, Tailwind CSS
* **Backend**: Node.js, Express, MongoDB (future scope)
* **Auth**: Clerk
* **Deployment**: Vercel / Netlify

---

## 🚀 Getting Started (Developer Mode)

Follow these steps to set up The Dev Pocket locally:

### 1. Fork & Clone Repo

```bash
git clone https://github.com/Darshan3690/The-Dev-Pocket.git
cd The-Dev-Pocket
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase (Database)

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Copy the connection string and add it to your `.env.local` file:

```bash
DATABASE_URL=your_supabase_connection_string
```

### 4. Run Database Migrations

```bash
npx prisma generate
npx prisma db push
npx prisma studio   # optional, DB UI
```

### 5. Get API Keys & Configure Environment

**Clerk (Authentication):**

* Go to [Clerk Dashboard](https://dashboard.clerk.com)
* Create a new application
* Add the following to `.env.local`:

```bash
CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
```

### 6. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## 🤝 Contributing

We love contributions from everyone! 💖

1. Fork this repository
2. Create a feature branch (`git checkout -b feature-xyz`)
3. Commit your changes (`git commit -m "feat: add new xyz"`)
4. Push to your fork (`git push origin feature-xyz`)
5. Open a Pull Request 🚀

📌 Please read our [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE\_OF\_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

---

## 🎯 Hacktoberfest 2025

This project is part of **Hacktoberfest 2025**! 🌍✨

* Submit 4 PRs to win official swag 🎉
* Check the [issues](https://github.com/Darshan3690/The-Dev-Pocket/issues) tagged `hacktoberfest`, `good first issue`, or `help wanted`

---

## 📸 Screenshots

Here are some previews of the project in action:

### Getting Started Setup

![Getting Started](docs/images/getting-started.png)

### Dashboard Preview

![Dashboard](docs/images/dashboard.png)

### Resource Page

![Resources](docs/images/resources.png)

---

## 👥 Contributors

Thanks goes to these wonderful people:

<a href="https://github.com/Darshan3690/The-Dev-Pocket/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Darshan3690/The-Dev-Pocket" />
</a>

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
  Made with ❤️ by <a href="https://github.com/Darshan3690">Darshan3690</a> & Contributors
</p>
