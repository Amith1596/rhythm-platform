import { Contributor, ProductivityMetrics } from '@/types'

// Mock productivity metrics
const mockProductivityMetrics: Record<number, ProductivityMetrics> = {
  1: {
    id: 1,
    contributor: 1,
    focus_hours_per_week: 28.5,
    meeting_load_percentage: 25,
    flow_index: 85,
    burnout_risk: 15,
    work_style: 'Deep Work Specialist',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z'
  },
  2: {
    id: 2,
    contributor: 2,
    focus_hours_per_week: 22.0,
    meeting_load_percentage: 40,
    flow_index: 72,
    burnout_risk: 35,
    work_style: 'Collaborative Builder',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z'
  },
  3: {
    id: 3,
    contributor: 3,
    focus_hours_per_week: 32.0,
    meeting_load_percentage: 18,
    flow_index: 92,
    burnout_risk: 8,
    work_style: 'Flow State Champion',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z'
  },
  4: {
    id: 4,
    contributor: 4,
    focus_hours_per_week: 18.5,
    meeting_load_percentage: 48,
    flow_index: 65,
    burnout_risk: 52,
    work_style: 'Team Coordinator',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z'
  },
  5: {
    id: 5,
    contributor: 5,
    focus_hours_per_week: 26.0,
    meeting_load_percentage: 30,
    flow_index: 78,
    burnout_risk: 22,
    work_style: 'Balanced Contributor',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z'
  },
  6: {
    id: 6,
    contributor: 6,
    focus_hours_per_week: 24.5,
    meeting_load_percentage: 32,
    flow_index: 80,
    burnout_risk: 20,
    work_style: 'Steady Performer',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z'
  },
  7: {
    id: 7,
    contributor: 7,
    focus_hours_per_week: 29.0,
    meeting_load_percentage: 22,
    flow_index: 88,
    burnout_risk: 12,
    work_style: 'Innovation Driver',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z'
  },
  8: {
    id: 8,
    contributor: 8,
    focus_hours_per_week: 20.0,
    meeting_load_percentage: 42,
    flow_index: 68,
    burnout_risk: 38,
    work_style: 'Cross-Team Facilitator',
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z'
  }
}

