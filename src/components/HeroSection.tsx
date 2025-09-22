import { Button } from '@/components/ui/button'

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="top"
      className="relative min-h-[600px] bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url('/support_visual_1.jpg')"
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              N'attendez pas que les fissures apparaissent ou s'agrandissent.
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Terrastab surveille et stabilise vos sols en continu pour protéger votre maison contre le retrait-gonflement des argiles. Évitez des réparations coûteuses et préservez la valeur de votre patrimoine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => scrollToSection('risque')}
                size="lg"
                className="text-lg px-8 py-4 bg-green-600 hover:bg-green-700 text-white border-0"
              >
                Connaître mon risque
              </Button>
              <Button
                onClick={() => scrollToSection('devis')}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
              >
                Obtenir un devis
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection