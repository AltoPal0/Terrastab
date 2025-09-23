import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { PRODUCT_CONFIG } from '@/lib/productConfig'

const ProductCardsSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const products = [
    {
      ...PRODUCT_CONFIG['survey-light'],
      badge: 'Recommandé pour les risques faibles',
      specialBadge: undefined,
      description: 'Surveillance en continu grâce à 1 à 2 sondes propriétaires installées sur votre terrain. Analyse de la dessiccation jusqu\'à 1m20 et suivi de la vulnérabilité de votre maison face aux événements climatiques. Possibilité d\'ajouter des sondes pour des zones spécifiques (ex. végétation).',
      features: [
        'Surveillance en continu',
        'Analyse jusqu\'à 1m20',
        'Suivi météo et climat',
        'Extension possible avec sondes additionnelles'
      ],
      ctaText: 'Configurer ma solution\nSURVEY Light'
    },
    {
      ...PRODUCT_CONFIG['survey-plus'],
      badge: 'Recommandé pour les risques modérés',
      specialBadge: undefined,
      description: 'Un réseau de sondes propriétaires installé en périphérie du bâtiment pour une vision complète de la vulnérabilité de votre maison. Analyse en continu de la dessiccation jusqu\'à 1m20 et suivi de l\'ensemble du bâtiment face aux événements météo et climatiques.',
      features: [
        'Réseau de sondes autour du bâtiment',
        'Surveillance globale et continue',
        'Analyse jusqu\'à 1m20',
        'Détection préventive des vulnérabilités'
      ],
      ctaText: 'Configurer ma solution\nSURVEY+'
    },
    {
      ...PRODUCT_CONFIG['shield'],
      badge: 'Recommandé pour les risques forts',
      specialBadge: 'Solution complète',
      description: 'La solution complète Terrastab : un réseau de sondes en périphérie du bâtiment couplé à un système d\'irrigation intelligent. Stabilisation active du sol par régulation de l\'humidité pour éviter les mouvements de terrain et protéger durablement votre maison.',
      features: [
        'Réseau de sondes propriétaires',
        'Surveillance en continu et en temps réel',
        'Irrigation automatique par zones',
        'Prévention active des fissures'
      ],
      ctaText: 'Configurer ma solution\nSHIELD'
    }
  ]

  return (
    <section id="offres" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Des solutions adaptées à chaque niveau de risque RGA
          </h2>
          <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Terrastab propose trois niveaux de protection, en fonction de la vulnérabilité de votre maison face au retrait-gonflement des argiles. Plus le risque est élevé, plus la stabilisation active du sol est essentielle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => {
            const IconComponent = product.icon
            return (
              <Card key={product.id} className={`relative h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${product.colors.cardBg} ${product.colors.border}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-14 h-14 ${product.colors.primary} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                    <IconComponent className={`w-7 h-7 ${product.colors.text}`} />
                  </div>
                  <CardTitle className="text-xl font-bold mb-3 text-gray-900">{product.name}</CardTitle>
                  <div className="space-y-2">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${product.colors.primary} ${product.colors.text}`}>
                      {product.badge}
                    </span>
                    {product.specialBadge && (
                      <div>
                        <span className="inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
                          {product.specialBadge}
                        </span>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 px-5">
                  <CardDescription className="text-gray-600 mb-6 text-sm leading-relaxed text-justify">
                    {product.description}
                  </CardDescription>

                  <ul className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-xs text-gray-700">
                        <Check className="text-emerald-600 mr-2 mt-0.5 w-3 h-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 px-5 pb-5">
                  <Button
                    onClick={() => scrollToSection('devis')}
                    className={`w-full py-2 text-sm font-semibold ${product.colors.button} text-white border-0 whitespace-pre-line h-auto leading-tight`}
                    size="sm"
                  >
                    {product.ctaText}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProductCardsSection