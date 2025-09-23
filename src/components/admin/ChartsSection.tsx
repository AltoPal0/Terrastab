import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AdminStatistics } from '@/types/risk-assessment'
import { Calendar, MapPin, AlertTriangle } from 'lucide-react'

interface ChartsSectionProps {
  statistics: AdminStatistics
}

export default function ChartsSection({ statistics }: ChartsSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    })
  }

  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Trends */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Tendances Journalières</CardTitle>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {statistics.dailyTrends.length > 0 ? (
            <div className="space-y-3">
              {statistics.dailyTrends.slice(0, 7).map((trend) => (
                <div key={trend.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium text-gray-700">
                      {formatDate(trend.date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {trend.assessments} évaluations
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium text-green-600">
                      {formatPercentage(trend.successRate)}
                    </div>
                    <div
                      className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"
                    >
                      <div
                        className="h-full bg-green-500 transition-all duration-300"
                        style={{ width: `${trend.successRate * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucune donnée de tendance disponible
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Communes */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Communes les Plus Consultées</CardTitle>
          <MapPin className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {statistics.topCommunes.length > 0 ? (
            <div className="space-y-3">
              {statistics.topCommunes.slice(0, 8).map((commune, index) => (
                <div key={commune.commune} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="text-xs font-medium text-gray-500 w-6">
                      #{index + 1}
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {commune.commune || 'Non spécifié'}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm font-medium text-blue-600">
                      {commune.count}
                    </div>
                    <div className="text-xs text-gray-500">
                      évaluations
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucune donnée de commune disponible
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Analysis */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold">Analyse des Erreurs</CardTitle>
          <AlertTriangle className="h-5 w-5 text-red-500" />
        </CardHeader>
        <CardContent>
          {statistics.errorAnalysis.errorTypes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {statistics.errorAnalysis.errorTypes.slice(0, 6).map((errorType, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
                  <div className="text-sm text-gray-700 truncate flex-1 mr-3">
                    {errorType.error || 'Erreur non spécifiée'}
                  </div>
                  <div className="text-sm font-medium text-red-600">
                    {errorType.count}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-green-600">
              ✅ Aucune erreur récente détectée
            </div>
          )}
        </CardContent>
      </Card>

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