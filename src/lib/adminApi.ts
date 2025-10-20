import { supabase } from './supabase'
import type { AdminAuthRequest, AdminAuthResponse, AdminStatsResponse, EvaluationsResponse } from '@/types/risk-assessment'

const ADMIN_TOKEN_KEY = 'terrastab_admin_token'

export const adminApi = {
  async authenticate(password: string): Promise<AdminAuthResponse> {
    try {
      console.log('Starting authentication with password length:', password.length)

      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { password } as AdminAuthRequest
      })

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Admin auth error:', error)
        return { success: false, error: error.message || 'Erreur d\'authentification' }
      }

      console.log('Authentication data received:', data)

      if (data && data.success && data.token) {
        console.log('Storing token in localStorage:', data.token)
        localStorage.setItem(ADMIN_TOKEN_KEY, data.token)
        console.log('Token stored, verifying:', localStorage.getItem(ADMIN_TOKEN_KEY))
      } else {
        console.error('Invalid response format:', data)
      }

      return data as AdminAuthResponse
    } catch (error) {
      console.error('Admin auth exception:', error)
      return { success: false, error: 'Erreur réseau' }
    }
  },

  async getStatistics(): Promise<AdminStatsResponse> {
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY)
      if (!token) {
        return { success: false, error: 'Non authentifié' }
      }

      // Go back to using supabase.functions.invoke which handles auth properly
      const { data, error } = await supabase.functions.invoke('admin-stats', {
        body: { token }
      })

      if (error) {
        console.error('Admin stats error:', error)
        if (error.message?.includes('unauthorized') || error.message?.includes('401')) {
          this.logout()
          return { success: false, error: 'Session expirée' }
        }
        return { success: false, error: error.message || 'Erreur lors de la récupération des statistiques' }
      }

      console.log('Stats data received:', data)
      return data as AdminStatsResponse
    } catch (error) {
      console.error('Admin stats exception:', error)
      return { success: false, error: 'Erreur réseau' }
    }
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(ADMIN_TOKEN_KEY)
  },

  logout(): void {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
  },

  getToken(): string | null {
    return localStorage.getItem(ADMIN_TOKEN_KEY)
  },

  async getEvaluations(): Promise<EvaluationsResponse> {
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY)
      if (!token) {
        return { success: false, error: 'Non authentifié' }
      }

      const { data, error } = await supabase.functions.invoke('admin-evaluations', {
        body: { token }
      })

      if (error) {
        console.error('Admin evaluations error:', error)
        if (error.message?.includes('unauthorized') || error.message?.includes('401')) {
          this.logout()
          return { success: false, error: 'Session expirée' }
        }
        return { success: false, error: error.message || 'Erreur lors de la récupération des évaluations' }
      }

      return data as EvaluationsResponse
    } catch (error) {
      console.error('Admin evaluations exception:', error)
      return { success: false, error: 'Erreur réseau' }
    }
  },

  async getLeads(): Promise<{ success: boolean; leads?: any[]; error?: string }> {
    try {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY)
      if (!token) {
        return { success: false, error: 'Non authentifié' }
      }

      const { data, error } = await supabase.functions.invoke('admin-leads', {
        body: { token }
      })

      if (error) {
        console.error('Admin leads error:', error)
        if (error.message?.includes('unauthorized') || error.message?.includes('401')) {
          this.logout()
          return { success: false, error: 'Session expirée' }
        }
        return { success: false, error: error.message || 'Erreur lors de la récupération des leads' }
      }

      return { success: true, leads: data.leads }
    } catch (error) {
      console.error('Admin leads exception:', error)
      return { success: false, error: 'Erreur réseau' }
    }
  }
}