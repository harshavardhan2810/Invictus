import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { readStoredJson, removeStoredValue, writeStoredJson } from '@/lib/storage'
import { verifyAdminCredentials } from './adminCredentials'
import { AuthContext, type AdminSession } from './authContext'

// sessionStorage: the admin is signed out when the tab or browser closes.
const SESSION_KEY = 'invictus.adminSession'
const SESSION_LIFETIME_MS = 8 * 60 * 60 * 1000

function readValidSession() {
  const session = readStoredJson<AdminSession | null>('session', SESSION_KEY, null)
  if (!session?.loggedInAt) return null
  const isExpired = Date.now() - new Date(session.loggedInAt).getTime() > SESSION_LIFETIME_MS
  return isExpired ? null : session
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [adminSession, setAdminSession] = useState<AdminSession | null>(readValidSession)

  const login = useCallback((username: string, password: string) => {
    if (!verifyAdminCredentials(username, password)) return false
    const session: AdminSession = { username: username.trim(), loggedInAt: new Date().toISOString() }
    writeStoredJson('session', SESSION_KEY, session)
    setAdminSession(session)
    return true
  }, [])

  const logout = useCallback(() => {
    removeStoredValue('session', SESSION_KEY)
    setAdminSession(null)
  }, [])

  const contextValue = useMemo(() => ({ adminSession, login, logout }), [adminSession, login, logout])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
