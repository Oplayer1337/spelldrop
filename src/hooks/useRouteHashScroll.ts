import { useEffect } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia?.(reducedMotionQuery).matches ? 'auto' : 'smooth'
}

export function useRouteHashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash

      if (!hash) {
        return
      }

      let targetId: string

      try {
        targetId = decodeURIComponent(hash.slice(1))
      } catch {
        return
      }

      if (!targetId) {
        return
      }

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: getScrollBehavior(),
            block: 'start',
          })
        })
      })
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    window.addEventListener('popstate', scrollToHash)

    return () => {
      window.removeEventListener('hashchange', scrollToHash)
      window.removeEventListener('popstate', scrollToHash)
    }
  }, [])
}
