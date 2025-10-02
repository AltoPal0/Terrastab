import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  CreditCard,
  Banknote,
  Shield,
  CheckCircle,
  ArrowLeft,
  Loader2,
  Mail,
  Phone,
  Calendar,
  Euro
} from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'

const DepositPayment = () => {
  const { state, actions } = useCustomerJourney()
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | 'virement'>('stripe')
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [wantsCallBack, setWantsCallBack] = useState(false)

  const depositAmount = state.quote.depositAmount || 199

  const paymentMethods = [
    {
      value: 'stripe' as const,
      label: 'Carte bancaire',
      description: 'Paiement immédiat sécurisé',
      icon: CreditCard,
      popular: true
    },
    {
      value: 'paypal' as const,
      label: 'PayPal',
      description: 'Paiement avec votre compte PayPal',
      icon: CreditCard,
      popular: false
    },
    {
      value: 'virement' as const,
      label: 'Virement bancaire',
      description: 'Sous 2-3 jours ouvrés',
      icon: Banknote,
      popular: false
    }
  ]

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulation du processus de paiement
    try {
      actions.updatePayment({
        amount: depositAmount,
        method: paymentMethod,
        status: 'processing'
      })

      // Simuler une API de paiement
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Succès simulé
      actions.updatePayment({
        status: 'completed',
        transactionId: `TXN_${Date.now()}`
      })

      actions.setStep('confirmation')
    } catch (error) {
      actions.updatePayment({
        status: 'failed'
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGoBack = () => {
    actions.setStep('quote')
  }

  const canProceed = () => {
    return email && acceptedTerms && !isProcessing
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Finaliser votre commande
        </h1>
        <p className="text-lg text-gray-600">
          Sécurisez votre projet avec un acompte de {depositAmount} €
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <span>Informations de contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Adresse email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="mt-2"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Pour recevoir la confirmation et le suivi de votre projet
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="callback"
                    checked={wantsCallBack}
                    onCheckedChange={(checked) => setWantsCallBack(checked === true)}
                  />
                  <Label htmlFor="callback" className="text-sm">
                    Je souhaite être rappelé(e) pour finaliser les détails techniques
                  </Label>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                  <span>Mode de paiement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'stripe' | 'paypal' | 'virement')}>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.value}
                      className={`relative p-4 rounded-lg border-2 transition-colors ${
                        paymentMethod === method.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {method.popular && (
                        <span className="absolute -top-2 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                          Recommandé
                        </span>
                      )}
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={method.value} id={method.value} />
                        <method.icon className="w-6 h-6 text-gray-600" />
                        <div className="flex-1">
                          <Label htmlFor={method.value} className="font-medium cursor-pointer">
                            {method.label}
                          </Label>
                          <p className="text-sm text-gray-500">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {paymentMethod === 'virement' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg"
                  >
                    <h4 className="font-medium text-amber-900 mb-2">Virement bancaire</h4>
                    <p className="text-sm text-amber-800 mb-3">
                      Les coordonnées bancaires vous seront communiquées par email après validation de la commande.
                    </p>
                    <p className="text-xs text-amber-700">
                      ⚠️ Le projet ne démarrera qu'après réception du virement (2-3 jours ouvrés)
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                    className="mt-1"
                  />
                  <div className="flex-1 text-sm">
                    <Label htmlFor="terms" className="cursor-pointer">
                      J'accepte les{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        conditions générales de vente
                      </a>{' '}
                      et la{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        politique de confidentialité
                      </a>
                    </Label>
                    <p className="text-gray-500 mt-1">
                      En validant, vous acceptez le démarrage de votre projet TerraStab selon les modalités convenues.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Payment Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-8">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Euro className="w-6 h-6 text-blue-600" />
                  <span>Récapitulatif</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Solution</span>
                  <span className="font-medium">{state.quote.recommendedSolution}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Risque détecté</span>
                  <span className="font-medium">{state.riskAssessmentResult?.riskData?.level}</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total estimé</span>
                    <span className="font-medium">{state.quote.totalEstimate?.toLocaleString()} € TTC</span>
                  </div>

                  <div className="flex justify-between items-center font-bold text-lg mt-2">
                    <span>Acompte aujourd'hui</span>
                    <span className="text-blue-600">{depositAmount} €</span>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Solde à l'installation : {((state.quote.totalEstimate || 0) - depositAmount).toLocaleString()} €
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Diagnostic technique inclus</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Installation garantie</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Suivi client dédié</span>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!canProceed()}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Payer {depositAmount} €
                    </>
                  )}
                </Button>

                <div className="text-center text-xs text-gray-500 space-y-1">
                  <div className="flex items-center justify-center space-x-1">
                    <Shield className="w-3 h-3" />
                    <span>Paiement 100% sécurisé</span>
                  </div>
                  <p>Cryptage SSL & conformité PCI DSS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-8 flex justify-between items-center"
      >
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="flex items-center space-x-2"
          disabled={isProcessing}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour au devis</span>
        </Button>

        <div className="text-sm text-gray-500 flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>Livraison : {state.quote.estimatedDelivery}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Phone className="w-4 h-4" />
            <span>Support 7j/7</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DepositPayment