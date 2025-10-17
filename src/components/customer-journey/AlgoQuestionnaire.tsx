import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Info, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react'
import { useCustomerJourney } from '@/contexts/CustomerJourneyContext'
import { calculateQuote, getQuestions, getBlockingRules } from '@/lib/algo-api'
import type { RisqueFaibleAnswers, RiskLevel, Question, AlgoRule } from '@/types/algo'

interface QuestionBlock {
  bloc: number
  title: string
  questions: Question[]
  info: string
}

const AlgoQuestionnaire = () => {
  const { state, actions } = useCustomerJourney()
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
  const [showInfo, setShowInfo] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBlocked, setIsBlocked] = useState(false)
  const [positiveMessage, setPositiveMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [questionBlocks, setQuestionBlocks] = useState<QuestionBlock[]>([])
  const [blockingRules, setBlockingRules] = useState<AlgoRule[]>([])

  // Initialiser les réponses
  const [answers, setAnswers] = useState<Partial<RisqueFaibleAnswers>>({})

  // Déterminer le niveau de risque depuis riskAssessmentResult
  const riskLevel: RiskLevel = state.riskAssessmentResult?.riskLevel?.toLowerCase() || 'faible'

  // Déterminer la version de l'algorithme selon le produit sélectionné
  const getAlgoVersion = (productId: string | null): string => {
    switch (productId) {
      case 'survey-light':
        return 'v1.0-survey-light'
      case 'survey-plus':
        return 'v1.0-survey-plus'
      case 'shield':
        return 'v1.0-shield'
      default:
        return 'v1.0-survey-light' // Fallback par défaut
    }
  }

  const algoVersion = getAlgoVersion(state.selectedProduct)

  // Charger les questions et les règles bloquantes depuis la base de données
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const [questionsResponse, blockingResponse] = await Promise.all([
          getQuestions(algoVersion, riskLevel),
          getBlockingRules(algoVersion, riskLevel)
        ])

        if (!questionsResponse.success || !questionsResponse.data) {
          throw new Error(questionsResponse.error || 'Erreur lors du chargement des questions')
        }

        if (!blockingResponse.success || !blockingResponse.data) {
          throw new Error(blockingResponse.error || 'Erreur lors du chargement des règles')
        }

        // Stocker les règles bloquantes
        setBlockingRules(blockingResponse.data)

        // Grouper les questions par bloc
        const blocksMap = new Map<number, Question[]>()
        questionsResponse.data.forEach((question) => {
          if (!blocksMap.has(question.bloc)) {
            blocksMap.set(question.bloc, [])
          }
          blocksMap.get(question.bloc)!.push(question)
        })

        // Créer les blocs de questions avec leurs titres
        const blocks: QuestionBlock[] = []
        blocksMap.forEach((questions, blocNumber) => {
          const firstQuestion = questions[0]
          blocks.push({
            bloc: blocNumber,
            title: getTitleForBloc(blocNumber),
            questions,
            info: firstQuestion.info_text,
          })
        })

        // Trier par numéro de bloc
        blocks.sort((a, b) => a.bloc - b.bloc)
        setQuestionBlocks(blocks)
      } catch (err) {
        console.error('Error loading questions:', err)
        setError(err instanceof Error ? err.message : 'Erreur inconnue')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuestions()
  }, [riskLevel, algoVersion])

  // Helper pour générer les titres de bloc
  const getTitleForBloc = (bloc: number): string => {
    const titles: Record<number, string> = {
      0: 'Type de logement',
      2: 'Bâtiment de plein pied',
      10: 'Sous-sol',
      20: 'Année de construction',
      30: 'Surface',
      40: 'Murs sans terrasse',
      50: 'Zones vertes et surveillance',
      70: 'Extensions',
    }
    return titles[bloc] || `Bloc ${bloc}`
  }

  const currentBlock = questionBlocks[currentBlockIndex]

  // Vérifier si une règle bloquante est déclenchée pour le bloc actuel
  const checkBlockingCondition = (currentAnswers: Partial<RisqueFaibleAnswers>, blocNumber: number) => {
    // Filtrer les règles pour ne vérifier que le bloc actuel
    const relevantRules = blockingRules.filter(rule => parseInt(rule.bloc) === blocNumber)

    for (const rule of relevantRules) {
      const bloc = rule.bloc
      const condition = rule.condition

      let isBlocked = false

      switch (bloc) {
        case '02':
          if (condition === 'Non' && currentAnswers.bloc02_is_ground_floor === false) {
            isBlocked = true
          }
          break
        case '10':
          if (condition === 'Oui' && currentAnswers.bloc10_has_basement === true) {
            isBlocked = true
          }
          break
        case '20':
          if (condition.includes('≥') && currentAnswers.bloc20_construction_year) {
            const year = parseInt(condition.replace('≥', ''))
            if (currentAnswers.bloc20_construction_year >= year) {
              isBlocked = true
            }
          }
          break
        case '40':
          if (condition === '=0' && currentAnswers.bloc40_walls_without_terrace === 0) {
            isBlocked = true
          }
          break
      }

      if (isBlocked) {
        setIsBlocked(true)
        setPositiveMessage(rule.positive_message || null)
        return true
      }
    }

    return false
  }

  const handleInputChange = (field: keyof RisqueFaibleAnswers, value: any) => {
    const newAnswers = { ...answers, [field]: value }
    setAnswers(newAnswers)
    setError(null)
  }

  const canProceed = () => {
    if (!currentBlock) return false

    // Vérifier que toutes les questions du bloc actuel sont répondues
    return currentBlock.questions.every((q) => {
      const value = answers[q.field_name as keyof RisqueFaibleAnswers]
      if (q.input_type === 'numeric') {
        return typeof value === 'number' && value >= 0
      }
      // Pour select et boolean
      return value !== undefined && value !== null
    })
  }

  const handleNext = async () => {
    // Ne pas permettre de continuer si déjà bloqué
    if (isBlocked) {
      return
    }

    // Vérifier les conditions bloquantes du bloc actuel AVANT d'avancer
    if (currentBlock) {
      const blocked = checkBlockingCondition(answers, currentBlock.bloc)
      if (blocked) {
        return
      }
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
      setPositiveMessage(null)
    } else {
      actions.setStep('recommendation')
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Récupérer l'adresse depuis le contexte
      const address = state.riskAssessmentResult?.address

      const response = await calculateQuote(riskLevel, answers as RisqueFaibleAnswers, undefined, address, algoVersion)

      if (!response.success) {
        throw new Error(response.error || 'Erreur lors du calcul du devis')
      }

      if (response.data?.is_blocked) {
        setIsBlocked(true)
        setPositiveMessage(response.data.positive_message || null)
        return
      }

      // Sauvegarder le devis dans le contexte
      actions.setQuote({
        riskLevel: riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1) as 'Faible' | 'Moyen' | 'Élevé',
        totalEstimate: response.data?.devis_total,
        totalCost: response.data?.devis_total,
        resultId: response.data?.quote_id,
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

  const renderQuestion = (question: Question) => {
    const value = answers[question.field_name as keyof RisqueFaibleAnswers]

    if (question.input_type === 'select' || question.input_type === 'boolean') {
      return (
        <div key={question.id}>
          <Label className="text-lg font-semibold mb-4 block">{question.question_text}</Label>
          <RadioGroup
            value={value !== undefined ? String(value) : ''}
            onValueChange={(val) => {
              const parsedValue = val === 'true' ? true : val === 'false' ? false : val
              handleInputChange(question.field_name as keyof RisqueFaibleAnswers, parsedValue)
            }}
          >
            {question.options_json?.map((option) => (
              <div key={String(option.value)} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                <RadioGroupItem value={String(option.value)} id={`${question.field_name}-${option.value}`} />
                <Label htmlFor={`${question.field_name}-${option.value}`} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )
    }

    if (question.input_type === 'numeric') {
      return (
        <div key={question.id}>
          <Label htmlFor={question.field_name} className="text-lg font-semibold mb-2 block">
            {question.question_text}
          </Label>
          <Input
            id={question.field_name}
            type="number"
            min="0"
            value={typeof value === 'number' ? value : ''}
            onChange={(e) => handleInputChange(question.field_name as keyof RisqueFaibleAnswers, parseInt(e.target.value) || 0)}
            className="text-lg"
          />
        </div>
      )
    }

    return null
  }

  // État de chargement
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-lg text-gray-600">Chargement du questionnaire...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Erreur de chargement
  if (error && questionBlocks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-6 h-6" />
              <span>Erreur</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-6">{error}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isBlocked) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Votre logement est déjà protégé !
                </h2>
              </div>

              {positiveMessage && (
                <div className="mb-6 p-6 bg-white rounded-lg border border-green-200 shadow-sm">
                  <p className="text-lg text-gray-700 leading-relaxed">{positiveMessage}</p>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsBlocked(false)
                    setPositiveMessage(null)
                    if (currentBlockIndex > 0) {
                      setCurrentBlockIndex(currentBlockIndex - 1)
                    }
                  }}
                  className="border-gray-300 hover:bg-gray-100"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Modifier mes réponses
                </Button>
                <Button
                  onClick={() => actions.setStep('recommendation')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Retour à l'accueil
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  // Pas de bloc actuel (ne devrait pas arriver)
  if (!currentBlock) {
    return null
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
        <CardContent className="p-6 relative">
          {/* Bouton info en haut à droite */}
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowInfo(!showInfo)}
              className="text-blue-600 hover:bg-blue-50"
            >
              <Info className="w-5 h-5" />
            </Button>
          </div>

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
            {currentBlock.questions.map((question) => renderQuestion(question))}
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
