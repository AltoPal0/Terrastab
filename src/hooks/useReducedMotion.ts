import { useEffect, useState } from 'react'

/**
 * Hook to detect mobile devices and reduced motion preferences
 * Returns optimized animation settings for mobile devices
 */
export const useReducedMotion = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
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

  // Return optimized animation config
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
    // Initial state - no opacity change on mobile for faster rendering
    initial: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 30 },
    // Animate state
    animate: { opacity: 1, y: 0 }
  }
}
