import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const HeroSection = () => {
  const openRiskModal = () => {
    window.dispatchEvent(new Event('openRiskModal'))
  }

  return (
    <section
      id="top"
      className="relative min-h-[90vh] bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url('/maison_fissuree.jpg')"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
            >
              N'attendez pas que les fissures apparaissent ou s'agrandissent.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mb-12"
            >
              <p className="text-xl md:text-2xl text-white/95 mb-6 max-w-4xl mx-auto leading-relaxed font-medium">
                TerraStab surveille et stabilise vos sols en continu pour protéger votre maison contre le retrait-gonflement des argiles.
              </p>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-semibold">
                <strong>Évitez des réparations coûteuses</strong> et <strong>préservez la valeur de votre patrimoine.</strong>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mb-10"
            >
              <Button
                onClick={openRiskModal}
                size="lg"
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Testez votre risque RGA
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm text-white/80 max-w-2xl mx-auto"
            >
              <p className="font-medium">
                Basé sur les <strong>données satellites</strong>, la <strong>base de données nationale RGA</strong>, et l'<strong>expertise géotechnique française</strong>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection