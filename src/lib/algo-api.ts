// Service API pour le système d'algorithmes de calcul de devis

import { supabase } from './supabase'
import type {
  AlgoAnswers,
  CalculateQuoteRequest,
  CalculateQuoteResponse,
  RiskLevel,
} from '@/types/algo'

/**
 * Appelle l'Edge Function calculate-quote pour calculer un devis
 */
export async function calculateQuote(
  riskLevel: RiskLevel,
  answers: AlgoAnswers,
  userId?: string,
  address?: string,
  ruleSetVersion?: string
): Promise<CalculateQuoteResponse> {
  try {
    const request: CalculateQuoteRequest = {
      risk_level: riskLevel,
      rule_set_version: ruleSetVersion || 'v1.0-survey-light',
      answers,
      user_id: userId,
      address,
    }

    const { data, error } = await supabase.functions.invoke('calculate-quote', {
      body: request,
    })

    if (error) {
      console.error('Error calling calculate-quote function:', error)
      return {
        success: false,
        error: error.message || 'Erreur lors du calcul du devis',
      }
    }

    return data as CalculateQuoteResponse
  } catch (error) {
    console.error('Error in calculateQuote:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }
  }
}

/**
 * Récupère un devis par son quote_id
 */
export async function getQuoteById(quoteId: string) {
  try {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('quote_id', quoteId)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching quote:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }
  }
}

/**
 * Récupère tous les devis d'un utilisateur
 */
export async function getUserQuotes(userId: string) {
  try {
    const { data, error } = await supabase
      .from('results')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching user quotes:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }
  }
}

/**
 * Récupère les règles d'algorithme pour une version donnée
 */
export async function getAlgoRules(ruleSetVersion: string) {
  try {
    const { data, error } = await supabase
      .from('algo_table')
      .select('*')
      .eq('rule_set_version', ruleSetVersion)
      .order('bloc', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching algo rules:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }
  }
}

/**
 * Récupère les prix unitaires pour une version donnée
 */
export async function getPriceBook(ruleSetVersion: string) {
  try {
    const { data, error } = await supabase
      .from('price_book')
      .select('*')
      .eq('rule_set_version', ruleSetVersion)

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching price book:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }
  }
}

/**
 * Récupère les questions pour une version donnée et un niveau de risque
 */
export async function getQuestions(ruleSetVersion: string, riskLevel?: RiskLevel) {
  try {
    let query = supabase
      .from('questions')
      .select('*')
      .eq('rule_set_version', ruleSetVersion)

    // Filtrer par niveau de risque si spécifié
    if (riskLevel) {
      const riskLevelNumber = riskLevel === 'faible' ? 1 : riskLevel === 'moyen' ? 2 : 3
      query = query.contains('risk_levels', [riskLevelNumber])
    }

    const { data, error } = await query
      .order('bloc', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching questions:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }
  }
}

/**
 * Récupère les règles bloquantes pour une version donnée et un niveau de risque
 */
export async function getBlockingRules(ruleSetVersion: string, riskLevel?: RiskLevel) {
  try {
    let query = supabase
      .from('algo_table')
      .select('*')
      .eq('rule_set_version', ruleSetVersion)
      .eq('nbr_sonde', 'x0')
      .eq('nbr_sonde_double', 'x0')

    // Filtrer par niveau de risque si spécifié
    if (riskLevel) {
      const riskLevelNumber = riskLevel === 'faible' ? 1 : riskLevel === 'moyen' ? 2 : 3
      query = query.contains('risk_levels', [riskLevelNumber])
    }

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching blocking rules:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    }
  }
}
