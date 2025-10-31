import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Target, MapPin, ArrowRight } from 'lucide-react'

const SecondCTA = () => {
  const openRiskModal = () => {
    window.dispatchEvent(new Event('openRiskModal'))
  }

  const benefits = [
    { icon: Zap, text: "Rapide" },
    { icon: Target, text: "Prouvé" },
    { icon: CheckCircle, text: "Sur mesure" }
  ]

  return (
    <section
      className="py-20 sm:py-24 md:py-32 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/maison_fissuree.jpg')"
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
            Protégez votre maison.
            <br />
            <span className="text-blue-400">Gratuitement, en 2 minutes.</span>
          </h2>

          <div className="max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-2">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-4 sm:mb-6 leading-relaxed">
              Découvrez si votre sol présente un risque, recevez des recommandations personnalisées,
              et accédez à une solution sur mesure.
            </p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-blue-300">
              <strong>100 % gratuit, sans engagement.</strong>
            </p>
          </div>
        </motion.div>

        {/* Benefits Icons */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center space-x-6 sm:space-x-8 md:space-x-12 mb-8 sm:mb-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <div className="p-2.5 sm:p-3 md:p-4 bg-white/20 rounded-full mb-2 sm:mb-3 group-hover:bg-white/30 transition-colors duration-300">
                <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white mr-1" />
                <span className="text-white font-medium text-xs sm:text-sm">{benefit.text}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8"
        >
          <Button
            onClick={openRiskModal}
            size="lg"
            className="text-sm sm:text-base md:text-lg lg:text-xl px-6 py-5 sm:px-8 sm:py-6 md:px-12 md:py-8 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
            <span>Testez votre risque RGA</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-white/80"
        >
          <p className="text-xs sm:text-sm px-4">
            Évaluation immédiate • Données officielles • Sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SecondCTA