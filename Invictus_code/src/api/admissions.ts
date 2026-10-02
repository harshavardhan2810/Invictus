import { apiClient, isApiConfigured } from '@/lib/axios'
import { endpoints } from './endpoints'
import {
  deleteLocalApplication,
  listLocalApplications,
  saveLocalApplication,
  subscribeToLocalApplications,
  updateLocalApplicationStatus,
} from './localAdmissionStore'

export interface AdmissionApplication {
  studentName: string
  dateOfBirth: string
  gender: string
  classApplying: string
  stream?: string
  previousSchool: string
  previousBoard: string
  previousPercentage?: string
  parentName: string
  relationship: string
  mobile: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
}

export const admissionStatuses = ['New', 'Contacted', 'Test Scheduled', 'Admitted', 'Rejected'] as const
export type AdmissionStatus = (typeof admissionStatuses)[number]

export interface AdmissionRecord extends AdmissionApplication {
  id: string
  referenceId: string
  submittedAt: string
  status: AdmissionStatus
}

// Each function talks to the backend when VITE_API_BASE_URL is set, and to
// browser localStorage (demo mode) otherwise — callers don't need to know which.

export async function submitAdmissionApplication(application: AdmissionApplication) {
  if (!isApiConfigured) return saveLocalApplication(application)
  const response = await apiClient.post<AdmissionRecord>(endpoints.admissions.applications, application)
  return response.data
}

export async function getAdmissionApplications(signal?: AbortSignal) {
  if (!isApiConfigured) return listLocalApplications()
  const response = await apiClient.get<AdmissionRecord[]>(endpoints.admissions.applications, { signal })
  return response.data
}

export async function updateAdmissionStatus(applicationId: string, status: AdmissionStatus) {
  if (!isApiConfigured) return updateLocalApplicationStatus(applicationId, status)
  await apiClient.patch(endpoints.admissions.application(applicationId), { status })
}

export async function deleteAdmissionApplication(applicationId: string) {
  if (!isApiConfigured) return deleteLocalApplication(applicationId)
  await apiClient.delete(endpoints.admissions.application(applicationId))
}

/** Live updates are only available for the local store; with a backend, callers refetch. */
export function subscribeToAdmissionChanges(onChange: () => void) {
  return isApiConfigured ? () => {} : subscribeToLocalApplications(onChange)
}
