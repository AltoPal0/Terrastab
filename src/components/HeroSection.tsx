import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'

const HeroSection = () => {
  const images = [
    '/images/articles/crack-angle-cactus-1200x600.jpg',
    '/images/articles/door-cracked-1200x600.jpg',
    '/images/articles/maison-fissurée-1200x600.jpg'
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [images.length])

  const openRiskModal = () => {
    window.dispatchEvent(new Event('openRiskModal'))
  }

  return (
    <section
      id="top"
      className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center overflow-hidden"
    >
      {/* Background images with fade transition */}
      {images.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${image}')`,
            opacity: index === currentImageIndex ? 1 : 0
          }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
              N'attendez pas que les fissures apparaissent ou s'agrandissent.
            </h1>

            <div className="mb-8 sm:mb-10 md:mb-12">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed font-medium px-2">
                TerraStab surveille et stabilise vos sols en continu pour protéger votre maison contre le retrait-gonflement des argiles.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto font-semibold px-2">
                <strong>Évitez des réparations coûteuses</strong> et <strong>préservez la valeur de votre patrimoine.</strong>
              </p>
            </div>

            <div className="mb-6 sm:mb-8 md:mb-10">
              <Button
                onClick={openRiskModal}
                size="lg"
                className="text-sm sm:text-base md:text-lg px-6 py-5 sm:px-8 sm:py-6 bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Testez votre risque RGA
              </Button>
            </div>

            <div className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto px-4">
              <p className="font-medium leading-relaxed">
                Basé sur les <strong>données satellites</strong>, la <strong>base de données nationale RGA</strong>, et l'<strong>expertise géotechnique française</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection