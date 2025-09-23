import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AdminStatistics, EvaluationRecord } from '@/types/risk-assessment'
import { Activity, PieChart, BarChart3, ArrowLeft, CheckCircle, XCircle, TrendingUp, MapPin, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { adminApi } from '@/lib/adminApi'

interface ChartsSectionProps {
  statistics: AdminStatistics
  selectedCard: string | null
  onBackToOverview: () => void
}

export default function ChartsSection({ statistics, selectedCard, onBackToOverview }: ChartsSectionProps) {
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>([])
  const [loadingEvaluations, setLoadingEvaluations] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`

  const loadEvaluations = async () => {
    setLoadingEvaluations(true)
    try {
      const result = await adminApi.getEvaluations()
      if (result.success && result.data) {
        setEvaluations(result.data)
      } else {
        console.warn('Could not load evaluations:', result.error)
        // Fallback: don't show error to user, just keep empty list
      }
    } catch (error) {
      console.warn('Evaluations endpoint not available (needs deployment):', error)
      // Graceful fallback - don't show error to user
    } finally {
      setLoadingEvaluations(false)
    }
  }

  useEffect(() => {
    if (selectedCard === 'evaluations') {
      loadEvaluations()
    }
  }, [selectedCard])

  const getRiskColor = (riskLevel: string | null) => {
    switch (riskLevel) {
      case 'Faible': return 'text-green-600 bg-green-100'
      case 'Moyen': return 'text-orange-600 bg-orange-100'
      case 'Élevé': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (evaluation: EvaluationRecord) => {
    if (evaluation.geocoding_success && evaluation.georisques_success) {
      return <CheckCircle className="w-4 h-4 text-green-600" />
    }
    return <XCircle className="w-4 h-4 text-red-600" />
  }

  if (selectedCard) {
    return (
      <div className="space-y-6">
        {/* Back button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onBackToOverview}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à la vue d'ensemble</span>
          </Button>
        </div>

        {selectedCard === 'api-stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Taux de Réussite</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Taux global</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatPercentage(statistics.successRates.overallSuccess)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Pourcentage d'évaluations complètement réussies sur l'ensemble des demandes.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span>Géolocalisation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Adresses trouvées</span>
                    <span className="text-xl font-bold text-blue-600">
                      {formatPercentage(statistics.successRates.geocodingSuccess)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Pourcentage d'adresses correctement géolocalisées via l'API Google Maps.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>API Georisques</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">Données récupérées</span>
                    <span className="text-xl font-bold text-purple-600">
                      {formatPercentage(statistics.successRates.georisquesSuccess)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Pourcentage de requêtes réussies vers l'API officielle Georisques.gouv.fr.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span>Erreurs</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">Total erreurs</span>
                    <span className="text-xl font-bold text-red-600">
                      {statistics.errorAnalysis.totalErrors}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {statistics.errorAnalysis.errorTypes.slice(0, 3).map((errorType, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 truncate flex-1 mr-2">
                          {errorType.error || 'Erreur non spécifiée'}
                        </span>
                        <span className="font-medium text-red-600">
                          {errorType.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedCard === 'risk-distribution' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChart className="w-5 h-5 text-orange-600" />
                <span>Distribution Détaillée des Risques</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-4" />
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {statistics.riskDistribution.Faible || 0}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Risque Faible</div>
                  <div className="text-xs text-gray-500">
                    {Object.values(statistics.riskDistribution).reduce((sum, count) => sum + count, 0) > 0
                      ? formatPercentage((statistics.riskDistribution.Faible || 0) / Object.values(statistics.riskDistribution).reduce((sum, count) => sum + count, 0))
                      : '0%'} du total
                  </div>
                </div>

                <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto mb-4" />
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    {statistics.riskDistribution.Moyen || 0}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Risque Moyen</div>
                  <div className="text-xs text-gray-500">
                    {Object.values(statistics.riskDistribution).reduce((sum, count) => sum + count, 0) > 0
                      ? formatPercentage((statistics.riskDistribution.Moyen || 0) / Object.values(statistics.riskDistribution).reduce((sum, count) => sum + count, 0))
                      : '0%'} du total
                  </div>
                </div>

                <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-4" />
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {statistics.riskDistribution.Élevé || 0}
                  </div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Risque Élevé</div>
                  <div className="text-xs text-gray-500">
                    {Object.values(statistics.riskDistribution).reduce((sum, count) => sum + count, 0) > 0
                      ? formatPercentage((statistics.riskDistribution.Élevé || 0) / Object.values(statistics.riskDistribution).reduce((sum, count) => sum + count, 0))
                      : '0%'} du total
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedCard === 'trends' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
                <span>Graphique des Tendances Journalières</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {statistics.dailyTrends.length > 0 ? (
                <div className="space-y-6">
                  {/* Summary stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="text-xl font-bold text-indigo-600 mb-1">
                        {statistics.dailyTrends.reduce((sum, trend) => sum + trend.assessments, 0)}
                      </div>
                      <div className="text-sm text-gray-700">Total sur {statistics.dailyTrends.length} jours</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600 mb-1">
                        {Math.max(...statistics.dailyTrends.map(t => t.assessments))}
                      </div>
                      <div className="text-sm text-gray-700">Pic journalier</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600 mb-1">
                        {Math.round(statistics.dailyTrends.reduce((sum, trend) => sum + trend.assessments, 0) / statistics.dailyTrends.length)}
                      </div>
                      <div className="text-sm text-gray-700">Moyenne journalière</div>
                    </div>
                  </div>

                  {/* Chart visualization */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Nombre d'évaluations par jour</h4>

                    {/* Chart area */}
                    <div className="relative h-80">
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4 pr-4">
                        {[0, 1, 2, 3, 4, 5].map((i) => {
                          const maxValue = Math.max(...statistics.dailyTrends.map(t => t.assessments))
                          const value = Math.round((maxValue * (5 - i)) / 5)
                          return (
                            <div key={i} className="text-xs text-gray-500 text-right">
                              {value}
                            </div>
                          )
                        })}
                      </div>

                      {/* Chart bars */}
                      <div className="ml-12 h-full relative">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-full border-t border-gray-300 opacity-50"></div>
                          ))}
                        </div>

                        {/* Bars */}
                        <div className="absolute inset-0 flex items-end justify-between px-2">
                          {statistics.dailyTrends.map((trend) => {
                            const maxValue = Math.max(...statistics.dailyTrends.map(t => t.assessments))
                            const heightPx = maxValue > 0 ? Math.max((trend.assessments / maxValue) * 280, 4) : 4 // 280px is chart height minus padding
                            return (
                              <div
                                key={trend.date}
                                className="flex flex-col items-center group cursor-pointer"
                                style={{ width: `${90 / statistics.dailyTrends.length}%` }}
                              >
                                {/* Bar */}
                                <div className="relative w-full max-w-12">
                                  <div
                                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t transition-all duration-300 group-hover:from-indigo-700 group-hover:to-indigo-500 relative"
                                    style={{ height: `${heightPx}px` }}
                                  >
                                    {/* Value label on hover */}
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                      {trend.assessments} évaluations
                                      <br />
                                      {formatPercentage(trend.successRate)} réussis
                                    </div>
                                    {/* Value inside bar for non-zero values */}
                                    {trend.assessments > 0 && (
                                      <div className="absolute inset-x-0 bottom-1 text-center text-white text-xs font-medium">
                                        {trend.assessments}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* X-axis labels */}
                    <div className="ml-12 mt-2 flex justify-between">
                      {statistics.dailyTrends.map((trend) => (
                        <div key={trend.date} className="text-xs text-gray-500 text-center" style={{ width: `${90 / statistics.dailyTrends.length}%` }}>
                          {formatDate(trend.date)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Data table */}
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Détail par jour</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-2 font-medium text-gray-700">Date</th>
                            <th className="text-right py-2 font-medium text-gray-700">Évaluations</th>
                            <th className="text-right py-2 font-medium text-gray-700">Taux de réussite</th>
                            <th className="text-center py-2 font-medium text-gray-700">Tendance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {statistics.dailyTrends.map((trend, index) => {
                            const prevTrend = statistics.dailyTrends[index + 1]
                            const isIncreasing = prevTrend && trend.assessments > prevTrend.assessments
                            const isDecreasing = prevTrend && trend.assessments < prevTrend.assessments
                            return (
                              <tr key={trend.date} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 font-medium text-gray-900">
                                  {new Date(trend.date).toLocaleDateString('fr-FR', {
                                    weekday: 'short',
                                    day: '2-digit',
                                    month: '2-digit'
                                  })}
                                </td>
                                <td className="text-right py-3 font-semibold text-indigo-600">
                                  {trend.assessments}
                                </td>
                                <td className="text-right py-3">
                                  <span className={`font-medium ${
                                    trend.successRate > 0.8 ? 'text-green-600' :
                                    trend.successRate > 0.6 ? 'text-orange-600' : 'text-red-600'
                                  }`}>
                                    {formatPercentage(trend.successRate)}
                                  </span>
                                </td>
                                <td className="text-center py-3">
                                  {isIncreasing && <span className="text-green-600 text-lg">↗️</span>}
                                  {isDecreasing && <span className="text-red-600 text-lg">↘️</span>}
                                  {!isIncreasing && !isDecreasing && <span className="text-gray-400 text-lg">→️</span>}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Aucune donnée de tendance disponible
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {selectedCard === 'evaluations' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <span>Détail des Évaluations</span>
                </div>
                <Button onClick={loadEvaluations} variant="outline" size="sm" disabled={loadingEvaluations}>
                  {loadingEvaluations ? 'Chargement...' : 'Actualiser'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {statistics.totalAssessments.toLocaleString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-700">Total des évaluations</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {Math.round(statistics.totalAssessments * statistics.successRates.overallSuccess).toLocaleString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-700">Évaluations réussies</div>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600 mb-1">
                      {evaluations.length.toLocaleString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-700">Évaluations récentes</div>
                  </div>
                </div>

                {/* Individual Evaluations */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                    <ExternalLink className="w-5 h-5" />
                    <span>Évaluations Individuelles (100 plus récentes)</span>
                  </h4>

                  {loadingEvaluations ? (
                    <div className="text-center py-8 text-gray-500">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      Chargement des évaluations...
                    </div>
                  ) : evaluations.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {evaluations.map((evaluation) => (
                        <div key={evaluation.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {getStatusIcon(evaluation)}
                                <div className="font-medium text-gray-900">
                                  {evaluation.formatted_address || evaluation.input_address}
                                </div>
                                {evaluation.formatted_address && evaluation.formatted_address !== evaluation.input_address && (
                                  <div className="text-xs text-gray-500">Saisie: {evaluation.input_address}</div>
                                )}
                                {evaluation.risk_level && (
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(evaluation.risk_level)}`}>
                                    {evaluation.risk_level}
                                  </span>
                                )}
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                  <MapPin className="w-4 h-4" />
                                  <span>{evaluation.commune || 'Commune non identifiée'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{formatDateTime(evaluation.created_at)}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <span className={`text-xs px-2 py-1 rounded ${evaluation.geocoding_success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    Geo: {evaluation.geocoding_success ? '✓' : '✗'}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded ${evaluation.georisques_success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    API: {evaluation.georisques_success ? '✓' : '✗'}
                                  </span>
                                </div>
                              </div>

                              {evaluation.error_message && (
                                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                                  <strong>Erreur:</strong> {evaluation.error_message}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <div className="mb-2">📊 Évaluations individuelles</div>
                      <div className="text-sm text-orange-600">Fonctionnalité disponible après déploiement de l'endpoint admin-evaluations</div>
                      <div className="text-xs text-gray-500 mt-2">Commande: supabase functions deploy admin-evaluations</div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Time Range Info */}
      <Card className="lg:col-span-2">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Données affichées du{' '}
              <span className="font-medium">
                {new Date(statistics.timeRange.from).toLocaleDateString('fr-FR')}
              </span>
              {' '}au{' '}
              <span className="font-medium">
                {new Date(statistics.timeRange.to).toLocaleDateString('fr-FR')}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}