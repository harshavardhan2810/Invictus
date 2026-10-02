import { useId } from 'react'

import { cn } from '@/lib/utils'

/**
 * Decorative lattice of small diamonds inspired by Indian jaali screens.
 * Colour it with a `text-*` class, e.g. `text-white/5` on dark sections.
 */
export function JaaliPattern({ className }: { className?: string }) {
  const patternId = useId()

  return (
    <svg
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 size-full', className)}
    >
      <defs>
        <pattern id={patternId} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M14 4 24 14 14 24 4 14Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="14" cy="14" r="1.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
