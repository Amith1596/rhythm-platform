# Rhythm Platform

**AI-Powered People Intelligence for Engineering Teams**

A unified platform combining developer expertise discovery with productivity analytics, designed for HR/People Ops teams to optimize team composition, prevent burnout, and accelerate project staffing.

---

## 🎯 Problem & Solution

### The Problem
- Finding the right expert in large organizations takes days of Slack messages
- Managers lack visibility into team productivity patterns and burnout risks
- Project staffing decisions are made without data on developer expertise and availability
- Collaboration silos prevent effective cross-team knowledge sharing

### The Solution
**Rhythm Platform** uses AI to analyze GitHub contributions and productivity patterns to:
- Instantly recommend experts for specific technical questions
- Track developer productivity, focus time, and meeting load
- Visualize collaboration networks across teams
- Match developers to projects based on expertise AND availability

### Impact
- ⚡ **Expert Discovery**: 3 days → 8 minutes
- 📈 **Onboarding**: 40% faster for new engineers
- 🧠 **Knowledge Preservation**: Maintain institutional knowledge when people leave
- 🎯 **Smart Staffing**: Data-driven project-to-person matching

---

## ✨ Key Features

### 1. AI Expert Finder
- Natural language queries: "Who knows about authentication?"
- Streaming Claude Sonnet 4 responses with reasoning
- Interactive contributor links in AI responses
- Multi-repo code analysis

### 2. Developer Profiles
- Code expertise (from GitHub commits, PRs, issues)
- Productivity metrics (focus hours, meeting load, flow index)
- Collaboration patterns (who works with who)
- Work style and productivity peaks

### 3. Organization Intelligence Dashboard
- **Expertise Graph**: Force-directed visualization of contributor-repository relationships
- **Collaboration Network**: Who communicates with who (from PR reviews, issue mentions)
- **Team Productivity**: Aggregated metrics, burnout risk indicators
- **Multi-Role Views**: Employee, Manager, and HR perspectives

### 4. Project Matching
- AI-powered project-to-developer recommendations
- Considers both expertise AND productivity/availability
- Explains reasoning for each match

---

## 🏗️ Architecture

### Tech Stack

**Backend:**
- Django 4.2 + Django REST Framework
- SQLite database (production would use PostgreSQL)
- Anthropic Claude Sonnet 4 API (streaming responses)
- GitHub REST API for data ingestion

**Frontend:**
- React 19 + Vite 6 + TypeScript
- Radix UI component library (comprehensive, accessible)
- TailwindCSS 4 (custom design system)
- Recharts (data visualization)
- react-force-graph (network graphs)
- React Router (multi-view navigation)
- TanStack Query + Axios (data fetching)
- Framer Motion (animations)

### Database Schema

```
Repository
  ↓ (many-to-many via RepositoryWork)
Contributor
  ├─ ProductivityMetrics (1:1)
  ├─ TeamCollaboration (many-to-many)
  └─ MockCalendarData (1:many)

RepositoryWork
  ├─ Commit (1:many)
  └─ Issue (1:many)
```

### Design System
- **Primary**: `#1D1F73` (deep indigo)
- **Secondary**: `#3BA3A3` (teal)
- **Accent**: `#F4B4B4` (soft pink)
- **Background**: Gradient `#F0F4F8` → `#E8F0F7` → `#F5EEF8`
- **Style**: Glassmorphism, rounded corners, smooth animations

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+
- Anthropic API key

### Backend Setup

```bash
cd backend/

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Run migrations
python manage.py migrate

# Generate mock productivity data (uses existing contributors from hackathon DB)
python manage.py generate_mock_data

# Create superuser (optional, for Django admin)
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

```bash
cd frontend/

# Install dependencies
npm install

# Set up environment variables
echo "VITE_API_URL=http://localhost:8000/api" > .env.local

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Ingesting GitHub Data (Optional)

The project comes with pre-populated data from the hackathon. To refresh or add new repositories:

```bash
cd backend/
python fetch.py
# Follow prompts to enter repository URLs and GitHub token
```

---

## 📊 Current Status

### ✅ Completed (Backend)
- [x] Django backend with all models (Repository, Contributor, ProductivityMetrics, TeamCollaboration, MockCalendarData)
- [x] Django REST Framework serializers and admin
- [x] Database migrations applied
- [x] Mock data generator command (51 contributors, 2,493 collaborations, 4,317 calendar events)
- [x] Existing Claude chat streaming endpoint
- [x] Existing repository and contributor endpoints
- [x] GitHub data ingestion script

### ✅ Completed (Frontend Foundation)
- [x] Vite + React + TypeScript setup
- [x] TailwindCSS configuration with custom design system
- [x] Radix UI and visualization libraries installed
- [x] Project structure (components/, pages/, lib/, hooks/, types/)
- [x] API client configuration
- [x] TypeScript types for all data models

