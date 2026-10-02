import { SocialIcon } from '@/components/common/SocialIcon'
import { siteConfig } from '@/data/site'

// Floats on the left so it never collides with page content on the right or the
// mobile call/apply bar at the bottom.
export function WhatsAppButton() {
  return (
    <a
      href={siteConfig.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="group fixed bottom-20 left-4 z-40 lg:bottom-6 lg:left-6"
    >
      <span aria-hidden className="absolute inset-0 rounded-full bg-whatsapp opacity-50 motion-safe:animate-ping" />
      <span className="relative flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-whatsapp/40">
        <SocialIcon platform="whatsapp" className="size-8" />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-full ml-3 hidden -translate-y-1/2 rounded-md bg-card px-3 py-1.5 font-display text-sm font-semibold whitespace-nowrap text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block"
      >
        Chat with us on WhatsApp
      </span>
    </a>
  )
}
