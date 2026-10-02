import { apiClient } from '@/lib/axios'
import { endpoints } from './endpoints'

export interface ContactEnquiry {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ContactEnquiryReceipt {
  referenceId: string
}

export async function submitContactEnquiry(enquiry: ContactEnquiry) {
  const response = await apiClient.post<ContactEnquiryReceipt>(
    endpoints.contact.enquiries,
    enquiry,
  )
  return response.data
}
