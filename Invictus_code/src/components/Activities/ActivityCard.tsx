import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import type { Activity } from '@/data/activities'

export function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Link
      to={`/activities/${activity.slug}`}
      className="group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg shadow-md"
    >
      <img
        src={activity.image}
        alt={activity.imageAlt}
        loading="lazy"
        className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-primary-950/95 via-primary-950/50 to-transparent"
      />
      <div className="p-5 text-white">
        <span aria-hidden className="mb-3 block h-1 w-10 rounded-full bg-secondary transition-all group-hover:w-16" />
        <h3 className="font-display text-xl font-semibold">{activity.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-white/85">{activity.summary}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-secondary-300">
          Explore
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
