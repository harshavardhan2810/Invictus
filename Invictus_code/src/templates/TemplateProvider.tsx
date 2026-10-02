import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { applyTemplate, saveTemplateId } from './applyTemplate'
import { TemplateContext } from './templateContext'
import type { TemplateId } from './templates'

export function TemplateProvider({ initialTemplateId, children }: { initialTemplateId: TemplateId; children: ReactNode }) {
  const [templateId, setTemplateIdState] = useState(initialTemplateId)

  const setTemplateId = useCallback((nextTemplateId: TemplateId) => {
    applyTemplate(nextTemplateId)
    saveTemplateId(nextTemplateId)
    setTemplateIdState(nextTemplateId)
  }, [])

  const contextValue = useMemo(() => ({ templateId, setTemplateId }), [templateId, setTemplateId])

  return <TemplateContext.Provider value={contextValue}>{children}</TemplateContext.Provider>
}
