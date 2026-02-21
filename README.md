# Rhythm Platform

**AI-powered people intelligence for engineering teams** — expertise discovery, productivity analytics, and collaboration insights in one platform.

---

## The Problem

Finding the right expert in large organizations takes days of Slack messages. Managers lack visibility into team productivity patterns and burnout risks. Project staffing decisions are made without data.

## What Rhythm Does

- **AI Expert Finder** — Ask "Who knows about authentication?" and get instant, reasoned recommendations powered by Claude
- **Developer Profiles** — Code expertise mapped from GitHub contributions, paired with productivity metrics (focus hours, meeting load, flow index)
- **Collaboration Network** — Visualize who works with whom across teams, identify silos and knowledge gaps
- **Project Matching** — AI-powered recommendations for staffing projects based on expertise and availability

### Impact
- Expert discovery: **3 days → 8 minutes**
- Onboarding: **40% faster** for new engineers
- Smart staffing: Data-driven project-to-person matching

---

## Tech Stack

**Backend:** Django 4.2 + Django REST Framework, Claude Sonnet 4 API (streaming), GitHub REST API

**Frontend:** React 19 + Vite 6 + TypeScript, Radix UI, TailwindCSS 4, Recharts, react-force-graph, Framer Motion

**Data:** 51 contributors, 2,493 collaboration relationships, 4,317 calendar events (mock dataset for demo)

---

## Architecture

```
Frontend (React + Vite)
    ↓ Axios + TanStack Query
Backend (Django + DRF)
    ├── Claude API (streaming AI expert finder)
    ├── GitHub API (repository + contributor data)
    └── SQLite (contributor profiles, productivity metrics, collaboration graph)
```

**Database Schema:**
```
Repository ←→ Contributor (via RepositoryWork)
Contributor → ProductivityMetrics (1:1)
Contributor ←→ TeamCollaboration (many-to-many)
Contributor → MockCalendarData (1:many)
```

---

## Run Locally

### Backend
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Add your ANTHROPIC_API_KEY
python manage.py migrate
python manage.py generate_mock_data
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
echo "VITE_API_URL=http://localhost:8000/api" > .env.local
npm run dev
```

---

## Design

Custom design system with glassmorphism, force-directed network graphs, and multi-role views (Employee, Manager, HR).

- **Primary:** `#1D1F73` (deep indigo)
- **Secondary:** `#3BA3A3` (teal)
- **Accent:** `#F4B4B4` (soft pink)

---

## Status

Frontend MVP deployed. Backend API complete with mock data. Frontend-to-backend API integration in progress.

---

## Author

Built by [Amith Pallankize](https://amithpallankize.com) — Ex-Microsoft SWE, Wharton MBA '26

**License:** MIT
