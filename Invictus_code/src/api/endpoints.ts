// Relative to VITE_API_BASE_URL. Adjust to match the backend once it exists.
export const endpoints = {
  faculty: {
    list: '/faculty',
    detail: (facultyId: string) => `/faculty/${encodeURIComponent(facultyId)}`,
  },
  contact: {
    enquiries: '/contact/enquiries',
  },
  admissions: {
    applications: '/admissions/applications',
    application: (applicationId: string) => `/admissions/applications/${encodeURIComponent(applicationId)}`,
  },
  papers: {
    list: '/papers',
  },
} as const
