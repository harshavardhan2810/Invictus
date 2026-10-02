import { templateLayouts } from './templateLayouts'
import { useTemplate } from './useTemplate'

export function TemplateHome() {
  const { templateId } = useTemplate()
  const { Home } = templateLayouts[templateId]
  return <Home />
}
