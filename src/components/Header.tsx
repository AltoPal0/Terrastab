// @ts-nocheck - Contains test code for Customer Journey (disabled)
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, TestTube } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTestingAuth, setIsTestingAuth] = useState(false)
  const { actions } = useCustomerJourney()

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

  const handleTestAuth = async () => {
    setIsTestingAuth(true)

    try {
      // Créer un devis fake dans la base de données
      const fakeQuoteData = {
        risk_level: 'moyen',
        rule_set_version: 'v1.0',
        answers_json: {
          bloc00_housing_type: 'maison',
          bloc10_foundation_depth: '80cm',
        },
        nbr_sonde: 4,
        nbr_sonde_double: 2,
        nbr_controller: 1,
        nbr_piquet_irrigation: 8,
        devis_total: 2499.99,
        quote_id: `TEST-${Date.now()}`,
        address: '1 Rue de Test, 75001 Paris'
      }

      // Insérer le devis de test
      const { data: insertedQuote, error: insertError } = await supabase
        .from('results')
        .insert(fakeQuoteData)
        .select('id, quote_id, devis_total, nbr_sonde, nbr_sonde_double, nbr_controller, nbr_piquet_irrigation')
        .single()

      if (insertError) {
        console.error('Erreur lors de la création du devis test:', insertError)
        alert('Erreur lors de la création du devis test')
        setIsTestingAuth(false)
        return
      }

      console.log('Devis test créé:', insertedQuote.quote_id)

      // Mettre à jour le contexte avec le devis fake
      actions.setRiskResult({
        risk_level: 'Moyen',
        address: '1 Rue de Test, 75001 Paris',
        formatted_address: '1 Rue de Test, 75001 Paris'
      })

      actions.setQuote({
        quote_id: insertedQuote.quote_id,
        resultId: insertedQuote.id,
        riskLevel: 'Moyen',
        rule_set_version: 'v1.0',
        totalCost: insertedQuote.devis_total,
        numberOfSensors: insertedQuote.nbr_sonde + insertedQuote.nbr_sonde_double,
        numberOfControllers: insertedQuote.nbr_controller,
        numberOfIrrigationStakes: insertedQuote.nbr_piquet_irrigation,
        quantities: {
          nbr_sonde: insertedQuote.nbr_sonde,
          nbr_sonde_double: insertedQuote.nbr_sonde_double,
          nbr_controller: insertedQuote.nbr_controller,
          nbr_piquet_irrigation: insertedQuote.nbr_piquet_irrigation
        },
        pricing: {
          sonde: 250,
          sonde_double: 350,
          piquet_irrigation: 50,
          controller: 499
        }
      })

      // Aller directement à l'étape quote (affichage du devis)
      actions.setStep('quote')

      // Déclencher l'ouverture du modal après un court délai
      setTimeout(() => {
        const saveButton = document.querySelector('[data-save-quote-button]') as HTMLButtonElement
        if (saveButton) {
          saveButton.click()
        }
      }, 500)

    } catch (error) {
      console.error('Erreur inattendue:', error)
      alert('Erreur inattendue')
    } finally {
      setIsTestingAuth(false)
    }
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
            <button
              onClick={() => scrollToSection('offres')}
              className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
            >
              Nos Offres
            </button>
            <div className="relative group">
              <button
                className="text-gray-700 hover:text-blue-600 px-1 py-2 text-base font-medium transition-colors"
              >
                Comprendre le risque
              </button>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-lg border rounded-md py-2 w-72">
                <a href="/maison-fissuree" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Maison fissurée: causes et solutions</a>
                <a href="/diagnostic-rga" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Diagnostic RGA</a>
                <a href="/solution-stabilisation-sol-argileux" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Stabilisation des sols argileux</a>
                <a href="/fissures-maison" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Fissures maison</a>
                <a href="/zones-rga-france" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Zones RGA en France</a>
              </div>
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
              <button
                onClick={() => scrollToSection('offres')}
                className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50"
              >
                Nos Offres
              </button>
              <div className="px-3 py-2 text-sm font-semibold text-gray-500">Comprendre le risque</div>
              <a href="/maison-fissuree" className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Maison fissurée: causes et solutions</a>
              <a href="/diagnostic-rga" className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Diagnostic RGA</a>
              <a href="/solution-stabilisation-sol-argileux" className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Stabilisation des sols argileux</a>
              <a href="/fissures-maison" className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Fissures maison</a>
              <a href="/zones-rga-france" className="block w-full text-left px-3 py-2 text-base font-medium text-gray-900 hover:text-blue-600 hover:bg-gray-50">Zones RGA en France</a>
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