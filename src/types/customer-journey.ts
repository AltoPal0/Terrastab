export type CustomerJourneyStep =
  | 'idle'
  | 'risk-assessment'
  | 'recommendation'
  | 'configuration'
  | 'quote'
  | 'payment'
  | 'confirmation'

export type HouseType =
  | 'maison-individuelle'
  | 'pavillon'
  | 'villa'
  | 'autre'

export type VisibleProblems =
  | 'aucun'
  | 'microfissures'
  | 'fissures-visibles'
  | 'fissures-importantes'
  | 'affaissements'

export interface CustomerConfiguration {
  houseType: HouseType
  constructionYear: number
  visibleProblems: VisibleProblems
  photos?: File[]
  needsAdvice: boolean
  contactPreference?: 'phone' | 'email'
  phoneNumber?: string
  email?: string
}

export interface QuoteDetails {
  riskLevel: 'Faible' | 'Moyen' | 'Élevé'
  recommendedSolution: string
  depositAmount: number
  estimatedDelivery: string
  totalEstimate?: number
  features: string[]
}

export interface PaymentDetails {
  amount: number
  method: 'stripe' | 'paypal' | 'virement'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  transactionId?: string
}

export interface CustomerJourneyState {
  currentStep: CustomerJourneyStep
  riskAssessmentResult: any | null
  configuration: Partial<CustomerConfiguration>
  quote: Partial<QuoteDetails>
  payment: Partial<PaymentDetails>
  progress: number
}

export const DEPOSIT_AMOUNTS = {
  'Faible': 199,
  'Moyen': 349,
  'Élevé': 399
} as const

export const SOLUTIONS_BY_RISK = {
  'Faible': 'SURVEY Light - Monitoring préventif',
  'Moyen': 'SURVEY+ - Monitoring + Stabilisation légère',
  'Élevé': 'SHIELD - Stabilisation complète + Monitoring'
} as const