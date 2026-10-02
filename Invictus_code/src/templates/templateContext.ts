import { createContext } from 'react'

import type { TemplateId } from './templates'

export interface TemplateContextValue {
  templateId: TemplateId
  setTemplateId: (templateId: TemplateId) => void
}

export const TemplateContext = createContext<TemplateContextValue | null>(null)
