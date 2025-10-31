import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, Triangle, Building, FileText, Landmark, ChevronDown } from 'lucide-react'

const ExpertQuotes = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const experts = [
    {
      name: "Dr. Martine Dubois",
      role: "Ingénieur géotechnicien",
      organization: "ENSA Lyon",
      quote: "L'approche TerraStab combine les données satellitaires avec une intervention ciblée. C'est une méthode prometteuse pour stabiliser les sols argileux de manière préventive.",
      icon: Triangle
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

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
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

        {/* Desktop: Grid with all quotes visible */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={expert.name}
              initial={false}
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

        {/* Mobile: Expandable cards */}
        <div className="md:hidden space-y-4">
          {experts.map((expert, index) => {
            const isExpanded = expandedIndex === index

            return (
              <motion.div
                key={expert.name}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Card
                  className={`border-gray-200 transition-all duration-300 ${isExpanded ? 'shadow-lg' : 'shadow'}`}
                  onClick={() => toggleExpand(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <expert.icon className="w-5 h-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-gray-900">{expert.name}</h3>
                          <p className="text-blue-600 font-medium text-sm">{expert.role}</p>
                          <p className="text-xs text-gray-500">{expert.organization}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-2"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={false}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="relative mt-4 pt-4 border-t border-gray-100">
                            <Quote className="absolute -top-2 left-0 w-6 h-6 text-blue-200" />
                            <blockquote className="text-gray-700 leading-relaxed pl-4 italic text-sm">
                              "{expert.quote}"
                            </blockquote>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ExpertQuotes