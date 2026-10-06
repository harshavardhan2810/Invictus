import { useId, type ReactNode } from 'react'

import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  label: string
  fieldId: string
  error?: string
  hint?: string
  isRequired?: boolean
  className?: string
  children: ReactNode
}

export function FormField({ label, fieldId, error, hint, isRequired, className, children }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={fieldId}>
        {label}
        {isRequired && (
          <span aria-hidden className="text-destructive">
            *
          </span>
        )}
      </Label>
      {children}
      {error ? (
        <p id={`${fieldId}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      ) : (
        hint && <p className="text-sm text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}

export function FormSection({ title, children, nogrid }: { title: string; children: ReactNode; nogrid?: boolean }) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId} className="rounded-lg border bg-card shadow-sm">
      <h2
        id={headingId}
        className="rounded-t-lg border-b bg-primary-50 px-5 py-3.5 font-display text-lg font-semibold text-primary-900"
      >
        {title}
      </h2>
      <div className={nogrid ? "p-5" : "grid gap-5 p-5 sm:grid-cols-2 sm:p-6"}>{children}</div>
    </section>
  )
}
