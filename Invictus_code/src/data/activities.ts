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

export const activities: Activity[] = [
  {
    slug: 'education',
    title: 'Academic & Education',
    summary:
      'Focused academic learning with regular assessments, guidance and strong subject fundamentals.',
    image: images.activityScience,
    imageAlt: 'Students engaged in academic learning',
    overview: [
      'Our academic programme focuses on strong fundamentals, concept-based learning and consistent preparation for Intermediate examinations.',
      'Regular assessments and faculty guidance help students track their progress and improve their performance.',
    ],
    highlights: [
      'Concept-based classroom learning',
      'Regular academic assessments',
      'Doubt-clearing and revision sessions',
      'Individual academic guidance',
      'Study skills and time management',
    ],
  },

  {
    slug: 'competitive-exams',
    title: 'IIT-JEE Training',
    summary:
      'Focused preparation and expert guidance for JEE Main and Advanced.',
    image: images.activityScience,
    imageAlt: 'Students preparing for competitive examinations',
    overview: [
      'Our IIT-JEE programme builds strong foundations in Physics, Chemistry and Mathematics through focused classroom teaching and regular practice.',
      'Students receive mock tests, doubt-clearing sessions and performance guidance throughout their preparation.',
    ],
    highlights: [
      'JEE Main and Advanced preparation',
      'Physics, Chemistry and Mathematics',
      'Regular practice and mock tests',
      'Doubt-clearing sessions',
      'Performance analysis',
    ],
    upcomingEvents: [
      {
        title: 'JEE Orientation & Programme Introduction',
        date: '2026-10-12',
        time: '10:00 AM',
        venue: 'Seminar Hall',
      },
      {
        title: 'JEE Mathematics Problem-Solving Workshop',
        date: '2026-10-31',
        time: '10:00 AM',
        venue: 'Classroom Block A',
      },
      {
        title: 'JEE Physics Revision Session',
        date: '2026-11-14',
        time: '10:00 AM',
        venue: 'Classroom Block A',
      },
    ],
  },

  {
    slug: 'sports',
    title: 'Sports & Games',
    summary:
      'Encouraging fitness, teamwork and discipline through sports and recreational activities.',
    image: images.activitySports,
    imageAlt: 'Students participating in sports activities',
    overview: [
      'Sports and physical activities help students maintain a healthy balance between academics and personal well-being.',
      'Students can participate in games, fitness activities and friendly competitions that encourage teamwork and discipline.',
    ],
    highlights: [
      'Cricket and football',
      'Basketball and volleyball',
      'Badminton and athletics',
      'Indoor games',
      'Annual Sports Day',
    ],
  },

  {
    slug: 'cultural',
    title: 'Cultural Activities',
    summary:
      'Celebrating creativity, talent and Indian culture through music, arts and cultural events.',
    image: images.activityCultural,
    imageAlt: 'Students participating in a cultural activity',
    overview: [
      'Cultural activities give students opportunities to express their creativity and develop confidence beyond academics.',
      'Students participate in music, dance, arts, celebrations and college cultural programmes throughout the year.',
    ],
    highlights: [
      'Music and dance programmes',
      'Drama and cultural performances',
      'Art and creative activities',
      'College celebrations',
      'Annual cultural events',
    ],
    upcomingEvents: [
      {
        title: 'Cultural Talent Programme',
        date: '2026-10-24',
        time: '11:00 AM',
        venue: 'Auditorium',
      },
      {
        title: 'Annual Cultural Programme',
        date: '2026-12-19',
        time: '5:30 PM',
        venue: 'Open-Air Theatre',
      },
    ],
  },

  {
    slug: 'seminars',
    title: 'Seminars & Workshops',
    summary:
      'Career guidance, academic workshops and expert sessions for students and parents.',
    image: images.activitySeminar,
    imageAlt: 'Students attending a seminar',
    overview: [
      'Our seminars and workshops provide students with guidance on higher education, competitive examinations and career opportunities.',
      'Sessions also cover study techniques, time management and preparation strategies.',
    ],
    highlights: [
      'Career guidance sessions',
      'IIT-JEE strategy sessions',
      'Study skills workshops',
      'Higher education awareness',
      'Parent–student orientation',
    ],
    upcomingEvents: [
      {
        title: 'Career Planning After Intermediate',
        date: '2026-10-17',
        time: '10:00 AM',
        venue: 'Seminar Hall',
      },
      {
        title: 'JEE Main & Advanced Strategy Session',
        date: '2026-11-07',
        time: '11:00 AM',
        venue: 'Seminar Hall',
      },
      {
        title: 'Parent–Student Academic Orientation',
        date: '2026-12-05',
        time: '10:30 AM',
        venue: 'Auditorium',
      },
    ],
  },
]

export function findActivity(slug: string | undefined) {
  return activities.find((activity) => activity.slug === slug)
}
