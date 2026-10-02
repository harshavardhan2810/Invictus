import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import type { ActivityEvent } from '@/data/activities'
import type { Notice } from '@/data/home'
import { formatIndianDate } from '@/lib/format'
import { MinimalSectionHeader } from './MinimalSectionHeader'

const VISIBLE_NOTICE_COUNT = 5

interface MinimalUpdatesProps {
  notices: Notice[]
  events: (ActivityEvent & { activitySlug: string })[]
}

export function MinimalUpdates({ notices, events }: MinimalUpdatesProps) {
  return (
    <section id="notices" aria-labelledby="updates-heading" className="scroll-mt-20 bg-background-subtle py-16 sm:py-24">
      <Container>
        <MinimalSectionHeader sectionNumber={3} label="Updates" title="Notices and upcoming events" titleId="updates-heading" />
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-semibold">Notices</h3>
            <ul className="mt-4 divide-y border-y">
              {notices.slice(0, VISIBLE_NOTICE_COUNT).map((notice) => (
                <li key={notice.title} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <time dateTime={notice.date} className="text-sm text-muted-foreground tabular-nums">
                    {formatIndianDate(notice.date)}
                  </time>
                  <p>
                    {notice.href ? (
                      <Link to={notice.href} className="hover:underline">
                        {notice.title}
                      </Link>
                    ) : (
                      notice.title
                    )}
                    {notice.isNew && (
                      <span className="ml-2 rounded-full bg-secondary-100 px-2 py-0.5 align-middle text-xs font-medium text-secondary-800">
                        New
                      </span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold">Upcoming events</h3>
            <ul className="mt-4 divide-y border-y">
              {events.map((event) => (
                <li key={`${event.date}-${event.title}`} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <time dateTime={event.date} className="text-sm text-muted-foreground tabular-nums">
                    {formatIndianDate(event.date)}
                  </time>
                  <p>
                    <Link to={`/activities/${event.activitySlug}`} className="font-medium hover:underline">
                      {event.title}
                    </Link>
                    <span className="block text-sm text-muted-foreground">
                      {event.time} · {event.venue}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
