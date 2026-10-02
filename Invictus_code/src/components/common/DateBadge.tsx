import { formatIndianDate, getDateParts } from '@/lib/format'
import { cn } from '@/lib/utils'

interface DateBadgeProps {
  date: string
  tone?: 'saffron' | 'navy'
}

// Calendar-leaf style date, e.g. "18 / OCT".
export function DateBadge({ date, tone = 'saffron' }: DateBadgeProps) {
  const { day, month } = getDateParts(date)

  return (
    <time
      dateTime={date}
      title={formatIndianDate(date)}
      className={cn(
        'flex w-14 shrink-0 flex-col items-center overflow-hidden rounded-md border text-center',
        tone === 'saffron' ? 'border-secondary-300' : 'border-primary-200',
      )}
    >
      <span
        className={cn(
          'w-full py-0.5 font-display text-[11px] font-semibold tracking-wider uppercase',
          tone === 'saffron' ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-white',
        )}
      >
        {month}
      </span>
      <span className="py-1 font-display text-xl font-bold text-primary-900">{day}</span>
    </time>
  )
}
