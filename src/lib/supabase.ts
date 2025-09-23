import { createClient } from '@supabase/supabase-js'
import type { RiskCheckRequest, RiskCheckResponse } from '@/types/risk-assessment'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Risk assessment API client
export const riskAssessmentApi = {
  async checkRisk(address: string): Promise<RiskCheckResponse> {
    const { data, error } = await supabase.functions.invoke('risk-assessment', {
      body: { address } as RiskCheckRequest
    })

    if (error) {
      console.error('Supabase function error:', error)
      throw new Error(error.message || 'Erreur lors de la vérification du risque')
    }

    return data as RiskCheckResponse
  }
}