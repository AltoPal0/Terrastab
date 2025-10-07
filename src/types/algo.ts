// Types pour le système d'algorithmes de calcul de devis

export type RiskLevel = 'faible' | 'moyen' | 'fort'

export type HousingType = 'Pavillon' | 'Maison mitoyenne' | 'Bâtiment industriel'

export type ContactMode = 'phone' | 'email' | 'gmail' | 'google' | 'linkedin' | 'apple'

// =====================================================
// Types pour les réponses utilisateur (Risque Faible v1)
// =====================================================

export interface RisqueFaibleAnswers {
  bloc00_housing_type: HousingType
  bloc10_has_basement: boolean
  bloc20_construction_year: number
  bloc30_surface_m2: number
  bloc40_walls_without_terrace: number
  bloc50_green_zones: number
  bloc50_green_zones_monitored: boolean
  bloc70_extensions: number
}

// Pour le moment, moyen et fort sont identiques à faible
export type RisqueMoyenAnswers = RisqueFaibleAnswers
export type RisqueFortAnswers = RisqueFaibleAnswers

export type AlgoAnswers = RisqueFaibleAnswers | RisqueMoyenAnswers | RisqueFortAnswers

// =====================================================
// Types pour les blocs de questions
// =====================================================

export interface QuestionBlock {
  bloc: string
  question: string
  type: 'radio' | 'number' | 'boolean'
  options?: { value: any; label: string }[]
  info: string
  field: keyof AlgoAnswers
}

// =====================================================
// Types pour les contributions (résultats intermédiaires)
// =====================================================

export interface BlockContribution {
  bloc: string
  rule_applied: string
  nbr_sonde: number
  nbr_sonde_double: number
  note: string
}

// =====================================================
// Types pour les résultats du calcul
// =====================================================

export interface QuoteCalculationResult {
  quote_id: string
  risk_level: RiskLevel
  rule_set_version: string
  contributions: BlockContribution[]
  quantities: {
    nbr_sonde: number
    nbr_sonde_double: number
    nbr_piquet_irrigation: number
    nbr_controller: number
  }
  pricing: {
    sonde: number
    sonde_double: number
    piquet_irrigation: number
    controller: number
  }
  devis_total: number
  is_blocked: boolean
  blocked_reason?: string
  positive_message?: string
}

// =====================================================
// Types pour les requêtes API
// =====================================================

export interface CalculateQuoteRequest {
  risk_level: RiskLevel
  rule_set_version: string
  answers: AlgoAnswers
  user_id?: string
}

export interface CalculateQuoteResponse {
  success: boolean
  data?: QuoteCalculationResult
  error?: string
}

// =====================================================
// Types pour les tables DB
// =====================================================

export interface AlgoRule {
  id: string
  rule_set_version: string
  bloc: string
  question: string
  condition: string
  nbr_sonde: string
  nbr_sonde_double: string
  note: string
  positive_message?: string
  created_at: string
}

export interface PriceBookItem {
  id: string
  rule_set_version: string
  item_type: 'sonde' | 'sonde_double' | 'piquet_irrigation' | 'controller'
  unit_price: number
  currency: string
  effective_at: string
  created_at: string
}

export interface Result {
  id: string
  user_id?: string
  risk_level: RiskLevel
  rule_set_version: string
  answers_json: AlgoAnswers
  contributions_json: BlockContribution[]
  nbr_sonde: number
  nbr_sonde_double: number
  nbr_piquet_irrigation: number
  nbr_controller: number
  devis_total: number
  quote_id: string
  created_at: string
}

export interface User {
  id: string
  contact_mode: ContactMode
  phone?: string
  email?: string
  external_id?: string
  created_at: string
  last_login?: string
  metadata?: Record<string, any>
}

export type InputType = 'boolean' | 'numeric' | 'select'

export interface QuestionOption {
  value: any
  label: string
}

export interface Question {
  id: string
  bloc: number
  rule_set_version: string
  question_text: string
  info_text: string
  input_type: InputType
  options_json?: QuestionOption[]
  order_index: number
  field_name: string
  created_at: string
}
