import Header from '../Header'
import Footer from '../Footer'
import RiskAssessmentSection from '../RiskAssessmentSection'
import { Button } from '../ui/button'
import { CheckCircle2, Search, TrendingUp, Home, AlertCircle } from 'lucide-react'

export default function DiagnosticRga() {
  const openRiskModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openRiskModal'))
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Diagnostic RGA : comprendre votre niveau de risque (simplement et sans jargon)
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Le <strong>retrait-gonflement des argiles (RGA)</strong> fait travailler le sol sous vos fondations. Résultat possible : <strong>ouvertures, fissures, portes qui coincent</strong>, déformations visibles après les étés secs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Avant de penser travaux, commencez par <strong>mesurer précisément le risque</strong>.
              </p>
              <Button
                onClick={openRiskModal}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Commencer mon diagnostic
              </Button>
            </div>
          </div>
        </section>

        {/* Comment fonctionne le diagnostic */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Comment fonctionne notre diagnostic RGA ?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-10">
              Notre diagnostic combine trois blocs de données pour fournir un <strong>score de risque opérationnel</strong> :
            </p>

            <div className="space-y-8">
              {/* Bloc 1 - BRGM */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    <Search className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      1) Contexte géologique (données BRGM)
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Carte officielle d'exposition aux argiles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Niveau de sensibilité et hétérogénéité locale</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bloc 2 - Climat */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      2) Contexte climatique local
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Historique sécheresse/pluviométrie</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Tendances saisonnières qui amplifient le phénomène</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bloc 3 - Maison */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-100 p-3 rounded-lg flex-shrink-0">
                    <Home className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      3) Paramètres de votre maison
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>Typologie de fondations, âge du bâti, fissures observées</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>Environnement proche : arbres, terrasses, dalles, pentes, réseaux</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
              <p className="text-lg text-gray-800">
                Ces éléments sont pondérés pour produire un <strong>score de risque interprétable</strong>, accompagné d'une <strong>recommandation</strong> : surveillance, mesures préventives, ou <strong>stabilisation simple</strong>.
              </p>
            </div>
          </section>

          {/* Ce que vous recevez */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ce que vous recevez après le diagnostic
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-6">
                <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Un score de risque RGA</h3>
                <p className="text-gray-700">Niveau faible / modéré / élevé clairement identifié</p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-xl p-6">
                <div className="bg-amber-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Une explication claire</h3>
                <p className="text-gray-700">Facteurs qui influencent votre score détaillés</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-xl p-6">
                <div className="bg-emerald-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Une première recommandation</h3>
                <p className="text-gray-700">Préventif vs curatif adapté à votre situation</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl p-6">
                <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Une estimation indicative</h3>
                <p className="text-gray-700">Si une stabilisation s'avère pertinente</p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-6">
              <p className="text-lg text-gray-800 font-medium">
                Objectif : <strong>décider sereinement</strong>, sans travaux lourds inutiles.
              </p>
            </div>
          </section>

          {/* Pourquoi un diagnostic */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi un diagnostic avant tout ?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Aller directement aux travaux coûteux peut être <strong>inefficace</strong> si l'origine du désordre n'est pas confirmée.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Le diagnostic RGA <strong>cadre le problème</strong> et <strong>priorise les actions</strong>, pour <strong>investir au bon endroit</strong>.
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">🔎</div>
                <h3 className="font-bold text-gray-900 mb-2">Clarifier l'origine</h3>
                <p className="text-gray-600 text-sm">Confirmer que c'est bien le RGA</p>
              </div>

              <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">🧭</div>
                <h3 className="font-bold text-gray-900 mb-2">Choisir la bonne solution</h3>
                <p className="text-gray-600 text-sm">Prévenir vs traiter selon le cas</p>
              </div>

              <div className="text-center p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">💶</div>
                <h3 className="font-bold text-gray-900 mb-2">Éviter les dépenses</h3>
                <p className="text-gray-600 text-sm">Investir de manière ciblée</p>
              </div>
            </div>
          </section>

          {/* Stabilisation simple */}
          <section className="mb-16 bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-2xl p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Une stabilisation simple, à coût raisonnable
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Lorsque c'est nécessaire, nous proposons une <strong>stabilisation issue de la recherche publique</strong>, pensée pour <strong>réduire les variations hydriques</strong> autour du bâti et <strong>limiter les mouvements différentiels</strong>.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700"><strong>Non invasive</strong> : pas de gros travaux</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700"><strong>Dimensionnée au cas par cas</strong> : adaptée à votre situation</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-700"><strong>Économiquement adaptée</strong> : quelle que soit la valeur du bien</span>
              </div>
            </div>
          </section>

          {/* Partenaires */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Des partenaires et un cadre reconnu
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              TerraStab s'appuie sur :
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <span>des <strong>données officielles</strong> (BRGM),</span>
              </li>
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <span>un <strong>réseau de partenaires</strong> formés à nos protocoles,</span>
              </li>
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <span>une <strong>démarche issue de travaux de recherche</strong>.</span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cette chaîne de confiance garantit <strong>rigueur, traçabilité et transparence</strong>.
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Foire aux questions (FAQ)
            </h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Le diagnostic est-il vraiment gratuit ?
                </h3>
                <p className="text-gray-700">
                  Oui, la première évaluation en ligne est gratuite et sans engagement.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Dois-je fournir des photos de fissures ?
                </h3>
                <p className="text-gray-700">
                  C'est recommandé : elles aident à qualifier le risque et à mieux cibler la recommandation.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Que se passe-t-il après le formulaire ?
                </h3>
                <p className="text-gray-700">
                  Vous recevez un <strong>résumé de risque</strong>. Si besoin, un expert vous contacte pour préciser le contexte et, le cas échéant, vous proposer une <strong>solution de stabilisation</strong> adaptée.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Principal */}
          <section className="mb-16">
            <div className="bg-blue-600 rounded-2xl p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à évaluer votre risque RGA ?
              </h2>
              <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
                Une <strong>dizaine de questions</strong> suffisent pour obtenir un premier <strong>score de risque</strong> et une <strong>recommandation claire</strong>.
              </p>
              <Button
                onClick={openRiskModal}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                Commencer mon diagnostic maintenant
              </Button>
            </div>
          </section>

          {/* Ressources */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ressources utiles
            </h2>
            <ul className="space-y-3">
              <li>
                <a href="/fissures-murs" className="text-lg text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  Fissures dans les murs : quand s'inquiéter ?
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-lg text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  Contact
                </a>
              </li>
            </ul>
          </section>
        </article>
      </main>
      <RiskAssessmentSection />
      <Footer />
    </>
  )
}
