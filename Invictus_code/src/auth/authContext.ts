import { createContext } from 'react'

export interface AdminSession {
  username: string
  loggedInAt: string
}

export interface AuthContextValue {
  adminSession: AdminSession | null
  login: (username: string, password: string) => boolean
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
