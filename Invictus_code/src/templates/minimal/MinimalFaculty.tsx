import { Container } from '@/components/common/Container'
import type { FacultyMember } from '@/data/faculty'
import { MinimalSectionHeader } from './MinimalSectionHeader'

export function MinimalFaculty({ members }: { members: FacultyMember[] }) {
  return (
    <section id="faculty" aria-labelledby="faculty-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <MinimalSectionHeader sectionNumber={6} label="Faculty" title="The people who teach here" titleId="faculty-heading" />
        <ul className="mt-6 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => (
            <li key={member.id} className="border-b py-5">
              <p className="font-display text-lg font-semibold">{member.name}</p>
              <p className="text-sm text-muted-foreground">
                {member.department} · {member.designation}
              </p>
              <p className="text-sm text-muted-foreground">{member.qualification}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
