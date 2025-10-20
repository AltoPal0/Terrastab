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
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Merci pour votre demande !
            </h3>
            <p className="text-gray-600 mb-6">
              Nous avons bien reçu vos informations. Un expert TerraStab vous contactera très prochainement pour discuter de votre projet.
            </p>
            <p className="text-sm text-gray-500">
              Vous recevrez un email de confirmation dans quelques instants.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="Jean Dupont"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="jean.dupont@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              placeholder="06 12 34 56 78"
              disabled={isSubmitting}
            />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {address && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Adresse :</strong> {address}
              </p>
              {riskLevel && (
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Niveau de risque :</strong> {riskLevel}
                </p>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              'Être contacté par un expert'
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            En soumettant ce formulaire, vous acceptez d'être contacté par TerraStab concernant nos solutions de protection contre le retrait-gonflement des argiles.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

export default LeadCaptureForm
