import { motion } from 'framer-motion'
import { Award, MapPin, Zap, Building } from 'lucide-react'

const TrustLogos = () => {
  const supporters = [
    {
      name: "Région Nouvelle-Aquitaine",
      type: "Collectivité territoriale",
      icon: MapPin,
      color: "text-blue-600 bg-blue-100"
    },
    {
      name: "Bpifrance",
      type: "Banque publique d'investissement",
      icon: Building,
      color: "text-green-600 bg-green-100"
    },
    {
      name: "La French Tech",
      type: "Label innovation nationale",
      icon: Zap,
      color: "text-purple-600 bg-purple-100"
    },
    {
      name: "Le Village by CA",
      type: "Accompagnement",
      icon: Award,
      color: "text-orange-600 bg-orange-100"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Un projet soutenu par les institutions qui comptent.
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              TerraStab est accompagnée par des structures publiques et régionales engagées pour l'innovation,
              l'habitat durable et la résilience climatique. Ces soutiens renforcent notre indépendance,
              notre ambition, et notre capacité à déployer la solution partout où elle est nécessaire.
            </p>
          </div>
        </motion.div>

        {/* Horizontal scrolling logos for mobile, grid for desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supporters.map((supporter, index) => (
              <motion.div
                key={supporter.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group text-center p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-full ${supporter.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <supporter.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-2">{supporter.name}</h3>
                <p className="text-xs text-gray-600">{supporter.type}</p>
              </motion.div>
            ))}
          </div>

          {/* Mobile horizontal scroll */}
          <div className="md:hidden">
            <div className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide">
              {supporters.map((supporter, index) => (
                <motion.div
                  key={supporter.name}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 text-center p-6 rounded-lg border border-gray-200 w-48"
                >
                  <div className={`w-12 h-12 rounded-full ${supporter.color} flex items-center justify-center mx-auto mb-3`}>
                    <supporter.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{supporter.name}</h3>
                  <p className="text-xs text-gray-600">{supporter.type}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            Ces partenariats témoignent de la solidité et de la viabilité du projet TerraStab,
            ainsi que de son potentiel d'impact positif sur l'habitat français.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default TrustLogos