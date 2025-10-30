import { motion } from 'framer-motion'

const TrustLogos = () => {
  const allPartners = [
    { name: 'BPI France', logo: '/partner_logo_bpi_france.svg' },
    { name: 'Grand Nancy Innovation', logo: '/partner_logo_grand_nancy.png' },
    { name: 'ADEME', logo: '/partner_logo_ademe.svg' },
    { name: 'French Tech', logo: '/partner_logo_french_tech.svg' },
    { name: 'France Assureurs', logo: '/partner_logo_france_assureurs2.png' },
    { name: 'CCI', logo: '/partner_logo_cci.svg' },
    { name: 'Needhelp', logo: '/partner_logo_needhelp.png' }
  ]

  // Split partners into 2 rows
  const row1Partners = [allPartners[0], allPartners[1], allPartners[2], allPartners[6]]
  const row2Partners = [allPartners[3], allPartners[4], allPartners[5]]

  // Create exactly 2 copies for seamless scrolling (original + duplicate)
  const row1 = [...row1Partners, ...row1Partners]
  const row2 = [...row2Partners, ...row2Partners]

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

        {/* Desktop: Single row carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="hidden md:block relative overflow-x-auto overflow-y-hidden w-full touch-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x proximity' }}
        >
          <div className="flex animate-scroll space-x-8">
            {[...allPartners, ...allPartners].map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 bg-white p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300 w-48 h-32 flex items-center justify-center"
                style={{ scrollSnapAlign: 'start' }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-20 max-w-full object-contain pointer-events-none"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: Two rows scrolling in opposite directions */}
        <div className="md:hidden space-y-6">
          {/* Row 1 - Scrolling Right to Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative overflow-x-auto overflow-y-hidden w-full touch-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: 'x proximity' }}
          >
            <div className="flex animate-scroll space-x-6">
              {row1.map((partner, index) => (
                <div
                  key={`row1-${partner.name}-${index}`}
                  className="flex-shrink-0 bg-white p-6 rounded-lg shadow-md border w-40 h-28 flex items-center justify-center"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Row 2 - Scrolling Left to Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative overflow-x-auto overflow-y-hidden w-full touch-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: 'x proximity' }}
          >
            <div className="flex animate-scroll-reverse space-x-6">
              {row2.map((partner, index) => (
                <div
                  key={`row2-${partner.name}-${index}`}
                  className="flex-shrink-0 bg-white p-6 rounded-lg shadow-md border w-40 h-28 flex items-center justify-center"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-16 max-w-full object-contain pointer-events-none"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

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