// API utility to handle base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

/**
 * Get the full API URL
 * - Uses VITE_API_URL if set (for separate deployments)
 * - Otherwise uses relative paths (for same-origin deployments like Render)
 */
export function getApiUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // If API_BASE_URL is set, prepend it
  if (API_BASE_URL) {
    return `${API_BASE_URL}${normalizedPath}`;
  }

  // Otherwise use relative path
  return normalizedPath;
}

/**
 * Fetch wrapper that uses the correct API URL
 */
export async function apiFetch(
  path: string,
  options?: RequestInit,
): Promise<Response> {
  const url = getApiUrl(path);
  return fetch(url, options);
}
