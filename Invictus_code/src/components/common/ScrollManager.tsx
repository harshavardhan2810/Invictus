import { useEffect } from 'react'
import { useLocation } from 'react-router'

// React Router doesn't handle in-page anchors or reset scroll between pages,
// so `/#faculty`-style links scroll to their section and new pages start at the top.
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
