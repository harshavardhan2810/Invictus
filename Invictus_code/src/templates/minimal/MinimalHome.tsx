import { activities } from '@/data/activities'
import { faculty } from '@/data/faculty'
import { achievers, ctaContent, heroSlides, notices, stats, upcomingEvents, welcomeContent } from '@/data/home'
import { programs } from '@/data/programs'
import { MinimalActivities } from './MinimalActivities'
import { MinimalCta } from './MinimalCta'
import { MinimalFaculty } from './MinimalFaculty'
import { MinimalHero } from './MinimalHero'
import { MinimalHighlights } from './MinimalHighlights'
import { MinimalPrograms } from './MinimalPrograms'
import { MinimalResults } from './MinimalResults'
import { MinimalUpdates } from './MinimalUpdates'

// Same content as the other templates, presented as a calm, text-led page.
export function MinimalHome() {
  return (
    <>
      <MinimalHero slide={heroSlides[0]} stats={stats} />
      <MinimalHighlights content={welcomeContent} />
      <MinimalPrograms programs={programs} />
      <MinimalUpdates notices={notices} events={upcomingEvents} />
      <MinimalResults achievers={achievers} />
      <MinimalActivities activities={activities} />
      <MinimalFaculty members={faculty} />
      <MinimalCta content={ctaContent} />
    </>
  )
}
