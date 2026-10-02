import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { JaaliPattern } from '@/components/common/JaaliPattern'
import type { Program } from '@/data/programs'
import { OrnamentHeading } from './OrnamentHeading'

export function HeritagePrograms({ programs }: { programs: Program[] }) {
  return (
    <section aria-labelledby="programs-heading" className="relative isolate overflow-hidden bg-background-subtle py-16 sm:py-24">
      <JaaliPattern className="-z-10 text-secondary-200/60" />
      <Container>
        <OrnamentHeading
          eyebrow="The academic journey"
          title="From Class 8 to Class 12"
          description="One continuous CBSE pathway — strong foundations, board excellence and entrance exam readiness."
          titleId="programs-heading"
        />
        <ol className="relative mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          <span aria-hidden className="absolute top-12 right-[10%] left-[10%] hidden border-t-2 border-dashed border-secondary-400 lg:block" />
          {programs.map((program) => (
            <li key={program.slug} className="relative text-center last:col-span-2 sm:last:col-span-1">
              <Link to={`/programs/${program.slug}`} className="group flex flex-col items-center">
                <span className="flex size-24 items-center justify-center rounded-full border-4 border-secondary bg-primary font-display text-3xl font-bold text-secondary-200 shadow-lg ring-8 ring-background-subtle transition-transform group-hover:scale-105">
                  {program.romanNumeral}
                </span>
                <span className="mt-5 font-display text-xl font-bold text-primary-800 group-hover:underline">
                  {program.title}
                </span>
                <span className="mt-1 text-sm font-semibold text-accent">{program.stage}</span>
                <span className="mt-2 max-w-[14rem] leading-snug text-muted-foreground">{program.tagline}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
