import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const endpoints = {
  // Repositories
  repositories: '/repositories/',
  repositoryDetail: (id: number) => `/repositories/${id}/`,

  // Contributors
  contributors: '/contributors/',
  contributorDetail: (id: number) => `/contributors/${id}/`,
  contributorProductivity: (id: number) => `/productivity/${id}/`,

  // Claude chat
  claudeChat: '/claude-chat/',

  // Collaboration
  collaborationGraph: '/collaboration/graph/',

  // Project matching
  projectMatch: '/project-match/',
};

export default api;
