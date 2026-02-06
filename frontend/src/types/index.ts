export interface Repository {
  id: number;
  name: string;
  url: string;
  avatar_url: string;
  summary?: string;
}

export interface Contributor {
  id: number;
  username: string;
  url: string;
  avatar_url: string | null;
  summary?: string;
  // Frontend-only fields for UI (not in backend model)
  name?: string;
  email?: string;
  expertise_summary?: string;
  works?: ContributorWork[];
  productivity_metrics?: ProductivityMetrics;
  created_at?: string;
  updated_at?: string;
}

export interface ContributorWork {
  id: number;
  contributor: number;
  repository: number;
  repository_name?: string;
  total_commits?: number;
  total_issues?: number;
  total_prs?: number;
  languages?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface ProductivityMetrics {
  id: number;
  contributor: number;
  focus_hours: number;
  meeting_load: number;
  flow_index: number;
  productivity_peak?: string;
  work_style?: string;
  well_being_score?: number;
  burnout_risk?: 'low' | 'medium' | 'high';
  created_at?: string;
  updated_at?: string;
}

export interface CollaborationEdge {
  from: number;
  to: number;
  weight: number;
  interaction_type: string;
}

export interface ProjectMatch {
  contributor: Contributor;
  fit_score: number;
  reasoning: string;
}

export type ViewMode = 'employee' | 'manager' | 'hr';
