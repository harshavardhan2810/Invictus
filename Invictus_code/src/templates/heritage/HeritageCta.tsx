import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { Mandala } from '@/components/common/Ornaments'
import { Button } from '@/components/ui/button'
import type { CtaContent } from '@/data/home'
import { siteConfig } from '@/data/site'
import { OrnamentHeading } from './OrnamentHeading'

export function HeritageCta({ content }: { content: CtaContent }) {
  return (
    <section aria-labelledby="cta-heading" className="bg-background-subtle py-16 sm:py-20">
      <Container>
        <div className="relative isolate overflow-hidden border-4 border-double border-secondary bg-primary px-6 py-14 text-center sm:px-12">
          <Mandala className="absolute -top-24 -left-24 -z-10 size-72 text-secondary/25" />
          <Mandala className="absolute -right-24 -bottom-24 -z-10 size-72 text-secondary/25" />
          <OrnamentHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            titleId="cta-heading"
            tone="light"
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link to={content.primaryCta.href}>
                {content.primaryCta.label}
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <a href={siteConfig.contact.phoneHref}>
                <Phone />
                {siteConfig.contact.phone}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
