import * as React from 'react'

import { cn } from '@/lib/utils'
import { fieldControlClass } from './input'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(fieldControlClass, 'min-h-24 py-2.5', className)}
      {...props}
    />
  )
}

export { Textarea }
