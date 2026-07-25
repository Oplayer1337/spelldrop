import { useEffect, useRef, useState } from 'react'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.(reducedMotionQuery).matches
}

export function useFirstViewportReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isRevealed, setIsRevealed] = useState(
    () => typeof window === 'undefined' || prefersReducedMotion(),
  )

  useEffect(() => {
    if (isRevealed) {
      return
    }

    const element = ref.current

    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [isRevealed])

  return { ref, isRevealed }
}
