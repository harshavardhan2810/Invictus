import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { Crest } from '@/components/common/Logo'
import { SocialIcon } from '@/components/common/SocialIcon'
import { siteConfig } from '@/data/site'

const currentYear = new Date().getFullYear()

const footerColumns = [
  {
    title: 'School',
    links: [
      { label: 'Programs', href: '/programs' },
      { label: 'Admission procedure', href: '/admissions' },
      { label: 'Apply online', href: '/admissions/apply' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Exam papers', href: '/downloads/exam-papers' },
      { label: 'Competitive papers', href: '/downloads/competitive-papers' },
      { label: 'Activities', href: '/activities' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
]

export function MinimalFooter() {
  const { contact, affiliation } = siteConfig

  return (
    <footer id="contact" className="scroll-mt-20 border-t bg-background">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-2.5">
            <Crest className="h-8" />
            <span className="font-display text-xl font-bold tracking-tight">{siteConfig.fullName}</span>
          </Link>
          <address className="mt-5 space-y-1.5 text-muted-foreground not-italic">
            <p>{contact.address}</p>
            <p>
              <a href={contact.phoneHref} className="hover:text-foreground">
                {contact.phone}
              </a>
              {' · '}
              <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                {contact.email}
              </a>
            </p>
            <p>{contact.officeHours}</p>
          </address>
        </div>

        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="md:col-span-2">
            <h2 className="font-display text-sm font-semibold">{column.title}</h2>
            <ul className="mt-4 space-y-2.5 text-muted-foreground">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="md:col-span-3">
          <h2 className="font-display text-sm font-semibold">Follow</h2>
          <ul className="mt-4 flex gap-2">
            {siteConfig.socialLinks.map((socialLink) => (
              <li key={socialLink.platform}>
                <a
                  href={socialLink.href}
                  aria-label={socialLink.label}
                  className="flex size-10 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <SocialIcon platform={socialLink.platform} className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t">
        <Container className="flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            © {currentYear} {siteConfig.fullName}
          </p>
          <p>
            Affiliated to {affiliation.board} · Affiliation No. {affiliation.affiliationNumber}
          </p>
        </Container>
      </div>
    </footer>
  )
}
