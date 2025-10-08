import { supabase } from './supabase'

export interface SaveQuoteRequest {
  auth_user_id: string
  quote_id: string
  user_email?: string
}

export interface SaveQuoteResponse {
  success: boolean
  quote_id?: string
  message?: string
  error?: string
}

export const quoteApi = {
  async saveQuote(request: SaveQuoteRequest): Promise<SaveQuoteResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('save-quote', {
        body: request
      })

      if (error) {
        console.error('Supabase function error:', error)
        throw new Error(error.message || 'Erreur lors de la sauvegarde du devis')
      }

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de la sauvegarde du devis')
      }

      return data as SaveQuoteResponse
    } catch (err) {
      console.error('Error saving quote:', err)
      throw err
    }
  }
}
