import type { FacultyMember } from '@/data/faculty'
import { apiClient } from '@/lib/axios'
import { endpoints } from './endpoints'

export async function getFaculty(signal?: AbortSignal) {
  const response = await apiClient.get<FacultyMember[]>(endpoints.faculty.list, { signal })
  return response.data
}

export async function getFacultyMember(facultyId: string, signal?: AbortSignal) {
  const response = await apiClient.get<FacultyMember>(endpoints.faculty.detail(facultyId), {
    signal,
  })
  return response.data
}
