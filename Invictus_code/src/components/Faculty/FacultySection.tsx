import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { FacultyCard } from '@/components/FacultyCard/FacultyCard'
import type { FacultyMember } from '@/data/faculty'

export function FacultySection({ members }: { members: FacultyMember[] }) {
  return (
    <section id="faculty" aria-labelledby="faculty-heading" className="scroll-mt-20 bg-background-subtle py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Faculty"
          title="Experienced teachers, dedicated mentors"
          description="Our Post Graduate and Trained Graduate Teachers bring years of CBSE teaching and competitive exam coaching experience."
          titleId="faculty-heading"
          align="center"
        />

        {/* Mobile: swipeable row. sm and up: responsive grid. */}
        <ul className="-mx-5 mt-12 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {members.map((member) => (
            <li key={member.id} className="w-[72%] shrink-0 snap-start sm:w-auto">
              <FacultyCard member={member} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