// Mock contributors
export const mockContributors: Contributor[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar_url: null,
    expertise_summary: 'Machine Learning Infrastructure | PyTorch | Model Optimization',
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
    works: [
      {
        id: 1,
        contributor: 1,
        repository: 1,
        repository_name: 'pytorch/torchtune',
        total_commits: 142,
        total_issues: 23,
        total_prs: 45,
        languages: ['Python', 'C++'],
        created_at: '2024-01-15T00:00:00Z',
        updated_at: '2025-01-14T00:00:00Z'
      }
    ],
    productivity_metrics: mockProductivityMetrics[1]
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    email: 'marcus.j@example.com',
    avatar_url: null,
    expertise_summary: 'Distributed Systems | Backend Architecture | API Design',
    created_at: '2024-02-20T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
    works: [
      {
        id: 2,
        contributor: 2,
        repository: 2,
        repository_name: 'kubernetes/kubernetes',
        total_commits: 89,
        total_issues: 34,
        total_prs: 28,
        languages: ['Go', 'Shell'],
        created_at: '2024-02-20T00:00:00Z',
        updated_at: '2025-01-14T00:00:00Z'
      }
    ],
    productivity_metrics: mockProductivityMetrics[2]
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    email: 'elena.r@example.com',
    avatar_url: null,
    expertise_summary: 'Frontend Architecture | React | TypeScript | Performance',
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
    works: [
      {
        id: 3,
        contributor: 3,
        repository: 3,
        repository_name: 'facebook/react',
        total_commits: 203,
        total_issues: 12,
        total_prs: 67,
        languages: ['TypeScript', 'JavaScript'],
        created_at: '2024-03-10T00:00:00Z',
        updated_at: '2025-01-14T00:00:00Z'
      }
    ],
    productivity_metrics: mockProductivityMetrics[3]
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@example.com',
    avatar_url: null,
    expertise_summary: 'DevOps | CI/CD | Infrastructure as Code | Cloud Architecture',
    created_at: '2024-01-25T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
    works: [
      {
        id: 4,
        contributor: 4,
        repository: 4,
        repository_name: 'hashicorp/terraform',
        total_commits: 156,
        total_issues: 45,
        total_prs: 52,
        languages: ['Go', 'HCL'],
        created_at: '2024-01-25T00:00:00Z',
        updated_at: '2025-01-14T00:00:00Z'
      }
    ],
    productivity_metrics: mockProductivityMetrics[4]
  },
  {
    id: 5,
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    avatar_url: null,
    expertise_summary: 'Data Engineering | Apache Spark | ETL Pipelines | Python',
    created_at: '2024-04-05T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
    works: [
      {
        id: 5,
        contributor: 5,
        repository: 5,
        repository_name: 'apache/spark',
        total_commits: 178,
        total_issues: 29,
        total_prs: 41,
        languages: ['Scala', 'Python', 'Java'],
        created_at: '2024-04-05T00:00:00Z',
        updated_at: '2025-01-14T00:00:00Z'
      }
    ],
    productivity_metrics: mockProductivityMetrics[5]
  },
  {
    id: 6,
    name: 'Alex Thompson',
    email: 'alex.t@example.com',
    avatar_url: null,
    expertise_summary: 'Mobile Development | iOS | Swift | SwiftUI',
    created_at: '2024-02-14T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
    works: [
      {
        id: 6,
        contributor: 6,
        repository: 6,
        repository_name: 'apple/swift',
        total_commits: 124,
        total_issues: 18,
        total_prs: 35,
        languages: ['Swift', 'C++'],
        created_at: '2024-02-14T00:00:00Z',
        updated_at: '2025-01-14T00:00:00Z'
      }
    ],
    productivity_metrics: mockProductivityMetrics[6]
  },
  {
    id: 7,
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@example.com',
    avatar_url: null,
    expertise_summary: 'Security Engineering | Cryptography | Penetration Testing',
    created_at: '2024-03-22T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
    works: [
      {
        id: 7,
        contributor: 7,
        repository: 7,
        repository_name: 'openssl/openssl',
        total_commits: 167,
        total_issues: 31,
        total_prs: 48,
        languages: ['C', 'Assembly'],
        created_at: '2024-03-22T00:00:00Z',
        updated_at: '2025-01-14T00:00:00Z'
      }
    ],
    productivity_metrics: mockProductivityMetrics[7]
  },
  {
    id: 8,
    name: 'Isabella Santos',
    email: 'isabella.s@example.com',
    avatar_url: null,
    expertise_summary: 'Product Engineering | Full Stack | User Experience | Agile',
    created_at: '2024-01-30T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
    works: [
      {
        id: 8,
        contributor: 8,
        repository: 8,
        repository_name: 'vercel/next.js',
        total_commits: 195,
        total_issues: 42,
        total_prs: 58,
        languages: ['TypeScript', 'JavaScript', 'CSS'],
        created_at: '2024-01-30T00:00:00Z',
        updated_at: '2025-01-14T00:00:00Z'
      }
    ],
    productivity_metrics: mockProductivityMetrics[8]
  }
]

// Helper functions
export function getMockContributorById(id: number): Contributor | undefined {
  return mockContributors.find(c => c.id === id)
}

export function getMockContributorsByIds(ids: number[]): Contributor[] {
  return mockContributors.filter(c => ids.includes(c.id))
}

// Mock collaboration data (who works with who)
export const mockCollaborations = [
  { from: 1, to: 2, weight: 12 }, // Sarah ↔ Marcus
  { from: 1, to: 5, weight: 8 },  // Sarah ↔ Priya
  { from: 2, to: 4, weight: 15 }, // Marcus ↔ David
  { from: 3, to: 8, weight: 20 }, // Elena ↔ Isabella
  { from: 4, to: 2, weight: 15 }, // David ↔ Marcus
  { from: 5, to: 1, weight: 8 },  // Priya ↔ Sarah
  { from: 6, to: 3, weight: 6 },  // Alex ↔ Elena
  { from: 7, to: 4, weight: 10 }, // Yuki ↔ David
  { from: 8, to: 3, weight: 20 }, // Isabella ↔ Elena
]

