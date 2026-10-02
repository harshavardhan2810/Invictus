import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  titleId?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  titleId,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  const isLight = tone === 'light'
  const isCentered = align === 'center'

  return (
    <div className={cn('max-w-2xl', isCentered && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 font-display text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm',
            isLight ? 'text-secondary-300' : 'text-secondary-700',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={titleId}
        className={cn(
          'font-display text-3xl leading-tight font-bold text-balance sm:text-4xl',
          isLight ? 'text-white' : 'text-primary-900',
        )}
      >
        {title}
      </h2>
      <div
        aria-hidden
        className={cn('mt-4 flex items-center gap-2', isCentered && 'justify-center')}
      >
        <span className="h-1 w-10 rounded-full bg-secondary" />
        <span className={cn('size-2 rotate-45', isLight ? 'bg-white' : 'bg-accent')} />
        <span className="h-1 w-10 rounded-full bg-secondary" />
      </div>
      {description && (
        <p
          className={cn(
            'mt-5 text-lg leading-relaxed',
            isLight ? 'text-white/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
