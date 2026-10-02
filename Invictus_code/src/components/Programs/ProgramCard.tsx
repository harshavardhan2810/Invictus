import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Program } from '@/data/programs'

export function ProgramCard({ program }: { program: Program }) {
  return (
    <Link
      to={`/programs/${program.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:border-secondary hover:shadow-xl"
    >
      <div className="bg-primary px-4 pt-5 pb-3 sm:px-5 sm:pt-6 sm:pb-4">
        <span className="font-display text-4xl leading-none font-bold text-secondary-300 sm:text-5xl">
          {program.romanNumeral}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="font-display text-xs font-semibold tracking-wider text-secondary-700 uppercase">
          {program.stage}
        </p>
        <h3 className="mt-1 font-display text-xl font-semibold text-primary-900">{program.title}</h3>
        <p className="mt-2 flex-1 leading-snug text-muted-foreground">{program.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-accent">
          View details
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
