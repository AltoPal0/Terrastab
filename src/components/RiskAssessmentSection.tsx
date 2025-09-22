import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const RiskAssessmentSection = () => {
  const [address, setAddress] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement risk assessment logic
    console.log('Assessing risk for address:', address)
  }

  return (
    <section id="risque" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Connaître mon niveau de risque
          </h2>

          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Terrastab utilise les données officielles de la plateforme Georisques et les données du BRGM
            pour estimer le risque RGA (retrait-gonflement des argiles) à votre adresse.
          </p>

          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="space-y-6">
                <div className="text-left">
                  <Label htmlFor="address" className="text-base font-medium text-gray-700 mb-2 block">
                    Adresse de votre maison
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="123 Rue de la Paix, 75001 Paris"
                    required
                    className="h-14 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    autoComplete="street-address"
                  />
                  <p className="mt-3 text-sm text-gray-500">
                    L'évaluation se base uniquement sur la localisation géographique selon les données Georisques.gouv.fr
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Testez votre niveau de risque RGA
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RiskAssessmentSection