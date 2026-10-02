export type PaperCategory = 'exam' | 'competitive'

export type PaperType = 'Question Paper' | 'Sample Paper' | 'Marking Scheme' | 'Answer Key'

export interface QuestionPaper {
  id: string
  title: string
  category: PaperCategory
  /** Class for exam papers ("Class 10"), exam name for competitive papers ("JEE Main") */
  group: string
  subject: string
  year: number
  type: PaperType
  fileUrl: string
}

// Every listing points at the same placeholder PDF until real papers are uploaded.
const SAMPLE_FILE = '/papers/sample-question-paper.pdf'

type PaperEntry = Omit<QuestionPaper, 'id' | 'fileUrl' | 'category'>

function toPapers(category: PaperCategory, entries: PaperEntry[]): QuestionPaper[] {
  return entries.map((entry, index) => ({
    ...entry,
    id: `${category}-${index + 1}`,
    category,
    fileUrl: SAMPLE_FILE,
  }))
}

export const examPapers = toPapers('exam', [
  { title: 'CBSE Board Examination — Mathematics (Standard)', group: 'Class 10', subject: 'Mathematics', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Board Examination — Science', group: 'Class 10', subject: 'Science', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Board Examination — Social Science', group: 'Class 10', subject: 'Social Science', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Board Examination — English Language & Literature', group: 'Class 10', subject: 'English', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Sample Paper — Mathematics (Standard)', group: 'Class 10', subject: 'Mathematics', year: 2027, type: 'Sample Paper' },
  { title: 'CBSE Board Examination — Science (with Marking Scheme)', group: 'Class 10', subject: 'Science', year: 2025, type: 'Marking Scheme' },
  { title: 'CBSE Board Examination — Physics', group: 'Class 12', subject: 'Physics', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Board Examination — Chemistry', group: 'Class 12', subject: 'Chemistry', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Board Examination — Mathematics', group: 'Class 12', subject: 'Mathematics', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Board Examination — Biology', group: 'Class 12', subject: 'Biology', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Board Examination — Accountancy', group: 'Class 12', subject: 'Accountancy', year: 2026, type: 'Question Paper' },
  { title: 'CBSE Sample Paper — Physics', group: 'Class 12', subject: 'Physics', year: 2027, type: 'Sample Paper' },
  { title: 'Annual Examination — Mathematics', group: 'Class 11', subject: 'Mathematics', year: 2026, type: 'Question Paper' },
  { title: 'Annual Examination — Chemistry', group: 'Class 11', subject: 'Chemistry', year: 2026, type: 'Question Paper' },
  { title: 'Half-Yearly Examination — Science', group: 'Class 9', subject: 'Science', year: 2025, type: 'Question Paper' },
  { title: 'Half-Yearly Examination — Mathematics', group: 'Class 9', subject: 'Mathematics', year: 2025, type: 'Question Paper' },
  { title: 'Annual Examination — Science', group: 'Class 8', subject: 'Science', year: 2026, type: 'Question Paper' },
  { title: 'Annual Examination — Mathematics', group: 'Class 8', subject: 'Mathematics', year: 2026, type: 'Question Paper' },
])

export const competitivePapers = toPapers('competitive', [
  { title: 'JEE Main 2026 (January Session) — Paper 1, Shift 1', group: 'JEE Main', subject: 'Physics, Chemistry & Mathematics', year: 2026, type: 'Question Paper' },
  { title: 'JEE Main 2026 (January Session) — Answer Key', group: 'JEE Main', subject: 'Physics, Chemistry & Mathematics', year: 2026, type: 'Answer Key' },
  { title: 'JEE Main 2025 (April Session) — Paper 1, Shift 2', group: 'JEE Main', subject: 'Physics, Chemistry & Mathematics', year: 2025, type: 'Question Paper' },
  { title: 'JEE Advanced 2025 — Paper 1', group: 'JEE Advanced', subject: 'Physics, Chemistry & Mathematics', year: 2025, type: 'Question Paper' },
  { title: 'JEE Advanced 2025 — Paper 2', group: 'JEE Advanced', subject: 'Physics, Chemistry & Mathematics', year: 2025, type: 'Question Paper' },
  { title: 'NEET (UG) 2026 — Question Paper (Code 45)', group: 'NEET (UG)', subject: 'Physics, Chemistry & Biology', year: 2026, type: 'Question Paper' },
  { title: 'NEET (UG) 2026 — Answer Key', group: 'NEET (UG)', subject: 'Physics, Chemistry & Biology', year: 2026, type: 'Answer Key' },
  { title: 'NEET (UG) 2025 — Question Paper', group: 'NEET (UG)', subject: 'Physics, Chemistry & Biology', year: 2025, type: 'Question Paper' },
  { title: 'CUET (UG) 2026 — General Test', group: 'CUET (UG)', subject: 'General Test', year: 2026, type: 'Question Paper' },
  { title: 'TS EAPCET 2026 — Engineering Stream', group: 'TS EAPCET', subject: 'Mathematics, Physics & Chemistry', year: 2026, type: 'Question Paper' },
  { title: 'TS EAPCET 2026 — Agriculture & Pharmacy Stream', group: 'TS EAPCET', subject: 'Biology, Physics & Chemistry', year: 2026, type: 'Question Paper' },
  { title: 'National Science Olympiad (NSO) — Class 10', group: 'Olympiads', subject: 'Science', year: 2025, type: 'Sample Paper' },
  { title: 'International Mathematics Olympiad (IMO) — Class 9', group: 'Olympiads', subject: 'Mathematics', year: 2025, type: 'Sample Paper' },
])

export const paperCatalogues = {
  exam: {
    title: 'Exam Papers',
    description:
      'CBSE board question papers, sample papers and marking schemes, along with previous school examination papers for Classes 8 to 12.',
    groupLabel: 'Class',
    papers: examPapers,
  },
  competitive: {
    title: 'Competitive Exam Papers',
    description:
      'Previous year papers and answer keys for JEE Main, JEE Advanced, NEET (UG), CUET (UG), TS EAPCET and Olympiads.',
    groupLabel: 'Exam',
    papers: competitivePapers,
  },
} satisfies Record<
  PaperCategory,
  { title: string; description: string; groupLabel: string; papers: QuestionPaper[] }
>
