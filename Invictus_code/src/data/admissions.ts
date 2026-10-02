export interface AdmissionStep {
  title: string
  description: string
}

export interface ImportantDate {
  label: string
  date: string
}

export interface EligibilityRule {
  className: string
  criteria: string
}

export const admissionSteps: AdmissionStep[] = [
  {
    title: 'Enquiry',
    description: 'Visit the school office or call us to collect the prospectus and understand the programme.',
  },
  {
    title: 'Online Application',
    description: 'Fill in the admission form online with student, parent and previous school details.',
  },
  {
    title: 'Entrance Test & Interaction',
    description:
      'Students take a short test in English, Mathematics and Science, followed by an interaction with the Principal.',
  },
  {
    title: 'Document Verification',
    description: 'Submit the original documents listed below at the school office for verification.',
  },
  {
    title: 'Fee Payment & Confirmation',
    description: 'Pay the admission fee to confirm the seat. The admission letter is issued on the same day.',
  },
]

export const eligibilityRules: EligibilityRule[] = [
  { className: 'Class 8', criteria: 'Passed Class 7 from a recognised school; age 12–13 years as on 31 March 2027.' },
  { className: 'Class 9', criteria: 'Passed Class 8 from a recognised school; age 13–14 years as on 31 March 2027.' },
  {
    className: 'Class 11',
    criteria:
      'Passed Class 10 (CBSE or equivalent board). Science: minimum 75% aggregate with 70% in Mathematics and Science. Commerce and Humanities: minimum 60% aggregate.',
  },
  { className: 'Classes 10 & 12', criteria: 'Admission only on transfer, subject to seat availability and CBSE rules.' },
]

export const requiredDocuments: string[] = [
  'Birth certificate (for Classes 8 and 9)',
  'Transfer Certificate (TC) from the previous school, countersigned where applicable',
  'Report card / marks memo of the previous class',
  'Class 10 marks sheet and passing certificate (for Class 11)',
  'Aadhaar card of the student and parents (photocopy)',
  'Four recent passport-size photographs of the student',
  'Caste / category certificate, if applicable',
  'Address proof (electricity bill, rental agreement or passport)',
]

export const importantDates: ImportantDate[] = [
  { label: 'Application form available', date: '2026-11-01' },
  { label: 'Last date to apply', date: '2027-01-10' },
  { label: 'Entrance test', date: '2027-01-24' },
  { label: 'Results & admission offers', date: '2027-02-05' },
  { label: 'Academic session begins', date: '2027-04-01' },
]
