import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { JaaliPattern } from '@/components/common/JaaliPattern'
import { Button } from '@/components/ui/button'
import type { CtaContent } from '@/data/home'
import { siteConfig } from '@/data/site'

export function CTASection({ content }: { content: CtaContent }) {
  return (
    <section aria-labelledby="cta-heading" className="relative isolate overflow-hidden bg-accent py-16 sm:py-20">
      <JaaliPattern className="-z-10 text-white/10" />
      <div aria-hidden className="absolute -top-24 -left-24 -z-10 size-80 rounded-full bg-secondary/30 blur-3xl" />

      <Container className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold tracking-[0.2em] text-secondary-200 uppercase">
            {content.eyebrow}
          </p>
          <h2 id="cta-heading" className="mt-3 font-display text-3xl font-bold text-balance text-white sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-white/85">{content.description}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="secondary">
            <Link to={content.primaryCta.href}>
              {content.primaryCta.label}
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link to="/enquire-us">
              <Phone />
              {siteConfig.contact.enquiryUS}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <a href={siteConfig.contact.phoneHref}>
              <Phone />
              {siteConfig.contact.phone}
            </a>
          </Button>
        </div>
      </Container>
    </section>
  )
}
