import { ArrowRight, CalendarDays, FileText, Phone, UserCheck } from 'lucide-react'
import { Link } from 'react-router'

import { images } from '@/assets/images'
import { Container } from '@/components/common/Container'
import { PageBanner } from '@/components/common/PageBanner'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { admissionSteps, eligibilityRules, importantDates, requiredDocuments } from '@/data/admissions'
import { siteConfig } from '@/data/site'
import { formatIndianDate } from '@/lib/format'

export function AdmissionsPage() {
  return (
    <>
      <PageBanner
        title={`Admissions ${siteConfig.academicYear}`}
        description="Admissions are open for Classes 8, 9 and 11. Classes 10 and 12 admit students only on transfer, subject to seat availability."
        breadcrumbs={[{ label: 'Admissions' }]}
        image={images.heroHeritage}
      />

      <section aria-labelledby="procedure-heading" className="py-16 sm:py-20">
        <Container>
          <SectionHeading eyebrow="How to apply" title="Admission procedure" titleId="procedure-heading" align="center" />
          <ol className="mt-12 grid gap-5 md:grid-cols-5">
            {admissionSteps.map((step, index) => (
              <li key={step.title} className="relative rounded-lg border bg-card p-5 pt-8 shadow-sm">
                <span className="absolute -top-5 left-5 flex size-10 items-center justify-center rounded-full bg-secondary font-display text-lg font-bold text-secondary-foreground ring-4 ring-background">
                  {index + 1}
                </span>
                <h3 className="font-display text-lg font-semibold text-primary-900">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/admissions/apply">
                Fill the admission form
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-background-subtle py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-2">
          <article className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <h2 className="flex items-center gap-2 bg-primary px-5 py-3.5 font-display text-lg font-semibold text-white">
              <UserCheck aria-hidden className="size-5 text-secondary-300" />
              Eligibility
            </h2>
            <dl className="divide-y">
              {eligibilityRules.map((rule) => (
                <div key={rule.className} className="grid gap-1 px-5 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                  <dt className="font-display font-semibold text-accent">{rule.className}</dt>
                  <dd>{rule.criteria}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <h2 className="flex items-center gap-2 bg-accent px-5 py-3.5 font-display text-lg font-semibold text-white">
              <CalendarDays aria-hidden className="size-5 text-secondary-200" />
              Important dates
            </h2>
            <table className="w-full text-left">
              <caption className="sr-only">Admission schedule for {siteConfig.academicYear}</caption>
              <tbody className="divide-y">
                {importantDates.map((importantDate) => (
                  <tr key={importantDate.label}>
                    <th scope="row" className="px-5 py-4 font-medium">{importantDate.label}</th>
                    <td className="px-5 py-4 text-right font-display font-semibold whitespace-nowrap text-primary-900">
                      {formatIndianDate(importantDate.date)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="overflow-hidden rounded-lg border bg-card shadow-sm lg:col-span-2">
            <h2 className="flex items-center gap-2 bg-success px-5 py-3.5 font-display text-lg font-semibold text-white">
              <FileText aria-hidden className="size-5" />
              Documents required
            </h2>
            <ul className="grid gap-x-8 gap-y-3 p-5 sm:grid-cols-2">
              {requiredDocuments.map((document) => (
                <li key={document} className="flex gap-3">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rotate-45 bg-secondary" />
                  {document}
                </li>
              ))}
            </ul>
          </article>
        </Container>
      </section>

      <section className="py-14">
        <Container className="flex flex-col items-center gap-4 text-center">
          <p className="text-lg text-muted-foreground">
            Have questions? Our admissions office is open {siteConfig.contact.officeHours}.
          </p>
          <Button asChild variant="outline" size="lg">
            <a href={siteConfig.contact.phoneHref}>
              <Phone />
              Call {siteConfig.contact.phone}
            </a>
          </Button>
        </Container>
      </section>
    </>
  )
}
