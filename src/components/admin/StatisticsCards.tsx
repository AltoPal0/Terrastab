import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AdminStatistics } from '@/types/risk-assessment'
import {
  FileText,
  CheckCircle,
  TrendingUp,
  MapPin,
  XCircle
} from 'lucide-react'

interface StatisticsCardsProps {
  statistics: AdminStatistics
}

export default function StatisticsCards({ statistics }: StatisticsCardsProps) {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`

  const totalRiskAssessments = Object.values(statistics.riskDistribution).reduce((sum, count) => sum + count, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Total Assessments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Évaluations</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalAssessments.toLocaleString('fr-FR')}</div>
          <p className="text-xs text-muted-foreground">
            Depuis le début
          </p>
        </CardContent>
      </Card>

      {/* Success Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux de Réussite</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatPercentage(statistics.successRates.overallSuccess)}
          </div>
          <p className="text-xs text-muted-foreground">
            Évaluations complètes
          </p>
        </CardContent>
      </Card>

      {/* Geocoding Success */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Géolocalisation</CardTitle>
          <MapPin className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {formatPercentage(statistics.successRates.geocodingSuccess)}
          </div>
          <p className="text-xs text-muted-foreground">
            Adresses trouvées
          </p>
        </CardContent>
      </Card>

      {/* API Success */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">API Georisques</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {formatPercentage(statistics.successRates.georisquesSuccess)}
          </div>
          <p className="text-xs text-muted-foreground">
            Données récupérées
          </p>
        </CardContent>
      </Card>

      {/* Risk Distribution - Faible */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Risque Faible</CardTitle>
          <div className="w-3 h-3 bg-green-500 rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {statistics.riskDistribution.Faible || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalRiskAssessments > 0
              ? formatPercentage((statistics.riskDistribution.Faible || 0) / totalRiskAssessments)
              : '0%'} du total
          </p>
        </CardContent>
      </Card>

      {/* Risk Distribution - Moyen */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Risque Moyen</CardTitle>
          <div className="w-3 h-3 bg-orange-500 rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {statistics.riskDistribution.Moyen || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalRiskAssessments > 0
              ? formatPercentage((statistics.riskDistribution.Moyen || 0) / totalRiskAssessments)
              : '0%'} du total
          </p>
        </CardContent>
      </Card>

      {/* Risk Distribution - Élevé */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Risque Élevé</CardTitle>
          <div className="w-3 h-3 bg-red-500 rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {statistics.riskDistribution.Élevé || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalRiskAssessments > 0
              ? formatPercentage((statistics.riskDistribution.Élevé || 0) / totalRiskAssessments)
              : '0%'} du total
          </p>
        </CardContent>
      </Card>

      {/* Errors */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Erreurs</CardTitle>
          <XCircle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {statistics.errorAnalysis.totalErrors}
          </div>
          <p className="text-xs text-muted-foreground">
            Évaluations échouées
          </p>
        </CardContent>
      </Card>
    </div>
  )
}