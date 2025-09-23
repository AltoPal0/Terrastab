import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface AdminAuthRequest {
  password: string
}

interface AdminAuthResponse {
  success: boolean
  token?: string
  error?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Simple JWT-like token generation (for demo purposes)
function generateToken(): string {
  const timestamp = Date.now()
  const randomBytes = crypto.getRandomValues(new Uint8Array(16))
  const randomHex = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('')
  return `admin_${timestamp}_${randomHex}`
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ success: false, error: 'Method not allowed' }),
        {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    const { password }: AdminAuthRequest = await req.json()

    // Validation
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Mot de passe requis" }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Get admin password from Supabase secrets
    const adminPassword = Deno.env.get('ADMIN_PORTAL_PWD')
    if (!adminPassword) {
      console.error('ADMIN_PORTAL_PWD environment variable not set')
      return new Response(
        JSON.stringify({ success: false, error: "Configuration manquante" }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Verify password
    if (password.trim() !== adminPassword) {
      console.log('Invalid admin password attempt')
      return new Response(
        JSON.stringify({ success: false, error: "Mot de passe incorrect" }),
        {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Generate session token
    const token = generateToken()
    console.log('Admin authentication successful')

    const response: AdminAuthResponse = {
      success: true,
      token: token
    }

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Admin auth error:', error)
    return new Response(
      JSON.stringify({ success: false, error: "Erreur interne du serveur" }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})