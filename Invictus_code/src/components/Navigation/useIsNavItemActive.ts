import { useLocation } from 'react-router'

// Matches on hash as well as path, so "/" and "/#about" aren't both highlighted.
export function useIsNavItemActive() {
  const { pathname, hash } = useLocation()

  return (href: string) => {
    const [itemPath, itemHash] = href.split('#')
    if (itemPath !== pathname) return false
    return itemHash ? hash === `#${itemHash}` : !hash
  }
}
