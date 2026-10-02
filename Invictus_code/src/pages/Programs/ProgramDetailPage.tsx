import { BookOpen, CheckCircle2, ClipboardCheck, GraduationCap } from 'lucide-react'
import { Link, useParams } from 'react-router'

import { images } from '@/assets/images'
import { Container } from '@/components/common/Container'
import { PageBanner } from '@/components/common/PageBanner'
import { StreamsTable } from '@/components/Programs/StreamsTable'
import { Button } from '@/components/ui/button'
import { findProgram, programs } from '@/data/programs'
import { cn } from '@/lib/utils'
import { NotFound } from '@/pages/NotFound/NotFound'

const quickFacts = [
  { label: 'Board', value: 'CBSE, New Delhi' },
  { label: 'Medium', value: 'English' },
  { label: 'Section strength', value: '30–35 students' },
  { label: 'School hours', value: '8:30 AM – 3:30 PM' },
]

function DetailHeading({ icon: Icon, children }: { icon: typeof BookOpen; children: string }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-2xl font-bold text-primary-900">
      <span className="flex size-10 items-center justify-center rounded-md bg-secondary-100 text-secondary-700">
        <Icon aria-hidden className="size-5" />
      </span>
      {children}
    </h2>
  )
}

export function ProgramDetailPage() {
  const { programSlug } = useParams()
  const program = findProgram(programSlug)

  if (!program) return <NotFound />

  return (
    <>
      <PageBanner
        title={`${program.title} (${program.romanNumeral})`}
        description={program.tagline}
        breadcrumbs={[{ label: 'Programs', href: '/programs' }, { label: program.title }]}
        image={images.heroLab}
      />

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <section>
            <p className="font-display text-sm font-semibold tracking-wider text-secondary-700 uppercase">
              {program.stage}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-foreground">{program.overview}</p>
          </section>

          {program.streams ? (
            <section className="space-y-5">
              <DetailHeading icon={GraduationCap}>Streams offered</DetailHeading>
              <StreamsTable streams={program.streams} />
            </section>
          ) : (
            <section className="space-y-5">
              <DetailHeading icon={BookOpen}>Subjects</DetailHeading>
              <ul className="flex flex-wrap gap-2.5">
                {program.subjects.map((subject) => (
                  <li
                    key={subject}
                    className="rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 font-medium text-primary-900"
                  >
                    {subject}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="space-y-5">
            <DetailHeading icon={CheckCircle2}>Programme highlights</DetailHeading>
            <ul className="grid gap-3 sm:grid-cols-2">
              {program.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 rounded-lg border bg-card p-4 shadow-xs">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
                  <span className="font-medium">{highlight}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <DetailHeading icon={ClipboardCheck}>Assessment</DetailHeading>
            <p className="text-lg leading-relaxed text-muted-foreground">{program.assessment}</p>
          </section>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <h2 className="bg-primary px-5 py-3.5 font-display font-semibold text-white">Quick facts</h2>
            <dl className="divide-y">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-4 px-5 py-3">
                  <dt className="text-muted-foreground">{fact.label}</dt>
                  <dd className="text-right font-semibold text-primary-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t bg-secondary-50 p-5">
              <Button asChild variant="secondary" size="lg" className="w-full">
                <Link to="/admissions/apply">Apply for {program.title}</Link>
              </Button>
            </div>
          </div>

          <nav aria-labelledby="other-classes-heading" className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <h2 id="other-classes-heading" className="bg-accent px-5 py-3.5 font-display font-semibold text-white">
              All classes
            </h2>
            <ul className="divide-y">
              {programs.map((otherProgram) => {
                const isCurrent = otherProgram.slug === program.slug
                return (
                  <li key={otherProgram.slug}>
                    <Link
                      to={`/programs/${otherProgram.slug}`}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={cn(
                        'flex items-center justify-between px-5 py-3 font-medium transition-colors hover:bg-muted',
                        isCurrent && 'bg-primary-50 font-semibold text-primary',
                      )}
                    >
                      {otherProgram.title}
                      <span className="font-display text-sm text-muted-foreground">{otherProgram.romanNumeral}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>
      </Container>
    </>
  )
}
