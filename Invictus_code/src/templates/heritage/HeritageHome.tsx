import { activities } from '@/data/activities'
import { faculty } from '@/data/faculty'
import { achievers, ctaContent, heroSlides, notices, stats, welcomeContent } from '@/data/home'
import { programs } from '@/data/programs'
import { HeritageAbout } from './HeritageAbout'
import { HeritageActivities } from './HeritageActivities'
import { HeritageCta } from './HeritageCta'
import { HeritageFaculty } from './HeritageFaculty'
import { HeritageHero } from './HeritageHero'
import { HeritageNoticesAndAchievers } from './HeritageNoticesAndAchievers'
import { HeritagePrograms } from './HeritagePrograms'
import { HeritageStats } from './HeritageStats'

// Same content as the Classic home page, presented with the Heritage layout.
export function HeritageHome() {
  return (
    <>
      <HeritageHero slides={heroSlides} />
      <HeritageStats stats={stats} />
      <HeritageAbout content={welcomeContent} />
      <HeritagePrograms programs={programs} />
      <HeritageNoticesAndAchievers notices={notices} achievers={achievers} />
      <HeritageActivities activities={activities} />
      <HeritageFaculty members={faculty} />
      <HeritageCta content={ctaContent} />
    </>
  )
}
