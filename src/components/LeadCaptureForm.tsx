import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { leadsApi } from '@/lib/leadsApi'

const leadFormSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide')
})

type LeadFormData = z.infer<typeof leadFormSchema>

interface LeadCaptureFormProps {
  address?: string
  riskLevel?: string
}

const LeadCaptureForm = ({ address, riskLevel }: LeadCaptureFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema)
  })

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    setError(null)

    const response = await leadsApi.saveLead({
      ...data,
      address,
      risk_level: riskLevel
    })

    setIsSubmitting(false)

    if (response.success) {
      setIsSubmitted(true)
    } else {
      setError(response.error || 'Une erreur est survenue')
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center py-6 sm:py-8 md:py-12">
            <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-green-600 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 px-2">
              Merci pour votre demande !
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-2">
              Nous avons bien reçu vos informations. Un expert TerraStab vous contactera très prochainement pour discuter de votre projet.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 px-2">
              Vous recevrez un email de confirmation dans quelques instants.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm sm:text-base">Nom complet *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Jean Dupont"
              disabled={isSubmitting}
              className="h-10 sm:h-11 text-sm sm:text-base mt-1.5"
            />
            {errors.name && (
              <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="text-sm sm:text-base">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="jean.dupont@example.com"
              disabled={isSubmitting}
              className="h-10 sm:h-11 text-sm sm:text-base mt-1.5"
            />
            {errors.email && (
              <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone" className="text-sm sm:text-base">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="06 12 34 56 78"
              disabled={isSubmitting}
              className="h-10 sm:h-11 text-sm sm:text-base mt-1.5"
            />
            {errors.phone && (
              <p className="text-xs sm:text-sm text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {address && (
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 break-words">
                <strong>Adresse :</strong> {address}
              </p>
              {riskLevel && (
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  <strong>Niveau de risque :</strong> {riskLevel}
                </p>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 sm:h-12 text-sm sm:text-base"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span className="hidden sm:inline">Envoi en cours...</span>
                <span className="sm:hidden">Envoi...</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Être contacté par un expert</span>
                <span className="sm:hidden">Être contacté</span>
              </>
            )}
          </Button>

          <p className="text-[10px] sm:text-xs text-gray-500 text-center leading-tight px-2">
            En soumettant ce formulaire, vous acceptez d'être contacté par TerraStab concernant nos solutions de protection contre le retrait-gonflement des argiles.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default LeadCaptureForm
