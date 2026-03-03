# Rhythm Platform - Claude Code Context

## Project Overview

**Type**: Full-stack AI-powered people intelligence platform
**Status**: MVP complete — backend + frontend deployed
**Purpose**: Portfolio project for PM/product leadership roles
**Tech**: Django + React + Claude API + GitHub API

---

## What This Project Does

Unified platform for HR/People Ops teams that combines:
1. **AI Expert Finder**: "Who knows about authentication?" → Claude analyzes GitHub data → recommends developers
2. **Productivity Analytics**: Track focus hours, meeting load, burnout risk (like Dashboard Design mockup, but real)
3. **Collaboration Intelligence**: Visualize who works with who (from PR reviews, issue mentions)
4. **Project Matching**: AI recommendations for staffing projects based on expertise + availability

---

## Origin Story

This project **consolidates two previous explorations**:

### 1. claude-hack-Rhythm-main (Hackathon Project)
- **What it had**: Functional Django backend, GitHub integration, AI chat, force graphs
- **What we kept**: Entire backend, database, AI integration, data ingestion
- **Status**: Working, but basic UI

### 2. Rhythm Dashboard Design (Figma Export)
- **What it had**: Beautiful UI/UX for productivity analytics, Radix UI, polished design
- **What we kept**: Design system, color palette, UI patterns, Radix components
- **Status**: Static mockup with hardcoded data

### 3. rhythm-platform (This Consolidated Project)
- **Combines**: Hackathon's functional backend + Dashboard Design's beautiful UI
- **New additions**: ProductivityMetrics, TeamCollaboration, MockCalendarData models
- **Enhanced**: Multi-role views (Employee/Manager/HR), project matching

---

## Current Architecture

### Backend (`backend/`)
**Framework**: Django 4.2 + DRF
**Database**: SQLite (`db.sqlite3`) with FastAPI demo data
**AI**: Anthropic Claude Sonnet 4 (streaming API)
**Data**: 7 contributors from fastapi/fastapi (loaded via `load_demo_data`)

**Models**:
- `Repository` - GitHub repos
- `Contributor` - Developers
- `RepositoryWork` - Contribution records
- `Commit`, `Issue` - Detailed contribution data
- **`ProductivityMetrics`** - NEW: Focus hours, meeting load, flow index, burnout risk
- **`TeamCollaboration`** - NEW: Who works with who (PR reviews, mentions)
- **`MockCalendarData`** - NEW: Calendar events for productivity tracking

**Key Files**:
- `api/models.py` - All data models (✅ complete)
- `api/serializers.py` - DRF serializers (✅ complete)
- `api/admin.py` - Django admin (✅ complete)
- `api/views.py` - API endpoints (✅ complete)
- `api/management/commands/generate_mock_data.py` - Mock data generator (✅ complete)
- `fetch.py` - GitHub data ingestion script (✅ works)

**Environment**:
- Python 3.9
- Virtual environment: `backend/venv/`
- Run with: `source venv/bin/activate && python manage.py runserver`

### Frontend (`frontend/`)
**Framework**: React 19 + Vite 6 + TypeScript
**UI Library**: Radix UI (30+ components)
**Styling**: TailwindCSS 4 with custom theme
**Visualization**: Recharts + custom SVG network graph
**Routing**: React Router (✅ configured)
**State**: TanStack Query + Axios

**Design System** (lime/charcoal theme):
- Primary accent: `#AAFF00` (lime)
- Secondary: `#FFB800` (amber)
- Danger: `#FF6B35` (coral)
- Background: `#0D0D0D` (charcoal)
- Typography: Instrument Sans (headings), DM Sans (body), Source Code Pro (mono)

**Structure**:
```
frontend/src/
├── components/     # ✅ UI components (Avatar, Badge, Card, Button, charts, etc.)
├── pages/          # ✅ Home, ContributorsList, DeveloperProfile, Chat, CollaborationNetwork, About
├── lib/            # ✅ utils.ts, api.ts, mockData.ts
├── hooks/          # ✅ useContributor hook
└── types/          # ✅ TypeScript types defined
```

