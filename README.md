# 📓 Notebook Website

A **multi-user online notebook** where users can **create, view, and manage their own notes**. Built with **MERN (MongoDB, Express, React, Node.js)** and secured with **JWT authentication**. Each user has a private workspace, so notes are never shared across accounts.  

The frontend uses **React**, **TailwindCSS**, and **DaisyUI** for a clean and responsive interface.

---

## 🖼️ Features

- ✅ User Signup & Login (JWT + Cookies)  
- ✅ Create, edit, and delete personal notes  
- ✅ Each note is linked to a specific user  
- ✅ Protected routes (only authenticated users can access notes)  
- ✅ Responsive and modern UI with **Tailwind + DaisyUI**  
- ✅ Note detail page with full content view  
- ✅ Persistent authentication using cookies  

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, TailwindCSS, DaisyUI, react-cookie, react-hot-toast |
| Backend  | Node.js, Express.js, MongoDB (Mongoose), JWT, bcryptjs |
| Authentication | JWT tokens in cookies |
| Deployment | Optional: Vercel / Render / Heroku |

---

## 📁 Folder Structure 
notebook-app/
├─ backend/
│ ├─ controllers/
│ │ ├─ authController.js
│ │ └─ notesController.js
│ ├─ middleware/
│ │ └─ AuthMiddleware.js
│ ├─ models/
│ │ ├─ User.js
│ │ └─ Note.js
│ ├─ routes/
│ │ ├─ auth.js
│ │ └─ notes.js
│ ├─ server.js
├─ frontend/
│ ├─ src/
│ │ ├─ pages/
│ │ │ ├─ HomePage.jsx
│ │ │ ├─ Login.jsx
│ │ │ ├─ SignUp.jsx
│ │ │ ├─ CreatePage.jsx
│ │ │ └─ NoteDetailPage.jsx
│ │ ├─ App.jsx
│ │ └─ api.js
├─ package.json
├─ tailwind.config.js
└─ README.md


---

## ⚡ Getting Started

### 1. Clone the repository

git clone https://github.com/gelila-d/Notebook.git
cd Notebook

---
## 2. Install backend dependencies

cd backend
npm install

## 3. Set environment variables

Create a .env file in the backend/ folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## 4. Run backend server
npm run dev 

## 5. Install frontend dependencies
cd frontend/notebook
npm install

## 6. Run frontend server
npm run dev



## 🛡️ Authentication Flow

- User signs up → backend creates account + JWT token → stored in cookie

- User logs in → backend verifies credentials → JWT cookie sent

- Protected routes verify JWT → req.user.id used to fetch/create notes

- Users can only see their own notes

## 📌 Notes

- Make sure MongoDB is running locally or use a MongoDB Atlas connection

- Tailwind v3+ is required for the custom backgrounds and gradients

- Cookies are set with httpOnly: false for now; you can set true for more security

- Each note in the DB has a userId field to ensure multi-user separation

