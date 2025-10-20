// @ts-nocheck - Customer Journey disabled, replaced by LeadCaptureForm
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, ArrowLeft, Euro, Package, FileText, Save, Mail, Shield, CheckCircle2 } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import { supabase } from '@/lib/supabase'
import { quoteApi } from '@/lib/quote-api'

const QuoteDisplay = () => {
  const { state, actions } = useCustomerJourney()
  const { quote } = state
  const riskLevel = quote.riskLevel || 'Faible'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')

  const handleGoBack = () => {
    actions.setStep('configuration')
  }

  const handleSaveAnswers = () => {
    setShowSaveModal(true)
  }

  const handleGoogleSignIn = async () => {
    if (!quote.resultId) {
      setError('Aucun devis à sauvegarder')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Stocker le result_id dans le localStorage pour le récupérer après redirection
      localStorage.setItem('pending_quote_save', JSON.stringify({
        result_id: state.quote.resultId,
        quote_data: {
          montant_total: state.quote.totalCost || 0,
          nombre_sensors: (state.quote.quantities?.nbr_sonde || 0) + (state.quote.quantities?.nbr_sonde_double || 0),
          nombre_controleurs: state.quote.quantities?.nbr_controller || 0,
          nombre_piquets: state.quote.quantities?.nbr_piquet_irrigation || 0,
        }
      }))

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      })

      if (error) throw error

      // Note: L'utilisateur sera redirigé vers Google
      // Après authentification, le callback gérera la sauvegarde
    } catch (err) {
      console.error('Error with Google sign-in:', err)
      setError(err instanceof Error ? err.message : 'Erreur avec Google')
      setIsSubmitting(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !quote.resultId || !quote.quote_id) {
      setError('Email ou devis manquant')
      return
    }

    // Validation email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Email invalide')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // Envoyer l'email directement via la fonction send-quote-email
      const { data, error: emailError } = await supabase.functions.invoke('send-quote-email', {
        body: {
          to: email,
          quote_id: quote.quote_id,
          result_id: quote.resultId,
          quote_data: {
            montant_total: state.quote.totalCost || 0,
            nombre_sensors: (state.quote.quantities?.nbr_sonde || 0) + (state.quote.quantities?.nbr_sonde_double || 0),
            nombre_controleurs: state.quote.quantities?.nbr_controller || 0,
            nombre_piquets: state.quote.quantities?.nbr_piquet_irrigation || 0,
          }
        }
      })

      if (emailError) {
        throw emailError
      }

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors de l\'envoi de l\'email')
      }

      // Succès
      setSuccess(true)
      setEmail('')
      setShowEmailForm(false)
    } catch (err) {
      console.error('Error sending email:', err)
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi de l\'email')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Votre devis personnalisé
        </h1>
        <p className="text-lg text-gray-600">
          Évaluation {riskLevel} - Devis #{quote.quote_id}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Détail des quantités */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-6 h-6 text-blue-600" />
                  <span>Matériel nécessaire</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quote.quantities && (
                    <>
                      {quote.quantities.nbr_sonde > 0 && (
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Sondes simples</p>
                            <p className="text-sm text-gray-500">
                              {quote.quantities.nbr_sonde} × {quote.pricing?.sonde.toFixed(2)} €
                            </p>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {((quote.quantities.nbr_sonde || 0) * (quote.pricing?.sonde || 0)).toFixed(2)} €
                          </p>
                        </div>
                      )}

                      {quote.quantities.nbr_sonde_double > 0 && (
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">Sondes doubles</p>
                            <p className="text-sm text-gray-500">
                              {quote.quantities.nbr_sonde_double} × {quote.pricing?.sonde_double.toFixed(2)} €
                            </p>
                          </div>
                          <p className="text-lg font-bold text-gray-900">
                            {((quote.quantities.nbr_sonde_double || 0) * (quote.pricing?.sonde_double || 0)).toFixed(2)} €
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Détail des contributions */}
          {quote.contributions && quote.contributions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    <span>Détail du calcul</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quote.contributions.map((contrib, index) => (
                      <div key={index} className="border-l-4 border-blue-400 pl-4 py-2">
                        <p className="font-medium text-gray-900">Bloc {contrib.bloc}: {contrib.rule_applied}</p>
                        <p className="text-sm text-gray-600">{contrib.note}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {contrib.nbr_sonde > 0 && `+${contrib.nbr_sonde} sonde(s) `}
                          {contrib.nbr_sonde_double > 0 && `+${contrib.nbr_sonde_double} sonde(s) double(s)`}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Carte de tarification */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-8">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Euro className="w-6 h-6 text-blue-600" />
                  <span>Total</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Montant total</div>
                  <div className="text-4xl font-bold text-gray-900">
                    {quote.totalEstimate?.toFixed(2)} €
                  </div>
                  <div className="text-sm text-gray-500 mt-2">TTC</div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="text-xs text-gray-500 space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Installation incluse</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Garantie constructeur</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>Support technique 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8"
      >
        {/* Message d'incitation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <Save className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">
                Ne perdez pas vos réponses !
              </h3>
              <p className="text-sm text-gray-600">
                Enregistrez votre devis et recevez-le par email pour ne rien perdre.
              </p>
            </div>
            <Button
              onClick={handleSaveAnswers}
              data-save-quote-button
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 flex-shrink-0"
            >
              <Save className="w-4 h-4" />
              Enregistrer mes réponses
            </Button>
          </div>
        </div>

        {/* Modal de sauvegarde */}
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSaveModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-lg p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Sécurisez votre devis
                </h2>
                <p className="text-gray-600">
                  Connectez-vous pour sauvegarder votre devis
                </p>
              </div>

              {/* Bénéfices */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Sauvegarde</strong> de toutes vos réponses
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Devis détaillé</strong> envoyé par email
                  </p>
                </div>
              </div>

              {success ? (
                <div className="text-center py-4">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    ✅ Votre devis a été envoyé
                  </p>
                  <p className="text-gray-600">
                    Consultez votre boîte email.
                  </p>
                  <Button
                    onClick={() => {
                      setShowSaveModal(false)
                      setSuccess(false)
                      setShowEmailForm(false)
                      setEmail('')
                      setError(null)
                      // Réinitialiser complètement le journey pour retourner à l'accueil
                      actions.resetJourney()
                    }}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    OK
                  </Button>
                </div>
              ) : !showEmailForm ? (
                <div className="space-y-4">
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={isSubmitting}
                    className="w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC04"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    {isSubmitting ? 'Connexion...' : 'Continuer avec Google'}
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Ou</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => setShowEmailForm(true)}
                    className="w-full h-12"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Recevoir par email
                  </Button>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => setShowSaveModal(false)}
                    className="w-full"
                  >
                    Annuler
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                      Votre adresse email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="exemple@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-base"
                      required
                      autoFocus
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowEmailForm(false)
                        setEmail('')
                        setError(null)
                      }}
                      className="flex-1"
                    >
                      Retour
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      {isSubmitting ? 'Envoi...' : 'Envoyer mon devis'}
                    </Button>
                  </div>
                </form>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                Vos données sont sécurisées et ne seront jamais partagées.
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Modifier mes réponses</span>
          </Button>

          <div className="text-sm text-gray-500">
            Algorithme version {quote.rule_set_version}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default QuoteDisplay