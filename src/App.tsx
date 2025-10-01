import { Router, Route } from 'wouter'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import MiniPromise from '@/components/MiniPromise'
import ExpertQuotes from '@/components/ExpertQuotes'
import TechSection from '@/components/TechSection'
import TrustLogos from '@/components/TrustLogos'
import UrgencySection from '@/components/UrgencySection'
import RiskAssessmentSection from '@/components/RiskAssessmentSection'
import FAQSection from '@/components/FAQSection'
import SecondCTA from '@/components/SecondCTA'
import Footer from '@/components/Footer'
import AdminApp from '@/components/admin/AdminApp'
import { CustomerJourneyProvider, useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import CustomerJourney from '@/components/customer-journey/CustomerJourney'

function HomePageContent() {
  const { state } = useCustomerJourney()

  // If customer journey is started, show only the customer journey
  if (state.currentStep !== 'idle') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <CustomerJourney />
        <Footer />
      </div>
    )
  }

  // Otherwise show the full landing page
  return (
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

        {/* Section vérification du risque (préservée) */}
        <RiskAssessmentSection />

        {/* Section 7: FAQ & Garanties */}
        <FAQSection />

        {/* Section 8: Second CTA */}
        <SecondCTA />
      </main>
      <Footer />
    </div>
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
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/admin" component={AdminApp} />
    </Router>
  )
}

export default App
