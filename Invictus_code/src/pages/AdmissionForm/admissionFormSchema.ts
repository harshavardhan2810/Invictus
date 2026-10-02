import { z } from 'zod'

import { programs } from '@/data/programs'

export const classOptions = programs.map((program) => ({
  value: String(program.grade),
  label: `${program.title} (${program.romanNumeral})`,
}))

export const streamOptions = programs.find((program) => program.streams)?.streams?.map((stream) => stream.name) ?? []

export const genderOptions = ['Male', 'Female', 'Other'] as const
export const boardOptions = ['CBSE', 'ICSE', 'State Board', 'Other'] as const
export const relationshipOptions = ['Father', 'Mother', 'Guardian'] as const

export function isSeniorSecondaryClass(classApplying: string) {
  return classApplying === '11' || classApplying === '12'
}

function requiredText(message: string) {
  return z.string().trim().min(1, message)
}

export const admissionFormSchema = z
  .object({
    studentName: z.string().trim().min(3, 'Please enter the student’s full name'),
    dateOfBirth: requiredText('Please select the date of birth').refine(
      (value) => new Date(value) < new Date(),
      'Date of birth must be in the past',
    ),
    gender: requiredText('Please select the gender'),
    classApplying: requiredText('Please select the class'),
    stream: z.string(),
    previousSchool: requiredText('Please enter the previous school’s name'),
    previousBoard: requiredText('Please select the board'),
    previousPercentage: z
      .string()
      .trim()
      .refine(
        (value) => value === '' || (/^\d{1,3}(\.\d{1,2})?$/.test(value) && Number(value) <= 100),
        'Enter a percentage between 0 and 100',
      ),
    parentName: requiredText('Please enter the parent or guardian’s name'),
    relationship: requiredText('Please select the relationship'),
    mobile: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number (without +91)'),
    email: z
      .string()
      .trim()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Enter a valid email address'),
    address: requiredText('Please enter the residential address'),
    city: requiredText('Please enter the city'),
    state: requiredText('Please select the state'),
    pincode: z
      .string()
      .trim()
      .regex(/^[1-9]\d{5}$/, 'Enter a valid 6-digit PIN code'),
    declaration: z.boolean().refine((isAccepted) => isAccepted, 'Please accept the declaration to continue'),
  })
  .refine((values) => !isSeniorSecondaryClass(values.classApplying) || values.stream !== '', {
    message: 'Please select a stream for Class 11 or 12',
    path: ['stream'],
  })

export type AdmissionFormValues = z.infer<typeof admissionFormSchema>

export const admissionFormDefaults: AdmissionFormValues = {
  studentName: '',
  dateOfBirth: '',
  gender: '',
  classApplying: '',
  stream: '',
  previousSchool: '',
  previousBoard: '',
  previousPercentage: '',
  parentName: '',
  relationship: '',
  mobile: '',
  email: '',
  address: '',
  city: 'Hyderabad',
  state: 'Telangana',
  pincode: '',
  declaration: false,
}
