import { Router, Route } from 'wouter'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import RiskAssessmentSection from '@/components/RiskAssessmentSection'
import ProductCardsSection from '@/components/ProductCardsSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import QuoteSection from '@/components/QuoteSection'
import Footer from '@/components/Footer'
import AdminApp from '@/components/admin/AdminApp'

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <HeroSection />
        <RiskAssessmentSection />
        <ProductCardsSection />
        <HowItWorksSection />
        <QuoteSection />
      </main>
      <Footer />
    </div>
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
