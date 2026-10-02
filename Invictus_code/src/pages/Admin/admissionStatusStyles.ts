import type { AdmissionStatus } from '@/api/admissions'

export const admissionStatusClasses: Record<AdmissionStatus, string> = {
  New: 'bg-primary-50 text-primary-700 ring-primary-200',
  Contacted: 'bg-secondary-50 text-secondary-800 ring-secondary-200',
  'Test Scheduled': 'bg-accent-50 text-accent ring-accent-100',
  Admitted: 'bg-success-subtle text-success ring-success/30',
  Rejected: 'bg-muted text-muted-foreground ring-border',
}
