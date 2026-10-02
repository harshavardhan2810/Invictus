import { images } from '@/assets/images'
import type { CallToAction } from './home'

export type AnnouncementType = 'campus' | 'exam' | 'result' | 'admission' | 'general'

export interface Announcement {
  /** Change the id when publishing a new announcement so visitors who dismissed the old one see it. */
  id: string
  type: AnnouncementType
  title: string
  message: string
  announcedOn: string
  highlights?: string[]
  image?: { src: string; alt: string }
  primaryCta?: CallToAction
  /** Optional ISO dates; outside this window the announcement is not shown. */
  showFrom?: string
  showUntil?: string
  /** Higher wins when several announcements are active. */
  priority: number
  isActive: boolean
}

// The popup shows the single highest-priority active announcement.
// Toggle `isActive` (or adjust priority) to switch between them.
export const announcements: Announcement[] = [
  {
    id: 'kokapet-campus-2027',
    type: 'campus',
    title: 'Our New Campus at Kokapet Opens in June 2027',
    message:
      'Invictus is expanding! The new Kokapet campus brings smart classrooms, a 400 m athletics track and an indoor sports complex to West Hyderabad.',
    announcedOn: '2026-09-28',
    highlights: [
      'Admissions open for Classes 8, 9 and 11',
      'Transport from Narsingi, Gandipet and Financial District',
      'Campus tours every Saturday, 10 AM – 1 PM',
    ],
    image: { src: images.heroCampus, alt: 'Aerial view of a school campus' },
    primaryCta: { label: 'Apply for Kokapet Campus', href: '/admissions/apply' },
    priority: 3,
    isActive: true,
  },
  {
    id: 'cbse-results-2026',
    type: 'result',
    title: 'CBSE Board Results 2026: 100% Pass',
    message:
      '42 students scored above 95% in the Class 10 and Class 12 board examinations. Congratulations to all our students and teachers!',
    announcedOn: '2026-05-14',
    primaryCta: { label: 'See our achievers', href: '/#achievers' },
    priority: 2,
    isActive: false,
  },
  {
    id: 'half-yearly-exams-2026',
    type: 'exam',
    title: 'Half-Yearly Examinations from 3 November 2026',
    message:
      'The timetable for Classes 8 to 12 has been published. Practice papers are available in the Downloads section.',
    announcedOn: '2026-09-30',
    primaryCta: { label: 'Download practice papers', href: '/downloads/exam-papers' },
    showUntil: '2026-11-03',
    priority: 1,
    isActive: false,
  },
]

export function getActiveAnnouncement(today = new Date()) {
  const todayIso = today.toISOString().slice(0, 10)
  return announcements
    .filter((announcement) => announcement.isActive)
    .filter((announcement) => !announcement.showFrom || announcement.showFrom <= todayIso)
    .filter((announcement) => !announcement.showUntil || announcement.showUntil >= todayIso)
    .sort((first, second) => second.priority - first.priority)[0]
}
