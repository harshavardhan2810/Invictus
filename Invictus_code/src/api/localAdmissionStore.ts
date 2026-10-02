import { readStoredJson, writeStoredJson } from '@/lib/storage'
import type { AdmissionApplication, AdmissionRecord, AdmissionStatus } from './admissions'

// Demo persistence used while no backend is configured. Data lives only in this
// browser's localStorage, so it is visible only on the device where it was entered.
const STORAGE_KEY = 'invictus.admissionApplications'
const CHANGE_EVENT = 'invictus:admissions-changed'

function readRecords(): AdmissionRecord[] {
  const records = readStoredJson<unknown>('local', STORAGE_KEY, [])
  return Array.isArray(records) ? (records as AdmissionRecord[]) : []
}

function writeRecords(records: AdmissionRecord[]) {
  if (!writeStoredJson('local', STORAGE_KEY, records)) {
    throw new Error('Could not save the application in this browser. Storage may be full or disabled.')
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function createReferenceId(records: AdmissionRecord[]) {
  const yearSuffix = String(new Date().getFullYear() + 1).slice(-2)
  const highestSequence = records.reduce((highest, record) => {
    const sequence = Number(record.referenceId.split('-').at(-1))
    return Number.isFinite(sequence) ? Math.max(highest, sequence) : highest
  }, 0)
  return `INV-${yearSuffix}-${String(highestSequence + 1).padStart(5, '0')}`
}

export function listLocalApplications() {
  return readRecords().sort((first, second) => second.submittedAt.localeCompare(first.submittedAt))
}

export function saveLocalApplication(application: AdmissionApplication): AdmissionRecord {
  const records = readRecords()
  const record: AdmissionRecord = {
    ...application,
    // randomUUID only exists in secure contexts (HTTPS / localhost), e.g. not on a LAN IP.
    id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    referenceId: createReferenceId(records),
    submittedAt: new Date().toISOString(),
    status: 'New',
  }
  writeRecords([...records, record])
  return record
}

export function updateLocalApplicationStatus(applicationId: string, status: AdmissionStatus) {
  writeRecords(readRecords().map((record) => (record.id === applicationId ? { ...record, status } : record)))
}

export function deleteLocalApplication(applicationId: string) {
  writeRecords(readRecords().filter((record) => record.id !== applicationId))
}

/** Calls `onChange` when applications change in this tab or another tab. */
export function subscribeToLocalApplications(onChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onChange()
  }
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', handleStorage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', handleStorage)
  }
}
