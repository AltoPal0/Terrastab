import { Router, Route } from 'wouter'
import { Analytics } from '@vercel/analytics/react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MiniPromise from '@/components/MiniPromise'
import ExpertQuotes from '@/components/ExpertQuotes'
import TechSection from '@/components/TechSection'
import TrustLogos from '@/components/TrustLogos'
import UrgencySection from '@/components/UrgencySection'
import FAQSection from '@/components/FAQSection'
import SecondCTA from '@/components/SecondCTA'
import Footer from '@/components/Footer'
import AdminApp from '@/components/admin/AdminApp'
import { CustomerJourneyProvider, useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import CustomerJourney from '@/components/customer-journey/CustomerJourney'

function HomePageContent() {
  const { state, actions } = useCustomerJourney()

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

          {/* Section 3: Avis d'experts */}
          <ExpertQuotes />

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

      {/* Customer Journey Overlay */}
      {state.currentStep !== 'idle' && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => actions.resetJourney()}
          />

          {/* Modal Content */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => actions.resetJourney()}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Customer Journey Content */}
              <div className="p-6 md:p-8">
                <CustomerJourney />
              </div>
            </div>
          </div>
        </div>
      )}
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
