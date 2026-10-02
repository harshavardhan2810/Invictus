import { readStoredJson, writeStoredJson } from '@/lib/storage'
import { toCssVariables } from '@/styles/colors'
import { DEFAULT_TEMPLATE_ID, getTemplate, isTemplateId, type TemplateId } from './templates'

const STORAGE_KEY = 'invictus.template'
const FONT_LINK_ID = 'template-fonts'

/** `?template=heritage` in the URL wins (handy for sharing a preview), then the saved choice. */
export function readInitialTemplateId(): TemplateId {
  const fromUrl = new URLSearchParams(window.location.search).get('template')
  if (isTemplateId(fromUrl)) {
    saveTemplateId(fromUrl)
    return fromUrl
  }
  const saved = readStoredJson<unknown>('local', STORAGE_KEY, null)
  return isTemplateId(saved) ? saved : DEFAULT_TEMPLATE_ID
}

export function saveTemplateId(templateId: TemplateId) {
  writeStoredJson('local', STORAGE_KEY, templateId)
}

/** Writes the template's colours and fonts onto <html>. Runs before first render to avoid a flash. */
export function applyTemplate(templateId: TemplateId) {
  const template = getTemplate(templateId)
  const root = document.documentElement

  for (const [variableName, value] of Object.entries(toCssVariables(template.palette))) {
    root.style.setProperty(variableName, value)
  }
  root.style.setProperty('--template-font-sans', template.fonts.sans)
  root.style.setProperty('--template-font-display', template.fonts.display)
  root.dataset.template = template.id

  let fontLink = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null
  if (!fontLink) {
    fontLink = document.createElement('link')
    fontLink.id = FONT_LINK_ID
    fontLink.rel = 'stylesheet'
    document.head.append(fontLink)
  }
  fontLink.href = template.fonts.stylesheetHref

  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', template.palette.primary.DEFAULT)
}
