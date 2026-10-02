export interface Stream {
  name: string
  subjects: string[]
  idealFor: string
}

export interface Program {
  slug: string
  grade: number
  title: string
  romanNumeral: string
  stage: 'Middle Stage' | 'Secondary Stage' | 'Senior Secondary Stage'
  tagline: string
  overview: string
  /** Empty for Classes 11–12, where subjects come from the chosen stream. */
  subjects: string[]
  highlights: string[]
  assessment: string
  streams?: Stream[]
}

// Senior secondary streams offered in both Class 11 and Class 12 (CBSE scheme of studies).
const seniorSecondaryStreams: Stream[] = [
  {
    name: 'Science (PCM)',
    subjects: ['English Core', 'Physics', 'Chemistry', 'Mathematics', 'Computer Science / Physical Education'],
    idealFor: 'Engineering, architecture and JEE Main / Advanced aspirants',
  },
  {
    name: 'Science (PCB)',
    subjects: ['English Core', 'Physics', 'Chemistry', 'Biology', 'Mathematics / Psychology'],
    idealFor: 'Medicine, life sciences and NEET (UG) aspirants',
  },
  {
    name: 'Commerce',
    subjects: ['English Core', 'Accountancy', 'Business Studies', 'Economics', 'Mathematics / Informatics Practices'],
    idealFor: 'CA, CS, BBA, B.Com and CUET aspirants',
  },
  {
    name: 'Humanities',
    subjects: ['English Core', 'History', 'Political Science', 'Economics / Geography', 'Psychology'],
    idealFor: 'Law (CLAT), civil services, design and liberal arts',
  },
]

export const programs: Program[] = [
  {
    slug: 'class-8',
    grade: 8,
    title: 'Class 8',
    romanNumeral: 'VIII',
    stage: 'Middle Stage',
    tagline: 'Strong foundations and a love for learning',
    overview:
      'Class 8 bridges the middle and secondary years. Following the NCERT curriculum, students strengthen core concepts through activity-based learning, lab work and projects, while early Olympiad preparation builds problem-solving confidence.',
    subjects: [
      'English',
      'Hindi / Telugu (Second Language)',
      'Telugu / Sanskrit (Third Language)',
      'Mathematics',
      'Science',
      'Social Science',
      'Computer Science',
      'Art Education',
      'Health & Physical Education',
    ],
    highlights: [
      'Olympiad foundation (NSO, IMO, NCO)',
      'Weekly science and computer lab sessions',
      'Reading programme and public-speaking clubs',
      'Parent–teacher meetings every term',
    ],
    assessment: 'Two periodic tests and two term examinations, with continuous assessment of projects and activities.',
  },
  {
    slug: 'class-9',
    grade: 9,
    title: 'Class 9',
    romanNumeral: 'IX',
    stage: 'Secondary Stage',
    tagline: 'Preparing early for board and competitive exams',
    overview:
      'Class 9 begins the CBSE secondary stage. Alongside the board syllabus, students join our integrated IIT-JEE and NEET foundation programme, which develops conceptual depth in Mathematics and Science from the start.',
    subjects: [
      'English Language & Literature',
      'Hindi / Telugu',
      'Mathematics',
      'Science',
      'Social Science',
      'Artificial Intelligence / Information Technology (Skill Subject)',
      'Health & Physical Education',
    ],
    highlights: [
      'Integrated IIT-JEE / NEET foundation course',
      'Atal Tinkering Lab projects',
      'Fortnightly subject tests with detailed feedback',
      'NTSE and Olympiad coaching',
    ],
    assessment: 'Periodic tests, half-yearly and annual examinations, plus internal assessment as per CBSE guidelines.',
  },
  {
    slug: 'class-10',
    grade: 10,
    title: 'Class 10',
    romanNumeral: 'X',
    stage: 'Secondary Stage',
    tagline: 'Focused preparation for the CBSE Board Examination',
    overview:
      'Class 10 prepares students for the CBSE Secondary School Examination. Structured revision, pre-board examinations and regular practice with CBSE sample papers help every student perform at their best, while career counselling guides the choice of stream for Class 11.',
    subjects: [
      'English Language & Literature',
      'Hindi / Telugu',
      'Mathematics (Standard / Basic)',
      'Science',
      'Social Science',
      'Artificial Intelligence / Information Technology (Skill Subject)',
    ],
    highlights: [
      'Two pre-board examinations',
      'Practice with CBSE sample papers and previous year papers',
      'Doubt-clearing sessions after school hours',
      'Career counselling and stream selection guidance',
    ],
    assessment: 'CBSE Board Examination with internal assessment (periodic tests, portfolio and subject enrichment activities).',
  },
  {
    slug: 'class-11',
    grade: 11,
    title: 'Class 11',
    romanNumeral: 'XI',
    stage: 'Senior Secondary Stage',
    tagline: 'Choose your stream and your future',
    overview:
      'In Class 11 students specialise in Science, Commerce or Humanities. Science students can join integrated JEE Main / Advanced or NEET (UG) coaching on campus, and all streams receive CUET preparation and mentoring.',
    subjects: [],
    highlights: [
      'Integrated JEE Main / Advanced and NEET (UG) coaching',
      'CUET (UG) preparation for all streams',
      'Well-equipped Physics, Chemistry, Biology and Computer labs',
      'Weekly NTA-pattern mock tests',
    ],
    assessment: 'Unit tests, half-yearly and annual examinations, and practical examinations conducted by the school.',
    streams: seniorSecondaryStreams,
  },
  {
    slug: 'class-12',
    grade: 12,
    title: 'Class 12',
    romanNumeral: 'XII',
    stage: 'Senior Secondary Stage',
    tagline: 'Board excellence and entrance exam readiness',
    overview:
      'Class 12 balances the CBSE Senior School Certificate Examination with focused entrance preparation. Full-length mock tests, one-on-one mentoring and college admissions guidance help students take the next step with confidence.',
    subjects: [],
    highlights: [
      'Full-syllabus revision and pre-board examinations',
      'JEE, NEET, CUET and EAPCET mock test series',
      'College admissions and scholarship guidance',
      'Personal mentoring for every student',
    ],
    assessment: 'CBSE Board Examination with practical examinations and internal assessment.',
    streams: seniorSecondaryStreams,
  },
]

export function findProgram(slug: string | undefined) {
  return programs.find((program) => program.slug === slug)
}
