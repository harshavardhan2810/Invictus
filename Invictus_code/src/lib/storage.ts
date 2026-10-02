// Browser storage can be unavailable (private mode, blocked site data, quota),
// so every access is guarded and falls back gracefully.

type StorageKind = 'local' | 'session'

function getStorage(kind: StorageKind): Storage | null {
  try {
    return kind === 'local' ? window.localStorage : window.sessionStorage
  } catch {
    return null
  }
}

export function readStoredValue(kind: StorageKind, key: string): string | null {
  try {
    return getStorage(kind)?.getItem(key) ?? null
  } catch {
    return null
  }
}

export function readStoredJson<T>(kind: StorageKind, key: string, fallback: T): T {
  const rawValue = readStoredValue(kind, key)
  if (rawValue === null) return fallback
  try {
    return JSON.parse(rawValue) as T
  } catch {
    return fallback
  }
}

/** Returns false when the value could not be stored. */
export function writeStoredJson(kind: StorageKind, key: string, value: unknown): boolean {
  try {
    const storage = getStorage(kind)
    if (!storage) return false
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function removeStoredValue(kind: StorageKind, key: string) {
  try {
    getStorage(kind)?.removeItem(key)
  } catch {
    // Nothing to clean up if storage is unavailable.
  }
}
