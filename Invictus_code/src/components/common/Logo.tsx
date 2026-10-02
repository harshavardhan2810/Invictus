import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

interface LogoProps {
  tone?: 'dark' | 'light'
  size?: 'default' | 'large'
  showMotto?: boolean
  className?: string
}

// Placeholder crest — swap the SVG for the official school emblem when available.
export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 46" aria-hidden className={cn('w-auto shrink-0', className)}>
      <path
        d="M20 1.5 37 7v14.5C37 32.8 29.9 40.6 20 44.5 10.1 40.6 3 32.8 3 21.5V7L20 1.5Z"
        className="fill-primary stroke-secondary"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 13.5h12M14 31.5h12M20 13.5v18"
        className="stroke-secondary"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function Logo({ tone = 'dark', size = 'default', showMotto = false, className }: LogoProps) {
  const isLight = tone === 'light'
  const isLarge = size === 'large'

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Crest className={isLarge ? 'h-16' : 'h-11'} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display font-bold tracking-wide uppercase',
            isLarge ? 'text-3xl' : 'text-xl',
            isLight ? 'text-white' : 'text-primary-900',
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            'mt-1 font-display font-semibold tracking-[0.18em] uppercase',
            isLarge ? 'text-xs' : 'text-[10px]',
            isLight ? 'text-secondary-300' : 'text-secondary-700',
          )}
        >
          {siteConfig.descriptor}
        </span>
        {showMotto && (
          <span
            lang="sa"
            className={cn('mt-1.5 text-base font-semibold', isLight ? 'text-white/80' : 'text-accent')}
          >
            {siteConfig.motto.text}
          </span>
        )}
      </span>
    </span>
  )
}
