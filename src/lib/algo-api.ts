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
  userId?: string
): Promise<CalculateQuoteResponse> {
  try {
    const request: CalculateQuoteRequest = {
      risk_level: riskLevel,
      rule_set_version: 'v1.0',
      answers,
      user_id: userId,
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
