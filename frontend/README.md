# 📦 Video Insight Summarizer Frontend

This is the **React + Vite frontend** for the Video Insight Summarizer full-stack project. It connects to a backend API to provide AI-powered summaries of YouTube videos, user authentication, summary history, quota limits, and premium upgrades.

---

## 🛠 Tech Stack

* React (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* Context API (for JWT auth)

---

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── api/           # Axios setup
│   ├── context/       # AuthContext
│   ├── components/    # Reusable UI components (e.g., Navbar)
│   ├── pages/         # Page components
│   ├── App.jsx        # Route definitions
│   ├── main.jsx       # Root entry
│   └── index.css      # Tailwind styles
```

---

## ⚙️ Setup & Run

### 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Create `.env` File

```
VITE_API_BASE_URL=http://localhost:4000/api
```

> Replace with your deployed backend URL when in production.

### 3️⃣ Start Dev Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🚀 Deployment (Vercel)

1. Push `frontend/` to GitHub
2. Go to [https://vercel.com](https://vercel.com) → New Project
3. Set:

   * **Root directory**: `frontend`
   * **Build command**: `npm run build`
   * **Output directory**: `dist`
   * **Environment Variable**:

     ```
     VITE_API_BASE_URL=https://your-backend.onrender.com/api
     ```
4. Deploy 🎉

---

## 🔐 Pages Overview

| Route        | Purpose                            |
| ------------ | ---------------------------------- |
| `/`          | Login                              |
| `/signup`    | Register                           |
| `/home`      | Paste YouTube URL & fetch metadata |
| `/summary`   | Show OpenAI-generated summary      |
| `/dashboard` | History, quota used                |
| `/upgrade`   | Upgrade to premium via Paddle      |
| `/admin`     | Admin panel to view all users      |

---

## ✅ Features

* JWT Auth & Protected Routes
* YouTube metadata fetch
* AI Summary with OpenAI
* User summary history
* Quota system for free users
* Paddle upgrade integration
* Admin-only user management

---

## 🧪 Dev Tips

* Dev backend must run at `localhost:4000`
* API requests auto-include JWT via Axios
* Quota/premium logic handled by backend

---

## ✍️ Author

Frontend built with 💙 by Vikas Singh
