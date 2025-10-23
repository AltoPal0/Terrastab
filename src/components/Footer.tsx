import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      {/* Main Footer Information */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <img
                src="/logo_terrastab.svg"
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
                  <Mail className="w-4 h-4 mr-3 flex-shrink-0 text-blue-400" />
                  <a href="mailto:contact@terrastab.fr" className="text-gray-300 hover:text-white">
                    contact@terrastab.fr
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 flex-shrink-0 text-blue-400" />
                  <a href="tel:+33123456789" className="text-gray-300 hover:text-white">
                    01 23 45 67 89
                  </a>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-blue-400" />
                  <div className="text-gray-300">
                    <div>11 Rue Gilberte Monne</div>
                    <div>54270 Essey-lès-Nancy</div>
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
                  <a href="/cgv" className="text-gray-300 hover:text-white">
                    CGV
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