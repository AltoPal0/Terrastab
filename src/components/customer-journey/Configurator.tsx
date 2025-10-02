import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Home, AlertCircle, Camera, Phone, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
// Using inline types temporarily
type HouseType = 'maison-individuelle' | 'pavillon' | 'villa' | 'autre'
type VisibleProblems = 'aucun' | 'microfissures' | 'fissures-visibles' | 'fissures-importantes' | 'affaissements'

interface CustomerConfiguration {
  houseType: HouseType
  constructionYear: number
  visibleProblems: VisibleProblems
  photos?: File[]
  needsAdvice: boolean
  contactPreference?: 'phone' | 'email'
  phoneNumber?: string
  email?: string
}

const Configurator = () => {
  const { state, actions } = useCustomerJourney()
  const [formData, setFormData] = useState<Partial<CustomerConfiguration>>(state.configuration)
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    { title: "Votre habitation", icon: Home },
    { title: "Problèmes visibles", icon: AlertCircle },
    { title: "Contact et assistance", icon: Phone }
  ]

  const houseTypes: { value: HouseType; label: string }[] = [
    { value: 'maison-individuelle', label: 'Maison individuelle' },
    { value: 'pavillon', label: 'Pavillon' },
    { value: 'villa', label: 'Villa' },
    { value: 'autre', label: 'Autre' }
  ]

  const problemOptions: { value: VisibleProblems; label: string; description: string }[] = [
    { value: 'aucun', label: 'Aucun problème visible', description: 'Ma maison ne présente aucun signe de désordre' },
    { value: 'microfissures', label: 'Micro-fissures', description: 'Fissures très fines, principalement esthétiques' },
    { value: 'fissures-visibles', label: 'Fissures visibles', description: 'Fissures nettes dans les murs ou plafonds' },
    { value: 'fissures-importantes', label: 'Fissures importantes', description: 'Fissures larges ou qui s\'agrandissent' },
    { value: 'affaissements', label: 'Affaissements', description: 'Problèmes de niveau, portes qui ferment mal' }
  ]

  const handleInputChange = (field: keyof CustomerConfiguration, value: any) => {
    const newData = { ...formData, [field]: value }
    setFormData(newData)
    actions.updateConfiguration(newData)
  }

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    } else {
      actions.setStep('quote')
    }
  }

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    } else {
      actions.setStep('recommendation')
    }
  }

  const canProceed = () => {
    switch (currentSection) {
      case 0:
        return formData.houseType && formData.constructionYear
      case 1:
        return formData.visibleProblems
      case 2:
        return !formData.needsAdvice || (formData.needsAdvice && (formData.phoneNumber || formData.email))
      default:
        return false
    }
  }

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <Label className="text-lg font-semibold mb-4 block">Type d'habitation</Label>
              <RadioGroup
                value={formData.houseType || ''}
                onValueChange={(value) => handleInputChange('houseType', value as HouseType)}
              >
                {houseTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label htmlFor={type.value} className="flex-1 cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="constructionYear" className="text-lg font-semibold mb-2 block">
                Année de construction
              </Label>
              <Input
                id="constructionYear"
                type="number"
                min="1900"
                max="2024"
                value={formData.constructionYear || ''}
                onChange={(e) => handleInputChange('constructionYear', parseInt(e.target.value))}
                placeholder="Ex: 1995"
                className="text-lg"
              />
            </div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Label className="text-lg font-semibold mb-4 block">
              Observez-vous des problèmes sur votre habitation ?
            </Label>
            <RadioGroup
              value={formData.visibleProblems || ''}
              onValueChange={(value) => handleInputChange('visibleProblems', value as VisibleProblems)}
            >
              {problemOptions.map((option) => (
                <div key={option.value} className="p-4 rounded-lg border hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-3">
                <Camera className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium text-blue-900">Photos (optionnel)</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Vous pourrez envoyer des photos lors de l'échange avec notre expert
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id="needsAdvice"
                checked={formData.needsAdvice || false}
                onCheckedChange={(checked) => handleInputChange('needsAdvice', checked === true)}
              />
              <Label htmlFor="needsAdvice" className="text-lg font-medium">
                Je souhaite être rappelé(e) par un conseiller
              </Label>
            </div>

            {formData.needsAdvice && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="space-y-4 p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <Label className="text-base font-medium mb-2 block">Préférence de contact</Label>
                  <RadioGroup
                    value={formData.contactPreference || ''}
                    onValueChange={(value) => handleInputChange('contactPreference', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone">Téléphone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.contactPreference === 'phone' && (
                  <div>
                    <Label htmlFor="phoneNumber" className="text-base font-medium mb-2 block">
                      Numéro de téléphone
                    </Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber || ''}
                      onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                )}

                {formData.contactPreference === 'email' && (
                  <div>
                    <Label htmlFor="email" className="text-base font-medium mb-2 block">
                      Adresse email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre@email.com"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Configuration de votre solution
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Quelques informations pour personnaliser votre devis
        </p>

        {/* Progress bar */}
        <div className="mt-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 ${
                  index <= currentSection ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentSection ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  <section.icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium hidden sm:block">{section.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {(() => {
              const Icon = sections[currentSection].icon
              return <Icon className="w-6 h-6 text-blue-600" />
            })()}
            <span>{sections[currentSection].title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {renderSection()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePreviousSection}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </Button>

            <Button
              onClick={handleNextSection}
              disabled={!canProceed()}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>{currentSection === sections.length - 1 ? 'Voir mon devis' : 'Suivant'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Configurator