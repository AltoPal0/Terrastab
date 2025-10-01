import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, Shield, Eye, Wrench } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'

const RecommendationDisplay = () => {
  const { state, actions } = useCustomerJourney()
  const riskData = state.riskAssessmentResult?.riskData

  if (!riskData) {
    return null
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Faible':
        return <CheckCircle className="w-16 h-16 text-green-600" />
      case 'Moyen':
        return <AlertTriangle className="w-16 h-16 text-orange-600" />
      case 'Élevé':
        return <XCircle className="w-16 h-16 text-red-600" />
      default:
        return <AlertTriangle className="w-16 h-16 text-gray-600" />
    }
  }

  const getRecommendationContent = (level: string) => {
    switch (level) {
      case 'Faible':
        return {
          title: "Bonne nouvelle ! Votre risque est faible",
          message: "Votre zone présente un risque limité de retrait-gonflement des argiles. Une surveillance préventive suffit pour protéger votre patrimoine.",
          solution: "SURVEY Light",
          description: "Monitoring préventif avec alertes en temps réel",
          icon: Eye,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200"
        }
      case 'Moyen':
        return {
          title: "Attention : risque modéré détecté",
          message: "Votre zone présente un risque modéré. Une stabilisation légère combinée à un monitoring continu vous protégera efficacement.",
          solution: "SURVEY+",
          description: "Monitoring + Stabilisation légère préventive",
          icon: Shield,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200"
        }
      case 'Élevé':
        return {
          title: "Risque élevé : action recommandée",
          message: "Votre zone présente un risque important. Une stabilisation complète avec monitoring continu est nécessaire pour protéger votre maison.",
          solution: "SHIELD",
          description: "Stabilisation complète + Monitoring avancé",
          icon: Wrench,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200"
        }
      default:
        return {
          title: "Évaluation personnalisée",
          message: "Nous analysons votre situation pour vous proposer la meilleure solution.",
          solution: "Solution personnalisée",
          description: "Adaptée à votre situation spécifique",
          icon: Shield,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200"
        }
    }
  }

  const recommendation = getRecommendationContent(riskData.level)

  const handleContinue = () => {
    actions.setStep('configuration')
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
          Votre évaluation personnalisée
        </h1>
        <p className="text-lg text-gray-600">
          Basée sur l'analyse de votre adresse : {state.riskAssessmentResult?.address}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="mb-8"
      >
        <Card className={`${recommendation.borderColor} border-2 ${recommendation.bgColor}`}>
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                {getRiskIcon(riskData.level)}
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {recommendation.title}
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
                {recommendation.message}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className={`p-3 rounded-full ${recommendation.bgColor}`}>
                    <recommendation.icon className={`w-8 h-8 ${recommendation.color}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900">
                      Solution recommandée : {recommendation.solution}
                    </h3>
                    <p className="text-gray-600">
                      {recommendation.description}
                    </p>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleContinue}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  >
                    Configurer ma solution
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-center text-sm text-gray-500"
      >
        <p>
          ✓ Évaluation basée sur les données officielles Georisques.gouv.fr et BRGM
        </p>
      </motion.div>
    </div>
  )
}

export default RecommendationDisplay