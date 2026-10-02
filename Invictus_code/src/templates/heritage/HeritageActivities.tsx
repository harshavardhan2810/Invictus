import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import type { Activity } from '@/data/activities'
import { OrnamentHeading } from './OrnamentHeading'

export function HeritageActivities({ activities }: { activities: Activity[] }) {
  return (
    <section aria-labelledby="activities-heading" className="bg-background-subtle py-16 sm:py-24">
      <Container>
        <OrnamentHeading
          eyebrow="Beyond the classroom"
          title="Life at Invictus"
          description="Seminars, sports, the arts, science and the NCC — every child finds a stage to shine."
          titleId="activities-heading"
        />
        {/* Mobile: swipeable row. sm and up: grid. */}
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
          {activities.map((activity) => (
            <li key={activity.slug} className="w-[62%] shrink-0 snap-start sm:w-auto">
              <Link to={`/activities/${activity.slug}`} className="group block text-center">
                <div className="aspect-[3/4] overflow-hidden rounded-t-full border-4 border-secondary-200 shadow-md transition-colors group-hover:border-secondary">
                  <img
                    src={activity.image}
                    alt={activity.imageAlt}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-primary-800 group-hover:underline">
                  {activity.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{activity.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
