import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Download,
  Home,
  ArrowRight
} from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'

const PaymentConfirmation = () => {
  const { state, actions } = useCustomerJourney()

  const handleNewProject = () => {
    actions.resetJourney()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Félicitations !
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Votre projet TerraStab est maintenant lancé
        </p>
        <p className="text-lg text-gray-500">
          Commande #{state.payment.transactionId}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="w-6 h-6" />
                <span>Récapitulatif de votre commande</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Solution</span>
                <span className="font-medium">{state.quote.recommendedSolution}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Niveau de risque</span>
                <span className="font-medium">{state.riskAssessmentResult?.riskData?.level}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Adresse</span>
                <span className="font-medium text-right text-sm">
                  {state.riskAssessmentResult?.address}
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Acompte versé</span>
                  <span className="font-bold text-green-600">{state.payment.amount} €</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total du projet</span>
                  <span className="font-medium">{state.quote.totalEstimate?.toLocaleString()} € TTC</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center space-x-2 text-blue-800">
                <Calendar className="w-6 h-6" />
                <span>Prochaines étapes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Confirmation par email</h4>
                    <p className="text-sm text-gray-600">
                      Vous recevrez un email de confirmation dans les prochaines minutes
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Contact de notre équipe</h4>
                    <p className="text-sm text-gray-600">
                      Un expert vous contactera sous 48h pour programmer l'intervention
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Installation</h4>
                    <p className="text-sm text-gray-600">
                      Installation prévue dans {state.quote.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Email de confirmation
            </h3>
            <p className="text-sm text-gray-600">
              Vérifiez votre boîte email pour tous les détails
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Support client
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Une question ? Contactez-nous
            </p>
            <p className="text-sm font-medium text-green-600">
              01 23 45 67 89
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Download className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Documentation
            </h3>
            <p className="text-sm text-gray-600">
              Guide d'utilisation et garanties
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="text-center space-y-6"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Merci de votre confiance !
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Votre maison sera bientôt protégée par la technologie TerraStab.
            Notre équipe d'experts prendra contact avec vous très prochainement
            pour finaliser tous les détails de votre installation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleGoHome}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Button>

          <Button
            onClick={handleNewProject}
            variant="outline"
            size="lg"
            className="px-8 py-3"
          >
            Nouveau projet
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <p className="text-sm text-gray-500">
          🔒 Paiement sécurisé • ✉️ Confirmation envoyée • 📞 Support disponible 7j/7
        </p>
      </motion.div>
    </div>
  )
}

export default PaymentConfirmation