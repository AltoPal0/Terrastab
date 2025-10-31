import { motion } from 'framer-motion'
import { Zap, Target, Shield, Wrench } from 'lucide-react'

const MiniPromise = () => {
  const features = [
    { icon: Zap, text: "Technologie" },
    { icon: Target, text: "Précision" },
    { icon: Shield, text: "Accessibilité" },
    { icon: Wrench, text: "Durabilité" }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 px-2">
            TerraStab change la donne.
          </h2>

          <div className="max-w-4xl mx-auto px-2">
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              Grâce à une approche technologique inédite,
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
              <strong>stabiliser les sols n'est plus réservé aux chantiers lourds.</strong>
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
              Notre solution ouvre une nouvelle voie, <strong>accessible, précise et durable.</strong>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.15 * index,
                ease: "easeOut",
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-blue-100 group-hover:bg-blue-600 transition-colors duration-300 shadow-md group-hover:shadow-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{
                  scale: { duration: 0.2 },
                  rotate: { duration: 0.2 }
                }}
              >
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </motion.div>
              <p className="text-xs sm:text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MiniPromise