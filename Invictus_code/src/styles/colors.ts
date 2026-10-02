/**
 * Invictus colour palettes — the single source of truth for colour.
 *
 * Each site template has its own palette with exactly the same token names.
 * tailwind.config.ts maps every token to a CSS variable (`bg-primary` →
 * `var(--brand-primary)`), and applyTemplate() fills those variables from the
 * selected palette at runtime. Never hard-code hex values in components.
 */

type ColorScale = Record<string, string>

// ── Classic template: navy, saffron and maroon ──────────────────────────────

const navy = {
  50: '#EEF2FB',
  100: '#DCE4F6',
  200: '#B6C6EC',
  300: '#879FDD',
  400: '#5676C9',
  500: '#3556B0',
  600: '#26428F',
  700: '#1F3574',
  800: '#1B2C5E',
  900: '#16234A',
  950: '#0D1530',
}

const saffron = {
  50: '#FFF6EB',
  100: '#FFE9CC',
  200: '#FFD199',
  300: '#FFB35C',
  400: '#FF9A2E',
  500: '#F57F0F',
  600: '#D96508',
  700: '#B34D0A',
  800: '#8F3D0F',
}

const maroon = {
  50: '#FBEEF2',
  100: '#F6D9E2',
  500: '#A52A51',
  600: '#8C1D40',
  700: '#721634',
}

// Tokens shared by every template.
const sharedTokens = {
  india: { saffron: '#FF9933', white: '#FFFFFF', green: '#138808' },
  whatsapp: { DEFAULT: '#25D366', foreground: '#FFFFFF' },
  success: { DEFAULT: '#138808', foreground: '#FFFFFF', subtle: '#E8F5E6' },
  destructive: { DEFAULT: '#C62828', foreground: '#FFFFFF' },
}

const classic = {
  primary: { DEFAULT: navy[800], foreground: '#FFFFFF', ...navy },
  secondary: { DEFAULT: saffron[500], foreground: navy[950], ...saffron },
  accent: { DEFAULT: maroon[600], foreground: '#FFFFFF', ...maroon },
  background: { DEFAULT: '#FFFFFF', subtle: '#FFF8EF', inverse: navy[950] },
  card: { DEFAULT: '#FFFFFF', foreground: '#1A1F36' },
  popover: { DEFAULT: '#FFFFFF', foreground: '#1A1F36' },
  foreground: { DEFAULT: '#1A1F36', inverse: '#FFFFFF' },
  muted: { DEFAULT: '#F5F1EA', foreground: '#5A6178' },
  border: { DEFAULT: '#E8E1D5', strong: '#CDC2AF' },
  input: '#D9D1C3',
  ring: navy[500],
  ...sharedTokens,
}

export type TemplatePalette = typeof classic

// ── Heritage template: maroon, temple gold and peacock teal on ivory ─────────

const heritageMaroon = {
  50: '#FBF1F3',
  100: '#F5DDE2',
  200: '#E9B9C4',
  300: '#D98A9D',
  400: '#C25B76',
  500: '#A63A57',
  600: '#8C2744',
  700: '#741D37',
  800: '#5E172D',
  900: '#4A1224',
  950: '#2E0915',
}

const templeGold = {
  50: '#FBF8EE',
  100: '#F5EDCF',
  200: '#EBD9A0',
  300: '#DFC170',
  400: '#D1A94A',
  500: '#B8902F',
  600: '#9A7526',
  700: '#7A5B20',
  800: '#5E461C',
}

const peacockTeal = {
  50: '#E8F5F4',
  100: '#CDEAE7',
  500: '#13807A',
  600: '#0F6B66',
  700: '#0B5450',
}

const heritage: TemplatePalette = {
  primary: { DEFAULT: heritageMaroon[700], foreground: '#FFFFFF', ...heritageMaroon },
  secondary: { DEFAULT: templeGold[400], foreground: heritageMaroon[950], ...templeGold },
  accent: { DEFAULT: peacockTeal[600], foreground: '#FFFFFF', ...peacockTeal },
  background: { DEFAULT: '#FFFCF5', subtle: '#F8F0E1', inverse: heritageMaroon[950] },
  card: { DEFAULT: '#FFFFFF', foreground: '#2B1A1F' },
  popover: { DEFAULT: '#FFFFFF', foreground: '#2B1A1F' },
  foreground: { DEFAULT: '#2B1A1F', inverse: '#FFFFFF' },
  muted: { DEFAULT: '#F3EBDD', foreground: '#6B5A5E' },
  border: { DEFAULT: '#E8DCC7', strong: '#D4C2A3' },
  input: '#D9CBB2',
  ring: heritageMaroon[500],
  ...sharedTokens,
}

// ── Minimal template: slate neutrals with a single emerald accent ────────────

const slate = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: '#64748B',
  600: '#475569',
  700: '#334155',
  800: '#1E293B',
  900: '#0F172A',
  950: '#020617',
}

const emerald = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#059669',
  700: '#047857',
  800: '#065F46',
}

const minimal: TemplatePalette = {
  primary: { DEFAULT: slate[900], foreground: '#FFFFFF', ...slate },
  secondary: { DEFAULT: emerald[700], foreground: '#FFFFFF', ...emerald },
  accent: { DEFAULT: emerald[700], foreground: '#FFFFFF', 50: emerald[50], 100: emerald[100], 500: emerald[500], 600: emerald[600], 700: emerald[700] },
  background: { DEFAULT: '#FFFFFF', subtle: slate[50], inverse: slate[900] },
  card: { DEFAULT: '#FFFFFF', foreground: slate[900] },
  popover: { DEFAULT: '#FFFFFF', foreground: slate[900] },
  foreground: { DEFAULT: slate[900], inverse: '#FFFFFF' },
  muted: { DEFAULT: slate[100], foreground: slate[600] },
  border: { DEFAULT: slate[200], strong: slate[300] },
  input: slate[300],
  ring: emerald[600],
  ...sharedTokens,
}

export const palettes = { classic, heritage, minimal }

function toVariableName(group: string, shade: string) {
  return shade === 'DEFAULT' ? `--brand-${group}` : `--brand-${group}-${shade}`
}

/** Tailwind colour config — every token points at its CSS variable. */
export function toTailwindColors(palette: TemplatePalette) {
  return Object.fromEntries(
    Object.entries(palette).map(([group, value]) => [
      group,
      typeof value === 'string'
        ? `var(${toVariableName(group, 'DEFAULT')})`
        : Object.fromEntries(Object.keys(value).map((shade) => [shade, `var(${toVariableName(group, shade)})`])),
    ]),
  )
}

/** CSS variable values for a palette, applied to <html> by applyTemplate(). */
export function toCssVariables(palette: TemplatePalette) {
  const variables: Record<string, string> = {}
  for (const [group, value] of Object.entries(palette)) {
    if (typeof value === 'string') {
      variables[toVariableName(group, 'DEFAULT')] = value
      continue
    }
    for (const [shade, color] of Object.entries(value as ColorScale)) {
      variables[toVariableName(group, shade)] = color
    }
  }
  return variables
}
