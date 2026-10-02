import { useState, type FormEvent } from 'react'
import { ArrowLeft, Eye, EyeOff, Info, LogIn } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router'

import { demoCredentials, isUsingDemoCredentials } from '@/auth/adminCredentials'
import { ADMIN_HOME_PATH } from '@/auth/adminRoutes'
import { useAuth } from '@/auth/useAuth'
import { JaaliPattern } from '@/components/common/JaaliPattern'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const DEFAULT_ADMIN_PATH = ADMIN_HOME_PATH

export function AdminLoginPage() {
  const { isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const requestedPath = (location.state as { from?: string } | null)?.from ?? DEFAULT_ADMIN_PATH

  if (isAdmin) return <Navigate to={requestedPath} replace />

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!username.trim() || !password) {
      setLoginError('Please enter both username and password.')
      return
    }
    if (!login(username, password)) {
      setLoginError('Invalid username or password.')
      return
    }
    navigate(requestedPath, { replace: true })
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="relative isolate hidden flex-col justify-between overflow-hidden bg-primary-950 p-12 text-white lg:flex">
        <JaaliPattern className="-z-10 text-white/[0.06]" />
        <Logo tone="light" size="large" showMotto />
        <div>
          <h1 className="font-display text-4xl font-bold">Admin Panel</h1>
          <p className="mt-4 max-w-md text-lg text-white/75">
            Review admission requests, update their status and export them for the admissions office.
          </p>
        </div>
        <p className="text-sm text-white/50">Authorised school staff only.</p>
      </div>

      <div className="flex flex-col justify-center bg-background-subtle px-5 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="size-4" />
            Back to website
          </Link>
          <div className="mt-8 lg:hidden">
            <Logo />
          </div>
          <h2 className="mt-8 font-display text-3xl font-bold text-primary-900">Admin login</h2>
          <p className="mt-2 text-muted-foreground">Sign in to view admission requests.</p>

          <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                autoComplete="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                aria-invalid={loginError ? true : undefined}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-invalid={loginError ? true : undefined}
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
                >
                  {isPasswordVisible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm font-medium text-destructive">
                {loginError}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full">
              <LogIn />
              Sign in
            </Button>
          </form>

          {isUsingDemoCredentials && (
            <p className="mt-6 flex gap-2 rounded-md border border-secondary-200 bg-secondary-50 p-3 text-sm">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-secondary-700" />
              <span>
                Demo login — username <strong>{demoCredentials.username}</strong>, password{' '}
                <strong>{demoCredentials.password}</strong>. Set VITE_ADMIN_USERNAME / VITE_ADMIN_PASSWORD to change
                it, and use a backend login before going live.
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
