import { motion } from 'framer-motion'

const TrustLogos = () => {
  const basePartners = [
    { name: 'BPI France', logo: '/partner_logo_bpi_france.svg' },
    { name: 'Grand Nancy Innovation', logo: '/partner_logo_grand_nancy.png' },
    { name: 'ADEME', logo: '/partner_logo_ademe.svg' },
    { name: 'French Tech', logo: '/partner_logo_french_tech.svg' },
    { name: 'France Assureurs', logo: '/partner_logo_france_assureurs2.png' },
    { name: 'CCI', logo: '/partner_logo_cci.svg' },
    { name: 'Needhelp', logo: '/partner_logo_needhelp.png' }
  ]

  // Create exactly 2 copies for seamless scrolling (original + duplicate)
  const partners = [...basePartners, ...basePartners]

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

        {/* Carousel Container - Full Width with Auto-Scroll & Touch Enabled */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden w-full touch-scroll scrollbar-hide"
        >
          <div className="flex animate-scroll space-x-8">
            {partners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 bg-white p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300 w-48 h-32 flex items-center justify-center scroll-snap-align-start"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20 max-w-full object-contain"
                />
              </div>
            ))}
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