**Key Files**:
- `src/lib/api.ts` - Axios client configured for Django backend
- `src/types/index.ts` - TypeScript interfaces for all models
- `src/lib/utils.ts` - Tailwind utility (cn function)
- `tailwind.config.js` - Custom design system colors
- `src/index.css` - Tailwind imports + body gradient

**Environment**:
- Node.js 18+
- Run with: `npm run dev`
- Connects to: `http://localhost:8000/api`

---

## What's Working

### Backend (100% of planned features)
- ✅ All database models created and migrated
- ✅ Admin interface for all models
- ✅ Serializers for all data
- ✅ Mock data generator populated DB with realistic data
- ✅ Existing Claude chat endpoint (`/api/claude-chat/`)
- ✅ Existing repo/contributor endpoints
- ✅ GitHub ingestion script

### Frontend (MVP Complete)
- ✅ 6 pages: Home, Contributors, Developer Profile, AI Chat, Collaboration Network, About
- ✅ Lime/charcoal dark theme with glassmorphism
- ✅ SVG collaboration network graph
- ✅ Productivity charts (Recharts)
- ✅ Mock data with fictional contributors (no real people)
- ✅ Deployed to Vercel: https://rhythm-platform.vercel.app

---

## What Needs to Be Built

### Priority 1: Core API Endpoints
1. **Collaboration Graph** (`/api/collaboration/graph/`)
   - Return TeamCollaboration data as network graph
   - Format: nodes (contributors) + edges (collaboration weight)

2. **Productivity Metrics** (`/api/productivity/<contributor_id>/`)
   - Return ProductivityMetrics for a contributor
   - Include calendar data for charts

3. **Project Matching** (`/api/project-match/`)
   - POST endpoint, accepts `project_description`
   - Claude analyzes contributors + their productivity
   - Returns ranked matches with reasoning

### Priority 2: Frontend Pages
1. **Organization Dashboard** (HR view)
   - Expertise graph (force-directed, from hackathon)
   - Collaboration network (new, similar to expertise graph but from TeamCollaboration)
   - Team metrics cards (burnout risk, average focus hours)
   - Navigation to other views

2. **Developer Profile** (detailed individual view)
   - Merge hackathon's contributor detail + Dashboard Design's employee persona
   - Code expertise section (repositories, commits)
   - Productivity section (charts from MockCalendarData)
   - Collaboration section (who they work with)

3. **AI Chat Interface**
   - Port from hackathon (`claude-hack-Rhythm-main/frontend/`)
   - Update styling to match Dashboard Design aesthetic
   - Keep streaming responses and interactive <contributor> tags

4. **Project Matching Interface**
   - Input: project description textarea
   - Output: Ranked list of contributors with fit scores
   - AI reasoning for each match
   - Design inspired by Dashboard Design's project matching modal

5. **Employee Dashboard** ("My Rhythm")
   - Personal productivity view (from Dashboard Design)
   - Focus hours vs meetings chart
   - Top collaborators
   - Productivity insights

### Priority 3: Components Library
Build Radix UI-based components matching Dashboard Design's style:
- `Button`, `Card`, `Avatar`, `Badge`
- `Chart` (wrapper around Recharts)
- `Modal`, `Dropdown`, `Tabs`
- `Navigation`, `Header`, `Sidebar`

### Priority 4: Integration & Polish
- Connect all frontend pages to backend APIs
- Add loading skeletons (use Radix UI patterns)
- Error handling and user feedback
- Responsive design (mobile-friendly)
- Animations (Framer Motion)

---

## Development Workflow

### Starting Development Session
```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2: Frontend
cd frontend
npm run dev
```

### Adding New API Endpoint
1. Create view in `backend/api/views.py`
2. Add URL pattern in `backend/api/urls.py`
3. Test in Django admin or Postman
4. Update `frontend/src/lib/api.ts` with endpoint
5. Create React component that calls it

### Adding New Page
1. Create component in `frontend/src/pages/<PageName>.tsx`
2. Add route in App.tsx (need to set up React Router first)
3. Connect to API using TanStack Query
4. Style with Tailwind + Radix UI components

---

## Key Decisions & Rationale

