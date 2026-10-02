import { LotusOrnament } from '@/components/common/Ornaments'
import { cn } from '@/lib/utils'

interface OrnamentHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  titleId?: string
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function OrnamentHeading({
  eyebrow,
  title,
  description,
  titleId,
  align = 'center',
  tone = 'dark',
  className,
}: OrnamentHeadingProps) {
  const isLight = tone === 'light'
  const isCentered = align === 'center'

  return (
    <div className={cn('max-w-2xl', isCentered && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('font-display text-lg italic', isLight ? 'text-secondary-200' : 'text-accent')}>{eyebrow}</p>
      )}
      <h2
        id={titleId}
        className={cn(
          'mt-1 font-display text-3xl leading-tight font-bold text-balance sm:text-4xl lg:text-[2.75rem]',
          isLight ? 'text-white' : 'text-primary-800',
        )}
      >
        {title}
      </h2>
      <div
        aria-hidden
        className={cn('mt-4 flex items-center gap-3 text-secondary-500', isCentered && 'justify-center')}
      >
        <span className="h-px w-14 bg-current" />
        <LotusOrnament className="h-5" />
        <span className="h-px w-14 bg-current" />
      </div>
      {description && (
        <p className={cn('mt-4 text-lg leading-relaxed', isLight ? 'text-white/80' : 'text-muted-foreground')}>
          {description}
        </p>
      )}
    </div>
  )
}