// Get top collaborators for a contributor
export function getTopCollaborators(contributorId: number, limit: number = 5): Contributor[] {
  const collaborations = mockCollaborations
    .filter(c => c.from === contributorId || c.to === contributorId)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, limit)

  const collaboratorIds = collaborations.map(c =>
    c.from === contributorId ? c.to : c.from
  )

  return getMockContributorsByIds(collaboratorIds)
}

// Time-series data for productivity charts (last 4 weeks)
export interface WeeklyProductivity {
  week: string
  focusHours: number
  meetingHours: number
  flowIndex: number
}

export const mockWeeklyProductivity: Record<number, WeeklyProductivity[]> = {
  1: [ // Sarah Chen - Consistent high performer
    { week: 'Week 1', focusHours: 30, meetingHours: 10, flowIndex: 88 },
    { week: 'Week 2', focusHours: 28, meetingHours: 12, flowIndex: 85 },
    { week: 'Week 3', focusHours: 29, meetingHours: 11, flowIndex: 87 },
    { week: 'Week 4', focusHours: 27, meetingHours: 13, flowIndex: 83 },
  ],
  2: [ // Marcus Johnson - High meetings
    { week: 'Week 1', focusHours: 24, meetingHours: 16, flowIndex: 75 },
    { week: 'Week 2', focusHours: 22, meetingHours: 18, flowIndex: 72 },
    { week: 'Week 3', focusHours: 21, meetingHours: 19, flowIndex: 70 },
    { week: 'Week 4', focusHours: 20, meetingHours: 20, flowIndex: 68 },
  ],
  3: [ // Elena Rodriguez - Flow state champion
    { week: 'Week 1', focusHours: 33, meetingHours: 7, flowIndex: 94 },
    { week: 'Week 2', focusHours: 32, meetingHours: 8, flowIndex: 92 },
    { week: 'Week 3', focusHours: 34, meetingHours: 6, flowIndex: 95 },
    { week: 'Week 4', focusHours: 31, meetingHours: 9, flowIndex: 90 },
  ],
  4: [ // David Kim - Declining trend (burnout)
    { week: 'Week 1', focusHours: 22, meetingHours: 18, flowIndex: 72 },
    { week: 'Week 2', focusHours: 19, meetingHours: 21, flowIndex: 68 },
    { week: 'Week 3', focusHours: 17, meetingHours: 23, flowIndex: 62 },
    { week: 'Week 4', focusHours: 15, meetingHours: 25, flowIndex: 58 },
  ],
  5: [ // Priya Patel - Balanced
    { week: 'Week 1', focusHours: 27, meetingHours: 13, flowIndex: 80 },
    { week: 'Week 2', focusHours: 26, meetingHours: 14, flowIndex: 78 },
    { week: 'Week 3', focusHours: 25, meetingHours: 15, flowIndex: 76 },
    { week: 'Week 4', focusHours: 26, meetingHours: 14, flowIndex: 79 },
  ],
  6: [ // Alex Thompson
    { week: 'Week 1', focusHours: 25, meetingHours: 15, flowIndex: 82 },
    { week: 'Week 2', focusHours: 24, meetingHours: 16, flowIndex: 80 },
    { week: 'Week 3', focusHours: 25, meetingHours: 15, flowIndex: 81 },
    { week: 'Week 4', focusHours: 23, meetingHours: 17, flowIndex: 78 },
  ],
  7: [ // Yuki Tanaka - Improving trend
    { week: 'Week 1', focusHours: 26, meetingHours: 14, flowIndex: 82 },
    { week: 'Week 2', focusHours: 28, meetingHours: 12, flowIndex: 85 },
    { week: 'Week 3', focusHours: 30, meetingHours: 10, flowIndex: 88 },
    { week: 'Week 4', focusHours: 31, meetingHours: 9, flowIndex: 91 },
  ],
  8: [ // Isabella Santos
    { week: 'Week 1', focusHours: 21, meetingHours: 19, flowIndex: 70 },
    { week: 'Week 2', focusHours: 20, meetingHours: 20, flowIndex: 68 },
    { week: 'Week 3', focusHours: 19, meetingHours: 21, flowIndex: 66 },
    { week: 'Week 4', focusHours: 20, meetingHours: 20, flowIndex: 69 },
  ],
}

