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
  {
    className: 'Intermediate 1st Year',
    criteria: 'Students who have successfully completed Class 10 (SSC, CBSE or equivalent board) are eligible for admission. Students opting for IIT/JEE training should meet the academic requirements of the selected programme.',
  },
  {
    className: 'Intermediate 2nd Year',
    criteria: 'Admission is available for students who have successfully completed Intermediate 1st Year or an equivalent course, subject to seat availability and applicable board rules.',
  },
  {
    className: 'IIT / JEE Training',
    criteria: 'Students enrolled in Intermediate or eligible students from equivalent backgrounds can opt for IIT/JEE preparation programmes. Admission and batch allocation may be based on academic performance and an entrance/assessment test, if applicable.',
  },
]

export const requiredDocuments: string[] = [
  'Class 10 marks memo / marks sheet',
  'Class 10 Transfer Certificate (TC)',
  'Class 10 passing certificate, if applicable',
  'Birth certificate',
  'Aadhaar card of the student',
  'Aadhaar card of parent / guardian',
  'Recent passport-size photographs of the student',
  'Caste / category certificate, if applicable',
  'Address proof, if required',
]

export const importantDates: ImportantDate[] = [
  { label: 'Application form available', date: '2026-11-01' },
  { label: 'Last date to apply', date: '2027-01-10' },
  { label: 'Entrance test', date: '2027-01-24' },
  { label: 'Results & admission offers', date: '2027-02-05' },
  { label: 'Academic session begins', date: '2027-04-01' },
]
