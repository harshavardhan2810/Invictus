import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { Crest, Logo } from '@/components/common/Logo'
import { Mandala } from '@/components/common/Ornaments'
import { SocialIcon } from '@/components/common/SocialIcon'
import { NewsTicker } from '@/components/Header/NewsTicker'
import { DesktopNav } from '@/components/Navigation/DesktopNav'
import { MobileNav } from '@/components/Navigation/MobileNav'
import { Button } from '@/components/ui/button'
import { tickerItems } from '@/data/home'
import { siteConfig } from '@/data/site'

export function HeritageHeader() {
  const { contact, affiliation } = siteConfig

  return (
    <>
      <div className="hidden border-b border-secondary-300 bg-background-subtle text-sm text-primary-900 md:block">
        <Container className="flex h-10 items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 hover:text-primary-600">
              <Phone className="size-3.5 text-secondary-600" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="hidden items-center gap-1.5 hover:text-primary-600 lg:inline-flex">
              <Mail className="size-3.5 text-secondary-600" />
              {contact.email}
            </a>
          </div>
          <p className="hidden truncate font-medium xl:block">
            Affiliated to {affiliation.board} · Affiliation No. {affiliation.affiliationNumber}
          </p>
          <div className="flex shrink-0 items-center gap-4">
            <ul className="hidden items-center gap-1 lg:flex">
              {siteConfig.socialLinks.map((socialLink) => (
                <li key={socialLink.platform}>
                  <a
                    href={socialLink.href}
                    aria-label={socialLink.label}
                    className="flex size-7 items-center justify-center rounded-full text-primary-700 hover:bg-secondary-100"
                  >
                    <SocialIcon platform={socialLink.platform} className="size-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      <div className="relative hidden overflow-hidden bg-background lg:block">
        <Mandala className="absolute top-1/2 -left-36 size-72 -translate-y-1/2 text-secondary-300/60" />
        <Mandala className="absolute top-1/2 -right-36 size-72 -translate-y-1/2 text-secondary-300/60" />
        <Container className="relative flex items-center justify-between py-6">
          <p className="w-56 font-display text-sm text-primary-700 italic">
            Estd. {siteConfig.establishedYear}
            <span className="block not-italic text-muted-foreground">{affiliation.board}</span>
          </p>
          <Link to="/" aria-label={`${siteConfig.fullName} home`} className="flex flex-col items-center text-center">
            <Crest className="h-20" />
            <span className="mt-3 font-display text-4xl font-bold tracking-[0.25em] text-primary-800 uppercase">
              {siteConfig.name}
            </span>
            <span className="mt-2 flex items-center gap-3">
              <span aria-hidden className="h-px w-12 bg-secondary-400" />
              <span className="font-display text-xs font-semibold tracking-[0.35em] text-secondary-700 uppercase">
                {siteConfig.descriptor}
              </span>
              <span aria-hidden className="h-px w-12 bg-secondary-400" />
            </span>
            <span lang="sa" className="mt-1.5 text-lg font-semibold text-accent">
              {siteConfig.motto.text}
            </span>
          </Link>
          <div className="flex w-56 justify-end">
            <Button asChild>
              <Link to="/admissions/apply">Admissions {siteConfig.academicYear}</Link>
            </Button>
          </div>
        </Container>
      </div>

      <header className="sticky top-0 z-40 shadow-md">
        <div className="border-b-2 border-secondary bg-background lg:hidden">
          <Container className="flex h-18 items-center justify-between gap-4">
            <Link to="/" aria-label={`${siteConfig.fullName} home`}>
              <Logo />
            </Link>
            <MobileNav />
          </Container>
        </div>
        <div className="hidden border-y-4 border-double border-secondary bg-primary lg:block">
          <Container className="flex justify-center">
            <DesktopNav />
          </Container>
        </div>
      </header>

      <NewsTicker items={tickerItems} />
    </>
  )
}
