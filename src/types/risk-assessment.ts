// Risk assessment API types
export interface RiskCheckRequest {
  address: string
}

export interface RiskCheckResponse {
  success: boolean
  address?: string
  coordinates?: {
    lat: number
    lng: number
  }
  riskData?: {
    level: string
    color: string
    width: string
    description: string
    commune?: string
    originalExposition?: string
  }
  error?: string
}

// Risk levels as constants
export const RISK_LEVELS = {
  FAIBLE: 'Faible',
  MOYEN: 'Moyen',
  ELEVE: 'Élevé'
} as const

export type RiskLevel = typeof RISK_LEVELS[keyof typeof RISK_LEVELS]

// Risk colors mapping
export const RISK_COLORS = {
  [RISK_LEVELS.FAIBLE]: 'green',
  [RISK_LEVELS.MOYEN]: 'orange',
  [RISK_LEVELS.ELEVE]: 'red'
} as const

// Risk assessment UI state
export interface RiskAssessmentState {
  isLoading: boolean
  error: string | null
  result: RiskCheckResponse | null
  hasAssessed: boolean
}

// Supabase database types
export interface RiskAssessmentRecord {
  id: string
  created_at: string
  updated_at: string
  input_address: string
  formatted_address: string | null
  latitude: number | null
  longitude: number | null
  risk_level: RiskLevel
  risk_color: string
  risk_width: string
  risk_description: string
  commune: string | null
  original_exposition: string | null
  geocoding_success: boolean
  georisques_success: boolean
  error_message: string | null
  ip_address: string | null
  user_agent: string | null
}

// Admin types
export interface AdminAuthRequest {
  password: string
}

export interface AdminAuthResponse {
  success: boolean
  token?: string
  error?: string
}

export interface AdminStatsResponse {
  success: boolean
  data?: AdminStatistics
  error?: string
}

export interface AdminStatistics {
  totalAssessments: number
  riskDistribution: {
    [key in RiskLevel]: number
  }
  successRates: {
    geocodingSuccess: number
    georisquesSuccess: number
    overallSuccess: number
  }
  dailyTrends: Array<{
    date: string
    assessments: number
    successRate: number
  }>
  topCommunes: Array<{
    commune: string
    count: number
  }>
  errorAnalysis: {
    totalErrors: number
    errorTypes: Array<{
      error: string
      count: number
    }>
  }
  timeRange: {
    from: string
    to: string
  }
}