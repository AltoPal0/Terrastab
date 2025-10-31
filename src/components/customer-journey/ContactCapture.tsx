// @ts-nocheck - Customer Journey disabled, replaced by LeadCaptureForm
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Phone, ArrowRight, Shield, CheckCircle2 } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import { supabase } from '@/lib/supabase'

// Schéma de validation
const contactSchema = z.object({
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().regex(/^(?:(?:\+|00)33|0)[1-9](?:[0-9]{8})$/, 'Numéro de téléphone français invalide').optional().or(z.literal('')),
}).refine((data) => data.email || data.phone, {
  message: 'Veuillez fournir au moins un email ou un numéro de téléphone',
  path: ['email'],
})

type ContactFormData = z.infer<typeof contactSchema>

const ContactCapture = () => {
  const { state, actions } = useCustomerJourney()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [contactMode, setContactMode] = useState<'email' | 'phone' | null>(null)

  // Vérifier si un message de succès est disponible après l'authentification
  useEffect(() => {
    const savedMessage = localStorage.getItem('quote_save_message')
    const savedError = localStorage.getItem('quote_save_error')

    if (savedMessage) {
      setSuccessMessage(savedMessage)
      localStorage.removeItem('quote_save_message')
    }

    if (savedError) {
      setError(savedError)
      localStorage.removeItem('quote_save_error')
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Créer un utilisateur dans la table users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          contact_mode: data.email ? 'email' : 'phone',
          email: data.email || null,
          phone: data.phone || null,
          metadata: {
            quote_id: state.quote.quote_id,
            risk_level: state.quote.riskLevel,
            address: state.riskAssessmentResult?.address,
          },
        })
        .select()
        .single()

      if (userError) {
        throw new Error(userError.message)
      }

      // Sauvegarder les informations de contact dans le contexte
      actions.updateConfiguration({
        email: data.email || undefined,
        phoneNumber: data.phone || undefined,
        contactPreference: data.email ? 'email' : 'phone',
      })

      // Passer à l'étape suivante (payment)
      actions.nextStep()
    } catch (err) {
      console.error('Error saving contact:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Sauvegarder les données du devis en attente dans localStorage
      // pour les récupérer après l'authentification
      const pendingQuoteData = {
        result_id: state.quote.resultId, // ID du résultat du devis
        quote_data: {
          montant_total: state.quote.totalCost || 0,
          nombre_sensors: state.quote.numberOfSensors || 0,
          nombre_controleurs: state.quote.numberOfControllers || 0,
          nombre_piquets: state.quote.numberOfIrrigationStakes || 0,
        }
      }

      localStorage.setItem('pending_quote_save', JSON.stringify(pendingQuoteData))

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}?step=contact`,
        },
      })

      if (error) throw error

      // Note: L'utilisateur sera redirigé vers Google
      // Après authentification, il reviendra à l'URL de redirection
    } catch (err) {
      console.error('Error with Google sign-in:', err)
      setError(err instanceof Error ? err.message : 'Erreur avec Google')
      setIsSubmitting(false)
    }
  }

  const handleAppleSignIn = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}?step=payment`,
        },
      })

      if (error) throw error

      // Note: L'utilisateur sera redirigé vers Apple
      // Après authentification, il reviendra à l'URL de redirection
    } catch (err) {
      console.error('Error with Apple sign-in:', err)
      setError(err instanceof Error ? err.message : 'Erreur avec Apple')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Card>
          <CardHeader className="text-center pb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Sécurisez votre devis
            </CardTitle>
            <p className="text-lg text-gray-600 mt-2">
              Ne perdez pas vos réponses ! Recevez votre devis détaillé par email.
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Message de succès après sauvegarde */}
            {successMessage && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded-lg"
              >
                <p className="text-green-800 font-medium">{successMessage}</p>
              </motion.div>
            )}

            {/* Bénéfices */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Sauvegarde automatique</strong> de toutes vos réponses
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Devis détaillé</strong> envoyé directement dans votre boîte mail
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Accès ultérieur</strong> pour modifier ou finaliser votre commande
                </p>
              </div>
            </div>

            {/* Choix du mode de contact */}
            {!contactMode && (
              <div className="space-y-4">
                <p className="text-center text-gray-600 font-medium">Comment souhaitez-vous recevoir votre devis ?</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setContactMode('email')}
                    className="h-auto py-6 flex flex-col items-center gap-2 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Mail className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold">Par email</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setContactMode('phone')}
                    className="h-auto py-6 flex flex-col items-center gap-2 hover:border-blue-500 hover:bg-blue-50"
                  >
                    <Phone className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold">Par SMS</span>
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Ou connectez-vous avec</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="h-12 border-gray-300 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continuer avec Google
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleAppleSignIn}
                    disabled={isSubmitting}
                    className="h-12 border-gray-300 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    Continuer avec Apple
                  </Button>
                </div>
              </div>
            )}

            {/* Formulaire Email */}
            {contactMode === 'email' && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-lg font-semibold mb-2 block">
                    Votre adresse email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    {...register('email')}
                    className={`text-lg ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setContactMode(null)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? 'Envoi...' : 'Recevoir mon devis'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}

            {/* Formulaire Téléphone */}
            {contactMode === 'phone' && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="phone" className="text-lg font-semibold mb-2 block">
                    Votre numéro de téléphone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="06 12 34 56 78"
                    {...register('phone')}
                    className={`text-lg ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-2">{errors.phone.message}</p>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <div className="flex justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setContactMode(null)}
                    className="flex-1"
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? 'Envoi...' : 'Recevoir mon devis'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}

            <p className="text-xs text-gray-500 text-center">
              Vos données sont sécurisées et ne seront jamais partagées avec des tiers.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default ContactCapture
