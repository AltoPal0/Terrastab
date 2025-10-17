import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, Shield, Eye, Wrench, Radio, BarChart3, Check, Sparkles } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'

type ProductType = 'survey-light' | 'survey-plus' | 'shield'

interface Product {
  id: ProductType
  name: string
  icon: typeof Radio
  price: number
  description: string
  features: string[]
  colors: {
    primary: string
    text: string
    cardBg: string
    border: string
    button: string
  }
  recommended: boolean
}

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

  // Déterminer la solution recommandée selon le niveau de risque
  const getRecommendedProduct = (risk: string): ProductType => {
    switch (risk) {
      case 'Faible':
        return 'survey-light'
      case 'Élevé':
        return 'shield'
      default:
        return 'survey-plus'
    }
  }

  const recommendedProductId = getRecommendedProduct(riskData.level)

  const products: Product[] = [
    {
      id: 'survey-light',
      name: 'SURVEY Light',
      icon: Radio,
      price: 400,
      description: 'Surveillance en continu grâce à 1 à 2 sondes propriétaires installées sur votre terrain. Idéal pour une surveillance préventive.',
      features: [
        'Surveillance en continu',
        'Analyse jusqu\'à 1m20',
        'Suivi météo et climat',
        'Extension possible avec sondes additionnelles'
      ],
      colors: {
        primary: 'bg-amber-100',
        text: 'text-amber-900',
        cardBg: 'bg-gradient-to-br from-amber-50 to-amber-100',
        border: 'border-amber-300',
        button: 'bg-amber-600 hover:bg-amber-700'
      },
      recommended: recommendedProductId === 'survey-light'
    },
    {
      id: 'survey-plus',
      name: 'SURVEY+',
      icon: BarChart3,
      price: 800,
      description: 'Un réseau de sondes propriétaires en périphérie du bâtiment pour une vision complète. Surveillance globale et préventive.',
      features: [
        'Réseau de sondes autour du bâtiment',
        'Surveillance globale et continue',
        'Analyse jusqu\'à 1m20',
        'Détection préventive des vulnérabilités'
      ],
      colors: {
        primary: 'bg-blue-100',
        text: 'text-blue-900',
        cardBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
        border: 'border-blue-300',
        button: 'bg-blue-600 hover:bg-blue-700'
      },
      recommended: recommendedProductId === 'survey-plus'
    },
    {
      id: 'shield',
      name: 'SHIELD',
      icon: Shield,
      price: 1500,
      description: 'La solution complète : réseau de sondes + système d\'irrigation intelligent. Stabilisation active pour une protection maximale.',
      features: [
        'Réseau de sondes propriétaires',
        'Surveillance en continu et en temps réel',
        'Irrigation automatique par zones',
        'Prévention active des fissures'
      ],
      colors: {
        primary: 'bg-emerald-100',
        text: 'text-emerald-900',
        cardBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
        border: 'border-emerald-300',
        button: 'bg-emerald-600 hover:bg-emerald-700'
      },
      recommended: recommendedProductId === 'shield'
    }
  ]

  const handleSelectProduct = (productId: ProductType) => {
    actions.setProduct(productId)
    actions.setStep('configuration')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* En-tête avec résultat du risque */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12"
      >
        <Card className={`${recommendation.borderColor} border-2 ${recommendation.bgColor}`}>
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                {getRiskIcon(riskData.level)}
              </motion.div>

              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {recommendation.title}
              </h1>

              <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mb-2">
                {recommendation.message}
              </p>

              <p className="text-sm text-gray-500">
                Basé sur l'analyse de votre adresse : {state.riskAssessmentResult?.address}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section des 3 solutions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Choisissez votre solution TerraStab
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Nous recommandons <span className="font-semibold text-blue-600">{products.find(p => p.recommended)?.name}</span> pour votre niveau de risque, mais vous êtes libre de choisir la solution adaptée à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card
                  className={`relative h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${product.colors.cardBg} ${product.colors.border} ${product.recommended ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
                >
                  {product.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold bg-blue-600 text-white shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        Recommandé
                      </span>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4 pt-8">
                    <div className={`w-16 h-16 ${product.colors.primary} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                      <IconComponent className={`w-8 h-8 ${product.colors.text}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold mb-2 text-gray-900">{product.name}</CardTitle>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      À partir de {product.price} €
                    </div>
                    <p className="text-sm text-gray-500">Prix indicatif TTC</p>
                  </CardHeader>

                  <CardContent className="flex-1 px-6 pb-6">
                    <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                      {product.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start text-sm text-gray-700">
                          <Check className="text-emerald-600 mr-2 mt-0.5 w-4 h-4 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleSelectProduct(product.id)}
                      className={`w-full py-6 text-base font-semibold ${product.colors.button} text-white`}
                    >
                      Choisir {product.name}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Informations complémentaires */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8"
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">?</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Besoin d'aide pour choisir ?
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Notre recommandation est basée sur votre niveau de risque ({riskData.level}), mais vous êtes libre de choisir la solution qui correspond le mieux à vos besoins et à votre budget.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>SURVEY Light :</strong> Pour une surveillance préventive simple</li>
              <li><strong>SURVEY+ :</strong> Pour une surveillance complète du bâtiment</li>
              <li><strong>SHIELD :</strong> Pour une protection active avec irrigation</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="text-center text-sm text-gray-500"
      >
        <p>
          ✓ Évaluation basée sur les données officielles Georisques.gouv.fr et BRGM
        </p>
        <p className="mt-2">
          Les prix finaux seront calculés selon votre configuration
        </p>
      </motion.div>
    </div>
  )
}

export default RecommendationDisplay