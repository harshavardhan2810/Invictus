import { useState } from 'react'
import { Award } from 'lucide-react'

import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import type { Achiever } from '@/data/home'
import { cn, getInitials } from '@/lib/utils'

const categoryTabs: { value: Achiever['category']; label: string }[] = [
  { value: 'board', label: 'Board Results' },
  { value: 'competitive', label: 'Competitive Exams' },
]

export function AchieversSection({ achievers }: { achievers: Achiever[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Achiever['category']>('board')
  const visibleAchievers = achievers.filter((achiever) => achiever.category === selectedCategory)

  return (
    <section
      id="achievers"
      aria-labelledby="achievers-heading"
      className="relative scroll-mt-20 bg-background-subtle py-16 sm:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Pride of Invictus"
          title="Our Achievers 2026"
          titleId="achievers-heading"
          align="center"
        />

        <div role="group" aria-label="Filter achievers" className="mt-10 flex justify-center gap-2">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              aria-pressed={selectedCategory === tab.value}
              onClick={() => setSelectedCategory(tab.value)}
              className={cn(
                'rounded-full border px-5 py-2 font-display text-sm font-semibold transition-colors',
                selectedCategory === tab.value
                  ? 'border-primary bg-primary text-white'
                  : 'border-border-strong bg-background text-primary-900 hover:border-primary',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {visibleAchievers.map((achiever) => (
            <li
              key={achiever.name}
              className="relative flex flex-col items-center rounded-lg border-t-4 border-secondary bg-card px-3 pt-6 pb-5 text-center shadow-sm animate-in fade-in sm:px-5 sm:pt-8 sm:pb-6"
            >
              <Award aria-hidden className="absolute top-3 right-3 size-5 text-secondary-400 sm:size-6" />
              <span
                aria-hidden
                className="flex size-14 items-center justify-center rounded-full bg-primary font-display text-lg font-semibold text-secondary-300 ring-4 ring-secondary-200 sm:size-20 sm:text-2xl"
              >
                {getInitials(achiever.name)}
              </span>
              <p className="mt-4 font-display font-semibold text-primary-900 sm:text-lg">{achiever.name}</p>
              <p className="mt-2 font-display text-2xl font-bold text-accent sm:text-3xl">{achiever.score}</p>
              <p className="mt-1 text-[15px] font-semibold text-foreground sm:text-base">{achiever.exam}</p>
              <p className="text-sm text-muted-foreground">{achiever.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
