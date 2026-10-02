import { Award, ScrollText } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { DateBadge } from '@/components/common/DateBadge'
import type { Achiever, Notice } from '@/data/home'
import { getInitials } from '@/lib/utils'
import { OrnamentHeading } from './OrnamentHeading'

const VISIBLE_NOTICE_COUNT = 5
const ACHIEVERS_PER_CATEGORY = 2

interface HeritageNoticesAndAchieversProps {
  notices: Notice[]
  achievers: Achiever[]
}

export function HeritageNoticesAndAchievers({ notices, achievers }: HeritageNoticesAndAchieversProps) {
  const featuredAchievers = [
    ...achievers.filter((achiever) => achiever.category === 'board').slice(0, ACHIEVERS_PER_CATEGORY),
    ...achievers.filter((achiever) => achiever.category === 'competitive').slice(0, ACHIEVERS_PER_CATEGORY),
  ]

  return (
    <section id="notices" aria-label="Notices and achievers" className="scroll-mt-20 py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12">
        <article className="lg:col-span-5">
          <OrnamentHeading eyebrow="Stay informed" title="Notice Board" align="left" />
          <ul className="mt-8 divide-y divide-dashed divide-secondary-300 border-y-4 border-double border-secondary bg-card px-5">
            {notices.slice(0, VISIBLE_NOTICE_COUNT).map((notice) => (
              <li key={notice.title} className="flex gap-4 py-4">
                <DateBadge date={notice.date} tone="navy" />
                <div className="min-w-0">
                  {notice.isNew && (
                    <span className="mb-1 inline-block font-display text-xs font-bold tracking-wider text-accent uppercase italic">
                      New
                    </span>
                  )}
                  {notice.href ? (
                    <Link to={notice.href} className="block leading-snug font-medium text-primary-900 hover:underline">
                      {notice.title}
                    </Link>
                  ) : (
                    <p className="leading-snug font-medium text-primary-900">{notice.title}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <ScrollText aria-hidden className="size-4" />
            Circulars are also shared with parents on the school app.
          </p>
        </article>

        <article id="achievers" className="scroll-mt-20 lg:col-span-7">
          <OrnamentHeading eyebrow="Pride of Invictus" title="Our Achievers 2026" align="left" />
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {featuredAchievers.map((achiever) => (
              <li key={achiever.name} className="relative flex items-center gap-4 rounded-t-[3rem] border border-secondary-200 bg-card p-5 shadow-sm">
                <span
                  aria-hidden
                  className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xl font-bold text-secondary-300 ring-4 ring-secondary-200"
                >
                  {getInitials(achiever.name)}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-2xl font-bold text-primary-700">{achiever.score}</p>
                  <p className="font-semibold text-primary-900">{achiever.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {achiever.exam} · {achiever.detail}
                  </p>
                </div>
                <Award aria-hidden className="absolute top-4 right-4 size-5 text-secondary-500" />
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </section>
  )
}
