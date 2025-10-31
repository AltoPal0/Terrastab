import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRiskMobileOpen, setIsRiskMobileOpen] = useState(false)
  const [isRiskDesktopOpen, setIsRiskDesktopOpen] = useState(false)
  const closeTimerRef = useRef<number | null>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleRiskMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIsRiskDesktopOpen(true)
  }

  const handleRiskMouseLeave = () => {
    closeTimerRef.current = window.setTimeout(() => {
      setIsRiskDesktopOpen(false)
    }, 150)
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('top')}
              className="flex items-center"
            >
              <img
                src="/logo_terrastab.svg"
                alt="Terrastab Logo"
                className="h-12 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <button
              onClick={() => scrollToSection('top')}
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Accueil
            </button>
            <a
              href="/offres"
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Nos Offres
            </a>
            <div
              className="relative"
              onMouseEnter={handleRiskMouseEnter}
              onMouseLeave={handleRiskMouseLeave}
            >
              <button
                className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
              >
                Comprendre le risque
              </button>
              {isRiskDesktopOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg border rounded-md py-2 w-72">
                  <a href="/maison-fissuree" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Maison fissurée: causes et solutions</a>
                  <a href="/diagnostic-rga" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Diagnostic RGA</a>
                  <a href="/solution-stabilisation-sol-argileux" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Stabilisation des sols argileux</a>
                  <a href="/fissures-maison" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Fissures maison</a>
                  <a href="/zones-rga-france" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Zones RGA en France</a>
                </div>
              )}
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Contact
            </button>

            {/* Test Button */}
            {/* <Button
              onClick={handleTestAuth}
              disabled={isTestingAuth}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
            >
              <TestTube className="w-4 h-4" />
              {isTestingAuth ? 'Test...' : 'Test Devis'}
            </Button> */}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <button
                onClick={() => scrollToSection('top')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
              >
                Accueil
              </button>
              <a href="/offres" className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">
                Nos Offres
              </a>
              <button
                onClick={() => setIsRiskMobileOpen(prev => !prev)}
                className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
                aria-expanded={isRiskMobileOpen}
                aria-controls="mobile-risk-submenu"
              >
                <span>Comprendre le risque</span>
                <svg className={`w-4 h-4 transition-transform ${isRiskMobileOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {isRiskMobileOpen && (
                <div id="mobile-risk-submenu" className="ml-4 border-l pl-3 space-y-1">
                  <a href="/maison-fissuree" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Maison fissurée: causes et solutions</a>
                  <a href="/diagnostic-rga" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Diagnostic RGA</a>
                  <a href="/solution-stabilisation-sol-argileux" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Stabilisation des sols argileux</a>
                  <a href="/fissures-maison" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Fissures maison</a>
                  <a href="/zones-rga-france" onClick={() => setIsMenuOpen(false)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Zones RGA en France</a>
                </div>
              )}
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
              >
                Contact
              </button>

              {/* Test Button Mobile */}
              {/* <div className="px-3 py-2">
                <Button
                  onClick={handleTestAuth}
                  disabled={isTestingAuth}
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center gap-2 border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                >
                  <TestTube className="w-4 h-4" />
                  {isTestingAuth ? 'Test...' : 'Test Devis'}
                </Button>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header