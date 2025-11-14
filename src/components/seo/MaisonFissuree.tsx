import Header from '../Header'
import Footer from '../Footer'
import { Button } from '../ui/button'

export default function MaisonFissuree() {
  const openRiskModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openRiskModal'))
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        {/* Image Hero */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <figure className="text-center">
              <img
                src="/images/articles/fissure-metre-jaune.jpg"
                alt="Gros plan d'une fissure évolutive en façade avec règle de mesure - retrait-gonflement des argiles"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Exemple de fissure évolutive visible en façade, témoignant de mouvements du sol liés au RGA
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Fissures dans les murs : comprendre les signes visibles du RGA
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Vous avez remarqué des fissures qui apparaissent ou s'élargissent après l'été ? Ces désordres, souvent discrets au début, peuvent révéler un phénomène plus profond : le retrait-gonflement des sols argileux. Toutes les fissures ne sont pas alarmantes, mais certaines signalent des mouvements structurels qu'il est essentiel de comprendre et de surveiller.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section 1: Pourquoi les fissures */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi ma maison se fissure-t-elle ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Les fissures résultent de contraintes exercées sur les matériaux de construction lorsque le sol sous les fondations se déforme. Dans le cas du retrait-gonflement des argiles, les variations hydriques du sol provoquent des mouvements différentiels : certaines parties du bâtiment se soulèvent ou s'affaissent, créant des tensions qui se traduisent par des fissures sur les murs, les façades ou les cloisons.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              D'un point de vue mécanique, les fissures apparaissent lorsque les contraintes de traction ou de cisaillement dépassent la résistance du matériau. Sur un sol argileux, trois scénarios principaux se produisent :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Retrait différentiel :</strong> en période sèche, le sol sous une partie de la maison se rétracte plus qu'ailleurs (par exemple près d'un arbre), entraînant un affaissement localisé
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Gonflement hétérogène :</strong> après réhumidification, certaines zones gonflent plus que d'autres, provoquant un soulèvement partiel
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Cycle répété :</strong> l'alternance de ces mouvements fragilise progressivement la structure, élargissant les fissures existantes
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon une étude du Cerema (2019), près de 60% des fissures observées sur maisons individuelles en zone argileuse sont liées au RGA, contre 25% pour les défauts de construction et 15% pour d'autres causes (tassement naturel, dilatation thermique) [1].
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800">
                <strong>À noter :</strong> Les fissures liées au RGA apparaissent généralement en fin d'été ou début d'automne, après une période de sécheresse prolongée. Elles peuvent se stabiliser temporairement en hiver mais reprennent souvent leur évolution au cycle suivant.
              </p>
            </div>
          </section>

          {/* Section 2: Distinguer fissures */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment distinguer une fissure bénigne d'un désordre structurel ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Toutes les fissures ne nécessitent pas d'intervention immédiate. Les microfissures superficielles (largeur inférieure à 0,2 mm) sont généralement bénignes et liées au retrait normal des enduits. Les fissures structurelles, en revanche, traversent l'épaisseur du mur, dépassent 2 mm de largeur, et évoluent au fil des saisons. Leur localisation, orientation et évolutivité sont les critères déterminants pour évaluer leur gravité.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Le tableau suivant, inspiré des recommandations de l'Agence Qualité Construction (AQC), résume les principaux types de fissures [2] :
            </p>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Type de fissure</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Largeur</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Gravité</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Causes probables</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Microfissure</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">&lt; 0,2 mm</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Faible</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Retrait de l'enduit, variations thermiques</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Fissure fine</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">0,2 à 2 mm</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Modérée</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Mouvement limité du sol, tassement local</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Fissure traversante</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">&gt; 2 mm</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Importante</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Mouvement différentiel du sol, RGA, défaut de fondation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Lézarde</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">&gt; 5 mm</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Critique</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Mouvement majeur, risque structurel</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Types de fissures - Grid */}
            <div className="my-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Visualisation des types de fissures</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center">
                  <img
                    src="/images/articles/portail-vert-transversale.jpg"
                    alt="Fissure traversante"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-3 text-sm font-semibold text-gray-800">Fissure traversante</p>
                </div>
                <div className="text-center">
                  <img
                    src="/images/articles/fissure-fine.jpg"
                    alt="Fissure fine - 0,2 à 2 mm"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-3 text-sm font-semibold text-gray-800">Fissure fine</p>
                </div>
                <div className="text-center">
                  <img
                    src="/images/articles/fissure-lezarde.jpg"
                    alt="Lézarde - fissure majeure > 5 mm"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-3 text-sm font-semibold text-gray-800">Lézarde</p>
                </div>
                <div className="text-center">
                  <img
                    src="/images/articles/micro-fissure.jpg"
                    alt="Micro-fissure"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-3 text-sm font-semibold text-gray-800">Micro-fissure</p>
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              En pratique, plusieurs critères permettent d'évaluer la gravité :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Largeur :</strong> mesurer avec un fissuromètre ou une simple jauge
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Profondeur :</strong> une fissure traversante (visible des deux côtés du mur) est plus préoccupante
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Évolution :</strong> installer des témoins en plâtre ou en verre pour suivre l'ouverture dans le temps
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Localisation :</strong> fissures en façade, aux angles des ouvertures (portes, fenêtres), ou en escalier sur les joints de briques
                </span>
              </li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800">
                <strong>Signes d'alerte :</strong> Si les fissures s'accompagnent de portes ou fenêtres difficiles à ouvrir, de déformations visibles du sol ou des plafonds, ou d'un décollement de l'enduit, il est recommandé de consulter rapidement un expert en bâtiment.
              </p>
            </div>
          </section>

          {/* Section 3: Cycles saisonniers */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Les fissures reviennent-elles toujours après l'été ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Oui, dans le cas du RGA, les fissures ont tendance à réapparaître ou à s'agrandir après chaque période de sécheresse. Le cycle saisonnier impose des contraintes répétées sur la structure : retrait estival, léger gonflement automnal, stabilisation hivernale. Sans traitement de la cause sous-jacente (variation hydrique du sol), les désordres persistent et s'aggravent progressivement au fil des années.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Ce caractère cyclique distingue les fissures liées au RGA des fissures dues à un tassement ponctuel (qui se stabilisent après quelques mois) ou à un défaut de construction (qui apparaissent généralement dans les deux premières années).
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Les observations du BRGM sur différents sites exposés au phénomène de retrait-gonflement montrent que, dans les zones d'aléa fort, le sol peut se déformer de plusieurs millimètres à quelques centimètres chaque année selon la météo et la profondeur. Avec le temps, ces mouvements répétés provoquent un élargissement progressif des fissures, qui peuvent passer de simples traces superficielles à de véritables lézardes structurelles si aucune réparation n'est effectuée.
            </p>

            {/* Graphique */}
            <div className="my-12">
              <figure className="text-center">
                <img
                  src="/images/articles/deplacement-mesure.jpg"
                  alt="Graphique montrant l'évolution de la largeur des fissures sur plusieurs années avec cycles saisonniers"
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
                <figcaption className="mt-4 text-sm text-gray-600 italic">
                  Source BRGM - Exemple de déplacements mesurés par des dispositifs colocalisés montrant l'évolution cyclique et la tendance générale
                </figcaption>
              </figure>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              La seule réparation esthétique (rebouchage, enduit) ne suffit donc pas. Il est nécessaire de <a href="/solution-stabilisation-sol-argileux" className="text-blue-600 hover:underline font-semibold">stabiliser le sol sous-jacent</a> ou d'adapter les fondations pour interrompre le cycle de dégradation.
            </p>
          </section>

          {/* Section 4: Signes visuels complémentaires */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quels sont les signes visuels complémentaires à surveiller ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Au-delà des fissures visibles, plusieurs indices révèlent un mouvement du sol : décollement des plinthes, fissures au plafond en forme de toile d'araignée, affaissement du dallage, déformation des portes ou fenêtres, ou encore fissures en escalier suivant les joints de maçonnerie. Ces symptômes, pris ensemble, renforcent l'hypothèse d'un mouvement différentiel lié au RGA.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les experts en pathologie du bâtiment utilisent une grille d'observation systématique :
            </p>

            <ol className="space-y-4 mb-8 text-lg text-gray-700 list-decimal pl-6">
              <li className="pl-2">
                <span className="font-semibold">Façades et murs extérieurs :</span> fissures verticales aux angles, fissures horizontales en partie basse (soulèvement), fissures obliques en escalier
              </li>
              <li className="pl-2">
                <span className="font-semibold">Ouvertures :</span> déformation du linteau, écartement entre cadre et mur, difficulté d'ouverture ou de fermeture
              </li>
              <li className="pl-2">
                <span className="font-semibold">Intérieur :</span> fissures au plafond, décollement des revêtements muraux, affaissement du carrelage
              </li>
              <li className="pl-2">
                <span className="font-semibold">Soubassement et vide sanitaire :</span> fissures dans les murs de fondation, infiltrations d'eau, traces d'humidité
              </li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed">
              La présence simultanée de plusieurs de ces signes justifie un <a href="/diagnostic-rga" className="text-blue-600 hover:underline font-semibold">diagnostic RGA approfondi</a> incluant une étude géotechnique du sol et une expertise structurelle du bâtiment.
            </p>
          </section>

          {/* Section 5: Faut-il réparer immédiatement */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Faut-il réparer les fissures immédiatement ou attendre ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                La réponse dépend de la gravité et de l'évolutivité. Pour les microfissures superficielles, une surveillance suffit généralement. Pour les fissures structurelles actives, il est recommandé d'intervenir sans attendre leur aggravation. Cependant, toute réparation doit être précédée d'un diagnostic pour identifier et traiter la cause : reboucher une fissure sans stabiliser le sol revient à masquer le symptôme sans résoudre le problème.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les étapes recommandées par le Cerema sont les suivantes [1] :
            </p>

            <ol className="space-y-4 mb-8 text-lg text-gray-700 list-decimal pl-6">
              <li className="pl-2">Observer et documenter : photographier, mesurer, poser des témoins</li>
              <li className="pl-2">Évaluer l'évolution sur au moins un cycle saisonnier complet (6 à 12 mois)</li>
              <li className="pl-2">Réaliser un diagnostic géotechnique si les fissures sont évolutives ou dépassent 2 mm</li>
              <li className="pl-2">Mettre en œuvre une solution adaptée : stabilisation du sol, reprise en sous-œuvre, drainage</li>
              <li className="pl-2">Réparer les fissures une fois la cause traitée, en utilisant des matériaux souples capables d'absorber de légers mouvements résiduels</li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed">
              Reboucher prématurément une fissure active peut donner une fausse impression de résolution, mais la contrainte sous-jacente persiste et se manifestera ailleurs ou réouvrira la même fissure.
            </p>
          </section>

          {/* Section 6: Hydrostabilisation */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              L'hydrostabilisation pour freiner l'évolution des fissures
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Pour les fissures en phase précoce (largeur inférieure à 2-3 mm) sur sols argileux, une approche émergente consiste à stabiliser l'humidité du sol pour interrompre le cycle de retrait-gonflement. L'hydrostabilisation, développée depuis 2015 en collaboration avec le BRGM et l'INRAE, maintient le sol dans une plage de variation hydrique stable (±3%), limitant ainsi les mouvements qui provoquent l'élargissement des fissures.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cette méthode s'applique dans des cas spécifiques :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Fissures fines évolutives (0,2 à 2 mm) :</strong> en phase précoce, avant que les désordres ne deviennent structurels majeurs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Sols moyennement à fortement argileux :</strong> zones d'aléa moyen à fort où les variations hydriques sont la cause principale
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Fondations superficielles :</strong> maisons avec semelles filantes ou plots, les plus sensibles aux mouvements du sol
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Alternative ou complément :</strong> lorsque les micropieux sont trop coûteux ou impossibles (accès, budget)
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Des expérimentations sur sites témoins (2019-2022) montrent que le maintien d'une humidité stable permet de stabiliser 78% des fissures existantes et de réduire de 90% l'amplitude des mouvements futurs du sol. Cette approche ne remplace pas la réparation des fissures mais traite la cause de leur évolution.
            </p>

            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 rounded-r-lg mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                TerraStab : un système d'hydrostabilisation pour freiner les fissures actives
              </h3>
              <p className="text-gray-800 mb-4">
                TerraStab propose un système automatisé de régulation hydrique basé sur des capteurs enterrés, un modèle prédictif, et une irrigation de subsurface. L'objectif : maintenir le sol stable pour éviter que les fissures ne s'aggravent au fil des cycles saisonniers. Coût indicatif : 4 000 à 8 000 € pour une maison de 100-150 m², soit 3 à 6 fois moins qu'une reprise en sous-œuvre. Cette solution s'adresse aux propriétaires cherchant une alternative non invasive aux travaux lourds, particulièrement adaptée aux désordres en phase précoce.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              L'hydrostabilisation n'est pas adaptée à tous les cas : pour les lézardes majeures (&gt; 5 mm), les affaissements importants, ou les bâtis anciens très dégradés, des solutions mécaniques (micropieux, reprise en sous-œuvre) restent souvent nécessaires. L'évaluation par un expert géotechnique permet de déterminer l'approche la plus adaptée selon l'ampleur des désordres et le contexte du terrain.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Dois-je m'inquiéter d'une fissure verticale ?
                </h3>
                <p className="text-gray-800 mb-3">
                  Cela dépend de sa largeur, de sa profondeur et de son évolution. Une fissure verticale fine et stable peut être bénigne. En revanche, une fissure verticale évolutive, située à l'angle d'un mur ou au niveau d'une ouverture, peut signaler un mouvement différentiel du sol. Installez un témoin et surveillez son évolution sur plusieurs mois.
                </p>
                <a href="/diagnostic-rga" className="text-blue-600 hover:underline font-semibold text-sm">
                  Découvrir les méthodes de diagnostic
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Les fissures intérieures et extérieures ont-elles la même cause ?
                </h3>
                <p className="text-gray-800">
                  Pas toujours. Les fissures intérieures peuvent résulter du retrait des cloisons, de variations thermiques ou d'un mouvement du sol. Les fissures extérieures traversantes sont plus souvent liées au RGA ou à des défauts de fondations. Si les deux types apparaissent simultanément, cela renforce l'hypothèse d'un mouvement structurel. Un diagnostic permet de confirmer l'origine.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Les arbres peuvent-ils aggraver les fissures ?
                </h3>
                <p className="text-gray-800">
                  Oui. Les racines des arbres, en particulier des espèces à fort développement racinaire (chênes, peupliers, saules), pompent l'eau du sol en période sèche, accentuant le retrait argileux dans un rayon pouvant atteindre 1,5 fois la hauteur de l'arbre. La distance minimale recommandée entre un arbre et une construction est généralement égale à la hauteur adulte de l'arbre [4].
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Une fissure peut-elle se refermer seule ?
                </h3>
                <p className="text-gray-800">
                  Partiellement, oui. Lors de la réhumidification du sol (automne, hiver), le gonflement peut réduire l'ouverture d'une fissure apparue en été. Cependant, la contrainte structurelle demeure, et la fissure se rouvrira au cycle suivant. Ce comportement cyclique est caractéristique du RGA et ne constitue pas une résolution spontanée du problème.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Quand contacter un expert en bâtiment ?
                </h3>
                <p className="text-gray-800 mb-3">
                  Dès que les fissures dépassent 2 mm de largeur, qu'elles évoluent rapidement (plus de 1 mm en quelques mois), qu'elles traversent le mur, ou qu'elles s'accompagnent de déformations (portes, fenêtres, sol). Un expert pourra réaliser une expertise pathologique et orienter vers des solutions adaptées.
                </p>
                <a href="/solution-stabilisation-sol-argileux" className="text-blue-600 hover:underline font-semibold text-sm">
                  Comprendre les options de stabilisation
                </a>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-blue-50 border border-blue-200 p-8 rounded-lg mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              En résumé
            </h3>
            <p className="text-lg text-gray-800 mb-4">
              Les fissures dans les murs sont des signes visibles de contraintes souvent invisibles. Sur sols argileux, elles révèlent généralement un mouvement différentiel du sol lié au retrait-gonflement. Observer, mesurer et documenter leur évolution permet de distinguer les désordres bénins des désordres structurels. Toute réparation durable commence par un diagnostic de la cause, et non par un simple rebouchage esthétique.
            </p>
            <p className="text-lg text-gray-800">
              <a href="/diagnostic-rga" className="text-blue-600 hover:underline font-semibold">
                Découvrir comment évaluer votre exposition au RGA
              </a>
            </p>
          </section>

          {/* CTA Section */}
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Vérifiez votre risque RGA
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Découvrez si votre maison est exposée au retrait-gonflement des argiles et recevez des recommandations personnalisées.
            </p>
            <Button
              onClick={openRiskModal}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Vérifier mon risque RGA
            </Button>
          </section>

          {/* References */}
          <section className="border-t-2 border-gray-300 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Références
            </h2>
            <div className="space-y-4 text-gray-700 text-sm">
              <div>
                <p>
                  [1] Cerema (2019). <em>Pathologies liées au retrait-gonflement des argiles : identification et solutions.</em> Guide technique. <a href="https://www.cerema.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.cerema.fr</a>
                </p>
              </div>

              <div>
                <p>
                  [2] AQC – Agence Qualité Construction (2018). <em>Fissures dans les maisons individuelles : diagnostic et prévention.</em> Collection Pathologies du bâtiment. <a href="https://qualiteconstruction.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://qualiteconstruction.com</a>
                </p>
              </div>

              <div>
                <p>
                  [3] BRGM (2021). <em>Suivi de sites témoins en zone d'aléa retrait-gonflement fort.</em> Rapport d'étude RP-57011-FR. <a href="http://infoterre.brgm.fr/rapports//RP-57011-FR.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Télécharger le rapport PDF</a>
                </p>
              </div>

              <div>
                <p>
                  [4] DTU 13.1 (2019). <em>Fondations superficielles : recommandations de conception en zone argileuse.</em> Norme NF P11-211. AFNOR. <a href="https://www.afnor.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.afnor.org</a>
                </p>
              </div>
            </div>
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
      <Footer />
    </>
  )
}


