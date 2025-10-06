import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Info, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import { calculateQuote } from '@/lib/algo-api'
import type { RisqueFaibleAnswers, RiskLevel } from '@/types/algo'

interface QuestionBlock {
  bloc: string
  title: string
  questions: Array<{
    label: string
    field: keyof RisqueFaibleAnswers
    type: 'radio' | 'number' | 'boolean'
    options?: Array<{ value: any; label: string }>
  }>
  info: string
}

// Définition des blocs de questions pour Risque Faible v1
const questionBlocks: QuestionBlock[] = [
  {
    bloc: '00',
    title: 'Type de logement',
    questions: [
      {
        label: 'Quel est le type de logement ?',
        field: 'bloc00_housing_type',
        type: 'radio',
        options: [
          { value: 'Pavillon', label: 'Pavillon' },
          { value: 'Maison mitoyenne', label: 'Maison mitoyenne' },
          { value: 'Bâtiment industriel', label: 'Bâtiment industriel' },
        ],
      },
    ],
    info: 'Le type de bâtiment aide à mieux qualifier la situation du logement et à personnaliser le diagnostic.',
  },
  {
    bloc: '10',
    title: 'Sous-sol',
    questions: [
      {
        label: 'Le logement possède-t-il un sous-sol ?',
        field: 'bloc10_has_basement',
        type: 'radio',
        options: [
          { value: true, label: 'Oui' },
          { value: false, label: 'Non' },
        ],
      },
    ],
    info: 'La présence d\'un sous-sol influence fortement la manière dont le sol interagit avec la structure du bâtiment.',
  },
  {
    bloc: '20',
    title: 'Année de construction',
    questions: [
      {
        label: 'Quelle est l\'année de construction du logement ?',
        field: 'bloc20_construction_year',
        type: 'number',
      },
    ],
    info: 'L\'année de construction permet d\'évaluer les normes techniques appliquées et la robustesse des fondations.',
  },
  {
    bloc: '30',
    title: 'Surface',
    questions: [
      {
        label: 'Quelle est la surface totale du logement (en m²) ?',
        field: 'bloc30_surface_m2',
        type: 'number',
      },
    ],
    info: 'La surface conditionne l\'ampleur de l\'étude nécessaire pour couvrir correctement le bâtiment.',
  },
  {
    bloc: '40',
    title: 'Murs sans terrasse',
    questions: [
      {
        label: 'Combien de murs sans terrasse le logement comporte-t-il ?',
        field: 'bloc40_walls_without_terrace',
        type: 'number',
      },
    ],
    info: 'Les murs sans appui (terrasse ou autre structure attenante) sont plus exposés aux mouvements de sol.',
  },
  {
    bloc: '50',
    title: 'Zones vertes et surveillance',
    questions: [
      {
        label: 'Combien de zones vertes sont présentes autour du logement ?',
        field: 'bloc50_green_zones',
        type: 'number',
      },
      {
        label: 'Souhaitez-vous mettre ces zones vertes sous surveillance ?',
        field: 'bloc50_green_zones_monitored',
        type: 'radio',
        options: [
          { value: true, label: 'Oui' },
          { value: false, label: 'Non' },
        ],
      },
    ],
    info: 'La végétation proche influence directement le sol. Connaître les zones vertes et leur surveillance permet d\'adapter la protection.',
  },
  {
    bloc: '70',
    title: 'Extensions',
    questions: [
      {
        label: 'Combien d\'extensions sont présentes autour du logement (garages, annexes, vérandas, etc.) ?',
        field: 'bloc70_extensions',
        type: 'number',
      },
    ],
    info: 'Les extensions peuvent fragiliser la structure si elles reposent sur des sols sensibles, il est important de les prendre en compte.',
  },
]

