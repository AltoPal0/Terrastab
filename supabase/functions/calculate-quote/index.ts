// Edge Function: calculate-quote
// Calcule un devis basé sur l'algorithme et les réponses de l'utilisateur

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RisqueFaibleAnswers {
  bloc00_housing_type: string
  bloc10_has_basement: boolean
  bloc20_construction_year: number
  bloc30_surface_m2: number
  bloc40_walls_without_terrace: number
  bloc50_green_zones: number
  bloc50_green_zones_monitored: boolean
  bloc70_extensions: number
}

interface BlockContribution {
  bloc: string
  rule_applied: string
  nbr_sonde: number
  nbr_sonde_double: number
  note: string
}

interface CalculateQuoteRequest {
  risk_level: string
  rule_set_version: string
  answers: RisqueFaibleAnswers
  user_id?: string
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse request body
    const { risk_level, rule_set_version, answers, user_id }: CalculateQuoteRequest = await req.json()

    console.log('Calculating quote for risk level:', risk_level)
    console.log('Answers:', answers)

    // =====================================================
    // 1. Vérifier les conditions bloquantes (STOP)
    // =====================================================

    // Bloc 10: Sous-sol = Oui → STOP
    if (answers.bloc10_has_basement) {
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            is_blocked: true,
            blocked_reason: 'Pas de facturation pour les logements avec sous-sol',
            risk_level,
            rule_set_version,
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Bloc 20: Année ≥ 2000 → STOP
    if (answers.bloc20_construction_year >= 2000) {
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            is_blocked: true,
            blocked_reason: 'Pas de facturation pour les maisons construites après 2000',
            risk_level,
            rule_set_version,
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Bloc 40: Murs sans terrasse = 0 → STOP
    if (answers.bloc40_walls_without_terrace === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            is_blocked: true,
            blocked_reason: 'Pas de facturation si aucun mur sans terrasse',
            risk_level,
            rule_set_version,
          },
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // =====================================================
    // 2. Appliquer l'algorithme de calcul
    // =====================================================

    let nbr_sonde = 0
    let nbr_sonde_double = 0
    const contributions: BlockContribution[] = []

    // Bloc 00: Type de logement
    if (answers.bloc00_housing_type === 'Maison mitoyenne') {
      nbr_sonde_double += 2
      contributions.push({
        bloc: '00',
        rule_applied: 'Maison mitoyenne',
        nbr_sonde: 0,
        nbr_sonde_double: 2,
        note: 'Ajoute 2 sondes doubles forfaitaires',
      })
    }

    // Bloc 30: Surface (tranches de 200 m²)
    const tranches = Math.floor(answers.bloc30_surface_m2 / 200)
    nbr_sonde += tranches
    contributions.push({
      bloc: '30',
      rule_applied: `Surface ${answers.bloc30_surface_m2} m² = ${tranches} tranches`,
      nbr_sonde: tranches,
      nbr_sonde_double: 0,
      note: 'Chaque tranche de 200 m² ajoute 1 sonde',
    })

    // Bloc 30: Toujours +1 sonde double
    nbr_sonde_double += 1
    contributions.push({
      bloc: '30',
      rule_applied: 'Toujours',
      nbr_sonde: 0,
      nbr_sonde_double: 1,
      note: 'Ajoute une sonde double fixe',
    })

    // Bloc 40: Murs sans terrasse
    nbr_sonde += answers.bloc40_walls_without_terrace
    contributions.push({
      bloc: '40',
      rule_applied: `${answers.bloc40_walls_without_terrace} murs`,
      nbr_sonde: answers.bloc40_walls_without_terrace,
      nbr_sonde_double: 0,
      note: 'Chaque mur sans terrasse ajoute 1 sonde',
    })

    // Bloc 50: Zones vertes surveillées
    if (answers.bloc50_green_zones_monitored) {
      nbr_sonde += answers.bloc50_green_zones
      contributions.push({
        bloc: '50',
        rule_applied: `${answers.bloc50_green_zones} zones vertes surveillées`,
        nbr_sonde: answers.bloc50_green_zones,
        nbr_sonde_double: 0,
        note: 'Chaque zone verte surveillée ajoute 1 sonde',
      })
    } else if (answers.bloc50_green_zones > 0) {
      contributions.push({
        bloc: '50',
        rule_applied: 'Zones vertes non surveillées',
        nbr_sonde: 0,
        nbr_sonde_double: 0,
        note: 'Pas de sonde si zones non surveillées',
      })
    }

    // Bloc 70: Extensions
    nbr_sonde += answers.bloc70_extensions
    contributions.push({
      bloc: '70',
      rule_applied: `${answers.bloc70_extensions} extensions`,
      nbr_sonde: answers.bloc70_extensions,
      nbr_sonde_double: 0,
      note: 'Chaque extension ajoute 1 sonde',
    })

    // =====================================================
    // 3. Récupérer les prix unitaires
    // =====================================================

    const { data: priceData, error: priceError } = await supabaseClient
      .from('price_book')
      .select('*')
      .eq('rule_set_version', rule_set_version)

    if (priceError) {
      throw new Error(`Error fetching prices: ${priceError.message}`)
    }

    const prices = priceData.reduce((acc, item) => {
      acc[item.item_type] = item.unit_price
      return acc
    }, {} as Record<string, number>)

    // =====================================================
    // 4. Calculer le devis total
    // =====================================================

    const devis_total =
      nbr_sonde * (prices.sonde || 0) +
      nbr_sonde_double * (prices.sonde_double || 0)

    // =====================================================
    // 5. Générer un quote_id unique
    // =====================================================

    const quote_id = `Q-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`

    // =====================================================
    // 6. Enregistrer dans la table RESULTS
    // =====================================================

    const { data: resultData, error: resultError } = await supabaseClient
      .from('results')
      .insert({
        user_id: user_id || null,
        risk_level,
        rule_set_version,
        answers_json: answers,
        contributions_json: contributions,
        nbr_sonde,
        nbr_sonde_double,
        nbr_piquet_irrigation: 0,
        nbr_controller: 0,
        devis_total,
        quote_id,
      })
      .select()
      .single()

    if (resultError) {
      throw new Error(`Error saving result: ${resultError.message}`)
    }

    // =====================================================
    // 7. Retourner le résultat
    // =====================================================

    const response = {
      success: true,
      data: {
        quote_id,
        risk_level,
        rule_set_version,
        contributions,
        quantities: {
          nbr_sonde,
          nbr_sonde_double,
          nbr_piquet_irrigation: 0,
          nbr_controller: 0,
        },
        pricing: {
          sonde: prices.sonde || 0,
          sonde_double: prices.sonde_double || 0,
          piquet_irrigation: prices.piquet_irrigation || 0,
          controller: prices.controller || 0,
        },
        devis_total,
        is_blocked: false,
      },
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in calculate-quote function:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
