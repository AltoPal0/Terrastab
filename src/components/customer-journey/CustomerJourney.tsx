import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import RecommendationDisplay from './RecommendationDisplay'
import Configurator from './Configurator'
import QuoteDisplay from './QuoteDisplay'
import DepositPayment from './DepositPayment'
import PaymentConfirmation from './PaymentConfirmation'

const CustomerJourney = () => {
  const { state } = useCustomerJourney()

  switch (state.currentStep) {
    case 'recommendation':
      return <RecommendationDisplay />
    case 'configuration':
      return <Configurator />
    case 'quote':
      return <QuoteDisplay />
    case 'payment':
      return <DepositPayment />
    case 'confirmation':
      return <PaymentConfirmation />
    default:
      return null
  }
}

export default CustomerJourney