import { RouterProvider } from 'react-router'

import { AuthProvider } from './auth/AuthProvider'
import { router } from './router'
import { TemplateProvider } from './templates/TemplateProvider'
import type { TemplateId } from './templates/templates'

export function App({ initialTemplateId }: { initialTemplateId: TemplateId }) {
  return (
    <TemplateProvider initialTemplateId={initialTemplateId}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </TemplateProvider>
  )
}
