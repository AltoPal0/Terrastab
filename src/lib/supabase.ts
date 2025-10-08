import { createClient } from '@supabase/supabase-js'
import type { RiskCheckRequest, RiskCheckResponse } from '@/types/risk-assessment'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Risk assessment API client
export const riskAssessmentApi = {
  async checkRisk(address: string): Promise<RiskCheckResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('risk-assessment', {
        body: { address } as RiskCheckRequest
      })

      // Handle Supabase-level errors (network, auth, etc.)
      if (error) {
        console.error('Supabase function error:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        console.log('Data despite error:', data)

        // Try to extract error message from various properties
        let errorMessage = 'Erreur lors de la vérification du risque'

        // First, check if data contains the error response (common with 4xx/5xx responses)
        if (data && typeof data === 'object' && 'error' in data) {
          console.log('Error found in data:', data.error)
          errorMessage = data.error as string

          // Include debug information in development
          if ('debug' in data && data.debug && import.meta.env.DEV) {
            errorMessage += `\n\nDebug: ${data.debug}`
          }

          throw new Error(errorMessage)
        }

        // Check if there's a response body with error details
        if (error.context?.body) {
          try {
            let errorBody

            if (error.context.body instanceof ReadableStream) {
              // Handle ReadableStream case
              const reader = error.context.body.getReader()
              const decoder = new TextDecoder()
              let bodyText = ''

              // Read the stream
              const { value } = await reader.read()
              if (value) {
                bodyText = decoder.decode(value)
              }

              errorBody = JSON.parse(bodyText)
            } else if (typeof error.context.body === 'string') {
              errorBody = JSON.parse(error.context.body)
            } else {
              errorBody = error.context.body
            }

            console.log('Parsed error body:', errorBody)

            if (errorBody.error) {
              errorMessage = errorBody.error

              // Include debug information in development
              if (errorBody.debug && import.meta.env.DEV) {
                errorMessage += `\n\nDebug: ${errorBody.debug}`
              }
            }
          } catch (parseError) {
            console.warn('Could not parse error body:', parseError)
          }
        }

        // Note: data error handling moved above for priority

        // Fallback to standard error properties
        if (errorMessage === 'Erreur lors de la vérification du risque') {
          if (error.message && !error.message.includes('non-2xx status code')) {
            errorMessage = error.message
          } else if (error.details) {
            errorMessage = error.details
          } else if (error.hint) {
            errorMessage = error.hint
          }
        }

        // Add context based on error details
        if (error.details?.includes('timeout') || error.message?.includes('timeout')) {
          errorMessage = 'Service temporairement indisponible (timeout). Veuillez réessayer dans quelques instants.'
        } else if (error.details?.includes('network') || error.message?.includes('network')) {
          errorMessage = 'Problème de connexion réseau. Vérifiez votre connexion internet.'
        }

        throw new Error(errorMessage)
      }

      // Handle function response errors (when function returns error in data)
      if (data && !data.success) {
        console.error('Function returned error:', data.error)

        let errorMessage = data.error || 'Erreur lors de la vérification du risque'

        // Include debug information in development
        if (data.debug && import.meta.env.DEV) {
          errorMessage += `\n\nDebug: ${data.debug}`
        }

        throw new Error(errorMessage)
      }

      return data as RiskCheckResponse

    } catch (err) {
      // If it's already our custom error, re-throw it
      if (err instanceof Error) {
        throw err
      }

      // Handle any other unexpected errors
      console.error('Unexpected error during risk assessment:', err)
      throw new Error('Erreur inattendue lors de la vérification du risque')
    }
  }
}