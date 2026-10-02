import { CalendarDays, CheckCircle2, Clock, MapPin, Trophy } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { Container } from '@/components/common/Container'
import { DateBadge } from '@/components/common/DateBadge'
import { PageBanner } from '@/components/common/PageBanner'
import { activities, findActivity } from '@/data/activities'
import { cn } from '@/lib/utils'
import { NotFound } from '@/pages/NotFound/NotFound'

export function ActivityDetailPage() {
  const { activitySlug } = useParams()
  const activity = findActivity(activitySlug)

  if (!activity) return <NotFound />

  return (
    <>
      <PageBanner
        title={activity.title}
        description={activity.summary}
        breadcrumbs={[{ label: 'Activities', href: '/activities' }, { label: activity.title }]}
        image={activity.image}
      />

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <section className="space-y-6">
            <img
              src={activity.image}
              alt={activity.imageAlt}
              className="aspect-[16/9] w-full rounded-lg object-cover shadow-lg"
            />
            <div className="space-y-4 text-lg leading-relaxed">
              {activity.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="font-display text-2xl font-bold text-primary-900">Highlights</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {activity.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 rounded-lg border bg-card p-4 shadow-xs">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
                  <span className="font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          {activity.upcomingEvents && (
            <section className="space-y-5">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-primary-900">
                <CalendarDays aria-hidden className="size-6 text-secondary-600" />
                Upcoming {activity.slug === 'seminars' ? 'seminars' : 'events'}
              </h2>
              <ul className="divide-y overflow-hidden rounded-lg border bg-card shadow-sm">
                {activity.upcomingEvents.map((event) => (
                  <li key={`${event.date}-${event.title}`} className="flex gap-4 p-4 sm:p-5">
                    <DateBadge date={event.date} />
                    <div>
                      <p className="font-display font-semibold text-primary-900">{event.title}</p>
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
            </section>
          )}

          {activity.achievements && (
            <section className="space-y-5">
              <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-primary-900">
                <Trophy aria-hidden className="size-6 text-secondary-600" />
                Achievements
              </h2>
              <ul className="space-y-3">
                {activity.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 rounded-lg border-l-4 border-secondary bg-secondary-50 p-4 font-medium">
                    {achievement}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="lg:col-span-4">
          <nav aria-labelledby="all-activities-heading" className="sticky top-20 overflow-hidden rounded-lg border bg-card shadow-sm">
            <h2 id="all-activities-heading" className="bg-primary px-5 py-3.5 font-display font-semibold text-white">
              All activities
            </h2>
            <ul className="divide-y">
              {activities.map((otherActivity) => {
                const isCurrent = otherActivity.slug === activity.slug
                return (
                  <li key={otherActivity.slug}>
                    <Link
                      to={`/activities/${otherActivity.slug}`}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={cn(
                        'block px-5 py-3 font-medium transition-colors hover:bg-muted',
                        isCurrent && 'border-l-4 border-secondary bg-primary-50 font-semibold text-primary',
                      )}
                    >
                      {otherActivity.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>
      </Container>
    </>
  )
}
