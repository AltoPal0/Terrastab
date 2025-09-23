import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { AdminStatistics } from '@/types/risk-assessment'
import {
  FileText,
  Activity,
  PieChart,
  BarChart3
} from 'lucide-react'

interface StatisticsCardsProps {
  statistics: AdminStatistics
  onCardClick: (cardType: string) => void
}

export default function StatisticsCards({ statistics, onCardClick }: StatisticsCardsProps) {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(1)}%`


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Assessments */}
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onCardClick('evaluations')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Évaluations</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.totalAssessments.toLocaleString('fr-FR')}</div>
          <p className="text-xs text-muted-foreground">
            Cliquez pour voir le détail
          </p>
        </CardContent>
      </Card>

      {/* API Stats Group */}
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onCardClick('api-stats')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">API Stats</CardTitle>
          <Activity className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Taux global</span>
              <span className="text-sm font-semibold text-green-600">
                {formatPercentage(statistics.successRates.overallSuccess)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Géolocalisation</span>
              <span className="text-sm font-semibold text-blue-600">
                {formatPercentage(statistics.successRates.geocodingSuccess)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Georisques</span>
              <span className="text-sm font-semibold text-purple-600">
                {formatPercentage(statistics.successRates.georisquesSuccess)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Erreurs</span>
              <span className="text-sm font-semibold text-red-600">
                {statistics.errorAnalysis.totalErrors}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Cliquez pour voir le détail
          </p>
        </CardContent>
      </Card>

      {/* Risk Distribution Group */}
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onCardClick('risk-distribution')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Distribution des Risques</CardTitle>
          <PieChart className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-xs text-muted-foreground">Faible</span>
              </div>
              <span className="text-sm font-semibold text-green-600">
                {statistics.riskDistribution.Faible || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <span className="text-xs text-muted-foreground">Moyen</span>
              </div>
              <span className="text-sm font-semibold text-orange-600">
                {statistics.riskDistribution.Moyen || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-xs text-muted-foreground">Élevé</span>
              </div>
              <span className="text-sm font-semibold text-red-600">
                {statistics.riskDistribution.Élevé || 0}
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Cliquez pour voir le détail
          </p>
        </CardContent>
      </Card>

      {/* Daily Trends */}
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => onCardClick('trends')}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tendances</CardTitle>
          <BarChart3 className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statistics.dailyTrends.length}</div>
          <p className="text-xs text-muted-foreground">
            Jours de données • Cliquez pour graphique
          </p>
        </CardContent>
      </Card>
    </div>
  )
}