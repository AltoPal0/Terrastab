import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, ArrowRight, ArrowLeft, Shield, Eye, Wrench, Euro } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
// Using inline constants temporarily
const DEPOSIT_AMOUNTS = {
  'Faible': 199,
  'Moyen': 349,
  'Élevé': 399
} as const

const SOLUTIONS_BY_RISK = {
  'Faible': 'SURVEY Light - Monitoring préventif',
  'Moyen': 'SURVEY+ - Monitoring + Stabilisation légère',
  'Élevé': 'SHIELD - Stabilisation complète + Monitoring'
} as const

const QuoteDisplay = () => {
  const { state, actions } = useCustomerJourney()
  const riskLevel = state.riskAssessmentResult?.riskData?.level as 'Faible' | 'Moyen' | 'Élevé'
  const depositAmount = DEPOSIT_AMOUNTS[riskLevel] || 199
  const recommendedSolution = SOLUTIONS_BY_RISK[riskLevel] || 'Solution personnalisée'

  useEffect(() => {
    // Génère automatiquement le devis basé sur les données collectées
    const quote = {
      riskLevel,
      recommendedSolution,
      depositAmount,
      estimatedDelivery: getEstimatedDelivery(),
      features: getFeaturesByRisk(riskLevel),
      totalEstimate: getTotalEstimate(riskLevel)
    }

    actions.setQuote(quote)
  }, [riskLevel, actions])

  const getEstimatedDelivery = () => {
    const deliveryDays = {
      'Faible': '5-7 jours',
      'Moyen': '7-10 jours',
      'Élevé': '10-14 jours'
    }
    return deliveryDays[riskLevel] || '7-10 jours'
  }

  const getTotalEstimate = (level: string) => {
    const estimates = {
      'Faible': 2990,
      'Moyen': 4990,
      'Élevé': 7990
    }
    return estimates[level as keyof typeof estimates] || 4990
  }

  const getFeaturesByRisk = (level: string) => {
    const baseFeatures = [
      'Analyse géotechnique complète',
      'Installation par techniciens certifiés',
      'Garantie décennale',
      'Suivi client dédié'
    ]

    const featuresByLevel = {
      'Faible': [
        ...baseFeatures,
        'Monitoring 24h/7j',
        'Alertes en temps réel',
        'Rapport mensuel'
      ],
      'Moyen': [
        ...baseFeatures,
        'Monitoring avancé 24h/7j',
        'Stabilisation préventive',
        'Alertes instantanées',
        'Rapport hebdomadaire',
        'Intervention d\'urgence'
      ],
      'Élevé': [
        ...baseFeatures,
        'Monitoring premium 24h/7j',
        'Stabilisation complète',
        'Système redondant',
        'Alertes prioritaires',
        'Rapport en temps réel',
        'Intervention immédiate',
        'Extension de garantie'
      ]
    }

    return featuresByLevel[level as keyof typeof featuresByLevel] || baseFeatures
  }

  const getSolutionIcon = (level: string) => {
    switch (level) {
      case 'Faible':
        return <Eye className="w-8 h-8 text-green-600" />
      case 'Moyen':
        return <Shield className="w-8 h-8 text-orange-600" />
      case 'Élevé':
        return <Wrench className="w-8 h-8 text-red-600" />
      default:
        return <Shield className="w-8 h-8 text-blue-600" />
    }
  }

  const getSolutionColor = (level: string) => {
    switch (level) {
      case 'Faible':
        return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600' }
      case 'Moyen':
        return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600' }
      case 'Élevé':
        return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600' }
      default:
        return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600' }
    }
  }

  const colors = getSolutionColor(riskLevel)

  const handleProceedToPayment = () => {
    actions.setStep('payment')
  }

  const handleGoBack = () => {
    actions.setStep('configuration')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Votre devis personnalisé
        </h1>
        <p className="text-lg text-gray-600">
          Solution adaptée à votre niveau de risque et à votre configuration
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Solution Details */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className={`${colors.border} border-2 ${colors.bg}`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  {getSolutionIcon(riskLevel)}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{recommendedSolution}</h3>
                    <p className={`text-sm ${colors.text} font-medium`}>
                      Adapté à votre risque {riskLevel.toLowerCase()}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">Livraison : {state.quote.estimatedDelivery}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-gray-700">Installation incluse</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Inclus dans votre solution :</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {state.quote.features?.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Configuration Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Résumé de votre configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Type :</span>
                    <p className="text-gray-600">{state.configuration.houseType?.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Année :</span>
                    <p className="text-gray-600">{state.configuration.constructionYear}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Problèmes :</span>
                    <p className="text-gray-600">
                      {state.configuration.visibleProblems?.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-8">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Euro className="w-6 h-6 text-blue-600" />
                  <span>Tarification</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Estimation totale</div>
                  <div className="text-3xl font-bold text-gray-900">
                    {state.quote.totalEstimate?.toLocaleString()} €
                  </div>
                  <div className="text-sm text-gray-500">TTC, installation incluse</div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="text-sm text-gray-500 mb-2">Pour débuter votre projet</div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {depositAmount} €
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Acompte à la commande
                  </div>

                  <div className="text-xs text-gray-500 mb-6">
                    • Réservation de votre créneau d'installation<br />
                    • Démarrage de l'étude technique<br />
                    • Solde à l'installation
                  </div>

                  <Button
                    onClick={handleProceedToPayment}
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                  >
                    Payer mon acompte
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Paiement sécurisé par Stripe
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 flex justify-between"
      >
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modifier ma configuration</span>
        </Button>

        <div className="text-sm text-gray-500 flex items-center">
          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
          Devis valable 30 jours
        </div>
      </motion.div>
    </div>
  )
}

export default QuoteDisplay