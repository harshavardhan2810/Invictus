import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProgramCard } from '@/components/Programs/ProgramCard'
import type { Program } from '@/data/programs'

export function ProgramsSection({ programs }: { programs: Program[] }) {
  return (
    <section aria-labelledby="programs-heading" className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Academic Programs"
          title="Classes 8 to 12 under the CBSE curriculum"
          description="A continuous journey from strong middle-school foundations to board examinations and entrance exam readiness."
          titleId="programs-heading"
          align="center"
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
          {programs.map((program) => (
            <li key={program.slug}>
              <ProgramCard program={program} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
