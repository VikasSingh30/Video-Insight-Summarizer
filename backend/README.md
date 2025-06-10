# 🎥 Video Insight Summarizer — Backend

This is the production-grade backend for the Video Insight Summarizer app. It allows users to paste YouTube URLs, generate AI-powered video summaries using OpenAI, and access summaries via a dashboard. Premium access is handled via Paddle payments.

---

## 🚀 Features

- ✅ JWT Auth (signup/login)
- ✅ YouTube video metadata via YouTube Data API
- ✅ AI summary generation via OpenAI API
- ✅ Summary history + MongoDB storage
- ✅ Daily free quota enforcement (3/day)
- ✅ Paddle webhook integration for premium upgrade
- ✅ Admin dashboard to view all users
- ✅ Modular, secure, production-style Express setup

---

## 🧱 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- OpenAI API (GPT-3.5 Turbo)
- YouTube Data API v3
- Paddle (test mode)
- JWT + bcrypt
- Gitpod / Postman (for testing)

---

## API

- POST /api/auth/signup
- POST /api/youtube/metadata
- POST /api/summary/summarize
- GET /api/admin/users (admin only)

---

## 🌐 Environment Variables

```bash
PORT=4000
MONGO_URI=
JWT_SECRET=
OPENAI_API_KEY=
YOUTUBE_API_KEY=
PADDLE_PUBLIC_KEY=
PADDLE_VENDOR_ID=
```
---

## 🧪 Testing
Use Postman or frontend UI to test: 

 - Signup/Login
 - Fetch YouTube metadata
 - Generate summary (limited to 3/day for free)
 - Admin routes (with role check)
 - Paddle webhook (mocked in test mode)

---

## 🛡 Security Notes

- All API keys loaded via dotenv
- JWT used for route protection
- Quotas + role-based access
- Input validation and rate-limiting recommended for production

