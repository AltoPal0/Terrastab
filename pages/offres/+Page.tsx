import React from 'react'
import { Button } from '../../src/components/ui/button'
import RiskAssessmentSection from '../../src/components/RiskAssessmentSection'
import { Check } from 'lucide-react'
import { Helmet } from "@dr.pogodin/react-helmet";

type Offer = {
  id: 'survey-light' | 'survey-plus' | 'shield'
  name: string
  price: number
  description: string
  features: string[]
  colors: {
    primary: string
    text: string
    cardBg: string
    border: string
    button: string
  }
}

const offers: Offer[] = [
  {
    id: 'survey-light',
    name: 'SURVEY Light',
    price: 400,
    description:
      "Surveillance en continu grâce à 1 à 2 sondes propriétaires installées sur votre terrain. Idéal pour une surveillance préventive.",
    features: [
      'Surveillance en continu',
      "Analyse jusqu'à 1m20",
      'Suivi météo et climat',
      'Extension possible avec sondes additionnelles'
    ],
    colors: {
      primary: 'bg-amber-100',
      text: 'text-amber-900',
      cardBg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      border: 'border-amber-300',
      button: 'bg-amber-600 hover:bg-amber-700'
    }
  },
  {
    id: 'survey-plus',
    name: 'SURVEY+',
    price: 800,
    description:
      "Un réseau de sondes propriétaires en périphérie du bâtiment pour une vision complète. Surveillance globale et préventive.",
    features: [
      'Réseau de sondes autour du bâtiment',
      'Surveillance globale et continue',
      "Analyse jusqu'à 1m20",
      'Détection préventive des vulnérabilités'
    ],
    colors: {
      primary: 'bg-blue-100',
      text: 'text-blue-900',
      cardBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      border: 'border-blue-300',
      button: 'bg-blue-600 hover:bg-blue-700'
    }
  },
  {
    id: 'shield',
    name: 'SHIELD',
    price: 1500,
    description:
      "La solution complète : réseau de sondes + système d'irrigation intelligent. Stabilisation active pour une protection maximale.",
    features: [
      'Réseau de sondes propriétaires',
      'Surveillance en continu et en temps réel',
      'Irrigation automatique par zones',
      'Prévention active des fissures'
    ],
    colors: {
      primary: 'bg-emerald-100',
      text: 'text-emerald-900',
      cardBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      border: 'border-emerald-300',
      button: 'bg-emerald-600 hover:bg-emerald-700'
    }
  }
]

function openRiskModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('openRiskModal'))
  }
}

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nos offres TerraStab – Surveillance et stabilisation des sols argileux</title>
        <meta
          name="description"
          content="Découvrez nos offres SURVEY Light, SURVEY+ et SHIELD pour surveiller, analyser et stabiliser les sols argileux afin de protéger votre maison."
        />
        <link rel="canonical" href="https://terrastab.fr/offres" />
      </Helmet>
      <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Nos Offres</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">Trois niveaux de protection pour surveiller et stabiliser vos sols selon votre besoin.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <article id={offer.id} key={offer.id} className={`relative h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border-2 rounded-lg ${offer.colors.cardBg} ${offer.colors.border}`}>
              <div className="p-6 border-b bg-white/60 rounded-t-lg">
                <div className={`w-12 h-12 ${offer.colors.primary} rounded-lg mb-4`} />
                <h2 className="text-2xl font-bold text-gray-900">{offer.name}</h2>
                <div className="text-xl font-semibold text-gray-900 mt-1">À partir de {offer.price} €</div>
                <p className="text-sm text-gray-500">Prix indicatif TTC</p>
              </div>
              <div className="flex-1 p-6">
                <p className="text-gray-700 mb-5 text-sm leading-relaxed">{offer.description}</p>
                <ul className="space-y-2 mb-6">
                  {offer.features.map((f) => (
                    <li key={f} className="flex items-start text-sm text-gray-700">
                      <Check className="text-emerald-600 mr-2 mt-0.5 w-4 h-4 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button onClick={openRiskModal} className={`w-full py-5 text-base font-semibold text-white ${offer.colors.button}`}>
                  Vérifier mon risque
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
        {/* Hidden listener & modal provider for risk assessment */}
        <RiskAssessmentSection />
      </main>
    </>
  )
}

export {}



