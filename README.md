# GLOSS - Car Detailing Marketplace PWA

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example` and add your Supabase credentials

3. Run development server:
```bash
npm run dev
```


# 🌐 GLOSS

GLOSS is a modern, security-first Progressive Web App (PWA) built with a Supabase-native architecture.  
It is designed as a scalable SaaS foundation with authentication, protected routing, and modular future systems.

---

## 🚀 CURRENT STATE

GLOSS is currently in active development and has transitioned from a hybrid prototype (manual auth + SQL Server experiments) into a **Supabase-first architecture**.

### ✔ Current progress:
- Supabase Auth integrated
- Database migrations initialized (001 executed)
- Row Level Security (RLS) enabled
- Git repository cleaned from node_modules tracking
- Project structure being normalized for SaaS scalability

---

## ⚙️ TECH STACK
- React 18
- Vite
- Tailwind CSS
- React Router
- Supabase (auth, database, storage)

### Frontend
- React (Vite)
- React Router DOM
- Context API (Auth layer)
- TailwindCSS

### Backend / BaaS
- Supabase
  - Authentication
  - PostgreSQL Database
  - Row Level Security (RLS)
  - Real-time capabilities

### Security Model
- JWT-based authentication (Supabase Auth)
- RLS-based authorization
- User-scoped data access via `auth.uid()`
- Stateless session management

---

## 🧱 ARCHITECTURE OVERVIEW

GLOSS follows a **serverless SaaS architecture**:
- `/src/pages` - Main screens
- `/src/components` - Reusable components
- `/src/context` - Global state (AuthContext)
- `/src/utils` - Helper functions
- `/public` - PWA manifest and static assets

GLOSS-PWA-TEST/
│
├── src/ # React frontend
├── public/
│
├── supabase/
│ ├── migrations/ # database versioning
│ └── seed.sql
│
├── docs/ # development documentation
│ ├── completed_tasks.md
│ ├── auth_migration.md
│ ├── development_log.md
│
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── .env.example

## 📌 DEVELOPMENT RULES

- No sensitive data in Git (`.env` excluded)
- No `node_modules` tracked
- All DB changes must go through `supabase/migrations`
- All architecture decisions documented in `/docs`

---

## 🧠 FUTURE ROADMAP

Planned evolution of GLOSS:

- SaaS real structure (multi-module architecture)
- Clean AuthContext (React + Supabase abstraction layer)
- Protected routes system
- Full RLS policy implementation
- Profiles system (user identity layer)
- Dashboard base (analytics + user panel)
- SENTRY module (behavioral anomaly / data manipulation detection system)

---

## 🎯 VISION

GLOSS aims to become a **secure, modular SaaS foundation** capable of scaling into:

- analytics systems
- behavioral tracking tools
- data integrity monitoring systems
- user-centric dashboards

---

## 📍 STATUS

> Early-stage SaaS architecture in active development
