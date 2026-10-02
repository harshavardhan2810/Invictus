import type { Stream } from '@/data/programs'
import { cn } from '@/lib/utils'

export function StreamsTable({ streams, className }: { streams: Stream[]; className?: string }) {
  return (
    <div className={cn('overflow-x-auto rounded-lg border bg-card shadow-sm', className)}>
      <table className="w-full min-w-[640px] text-left">
        <thead className="bg-primary font-display text-sm text-white">
          <tr>
            <th scope="col" className="px-5 py-3.5 font-semibold">Stream</th>
            <th scope="col" className="px-5 py-3.5 font-semibold">Subjects</th>
            <th scope="col" className="px-5 py-3.5 font-semibold">Ideal for</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {streams.map((stream) => (
            <tr key={stream.name} className="align-top even:bg-background-subtle">
              <th scope="row" className="px-5 py-4 font-display font-semibold whitespace-nowrap text-accent">
                {stream.name}
              </th>
              <td className="px-5 py-4">{stream.subjects.join(', ')}</td>
              <td className="px-5 py-4 text-muted-foreground">{stream.idealFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
