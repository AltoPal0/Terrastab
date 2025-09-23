import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface EvaluationRecord {
  id: string
  input_address: string
  formatted_address: string | null
  commune: string | null
  risk_level: string | null
  geocoding_success: boolean
  georisques_success: boolean
  error_message: string | null
  created_at: string
}

interface EvaluationsResponse {
  success: boolean
  data?: EvaluationRecord[]
  error?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Simple token validation (matches admin-auth token format)
function validateAdminToken(token: string): boolean {
  if (!token || !token.startsWith('admin_')) {
    return false
  }

  const parts = token.split('_')
  if (parts.length !== 3) {
    return false
  }

  const timestamp = parseInt(parts[1])
  const now = Date.now()
  const tokenAge = Math.abs(now - timestamp)

  // Token valid for 24 hours (86400000 ms)
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

    // Check authentication
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

    // Fetch recent evaluations (last 100)
    const { data: evaluations, error: evaluationsError } = await supabase
      .from('risk_assessments')
      .select('id, input_address, formatted_address, commune, risk_level, geocoding_success, georisques_success, error_message, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    if (evaluationsError) {
      console.error('Error fetching evaluations:', evaluationsError)
      return new Response(
        JSON.stringify({ success: false, error: 'Erreur lors de la récupération des évaluations' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const response: EvaluationsResponse = {
      success: true,
      data: evaluations as EvaluationRecord[]
    }

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Admin evaluations error:', error)
    return new Response(
      JSON.stringify({ success: false, error: "Erreur interne du serveur" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})