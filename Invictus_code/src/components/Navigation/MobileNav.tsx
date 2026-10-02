import { ChevronDown, Mail, Menu, Phone } from 'lucide-react'
import { Link } from 'react-router'

import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { isNavGroup, mainNavigation } from '@/data/navigation'
import { siteConfig } from '@/data/site'
import { cn } from '@/lib/utils'
import { useIsNavItemActive } from './useIsNavItemActive'

const mobileLinkClass =
  'block rounded-md px-4 py-2.5 font-display text-[15px] font-medium transition-colors hover:bg-muted'

export function MobileNav({ className }: { className?: string }) {
  const isNavItemActive = useIsNavItemActive()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className={className} aria-label="Open menu">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full gap-0 sm:max-w-sm">
        <SheetHeader className="border-b">
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-0.5">
            {mainNavigation.map((item) => {
              if (!isNavGroup(item)) {
                const isActive = isNavItemActive(item.href)
                return (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <Link
                        to={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          mobileLinkClass,
                          isActive ? 'bg-primary-50 text-primary' : 'text-foreground',
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  </li>
                )
              }

              return (
                <li key={item.label}>
                  <details className="group">
                    <summary
                      className={cn(
                        mobileLinkClass,
                        'flex cursor-pointer list-none items-center justify-between text-foreground [&::-webkit-details-marker]:hidden',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden
                        className="size-4 text-muted-foreground transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <ul className="mt-0.5 mb-2 ml-4 space-y-0.5 border-l-2 border-secondary-200 pl-2">
                      {item.children.map((child) => {
                        const isActive = isNavItemActive(child.href)
                        return (
                          <li key={child.href}>
                            <SheetClose asChild>
                              <Link
                                to={child.href}
                                aria-current={isActive ? 'page' : undefined}
                                className={cn(
                                  'block rounded-md px-3 py-2 text-[15px] transition-colors hover:bg-muted',
                                  isActive
                                    ? 'bg-primary-50 font-semibold text-primary'
                                    : 'text-foreground/80',
                                )}
                              >
                                {child.label}
                              </Link>
                            </SheetClose>
                          </li>
                        )
                      })}
                    </ul>
                  </details>
                </li>
              )
            })}
          </ul>
        </nav>

        <SheetFooter className="gap-4 border-t">
          <SheetClose asChild>
            <Button asChild size="lg" variant="secondary" className="w-full">
              <Link to="/admissions/apply">Apply Online</Link>
            </Button>
          </SheetClose>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href={siteConfig.contact.phoneHref} className="flex items-center gap-2 hover:text-primary">
              <Phone className="size-4" /> {siteConfig.contact.phone}
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 hover:text-primary"
            >
              <Mail className="size-4" /> {siteConfig.contact.email}
            </a>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
