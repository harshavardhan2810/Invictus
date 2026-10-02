import { ArrowRight, Menu } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { Container } from '@/components/common/Container'
import { Crest } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { minimalNavigation } from '@/data/navigation'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'

/** A menu item stays active anywhere inside its section, e.g. Downloads on /downloads/competitive-papers. */
function isMenuItemActive(href: string, pathname: string, hash: string) {
  if (href.includes('#')) return `${pathname}${hash}` === href
  if (href === '/') return pathname === '/' && !hash
  return pathname.split('/')[1] === href.split('/')[1]
}

function Wordmark() {
  return (
    <Link to="/" aria-label={`${siteConfig.fullName} home`} className="flex items-center gap-2.5">
      <Crest className="h-8" />
      <span className="font-display text-xl font-bold tracking-tight text-foreground">{siteConfig.name}</span>
    </Link>
  )
}

export function MinimalHeader() {
  const { pathname, hash } = useLocation()

  return (
    <>
      <div className="bg-primary text-sm text-primary-200">
        <Container className="flex h-9 items-center justify-center gap-3">
          <span className="truncate">{siteConfig.admissionsNotice}</span>
          <Link to="/admissions/apply" className="inline-flex shrink-0 items-center gap-1 font-medium text-white hover:underline">
            Apply
            <ArrowRight className="size-3.5" />
          </Link>
        </Container>
      </div>

      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Wordmark />

          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {minimalNavigation.map((item) => {
              const isActive = isMenuItemActive(item.href, pathname, hash)
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'text-[15px] font-medium transition-colors hover:text-foreground',
                    isActive ? 'text-foreground underline decoration-secondary decoration-2 underline-offset-[22px]' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="secondary" size="sm" className="hidden rounded-full px-4 sm:inline-flex">
              <Link to="/admissions/apply">Apply now</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="gap-0 pb-6">
                <SheetHeader className="border-b">
                  <SheetTitle asChild>
                    <div>
                      <Wordmark />
                    </div>
                  </SheetTitle>
                  <SheetDescription className="sr-only">Site navigation</SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile">
                  <Container>
                    <ul className="divide-y">
                      {minimalNavigation.map((item) => {
                        const isActive = isMenuItemActive(item.href, pathname, hash)
                        return (
                          <li key={item.href}>
                            <SheetClose asChild>
                              <Link
                                to={item.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={cn(
                                  'flex items-center justify-between py-4 font-display text-xl font-semibold',
                                  isActive ? 'text-secondary-700' : 'text-foreground',
                                )}
                              >
                                {item.label}
                                <ArrowRight aria-hidden className="size-5 text-muted-foreground" />
                              </Link>
                            </SheetClose>
                          </li>
                        )
                      })}
                    </ul>
                    <SheetClose asChild>
                      <Button asChild variant="secondary" size="lg" className="mt-4 w-full rounded-full">
                        <Link to="/admissions/apply">Apply now</Link>
                      </Button>
                    </SheetClose>
                  </Container>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </Container>
      </header>
    </>
  )
}
