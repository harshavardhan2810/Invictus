import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import type { Program } from '@/data/programs'
import { MinimalSectionHeader } from './MinimalSectionHeader'

export function MinimalPrograms({ programs }: { programs: Program[] }) {
  return (
    <section aria-labelledby="programs-heading" className="py-16 sm:py-24">
      <Container>
        <MinimalSectionHeader
          sectionNumber={2}
          label="Programs"
          title="Classes 8 to 12, one CBSE pathway"
          titleId="programs-heading"
        />
        <ul className="mt-8 divide-y border-y">
          {programs.map((program) => (
            <li key={program.slug}>
              <Link
                to={`/programs/${program.slug}`}
                className="group grid items-center gap-1 py-6 transition-colors sm:grid-cols-[10rem_1fr_auto] sm:gap-8"
              >
                <span className="font-display text-2xl font-bold tracking-tight group-hover:text-secondary-700">
                  {program.title}
                </span>
                <span>
                  <span className="block text-sm font-medium text-secondary-700">{program.stage}</span>
                  <span className="text-muted-foreground">{program.tagline}</span>
                </span>
                <ArrowUpRight
                  aria-hidden
                  className="hidden size-6 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground sm:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
