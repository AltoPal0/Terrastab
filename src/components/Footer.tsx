import { Card, CardContent } from '@/components/ui/card'

const Footer = () => {
  const testimonials = [
    {
      initials: 'MD',
      name: 'Famille Dupont',
      property: 'Maison individuelle, Essonne',
      quote: 'Grâce à Terrastab, plus de fissures qui s\'élargissent. Le système surveille tout automatiquement. On dort tranquille !',
      rating: 5
    },
    {
      initials: 'JM',
      name: 'Jean Martin',
      property: 'Villa, Yvelines',
      quote: 'L\'étude SURVEY nous a permis de comprendre les risques. L\'installation SHIELD a été rapide et efficace.',
      rating: 5
    },
    {
      initials: 'SL',
      name: 'Sophie Leroy',
      property: 'Pavillon, Val-de-Marne',
      quote: 'Investissement rentabilisé dès la première année. Plus de stress avec les périodes de sécheresse !',
      rating: 5
    }
  ]

  // Duplicate partners to create seamless infinite scroll effect
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
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Partners Support Section */}
      <div className="py-20 bg-gray-100 text-gray-900 overflow-hidden">
        <div className="text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-3xl font-bold mb-6">Ils nous soutiennent</h2>
            <p className="text-gray-600 text-lg">Nos partenaires institutionnels et financiers</p>
          </div>

          {/* Carousel Container - Full Width */}
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-scroll space-x-8">
              {partners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 bg-white p-8 rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300 w-48 h-32 flex items-center justify-center"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-20 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-20 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-600 text-lg">Témoignages authentiques de propriétaires protégés</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.property}</div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 mb-6 italic text-base leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-yellow-400 text-xl">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Information */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <img
                src="/logo_main_terrastab.png"
                alt="Terrastab Logo"
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-300 text-sm">
                Solution innovante de stabilisation des sols pour protéger votre maison.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <span className="mr-3">📧</span>
                  <a href="mailto:contact@terrastab.fr" className="text-gray-300 hover:text-white">
                    contact@terrastab.fr
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="mr-3">📞</span>
                  <a href="tel:+33123456789" className="text-gray-300 hover:text-white">
                    01 23 45 67 89
                  </a>
                </div>
                <div className="flex items-start">
                  <span className="mr-3 mt-1">📍</span>
                  <div className="text-gray-300">
                    <div>123 Avenue de la Innovation</div>
                    <div>75001 Paris</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Légal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Mentions légales
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    CGU
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Cookies
                  </a>
                </li>
              </ul>
            </div>

            {/* Partners Info */}
            <div>
              <h3 className="text-lg font-bold mb-4">Partenaires</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold mr-3">
                    G
                  </div>
                  <span className="text-gray-300">Georisques.gouv.fr</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold mr-3">
                    NH
                  </div>
                  <span className="text-gray-300">Needhelp.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Terrastab. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer