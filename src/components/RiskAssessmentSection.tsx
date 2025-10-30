import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, XCircle, Loader2, MapPin, X } from 'lucide-react'
import { riskAssessmentApi } from '@/lib/supabase'
import type { RiskAssessmentState } from '@/types/risk-assessment'
import LeadCaptureForm from '@/components/LeadCaptureForm'

const RiskAssessmentSection = () => {
  const [address, setAddress] = useState('')
  const [assessmentState, setAssessmentState] = useState<RiskAssessmentState>({
    isLoading: false,
    error: null,
    result: null,
    hasAssessed: false
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Écouter les événements pour ouvrir le modal depuis les CTAs
  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true)
    }

    window.addEventListener('openRiskModal', handleOpenModal)

    return () => {
      window.removeEventListener('openRiskModal', handleOpenModal)
    }
  }, [])

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

  const closeModal = () => {
    setIsModalOpen(false)
    resetAssessment()
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
    <>
      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative min-h-screen flex items-center justify-center p-2 sm:p-4">
            <div className="relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 pr-8 sm:pr-0">
                    Connaître mon niveau de risque
                  </h2>

                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                    Terrastab utilise les données officielles de la plateforme Georisques et les données du BRGM
                    pour estimer le risque RGA (retrait-gonflement des argiles) à votre adresse.
                  </p>

                  <div className="max-w-2xl mx-auto">
            {!assessmentState.hasAssessed ? (
              <form onSubmit={handleSubmit} className="bg-gray-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-sm">
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-left">
                    <Label htmlFor="address" className="text-sm sm:text-base font-medium text-gray-700 mb-2 block">
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
                      className="h-10 sm:h-12 md:h-14 text-sm sm:text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                      autoComplete="street-address"
                    />
                    <p className="mt-2 text-xs sm:text-sm text-gray-500">
                      L'évaluation se base uniquement sur la localisation géographique selon les données Georisques.gouv.fr
                    </p>
                  </div>

                  {assessmentState.error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-3 sm:p-4">
                      <div className="flex items-start">
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-red-700 text-xs sm:text-sm font-medium mb-1">Erreur</p>
                          <p className="text-red-600 text-xs sm:text-sm">{assessmentState.error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={assessmentState.isLoading}
                    className="w-full h-11 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  >
                    {assessmentState.isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                        <span className="hidden sm:inline">Analyse en cours...</span>
                        <span className="sm:hidden">Analyse...</span>
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Testez votre niveau de risque RGA</span>
                        <span className="sm:hidden">Tester mon risque RGA</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              // Risk Assessment Results
              <div className="space-y-4 sm:space-y-6">
                {assessmentState.result?.riskData && (
                  <>
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b p-3 sm:p-4 md:p-6">
                      <div className="flex items-start sm:items-center space-x-2 sm:space-x-3">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-base sm:text-lg md:text-xl text-gray-900 break-words">
                            Résultat de l'évaluation
                          </CardTitle>
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
                            {assessmentState.result.address}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Warning Display */}
                    {assessmentState.result?.warning && (
                      <div className="bg-orange-50 border-l-4 border-orange-400 p-3 sm:p-4 mx-3 sm:mx-4 md:mx-6 mt-3 sm:mt-4 rounded-r-md">
                        <div className="flex items-start">
                          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                          <p className="text-xs sm:text-sm text-orange-700 font-medium">
                            {assessmentState.result.warning}
                          </p>
                        </div>
                      </div>
                    )}

                    <CardContent className="p-4 sm:p-6 md:p-8">
                      <div className="text-center space-y-4 sm:space-y-6">
                        {/* Risk Level Icon */}
                        <div className="flex justify-center">
                          {getRiskIcon(assessmentState.result.riskData.level)}
                        </div>

                        {/* Risk Level */}
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                            Risque {assessmentState.result.riskData.level}
                          </h3>

                          {/* Risk Bar */}
                          <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-3 sm:mb-4">
                            <div
                              className={`h-3 sm:h-4 rounded-full bg-gradient-to-r ${getRiskGradient(assessmentState.result.riskData.color)} transition-all duration-500 ease-out`}
                              style={{ width: assessmentState.result.riskData.width }}
                            ></div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {assessmentState.result.riskData.description}
                          </p>
                          {assessmentState.result.riskData.commune && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3">
                              Commune : {assessmentState.result.riskData.commune}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lead Capture Form - shown directly after risk assessment */}
                  <div className="mt-6 sm:mt-8">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center px-2">
                      Être contacté par un expert
                    </h3>
                    <LeadCaptureForm
                      address={assessmentState.result.address}
                      riskLevel={assessmentState.result.riskData?.level}
                    />
                  </div>
                </>
                )}
              </div>
            )}
          </div>
        </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RiskAssessmentSection