### Why Django + SQLite?
- Hackathon project already had working Django backend
- SQLite sufficient for MVP (can migrate to Postgres later)
- Least effort to get working (user's requirement: "least tokens and effort but solid bug-free")

### Why Radix UI?
- Dashboard Design used it extensively (30+ components imported)
- Accessible, unstyled, works great with Tailwind
- Professional, production-ready patterns

### Why Mock Calendar Data?
- Real Google Calendar integration too complex for MVP
- Shows the vision without API integration overhead
- User chose "GitHub + Mock calendar data" in planning

### Why Full Transparency (No Privacy Controls)?
- User selected "Full transparency" privacy model in planning
- Simpler for MVP, can add role-based access in V2
- Trusts HR/managers with individual data (common in small orgs)

---

## Common Tasks

### Regenerate Mock Data
```bash
cd backend
source venv/bin/activate
python manage.py generate_mock_data
```

### Add New Contributor
```bash
cd backend
python fetch.py
# Follow prompts to add GitHub repo
```

### Check Database
```bash
cd backend
source venv/bin/activate
python manage.py shell

>>> from api.models import Contributor, ProductivityMetrics
>>> Contributor.objects.count()
51
>>> ProductivityMetrics.objects.count()
51
```

### Frontend Package Management
```bash
cd frontend
npm install <package>  # Add new dependency
npm run build          # Production build
```

---

## Code Style & Patterns

### Backend (Django)
- Use class-based views where possible
- All models have `created_at` and `updated_at`
- Use DRF serializers for all API responses
- Management commands for data operations

### Frontend (React)
- TypeScript strict mode
- Functional components with hooks
- TanStack Query for server state
- Tailwind for styling (use `cn()` utility for conditional classes)
- Radix UI for interactive components

**Example Component Pattern:**
```tsx
import { cn } from '@/lib/utils'

export function MyComponent({ className }: { className?: string }) {
  return (
    <div className={cn("bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6", className)}>
      {/* content */}
    </div>
  )
}
```

---

## Data Flow Example

**User asks: "Who knows about authentication?"**

1. Frontend: User types in AI chat input
2. Frontend: POST to `/api/claude-chat/` with streaming
3. Backend: Assembles all repos + contributors into prompt
4. Backend: Calls Claude API (Sonnet 4)
5. Claude: Analyzes data, returns response with `<contributor id="X">` tags
6. Backend: Streams response back to frontend
7. Frontend: Parses `<contributor>` tags, renders as interactive links
8. User clicks contributor → navigate to Developer Profile
9. Profile: GET `/api/contributors/<X>/` + `/api/productivity/<X>/`
10. Profile: Display code expertise + productivity charts

---

## Gotchas & Known Issues

### Backend
- ⚠️ Anthropic client warning: "unexpected keyword argument 'proxies'" - **ignore it, doesn't affect functionality**
- ⚠️ Timezone warnings in TeamCollaboration dates - **cosmetic, data is fine**
- Django 5.2 doesn't exist - **fixed, using 4.2**

### Frontend
- ⚠️ Frontend uses mock data (`mockData.ts`) — not wired to backend API yet
- ⚠️ AI Chat page is UI-only — needs backend connection for streaming
- ⚠️ react-force-graph was removed (crashed app) — replaced with custom SVG graph

---

## Success Metrics (Portfolio Value)

When finished, this project demonstrates:
- ✅ **PM Skills**: Multi-persona product design, clear value proposition
- ✅ **Technical Depth**: Full-stack dev, AI integration, data viz
- ✅ **Product Thinking**: Solving real problem (expert discovery + productivity)
- ✅ **Execution**: Consolidated two projects into cohesive product
- ✅ **Design Sense**: Professional UI/UX (Dashboard Design aesthetic)

**Target Outcome**: Portfolio piece for PM summer internship hunt

---

## Next Session Priorities

1. **Wire frontend to backend API** — Replace mockData.ts with real API calls
2. **Connect AI Chat** — Hook up streaming to `/api/claude-chat/`
3. **Polish and responsive design** — Mobile-friendly layouts, loading states

---

**Last Updated**: 2026-02-06
**Project Stage**: MVP deployed (frontend mock data, backend API ready)
**Deployed**: https://rhythm-platform.vercel.app
**Repo**: https://github.com/Amith1596/rhythm-platform
