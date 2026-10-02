import { useState } from 'react'
import { Check, Palette } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { siteTemplates, type SiteTemplate } from './templates'
import { useTemplate } from './useTemplate'

function TemplateSwatches({ template }: { template: SiteTemplate }) {
  const { palette } = template
  const swatchColors = [palette.primary.DEFAULT, palette.secondary.DEFAULT, palette.accent.DEFAULT, palette.background.subtle]

  return (
    <span aria-hidden className="flex">
      {swatchColors.map((swatchColor) => (
        // Inline colours are intentional: each preview shows another template's palette.
        <span
          key={swatchColor}
          className="-ml-1.5 size-7 rounded-full border-2 border-background first:ml-0"
          style={{ backgroundColor: swatchColor }}
        />
      ))}
    </span>
  )
}

// Preview tool for choosing a design. Remove it from PublicLayout once a template is final.
export function TemplateSwitcher() {
  const { templateId, setTemplateId } = useTemplate()
  const [isOpen, setIsOpen] = useState(false)

  function selectTemplate(selectedTemplate: SiteTemplate) {
    setTemplateId(selectedTemplate.id)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="fixed right-4 bottom-20 z-40 flex items-center gap-2 rounded-full bg-primary-950 px-4 py-3 font-display text-sm font-semibold text-white shadow-lg ring-2 ring-secondary transition-transform hover:scale-105 lg:right-6 lg:bottom-6"
        >
          <Palette className="size-5 text-secondary-300" />
          Templates
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogTitle>Choose a website template</DialogTitle>
        <DialogDescription>
          Same content, different design. Your choice is remembered in this browser — share a preview with{' '}
          <code className="rounded bg-muted px-1">?template=heritage</code>.
        </DialogDescription>
        <ul className="grid gap-3">
          {siteTemplates.map((template) => {
            const isSelected = template.id === templateId
            return (
              <li key={template.id}>
                <button
                  type="button"
                  onClick={() => selectTemplate(template)}
                  aria-pressed={isSelected}
                  className={cn(
                    'flex w-full items-start gap-4 rounded-lg border-2 p-4 text-left transition-colors hover:border-primary',
                    isSelected ? 'border-primary bg-primary-50' : 'border-border',
                  )}
                >
                  <TemplateSwatches template={template} />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-lg font-bold" style={{ fontFamily: template.fonts.display }}>
                        {template.name}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                          <Check className="size-3" />
                          Active
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-sm text-muted-foreground">{template.description}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </DialogContent>
    </Dialog>
  )
}
