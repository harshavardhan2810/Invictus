import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { Crest } from '@/components/common/Logo'
import { LotusOrnament, Mandala } from '@/components/common/Ornaments'
import { SocialIcon } from '@/components/common/SocialIcon'
import { footerQuickLinks } from '@/data/navigation'
import { siteConfig } from '@/data/site'

const currentYear = new Date().getFullYear()

function FooterHeading({ children, id }: { children: string; id?: string }) {
  return (
    <h2 id={id} className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-secondary-200">
      <LotusOrnament className="h-4 text-secondary-400" />
      {children}
    </h2>
  )
}

export function HeritageFooter() {
  const { contact, affiliation } = siteConfig

  return (
    <footer id="contact" className="relative isolate scroll-mt-20 overflow-hidden border-t-4 border-double border-secondary bg-primary-950 text-primary-100">
      <Mandala className="absolute -bottom-40 left-1/2 -z-10 size-[30rem] -translate-x-1/2 text-white/[0.04]" />

      <Container className="flex flex-col items-center border-b border-white/10 py-12 text-center">
        <Crest className="h-16" />
        <p className="mt-3 font-display text-3xl font-bold tracking-[0.25em] text-white uppercase">{siteConfig.name}</p>
        <p className="mt-1 font-display text-xs tracking-[0.35em] text-secondary-300 uppercase">{siteConfig.descriptor}</p>
        <p lang="sa" className="mt-2 text-lg text-white/80">
          {siteConfig.motto.text} — <span className="italic">{siteConfig.motto.translation}</span>
        </p>
        <ul className="mt-6 flex gap-2.5">
          {siteConfig.socialLinks.map((socialLink) => (
            <li key={socialLink.platform}>
              <a
                href={socialLink.href}
                aria-label={socialLink.label}
                className="flex size-10 items-center justify-center rounded-full border border-secondary/40 text-secondary-200 transition-colors hover:bg-secondary hover:text-secondary-foreground"
              >
                <SocialIcon platform={socialLink.platform} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <nav aria-labelledby="heritage-footer-links">
          <FooterHeading id="heritage-footer-links">Quick Links</FooterHeading>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {footerQuickLinks.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="hover:text-secondary-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="heritage-footer-important">
          <FooterHeading id="heritage-footer-important">Important Links</FooterHeading>
          <ul className="space-y-2.5">
            {siteConfig.importantLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-secondary-300">
                  {link.label}
                  <ExternalLink aria-hidden className="size-3.5 opacity-60" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-1">
          <FooterHeading>Visit Us</FooterHeading>
          <address className="space-y-3.5 not-italic">
            <p className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-secondary-300" />
              <span>
                {contact.address}
                <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-semibold text-secondary-300 hover:underline">
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
              {contact.officeHours}
            </p>
          </address>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-sm text-primary-200 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {siteConfig.fullName} · Affiliated to {affiliation.board}
          </p>
          <p>Hyderabad, Telangana, India</p>
        </Container>
      </div>
    </footer>
  )
}
