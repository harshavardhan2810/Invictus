import { Megaphone } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from '@/components/common/Container'
import type { TickerItem } from '@/data/home'

function TickerList({ items, isDuplicate }: { items: TickerItem[]; isDuplicate?: boolean }) {
  return (
    <ul aria-hidden={isDuplicate} className="flex shrink-0 motion-reduce:[&[aria-hidden=true]]:hidden">
      {items.map((item) => (
        <li key={item.text} className="flex shrink-0 items-center gap-3 px-5 text-[15px]">
          <span aria-hidden className="size-1.5 rotate-45 bg-secondary" />
          {item.href ? (
            <Link
              to={item.href}
              tabIndex={isDuplicate ? -1 : undefined}
              className="font-medium text-primary-900 hover:text-accent hover:underline"
            >
              {item.text}
            </Link>
          ) : (
            <span className="text-primary-900">{item.text}</span>
          )}
        </li>
      ))}
    </ul>
  )
}

export function NewsTicker({ items }: { items: TickerItem[] }) {
  return (
    <div className="border-b border-secondary-200 bg-secondary-50">
      <Container className="flex h-11 items-center gap-3">
        <p className="flex shrink-0 items-center gap-2 rounded-sm bg-accent px-3 py-1 font-display text-xs font-semibold tracking-wide text-accent-foreground uppercase">
          <Megaphone aria-hidden className="size-3.5" />
          <span className="hidden sm:inline">Latest Updates</span>
          <span className="sm:hidden">News</span>
        </p>
        <div className="group relative flex-1 overflow-hidden mask-x-from-95% mask-x-to-100% motion-reduce:overflow-x-auto">
          <div className="flex w-max animate-marquee group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            <TickerList items={items} />
            <TickerList items={items} isDuplicate />
          </div>
        </div>
      </Container>
    </div>
  )
}
