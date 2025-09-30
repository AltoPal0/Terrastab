import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TrendingUp, Home, Clock, AlertTriangle } from 'lucide-react'

const UrgencySection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const facts = [
    {
      icon: TrendingUp,
      stat: "1 maison sur 2",
      description: "dans les zones argileuses touchée d'ici 2030"
    },
    {
      icon: Home,
      stat: "Jusqu'à 30%",
      description: "de la valeur du bien peut être perdue"
    },
    {
      icon: Clock,
      stat: "Chaque année",
      description: "le risque s'aggrave avec le changement climatique"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Les argiles ne se stabilisent pas seules.
            <br />
            <span className="text-orange-400">Votre maison non plus.</span>
          </h2>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
              Les épisodes de sécheresse sont plus longs, plus fréquents, et plus intenses.
            </p>
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              Cela aggrave mécaniquement le phénomène de retrait-gonflement — année après année.
            </p>
            <p className="text-xl md:text-2xl font-semibold text-white">
              <strong>Stabiliser maintenant, c'est éviter des réparations lourdes… et une dévalorisation durable.</strong>
            </p>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {facts.map((fact, index) => (
            <motion.div
              key={fact.stat}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-center p-8 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-300"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-orange-500/20 rounded-full">
                  <fact.icon className="w-8 h-8 text-orange-400" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-orange-400 mb-3">
                {fact.stat}
              </h3>
              <p className="text-gray-300">
                {fact.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Expert Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-red-900/30 border border-red-800/50 rounded-lg p-8 mb-12 text-center"
        >
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <blockquote className="text-lg md:text-xl italic text-red-200 mb-4">
            "Un RGA non traité peut coûter jusqu'à 30 % de la valeur du bien"
          </blockquote>
          <cite className="text-sm text-red-300">— Expert en évaluation immobilière</cite>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            onClick={() => scrollToSection('risque')}
            size="lg"
            className="text-lg px-10 py-6 bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            🚨 Vérifiez votre risque maintenant
          </Button>
          <p className="text-sm text-gray-400 mt-4">
            Évaluation gratuite en 2 minutes
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default UrgencySection