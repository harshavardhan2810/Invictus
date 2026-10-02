import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import type { WelcomeContent } from '@/data/home'
import { siteConfig } from '@/data/site'
import { getInitials } from '@/lib/utils'
import { OrnamentHeading } from './OrnamentHeading'

const cornerClasses = [
  'top-0 left-0 border-t-2 border-l-2',
  'top-0 right-0 border-t-2 border-r-2',
  'bottom-0 left-0 border-b-2 border-l-2',
  'bottom-0 right-0 border-b-2 border-r-2',
]

const yearsOfExcellence = new Date().getFullYear() - siteConfig.establishedYear

export function HeritageAbout({ content }: { content: WelcomeContent }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto grid w-full max-w-lg grid-cols-5 gap-4">
          <div className="col-span-3 aspect-[3/4] overflow-hidden rounded-t-full border-4 border-secondary-200 shadow-xl">
            <img src={content.image.src} alt={content.image.alt} loading="lazy" className="size-full object-cover" />
          </div>
          <div className="col-span-2 flex flex-col justify-end gap-4">
            <div className="rounded-t-full bg-primary px-3 pt-10 pb-5 text-center text-white shadow-lg">
              <p className="font-display text-4xl font-bold text-secondary-300">{yearsOfExcellence}+</p>
              <p className="mt-1 text-sm leading-snug text-white/85">Years of academic excellence</p>
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-t-full border-4 border-secondary-200 shadow-xl">
              <img
                src={content.secondaryImage.src}
                alt={content.secondaryImage.alt}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
          </div>
        </div>

        <div>
          <OrnamentHeading eyebrow={content.eyebrow} title={content.title} titleId="about-heading" align="left" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {content.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 font-medium text-primary-900">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
                {highlight}
              </li>
            ))}
          </ul>

          <figure id="principal" className="relative mt-8 bg-card p-6 shadow-sm">
            {cornerClasses.map((cornerClass) => (
              <span key={cornerClass} aria-hidden className={`absolute size-5 border-secondary ${cornerClass}`} />
            ))}
            <blockquote className="font-display text-lg leading-relaxed text-primary-900 italic">
              “{content.principal.message}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full bg-primary font-display font-semibold text-secondary-300 ring-2 ring-secondary"
              >
                {getInitials(content.principal.name)}
              </span>
              <span>
                <span className="block font-semibold text-primary-900">{content.principal.name}</span>
                <span className="text-sm text-muted-foreground">{content.principal.title}</span>
              </span>
            </figcaption>
          </figure>

          <Button asChild size="lg" className="mt-8">
            <Link to={content.cta.href}>
              {content.cta.label}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}