// Calendar heatmap data (last 28 days - 4 weeks)
export interface DayActivity {
  date: string
  focusHours: number
  meetingHours: number
  type: 'weekday' | 'weekend'
}

// Helper to generate dates for last 28 days
function generateLast28Days(): string[] {
  const dates = []
  const today = new Date('2025-01-14') // Reference date
  for (let i = 27; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split('T')[0])
  }
  return dates
}

const last28Days = generateLast28Days()

export const mockDailyActivity: Record<number, DayActivity[]> = {
  1: last28Days.map((date, i) => {
    const isWeekend = new Date(date).getDay() % 6 === 0
    return {
      date,
      focusHours: isWeekend ? 0 : 5 + Math.sin(i / 3) * 2,
      meetingHours: isWeekend ? 0 : 1.5 + Math.cos(i / 2) * 1,
      type: isWeekend ? 'weekend' : 'weekday'
    }
  }),
  2: last28Days.map((date, i) => {
    const isWeekend = new Date(date).getDay() % 6 === 0
    return {
      date,
      focusHours: isWeekend ? 0 : 4 + Math.sin(i / 4) * 1.5,
      meetingHours: isWeekend ? 0 : 3 + Math.cos(i / 3) * 1,
      type: isWeekend ? 'weekend' : 'weekday'
    }
  }),
  3: last28Days.map((date, i) => {
    const isWeekend = new Date(date).getDay() % 6 === 0
    return {
      date,
      focusHours: isWeekend ? 0 : 6 + Math.sin(i / 2) * 1,
      meetingHours: isWeekend ? 0 : 1 + Math.cos(i / 5) * 0.5,
      type: isWeekend ? 'weekend' : 'weekday'
    }
  }),
  4: last28Days.map((date, i) => {
    const isWeekend = new Date(date).getDay() % 6 === 0
    // Declining trend for burnout case
    const decline = i / 28
    return {
      date,
      focusHours: isWeekend ? 0 : Math.max(2, 5 - decline * 3),
      meetingHours: isWeekend ? 0 : 3 + decline * 2,
      type: isWeekend ? 'weekend' : 'weekday'
    }
  }),
  5: last28Days.map((date, i) => {
    const isWeekend = new Date(date).getDay() % 6 === 0
    return {
      date,
      focusHours: isWeekend ? 0 : 5 + Math.sin(i / 3) * 1,
      meetingHours: isWeekend ? 0 : 2.5 + Math.cos(i / 3) * 0.5,
      type: isWeekend ? 'weekend' : 'weekday'
    }
  }),
  6: last28Days.map((date, i) => {
    const isWeekend = new Date(date).getDay() % 6 === 0
    return {
      date,
      focusHours: isWeekend ? 0 : 4.5 + Math.sin(i / 3) * 1,
      meetingHours: isWeekend ? 0 : 2.8 + Math.cos(i / 2) * 0.8,
      type: isWeekend ? 'weekend' : 'weekday'
    }
  }),
  7: last28Days.map((date, i) => {
    const isWeekend = new Date(date).getDay() % 6 === 0
    // Improving trend
    const improvement = i / 28
    return {
      date,
      focusHours: isWeekend ? 0 : 4.5 + improvement * 2,
      meetingHours: isWeekend ? 0 : Math.max(1, 3 - improvement * 1.5),
      type: isWeekend ? 'weekend' : 'weekday'
    }
  }),
  8: last28Days.map((date, i) => {
    const isWeekend = new Date(date).getDay() % 6 === 0
    return {
      date,
      focusHours: isWeekend ? 0 : 3.5 + Math.sin(i / 4) * 1,
      meetingHours: isWeekend ? 0 : 3.5 + Math.cos(i / 3) * 1,
      type: isWeekend ? 'weekend' : 'weekday'
    }
  }),
}

// Get weekly productivity data
export function getWeeklyProductivity(contributorId: number): WeeklyProductivity[] {
  return mockWeeklyProductivity[contributorId] || []
}

// Get daily activity data
export function getDailyActivity(contributorId: number): DayActivity[] {
  return mockDailyActivity[contributorId] || []
}
