import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  console.log('=== Admin Stats Test ===')
  console.log('Method:', req.method)
  console.log('Headers:', Object.fromEntries(req.headers.entries()))

  if (req.method === 'POST') {
    try {
      const body = await req.json()
      console.log('Body:', body)
    } catch (e) {
      console.log('Body parse error:', e)
    }
  }

  const mockStats = {
    success: true,
    data: {
      totalAssessments: 100,
      riskDistribution: { Faible: 30, Moyen: 50, Élevé: 20 },
      successRates: { geocodingSuccess: 0.95, georisquesSuccess: 0.90, overallSuccess: 0.85 },
      dailyTrends: [
        { date: '2024-01-15', assessments: 10, successRate: 0.9 },
        { date: '2024-01-16', assessments: 15, successRate: 0.85 }
      ],
      topCommunes: [{ commune: 'Test', count: 50 }],
      errorAnalysis: { totalErrors: 5, errorTypes: [{ error: 'Test error', count: 5 }] },
      timeRange: { from: '2024-01-01', to: '2024-01-17' }
    }
  }

  return new Response(JSON.stringify(mockStats), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  })
})