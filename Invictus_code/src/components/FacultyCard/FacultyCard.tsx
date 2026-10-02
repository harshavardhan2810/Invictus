import type { FacultyMember } from '@/data/faculty'
import { getInitials } from '@/lib/utils'

function FacultyMonogram({ name }: { name: string }) {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-linear-to-br from-primary-600 via-primary-800 to-primary-950">
      <div aria-hidden className="absolute -top-16 -right-16 size-56 rounded-full border border-secondary/30" />
      <div aria-hidden className="absolute -bottom-24 -left-20 size-64 rounded-full border border-secondary/20" />
      <span
        aria-hidden
        className="font-display text-5xl font-bold tracking-wide text-secondary-300 transition-transform duration-500 group-hover:scale-110"
      >
        {getInitials(name)}
      </span>
    </div>
  )
}

export function FacultyCard({ member }: { member: FacultyMember }) {
  return (
    <article className="group h-full overflow-hidden rounded-lg border bg-card shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] overflow-hidden bg-primary-100">
        {member.image ? (
          <img
            src={member.image}
            alt={`Portrait of ${member.name}`}
            loading="lazy"
            className="size-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <FacultyMonogram name={member.name} />
        )}
      </div>
      <div className="border-t-4 border-secondary p-5 text-center">
        <h3 className="font-display text-lg font-semibold text-primary-900">{member.name}</h3>
        <p className="mt-1 font-semibold text-accent">{member.department}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {member.designation} · {member.qualification}
        </p>
      </div>
    </article>
  )
}
