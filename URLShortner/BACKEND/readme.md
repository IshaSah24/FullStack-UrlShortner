# 📦 FullStack URL Shortener - Backend

This is the **backend service** for the FullStack URL Shortener project.  
It is built with **Node.js**, **Express.js**, and **MongoDB** to handle:
- User authentication (login & register)
- URL shortening logic
- Redirecting short URLs to their original destinations
- API endpoints for the frontend

---

## 🚀 Tech Stack
- **Node.js** — JavaScript runtime
- **Express.js** — Backend framework
- **MongoDB + Mongoose** — Database & ODM
- **JWT** — Authentication
- **dotenv** — Environment configuration

---

## 📂 Folder Structure
BACKEND/
│-- src/
│ ├── config/ # DB connection and environment config
│ ├── controller/ # Request handlers
│ ├── DAO/ # Database access layer
│ ├── middlewares/ # Authentication & error handling
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── services/ # Business logic
│ ├── utils/ # Helper functions
│-- server.js # Entry point
│-- package.json # Dependencies
│-- .env.example # Sample env variables