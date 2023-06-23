import { useEffect } from 'react'

export default function useDebounceEffect (
  fn: () => void,
  waitTime: number,
  deps: React.DependencyList | undefined
): void {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, deps)
}
