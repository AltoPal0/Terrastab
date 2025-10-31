import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Radio, BarChart3, Shield, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
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

const ProductSelection = () => {
  const { state, actions } = useCustomerJourney()
  const riskLevel = state.riskAssessmentResult?.riskData?.level || 'Moyen'

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

  const recommendedProductId = getRecommendedProduct(riskLevel)

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

  const handleGoBack = () => {
    actions.setStep('recommendation')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Choisissez votre solution TerraStab
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
          Trois niveaux de protection adaptés à vos besoins.
        </p>
        <p className="text-base text-gray-500 max-w-2xl mx-auto">
          Nous recommandons <span className="font-semibold text-blue-600">{products.find(p => p.recommended)?.name}</span> pour votre niveau de risque ({riskLevel}).
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {products.map((product, index) => {
          const IconComponent = product.icon
          return (
            <motion.div
              key={product.id}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`relative h-full flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${product.colors.cardBg} ${product.colors.border} ${product.recommended ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}`}
              >
                {product.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold bg-blue-600 text-white shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      Recommandé pour vous
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

      {/* Informations complémentaires */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
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
              Notre recommandation est basée sur votre niveau de risque ({riskLevel}), mais vous êtes libre de choisir la solution qui correspond le mieux à vos besoins et à votre budget.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>SURVEY Light :</strong> Pour une surveillance préventive simple</li>
              <li><strong>SURVEY+ :</strong> Pour une surveillance complète du bâtiment</li>
              <li><strong>SHIELD :</strong> Pour une protection active avec irrigation</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleGoBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </Button>

        <p className="text-sm text-gray-500">
          Les prix finaux seront calculés selon votre configuration
        </p>
      </div>
    </div>
  )
}

export default ProductSelection
