import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import AddressEntry from './AddressEntry'
import RecommendationDisplay from './RecommendationDisplay'
import AlgoQuestionnaire from './AlgoQuestionnaire'
import QuoteDisplay from './QuoteDisplay'
import DepositPayment from './DepositPayment'
import PaymentConfirmation from './PaymentConfirmation'

const CustomerJourney = () => {
  const { state } = useCustomerJourney()

  switch (state.currentStep) {
    case 'address-entry':
      return <AddressEntry />
    case 'recommendation':
      return <RecommendationDisplay />
    case 'configuration':
      return <AlgoQuestionnaire />
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