import { isAxiosError } from 'axios'

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.'

// Assumes the backend returns `{ message: string }` on errors — adjust once its format is known.
export function getApiErrorMessage(error: unknown) {
  if (isAxiosError<{ message?: string }>(error)) {
    if (error.response?.data?.message) return error.response.data.message
    if (!error.response) return 'Unable to reach the server. Check your connection and try again.'
  }
  return FALLBACK_MESSAGE
}
