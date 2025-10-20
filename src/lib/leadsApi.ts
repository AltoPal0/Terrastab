import { supabase } from './supabase'

export interface SaveLeadRequest {
  name: string
  email: string
  phone: string
  address?: string
  risk_level?: string
}

export interface SaveLeadResponse {
  success: boolean
  lead?: any
  error?: string
}

export const leadsApi = {
  async saveLead(leadData: SaveLeadRequest): Promise<SaveLeadResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('save-lead', {
        body: leadData
      })

      if (error) {
        console.error('Save lead error:', error)
        return { success: false, error: error.message || 'Erreur lors de l\'enregistrement' }
      }

      if (data && data.success) {
        return { success: true, lead: data.lead }
      }

      return { success: false, error: data?.error || 'Erreur inconnue' }
    } catch (error) {
      console.error('Save lead exception:', error)
      return { success: false, error: 'Erreur réseau' }
    }
  }
}
