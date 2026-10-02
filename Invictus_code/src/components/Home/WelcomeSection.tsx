import { ArrowRight, CheckCircle2, Quote } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import type { WelcomeContent } from '@/data/home'
import { siteConfig } from '@/data/site'
import { getInitials } from '@/lib/utils'

export function WelcomeSection({ content }: { content: WelcomeContent }) {
  const { principal } = content

  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading eyebrow={content.eyebrow} title={content.title} titleId="about-heading" />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {content.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 font-medium text-primary-900">
                <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
                {highlight}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-10">
            <Link to={content.cta.href}>
              {content.cta.label}
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          <div className="relative pt-3 pl-3">
            <div aria-hidden className="absolute inset-0 right-3 bottom-3 rounded-lg border-4 border-secondary" />
            <img
              src={content.image.src}
              alt={content.image.alt}
              loading="lazy"
              className="relative aspect-[16/10] w-full rounded-lg object-cover shadow-xl"
            />
            <div className="absolute right-4 bottom-4 rounded-md bg-primary/90 px-4 py-2 text-center text-white backdrop-blur-sm">
              <p lang="sa" className="text-lg font-semibold text-secondary-300">
                {siteConfig.motto.text}
              </p>
              <p className="text-xs text-white/80">{siteConfig.motto.translation}</p>
            </div>
          </div>

          <figure id="principal" className="relative rounded-lg border-l-4 border-accent bg-background-subtle p-6 shadow-sm sm:p-8">
            <Quote aria-hidden className="absolute top-5 right-5 size-10 text-secondary-200" />
            <p className="font-display text-sm font-semibold tracking-wider text-accent uppercase">
              From the Principal’s desk
            </p>
            <blockquote className="mt-3 text-lg leading-relaxed text-foreground italic">
              “{principal.message}”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span
                aria-hidden
                className="flex size-12 items-center justify-center rounded-full bg-primary font-display font-semibold text-secondary-300"
              >
                {getInitials(principal.name)}
              </span>
              <span>
                <span className="block font-display font-semibold text-primary-900">{principal.name}</span>
                <span className="text-sm text-muted-foreground">{principal.title}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  )
}
