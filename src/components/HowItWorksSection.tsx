import { Card, CardContent } from '@/components/ui/card'
import { AlertTriangle, Settings, FileText, Home } from 'lucide-react'

const HowItWorksSection = () => {
  const steps = [
    {
      number: 'ÉTAPE 1',
      Icon: AlertTriangle,
      title: 'Évaluez votre niveau de risque',
      description: 'Test gratuit en ligne basé sur les données officielles Georisques.',
      highlight: 'Résultat immédiat',
      additionalText: 'pour connaître votre exposition au RGA.',
      iconColor: 'text-red-500'
    },
    {
      number: 'ÉTAPE 2',
      Icon: Settings,
      title: 'Préconfigurez votre solution',
      description: 'Choisissez entre SURVEY Light, SURVEY+ ou SHIELD selon votre niveau de risque.',
      highlight: 'Estimation de prix immédiate',
      additionalText: '',
      iconColor: 'text-blue-500'
    },
    {
      number: 'ÉTAPE 3',
      Icon: FileText,
      title: 'Recevez un devis sous 24h',
      description: 'Devis détaillé personnalisé pour votre terrain.',
      highlight: 'Option artisan Needhelp',
      additionalText: 'pour les travaux complémentaires.',
      iconColor: 'text-orange-500'
    },
    {
      number: 'ÉTAPE 4',
      Icon: Home,
      title: 'Installez et protégez votre maison',
      description: 'Package livré prêt à poser par nos experts.',
      highlight: 'Suivi intelligent en continu',
      additionalText: 'pour une protection durable.',
      note: 'Si besoin, mise en relation avec un artisan qualifié via notre partenaire Needhelp.',
      iconColor: 'text-green-500'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Comment ça marche ?
          </h2>
          <h3 className="text-xl md:text-2xl text-gray-700 mb-6">
            Un parcours simple, adapté à votre maison
          </h3>
          <p className="text-lg text-gray-600">
            Tout commence par l'évaluation de votre niveau de risque.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => {
            const { Icon } = step
            return (
              <Card key={index} className="text-center h-full bg-white shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center ${step.iconColor}`}>
                      <Icon size={32} />
                    </div>
                    <div className="text-sm font-bold text-blue-600 mb-2">{step.number}</div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                    {step.highlight && (
                      <>
                        {' '}
                        <strong className="text-gray-900">{step.highlight}</strong>
                        {step.additionalText && ` ${step.additionalText}`}
                      </>
                    )}
                  </p>
                  {step.note && (
                    <p className="text-xs text-gray-500 italic mt-4 pt-4 border-t border-gray-200">
                      {step.note}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Process Flow Diagram */}
        <div className="flex items-center justify-center mb-16 overflow-x-auto px-4">
          <div className="flex items-center space-x-3 md:space-x-4 min-w-max">
            {/* Step 1 Line */}
            <div className="h-2 w-16 md:w-24 bg-red-500 rounded-full"></div>
            {/* Arrow 1 */}
            <div className="text-red-500 text-xl md:text-2xl font-bold">→</div>
            {/* Step 2 Line */}
            <div className="h-2 w-16 md:w-24 bg-blue-500 rounded-full"></div>
            {/* Arrow 2 */}
            <div className="text-blue-500 text-xl md:text-2xl font-bold">→</div>
            {/* Step 3 Line */}
            <div className="h-2 w-16 md:w-24 bg-orange-500 rounded-full"></div>
            {/* Arrow 3 */}
            <div className="text-orange-500 text-xl md:text-2xl font-bold">→</div>
            {/* Step 4 Line */}
            <div className="h-2 w-16 md:w-24 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Reassurance Message */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center space-x-4">
            <Home className="text-blue-600" size={32} />
            <div className="text-left">
              <span className="font-bold text-gray-900">Rassurant : </span>
              <span className="text-gray-700">
                Chaque étape est guidée et nos experts vous accompagnent pour choisir la solution parfaitement adaptée à votre maison.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection