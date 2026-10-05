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
  stage: 'Intermediate' | 'IIT-JEE Foundation & Preparation'
  tagline: string
  overview: string
  subjects: string[]
  highlights: string[]
  assessment: string
  streams?: Stream[]
}

// Intermediate programme
const intermediateStreams: Stream[] = [
  {
    name: 'MPC',
    subjects: [
      'English',
      'Mathematics',
      'Physics',
      'Chemistry',
    ],
    idealFor: 'Engineering, IIT-JEE and other technical higher-education programmes',
  },
]

export const programs: Program[] = [
  {
    slug: 'intermediate-first-year',
    grade: 11,
    title: 'Intermediate 1st Year',
    romanNumeral: 'I',
    stage: 'Intermediate',
    tagline: 'Build strong fundamentals for your future',
    overview:
      'Intermediate 1st Year provides a strong academic foundation through focused learning in Mathematics, Physics and Chemistry. Students can also begin structured IIT-JEE preparation alongside their Intermediate studies.',
    subjects: [],
    highlights: [
      'MPC-focused Intermediate education',
      'Strong foundation in Mathematics, Physics and Chemistry',
      'Integrated IIT-JEE preparation',
      'Regular academic assessments',
      'Doubt-clearing and individual guidance',
    ],
    assessment:
      'Regular subject tests, assignments, periodic examinations and IIT-JEE practice tests to monitor student progress.',
    streams: intermediateStreams,
  },

  {
    slug: 'intermediate-second-year',
    grade: 12,
    title: 'Intermediate 2nd Year',
    romanNumeral: 'II',
    stage: 'Intermediate',
    tagline: 'Strengthen concepts and prepare for the next step',
    overview:
      'Intermediate 2nd Year focuses on completing the academic syllabus, strengthening core concepts and preparing students for higher education and competitive examinations.',
    subjects: [],
    highlights: [
      'Focused Intermediate examination preparation',
      'Advanced Mathematics, Physics and Chemistry',
      'Integrated IIT-JEE preparation',
      'Regular revision and mock examinations',
      'Higher education and career guidance',
    ],
    assessment:
      'Regular chapter-wise tests, revision tests, full-length mock examinations and continuous performance analysis.',
    streams: intermediateStreams,
  },

  {
    slug: 'iit-jee-training',
    grade: 11,
    title: 'IIT-JEE Training',
    romanNumeral: 'I–II',
    stage: 'IIT-JEE Foundation & Preparation',
    tagline: 'Prepare with concepts, practice and precision',
    overview:
      'Our integrated IIT-JEE programme is designed alongside Intermediate education to build strong conceptual understanding and problem-solving skills in Physics, Chemistry and Mathematics.',
    subjects: [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Problem Solving',
      'JEE Main Preparation',
      'JEE Advanced Preparation',
    ],
    highlights: [
      'JEE Main and Advanced focused preparation',
      'Concept-based teaching',
      'Advanced problem-solving practice',
      'Regular chapter-wise tests',
      'Full-length JEE mock examinations',
      'Dedicated doubt-clearing sessions',
      'Individual performance analysis',
    ],
    assessment:
      'Regular JEE-pattern tests, chapter-wise assessments, mock examinations and performance analysis to track preparation and identify areas for improvement.',
  },
]

export function findProgram(slug: string | undefined) {
  return programs.find((program) => program.slug === slug)
}
