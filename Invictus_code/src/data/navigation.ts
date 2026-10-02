import { activities } from './activities'
import { programs } from './programs'

export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface NavGroup {
  label: string
  children: NavLink[]
}

export type NavItem = NavLink | NavGroup

export function isNavGroup(item: NavItem): item is NavGroup {
  return 'children' in item
}

// About and Faculty are sections on the home page, so they aren't menu items.
export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Programs',
    children: [
      { label: 'All Programs', href: '/programs', description: 'Classes 11, 12 & IIT at a glance' },
      ...programs.map((program) => ({
        label: program.title,
        href: `/programs/${program.slug}`,
        description: program.tagline,
      })),
    ],
  },
  {
    label: 'Admissions',
    children: [
      {
        label: 'Admission Procedure',
        href: '/admissions',
        description: 'Eligibility, documents and important dates',
      },
      { label: 'Apply Online', href: '/admissions/apply', description: 'Admission form for 2027–28' },
      { label: 'Fee Structure', href: '/admissions/fees', description: 'Tuition and other fees' },
    ],
  },
  {
    label: 'Downloads',
    children: [
      {
        label: 'Exam Papers',
        href: '/downloads/exam-papers',
        description: 'CBSE board and school examination papers',
      },
      {
        label: 'Competitive Papers',
        href: '/downloads/competitive-papers',
        description: 'JEE, NEET, CUET and EAPCET previous papers',
      },
      { label: 'Syllabus', href: '/downloads/syllabus', description: 'CBSE syllabus 2026–27' },
    ],
  },
  {
    label: 'Activities',
    children: [
      { label: 'All Activities', href: '/activities', description: 'Life beyond the classroom' },
      ...activities.map((activity) => ({
        label: activity.title,
        href: `/activities/${activity.slug}`,
        description: activity.summary,
      })),
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/#contact' },
]

// Flat menu used by the Minimal template — each item opens the section's overview page.
export const minimalNavigation: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Programs', href: '/programs' },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Downloads', href: '/downloads/exam-papers' },
  { label: 'Activities', href: '/activities' },
  { label: 'Contact', href: '/#contact' },
]

export const footerQuickLinks: NavLink[] = [
  { label: 'Programs', href: '/programs' },
  { label: 'Admission Procedure', href: '/admissions' },
  { label: 'Apply Online', href: '/admissions/apply' },
  { label: 'Exam Papers', href: '/downloads/exam-papers' },
  { label: 'Competitive Papers', href: '/downloads/competitive-papers' },
  { label: 'Activities', href: '/activities' },
  { label: 'Gallery', href: '/gallery' },
]
