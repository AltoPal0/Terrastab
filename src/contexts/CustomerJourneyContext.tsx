import React, { createContext, useContext, useReducer, useMemo } from 'react'
import type { ReactNode } from 'react'

// Temporary inline types to resolve import issue
type CustomerJourneyStep =
  | 'idle'
  | 'address-entry'
  | 'recommendation'
  | 'product-selection'
  | 'configuration'
  | 'quote'
  | 'contact-capture'
  | 'payment'
  | 'confirmation'

type ProductType = 'survey-light' | 'survey-plus' | 'shield'

type HouseType =
  | 'maison-individuelle'
  | 'pavillon'
  | 'villa'
  | 'autre'

type VisibleProblems =
  | 'aucun'
  | 'microfissures'
  | 'fissures-visibles'
  | 'fissures-importantes'
  | 'affaissements'

interface CustomerConfiguration {
  houseType: HouseType
  constructionYear: number
  visibleProblems: VisibleProblems
  photos?: File[]
  needsAdvice: boolean
  contactPreference?: 'phone' | 'email'
  phoneNumber?: string
  email?: string
}

interface QuoteDetails {
  riskLevel: 'Faible' | 'Moyen' | 'Élevé'
  recommendedSolution?: string
  depositAmount?: number
  estimatedDelivery?: string
  totalEstimate?: number
  totalCost?: number
  features?: string[]
  // Nouvelles propriétés pour l'algo
  resultId?: string
  quote_id?: string
  rule_set_version?: string
  contributions?: Array<{
    bloc: string
    rule_applied: string
    nbr_sonde: number
    nbr_sonde_double: number
    note: string
  }>
  quantities?: {
    nbr_sonde: number
    nbr_sonde_double: number
    nbr_piquet_irrigation: number
    nbr_controller: number
  }
  pricing?: {
    sonde: number
    sonde_double: number
    piquet_irrigation: number
    controller: number
  }
}

interface PaymentDetails {
  amount: number
  method: 'stripe' | 'paypal' | 'virement'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  transactionId?: string
}

interface CustomerJourneyState {
  currentStep: CustomerJourneyStep
  riskAssessmentResult: any | null
  selectedProduct: ProductType | null
  configuration: Partial<CustomerConfiguration>
  quote: Partial<QuoteDetails>
  payment: Partial<PaymentDetails>
  progress: number
}

type CustomerJourneyAction =
  | { type: 'SET_STEP'; payload: CustomerJourneyStep }
  | { type: 'SET_RISK_RESULT'; payload: any }
  | { type: 'SET_PRODUCT'; payload: ProductType }
  | { type: 'UPDATE_CONFIGURATION'; payload: Partial<CustomerConfiguration> }
  | { type: 'SET_QUOTE'; payload: Partial<QuoteDetails> }
  | { type: 'UPDATE_PAYMENT'; payload: Partial<PaymentDetails> }
  | { type: 'RESET_JOURNEY' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }

const initialState: CustomerJourneyState = {
  currentStep: 'idle',
  riskAssessmentResult: null,
  selectedProduct: null,
  configuration: {},
  quote: {},
  payment: {},
  progress: 0
}

const stepOrder: CustomerJourneyStep[] = [
  'address-entry',
  'recommendation',
  'configuration',
  'quote',
  'contact-capture',
  'payment',
  'confirmation'
]

function calculateProgress(step: CustomerJourneyStep): number {
  const stepIndex = stepOrder.indexOf(step)
  return ((stepIndex + 1) / stepOrder.length) * 100
}

function customerJourneyReducer(state: CustomerJourneyState, action: CustomerJourneyAction): CustomerJourneyState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
        progress: calculateProgress(action.payload)
      }

    case 'SET_RISK_RESULT':
      return {
        ...state,
        riskAssessmentResult: action.payload
        // Ne pas changer currentStep automatiquement
        // L'utilisateur devra cliquer sur "Continuer" pour avancer
      }

    case 'SET_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload
      }

    case 'UPDATE_CONFIGURATION':
      return {
        ...state,
        configuration: { ...state.configuration, ...action.payload }
      }

    case 'SET_QUOTE':
      return {
        ...state,
        quote: { ...state.quote, ...action.payload }
      }

    case 'UPDATE_PAYMENT':
      return {
        ...state,
        payment: { ...state.payment, ...action.payload }
      }

    case 'NEXT_STEP':
      const currentIndex = stepOrder.indexOf(state.currentStep)
      const nextStep = stepOrder[currentIndex + 1]
      if (nextStep) {
        return {
          ...state,
          currentStep: nextStep,
          progress: calculateProgress(nextStep)
        }
      }
      return state

    case 'PREVIOUS_STEP':
      const prevIndex = stepOrder.indexOf(state.currentStep)
      const prevStep = stepOrder[prevIndex - 1]
      if (prevStep) {
        return {
          ...state,
          currentStep: prevStep,
          progress: calculateProgress(prevStep)
        }
      }
      return state

    case 'RESET_JOURNEY':
      return initialState

    default:
      return state
  }
}

interface CustomerJourneyContextType {
  state: CustomerJourneyState
  dispatch: React.Dispatch<CustomerJourneyAction>
  actions: {
    setStep: (step: CustomerJourneyStep) => void
    setRiskResult: (result: any) => void
    setProduct: (product: ProductType) => void
    updateConfiguration: (config: Partial<CustomerConfiguration>) => void
    setQuote: (quote: Partial<QuoteDetails>) => void
    updatePayment: (payment: Partial<PaymentDetails>) => void
    nextStep: () => void
    previousStep: () => void
    resetJourney: () => void
  }
}

const CustomerJourneyContext = createContext<CustomerJourneyContextType | undefined>(undefined)

export function CustomerJourneyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(customerJourneyReducer, initialState)

  const actions = useMemo(() => ({
    setStep: (step: CustomerJourneyStep) => dispatch({ type: 'SET_STEP', payload: step }),
    setRiskResult: (result: any) => dispatch({ type: 'SET_RISK_RESULT', payload: result }),
    setProduct: (product: ProductType) => dispatch({ type: 'SET_PRODUCT', payload: product }),
    updateConfiguration: (config: Partial<CustomerConfiguration>) => dispatch({ type: 'UPDATE_CONFIGURATION', payload: config }),
    setQuote: (quote: Partial<QuoteDetails>) => dispatch({ type: 'SET_QUOTE', payload: quote }),
    updatePayment: (payment: Partial<PaymentDetails>) => dispatch({ type: 'UPDATE_PAYMENT', payload: payment }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    previousStep: () => dispatch({ type: 'PREVIOUS_STEP' }),
    resetJourney: () => dispatch({ type: 'RESET_JOURNEY' })
  }), [dispatch])

  const value = useMemo(() => ({ state, dispatch, actions }), [state, dispatch, actions])

  return (
    <CustomerJourneyContext.Provider value={value}>
      {children}
    </CustomerJourneyContext.Provider>
  )
}

export function useCustomerJourney() {
  const context = useContext(CustomerJourneyContext)
  if (context === undefined) {
    throw new Error('useCustomerJourney must be used within a CustomerJourneyProvider')
  }
  return context
}