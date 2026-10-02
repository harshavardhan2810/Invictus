import axios from 'axios'

/**
 * Shared HTTP client for all backend calls. Feature modules in `src/api/`
 * use it; components call those modules rather than axios directly.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/** False until VITE_API_BASE_URL is set — forms fall back to a demo submission. */
export const isApiConfigured = Boolean(import.meta.env.VITE_API_BASE_URL)
