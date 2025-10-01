import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, XCircle, Loader2, MapPin } from 'lucide-react'
import { riskAssessmentApi } from '@/lib/supabase'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import type { RiskAssessmentState } from '@/types/risk-assessment'

const RiskAssessmentSection = () => {
  const [address, setAddress] = useState('')
  const [assessmentState, setAssessmentState] = useState<RiskAssessmentState>({
    isLoading: false,
    error: null,
    result: null,
    hasAssessed: false
  })
  const { actions } = useCustomerJourney()

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
        setAssessmentState({
          isLoading: false,
          error: null,
          result,
          hasAssessed: true
        })
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

  const resetAssessment = () => {
    setAssessmentState({
      isLoading: false,
      error: null,
      result: null,
      hasAssessed: false
    })
    setAddress('')
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Faible':
        return <CheckCircle className="w-8 h-8 text-green-600" />
      case 'Moyen':
        return <AlertTriangle className="w-8 h-8 text-orange-600" />
      case 'Élevé':
        return <XCircle className="w-8 h-8 text-red-600" />
      default:
        return <AlertTriangle className="w-8 h-8 text-gray-600" />
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

  return (
    <section id="risque" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Connaître mon niveau de risque
          </h2>

          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Terrastab utilise les données officielles de la plateforme Georisques et les données du BRGM
            pour estimer le risque RGA (retrait-gonflement des argiles) à votre adresse.
          </p>

          <div className="max-w-2xl mx-auto">
            {!assessmentState.hasAssessed ? (
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
                      'Testez votre niveau de risque RGA'
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              // Risk Assessment Results
              <div className="space-y-6">
                {assessmentState.result?.riskData && (
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-6 h-6 text-blue-600" />
                        <div>
                          <CardTitle className="text-xl text-gray-900">
                            Résultat de l'évaluation
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {assessmentState.result.address}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Warning Display */}
                    {assessmentState.result?.warning && (
                      <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mx-6 mt-4 rounded-r-md">
                        <div className="flex items-center">
                          <AlertTriangle className="w-5 h-5 text-orange-600 mr-3" />
                          <p className="text-sm text-orange-700 font-medium">
                            {assessmentState.result.warning}
                          </p>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-8">
                      <div className="text-center space-y-6">
                        {/* Risk Level Icon */}
                        <div className="flex justify-center">
                          {getRiskIcon(assessmentState.result.riskData.level)}
                        </div>

                        {/* Risk Level */}
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Risque {assessmentState.result.riskData.level}
                          </h3>

                          {/* Risk Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                            <div
                              className={`h-4 rounded-full bg-gradient-to-r ${getRiskGradient(assessmentState.result.riskData.color)} transition-all duration-500 ease-out`}
                              style={{ width: assessmentState.result.riskData.width }}
                            ></div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-50 rounded-lg p-6">
                          <p className="text-gray-700 leading-relaxed">
                            {assessmentState.result.riskData.description}
                          </p>
                          {assessmentState.result.riskData.commune && (
                            <p className="text-sm text-gray-500 mt-3">
                              Commune : {assessmentState.result.riskData.commune}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button
                            onClick={() => {
                              // Start customer journey with risk assessment result
                              actions.setRiskResult(assessmentState.result)
                              actions.setStep('recommendation')
                            }}
                            size="lg"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Voir nos solutions
                          </Button>
                          <Button
                            onClick={resetAssessment}
                            variant="outline"
                            size="lg"
                            className="flex-1"
                          >
                            Nouvelle évaluation
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RiskAssessmentSection