import { Bus, GraduationCap, Quote } from 'lucide-react'

import { Container } from '@/components/common/Container'
import type { WelcomeContent } from '@/data/home'
import { MinimalSectionHeader } from './MinimalSectionHeader'

// Bento grid: one large photo tile and smaller text tiles around it.
export function MinimalHighlights({ content }: { content: WelcomeContent }) {
  const [, foundationHighlight, labsHighlight, transportHighlight] = content.highlights

  return (
    <section id="about" aria-labelledby="about-heading" className="scroll-mt-20 py-16 sm:py-24">
      <Container>
        <MinimalSectionHeader
          sectionNumber={1}
          label="About"
          title={content.title}
          titleId="about-heading"
          description={content.paragraphs[0]}
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <figure className="relative min-h-80 overflow-hidden rounded-2xl lg:col-span-2 lg:row-span-2">
            <img
              src={content.secondaryImage.src}
              alt={content.secondaryImage.alt}
              loading="lazy"
              className="absolute inset-0 size-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-primary-950/80 to-transparent p-6 pt-16 font-display text-lg font-semibold text-white">
              {labsHighlight}
            </figcaption>
          </figure>

          <blockquote className="flex flex-col justify-between rounded-2xl bg-muted p-6 lg:col-span-2">
            <Quote aria-hidden className="size-6 text-secondary-600" />
            <p className="mt-4 text-lg leading-relaxed">{content.principal.message}</p>
            <footer className="mt-4 text-sm">
              <span className="font-semibold">{content.principal.name}</span>
              <span className="text-muted-foreground"> · {content.principal.title}</span>
            </footer>
          </blockquote>

          <div className="flex flex-col justify-between rounded-2xl bg-primary p-6 text-primary-foreground">
            <GraduationCap aria-hidden className="size-7 text-secondary-300" />
            <p className="mt-8 font-display text-xl font-semibold">{foundationHighlight}</p>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border p-6">
            <Bus aria-hidden className="size-7 text-secondary-600" />
            <p className="mt-8 font-display text-xl font-semibold">{transportHighlight}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
