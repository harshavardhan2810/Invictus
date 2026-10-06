export type PaperCategory = 'exam' | 'competitive'

export type PaperType =
  | 'Question Paper'
  | 'Sample Paper'
  | 'Marking Scheme'
  | 'Answer Key'

export interface QuestionPaper {
  id: string
  title: string
  category: PaperCategory
  /** Year/class for academic papers, exam name for competitive papers */
  group: string
  subject: string
  year: number
  type: PaperType
  fileUrl: string
}

// Placeholder PDF until actual papers are uploaded.
const SAMPLE_FILE = '/papers/Sample-model-paper.pdf'

type PaperEntry = Omit<QuestionPaper, 'id' | 'fileUrl' | 'category'>

function toPapers(
  category: PaperCategory,
  entries: PaperEntry[],
): QuestionPaper[] {
  return entries.map((entry, index) => ({
    ...entry,
    id: `${category}-${index + 1}`,
    category,
    fileUrl: SAMPLE_FILE,
  }))
}

/* =========================================================
   INTERMEDIATE / ACADEMIC EXAM PAPERS
   ========================================================= */

export const examPapers = toPapers('exam', [
  {
    title: 'Intermediate 1st Year — Mathematics',
    group: 'Intermediate 1st Year',
    subject: 'Mathematics',
    year: 2027,
    type: 'Question Paper',
  },
  {
    title: 'Intermediate 1st Year — Physics',
    group: 'Intermediate 1st Year',
    subject: 'Physics',
    year: 2027,
    type: 'Question Paper',
  },
  {
    title: 'Intermediate 1st Year — Chemistry',
    group: 'Intermediate 1st Year',
    subject: 'Chemistry',
    year: 2027,
    type: 'Question Paper',
  },
  {
    title: 'Intermediate 1st Year — Mathematics Sample Paper',
    group: 'Intermediate 1st Year',
    subject: 'Mathematics',
    year: 2027,
    type: 'Sample Paper',
  },
  {
    title: 'Intermediate 1st Year — Physics Sample Paper',
    group: 'Intermediate 1st Year',
    subject: 'Physics',
    year: 2027,
    type: 'Sample Paper',
  },
  {
    title: 'Intermediate 1st Year — Chemistry Sample Paper',
    group: 'Intermediate 1st Year',
    subject: 'Chemistry',
    year: 2027,
    type: 'Sample Paper',
  },

  {
    title: 'Intermediate 2nd Year — Mathematics',
    group: 'Intermediate 2nd Year',
    subject: 'Mathematics',
    year: 2027,
    type: 'Question Paper',
  },
  {
    title: 'Intermediate 2nd Year — Physics',
    group: 'Intermediate 2nd Year',
    subject: 'Physics',
    year: 2027,
    type: 'Question Paper',
  },
  {
    title: 'Intermediate 2nd Year — Chemistry',
    group: 'Intermediate 2nd Year',
    subject: 'Chemistry',
    year: 2027,
    type: 'Question Paper',
  },
  {
    title: 'Intermediate 2nd Year — Mathematics Sample Paper',
    group: 'Intermediate 2nd Year',
    subject: 'Mathematics',
    year: 2027,
    type: 'Sample Paper',
  },
  {
    title: 'Intermediate 2nd Year — Physics Sample Paper',
    group: 'Intermediate 2nd Year',
    subject: 'Physics',
    year: 2027,
    type: 'Sample Paper',
  },
  {
    title: 'Intermediate 2nd Year — Chemistry Sample Paper',
    group: 'Intermediate 2nd Year',
    subject: 'Chemistry',
    year: 2027,
    type: 'Sample Paper',
  },

  {
    title: 'Intermediate — Mathematics Marking Scheme',
    group: 'Intermediate',
    subject: 'Mathematics',
    year: 2027,
    type: 'Marking Scheme',
  },
  {
    title: 'Intermediate — Physics Marking Scheme',
    group: 'Intermediate',
    subject: 'Physics',
    year: 2027,
    type: 'Marking Scheme',
  },
  {
    title: 'Intermediate — Chemistry Marking Scheme',
    group: 'Intermediate',
    subject: 'Chemistry',
    year: 2027,
    type: 'Marking Scheme',
  },
])

/* =========================================================
   IIT-JEE / COMPETITIVE EXAM PAPERS
   ========================================================= */

export const competitivePapers = toPapers('competitive', [
  {
    title: 'JEE Main — Paper 1',
    group: 'JEE Main',
    subject: 'Physics, Chemistry & Mathematics',
    year: 2026,
    type: 'Question Paper',
  },
  {
    title: 'JEE Main — Sample Paper',
    group: 'JEE Main',
    subject: 'Physics, Chemistry & Mathematics',
    year: 2027,
    type: 'Sample Paper',
  },
  {
    title: 'JEE Main — Answer Key',
    group: 'JEE Main',
    subject: 'Physics, Chemistry & Mathematics',
    year: 2026,
    type: 'Answer Key',
  },
  {
    title: 'JEE Main — Mathematics Practice Paper',
    group: 'JEE Main',
    subject: 'Mathematics',
    year: 2027,
    type: 'Sample Paper',
  },
  {
    title: 'JEE Main — Physics Practice Paper',
    group: 'JEE Main',
    subject: 'Physics',
    year: 2027,
    type: 'Sample Paper',
  },
  {
    title: 'JEE Main — Chemistry Practice Paper',
    group: 'JEE Main',
    subject: 'Chemistry',
    year: 2027,
    type: 'Sample Paper',
  },

  {
    title: 'JEE Advanced — Paper 1',
    group: 'JEE Advanced',
    subject: 'Physics, Chemistry & Mathematics',
    year: 2026,
    type: 'Question Paper',
  },
  {
    title: 'JEE Advanced — Paper 2',
    group: 'JEE Advanced',
    subject: 'Physics, Chemistry & Mathematics',
    year: 2026,
    type: 'Question Paper',
  },
  {
    title: 'JEE Advanced — Sample Paper',
    group: 'JEE Advanced',
    subject: 'Physics, Chemistry & Mathematics',
    year: 2027,
    type: 'Sample Paper',
  },
  {
    title: 'JEE Advanced — Answer Key',
    group: 'JEE Advanced',
    subject: 'Physics, Chemistry & Mathematics',
    year: 2026,
    type: 'Answer Key',
  },
])

/* =========================================================
   PAPER CATALOGUES
   ========================================================= */

export const paperCatalogues = {
  exam: {
    title: 'Intermediate Exam Papers',
    description:
      'Question papers, sample papers and marking schemes for Intermediate 1st Year and 2nd Year Mathematics, Physics and Chemistry.',
    groupLabel: 'Programme',
    papers: examPapers,
  },

  competitive: {
    title: 'IIT-JEE Papers',
    description:
      'JEE Main and JEE Advanced question papers, sample papers, practice papers and answer keys for competitive examination preparation.',
    groupLabel: 'Exam',
    papers: competitivePapers,
  },
} satisfies Record<
  PaperCategory,
  {
    title: string
    description: string
    groupLabel: string
    papers: QuestionPaper[]
  }
>
