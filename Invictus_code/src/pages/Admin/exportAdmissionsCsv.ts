import type { AdmissionRecord } from '@/api/admissions'
import { formatIndianDateTime } from '@/lib/format'

const columns: { header: string; getValue: (record: AdmissionRecord) => string }[] = [
  { header: 'Reference No.', getValue: (record) => record.referenceId },
  { header: 'Submitted On', getValue: (record) => formatIndianDateTime(record.submittedAt) },
  { header: 'Status', getValue: (record) => record.status },
  { header: 'Student Name', getValue: (record) => record.studentName },
  { header: 'Date of Birth', getValue: (record) => record.dateOfBirth },
  { header: 'Gender', getValue: (record) => record.gender },
  { header: 'Class', getValue: (record) => record.classApplying },
  { header: 'Stream', getValue: (record) => record.stream ?? '' },
  { header: 'Previous School', getValue: (record) => record.previousSchool },
  { header: 'Board', getValue: (record) => record.previousBoard },
  { header: 'Percentage', getValue: (record) => record.previousPercentage ?? '' },
  { header: 'Parent / Guardian', getValue: (record) => record.parentName },
  { header: 'Relationship', getValue: (record) => record.relationship },
  { header: 'Mobile (+91)', getValue: (record) => record.mobile },
  { header: 'Email', getValue: (record) => record.email },
  { header: 'Address', getValue: (record) => record.address },
  { header: 'City', getValue: (record) => record.city },
  { header: 'State', getValue: (record) => record.state },
  { header: 'PIN Code', getValue: (record) => record.pincode },
]

function toCsvCell(value: string) {
  // Prefix values Excel would treat as formulas (CSV injection).
  const safeValue = /^[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safeValue.replace(/"/g, '""')}"`
}

export function downloadAdmissionsCsv(records: AdmissionRecord[]) {
  const rows = [
    columns.map((column) => toCsvCell(column.header)).join(','),
    ...records.map((record) => columns.map((column) => toCsvCell(column.getValue(record))).join(',')),
  ]
  // The BOM makes Excel open the file as UTF-8 (₹, Devanagari, accented names).
  const csvBlob = new Blob(['﻿' + rows.join('\r\n')], { type: 'text/csv;charset=utf-8' })
  const downloadUrl = URL.createObjectURL(csvBlob)
  const downloadLink = document.createElement('a')
  downloadLink.href = downloadUrl
  downloadLink.download = `admission-requests-${new Date().toISOString().slice(0, 10)}.csv`
  downloadLink.click()
  URL.revokeObjectURL(downloadUrl)
}
