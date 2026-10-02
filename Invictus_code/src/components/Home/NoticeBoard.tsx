import { Bell, CalendarDays, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { DateBadge } from '@/components/common/DateBadge'
import { SectionHeading } from '@/components/common/SectionHeading'
import type { ActivityEvent } from '@/data/activities'
import type { Notice } from '@/data/home'

function NoticeList({ notices, isDuplicate }: { notices: Notice[]; isDuplicate?: boolean }) {
  return (
    <ul aria-hidden={isDuplicate} className="divide-y motion-reduce:[&[aria-hidden=true]]:hidden">
      {notices.map((notice) => (
        <li key={notice.title} className="flex gap-4 px-5 py-4">
          <DateBadge date={notice.date} />
          <div className="min-w-0">
            {notice.isNew && (
              <span className="mb-1 inline-block rounded-sm bg-accent px-1.5 py-0.5 font-display text-[10px] font-bold tracking-wider text-accent-foreground uppercase motion-safe:animate-pulse">
                New
              </span>
            )}
            {notice.href ? (
              <Link
                to={notice.href}
                tabIndex={isDuplicate ? -1 : undefined}
                className="block leading-snug font-medium text-primary-900 hover:text-accent hover:underline"
              >
                {notice.title}
              </Link>
            ) : (
              <p className="leading-snug font-medium text-primary-900">{notice.title}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}

interface NoticeBoardProps {
  notices: Notice[]
  events: (ActivityEvent & { activitySlug: string })[]
}

export function NoticeBoard({ notices, events }: NoticeBoardProps) {
  return (
    <section id="notices" aria-labelledby="notices-heading" className="scroll-mt-20 bg-background-subtle py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Stay Informed"
          title="Notices & Upcoming Events"
          titleId="notices-heading"
          align="center"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <article className="overflow-hidden rounded-lg border bg-card shadow-sm lg:col-span-7">
            <h3 className="flex items-center gap-2 bg-primary px-5 py-3.5 font-display text-lg font-semibold text-white">
              <Bell aria-hidden className="size-5 text-secondary-300" />
              Notice Board
            </h3>
            {/* Scrolls continuously; hover or focus pauses it, and reduced-motion users get a static list. */}
            <div className="group h-[420px] overflow-hidden motion-reduce:overflow-y-auto">
              <div className="animate-marquee-vertical group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                <NoticeList notices={notices} />
                <NoticeList notices={notices} isDuplicate />
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-lg border bg-card shadow-sm lg:col-span-5">
            <h3 className="flex items-center gap-2 bg-accent px-5 py-3.5 font-display text-lg font-semibold text-white">
              <CalendarDays aria-hidden className="size-5 text-secondary-200" />
              Upcoming Events
            </h3>
            <ul className="divide-y">
              {events.map((event) => (
                <li key={`${event.date}-${event.title}`} className="flex gap-4 px-5 py-4">
                  <DateBadge date={event.date} tone="navy" />
                  <div className="min-w-0">
                    <Link
                      to={`/activities/${event.activitySlug}`}
                      className="leading-snug font-semibold text-primary-900 hover:text-accent hover:underline"
                    >
                      {event.title}
                    </Link>
                    <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock aria-hidden className="size-3.5" />
                        {event.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin aria-hidden className="size-3.5" />
                        {event.venue}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  )
}
