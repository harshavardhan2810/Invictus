import { Container } from '@/components/common/Container'
import type { FacultyMember } from '@/data/faculty'
import { getInitials } from '@/lib/utils'
import { OrnamentHeading } from './OrnamentHeading'

export function HeritageFaculty({ members }: { members: FacultyMember[] }) {
  return (
    <section id="faculty" aria-labelledby="faculty-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <OrnamentHeading
          eyebrow="Our gurus"
          title="Experienced teachers, dedicated mentors"
          titleId="faculty-heading"
        />
        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {members.map((member) => (
            <li key={member.id} className="text-center">
              <div className="mx-auto size-28 overflow-hidden rounded-full ring-4 ring-secondary-300 ring-offset-4 ring-offset-background sm:size-32">
                {member.image ? (
                  <img src={member.image} alt={`Portrait of ${member.name}`} loading="lazy" className="size-full object-cover" />
                ) : (
                  <span
                    aria-hidden
                    className="flex size-full items-center justify-center bg-linear-to-br from-primary-600 to-primary-900 font-display text-3xl font-bold text-secondary-300"
                  >
                    {getInitials(member.name)}
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-primary-800">{member.name}</h3>
              <p className="font-semibold text-accent">{member.department}</p>
              <p className="text-sm text-muted-foreground">
                {member.designation} · {member.qualification}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
