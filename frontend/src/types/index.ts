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
  avatar_url: string;
  summary?: string;
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
