import type { ComponentType } from 'react'

import { Footer } from '@/components/Footer/Footer'
import { Header } from '@/components/Header/Header'
import { Home } from '@/pages/Home/Home'
import { HeritageFooter } from './heritage/HeritageFooter'
import { HeritageHeader } from './heritage/HeritageHeader'
import { HeritageHome } from './heritage/HeritageHome'
import { MinimalFooter } from './minimal/MinimalFooter'
import { MinimalHeader } from './minimal/MinimalHeader'
import { MinimalHome } from './minimal/MinimalHome'
import type { TemplateId } from './templates'

interface TemplateLayout {
  Header: ComponentType
  Footer: ComponentType
  Home: ComponentType
}

// Each template supplies its own header, footer and home page; inner pages are
// shared and pick up the template's colours and fonts automatically.
export const templateLayouts: Record<TemplateId, TemplateLayout> = {
  classic: { Header, Footer, Home },
  heritage: { Header: HeritageHeader, Footer: HeritageFooter, Home: HeritageHome },
  minimal: { Header: MinimalHeader, Footer: MinimalFooter, Home: MinimalHome },
}
