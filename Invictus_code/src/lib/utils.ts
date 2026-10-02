import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "Dr. S. Radhika Menon" → "RM" — skips honorifics and single-letter initials. */
export function getInitials(name: string) {
  const nameParts = name
    .replace(/^(dr|prof|mr|mrs|ms|shri|smt)\.?\s+/i, '')
    .split(/\s+/)
    .filter((namePart) => namePart.replace('.', '').length > 1)
  const significantParts = nameParts.length > 2 ? [nameParts[0], nameParts[nameParts.length - 1]] : nameParts
  return significantParts.map((namePart) => namePart[0]).join('').toUpperCase()
}
