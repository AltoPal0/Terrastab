import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/adminApi'
import type { AdminStatistics } from '@/types/risk-assessment'
import StatisticsCards from './StatisticsCards'
import ChartsSection from './ChartsSection'
import LeadsSection from './LeadsSection'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [statistics, setStatistics] = useState<AdminStatistics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const loadStatistics = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await adminApi.getStatistics()

      if (result.success && result.data) {
        setStatistics(result.data)
        setLastUpdated(new Date())
      } else {
        setError(result.error || 'Erreur lors du chargement des statistiques')
      }
    } catch {
      setError('Erreur de connexion')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadStatistics()
  }, [])

  const handleRefresh = () => {
    loadStatistics()
  }

  const handleCardClick = (cardType: string) => {
    setSelectedCard(cardType)
  }

  const handleBackToOverview = () => {
    setSelectedCard(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des statistiques...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Erreur</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Réessayer
          </Button>
        </div>
      </div>
    )
  }

  if (!statistics) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <p className="text-gray-600">Aucune donnée disponible</p>
          <Button onClick={handleRefresh} variant="outline" className="mt-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Actualiser
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header with refresh */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
          <p className="text-gray-600">
            Vue d'ensemble des évaluations de risque
            {lastUpdated && (
              <span className="ml-2 text-sm text-gray-500">
                • Mis à jour le {lastUpdated.toLocaleString('fr-FR')}
              </span>
            )}
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {/* Statistics Overview */}
      <StatisticsCards statistics={statistics} onCardClick={handleCardClick} />

      {/* Leads Section */}
      <LeadsSection />

      {/* Charts and Detailed Analytics */}
      <ChartsSection
        statistics={statistics}
        selectedCard={selectedCard}
        onBackToOverview={handleBackToOverview}
      />
    </div>
  )
}