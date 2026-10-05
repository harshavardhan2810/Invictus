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
    eyebrow: `Intermediate Education · Estd. ${siteConfig.establishedYear}`,
    title: 'Build Your Future with Strong Foundations',
    description:
      'A focused Intermediate college combining strong academic preparation with structured IIT-JEE training, experienced faculty and a student-centred learning environment.',
    image: images.heroCampus,
    imageAlt: 'Students learning together on a modern college campus',
    primaryCta: { label: 'Admissions 2027–28', href: '/admissions/apply' },
    secondaryCta: { label: 'Explore Programs', href: '/programs' },
  },

  {
    id: 'iit',
    eyebrow: 'IIT-JEE Integrated Training',
    title: 'Prepare for IIT-JEE with the Right Guidance',
    description:
      'Integrated Intermediate and IIT-JEE preparation designed to strengthen concepts, problem-solving skills and competitive exam readiness.',
    image: images.heroLab,
    imageAlt: 'Students attending a focused academic learning session',
    primaryCta: { label: 'Explore IIT-JEE Training', href: '/programs/iit-training' },
    secondaryCta: { label: 'View Courses', href: '/programs' },
  },

  {
    id: 'academics',
    eyebrow: 'Intermediate Education',
    title: 'Learn. Practice. Perform.',
    description:
      'A structured academic environment with regular assessments, focused classroom learning and continuous guidance to help students perform at their best.',
    image: images.heroHeritage,
    imageAlt: 'Students studying and learning in a college environment',
    primaryCta: { label: 'Explore Academics', href: '/academics' },
    secondaryCta: { label: 'Meet Our Faculty', href: '/faculty' },
  },

  {
    id: 'future',
    eyebrow: 'Your Journey Starts Here',
    title: 'From Intermediate to Your Dream Career',
    description:
      'Develop strong fundamentals, build confidence and prepare for competitive examinations with dedicated academic and IIT-JEE training.',
    image: images.heroCelebration,
    imageAlt: 'Students celebrating their academic journey and achievements',
    primaryCta: { label: 'Apply Now', href: '/admissions/apply' },
    secondaryCta: { label: 'Contact Us', href: '/contact' },
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
  {
    text: 'Admissions open for 2027–28 — Intermediate & IIT-JEE Programmes. Apply online now.',
    href: '/admissions/apply',
  },
  {
    text: 'Integrated IIT-JEE preparation with Intermediate education and focused academic guidance.',
    href: '/programs/iit-training',
  },
  {
    text: 'Regular assessments, practice tests and performance tracking to help students improve consistently.',
    href: '/academics',
  },
  {
    text: 'Experienced faculty providing focused guidance for Intermediate and competitive exam preparation.',
    href: '/faculty',
  },
  {
    text: 'Explore our Intermediate programmes and IIT-JEE training options for 2027–28.',
    href: '/programs',
  },
]

export const notices: Notice[] = [
  {
    title: 'Admissions open for Intermediate & IIT-JEE Programmes for 2027–28',
	date: '2026-10-01',
    isNew: true,
  },
  {
    title: 'IIT-JEE orientation session for students and parents — registration now open',
    date: '2026-09-28',
    isNew: true,
  },
  {
    title: 'Intermediate first-year academic assessment schedule released',
    date: '2026-09-25',
  },
  {
    title: 'IIT-JEE weekly test series and performance assessment schedule announced',
    date: '2026-09-22',
  },
  {
    title: 'Admission forms for the 2027–28 academic year are now available',
    date: '2026-09-18',
  },
  {
    title: 'Parent–Student academic counselling sessions available by appointment',
    date: '2026-09-15',
  },
  {
    title: 'Regular doubt-clearing and problem-solving sessions for IIT-JEE preparation',
    date: '2026-09-12',
  },
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
  title: 'Building Strong Foundations for a Successful Future',
  paragraphs: [
    `Founded in ${siteConfig.establishedYear}, Invictus is an Intermediate college focused on academic excellence and competitive examination preparation. We provide a structured learning environment for students pursuing their Intermediate education along with focused IIT-JEE training.`,
    'Our experienced faculty combine concept-based teaching, regular assessments, problem-solving practice and personal guidance to help students build strong fundamentals, improve their confidence and prepare effectively for higher education and competitive examinations.',
  ],
  image: {
    src: images.aboutCampus,
    alt: 'Students learning together on the Invictus college campus',
  },
  secondaryImage: {
    src: images.activityScience,
    alt: 'Students attending a focused academic learning session',
  },
  principal: {
    name: 'Dr. Name of principal',
    title: 'Principal',
    message:
      'Our aim is to provide students with the right academic environment, guidance and opportunities to discover their potential. At Invictus, we focus on strong fundamentals, disciplined learning and preparing students confidently for the next stage of their academic journey.',
  },
  highlights: [
    'Intermediate education with focused academic preparation',
    'Integrated IIT-JEE Main & Advanced training',
    'Experienced and dedicated faculty',
    'Regular assessments and performance tracking',
  ],
  cta: { label: 'Admission Procedure', href: '/admissions' },
}

export const ctaContent: CtaContent = {
  eyebrow: `Admissions ${siteConfig.academicYear}`,
  title: 'Start Your Journey Towards a Successful Future',
  description:
    'Admissions are open for Intermediate programmes and integrated IIT-JEE training. Take the first step towards strong academics, competitive exam preparation and a brighter career.',
  primaryCta: { label: 'Apply for Admission', href: '/admissions/apply' },
}
