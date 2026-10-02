import { useCallback, useEffect, useState } from 'react'

import { getAdmissionApplications, subscribeToAdmissionChanges, type AdmissionRecord } from '@/api/admissions'
import { getApiErrorMessage } from '@/api/errors'

type LoadState = 'loading' | 'ready' | 'error'

export function useAdmissionApplications() {
  const [records, setRecords] = useState<AdmissionRecord[]>([])
  const [loadState, setLoadState] = useState<LoadState>('loading')
  const [loadError, setLoadError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    try {
      setRecords(await getAdmissionApplications())
      setLoadState('ready')
      setLoadError(null)
    } catch (error) {
      setLoadError(getApiErrorMessage(error))
      setLoadState('error')
    }
  }, [])

  useEffect(() => {
    void reload()
    // Picks up applications submitted in another tab while the admin page is open.
    return subscribeToAdmissionChanges(() => void reload())
  }, [reload])

  return { records, loadState, loadError, reload }
}
