import type { ReactNode } from 'react'

interface MinimalSectionHeaderProps {
  sectionNumber: number
  label: string
  title: string
  titleId: string
  description?: string
  action?: ReactNode
}

export function MinimalSectionHeader({ sectionNumber, label, title, titleId, description, action }: MinimalSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-5 border-t pt-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="font-display text-sm font-medium text-secondary-700">
          {String(sectionNumber).padStart(2, '0')} — {label}
        </p>
        <h2 id={titleId} className="mt-2 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {description && <p className="mt-3 text-lg text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}
