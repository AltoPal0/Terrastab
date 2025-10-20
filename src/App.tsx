import { useEffect } from 'react'
import { Router, Route } from 'wouter'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MiniPromise from '@/components/MiniPromise'
import RiskAssessmentSection from '@/components/RiskAssessmentSection'
import ExpertQuotes from '@/components/ExpertQuotes'
import TechSection from '@/components/TechSection'
import TrustLogos from '@/components/TrustLogos'
import UrgencySection from '@/components/UrgencySection'
import FAQSection from '@/components/FAQSection'
import SecondCTA from '@/components/SecondCTA'
import Footer from '@/components/Footer'
import AdminApp from '@/components/admin/AdminApp'
import { CustomerJourneyProvider } from '@/contexts/CustomerJourneyContext'
import { supabase } from '@/lib/supabase'
import { quoteApi } from '@/lib/quote-api'

function HomePageContent() {
  // Customer Journey is disabled in this version - using LeadCaptureForm instead

  // Gérer le callback après authentification Google
  useEffect(() => {
    const handleAuthCallback = async () => {
      // Vérifier si l'utilisateur vient de se connecter
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        // Récupérer les données du devis en attente
        const pendingQuoteData = localStorage.getItem('pending_quote_save')

        if (pendingQuoteData) {
          try {
            const { result_id } = JSON.parse(pendingQuoteData)

            // Appeler l'Edge Function pour sauvegarder le devis
            const response = await quoteApi.saveQuote({
              auth_user_id: session.user.id,
              result_id: result_id,
              user_email: session.user.email
            })

            if (response.success) {
              console.log('Quote saved successfully:', response.quote_id)
              // Nettoyer le localStorage
              localStorage.removeItem('pending_quote_save')

              // Stocker le message de succès pour l'afficher
              localStorage.setItem('quote_save_message', response.message || '✅ Votre devis a été enregistré.')
            }
          } catch (error) {
            console.error('Error saving quote after auth:', error)
            localStorage.setItem('quote_save_error', 'Erreur lors de la sauvegarde du devis.')
          }
        }
      }
    }

    handleAuthCallback()

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        handleAuthCallback()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      {/* Full Landing Page - Always visible */}
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20">
          {/* Section 1: Hero avec CTA principal */}
          <HeroSection />

          {/* Section 2: Mini-promesse TerraStab */}
          <MiniPromise />

          {/* Section 3: Vérification du risque avec formulaire de leads */}
          <RiskAssessmentSection />

          {/* Section 4: Avis d'experts */}
          {/* <ExpertQuotes /> */}

          {/* Section 4: Technologie */}
          <TechSection />

          {/* Section 5: Soutiens institutionnels */}
          <TrustLogos />

          {/* Section 6: Pourquoi agir maintenant */}
          <UrgencySection />

          {/* Section 7: FAQ & Garanties */}
          <FAQSection />

          {/* Section 8: Second CTA */}
          <SecondCTA />
        </main>
        <Footer />
      </div>

      {/* Customer Journey Overlay - DISABLED: Replaced by LeadCaptureForm */}
      {/* {state.currentStep !== 'idle' && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => actions.resetJourney()}
          />
          <div className="relative min-h-screen flex items-center justify-center p-px md:p-4">
            <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => actions.resetJourney()}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-2 md:p-8">
                <CustomerJourney />
              </div>
            </div>
          </div>
        </div>
      )} */}
    </>
  )
}

function HomePage() {
  return (
    <CustomerJourneyProvider>
      <HomePageContent />
    </CustomerJourneyProvider>
  )
}

function App() {
  return (
    <>
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/admin" component={AdminApp} />
      </Router>
      <Analytics />
    </>
  )
}

export default App
