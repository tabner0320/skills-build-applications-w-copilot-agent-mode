/**
 * API configuration for Octofit Tracker frontend
 * 
 * IMPORTANT: Set `VITE_CODESPACE_NAME` in `.env.local` for Codespaces environments.
 * Example:
 *   VITE_CODESPACE_NAME=scaling-space-waddle-pxx7gwvrr4q27v96
 * 
 * When `VITE_CODESPACE_NAME` is set, API calls route to:
 *   https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/...
 * 
 * When unset, API calls route to:
 *   http://localhost:8000/api/...
 */

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function getApiUrl(endpoint) {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint}`;
}

export async function fetchUsers() {
  const response = await fetch(getApiUrl('/api/users'));
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

export async function fetchTeams() {
  const response = await fetch(getApiUrl('/api/teams'));
  if (!response.ok) throw new Error('Failed to fetch teams');
  return response.json();
}

export async function fetchActivities() {
  const response = await fetch(getApiUrl('/api/activities'));
  if (!response.ok) throw new Error('Failed to fetch activities');
  return response.json();
}

export async function fetchLeaderboard() {
  const response = await fetch(getApiUrl('/api/leaderboard'));
  if (!response.ok) throw new Error('Failed to fetch leaderboard');
  return response.json();
}

export async function fetchWorkouts() {
  const response = await fetch(getApiUrl('/api/workouts'));
  if (!response.ok) throw new Error('Failed to fetch workouts');
  return response.json();
}
