/**
 * API configuration for Codespaces and localhost environments
 */

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || 8000;

  if (codespaceName) {
    return `https://${codespaceName}-${port}.app.github.dev`;
  }

  return `http://localhost:${port}`;
}

export function getApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint}`;
}

export default {
  getApiBaseUrl,
  getApiUrl,
};
