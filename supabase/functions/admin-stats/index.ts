import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface AdminStatistics {
  totalAssessments: number
  riskDistribution: Record<string, number>
  successRates: {
    geocodingSuccess: number
    georisquesSuccess: number
    overallSuccess: number
  }
  dailyTrends: Array<{
    date: string
    assessments: number
    successRate: number
  }>
  topCommunes: Array<{
    commune: string
    count: number
  }>
  errorAnalysis: {
    totalErrors: number
    errorTypes: Array<{
      error: string
      count: number
    }>
  }
  timeRange: {
    from: string
    to: string
  }
}

interface AdminStatsResponse {
  success: boolean
  data?: AdminStatistics
  error?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Simple token validation (matches admin-auth token format)
function validateAdminToken(token: string): boolean {
  if (!token || !token.startsWith('admin_')) {
    console.log('Token validation failed: invalid format or prefix')
    return false
  }

  const parts = token.split('_')
  if (parts.length !== 3) {
    console.log('Token validation failed: incorrect number of parts')
    return false
  }

  const timestamp = parseInt(parts[1])
  const now = Date.now()
  const tokenAge = Math.abs(now - timestamp)

  console.log('Token validation:', {
    timestamp,
    now,
    tokenAge,
    ageHours: tokenAge / (1000 * 60 * 60),
    isValid: tokenAge < 86400000
  })

  // Token valid for 24 hours (86400000 ms) - use absolute value to handle clock differences
  return tokenAge < 86400000
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST' && req.method !== 'GET') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Check authentication - get token from request body
    let body: any = {}
    if (req.method === 'POST') {
      try {
        body = await req.json()
      } catch {
        return new Response(
          JSON.stringify({ success: false, error: 'Invalid request body' }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        )
      }
    }

    const token = body.token
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: 'Non authentifié' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    if (!validateAdminToken(token)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Token invalide ou expiré' }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Configuration Supabase manquante' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Calculate time range (last 30 days)
    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000))

    console.log('Fetching admin statistics...')

    // Fetch statistics from risk_assessments table
    const { data: assessments, error: assessmentsError } = await supabase
      .from('risk_assessments')
      .select('*')
      .gte('created_at', thirtyDaysAgo.toISOString())

    if (assessmentsError) {
      console.error('Error fetching assessments:', assessmentsError)
      return new Response(
        JSON.stringify({ success: false, error: 'Erreur lors de la récupération des données' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Calculate statistics
    const totalAssessments = assessments.length
    const successfulGeocodings = assessments.filter(a => a.geocoding_success).length
    const successfulGeorisques = assessments.filter(a => a.georisques_success).length
    const overallSuccessful = assessments.filter(a => a.geocoding_success && a.georisques_success).length

    // Risk distribution
    const riskDistribution = {
      'Faible': assessments.filter(a => a.risk_level === 'Faible').length,
      'Moyen': assessments.filter(a => a.risk_level === 'Moyen').length,
      'Élevé': assessments.filter(a => a.risk_level === 'Élevé').length
    }

    // Daily trends (last 7 days)
    const dailyTrends = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000))
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      const endOfDay = new Date(startOfDay.getTime() + (24 * 60 * 60 * 1000))

      const dayAssessments = assessments.filter(a => {
        const createdAt = new Date(a.created_at)
        return createdAt >= startOfDay && createdAt < endOfDay
      })

      const successfulDay = dayAssessments.filter(a => a.geocoding_success && a.georisques_success).length

      dailyTrends.push({
        date: startOfDay.toISOString().split('T')[0],
        assessments: dayAssessments.length,
        successRate: dayAssessments.length > 0 ? successfulDay / dayAssessments.length : 0
      })
    }

    // Top communes
    const communeCounts = new Map<string, number>()
    assessments.forEach(a => {
      if (a.commune) {
        const count = communeCounts.get(a.commune) || 0
        communeCounts.set(a.commune, count + 1)
      }
    })

    const topCommunes = Array.from(communeCounts.entries())
      .map(([commune, count]) => ({ commune, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Error analysis
    const errors = assessments.filter(a => a.error_message)
    const errorTypeCounts = new Map<string, number>()

    errors.forEach(a => {
      if (a.error_message) {
        const count = errorTypeCounts.get(a.error_message) || 0
        errorTypeCounts.set(a.error_message, count + 1)
      }
    })

    const errorTypes = Array.from(errorTypeCounts.entries())
      .map(([error, count]) => ({ error, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const statistics = {
      totalAssessments,
      riskDistribution,
      successRates: {
        geocodingSuccess: totalAssessments > 0 ? successfulGeocodings / totalAssessments : 0,
        georisquesSuccess: totalAssessments > 0 ? successfulGeorisques / totalAssessments : 0,
        overallSuccess: totalAssessments > 0 ? overallSuccessful / totalAssessments : 0
      },
      dailyTrends,
      topCommunes,
      errorAnalysis: {
        totalErrors: errors.length,
        errorTypes
      },
      timeRange: {
        from: thirtyDaysAgo.toISOString(),
        to: now.toISOString()
      }
    }

    console.log('Admin statistics calculated successfully')

    const response: AdminStatsResponse = {
      success: true,
      data: statistics
    }

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Admin stats error:', error)
    return new Response(
      JSON.stringify({ success: false, error: "Erreur interne du serveur" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})