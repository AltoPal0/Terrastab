import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Target } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'

const SecondCTA = () => {
  const { actions } = useCustomerJourney()

  const benefits = [
    { icon: Zap, text: "Rapide" },
    { icon: Target, text: "Scientifique" },
    { icon: CheckCircle, text: "Sur mesure" }
  ]

  return (
    <section
      className="py-32 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/maison_fissuree.jpg')"
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Protégez votre maison.
            <br />
            <span className="text-blue-400">Gratuitement, en 2 minutes.</span>
          </h2>

          <div className="max-w-3xl mx-auto mb-10">
            <p className="text-xl md:text-2xl text-white/95 mb-6 leading-relaxed">
              Découvrez si votre sol présente un risque, recevez des recommandations personnalisées,
              et accédez à une solution sur mesure.
            </p>
            <p className="text-lg md:text-xl font-semibold text-blue-300">
              <strong>100 % gratuit, sans engagement.</strong>
            </p>
          </div>
        </motion.div>

        {/* Benefits Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center space-x-12 mb-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center group"
            >
              <div className="p-4 bg-white/20 rounded-full mb-3 group-hover:bg-white/30 transition-colors duration-300">
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-white font-medium text-sm">✅ {benefit.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Button
            onClick={() => actions.setStep('address-entry')}
            size="lg"
            className="text-xl px-12 py-8 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group"
          >
            <span className="mr-3">🔍</span>
            Vérifiez votre risque gratuitement
            <span className="ml-3 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-white/80"
        >
          <p className="text-sm">
            Évaluation immédiate • Données officielles • Sans engagement
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default SecondCTA