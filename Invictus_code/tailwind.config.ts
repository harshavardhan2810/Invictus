import type { Config } from 'tailwindcss'
import { palettes, toTailwindColors } from './src/styles/colors.ts'

// Loaded from src/styles/globals.css via `@config`. Colour utilities resolve to
// CSS variables, so switching templates at runtime recolours the whole site.
export default {
  theme: {
    extend: {
      colors: toTailwindColors(palettes.classic),
    },
  },
} satisfies Config
