import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { App } from './App.tsx'
import { applyTemplate, readInitialTemplateId } from './templates/applyTemplate'

const initialTemplateId = readInitialTemplateId()
applyTemplate(initialTemplateId)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App initialTemplateId={initialTemplateId} />
  </StrictMode>,
)
