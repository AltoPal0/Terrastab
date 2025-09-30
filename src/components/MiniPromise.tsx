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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            TerraStab change la donne.
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
              Grâce à une approche technologique inédite,
            </p>
            <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">
              <strong>stabiliser les sols n'est plus réservé aux chantiers lourds.</strong>
            </p>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Notre solution ouvre une nouvelle voie, <strong>accessible, précise et durable.</strong>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-4 p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm font-medium text-gray-800">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default MiniPromise