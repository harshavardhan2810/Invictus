import { BookOpenCheck, CalendarDays, FileDown, GraduationCap, type LucideIcon } from 'lucide-react'

import { images } from '@/assets/images'
import { formatIndianNumber, formatRupees } from '@/lib/format'
import { activities, type ActivityEvent } from './activities'
import { siteConfig } from './site'

export interface CallToAction {
  label: string
  href: string
}

export interface HeroSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  primaryCta?: CallToAction
  secondaryCta?: CallToAction
}

export interface QuickLink {
  title: string
  description: string
  href: string
  icon: LucideIcon
  tone: 'primary' | 'secondary' | 'accent' | 'success'
}

export interface TickerItem {
  text: string
  href?: string
}

export interface Notice {
  title: string
  date: string
  href?: string
  isNew?: boolean
}

export interface Stat {
  value: string
  label: string
}

export interface Achiever {
  name: string
  score: string
  exam: string
  detail: string
  category: 'board' | 'competitive'
}

export interface WelcomeContent {
  eyebrow: string
  title: string
  paragraphs: string[]
  image: { src: string; alt: string }
  /** Second photo used by the Heritage template's arch collage. */
  secondaryImage: { src: string; alt: string }
  principal: { name: string; title: string; message: string }
  highlights: string[]
  cta: CallToAction
}

export interface CtaContent {
  eyebrow: string
  title: string
  description: string
  primaryCta: CallToAction
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'welcome',
    eyebrow: `CBSE Affiliated · Estd. ${siteConfig.establishedYear}`,
    title: 'Where Every Student Rises Unconquered',
    description:
      'A CBSE senior secondary school in Hyderabad for Classes 8 to 12, combining strong academics with values, sports and the arts.',
    image: images.heroCampus,
    imageAlt: 'Aerial view of a hillside school campus during Sports Day',
    primaryCta: { label: 'Apply for 2027–28', href: '/admissions/apply' },
    secondaryCta: { label: 'Explore Programs', href: '/programs' },
  },
  {
    id: 'foundation',
    eyebrow: 'IIT-JEE & NEET Foundation',
    title: 'Board Excellence with Entrance Exam Readiness',
    description:
      'Integrated JEE Main / Advanced and NEET (UG) coaching from Class 9, taught on campus by experienced faculty.',
    image: images.heroLab,
    imageAlt: 'Students working on computers in the school lab',
    primaryCta: { label: 'Class 11 Streams', href: '/programs/class-11' },
    secondaryCta: { label: 'Download Papers', href: '/downloads/competitive-papers' },
  },
  {
    id: 'heritage',
    eyebrow: 'Campus Life in Hyderabad',
    title: 'A Campus That Feels Like Home',
    description:
      'Spacious classrooms, modern labs, a library and a large playground — right in the heart of Madhapur.',
    image: images.heroHeritage,
    imageAlt: 'Students on the ground in front of a heritage school building',
    primaryCta: { label: 'View Activities', href: '/activities' },
  },
  {
    id: 'values',
    eyebrow: 'Values & Culture',
    title: 'Rooted in Indian Values, Ready for the World',
    description:
      'From Republic Day parades to Bathukamma and Annual Day, our students celebrate India’s diversity together.',
    image: images.heroCelebration,
    imageAlt: 'Students in traditional attire with the national flag at a Republic Day celebration',
    primaryCta: { label: 'Cultural Activities', href: '/activities/cultural' },
  },
]

export const quickLinks: QuickLink[] = [
  {
    title: 'Admissions 2027–28',
    description: 'Apply online for Classes 11, 12 & IIT Entrance',
    href: '/admissions/apply',
    icon: GraduationCap,
    tone: 'secondary',
  },
  {
    title: 'Exam Papers',
    description: 'State board & sample papers',
    href: '/downloads/exam-papers',
    icon: FileDown,
    tone: 'primary',
  },
  {
    title: 'Competitive Papers',
    description: 'JEE, NEET, CUET & EAPCET',
    href: '/downloads/competitive-papers',
    icon: BookOpenCheck,
    tone: 'accent',
  },
  {
    title: 'Events & Activities',
    description: 'Seminars, sports & culture',
    href: '/activities',
    icon: CalendarDays,
    tone: 'success',
  },
]

export const tickerItems: TickerItem[] = [
  { text: 'Admissions open for 2027–28 — Classes 8, 9 and 11. Apply online now.', href: '/admissions/apply' },
  { text: 'CBSE Class 10 & 12 Board Results 2026: 100% pass with 42 students scoring above 95%.' },
  { text: 'JEE Main 2026: 18 students scored above the 99th percentile.' },
  { text: 'Career guidance seminar on stream selection — 17 Oct 2026, 10:00 AM.', href: '/activities/seminars' },
  { text: 'Previous year JEE, NEET and EAPCET papers now available for download.', href: '/downloads/competitive-papers' },
]

