import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import type { QuickLink } from '@/data/home'
import { cn } from '@/lib/utils'

const toneClasses: Record<QuickLink['tone'], string> = {
  secondary: 'bg-secondary text-secondary-foreground',
  primary: 'bg-primary text-primary-foreground',
  accent: 'bg-accent text-accent-foreground',
  success: 'bg-success text-success-foreground',
}

export function QuickLinks({ links }: { links: QuickLink[] }) {
  return (
    <section aria-label="Quick links" className="relative z-10 pt-6 lg:-mt-16 lg:pt-0">
      <Container>
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={cn(
                    'group flex h-full flex-col gap-3 rounded-lg p-4 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row sm:items-center sm:p-5',
                    toneClasses[link.tone],
                  )}
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Icon className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base leading-snug font-semibold sm:text-lg">
                      {link.title}
                    </span>
                    <span className="mt-0.5 block text-sm opacity-85">{link.description}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="hidden size-5 shrink-0 transition-transform group-hover:translate-x-1 sm:block"
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
