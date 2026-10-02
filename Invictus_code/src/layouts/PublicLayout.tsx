import { Outlet } from 'react-router'

import { AnnouncementPopup } from '@/components/Announcement/AnnouncementPopup'
import { MobileActionBar } from '@/components/common/MobileActionBar'
import { ScrollManager } from '@/components/common/ScrollManager'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { templateLayouts } from '@/templates/templateLayouts'
import { TemplateSwitcher } from '@/templates/TemplateSwitcher'
import { useTemplate } from '@/templates/useTemplate'

// Shell for the public website. Header and footer come from the active template;
// the admin area has its own layout (AdminLayout).
export function PublicLayout() {
  const { templateId } = useTemplate()
  const { Header, Footer } = templateLayouts[templateId]

  return (
    <div className="flex min-h-svh flex-col pb-14 lg:pb-0">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileActionBar />
      <WhatsAppButton />
      <TemplateSwitcher />
      <AnnouncementPopup />
    </div>
  )
}
