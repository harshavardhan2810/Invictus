import { useState } from 'react'
import { Mail, Phone, Trash2 } from 'lucide-react'

import { admissionStatuses, type AdmissionRecord, type AdmissionStatus } from '@/api/admissions'
import { SocialIcon } from '@/components/common/SocialIcon'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/native-select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { formatIndianDate, formatIndianDateTime } from '@/lib/format'
import { cn } from '@/lib/utils'
import { admissionStatusClasses } from './admissionStatusStyles'

interface AdmissionDetailsSheetProps {
  record: AdmissionRecord | null
  onClose: () => void
  onStatusChange: (record: AdmissionRecord, status: AdmissionStatus) => void
  onDelete: (record: AdmissionRecord) => void
}

function DetailGroup({ title, details }: { title: string; details: [string, string | undefined][] }) {
  return (
    <section>
      <h3 className="font-display text-sm font-semibold tracking-wider text-secondary-700 uppercase">{title}</h3>
      <dl className="mt-2 divide-y rounded-lg border bg-card">
        {details.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[9rem_1fr] gap-3 px-4 py-2.5 text-[15px]">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-medium break-words">{value || '—'}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function AdmissionDetailsSheet({ record, onClose, onStatusChange, onDelete }: AdmissionDetailsSheetProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

  function handleOpenChange(isOpen: boolean) {
    if (isOpen) return
    setIsConfirmingDelete(false)
    onClose()
  }

  return (
    <Sheet open={record !== null} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-xl">
        {record && (
          <>
            <SheetHeader className="border-b bg-background-subtle pr-14">
              <p className="font-display text-sm font-semibold text-accent">{record.referenceId}</p>
              <SheetTitle className="font-display text-2xl font-bold text-primary-900">{record.studentName}</SheetTitle>
              <SheetDescription>
                Class {record.classApplying}
                {record.stream && ` · ${record.stream}`} · Submitted {formatIndianDateTime(record.submittedAt)}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6 p-5">
              <div className="grid gap-4 rounded-lg border bg-card p-4 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="space-y-1.5">
                  <Label htmlFor="application-status">Application status</Label>
                  <NativeSelect
                    id="application-status"
                    value={record.status}
                    onChange={(event) => onStatusChange(record, event.target.value as AdmissionStatus)}
                  >
                    {admissionStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </NativeSelect>
                </div>
                <span
                  className={cn(
                    'justify-self-start rounded-full px-3 py-1 text-sm font-semibold ring-1',
                    admissionStatusClasses[record.status],
                  )}
                >
                  {record.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={`tel:+91${record.mobile}`}>
                    <Phone />
                    Call parent
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={`https://wa.me/91${record.mobile}`} target="_blank" rel="noopener noreferrer">
                    <SocialIcon platform="whatsapp" className="size-4" />
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${record.email}`}>
                    <Mail />
                    Email
                  </a>
                </Button>
              </div>

              <DetailGroup
                title="Student"
                details={[
                  ['Full name', record.studentName],
                  ['Date of birth', formatIndianDate(record.dateOfBirth)],
                  ['Gender', record.gender],
                  ['Class applying for', `Class ${record.classApplying}`],
                  ['Stream', record.stream],
                ]}
              />
              <DetailGroup
                title="Previous school"
                details={[
                  ['School', record.previousSchool],
                  ['Board', record.previousBoard],
                  ['Percentage', record.previousPercentage ? `${record.previousPercentage}%` : undefined],
                ]}
              />
              <DetailGroup
                title="Parent / guardian"
                details={[
                  ['Name', record.parentName],
                  ['Relationship', record.relationship],
                  ['Mobile', `+91 ${record.mobile.slice(0, 5)} ${record.mobile.slice(5)}`],
                  ['Email', record.email],
                ]}
              />
              <DetailGroup
                title="Address"
                details={[
                  ['Address', record.address],
                  ['City', record.city],
                  ['State', record.state],
                  ['PIN code', record.pincode],
                ]}
              />

              <div className="rounded-lg border border-destructive/30 p-4">
                {isConfirmingDelete ? (
                  <div className="space-y-3">
                    <p className="font-medium">Delete this application permanently?</p>
                    <div className="flex gap-2">
                      <Button type="button" variant="destructive" size="sm" onClick={() => onDelete(record)}>
                        Yes, delete
                      </Button>
                      <Button type="button" variant="outline" size="sm" onClick={() => setIsConfirmingDelete(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => setIsConfirmingDelete(true)}
                  >
                    <Trash2 />
                    Delete application
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
