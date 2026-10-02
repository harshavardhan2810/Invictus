import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { JaaliPattern } from '@/components/common/JaaliPattern'
import { Logo } from '@/components/common/Logo'
import { SocialIcon } from '@/components/common/SocialIcon'
import { footerQuickLinks } from '@/data/navigation'
import { siteConfig } from '@/data/site'

const footerHeadingClass = 'font-display text-base font-semibold text-white'
const currentYear = new Date().getFullYear()

function FooterHeading({ children, id }: { children: string; id?: string }) {
  return (
    <div className="mb-5">
      <h2 id={id} className={footerHeadingClass}>
        {children}
      </h2>
      <span aria-hidden className="mt-2 block h-0.5 w-10 bg-secondary" />
    </div>
  )
}

export function Footer() {
  const { contact, affiliation } = siteConfig

  return (
    <footer id="contact" className="relative isolate scroll-mt-20 bg-primary-950 text-primary-100">
      <JaaliPattern className="-z-10 text-white/[0.03]" />
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link to="/" aria-label={`${siteConfig.fullName} home`} className="inline-block">
            <Logo tone="light" showMotto />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm text-primary-300">
            Affiliated to {affiliation.board} · Affiliation No. {affiliation.affiliationNumber}
          </p>
          <ul className="mt-6 flex gap-2.5">
            {siteConfig.socialLinks.map((socialLink) => (
              <li key={socialLink.platform}>
                <a
                  href={socialLink.href}
                  aria-label={socialLink.label}
                  className="flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary hover:text-secondary-foreground"
                >
                  <SocialIcon platform={socialLink.platform} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-quick-links" className="lg:col-span-2">
          <FooterHeading id="footer-quick-links">Quick Links</FooterHeading>
          <ul className="space-y-2.5">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="transition-colors hover:text-secondary-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-important-links" className="lg:col-span-2">
          <FooterHeading id="footer-important-links">Important Links</FooterHeading>
          <ul className="space-y-2.5">
            {siteConfig.importantLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-secondary-300"
                >
                  {link.label}
                  <ExternalLink aria-hidden className="size-3.5 opacity-60" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-4">
          <FooterHeading>Contact Us</FooterHeading>
          <address className="space-y-4 not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-secondary-300" />
              <span>
                {contact.address}
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block text-sm font-semibold text-secondary-300 hover:underline"
                >
                  Get directions
                </a>
              </span>
            </p>
            <a href={contact.phoneHref} className="flex gap-3 hover:text-secondary-300">
              <Phone className="mt-0.5 size-5 shrink-0 text-secondary-300" />
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="flex gap-3 hover:text-secondary-300">
              <Mail className="mt-0.5 size-5 shrink-0 text-secondary-300" />
              {contact.email}
            </a>
            <p className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-secondary-300" />
              Office hours: {contact.officeHours}
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-sm text-primary-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.fullName}. All rights reserved.
          </p>
          <p>Hyderabad, Telangana, India</p>
        </Container>
      </div>
    </footer>
  )
}
