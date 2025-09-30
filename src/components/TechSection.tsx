import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Satellite, Settings, Droplets, Shield } from 'lucide-react'

const TechSection = () => {
  const steps = [
    {
      icon: Satellite,
      number: "1",
      title: "Analyse géotechnique connectée",
      description: "Données satellites, carte RGA, modélisation algorithmique : nous évaluons le comportement de l'argile chez vous."
    },
    {
      icon: Settings,
      number: "2",
      title: "Installation de sondes stabilisatrices",
      description: "Des sondes discrètes sont installées autour de la maison à 2–3 m de profondeur. Aucune reprise de fondation, aucun chantier lourd."
    },
    {
      icon: Droplets,
      number: "3",
      title: "Arrosage automatisé intelligent",
      description: "Le système ajuste l'humidité du sol en temps réel, en fonction des conditions météo, pour stabiliser durablement la structure."
    }
  ]

  const benefits = [
    { icon: Shield, text: "Préventif", desc: "évite l'apparition des premiers signes (fissures, désalignements)" },
    { icon: Settings, text: "Correctif", desc: "stabilise des maisons déjà touchées, limite l'aggravation, évite des travaux lourds" }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Une technologie connectée, conçue pour corriger comme prévenir les effets du retrait-gonflement.
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              TerraStab installe autour de la maison des <strong>sondes ancrées à faible profondeur</strong>, reliées à un <strong>système d'irrigation intelligent</strong>, lui-même connecté à nos serveurs.
              Piloté par un algorithme propriétaire, le système déclenche des <strong>arrosages ciblés</strong> qui maintiennent l'argile à un taux d'humidité stable — condition essentielle pour éviter les fissures ou stopper leur aggravation.
            </p>
          </div>
        </motion.div>

        {/* BRGM Origin Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="bg-blue-50 border-blue-200 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Une solution issue de la recherche publique française
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  TerraStab est née d'une étude menée par le <strong>BRGM</strong> (Bureau de Recherches Géologiques et Minières),
                  autorité nationale sur le comportement des sols argileux.
                  Nous poursuivons cette approche scientifique en la rendant accessible à grande échelle.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3 Steps Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Comment ça fonctionne
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{step.number}</span>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h4>

                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                <benefit.icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  ✅ {benefit.text}
                </h4>
                <p className="text-gray-600 text-sm">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TechSection