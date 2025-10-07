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

/**
 * Évalue si une condition est remplie pour un bloc donné
 */
function evaluateCondition(bloc: string, condition: string, answers: RisqueFaibleAnswers): boolean {
  switch (bloc) {
    case '00':
      return condition === answers.bloc00_housing_type

    case '10':
      if (condition === 'Oui') return answers.bloc10_has_basement === true
      if (condition === 'Non') return answers.bloc10_has_basement === false
      return false

    case '20':
      if (condition.includes('≥')) {
        const year = parseInt(condition.replace('≥', ''))
        return answers.bloc20_construction_year >= year
      }
      return false

    case '30':
      // Les règles du bloc 30 s'appliquent toujours
      return true

    case '40':
      if (condition === '=0') return answers.bloc40_walls_without_terrace === 0
      if (condition === '>0') return answers.bloc40_walls_without_terrace > 0
      return false

    case '50':
      if (condition === 'Surveillance = Oui') return answers.bloc50_green_zones_monitored === true
      if (condition === 'Surveillance = Non') return answers.bloc50_green_zones_monitored === false
      return false

    case '70':
      // Les règles du bloc 70 s'appliquent toujours
      return true

    default:
      return false
  }
}

/**
 * Parse une opération et retourne le nombre à ajouter
 * Exemples: '0', '+2', '+1 par tranche', '+1 par mur', etc.
 */
function parseOperation(operation: string, answers: RisqueFaibleAnswers, bloc: string): number {
  if (operation === '0' || operation === 'x0') {
    return 0
  }

  // +N fixe
  if (operation.match(/^\+\d+$/)) {
    return parseInt(operation.replace('+', ''))
  }

  // +N par X
  if (operation.includes('par tranche')) {
    const mult = parseInt(operation.replace('+', '').split(' ')[0])
    const tranches = Math.floor(answers.bloc30_surface_m2 / 200)
    return mult * tranches
  }

  if (operation.includes('par mur')) {
    const mult = parseInt(operation.replace('+', '').split(' ')[0])
    return mult * answers.bloc40_walls_without_terrace
  }

  if (operation.includes('par zone')) {
    const mult = parseInt(operation.replace('+', '').split(' ')[0])
    return mult * answers.bloc50_green_zones
  }

  if (operation.includes('par extension')) {
    const mult = parseInt(operation.replace('+', '').split(' ')[0])
    return mult * answers.bloc70_extensions
  }

  return 0
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
    // 1. Charger les règles depuis algo_table
    // =====================================================

    const { data: algoRules, error: algoError } = await supabaseClient
      .from('algo_table')
      .select('*')
      .eq('rule_set_version', rule_set_version)
      .order('bloc', { ascending: true })

    if (algoError) {
      throw new Error(`Error fetching algo rules: ${algoError.message}`)
    }

    // =====================================================
    // 2. Évaluer les règles et appliquer l'algorithme
    // =====================================================

    let nbr_sonde = 0
    let nbr_sonde_double = 0
    const contributions: BlockContribution[] = []

    for (const rule of algoRules) {
      const bloc = rule.bloc
      const condition = rule.condition
      const nbr_sonde_rule = rule.nbr_sonde
      const nbr_sonde_double_rule = rule.nbr_sonde_double

      // Évaluer la condition pour ce bloc
      const conditionMet = evaluateCondition(bloc, condition, answers)

      if (!conditionMet) {
        continue
      }

      // Si la règle contient x0, c'est une condition bloquante
      if (nbr_sonde_rule === 'x0' && nbr_sonde_double_rule === 'x0') {
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              is_blocked: true,
              blocked_reason: rule.note || 'Pas de facturation possible',
              positive_message: rule.positive_message || null,
              risk_level,
              rule_set_version,
            },
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Appliquer les opérations de calcul
      const sondeToAdd = parseOperation(nbr_sonde_rule, answers, bloc)
      const sondeDoubleToAdd = parseOperation(nbr_sonde_double_rule, answers, bloc)

      nbr_sonde += sondeToAdd
      nbr_sonde_double += sondeDoubleToAdd

      contributions.push({
        bloc,
        rule_applied: `${rule.question}: ${condition}`,
        nbr_sonde: sondeToAdd,
        nbr_sonde_double: sondeDoubleToAdd,
        note: rule.note || '',
      })
    }

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
