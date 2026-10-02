import { useState } from 'react'
import { ChevronRight, Download, Inbox, Info, RefreshCw, Search, X } from 'lucide-react'
import { Link } from 'react-router'

import {
  admissionStatuses,
  deleteAdmissionApplication,
  updateAdmissionStatus,
  type AdmissionRecord,
  type AdmissionStatus,
} from '@/api/admissions'
import { getApiErrorMessage } from '@/api/errors'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { NativeSelect } from '@/components/ui/native-select'
import { programs } from '@/data/programs'
import { siteConfig } from '@/data/site'
import { isApiConfigured } from '@/lib/axios'
import { formatIndianDateTime, formatIndianNumber } from '@/lib/format'
import { cn } from '@/lib/utils'
import { AdmissionDetailsSheet } from './AdmissionDetailsSheet'
import { admissionStatusClasses } from './admissionStatusStyles'
import { downloadAdmissionsCsv } from './exportAdmissionsCsv'
import { useAdmissionApplications } from './useAdmissionApplications'

const summaryStatuses: AdmissionStatus[] = ['New', 'Test Scheduled', 'Admitted']

function StatusBadge({ status }: { status: AdmissionStatus }) {
  return (
    <span className={cn('inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ring-1', admissionStatusClasses[status])}>
      {status}
    </span>
  )
}

function formatClass(record: AdmissionRecord) {
  return record.stream ? `Class ${record.classApplying} · ${record.stream}` : `Class ${record.classApplying}`
}

