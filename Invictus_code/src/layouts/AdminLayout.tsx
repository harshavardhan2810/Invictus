import { ExternalLink, LogOut, UserRound } from 'lucide-react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router'

import { ADMIN_LOGIN_PATH } from '@/auth/adminRoutes'
import { useAuth } from '@/auth/useAuth'
import { Container } from '@/components/common/Container'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const adminNavigation = [{ label: 'Admission Requests', href: '/admin/admissions' }]

// Separate shell for the admin area — the start of the future school portal.
export function AdminLayout() {
  const { adminSession, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate(ADMIN_LOGIN_PATH, { replace: true })
  }

  return (
    <div className="flex min-h-svh flex-col bg-muted">
      <header className="bg-primary-950 text-white">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/admin/admissions" aria-label="Admin home">
              <Logo tone="light" />
            </Link>
            <span className="hidden rounded-sm bg-secondary px-2 py-0.5 font-display text-xs font-bold tracking-wider text-secondary-foreground uppercase sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/"
              className="hidden items-center gap-1.5 text-sm text-primary-100 hover:text-white md:inline-flex"
            >
              <ExternalLink className="size-4" />
              View website
            </Link>
            <span className="hidden items-center gap-1.5 text-sm text-primary-100 sm:inline-flex">
              <UserRound className="size-4" />
              {adminSession?.username}
            </span>
            <Button type="button" variant="outline-light" size="sm" onClick={handleLogout}>
              <LogOut />
              Logout
            </Button>
          </div>
        </Container>
        <nav aria-label="Admin" className="border-t border-white/10">
          <Container className="flex gap-1">
            {adminNavigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'border-b-4 px-3 py-2.5 font-display text-sm font-semibold transition-colors',
                    isActive ? 'border-secondary text-white' : 'border-transparent text-primary-200 hover:text-white',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </Container>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
