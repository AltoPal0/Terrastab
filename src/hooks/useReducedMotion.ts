import { useEffect, useState } from 'react'

/**
 * Hook to detect mobile devices and reduced motion preferences
 * Returns optimized animation settings for mobile devices
 * SSR-safe: animations are disabled on server to prevent hydration mismatches
 */
export const useReducedMotion = () => {
  // Detect if we're on the server
  const isServer = typeof window === 'undefined'

  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark that we're now on the client
    setIsClient(true)

    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // On server or before hydration: disable all animations to match SSR HTML
  const shouldReduceMotion = isMobile || prefersReducedMotion

  return {
    isMobile,
    prefersReducedMotion,
    shouldReduceMotion,
    // Optimized values for animations
    duration: shouldReduceMotion ? 0.3 : 0.8,
    delay: shouldReduceMotion ? 0 : 0.2,
    stagger: shouldReduceMotion ? 0 : 0.1,
    // Viewport settings
    viewport: {
      once: true,
      amount: shouldReduceMotion ? 0.05 : 0.3
    },
    // SSR-safe: use `false` on server to disable initial animation, preventing hydration mismatch
    // Once client-side, animations work normally
    initial: isServer || !isClient
      ? false
      : shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30 },
    // Animate state
    animate: { opacity: 1, y: 0 }
  }
}
