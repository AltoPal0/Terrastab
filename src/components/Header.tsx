import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                src="/logo_main_terrastab.png"
                alt="Terrastab Logo"
                className="h-12 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <button
              onClick={() => scrollToSection('top')}
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection('offres')}
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Nos Offres
            </button>
            <button
              onClick={() => scrollToSection('risque')}
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Comprendre le Risque
            </button>
            <button
              onClick={() => scrollToSection('devis')}
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Devis en ligne
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Contact
            </button>
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
              <button
                onClick={() => scrollToSection('offres')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
              >
                Nos Offres
              </button>
              <button
                onClick={() => scrollToSection('risque')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
              >
                Comprendre le Risque
              </button>
              <button
                onClick={() => scrollToSection('devis')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
              >
                Devis en ligne
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header