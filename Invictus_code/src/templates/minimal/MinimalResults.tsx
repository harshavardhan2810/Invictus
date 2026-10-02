import { Container } from '@/components/common/Container'
import type { Achiever } from '@/data/home'
import { MinimalSectionHeader } from './MinimalSectionHeader'

export function MinimalResults({ achievers }: { achievers: Achiever[] }) {
  return (
    <section id="achievers" aria-labelledby="results-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <MinimalSectionHeader sectionNumber={4} label="Results" title="Our achievers, 2026" titleId="results-heading" />
        {/* gap-px over a border-coloured background draws hairline dividers between cells */}
        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {achievers.map((achiever) => (
            <li key={achiever.name} className="bg-card p-6">
              <p className="font-display text-4xl font-bold tracking-tight">{achiever.score}</p>
              <p className="mt-3 font-medium">{achiever.name}</p>
              <p className="text-sm text-muted-foreground">
                {achiever.exam} · {achiever.detail}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
