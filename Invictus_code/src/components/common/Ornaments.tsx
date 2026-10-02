import { cn } from '@/lib/utils'

const OUTER_PETAL_COUNT = 16
const INNER_PETAL_COUNT = 8

/** Line-art mandala. Colour it with a `text-*` class; it inherits `currentColor`. */
export function Mandala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
      className={cn('pointer-events-none', className)}
    >
      <circle cx="100" cy="100" r="97" />
      <circle cx="100" cy="100" r="90" strokeDasharray="2 3" />
      <circle cx="100" cy="100" r="58" />
      <circle cx="100" cy="100" r="36" />
      <circle cx="100" cy="100" r="10" />
      {Array.from({ length: OUTER_PETAL_COUNT }, (_, petalIndex) => (
        <g key={`outer-${petalIndex}`} transform={`rotate(${(petalIndex * 360) / OUTER_PETAL_COUNT} 100 100)`}>
          <path d="M100 14C111 26 112 38 100 46C88 38 89 26 100 14Z" />
          <path d="M100 46C104 50 104 55 100 58C96 55 96 50 100 46Z" />
          <circle cx="100" cy="9" r="1.6" fill="currentColor" />
        </g>
      ))}
      {Array.from({ length: INNER_PETAL_COUNT }, (_, petalIndex) => (
        <g key={`inner-${petalIndex}`} transform={`rotate(${(petalIndex * 360) / INNER_PETAL_COUNT + 22.5} 100 100)`}>
          <path d="M100 64C108 72 108 82 100 90C92 82 92 72 100 64Z" />
        </g>
      ))}
    </svg>
  )
}

/** Small three-petal lotus used as a divider ornament. */
export function LotusOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden className={className}>
      <path d="M12 1.5c2.6 3 2.6 7.2 0 10.5-2.6-3.3-2.6-7.5 0-10.5Z" fill="currentColor" fillOpacity="0.25" />
      <path d="M12 12c-1.2-3.4-4.4-5.6-9-5.6 0 4.4 3.6 6.8 9 5.6Z" />
      <path d="M12 12c1.2-3.4 4.4-5.6 9-5.6 0 4.4-3.6 6.8-9 5.6Z" />
      <path d="M5 14.5h14" strokeLinecap="round" />
    </svg>
  )
}
