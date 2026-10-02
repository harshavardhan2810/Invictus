import { useEffect, useState } from 'react'
import { Mail, Phone } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { JaaliPattern } from '@/components/common/JaaliPattern'
import { Logo } from '@/components/common/Logo'
import { SocialIcon } from '@/components/common/SocialIcon'
import { DesktopNav } from '@/components/Navigation/DesktopNav'
import { MobileNav } from '@/components/Navigation/MobileNav'
import { Button } from '@/components/ui/button'
import { tickerItems } from '@/data/home'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'
import { NewsTicker } from './NewsTicker'

function TricolourStrip() {
  return (
    <div aria-hidden className="flex h-1">
      <span className="flex-1 bg-india-saffron" />
      <span className="flex-1 bg-india-white" />
      <span className="flex-1 bg-india-green" />
    </div>
  )
}

function TopBar() {
  const { affiliation, contact } = siteConfig

  return (
    <div className="hidden bg-primary-950 text-sm text-primary-100 md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <p className="truncate">
          Affiliated to {affiliation.board}
          <span className="mx-2 text-primary-400">|</span>
          Affiliation No. {affiliation.affiliationNumber}
          <span className="mx-2 text-primary-400">|</span>
          School Code {affiliation.schoolCode}
        </p>
        <div className="flex shrink-0 items-center gap-5">
          <a href={contact.phoneHref} className="inline-flex items-center gap-1.5 hover:text-white">
            <Phone className="size-3.5 text-secondary-300" />
            {contact.phone}
          </a>
          <ul className="hidden items-center gap-1 xl:flex">
            {siteConfig.socialLinks.map((socialLink) => (
              <li key={socialLink.platform}>
                <a
                  href={socialLink.href}
                  aria-label={socialLink.label}
                  className="flex size-7 items-center justify-center rounded-full hover:bg-white/10 hover:text-white"
                >
                  <SocialIcon platform={socialLink.platform} className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  )
}

function BrandBar() {
  const { contact } = siteConfig

  return (
    <div className="relative hidden overflow-hidden bg-background lg:block">
      <JaaliPattern className="text-secondary-100 [mask-image:linear-gradient(to_left,black,transparent_45%)]" />
      <Container className="relative flex items-center justify-between gap-8 py-4">
        <Link to="/" aria-label={`${siteConfig.fullName} home`}>
          <Logo size="large" showMotto />
        </Link>
        <div className="flex items-center gap-8">
          <a href={contact.phoneHref} className="group flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary-100 text-secondary-700 transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
              <Phone className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm text-muted-foreground">Call us</span>
              <span className="font-display font-semibold text-primary-900">{contact.phone}</span>
            </span>
          </a>
          <a href={`mailto:${contact.email}`} className="group hidden items-center gap-3 xl:flex">
            <span className="flex size-11 items-center justify-center rounded-full bg-secondary-100 text-secondary-700 transition-colors group-hover:bg-secondary group-hover:text-secondary-foreground">
              <Mail className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm text-muted-foreground">Email us</span>
              <span className="font-display font-semibold text-primary-900">{contact.email}</span>
            </span>
          </a>
          <Button asChild size="lg" variant="accent">
            <Link to="/admissions/apply">Admissions {siteConfig.academicYear}</Link>
          </Button>
        </div>
      </Container>
    </div>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 120)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <TricolourStrip />
      <TopBar />
      <BrandBar />

      <header className={cn('sticky top-0 z-40 transition-shadow', isScrolled && 'shadow-lg')}>
        <div className="border-b bg-background lg:hidden">
          <Container className="flex h-18 items-center justify-between gap-4">
            <Link to="/" aria-label={`${siteConfig.fullName} home`}>
              <Logo />
            </Link>
            <div className="flex items-center gap-2">
              <Button asChild variant="secondary" className="hidden sm:inline-flex">
                <Link to="/admissions/apply">Apply Online</Link>
              </Button>
              <MobileNav />
            </div>
          </Container>
        </div>

        <div className="hidden bg-primary lg:block">
          <Container className="flex items-center justify-between gap-4">
            <DesktopNav />
            <Button asChild variant="secondary" size="sm" className="shrink-0">
              <Link to="/admissions/apply">Apply Online</Link>
            </Button>
          </Container>
        </div>
      </header>

      <NewsTicker items={tickerItems} />
    </>
  )
}
