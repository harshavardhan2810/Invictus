import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import type { CtaContent } from '@/data/home'
import { siteConfig } from '@/data/site'

export function MinimalCta({ content }: { content: CtaContent }) {
  return (
    <section aria-labelledby="cta-heading" className="border-t bg-background-subtle py-20 sm:py-28">
      <Container className="text-center">
        <h2 id="cta-heading" className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">{content.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="secondary" size="lg" className="rounded-full">
            <Link to={content.primaryCta.href}>
              {content.primaryCta.label}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <a href={siteConfig.contact.phoneHref}>Call {siteConfig.contact.phone}</a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
