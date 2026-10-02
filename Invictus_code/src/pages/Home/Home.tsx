import { CTASection } from '@/components/CTA/CTASection'
import { FacultySection } from '@/components/Faculty/FacultySection'
import { HeroCarousel } from '@/components/Hero/HeroCarousel'
// import { AchieversSection } from '@/components/Home/AchieversSection'
import { ActivitiesSection } from '@/components/Home/ActivitiesSection'
import { NoticeBoard } from '@/components/Home/NoticeBoard'
import { ProgramsSection } from '@/components/Home/ProgramsSection'
import { QuickLinks } from '@/components/Home/QuickLinks'
// import { StatsBand } from '@/components/Home/StatsBand'
import { WelcomeSection } from '@/components/Home/WelcomeSection'
import { activities } from '@/data/activities'
import { faculty } from '@/data/faculty'
import {
  // achievers,
  ctaContent,
  heroSlides,
  notices,
  quickLinks,
  //stats,
  upcomingEvents,
  welcomeContent,
} from '@/data/home'
import { programs } from '@/data/programs'

export function Home() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <QuickLinks links={quickLinks} />
      <WelcomeSection content={welcomeContent} />
      {/* <StatsBand stats={stats} /> */}
      <NoticeBoard notices={notices} events={upcomingEvents} />
      <ProgramsSection programs={programs} />
      {/* <AchieversSection achievers={achievers} /> */}
      <ActivitiesSection activities={activities} />
      <FacultySection members={faculty} />
      <CTASection content={ctaContent} />
    </>
  )
}
