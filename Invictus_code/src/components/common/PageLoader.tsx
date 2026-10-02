import { Loader2 } from 'lucide-react'

// Shown while a code-split page loads on the very first visit to its URL.
export function PageLoader() {
  return (
    <div role="status" className="flex min-h-svh items-center justify-center">
      <Loader2 aria-hidden className="size-8 animate-spin text-secondary" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}
