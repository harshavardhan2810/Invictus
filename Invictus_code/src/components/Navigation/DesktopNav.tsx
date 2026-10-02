import { Link } from 'react-router'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { isNavGroup, mainNavigation } from '@/data/navigation'
import { cn } from '@/lib/utils'
import { useIsNavItemActive } from './useIsNavItemActive'

const topLevelItemClass =
  'flex h-13 items-center px-4 font-display text-[15px] font-medium text-white/90 transition-colors hover:bg-primary-700 hover:text-white focus-visible:bg-primary-700 data-[state=open]:bg-primary-700 data-[state=open]:text-white'

const activeTopLevelItemClass =
  'bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground'

export function DesktopNav({ className }: { className?: string }) {
  const isNavItemActive = useIsNavItemActive()

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {mainNavigation.map((item) => {
          if (!isNavGroup(item)) {
            const isActive = isNavItemActive(item.href)
            return (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild active={isActive}>
                  <Link to={item.href} className={cn(topLevelItemClass, isActive && activeTopLevelItemClass)}>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )
          }

          const isGroupActive = item.children.some((child) => isNavItemActive(child.href))
          return (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuTrigger
                className={cn(topLevelItemClass, isGroupActive && activeTopLevelItemClass)}
              >
                {item.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="w-80 p-2">
                <ul className="grid gap-0.5">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <NavigationMenuLink asChild active={isNavItemActive(child.href)}>
                        <Link
                          to={child.href}
                          className="block rounded-md px-3 py-2.5 transition-colors hover:bg-secondary-50 focus-visible:bg-secondary-50 data-[active]:bg-primary-50"
                        >
                          <span className="block font-display text-sm font-semibold text-primary-900">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="mt-0.5 line-clamp-1 block text-sm text-muted-foreground">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
