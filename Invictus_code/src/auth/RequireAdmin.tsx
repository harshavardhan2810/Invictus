import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

import { ADMIN_LOGIN_PATH } from './adminRoutes'
import { useAuth } from './useAuth'

// Client-side guard only — it hides the admin UI, but real protection must come from the API.
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth()
  const location = useLocation()

  if (!isAdmin) {
    return <Navigate to={ADMIN_LOGIN_PATH} replace state={{ from: location.pathname }} />
  }
  return children
}
