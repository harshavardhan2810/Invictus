import { Container } from '@/components/common/Container'
import { LotusOrnament } from '@/components/common/Ornaments'
import type { Stat } from '@/data/home'

export function HeritageStats({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="Invictus at a glance" className="border-y-4 border-double border-secondary bg-primary-800 py-10">
      <Container>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 text-center sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center last:col-span-2 sm:last:col-span-1">
              <dt className="mt-1 text-sm text-primary-100 sm:text-base">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-secondary-300 sm:text-4xl">{stat.value}</dd>
              <LotusOrnament className="mb-2 h-4 text-secondary-400" />
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
