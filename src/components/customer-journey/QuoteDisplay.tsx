import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowRight, ArrowLeft, Euro, Package, FileText } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'

const QuoteDisplay = () => {
  const { state, actions } = useCustomerJourney()
  const { quote } = state
  const riskLevel = quote.riskLevel || 'Faible'

  const handleGoBack = () => {
    actions.setStep('configuration')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Votre devis personnalisé
        </h1>
        <p className="text-lg text-gray-600">
          Évaluation {riskLevel} - Devis #{quote.quote_id}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Détail des quantités */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-6 h-6 text-blue-600" />
                  <span>Matériel nécessaire</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quote.quantities && (
                    <>
                      {quote.quantities.nbr_sonde > 0 && (
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Sondes simples</p>
                            <p className="text-sm text-gray-500">
                              {quote.quantities.nbr_sonde} × {quote.pricing?.sonde.toFixed(2)} €
                            </p>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {((quote.quantities.nbr_sonde || 0) * (quote.pricing?.sonde || 0)).toFixed(2)} €
                          </p>
                        </div>
                      )}

                      {quote.quantities.nbr_sonde_double > 0 && (
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Sondes doubles</p>
                            <p className="text-sm text-gray-500">
                              {quote.quantities.nbr_sonde_double} × {quote.pricing?.sonde_double.toFixed(2)} €
                            </p>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {((quote.quantities.nbr_sonde_double || 0) * (quote.pricing?.sonde_double || 0)).toFixed(2)} €
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Détail des contributions */}
          {quote.contributions && quote.contributions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <span>Détail du calcul</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quote.contributions.map((contrib, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                        <p className="font-medium text-gray-900">Bloc {contrib.bloc}: {contrib.rule_applied}</p>
                        <p className="text-sm text-gray-600">{contrib.note}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {contrib.nbr_sonde > 0 && `+${contrib.nbr_sonde} sonde(s) `}
                          {contrib.nbr_sonde_double > 0 && `+${contrib.nbr_sonde_double} sonde(s) double(s)`}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Carte de tarification */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-8">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Euro className="w-6 h-6 text-blue-600" />
                  <span>Total</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Montant total</div>
                  <div className="text-4xl font-bold text-gray-900">
                    {quote.totalEstimate?.toFixed(2)} €
                  </div>
                  <div className="text-sm text-gray-500 mt-2">TTC</div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="text-xs text-gray-500 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Installation incluse</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Garantie constructeur</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Support technique 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 flex justify-between items-center"
      >
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modifier mes réponses</span>
        </Button>

        <div className="text-sm text-gray-500">
          Algorithme version {quote.rule_set_version}
        </div>
      </motion.div>
    </div>
  )
}

export default QuoteDisplay