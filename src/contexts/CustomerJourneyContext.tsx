import React, { createContext, useContext, useReducer } from 'react'
import type { ReactNode } from 'react'

// Temporary inline types to resolve import issue
type CustomerJourneyStep =
  | 'idle'
  | 'address-entry'
  | 'recommendation'
  | 'configuration'
  | 'quote'
  | 'payment'
  | 'confirmation'

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
  recommendedSolution: string
  depositAmount: number
  estimatedDelivery: string
  totalEstimate?: number
  features: string[]
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
  configuration: Partial<CustomerConfiguration>
  quote: Partial<QuoteDetails>
  payment: Partial<PaymentDetails>
  progress: number
}

type CustomerJourneyAction =
  | { type: 'SET_STEP'; payload: CustomerJourneyStep }
  | { type: 'SET_RISK_RESULT'; payload: any }
  | { type: 'UPDATE_CONFIGURATION'; payload: Partial<CustomerConfiguration> }
  | { type: 'SET_QUOTE'; payload: Partial<QuoteDetails> }
  | { type: 'UPDATE_PAYMENT'; payload: Partial<PaymentDetails> }
  | { type: 'RESET_JOURNEY' }
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }

const initialState: CustomerJourneyState = {
  currentStep: 'idle',
  riskAssessmentResult: null,
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
        riskAssessmentResult: action.payload,
        currentStep: 'recommendation',
        progress: calculateProgress('recommendation')
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

  const actions = {
    setStep: (step: CustomerJourneyStep) => dispatch({ type: 'SET_STEP', payload: step }),
    setRiskResult: (result: any) => dispatch({ type: 'SET_RISK_RESULT', payload: result }),
    updateConfiguration: (config: Partial<CustomerConfiguration>) => dispatch({ type: 'UPDATE_CONFIGURATION', payload: config }),
    setQuote: (quote: Partial<QuoteDetails>) => dispatch({ type: 'SET_QUOTE', payload: quote }),
    updatePayment: (payment: Partial<PaymentDetails>) => dispatch({ type: 'UPDATE_PAYMENT', payload: payment }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    previousStep: () => dispatch({ type: 'PREVIOUS_STEP' }),
    resetJourney: () => dispatch({ type: 'RESET_JOURNEY' })
  }

  return (
    <CustomerJourneyContext.Provider value={{ state, dispatch, actions }}>
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