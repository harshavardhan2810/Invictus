import { images } from '@/assets/images'

export interface ActivityEvent {
  title: string
  date: string
  time: string
  venue: string
}

export interface Activity {
  slug: string
  title: string
  summary: string
  image: string
  imageAlt: string
  overview: string[]
  highlights: string[]
  upcomingEvents?: ActivityEvent[]
  achievements?: string[]
}

// Placeholder content. Dates are ISO strings so they format in Indian style.
export const activities: Activity[] = [
  {
    slug: 'seminars',
    title: 'Seminars & Workshops',
    summary: 'Expert talks, career guidance and hands-on workshops throughout the year.',
    image: images.activitySeminar,
    imageAlt: 'Students attending a seminar in a lecture hall',
    overview: [
      'Our seminar series brings scientists, doctors, engineers, entrepreneurs and alumni to campus so students can learn directly from people working in the fields they aspire to join.',
      'Workshops on study skills, exam stress, cyber safety and financial literacy run every term, and parents are invited to selected sessions.',
    ],
    highlights: [
      'Career guidance seminars for Classes 10 and 12',
      'JEE / NEET strategy sessions by subject experts',
      'Cyber safety and digital citizenship workshops',
      'Parent orientation on stream selection',
    ],
    upcomingEvents: [
      {
        title: 'Choosing the Right Stream after Class 10',
        date: '2026-10-17',
        time: '10:00 AM',
        venue: 'Seminar Hall',
      },
      {
        title: 'Cracking JEE Main: Strategy & Time Management',
        date: '2026-11-07',
        time: '11:00 AM',
        venue: 'Seminar Hall',
      },
      {
        title: 'Cyber Safety Workshop for Classes 8 & 9',
        date: '2026-11-21',
        time: '2:00 PM',
        venue: 'Computer Lab 2',
      },
      {
        title: 'Managing Board Exam Stress — Session for Parents',
        date: '2026-12-05',
        time: '10:30 AM',
        venue: 'Auditorium',
      },
    ],
  },
  {
    slug: 'sports',
    title: 'Sports & Games',
    summary: 'Cricket, kabaddi, athletics, basketball and more, coached by qualified trainers.',
    image: images.activitySports,
    imageAlt: 'Students playing cricket on the school ground',
    overview: [
      'Every student has daily physical education, and our coaches train school teams for CBSE cluster, zonal and state-level competitions.',
      'The campus includes a full-size cricket ground, a 200 m athletics track, basketball and volleyball courts, and an indoor hall for table tennis, chess and yoga.',
    ],
    highlights: [
      'Cricket, football, kabaddi, kho-kho and athletics',
      'Basketball, volleyball and badminton courts',
      'Indoor games: table tennis, chess and carrom',
      'Daily yoga and an annual Sports Day',
    ],
    achievements: [
      'CBSE Cluster VII Athletics 2025 — 3 gold and 2 silver medals',
      'Hyderabad Inter-School Kabaddi Championship 2025 — Winners',
      'Under-17 Cricket (Zonal) 2025 — Runners-up',
      'State-level Chess 2025 — 2 students selected',
    ],
  },
  {
    slug: 'cultural',
    title: 'Cultural Activities',
    summary: 'Classical dance, music, drama and celebrations of India’s festivals.',
    image: images.activityCultural,
    imageAlt: 'A student performing a classical Indian dance',
    overview: [
      'Students train in Bharatanatyam, Kuchipudi, Carnatic and Hindustani music, instrumental music and theatre with experienced gurus.',
      'The school celebrates Independence Day, Republic Day, Bathukamma, Diwali, Christmas and Eid together, and the Annual Day gives every student a chance to perform.',
    ],
    highlights: [
      'Classical dance and music classes',
      'Drama, elocution and debate clubs',
      'Annual Day and Founders’ Day celebrations',
      'Inter-house cultural competitions',
    ],
    upcomingEvents: [
      { title: 'Bathukamma Celebrations', date: '2026-10-09', time: '9:00 AM', venue: 'School Ground' },
      { title: 'Inter-house Elocution (Telugu & Hindi)', date: '2026-10-24', time: '11:00 AM', venue: 'Auditorium' },
      { title: 'Annual Day 2026', date: '2026-12-19', time: '5:30 PM', venue: 'Open-Air Theatre' },
    ],
  },
  {
    slug: 'science-club',
    title: 'Science & Innovation Club',
    summary: 'Experiments, robotics and science exhibitions that bring concepts to life.',
    image: images.activityScience,
    imageAlt: 'A student working in the school chemistry laboratory',
    overview: [
      'The Science & Innovation Club meets twice a week in our Atal Tinkering Lab, where students build working models, learn robotics and coding, and take part in national science competitions.',
      'Each year the club hosts a school Science Exhibition that is open to parents and neighbouring schools.',
    ],
    highlights: [
      'Atal Tinkering Lab with robotics and 3D printing',
      'Annual Science Exhibition',
      'INSPIRE-MANAK and National Children’s Science Congress entries',
      'Astronomy nights and field visits',
    ],
    achievements: [
      'INSPIRE-MANAK 2025 — 2 projects shortlisted at district level',
      'Regional Science Exhibition 2025 — First prize (Class 9)',
    ],
  },
  {
    slug: 'ncc',
    title: 'NCC & Parades',
    summary: 'Discipline, leadership and service through the National Cadet Corps.',
    image: images.activityParade,
    imageAlt: 'Students in uniform marching in a parade',
    overview: [
      'Our NCC unit trains cadets in drill, map reading, first aid and community service, building discipline and leadership.',
      'Cadets lead the Independence Day and Republic Day parades on campus and attend annual training camps.',
    ],
    highlights: [
      'NCC Junior Division for boys and girls',
      'Independence Day and Republic Day parades',
      'Annual training camps and trekking',
      'Swachh Bharat and community service drives',
    ],
  },
]

export function findActivity(slug: string | undefined) {
  return activities.find((activity) => activity.slug === slug)
}
