import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import type { Activity } from '@/data/activities'
import { MinimalSectionHeader } from './MinimalSectionHeader'

export function MinimalActivities({ activities }: { activities: Activity[] }) {
  return (
    <section aria-labelledby="activities-heading" className="bg-background-subtle py-16 sm:py-24">
      <Container>
        <MinimalSectionHeader
          sectionNumber={5}
          label="Activities"
          title="Life beyond the classroom"
          titleId="activities-heading"
          action={
            <Link to="/activities" className="inline-flex items-center gap-1.5 font-medium text-secondary-700 hover:underline">
              All activities
              <ArrowRight className="size-4" />
            </Link>
          }
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <li key={activity.slug}>
              <Link
                to={`/activities/${activity.slug}`}
                className="group flex h-full items-center gap-4 rounded-xl border bg-card p-3 transition-colors hover:border-foreground"
              >
                <img
                  src={activity.image}
                  alt=""
                  loading="lazy"
                  className="size-20 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0">
                  <span className="block font-display font-semibold">{activity.title}</span>
                  <span className="mt-0.5 line-clamp-2 block text-sm text-muted-foreground">{activity.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
