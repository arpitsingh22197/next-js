# 🔐 Next.js Full Stack Auth System (with MongoDB + TypeScript)

A modern, secure authentication system built with **Next.js App Router**, **MongoDB**, and **TypeScript**. Features include **sign up**, **login**, **profile page**, and **JWT-based authentication** with a **dark/light theme toggle**.

---

## ✨ Features

- ✅ Sign Up & Login with JWT Authentication
- 👤 Protected User Profile Page
- 🗃 MongoDB Integration with Mongoose
- 🔐 Middleware-based Route Protection
- 🌙 Dark/Light Theme Toggle
- 🛠️ TypeScript Support
- 🎨 Tailwind CSS Styling

---

## 🧾 Folder Structure

```plaintext
src/
├── app/
│   ├── api/users/
│   │   ├── login/
│   │   ├── logout/
│   │   ├── me/
│   │   ├── singup/
│   │   │   └── route.ts
│   │   └── verifyemail/
│   ├── login/
│   │   └── page.tsx
│   ├── profile/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── singup/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── dbConfig/
├── helpers/
├── models/
│   └── userModel.js
├── middleware.ts
├── public/
├── styles/
│   └── globals.css
└── .env
