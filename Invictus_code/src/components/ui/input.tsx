import * as React from 'react'

import { cn } from '@/lib/utils'

export const fieldControlClass =
  'w-full min-w-0 rounded-md border border-input bg-background px-3.5 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(fieldControlClass, 'h-11 py-2', className)}
      {...props}
    />
  )
}

export { Input }
