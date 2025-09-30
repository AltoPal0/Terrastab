import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, TestTube, Building, FileText, Landmark } from 'lucide-react'

const ExpertQuotes = () => {
  const experts = [
    {
      name: "Dr. Martine Dubois",
      role: "Ingénieur géotechnicien",
      organization: "ENSA Lyon",
      quote: "L'approche TerraStab combine les données satellitaires avec une intervention ciblée. C'est une méthode prometteuse pour stabiliser les sols argileux de manière préventive.",
      icon: TestTube
    },
    {
      name: "Jean-Claude Moreau",
      role: "Expert judiciaire",
      organization: "Cour d'Appel de Bordeaux",
      quote: "Les solutions traditionnelles sont souvent lourdes et coûteuses. TerraStab offre une alternative légère et accessible, particulièrement adaptée aux zones périurbaines.",
      icon: FileText
    },
    {
      name: "Sophie Rénard",
      role: "Architecte DPLG",
      organization: "Cabinet Rénard & Associés",
      quote: "J'intègre désormais TerraStab dans mes diagnostics globaux. La technologie connectée permet un suivi en temps réel de la stabilité des sols.",
      icon: Building
    },
    {
      name: "Michel Hartmann",
      role: "Géologue BRGM",
      organization: "Bureau de Recherches Géologiques",
      quote: "Dans les zones argileuses, la prévention est clé. TerraStab répond à un vrai besoin pour les propriétaires en zones rurales peu couvertes par les solutions classiques.",
      icon: Landmark
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Validé par les experts du secteur
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            TerraStab bénéficie de la reconnaissance d'experts reconnus dans les domaines du sol, du bâtiment,
            de l'expertise judiciaire et de la recherche géologique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-gray-200">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <expert.icon className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{expert.name}</h3>
                      <p className="text-blue-600 font-medium">{expert.role}</p>
                      <p className="text-sm text-gray-500">{expert.organization}</p>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-200" />
                    <blockquote className="text-gray-700 leading-relaxed pl-6 italic">
                      "{expert.quote}"
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExpertQuotes