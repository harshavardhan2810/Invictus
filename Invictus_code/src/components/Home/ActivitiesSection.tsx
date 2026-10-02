import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { ActivityCard } from '@/components/Activities/ActivityCard'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import type { Activity } from '@/data/activities'

export function ActivitiesSection({ activities }: { activities: Activity[] }) {
  return (
    <section aria-labelledby="activities-heading" className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Beyond the Classroom"
            title="Activities that shape character"
            description="Seminars, sports, culture, science and NCC — every student finds a place to shine."
            titleId="activities-heading"
          />
          <Button asChild variant="outline" className="self-start md:self-auto">
            <Link to="/activities">
              All activities
              <ArrowRight />
            </Link>
          </Button>
        </div>
        {/* Mobile: swipeable row. sm and up: responsive grid. */}
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
          {activities.map((activity) => (
            <li key={activity.slug} className="w-[70%] shrink-0 snap-start sm:w-auto">
              <ActivityCard activity={activity} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
