const indianNumberFormatter = new Intl.NumberFormat('en-IN')

const rupeeFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const indianDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
})

const indianDateTimeFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'Asia/Kolkata',
})

/** 1250000 → "12,50,000" (lakh/crore grouping) */
export function formatIndianNumber(value: number) {
  return indianNumberFormatter.format(value)
}

/** 2500000 → "₹25,00,000" */
export function formatRupees(amount: number) {
  return rupeeFormatter.format(amount)
}

/** "2026-10-18" → "18 Oct 2026" */
export function formatIndianDate(isoDate: string) {
  return indianDateFormatter.format(new Date(isoDate))
}

/** ISO timestamp → "01 Oct 2026, 10:42 am" (IST) */
export function formatIndianDateTime(isoTimestamp: string) {
  return indianDateTimeFormatter.format(new Date(isoTimestamp))
}

/** "2026-10-18" → { day: "18", month: "Oct" } for calendar-style date badges */
export function getDateParts(isoDate: string) {
  const parts = indianDateFormatter.formatToParts(new Date(isoDate))
  return {
    day: parts.find((part) => part.type === 'day')?.value ?? '',
    month: parts.find((part) => part.type === 'month')?.value ?? '',
  }
}