export const notices: Notice[] = [
  { title: 'Half-yearly examination timetable for Classes 8 to 12', date: '2026-09-28', isNew: true },
  { title: 'Dussehra holidays: 20 Oct to 25 Oct 2026. School reopens on 26 Oct.', date: '2026-09-26', isNew: true },
  { title: 'Parent–Teacher Meeting for Classes 10 & 12 on Saturday, 10 Oct 2026', date: '2026-09-24' },
  { title: 'CBSE registration for Class 10 and 12 board examinations 2027 — submit details by 15 Oct', date: '2026-09-20' },
  { title: 'Admission forms for 2027–28 available from 1 Nov 2026', date: '2026-09-18', href: '/admissions' },
  { title: 'Inter-house sports competitions schedule released', date: '2026-09-15', href: '/activities/sports' },
  { title: 'Fee payment reminder: second term fee due by 10 Oct 2026', date: '2026-09-12' },
]

// Upcoming events are drawn from the activities data so each event lives in one place.
export const upcomingEvents: (ActivityEvent & { activitySlug: string })[] = activities
  .flatMap((activity) =>
    (activity.upcomingEvents ?? []).map((event) => ({ ...event, activitySlug: activity.slug })),
  )
  .sort((first, second) => first.date.localeCompare(second.date))
  .slice(0, 4)

export const stats: Stat[] = [
  { value: `${new Date().getFullYear() - siteConfig.establishedYear}+`, label: 'Years of excellence' },
  { value: `${formatIndianNumber(3200)}+`, label: 'Students' },
  { value: '150+', label: 'Qualified teachers' },
  { value: `${formatIndianNumber(18500)}+`, label: 'Alumni' },
  { value: formatRupees(2500000), label: 'Scholarships awarded in 2025–26' },
]

// Placeholder results — replace with real achievers each year.
export const achievers: Achiever[] = [
  { name: 'Sai Charan Reddy', score: '99.2%', exam: 'CBSE Class XII', detail: 'Science (PCM) · 2026', category: 'board' },
  { name: 'Ananya Sharma', score: '98.6%', exam: 'CBSE Class XII', detail: 'Commerce · 2026', category: 'board' },
  { name: 'Mohammed Faizan', score: '98.4%', exam: 'CBSE Class X', detail: 'School topper · 2026', category: 'board' },
  { name: 'Sri Vaishnavi K.', score: '98.2%', exam: 'CBSE Class X', detail: '100/100 in Mathematics · 2026', category: 'board' },
  { name: 'Karthik Varma', score: '99.71', exam: 'JEE Main 2026', detail: 'Percentile', category: 'competitive' },
  { name: 'Harini Rao', score: `AIR ${formatIndianNumber(1248)}`, exam: 'NEET (UG) 2026', detail: 'All India Rank', category: 'competitive' },
  { name: 'Aditya Nair', score: `AIR ${formatIndianNumber(3456)}`, exam: 'JEE Advanced 2026', detail: 'All India Rank', category: 'competitive' },
  { name: 'Priya Deshmukh', score: 'Rank 612', exam: 'TS EAPCET 2026', detail: 'Engineering stream', category: 'competitive' },
]

export const welcomeContent: WelcomeContent = {
  eyebrow: 'Welcome to Invictus',
  title: 'Educating minds, building character',
  paragraphs: [
    `Founded in ${siteConfig.establishedYear}, Invictus Senior Secondary School is affiliated to the Central Board of Secondary Education (CBSE), New Delhi. We offer Classes 8 to 12 with Science, Commerce and Humanities streams at the senior secondary level.`,
    'Our teachers blend the NCERT curriculum with activity-based learning, regular assessment and personal mentoring, so that every child achieves academic excellence while growing in confidence, discipline and values.',
  ],
  image: { src: images.aboutCampus, alt: 'The main school building and playground' },
  secondaryImage: { src: images.activityScience, alt: 'A student working in the chemistry laboratory' },
  principal: {
    name: 'Dr. S. Radhika Menon',
    title: 'Principal',
    message:
      'Our aim is simple — to help every child discover their strengths and the courage to pursue them. We are proud of our results, but prouder still of the kind, responsible young citizens our students become.',
  },
  highlights: [
    'CBSE affiliated, English medium',
    'Integrated JEE / NEET foundation',
    'Smart classrooms and Atal Tinkering Lab',
    'Transport across Hyderabad & Cyberabad',
  ],
  cta: { label: 'Admission Procedure', href: '/admissions' },
}

export const ctaContent: CtaContent = {
  eyebrow: `Admissions ${siteConfig.academicYear}`,
  title: 'Give your child the Invictus advantage',
  description:
    'Seats are limited for Classes 8, 9 and 11. Apply online today or visit our campus in Madhapur, Hyderabad.',
  primaryCta: { label: 'Apply Online', href: '/admissions/apply' },
}