const AlgoQuestionnaire = () => {
  const { state, actions } = useCustomerJourney()
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockedReason, setBlockedReason] = useState<string | null>(null)

  // Initialiser les réponses
  const [answers, setAnswers] = useState<Partial<RisqueFaibleAnswers>>({})

  // Déterminer le niveau de risque depuis riskAssessmentResult
  const riskLevel: RiskLevel = state.riskAssessmentResult?.riskLevel?.toLowerCase() || 'faible'

  const currentBlock = questionBlocks[currentBlockIndex]

  const handleInputChange = (field: keyof RisqueFaibleAnswers, value: any) => {
    setAnswers({ ...answers, [field]: value })
    setError(null)
  }

  const canProceed = () => {
    // Vérifier que toutes les questions du bloc actuel sont répondues
    return currentBlock.questions.every((q) => {
      const value = answers[q.field]
      if (q.type === 'number') {
        return typeof value === 'number' && value >= 0
      }
      // Pour radio et boolean
      return value !== undefined && value !== null
    })
  }

  const checkBlockingConditions = () => {
    // Bloc 10: Sous-sol = Oui
    if (answers.bloc10_has_basement === true) {
      setIsBlocked(true)
      setBlockedReason('Pas de facturation pour les logements avec sous-sol')
      return true
    }

    // Bloc 20: Année >= 2000
    if (answers.bloc20_construction_year && answers.bloc20_construction_year >= 2000) {
      setIsBlocked(true)
      setBlockedReason('Pas de facturation pour les maisons construites après 2000')
      return true
    }

    // Bloc 40: Murs sans terrasse = 0
    if (answers.bloc40_walls_without_terrace === 0) {
      setIsBlocked(true)
      setBlockedReason('Pas de facturation si aucun mur sans terrasse')
      return true
    }

    return false
  }

  const handleNext = async () => {
    // Vérifier les conditions bloquantes après chaque bloc
    if (checkBlockingConditions()) {
      return
    }

    if (currentBlockIndex < questionBlocks.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1)
      setShowInfo(false)
    } else {
      // Soumettre le questionnaire
      await handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1)
      setShowInfo(false)
      setIsBlocked(false)
      setBlockedReason(null)
    } else {
      actions.setStep('recommendation')
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await calculateQuote(riskLevel, answers as RisqueFaibleAnswers)

      if (!response.success) {
        throw new Error(response.error || 'Erreur lors du calcul du devis')
      }

      if (response.data?.is_blocked) {
        setIsBlocked(true)
        setBlockedReason(response.data.blocked_reason || 'Pas de facturation possible')
        return
      }

      // Sauvegarder le devis dans le contexte
      actions.setQuote({
        riskLevel: riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1) as 'Faible' | 'Moyen' | 'Élevé',
        totalEstimate: response.data?.devis_total,
        quote_id: response.data?.quote_id,
        rule_set_version: response.data?.rule_set_version,
        contributions: response.data?.contributions,
        quantities: response.data?.quantities,
        pricing: response.data?.pricing,
      })

      // Passer à l'étape suivante
      actions.setStep('quote')
    } catch (err) {
      console.error('Error submitting questionnaire:', err)
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = (question: QuestionBlock['questions'][0]) => {
    const value = answers[question.field]

    if (question.type === 'radio') {
      return (
        <div>
          <Label className="text-lg font-semibold mb-4 block">{question.label}</Label>
          <RadioGroup
            value={value !== undefined ? String(value) : ''}
            onValueChange={(val) => {
              const parsedValue = val === 'true' ? true : val === 'false' ? false : val
              handleInputChange(question.field, parsedValue)
            }}
          >
            {question.options?.map((option) => (
              <div key={String(option.value)} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value={String(option.value)} id={`${question.field}-${option.value}`} />
                <Label htmlFor={`${question.field}-${option.value}`} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    }

    if (question.type === 'number') {
      return (
        <div>
          <Label htmlFor={question.field} className="text-lg font-semibold mb-2 block">
            {question.label}
          </Label>
          <Input
            id={question.field}
            type="number"
            min="0"
            value={typeof value === 'number' ? value : ''}
            onChange={(e) => handleInputChange(question.field, parseInt(e.target.value) || 0)}
            className="text-lg"
          />
        </div>
      )
    }

    return null
  }

  if (isBlocked) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-800">
              <AlertCircle className="w-6 h-6" />
              <span>Pas de facturation possible</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-orange-700 mb-6">{blockedReason}</p>
            <Button variant="outline" onClick={() => actions.setStep('recommendation')}>
              Retour à l'évaluation
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
          Évaluation {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
        </h1>
        <p className="text-lg text-gray-600 text-center">
          Répondez aux questions pour obtenir votre devis personnalisé
        </p>

        {/* Progress bar */}
        <div className="mt-8 mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentBlockIndex + 1) / questionBlocks.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Bloc {currentBlockIndex + 1} sur {questionBlocks.length}
          </p>
        </div>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{currentBlock.title}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className="text-blue-600"
            >
              <Info className="w-5 h-5" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <p className="text-blue-800">{currentBlock.info}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            {currentBlock.questions.map((question) => (
              <div key={question.field}>{renderQuestion(question)}</div>
            ))}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>
                {isSubmitting
                  ? 'Calcul en cours...'
                  : currentBlockIndex === questionBlocks.length - 1
                  ? 'Voir mon devis'
                  : 'Suivant'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AlgoQuestionnaire
