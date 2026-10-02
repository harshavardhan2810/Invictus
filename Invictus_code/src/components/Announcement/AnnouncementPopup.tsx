import { useEffect, useState } from 'react'
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Megaphone,
  Trophy,
  type LucideIcon,
} from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { getActiveAnnouncement, type AnnouncementType } from '@/data/announcements'
import { formatIndianDate } from '@/lib/format'
import { readStoredJson, readStoredValue, writeStoredJson } from '@/lib/storage'
import { cn } from '@/lib/utils'

const OPEN_DELAY_MS = 900
const DISMISSED_KEY = 'invictus.dismissedAnnouncements'
const SEEN_THIS_SESSION_KEY = 'invictus.seenAnnouncement'
// Don't interrupt someone filling in a form.
const SUPPRESSED_PATHS = ['/admissions/apply']

const typeStyles: Record<AnnouncementType, { label: string; icon: LucideIcon; badgeClass: string }> = {
  campus: { label: 'New Campus', icon: Building2, badgeClass: 'bg-success text-success-foreground' },
  exam: { label: 'Exam Alert', icon: ClipboardList, badgeClass: 'bg-accent text-accent-foreground' },
  result: { label: 'Results Declared', icon: Trophy, badgeClass: 'bg-secondary text-secondary-foreground' },
  admission: { label: 'Admissions', icon: GraduationCap, badgeClass: 'bg-primary text-primary-foreground' },
  general: { label: 'Announcement', icon: Megaphone, badgeClass: 'bg-primary text-primary-foreground' },
}

function shouldShow(announcementId: string) {
  const dismissedIds = readStoredJson<string[]>('local', DISMISSED_KEY, [])
  const seenThisSession = readStoredValue('session', SEEN_THIS_SESSION_KEY) === JSON.stringify(announcementId)
  return !dismissedIds.includes(announcementId) && !seenThisSession
}

export function AnnouncementPopup() {
  const [announcement] = useState(() => getActiveAnnouncement())
  const [isOpen, setIsOpen] = useState(false)
  const [isDontShowAgainChecked, setIsDontShowAgainChecked] = useState(false)
  const { pathname } = useLocation()
  const isSuppressed = SUPPRESSED_PATHS.includes(pathname)

  useEffect(() => {
    if (!announcement || isSuppressed || !shouldShow(announcement.id)) return
    const openTimer = window.setTimeout(() => setIsOpen(true), OPEN_DELAY_MS)
    return () => window.clearTimeout(openTimer)
  }, [announcement, isSuppressed])

  if (!announcement) return null

  function handleOpenChange(nextIsOpen: boolean) {
    setIsOpen(nextIsOpen)
    if (nextIsOpen || !announcement) return
    writeStoredJson('session', SEEN_THIS_SESSION_KEY, announcement.id)
    if (isDontShowAgainChecked) {
      const dismissedIds = readStoredJson<string[]>('local', DISMISSED_KEY, [])
      writeStoredJson('local', DISMISSED_KEY, [...new Set([...dismissedIds, announcement.id])])
    }
  }

  const { label, icon: TypeIcon, badgeClass } = typeStyles[announcement.type]

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-xl gap-0 p-0">
        <div className="relative">
          {announcement.image ? (
            <img
              src={announcement.image.src}
              alt={announcement.image.alt}
              className="aspect-[16/7] w-full rounded-t-lg object-cover"
            />
          ) : (
            <div aria-hidden className="flex aspect-[16/5] items-center justify-center rounded-t-lg bg-primary">
              <TypeIcon className="size-14 text-secondary-300" />
            </div>
          )}
          <span
            className={cn(
              'absolute bottom-0 left-6 inline-flex translate-y-1/2 items-center gap-1.5 rounded-sm px-3 py-1 font-display text-xs font-bold tracking-wider uppercase shadow-md',
              badgeClass,
            )}
          >
            <TypeIcon aria-hidden className="size-3.5" />
            {label}
          </span>
        </div>

        <div className="space-y-4 p-6 pt-8">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays aria-hidden className="size-4" />
            Announced on {formatIndianDate(announcement.announcedOn)}
          </p>
          <DialogTitle className="text-2xl leading-snug">{announcement.title}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-foreground/80">
            {announcement.message}
          </DialogDescription>

          {announcement.highlights && (
            <ul className="space-y-2">
              {announcement.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5">
                  <CheckCircle2 aria-hidden className="mt-0.5 size-5 shrink-0 text-success" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            {announcement.primaryCta && (
              <Button asChild variant="secondary" size="lg" className="sm:flex-1">
                <Link to={announcement.primaryCta.href} onClick={() => handleOpenChange(false)}>
                  {announcement.primaryCta.label}
                </Link>
              </Button>
            )}
            <DialogClose asChild>
              <Button variant="outline" size="lg">
                Close
              </Button>
            </DialogClose>
          </div>

          <label className="flex cursor-pointer items-center gap-2 border-t pt-4 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={isDontShowAgainChecked}
              onChange={(event) => setIsDontShowAgainChecked(event.target.checked)}
              className="size-4 accent-primary"
            />
            Don’t show this again
          </label>
        </div>
      </DialogContent>
    </Dialog>
  )
}
