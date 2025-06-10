# 📽️ Video Insight Summarizer — Full Stack App

This is a production-grade full-stack application that summarizes YouTube videos using OpenAI. It features authentication, summary history, upgrade to premium via Paddle, and an admin dashboard.

---

## 🔧 Tech Stack

* **Frontend:** React (Vite), Tailwind CSS, React Router
* **Backend:** Node.js, Express, MongoDB (Mongoose)
* **Auth:** JWT
* **AI:** OpenAI (GPT-3.5)
* **Payments:** Paddle
* **Deployment:** Vercel (frontend), Render (backend)

---

## ✨ Features

* ✅ User Signup/Login (JWT-based)
* ✅ Paste YouTube URL → Fetch metadata
* ✅ Generate summary using OpenAI
* ✅ Summary history + daily free quota
* ✅ Paddle upgrade integration
* ✅ Admin dashboard to view all users

---

## 📁 Project Structure

```
video-insight-summarizer/
├── backend/
│   └── src/
│       ├── routes/, controllers/, db/, middleware/
├── frontend/
│   └── src/
│       ├── pages/, components/, api/, context/
```

---

## 🧠 Local Setup

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

#### Create `.env`

```env
PORT=4000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_key
YOUTUBE_API_KEY=your_youtube_key
PADDLE_PUBLIC_KEY=your_paddle_key
PADDLE_VENDOR_ID=your_vendor_id
```

#### Start Backend

```bash
npm run dev
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### Create `.env`

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

#### Start Frontend

```bash
npm run dev
```

---

## 🚀 Deployment

### Backend (Render)

* Connect GitHub repo
* Root: `backend/`
* Set env vars (same as `.env`)
* Start command: `npm run start`

### Frontend (Vercel)

* Connect GitHub repo
* Root: `frontend/`
* Build: `npm run build`
* Output: `dist`
* Env var:

```env
VITE_API_BASE_URL=https://your-backend.onrender.com/api
```

---

## 🔐 Paddle Integration Notes

* Use test-mode product for testing
* Add webhook in Paddle dashboard pointing to: `https://your-backend.onrender.com/api/paddle/webhook`

---

## ✅ API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### YouTube

* `POST /api/youtube/metadata` → `{ url }`

### Summary

* `POST /api/summary/summarize` → `{ videoId, title }`
* `GET /api/user/summaries`

### Admin

* `GET /api/admin/users`

---

## 👤 Admin Access

Manually set a user's role to `admin` in MongoDB to access the admin panel.

---

## 🧪 Testing

* Use Postman to hit API routes
* Log in, summarize, check summary limit
* Upgrade via Paddle and verify `isPremium` in DB

---

## ✍️ Author

Built with ❤️ by Vikas Singh
