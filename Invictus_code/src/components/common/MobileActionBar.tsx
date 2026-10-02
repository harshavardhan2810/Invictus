import { GraduationCap, Phone } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { siteConfig } from '@/data/site'

const APPLY_PATH = '/admissions/apply'

// Sticky call / apply shortcuts on small screens, a common pattern on Indian school sites.
export function MobileActionBar() {
  const isOnApplyPage = useLocation().pathname === APPLY_PATH

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex shadow-[0_-4px_16px_rgb(0_0_0/0.12)] lg:hidden">
      <a
        href={siteConfig.contact.phoneHref}
        className="flex h-14 flex-1 items-center justify-center gap-2 bg-primary font-display font-semibold text-white"
      >
        <Phone className="size-5" />
        Call Now
      </a>
      {!isOnApplyPage && (
        <Link
          to={APPLY_PATH}
          className="flex h-14 flex-1 items-center justify-center gap-2 bg-secondary font-display font-semibold text-secondary-foreground"
        >
          <GraduationCap className="size-5" />
          Apply Online
        </Link>
      )}
    </div>
  )
}
