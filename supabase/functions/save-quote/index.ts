import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SaveQuoteRequest {
  auth_user_id: string // ID de l'utilisateur authentifié via Google OAuth
  result_id: string // ID du résultat (quote) à lier
  user_email?: string // Email de l'utilisateur (pour confirmation)
}

interface SaveQuoteResponse {
  success: boolean
  quote_id?: string
  message?: string
  error?: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase environment variables')
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    const { auth_user_id, result_id, user_email }: SaveQuoteRequest = await req.json()

    if (!auth_user_id || !result_id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Paramètres manquants: auth_user_id et result_id requis'
        } as SaveQuoteResponse),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 1. Créer ou récupérer l'utilisateur via auth_user_id
    let userId: string

    const { data: existingUser, error: userSelectError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('auth_user_id', auth_user_id)
      .single()

    if (userSelectError && userSelectError.code !== 'PGRST116') {
      console.error('Error checking existing user:', userSelectError)
      throw new Error('Erreur lors de la vérification de l\'utilisateur')
    }

    if (existingUser) {
      // Utilisateur existe déjà
      userId = existingUser.id

      // Mettre à jour last_login
      await supabaseAdmin
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId)
    } else {
      // Créer un nouvel utilisateur
      const { data: newUser, error: userInsertError } = await supabaseAdmin
        .from('users')
        .insert({
          auth_user_id,
          contact_mode: 'google',
          email: user_email || null,
          last_login: new Date().toISOString(),
          metadata: {}
        })
        .select('id')
        .single()

      if (userInsertError) {
        console.error('Error creating user:', userInsertError)
        throw new Error('Erreur lors de la création de l\'utilisateur')
      }

      userId = newUser.id
    }

    // 2. Vérifier que le result_id existe et n'est pas déjà lié
    const { data: existingResult, error: resultCheckError } = await supabaseAdmin
      .from('results')
      .select('id, user_id, quote_id')
      .eq('id', result_id)
      .single()

    if (resultCheckError) {
      console.error('Error checking result:', resultCheckError)
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Devis introuvable'
        } as SaveQuoteResponse),
        {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Si le devis est déjà lié à un utilisateur différent, erreur
    if (existingResult.user_id && existingResult.user_id !== userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Ce devis est déjà lié à un autre utilisateur'
        } as SaveQuoteResponse),
        {
          status: 409,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // 3. Lier le devis à l'utilisateur
    const { data: updatedResult, error: updateError } = await supabaseAdmin
      .from('results')
      .update({ user_id: userId })
      .eq('id', result_id)
      .select('quote_id')
      .single()

    if (updateError) {
      console.error('Error updating result:', updateError)
      throw new Error('Erreur lors de la sauvegarde du devis')
    }

    // 4. Retourner la confirmation
    return new Response(
      JSON.stringify({
        success: true,
        quote_id: updatedResult.quote_id,
        message: '✅ Votre devis a été enregistré. Nous vous l\'avons envoyé par e-mail.'
      } as SaveQuoteResponse),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Unexpected error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Erreur interne du serveur'
      } as SaveQuoteResponse),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
