import { Container } from '@/components/common/Container'
import { JaaliPattern } from '@/components/common/JaaliPattern'
import type { Stat } from '@/data/home'

export function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="Invictus at a glance" className="relative isolate overflow-hidden bg-primary py-12">
      <JaaliPattern className="-z-10 text-white/[0.06]" />
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse items-center text-center last:col-span-2 sm:last:col-span-1"
            >
              <dt className="mt-1 text-sm text-white/80 sm:text-base">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-secondary-300 sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
