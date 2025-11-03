import Header from '../Header'
import Footer from '../Footer'
import RiskAssessmentSection from '../RiskAssessmentSection'
import { Button } from '../ui/button'
import { CheckCircle2, AlertTriangle } from 'lucide-react'

export default function FissuresMurs() {
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
                Fissures dans les murs : quand faut-il s'inquiéter ?
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Vous avez remarqué une fissure sur la façade, au coin d'une fenêtre ou le long d'un mur intérieur ?
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ces marques ne sont pas anodines : elles peuvent révéler un <strong>désordre structurel lié aux mouvements du sol</strong>, amplifiés par le phénomène de <strong>retrait-gonflement des argiles (RGA)</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* Section Alerte */}
        <section className="bg-amber-50 border-y border-amber-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-800">
                Chaque année, des milliers de maisons en France sont touchées par ce phénomène naturel, désormais reconnu comme <strong>catastrophe naturelle</strong> par l'État.
              </p>
            </div>
          </div>
        </section>

        {/* Pourquoi les fissures apparaissent */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi les fissures apparaissent-elles ?
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les fissures apparaissent lorsque le sol argileux sous vos fondations <strong>se contracte en période de sécheresse</strong> puis <strong>gonfle lors des pluies</strong>, exerçant des pressions inégales sur la structure du bâtiment.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ces déformations sont invisibles au quotidien… jusqu'au jour où vos murs se fissurent.
            </p>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Les indices les plus fréquents :
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Ouvertures en diagonale au-dessus des portes et fenêtres</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Lézardes traversant les murs porteurs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Fissures s'élargissant après chaque été sec</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Comprendre son risque */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comprendre son risque avant d'agir
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Avant d'engager des travaux lourds ou coûteux, il est essentiel de <strong>mesurer le risque réel</strong>.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              TerraStab vous propose un <strong>diagnostic en ligne gratuit</strong>, basé sur :
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <span className="text-blue-600 font-bold">•</span>
                les <strong>cartes officielles du BRGM</strong>,
              </li>
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <span className="text-blue-600 font-bold">•</span>
                les <strong>données climatiques locales</strong>,
              </li>
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <span className="text-blue-600 font-bold">•</span>
                et les <strong>caractéristiques de votre maison</strong>.
              </li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
              <Button
                onClick={openRiskModal}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Vérifier mon risque maintenant
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Ce diagnostic constitue <strong>la première étape vers la stabilisation de votre maison</strong>, sans déplacement ni engagement.
              </p>
            </div>
          </section>

          {/* Solution recherche publique */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Une solution simple, issue de la recherche publique
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Née d'un programme de recherche soutenu par l'État et le <strong>BRGM</strong>, la technologie TerraStab permet de <strong>stabiliser durablement les fondations</strong> sans travaux lourds.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cette approche innovante agit <strong>à la source du problème</strong>, en réduisant les variations hydriques autour du bâti.
            </p>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Résultat :
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">moins de mouvements du sol,</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">une maison plus stable,</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">et un coût maîtrisé, quelle que soit la valeur du bien.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Partenaires */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Un réseau de partenaires de confiance
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              TerraStab s'appuie sur un <strong>écosystème reconnu</strong> :
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <span>Experts agréés du <strong>Comité Sécheresse et RGA</strong>,</span>
              </li>
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <span>La recherche nationale du BRGM (<a href="https://www.brgm.fr/fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.brgm.fr/fr</a>),</span>
              </li>
              <li className="flex items-start gap-3 text-lg text-gray-700">
                <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <span>Entreprises locales formées à nos protocoles.</span>
              </li>
            </ul>
            <p className="text-lg text-gray-700 leading-relaxed">
              Cette collaboration garantit des interventions conformes aux normes et un suivi transparent, de l'évaluation au traitement.
            </p>
          </section>

          {/* Pourquoi TerraStab */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi choisir TerraStab ?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-800 font-medium">Technologie issue d'une recherche certifiée</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-800 font-medium">Diagnostic gratuit et immédiat</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-800 font-medium">Solution accessible et non invasive</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-800 font-medium">Réseau de partenaires agréés</span>
              </div>
              <div className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow sm:col-span-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                <span className="text-gray-800 font-medium">Support technique disponible</span>
              </div>
            </div>
          </section>

          {/* Protéger aujourd'hui */}
          <section className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Protégez votre maison dès aujourd'hui
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Ne laissez pas une fissure mineure devenir un problème majeur.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Avec TerraStab, vous accédez à une <strong>solution scientifique, reconnue et économique</strong>, issue de la recherche publique française.
            </p>
            <p className="text-xl font-semibold text-gray-900 mb-6">
              Vérifiez dès maintenant votre risque et recevez une première estimation fiable.
            </p>
            <Button
              onClick={openRiskModal}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Vérifier mon risque
            </Button>
          </section>

          {/* En savoir plus */}
          <section>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              En savoir plus
            </h2>
            <ul className="space-y-3">
              <li>
                <a href="/diagnostic-rga" className="text-lg text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  Comprendre le phénomène de retrait-gonflement des argiles
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-lg text-blue-600 hover:text-blue-700 hover:underline font-medium">
                  Contactez un expert TerraStab
                </a>
              </li>
            </ul>
          </section>
        </article>

        {/* CTA Final */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à protéger votre maison ?
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Obtenez votre diagnostic gratuit en moins de 2 minutes.
            </p>
            <Button
              onClick={openRiskModal}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Testez votre risque RGA
            </Button>
          </div>
        </section>
      </main>
      <RiskAssessmentSection />
      <Footer />
    </>
  )
}