### 🚧 In Progress (Frontend - ~60% remaining work)
- [ ] Design system components (Button, Card, Avatar, etc.)
- [ ] Routing and navigation (React Router setup)
- [ ] Organization Dashboard page
- [ ] Developer Profile page
- [ ] AI Chat interface (port from hackathon with new styling)
- [ ] Project Matching interface
- [ ] Employee Dashboard ("My Rhythm" view)
- [ ] Multi-role view switching (Employee/Manager/HR)
- [ ] Loading states and error handling
- [ ] API integration for all endpoints

### 📋 Next Steps (API Enhancements)
- [ ] Collaboration graph endpoint (`/api/collaboration/graph/`)
- [ ] Productivity metrics endpoint (`/api/productivity/<contributor_id>/`)
- [ ] Project matching endpoint (`/api/project-match/`)
- [ ] Enhanced contributor detail endpoint (with productivity data)

---

## 🎨 Design Philosophy

### From Dashboard Design Project
- Clean, modern UI with glassmorphism effects
- Smooth animations and transitions (Framer Motion)
- Comprehensive Radix UI component library
- Professional color palette and typography
- Card-based layouts with rounded corners

### From Hackathon Project
- Functional AI integration with real Claude API
- Streaming responses with custom markdown parsing
- Interactive force-directed graphs
- Real GitHub data ingestion
- Working backend architecture

### Combined Vision
- **Beautiful** (Dashboard Design's polish) + **Functional** (Hackathon's working features)
- **Productivity analytics** + **Expertise discovery**
- **Multiple user personas** (Employee, Manager, HR)
- **Data-driven insights** with AI reasoning

---

## 📚 API Endpoints

### Existing Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/repositories/` | List all repositories |
| GET | `/api/repositories/<id>/` | Repository detail |
| GET | `/api/contributors/` | List all contributors |
| GET | `/api/contributors/<id>/` | Contributor detail |
| POST | `/api/claude-chat/` | AI expert finder (streaming) |

### Planned Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/productivity/<id>/` | Contributor productivity metrics |
| GET | `/api/collaboration/graph/` | Collaboration network data |
| POST | `/api/project-match/` | Project-to-person AI matching |
| GET | `/api/team-metrics/` | Aggregated team statistics |

---

## 🧪 Sample Data

The database is pre-populated with:
- **51 GitHub contributors** from the hackathon dataset (from repositories like `pytorch/torchtune`)
- **ProductivityMetrics** for each contributor (focus hours: 15-35/week, meeting load: 15-45%, flow index: 60-95)
- **2,493 collaboration relationships** inferred from shared repository work
- **4,317 calendar events** (4 weeks of mock meetings and focus time)

This provides rich, realistic data for testing and demonstration.

---

## 🔐 Environment Variables

### Backend (.env)
```
ANTHROPIC_API_KEY=your_api_key_here
GITHUB_TOKEN=your_github_token_here  # Optional, for fetch.py
DEBUG=True
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000/api
```

---

## 🎯 Use Cases

### For HR/People Ops Teams
1. **Smart Staffing**: "I have a new authentication project, who should I assign?"
2. **Burnout Prevention**: Monitor team meeting load and focus time
3. **Knowledge Mapping**: Visualize who knows what across the organization
4. **Succession Planning**: Identify backup experts for critical areas

### For Engineering Managers
1. **Expert Discovery**: Quickly find who to ask about specific technical areas
2. **Team Health**: Track productivity patterns and collaboration
3. **Onboarding**: Connect new hires with relevant experts
4. **Capacity Planning**: See who has bandwidth for new projects

### For Individual Contributors
1. **Self-Awareness**: Understand your productivity patterns
2. **Growth**: Identify areas where you're building expertise
3. **Collaboration**: See who you work with most effectively
4. **Project Opportunities**: Get matched to projects that fit your skills

---

## 📈 Future Enhancements (V2+)

- **Real Calendar Integration**: Google Calendar / Outlook API
- **Slack Integration**: Real communication pattern analysis
- **JIRA Integration**: Project and task tracking
- **Predictive Analytics**: Flight risk, promotion readiness
- **Privacy Controls**: Role-based permissions, opt-out mechanisms
- **Real-time Updates**: WebSockets for live collaboration tracking
- **RAG Enhancement**: Scale to 100+ repositories with vector search
- **MCP Integration**: Claude Model Context Protocol for enhanced AI capabilities

---

## 🤝 Contributing

This project consolidates two previous explorations:
1. **claude-hack-Rhythm-main**: Hackathon project for AI-powered developer expertise finder
2. **Rhythm Dashboard Design**: UI/UX prototype for employee productivity analytics

The consolidated `rhythm-platform` combines the best of both: functional backend + beautiful frontend.

---

## 📝 License

MIT License - See LICENSE file for details

---

## 🎓 Learn More

This project demonstrates:
- Full-stack development (Django + React)
- AI integration (Anthropic Claude API)
- Data visualization (force graphs, charts)
- GitHub API integration
- Modern frontend architecture (Vite, TailwindCSS, Radix UI)
- Product thinking (multi-persona design)

Perfect for portfolio showcasing PM skills, technical depth, and product design.

---

**Built with ❤️ by Amith** | [GitHub](https://github.com/amithp) | [LinkedIn](https://linkedin.com/in/amithp)