export function AdmissionRequestsPage() {
  const { records, loadState, loadError, reload } = useAdmissionApplications()
  const [searchText, setSearchText] = useState('')
  const [classFilter, setClassFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const normalisedSearch = searchText.trim().toLowerCase()
  const visibleRecords = records
    .filter((record) => !classFilter || record.classApplying === classFilter)
    .filter((record) => !statusFilter || record.status === statusFilter)
    .filter(
      (record) =>
        !normalisedSearch ||
        [record.studentName, record.parentName, record.referenceId, record.mobile, record.email].some((value) =>
          value.toLowerCase().includes(normalisedSearch),
        ),
    )
  const selectedRecord = records.find((record) => record.id === selectedRecordId) ?? null
  const hasActiveFilters = Boolean(searchText || classFilter || statusFilter)

  async function handleStatusChange(record: AdmissionRecord, status: AdmissionStatus) {
    setActionError(null)
    try {
      await updateAdmissionStatus(record.id, status)
      await reload()
    } catch (error) {
      setActionError(getApiErrorMessage(error))
    }
  }

  async function handleDelete(record: AdmissionRecord) {
    setActionError(null)
    try {
      await deleteAdmissionApplication(record.id)
      setSelectedRecordId(null)
      await reload()
    } catch (error) {
      setActionError(getApiErrorMessage(error))
    }
  }

  function clearFilters() {
    setSearchText('')
    setClassFilter('')
    setStatusFilter('')
  }

  return (
    <Container className="space-y-6 py-8 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary-900 sm:text-3xl">Admission Requests</h1>
          <p className="mt-1 text-muted-foreground">
            Applications submitted through the website for {siteConfig.academicYear}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => void reload()}>
            <RefreshCw />
            Refresh
          </Button>
          <Button type="button" onClick={() => downloadAdmissionsCsv(visibleRecords)} disabled={visibleRecords.length === 0}>
            <Download />
            Export CSV
          </Button>
        </div>
      </div>

      {!isApiConfigured && (
        <p className="flex items-start gap-2 rounded-lg border border-secondary-200 bg-secondary-50 p-3 text-sm">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-secondary-700" />
          Demo mode: applications are read from this browser’s local storage, so only applications submitted on this
          device appear here. Connect a backend (VITE_API_BASE_URL) to see every applicant.
        </p>
      )}

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: 'Total applications', count: records.length },
          ...summaryStatuses.map((status) => ({
            label: status,
            count: records.filter((record) => record.status === status).length,
          })),
        ].map((summary) => (
          <div key={summary.label} className="flex flex-col-reverse rounded-lg border bg-card p-4 shadow-xs">
            <dt className="text-sm text-muted-foreground">{summary.label}</dt>
            <dd className="font-display text-3xl font-bold text-primary-900">{formatIndianNumber(summary.count)}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-4 rounded-lg border bg-card p-4 shadow-xs sm:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-1.5">
          <Label htmlFor="request-search">Search</Label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="request-search"
              type="search"
              placeholder="Name, reference no., mobile or email"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="request-class">Class</Label>
          <NativeSelect id="request-class" value={classFilter} onChange={(event) => setClassFilter(event.target.value)}>
            <option value="">All classes</option>
            {programs.map((program) => (
              <option key={program.slug} value={String(program.grade)}>
                {program.title}
              </option>
            ))}
          </NativeSelect>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="request-status">Status</Label>
          <NativeSelect id="request-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="">All statuses</option>
            {admissionStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </NativeSelect>
        </div>
      </div>

      {(loadError || actionError) && (
        <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-3 font-medium text-destructive">
          {actionError ?? loadError}
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-muted-foreground">
          Showing <strong className="text-foreground">{visibleRecords.length}</strong> of {records.length}
        </p>
        {hasActiveFilters && (
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
            <X />
            Clear filters
          </Button>
        )}
      </div>

      {loadState === 'loading' ? (
        <p className="rounded-lg border bg-card p-10 text-center text-muted-foreground">Loading applications…</p>
      ) : visibleRecords.length === 0 ? (
        <div className="rounded-lg border border-dashed bg-card p-12 text-center">
          <Inbox aria-hidden className="mx-auto size-10 text-muted-foreground" />
          <p className="mt-3 font-display text-lg font-semibold text-primary-900">
            {records.length === 0 ? 'No applications yet' : 'No applications match your filters'}
          </p>
          {records.length === 0 ? (
            <Button asChild variant="link">
              <Link to="/admissions/apply">Open the admission form</Link>
            </Button>
          ) : (
            <Button type="button" variant="link" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-lg border bg-card shadow-xs md:block">
            <table className="w-full text-left text-[15px]">
              <thead className="bg-primary font-display text-sm text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Reference No.</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Student</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Parent &amp; mobile</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Submitted</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {visibleRecords.map((record) => (
                  <tr key={record.id} className="align-top hover:bg-background-subtle">
                    <td className="px-4 py-3 font-display font-semibold whitespace-nowrap text-accent">{record.referenceId}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-primary-900">{record.studentName}</p>
                      <p className="text-sm text-muted-foreground">{formatClass(record)}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p>{record.parentName}</p>
                      <p className="text-sm text-muted-foreground">+91 {record.mobile}</p>
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap text-muted-foreground">
                      {formatIndianDateTime(record.submittedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button type="button" variant="outline" size="sm" onClick={() => setSelectedRecordId(record.id)}>
                        View
                        <span className="sr-only">application of {record.studentName}</span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="space-y-3 md:hidden">
            {visibleRecords.map((record) => (
              <li key={record.id}>
                <button
                  type="button"
                  onClick={() => setSelectedRecordId(record.id)}
                  className="flex w-full items-center gap-3 rounded-lg border bg-card p-4 text-left shadow-xs"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-accent">{record.referenceId}</span>
                      <StatusBadge status={record.status} />
                    </span>
                    <span className="mt-1 block font-semibold text-primary-900">{record.studentName}</span>
                    <span className="block text-sm text-muted-foreground">
                      {formatClass(record)} · {formatIndianDateTime(record.submittedAt)}
                    </span>
                  </span>
                  <ChevronRight aria-hidden className="size-5 shrink-0 text-muted-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      <AdmissionDetailsSheet
        record={selectedRecord}
        onClose={() => setSelectedRecordId(null)}
        onStatusChange={(record, status) => void handleStatusChange(record, status)}
        onDelete={(record) => void handleDelete(record)}
      />
    </Container>
  )
}
