import { createBrowserRouter, Navigate } from 'react-router'

import { ADMIN_LOGIN_PATH } from '@/auth/adminRoutes'
import { PageLoader } from '@/components/common/PageLoader'
import { PublicLayout } from '@/layouts/PublicLayout'
import { ComingSoon } from '@/pages/ComingSoon/ComingSoon'
import { TemplateHome } from '@/templates/TemplateHome'
import { NotFound } from '@/pages/NotFound/NotFound'

// The home page (both templates) is bundled up front; every other page is code-split and loaded on first visit.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      { index: true, element: <TemplateHome /> },

      {
        path: 'programs',
        lazy: async () => ({ Component: (await import('@/pages/Programs/ProgramsPage')).ProgramsPage }),
      },
      {
        path: 'programs/:programSlug',
        lazy: async () => ({ Component: (await import('@/pages/Programs/ProgramDetailPage')).ProgramDetailPage }),
      },

      {
        path: 'admissions',
        lazy: async () => ({ Component: (await import('@/pages/Admissions/AdmissionsPage')).AdmissionsPage }),
      },
      {
        path: 'admissions/apply',
        lazy: async () => ({ Component: (await import('@/pages/AdmissionForm/AdmissionFormPage')).AdmissionFormPage }),
      },
      { path: 'admissions/fees', element: <ComingSoon title="Fee Structure" /> },

      { path: 'downloads', element: <Navigate to="/downloads/exam-papers" replace /> },
      // `key` resets the filters when switching between the two catalogues.
      {
        path: 'downloads/exam-papers',
        lazy: async () => {
          const { PapersPage } = await import('@/pages/Downloads/PapersPage')
          return { element: <PapersPage key="exam" category="exam" /> }
        },
      },
      {
        path: 'downloads/competitive-papers',
        lazy: async () => {
          const { PapersPage } = await import('@/pages/Downloads/PapersPage')
          return { element: <PapersPage key="competitive" category="competitive" /> }
        },
      },
      { path: 'downloads/syllabus', element: <ComingSoon title="Syllabus" /> },

      {
        path: 'activities',
        lazy: async () => ({ Component: (await import('@/pages/Activities/ActivitiesPage')).ActivitiesPage }),
      },
      {
        path: 'activities/:activitySlug',
        lazy: async () => ({ Component: (await import('@/pages/Activities/ActivityDetailPage')).ActivityDetailPage }),
      },

      { path: 'gallery', element: <ComingSoon title="Gallery" /> },
      { path: '*', element: <NotFound /> },
    ],
  },

  // Admin area: its own layout and guard, loaded only when visited. Student and
  // faculty portals can be added as further branches alongside it.
  {
    path: ADMIN_LOGIN_PATH,
    hydrateFallbackElement: <PageLoader />,
    lazy: async () => ({ Component: (await import('@/pages/Admin/AdminLoginPage')).AdminLoginPage }),
  },
  {
    path: '/admin',
    hydrateFallbackElement: <PageLoader />,
    lazy: async () => {
      const [{ RequireAdmin }, { AdminLayout }] = await Promise.all([
        import('@/auth/RequireAdmin'),
        import('@/layouts/AdminLayout'),
      ])
      return {
        element: (
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        ),
      }
    },
    children: [
      { index: true, element: <Navigate to="/admin/admissions" replace /> },
      {
        path: 'admissions',
        lazy: async () => ({ Component: (await import('@/pages/Admin/AdmissionRequestsPage')).AdmissionRequestsPage }),
      },
    ],
  },
])
