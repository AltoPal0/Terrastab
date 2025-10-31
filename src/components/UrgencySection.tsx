import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TrendingUp, Home, Clock, AlertTriangle } from 'lucide-react'

const UrgencySection = () => {
  const openRiskModal = () => {
    window.dispatchEvent(new Event('openRiskModal'))
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
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 sm:mb-8 leading-tight px-2">
            Les argiles ne se stabilisent pas seules.
            <br />
            <span className="text-orange-400">Votre maison non plus.</span>
          </h2>

          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 px-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
              Les épisodes de sécheresse sont plus longs, plus fréquents, et plus intenses.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-4 sm:mb-6">
              Cela aggrave mécaniquement le phénomène de retrait-gonflement — année après année.
            </p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-white">
              <strong>Stabiliser maintenant, c'est éviter des réparations lourdes… et une dévalorisation durable.</strong>
            </p>
          </div>
        </motion.div>

        {/* Statistics - Staggered Animation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.stat}
              initial={false}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.15 * (index + 1),
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className="text-center p-4 sm:p-6 md:p-8 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
            >
              <motion.div
                className="flex justify-center mb-4 sm:mb-6"
                initial={false}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 * (index + 1) + 0.2,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
              >
                <div className="p-3 sm:p-4 bg-orange-500/20 rounded-full">
                  <fact.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-orange-400" />
                </div>
              </motion.div>
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 mb-2 sm:mb-3"
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 * (index + 1) + 0.3
                }}
                viewport={{ once: true }}
              >
                {fact.stat}
              </motion.h3>
              <motion.p
                className="text-sm sm:text-base text-gray-300"
                initial={false}
                whileInView={{ opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 * (index + 1) + 0.4
                }}
                viewport={{ once: true }}
              >
                {fact.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Expert Quote - Fourth Dynamic Box */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, amount: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="bg-red-900/30 border border-red-800/50 rounded-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 text-center hover:border-red-700/70 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300"
        >
          <motion.div
            initial={false}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              type: "spring",
              stiffness: 200
            }}
            viewport={{ once: true }}
          >
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mx-auto mb-3 sm:mb-4" />
          </motion.div>
          <motion.blockquote
            className="text-sm sm:text-base md:text-lg lg:text-xl italic text-red-200 mb-3 sm:mb-4 px-2"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
          >
            "Un RGA non traité peut coûter jusqu'à 30 % de la valeur du bien"
          </motion.blockquote>
          <motion.cite
            className="text-xs sm:text-sm text-red-300"
            initial={false}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            — Expert en évaluation immobilière
          </motion.cite>
        </motion.div>

        {/* CTA - Final Dynamic Element */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, amount: 0.8 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={openRiskModal}
              size="lg"
              className="text-sm sm:text-base md:text-lg px-6 py-5 sm:px-8 sm:py-6 bg-orange-600 hover:bg-orange-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <span className="hidden sm:inline">Vérifiez votre risque maintenant</span>
              <span className="sm:hidden">Vérifier mon risque</span>
            </Button>
          </motion.div>
          <motion.p
            className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4 px-4"
            initial={false}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            viewport={{ once: true }}
          >
            Évaluation gratuite en 2 minutes
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

export default UrgencySection