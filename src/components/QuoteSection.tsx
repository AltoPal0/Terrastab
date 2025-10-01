import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { PRODUCT_CONFIG } from '@/lib/productConfig'
import { CheckCircle } from 'lucide-react'

const QuoteSection = () => {
  const [selectedSolution, setSelectedSolution] = useState<string>('')

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const solutions = [
    {
      ...PRODUCT_CONFIG['survey-light'],
      description: 'Surveillance simple et efficace',
      badge: 'Risque faible'
    },
    {
      ...PRODUCT_CONFIG['survey-plus'],
      description: 'Étude complète mur par mur',
      badge: 'Risque modéré'
    },
    {
      ...PRODUCT_CONFIG['shield'],
      description: 'Protection complète avec irrigation',
      badge: 'Risque fort'
    }
  ]

  return (
    <section id="devis" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Configurez votre solution en 4 étapes
          </h2>
          <p className="text-lg text-gray-600">
            Obtenez un devis précis adapté à votre maison
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Étape 1 : Choisissez votre offre
            </h3>
            <p className="text-gray-600 mb-6">
              Sélectionnez la solution adaptée à votre niveau de risque
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {solutions.map((solution) => {
                const IconComponent = solution.icon
                return (
                  <Card
                    key={solution.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedSolution === solution.id
                        ? `${solution.colors.cardBg} ${solution.colors.border} border-2 transform scale-105 shadow-xl`
                        : 'bg-white shadow-lg border border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSolution(solution.id)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className={`w-12 h-12 ${solution.colors.primary} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                        <IconComponent className={`w-6 h-6 ${solution.colors.text}`} />
                      </div>
                      <CardTitle className="text-lg font-bold mb-3">{solution.name}</CardTitle>
                      <p className="text-sm text-gray-600 mb-4">{solution.description}</p>
                      <span className={`inline-block px-3 py-2 rounded-full text-xs font-semibold ${solution.colors.primary} ${solution.colors.text}`}>
                        {solution.badge}
                      </span>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>

          {selectedSolution && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Prochaines étapes
              </h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">✓</span>
                  Étape 2 : Informations sur votre propriété
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">◯</span>
                  Étape 3 : Coordonnées de contact
                </div>
                <div className="flex items-center">
                  <span className="text-gray-400 mr-2">◯</span>
                  Étape 4 : Validation et envoi
                </div>
              </div>

              <Button
                className="mt-6 w-full"
                size="lg"
                onClick={() => scrollToSection('contact')}
              >
                Continuer vers l'étape 2
              </Button>
            </div>
          )}
        </div>

        {/* Installer Partnership Section */}
        <div className="mt-20 bg-blue-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Besoin d'un installateur ?
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              La solution TerraStab est conçue pour être <strong>facile à installer</strong> et accessible
              pour une installation en autonomie. Cependant, nous avons développé un partenariat avec{' '}
              <strong>Needhelp</strong> pour vous permettre de trouver un artisan qualifié à proximité
              de votre habitation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl mb-3">⏰</div>
              <h4 className="font-bold text-gray-900 mb-2">Devis sous 24h</h4>
              <p className="text-sm text-gray-600">
                Recevez jusqu'à 5 devis d'artisans qualifiés près de chez vous
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Satisfait ou remboursé</h4>
              <p className="text-sm text-gray-600">
                Installation garantie avec assurance AXA
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">👷</div>
              <h4 className="font-bold text-gray-900 mb-2">Artisans locaux</h4>
              <p className="text-sm text-gray-600">
                Professionnels vérifiés dans votre région
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button size="lg" className="mb-3">
              Demander un devis à un artisan partenaire
            </Button>
            <p className="text-sm text-gray-500">
              Service gratuit • Jusqu'à 5 devis • Artisans vérifiés
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default QuoteSection