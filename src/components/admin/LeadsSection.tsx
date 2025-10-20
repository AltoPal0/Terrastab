import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { adminApi } from '@/lib/adminApi'

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  address: string | null
  risk_level: string | null
  created_at: string
}

const LeadsSection = () => {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    setLoading(true)
    setError(null)

    const response = await adminApi.getLeads()

    if (response.success) {
      setLeads(response.leads || [])
    } else {
      setError(response.error || 'Erreur lors du chargement des leads')
    }

    setLoading(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getRiskBadgeColor = (riskLevel: string | null) => {
    if (!riskLevel) return 'bg-gray-100 text-gray-700'
    switch (riskLevel.toLowerCase()) {
      case 'faible':
        return 'bg-green-100 text-green-700'
      case 'moyen':
        return 'bg-orange-100 text-orange-700'
      case 'élevé':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads ({leads.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {leads.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucun lead pour le moment
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div
                key={lead.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{lead.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(lead.created_at)}
                    </div>
                  </div>
                  {lead.risk_level && (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(lead.risk_level)}`}>
                      Risque {lead.risk_level}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a href={`mailto:${lead.email}`} className="hover:text-blue-600 hover:underline">
                      {lead.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a href={`tel:${lead.phone}`} className="hover:text-blue-600 hover:underline">
                      {lead.phone}
                    </a>
                  </div>

                  {lead.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{lead.address}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default LeadsSection
