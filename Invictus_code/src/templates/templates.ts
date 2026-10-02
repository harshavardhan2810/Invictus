import { palettes, type TemplatePalette } from '@/styles/colors'

export type TemplateId = 'classic' | 'heritage' | 'minimal'

export interface SiteTemplate {
  id: TemplateId
  name: string
  description: string
  palette: TemplatePalette
  fonts: {
    sans: string
    display: string
    /** Google Fonts stylesheet loaded when the template is active. */
    stylesheetHref: string
  }
}

export const siteTemplates: SiteTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Navy and saffron, bold Poppins headings, full-width photo slider and coloured quick-link tiles.',
    palette: palettes.classic,
    fonts: {
      sans: "'Hind', ui-sans-serif, system-ui, sans-serif",
      display: "'Poppins', ui-sans-serif, system-ui, sans-serif",
      stylesheetHref:
        'https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap',
    },
  },
  {
    id: 'heritage',
    name: 'Heritage',
    description: 'Maroon and temple gold on ivory, elegant serif headings, mandala motifs and arch-framed photos.',
    palette: palettes.heritage,
    fonts: {
      sans: "'Mukta', ui-sans-serif, system-ui, sans-serif",
      display: "'Playfair Display', Georgia, ui-serif, serif",
      stylesheetHref:
        'https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;0,800;1,500&display=swap',
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple: white space, plain menu, large type, list-style sections and a bento highlights grid.',
    palette: palettes.minimal,
    fonts: {
      sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
      display: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
      stylesheetHref:
        'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,500;9..40,600;9..40,700&family=Inter:wght@400;500;600&display=swap',
    },
  },
]

export const DEFAULT_TEMPLATE_ID: TemplateId = 'classic'

export function isTemplateId(value: unknown): value is TemplateId {
  return siteTemplates.some((template) => template.id === value)
}

export function getTemplate(templateId: TemplateId) {
  return siteTemplates.find((template) => template.id === templateId) ?? siteTemplates[0]
}
