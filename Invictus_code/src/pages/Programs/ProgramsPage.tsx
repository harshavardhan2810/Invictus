import { images } from '@/assets/images'
import { Container } from '@/components/common/Container'
import { PageBanner } from '@/components/common/PageBanner'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProgramCard } from '@/components/Programs/ProgramCard'
import { StreamsTable } from '@/components/Programs/StreamsTable'
import { programs } from '@/data/programs'

const seniorSecondaryStreams = programs.find((program) => program.streams)?.streams ?? []

export function ProgramsPage() {
  return (
    <>
      <PageBanner
        title="Academic Programs"
        description="CBSE curriculum for Classes 8 to 12, with integrated IIT-JEE and NEET foundation and Science, Commerce and Humanities streams at the senior secondary level."
        breadcrumbs={[{ label: 'Programs' }]}
        image={images.heroLab}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
            {programs.map((program) => (
              <li key={program.slug}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="streams-heading" className="bg-background-subtle py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Classes 11 & 12"
            title="Senior secondary streams"
            description="Students choose a stream after Class 10 based on their interests, board results and career goals. Our counsellors guide every family through the decision."
            titleId="streams-heading"
          />
          <StreamsTable streams={seniorSecondaryStreams} className="mt-10" />
        </Container>
      </section>
    </>
  )
}
