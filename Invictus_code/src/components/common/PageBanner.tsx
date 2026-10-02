import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import { JaaliPattern } from '@/components/common/JaaliPattern'
import { cn } from '@/lib/utils'
import { useTemplate } from '@/templates/useTemplate'

export interface Breadcrumb {
  label: string
  href?: string
}

interface PageBannerProps {
  title: string
  description?: string
  breadcrumbs: Breadcrumb[]
  image: string
}

function BreadcrumbTrail({ breadcrumbs, tone }: { breadcrumbs: Breadcrumb[]; tone: 'light' | 'dark' }) {
  const isLight = tone === 'light'

  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-1.5 text-sm', isLight ? 'text-primary-100' : 'text-muted-foreground')}>
        <li>
          <Link to="/" className={isLight ? 'hover:text-secondary-300' : 'hover:text-foreground'}>
            Home
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb) => (
          <li key={breadcrumb.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden className={cn('size-3.5', isLight && 'text-secondary-300')} />
            {breadcrumb.href ? (
              <Link to={breadcrumb.href} className={isLight ? 'hover:text-secondary-300' : 'hover:text-foreground'}>
                {breadcrumb.label}
              </Link>
            ) : (
              <span aria-current="page" className={cn('font-semibold', isLight ? 'text-white' : 'text-foreground')}>
                {breadcrumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageBanner({ title, description, breadcrumbs, image }: PageBannerProps) {
  const { templateId } = useTemplate()

  // The Minimal template keeps inner pages plain: no photo, no ornaments.
  if (templateId === 'minimal') {
    return (
      <section className="border-b bg-background-subtle py-12 sm:py-16">
        <Container>
          <BreadcrumbTrail breadcrumbs={breadcrumbs} tone="dark" />
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-3xl text-lg text-muted-foreground">{description}</p>}
        </Container>
      </section>
    )
  }

  return (
    <section className="relative isolate overflow-hidden bg-primary-900 py-12 sm:py-16">
      <img src={image} alt="" className="absolute inset-0 -z-20 size-full object-cover opacity-30" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-primary-950/95 via-primary-900/85 to-primary-800/60"
      />
      <JaaliPattern className="-z-10 text-white/5" />

      <Container>
        <BreadcrumbTrail breadcrumbs={breadcrumbs} tone="light" />
        <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">{description}</p>}
        <div aria-hidden className="mt-6 flex items-center gap-2">
          <span className="h-1 w-14 rounded-full bg-secondary" />
          <span className="size-2 rotate-45 bg-white" />
        </div>
      </Container>
    </section>
  )
}
