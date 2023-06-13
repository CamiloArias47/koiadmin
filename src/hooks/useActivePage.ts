import { useLocation } from 'react-router-dom'

interface useActivePageType {
  isActive: (pagename: string) => boolean
}

export default function useActivePage (): useActivePageType {
  const location = useLocation()
  const { pathname } = location

  const isActive = (pagename: string): boolean => {
    return pathname === pagename
  }

  return { isActive }
}
