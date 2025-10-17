import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, XCircle, Loader2, MapPin, Database, Satellite, Brain, ArrowRight } from 'lucide-react'
import { riskAssessmentApi } from '@/lib/supabase'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import type { RiskAssessmentState } from '@/types/risk-assessment'

const AddressEntry = () => {
  const [address, setAddress] = useState('')
  const [assessmentState, setAssessmentState] = useState<RiskAssessmentState>({
    isLoading: false,
    error: null,
    result: null,
    hasAssessed: false
  })
  const [loadingStep, setLoadingStep] = useState(0)
  const [apiCompleted, setApiCompleted] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const { actions } = useCustomerJourney()

  // Animation des étapes de chargement (affichage forcé même si l'API est rapide)
  useEffect(() => {
    if (assessmentState.isLoading) {
      setLoadingStep(0)
      setApiCompleted(false)
      setShowContinueButton(false)

      const timer1 = setTimeout(() => setLoadingStep(1), 500)
      const timer2 = setTimeout(() => setLoadingStep(2), 1000)
      const timer3 = setTimeout(() => setLoadingStep(3), 1500)
      const timer4 = setTimeout(() => setLoadingStep(4), 2000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [assessmentState.isLoading])

  // Quand l'API répond ET que toutes les étapes sont affichées, montrer le bouton
  useEffect(() => {
    if (apiCompleted && loadingStep >= 4) {
      setShowContinueButton(true)
    }
  }, [apiCompleted, loadingStep])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!address.trim()) {
      setAssessmentState(prev => ({
        ...prev,
        error: 'Veuillez saisir une adresse valide'
      }))
      return
    }

    setAssessmentState({
      isLoading: true,
      error: null,
      result: null,
      hasAssessed: false
    })

    try {
      console.log('Assessing risk for address:', address)
      const result = await riskAssessmentApi.checkRisk(address.trim())

      if (result.success) {
        // Marquer l'API comme terminée et sauvegarder le résultat
        // mais rester en mode isLoading pour afficher l'écran
        setApiCompleted(true)
        actions.setRiskResult(result)

        // On ne change PAS hasAssessed ici, on reste en isLoading
        // L'utilisateur devra cliquer sur "Continuer" pour avancer
        setAssessmentState(prev => ({
          ...prev,
          result
        }))
      } else {
        setAssessmentState({
          isLoading: false,
          error: result.error || 'Erreur inconnue lors de l\'évaluation',
          result: null,
          hasAssessed: false
        })
      }
    } catch (error) {
      console.error('Risk assessment error:', error)
      setAssessmentState({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la vérification du risque',
        result: null,
        hasAssessed: false
      })
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Faible':
        return <CheckCircle className="w-12 h-12 text-green-600" />
      case 'Moyen':
        return <AlertTriangle className="w-12 h-12 text-orange-600" />
      case 'Élevé':
        return <XCircle className="w-12 h-12 text-red-600" />
      default:
        return <AlertTriangle className="w-12 h-12 text-gray-600" />
    }
  }

  const getRiskGradient = (color: string) => {
    switch (color) {
      case 'green':
        return 'from-green-500 to-green-600'
      case 'orange':
        return 'from-orange-500 to-orange-600'
      case 'red':
        return 'from-red-500 to-red-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const loadingSteps = [
    {
      icon: MapPin,
      message: "Géolocalisation de votre adresse...",
      description: "Extraction des coordonnées GPS précises"
    },
    {
      icon: Database,
      message: "Consultation des bases de données Géorisques...",
      description: "Analyse des cartes RGA officielles du BRGM"
    },
    {
      icon: Satellite,
      message: "Analyse des données géologiques satellitaires...",
      description: "Croisement avec les données topographiques"
    },
    {
      icon: Brain,
      message: "Calcul du niveau de risque par algorithme propriétaire...",
      description: "Traitement des données par IA et machine learning"
    }
  ]

  const handleContinueToResults = () => {
    console.log('🎯 Bouton Continuer cliqué - Passage à recommendation')
    actions.setStep('recommendation')
  }

  // Debug: Logger les changements d'état
  useEffect(() => {
    console.log('📊 État actuel:', {
      isLoading: assessmentState.isLoading,
      hasAssessed: assessmentState.hasAssessed,
      loadingStep,
      apiCompleted,
      showContinueButton,
      hasResult: !!assessmentState.result
    })
  }, [assessmentState, loadingStep, apiCompleted, showContinueButton])

  return (
    <div className="max-w-2xl mx-auto">
      {assessmentState.isLoading ? (
        // Écran de chargement intelligent
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {showContinueButton ? 'Analyse terminée' : 'Analyse en cours'}
            </h2>
            <p className="text-lg text-gray-600">
              {showContinueButton
                ? 'Votre évaluation de risque est prête'
                : 'Nous analysons votre adresse en temps réel'
              }
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-6">
                {loadingSteps.map((step, index) => {
                  const IconComponent = step.icon
                  const isActive = loadingStep >= index
                  const isCompleted = showContinueButton || loadingStep > index

                  return (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 transition-all duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-30'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isCompleted
                          ? 'bg-green-100 text-green-600'
                          : isActive
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <IconComponent className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                        )}
                      </div>

                      <div className="flex-1 pt-1">
                        <p className={`font-semibold transition-colors duration-500 ${
                          isActive ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.message}
                        </p>
                        <p className={`text-sm transition-colors duration-500 ${
                          isActive ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>

                      {isActive && !isCompleted && (
                        <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0 mt-2" />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Barre de progression globale */}
              <div className="mt-8">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r transition-all duration-500 ease-out ${
                      showContinueButton
                        ? 'from-green-500 to-green-600'
                        : 'from-blue-500 to-blue-600'
                    }`}
                    style={{ width: showContinueButton ? '100%' : `${(loadingStep / loadingSteps.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-500 mt-3">
                  {showContinueButton
                    ? '✓ Analyse complète'
                    : `Étape ${Math.min(loadingStep, loadingSteps.length)} sur ${loadingSteps.length}`
                  }
                </p>
              </div>

              {/* Bouton Continuer (visible seulement quand l'analyse est terminée) */}
              {showContinueButton && (
                <div className="mt-6 text-center animate-in fade-in duration-500">
                  <Button
                    onClick={handleContinueToResults}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                  >
                    Voir mes résultats
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              ⏱ Analyse en temps réel • Données certifiées BRGM
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Vérifiez votre risque RGA
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Terrastab utilise les données officielles de la plateforme Georisques et les données du BRGM
              pour estimer le risque de retrait-gonflement des argiles à votre adresse.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div className="text-left">
                <Label htmlFor="address" className="text-base font-medium text-gray-700 mb-2 block">
                  Adresse de votre maison
                </Label>
                <Input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Rue de la Paix, 75001 Paris"
                  required
                  disabled={assessmentState.isLoading}
                  className="h-14 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                  autoComplete="street-address"
                  autoFocus
                />
                <p className="mt-3 text-sm text-gray-500">
                  L'évaluation se base uniquement sur la localisation géographique selon les données Georisques.gouv.fr
                </p>
              </div>

              {assessmentState.error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-red-700 text-sm font-medium mb-1">Erreur</p>
                      <p className="text-red-600 text-sm">{assessmentState.error}</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={assessmentState.isLoading}
                className="w-full h-14 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
              >
                {assessmentState.isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  'Vérifier mon niveau de risque'
                )}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default AddressEntry
