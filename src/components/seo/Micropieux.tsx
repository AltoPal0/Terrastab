import Header from '../Header'
import Footer from '../Footer'
import { Button } from '../ui/button'
import RiskAssessmentSection from '../RiskAssessmentSection'

export default function Micropieux() {
  const openRiskModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openRiskModal'))
    }
  }

  return (
    <>
      <Header />
      <RiskAssessmentSection />
      <main className="min-h-screen bg-white">
        {/* Image Hero */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <figure className="text-center">
              <img
                src="/images/articles/chantier-micropieux.png"
                alt="Chantier de forage pour installation de micropieux - fondations en profondeur"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Installation de micropieux : foreuse en action pour ancrer les fondations en profondeur
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Micropieux : la solution mécanique classique
            </h1>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                Les micropieux constituent depuis plusieurs décennies la référence en matière de reprise en sous-œuvre des fondations. Face aux désordres liés au retrait-gonflement des argiles, cette technique mécanique offre une solution fiable mais exigeante en termes de coût et de mise en œuvre. Comprendre son principe, ses avantages et ses limites permet de mieux évaluer les alternatives désormais disponibles.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section 1: Definition */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Qu'est-ce qu'un micropieu et à quoi sert-il ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Un micropieu est un élément de fondation profonde de faible diamètre (généralement 10 à 30 cm) foré ou battu dans le sol jusqu'à une couche stable, située au-delà de la zone soumise au retrait-gonflement. Il transfère les charges du bâtiment vers cette couche profonde, contournant ainsi les mouvements du sol argileux superficiel. Les micropieux sont utilisés en reprise en sous-œuvre pour stabiliser des fondations existantes affectées par le RGA.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              D'un point de vue technique, les micropieux fonctionnent selon deux mécanismes principaux :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Ancrage en pointe :</strong> la base du pieu atteint une couche incompressible (roche, sable compact) qui supporte directement la charge
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Frottement latéral :</strong> la surface du pieu mobilise les résistances du sol environnant sur toute sa longueur
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Dans le contexte du RGA, les micropieux sont généralement ancrés à 3 à 8 mètres de profondeur, selon la stratigraphie locale. À cette profondeur, les variations hydriques saisonnières n'affectent plus le sol, garantissant une stabilité permanente.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon le Cerema, les micropieux permettent de reprendre des charges allant de 50 à 300 kN par élément, soit l'équivalent de plusieurs tonnes. Pour une maison individuelle, on compte généralement entre 10 et 30 micropieux selon la surface et la configuration des désordres [1].
            </p>

            {/* Schéma technique */}
            <figure className="my-12 text-center">
              <img
                src="/images/articles/micropieux-schema.jpg"
                alt="Schéma technique d'un micropieu : coupe montrant l'ancrage en profondeur et les couches de sol"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Coupe technique d'un micropieu : ancrage progressif dans les couches géologiques stables
              </figcaption>
            </figure>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8">
              <p className="font-semibold text-gray-900 mb-2">Ordre de grandeur :</p>
              <p className="text-gray-800">
                Pour une maison de 100 m², le nombre moyen de micropieux nécessaires se situe entre 12 et 20, avec une profondeur d'ancrage de 4 à 6 mètres. Le coût total de l'intervention varie entre 15 000 et 40 000 €, selon l'accessibilité du chantier et la nature du sol [2].
              </p>
            </div>
          </section>

          {/* Section 2: When needed */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Dans quels cas les micropieux sont-ils nécessaires ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Les micropieux sont indiqués dans plusieurs situations : désordres structurels majeurs avec lézardes et déformations importantes, mouvements du sol dépassant 4 à 5 cm d'amplitude, bâti ancien à fondations très superficielles (moins de 40 cm), ou sols argileux très gonflants en zone d'aléa très fort. Ils constituent une solution de dernier recours lorsque les méthodes préventives ou moins invasives ne sont pas suffisantes.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les critères techniques justifiant le recours aux micropieux incluent :
            </p>

            <ol className="space-y-4 mb-8 text-lg text-gray-700 list-decimal pl-6">
              <li className="pl-2">
                <span className="font-semibold">Gravité des désordres :</span> fissures dépassant 5 mm de largeur, lézardes traversantes, affaissement visible du sol ou des planchers
              </li>
              <li className="pl-2">
                <span className="font-semibold">Évolutivité rapide :</span> élargissement des fissures de plus de 2 mm par an malgré une surveillance
              </li>
              <li className="pl-2">
                <span className="font-semibold">Échec des solutions alternatives :</span> drainage, renforcement, ou régulation hydrique insuffisants face à l'amplitude des mouvements
              </li>
              <li className="pl-2">
                <span className="font-semibold">Profondeur du sol stable :</span> lorsque la couche d'argile gonflante dépasse 2 mètres d'épaisseur, les fondations superficielles classiques ne peuvent être renforcées efficacement
              </li>
              <li className="pl-2">
                <span className="font-semibold">Valeur patrimoniale du bâti :</span> immeubles classés, constructions anciennes nécessitant une stabilisation définitive
              </li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              En revanche, pour des fissures fines (inférieures à 2 mm) en phase précoce, des mouvements modérés (inférieurs à 2 cm), ou un sol moyennement argileux, des solutions moins invasives comme la régulation hydrique peuvent suffire et éviter les travaux lourds [3].
            </p>
          </section>

          {/* Section 3: Costs */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi cette solution est-elle souvent coûteuse ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Le coût élevé des micropieux s'explique par la complexité de la mise en œuvre : forages profonds nécessitant des engins spécialisés, reprise en sous-œuvre impliquant la découpe et le soulèvement partiel du bâti, main-d'œuvre qualifiée, et matériaux (acier, béton, résine). À ces coûts directs s'ajoutent les frais indirects : étude géotechnique approfondie, impact sur l'occupation du logement, et délais de réalisation de plusieurs semaines.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Décomposition des coûts
            </h3>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Poste de dépense</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Proportion du coût total</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Montant moyen (maison 100 m²)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Étude géotechnique G2 AVP</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">10-15%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">2 000 - 3 500 €</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Forages et installation des micropieux</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">50-60%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">10 000 - 24 000 €</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Reprise en sous-œuvre (longrines, ceinturage)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">20-25%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">4 000 - 10 000 €</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Réparation des fissures et finitions</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">10-15%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">2 000 - 4 000 €</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Plusieurs facteurs font varier le coût à la hausse :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Accessibilité du chantier :</strong> un terrain enclavé ou une maison mitoyenne complique l'acheminement des engins de forage, augmentant les délais et les coûts
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Nature du sol :</strong> un sol rocheux ou très compact nécessite des techniques de forage plus coûteuses (boue bentonitique, tubage provisoire)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Profondeur d'ancrage :</strong> chaque mètre supplémentaire de profondeur augmente le coût unitaire du micropieu de 50 à 100 €
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Configuration du bâti :</strong> présence de vide sanitaire, de sous-sol, ou de plancher chauffant complique la reprise en sous-œuvre
                </span>
              </li>
            </ul>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg mb-8">
              <p className="font-semibold text-gray-900 mb-2">Impact sur l'occupation :</p>
              <p className="text-gray-800">
                Les travaux de reprise en sous-œuvre nécessitent généralement l'évacuation partielle du logement pendant 2 à 4 semaines. Cette contrainte, rarement chiffrée, représente un coût indirect significatif (hébergement temporaire, garde-meubles, perte de jouissance).
              </p>
            </div>
          </section>

          {/* Section 4: Alternatives */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quelles alternatives existent aujourd'hui ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Face aux limites économiques et pratiques des micropieux, plusieurs alternatives se sont développées ces dernières années : la régulation hydrique du sol (stabilisation active de la teneur en eau), l'injection de résine expansive (comblement des vides et compactage du sol), les pieux vissés (moins invasifs que les micropieux forés), et les solutions hybrides combinant plusieurs techniques. Ces méthodes visent à réduire les coûts et les nuisances tout en maintenant une efficacité acceptable.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Comparaison des principales alternatives
            </h3>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Solution</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Principe</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Coût moyen</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Efficacité</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Limites</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Micropieux forés</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Ancrage profond mécanique</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">15 000 - 50 000 €</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">95-100%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Coût élevé, travaux lourds</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Régulation hydrique</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Stabilisation de l'humidité du sol</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">4 000 - 8 000 €</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">85-90%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Nécessite maintenance, sol argileux requis</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Injection de résine</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Compactage et comblement du sol</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">8 000 - 15 000 €</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">70-80%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Efficacité variable selon le sol, durabilité limitée</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Pieux vissés</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Ancrage par vissage (moins invasif)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">10 000 - 25 000 €</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">85-95%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Profondeur limitée, pas adapté à tous les sols</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Drainage renforcé</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Évacuation de l'eau excédentaire</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">3 000 - 6 000 €</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">40-60%</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Préventif uniquement, inefficace en sécheresse</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Le choix de la solution dépend de plusieurs facteurs :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Stade des désordres :</strong> prévention ou fissures débutantes → régulation hydrique ; désordres avancés → micropieux
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Budget disponible :</strong> moins de 10 000 € → alternatives ; plus de 15 000 € → toutes options
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Contraintes d'occupation :</strong> maison habitée sans possibilité d'évacuation → régulation hydrique ou injection de résine
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Nature du sol :</strong> argile moyennement gonflante → alternatives suffisantes ; argile très gonflante → micropieux recommandés
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon une étude du BRGM (2021), les nouvelles approches issues de la recherche publique, notamment la régulation hydrique, permettent de traiter efficacement 70 à 75% des cas de désordres liés au RGA à un coût 3 à 5 fois inférieur à celui des micropieux, réservant ces derniers aux situations les plus critiques [4].
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Focus : Hydrostabilisation vs Micropieux - Comparatif technique et économique
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              L'hydrostabilisation, développée par TerraStab en collaboration avec le BRGM et l'INRAE, représente une alternative validée scientifiquement aux micropieux pour des cas d'usage spécifiques. Voici un comparatif détaillé pour aider à la décision :
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Critère</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Hydrostabilisation (TerraStab)</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Micropieux</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Principe</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Traite la cause : maintient l'humidité du sol stable</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Contourne le problème : ancrage en profondeur</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Cas d'usage optimal</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Zones d'aléa moyen/fort, fissures &lt; 3 mm, prévention</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Toutes zones, lézardes majeures, bâti très dégradé</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Efficacité</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">85-90% de réduction des mouvements</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">95-100% (stabilisation définitive)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Durée d'installation</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">1-3 jours</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">2-6 semaines</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Coût (maison 100 m²)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">4 000 - 8 000 €</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">15 000 - 50 000 €</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Invasivité</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Très faible (capteurs enterrés)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Forte (forage, reprise structurelle)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Maintenance</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Annuelle (capteurs, filtres irrigation)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Aucune</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Délai d'efficacité</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">3-6 mois (stabilisation progressive)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Immédiat (dès fin travaux)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800 font-semibold">Validation scientifique</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">12 sites témoins BRGM (2019-2022)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Décennies d'utilisation, norme DTU</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-semibold">
              Recommandations d'orientation :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Choisir l'hydrostabilisation si :</strong> fissures en phase précoce (&lt; 3 mm), fondations superficielles, budget limité, souhait d'une solution non invasive, zone d'aléa moyen à fort
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Choisir les micropieux si :</strong> lézardes majeures (&gt; 5 mm), affaissements importants, bâti ancien très dégradé, nécessité d'une stabilisation immédiate et définitive
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Approche combinée :</strong> micropieux localisés (angles critiques) + hydrostabilisation globale pour optimiser coût et efficacité
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Dans la majorité des cas (70-75% selon le BRGM), l'hydrostabilisation suffit à stopper l'évolution des désordres et à prévenir leur aggravation. Les micropieux restent indispensables pour les 25-30% de cas les plus sévères nécessitant une reprise structurelle immédiate.
            </p>
          </section>

          {/* Section 5: Does it solve the problem */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Les micropieux règlent-ils définitivement le problème du RGA ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Les micropieux stabilisent le bâti en l'ancrant dans une couche profonde non soumise au RGA. Ils traitent donc les conséquences du phénomène, mais pas sa cause : le sol argileux superficiel continue de bouger. Si les fondations sont correctement reprises, le bâti ne subira plus de mouvements. Cependant, des désordres annexes peuvent persister (fissures de dallage, affaissement du terrain autour de la maison) et le sol continue de nécessiter une gestion hydrique adaptée.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Concrètement, après la pose de micropieux :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  Les fondations et la structure du bâtiment sont stabilisées définitivement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  Les fissures structurelles cessent d'évoluer (après réparation)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span>
                  La valeur du bien est préservée ou restaurée
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>
                  Le sol argileux autour de la maison continue de bouger (affaissement du terrain, fissures de terrasse ou de dallage)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>
                  Les arbres et la végétation peuvent encore accentuer les variations hydriques locales
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 font-bold">✗</span>
                <span>
                  Le coût de l'intervention ne comprend pas toujours la réparation complète des finitions intérieures
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              En outre, les micropieux ne préviennent pas l'apparition de nouveaux désordres sur des extensions ou des annexes non reprises. Une approche globale incluant la gestion de la végétation, le drainage, et éventuellement une régulation hydrique complémentaire permet d'optimiser la durabilité de l'intervention.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Combien coûte un micropieu pour une maison ?
                </h3>
                <p className="text-gray-800">
                  Le coût unitaire d'un micropieu varie de 600 à 1 500 € selon la profondeur d'ancrage, le diamètre, et la nature du sol. Pour une maison individuelle de 100 m², comptez entre 12 et 20 micropieux, soit un coût matériel de 10 000 à 24 000 €. Ajoutez 5 000 à 15 000 € pour la reprise en sous-œuvre et les finitions, soit un total de 15 000 à 50 000 € [2][5].
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Faut-il un diagnostic avant d'en poser ?
                </h3>
                <p className="text-gray-800">
                  Oui, absolument. Une étude géotechnique de type G2 AVP (avant-projet) est indispensable pour dimensionner correctement les micropieux : nombre, profondeur d'ancrage, diamètre, type de sol porteur. Sans diagnostic, le risque de sous-dimensionnement (inefficacité) ou de sur-dimensionnement (surcoût) est élevé.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Les micropieux règlent-ils le problème du RGA ?
                </h3>
                <p className="text-gray-800">
                  Ils stabilisent le bâti en contournant le problème, mais ne traitent pas la cause (variation hydrique du sol). Le sol argileux superficiel continue de bouger, ce qui peut affecter le terrain, les terrasses, ou les dallages non repris. Une gestion complémentaire de l'humidité du sol reste recommandée pour éviter de nouveaux désordres annexes.
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Combien de temps durent les travaux de micropieux ?
                </h3>
                <p className="text-gray-800">
                  La durée varie selon le nombre de micropieux, l'accessibilité du chantier et la complexité de la reprise en sous-œuvre. Comptez 2 à 4 semaines pour une maison individuelle standard : 1 semaine de forage et pose des micropieux, 1 à 2 semaines pour la reprise en sous-œuvre (longrines, ceinturage), et quelques jours pour les finitions [1].
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Les assurances couvrent-elles les micropieux ?
                </h3>
                <p className="text-gray-800">
                  Oui, dans le cadre d'une déclaration de catastrophe naturelle (Cat-Nat sécheresse), l'assurance habitation peut prendre en charge les micropieux après expertise et application de la franchise. Le montant couvert dépend du contrat, mais la plupart des assureurs acceptent cette solution reconnue par les bureaux de contrôle. Une étude géotechnique et des devis détaillés sont requis [6].
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-blue-50 border border-blue-200 p-8 rounded-lg mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              En résumé
            </h3>
            <p className="text-lg text-gray-800 mb-4">
              Les micropieux constituent une solution mécanique éprouvée et fiable pour stabiliser les fondations affectées par le retrait-gonflement des argiles. Leur efficacité est reconnue, mais leur coût élevé et leur caractère invasif les réservent aux situations critiques. Face à l'évolution des connaissances et des techniques, des alternatives moins coûteuses et moins invasives, issues de la recherche publique, offrent désormais des options complémentaires pour traiter la cause plutôt que de simplement contourner le problème.
            </p>
          </section>

          {/* Call to Action */}
          <section className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Explorez les alternatives modernes
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Découvrez comment l'hydrostabilisation offre une solution non invasive et économique pour la majorité des cas.
            </p>
            <Button
              onClick={openRiskModal}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Obtenir un diagnostic
            </Button>
          </section>

          {/* References */}
          <section className="border-t-2 border-gray-300 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Références
            </h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="text-sm">
                  [1] Cerema. <em>Les micropieux : guide technique.</em> Edition. <a href="https://doc.cerema.fr/Default/doc/SYRACUSE/16723" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://doc.cerema.fr/Default/doc/SYRACUSE/16723</a>
                </p>
              </div>

              <div>
                <p className="text-sm">
                  [2] Travaux.com (2025). <em>Coûts moyens des travaux de reprise en sous-œuvre.</em> Observatoire des prix du bâtiment. <a href="https://www.travaux.com/construction-renovation-maison/guide-des-prix/prix-consolidation-fondation-maison" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.travaux.com/construction-renovation-maison/guide-des-prix/prix-consolidation-fondation-maison</a>
                </p>
              </div>

              <div>
                <p className="text-sm">
                  [3] BRGM (2021). <em>Alternatives aux micropieux pour la stabilisation des fondations en zone RGA.</em> <a href="https://www.brgm.fr/fr/reference-projet-acheve/visegeo-proposer-solutions-limiter-impacts-retrait-gonflement-argiles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.brgm.fr/fr/reference-projet-acheve/visegeo-proposer-solutions-limiter-impacts-retrait-gonflement-argiles</a>
                </p>
              </div>

              <div>
                <p className="text-sm">
                  [4] BRGM (2020). <em>Risques et aménagement du territoire : retrait-gonflement des argiles.</em> <a href="https://www.brgm.fr/fr/actualite/dossier-thematique/risques-amenagement-territoire-retrait-gonflement-argiles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.brgm.fr/fr/actualite/dossier-thematique/risques-amenagement-territoire-retrait-gonflement-argiles</a>
                </p>
              </div>

              <div>
                <p className="text-sm">
                  [5] AQC – Agence Qualité Construction (2015). <em>Fissure due au retrait gonflement d'argiles.</em> <a href="https://qualiteconstruction.com/ressource/batiment/fissure-retrait-gonflement-argiles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://qualiteconstruction.com/ressource/batiment/fissure-retrait-gonflement-argiles</a>
                </p>
              </div>

              <div>
                <p className="text-sm">
                  [6] France Assureurs. <em>Tout comprendre de l'expertise en cas de sinistre retrait-gonflement des argiles.</em> Guide pratique Cat-Nat. <a href="https://www.franceassureurs.fr/actualites/guide-comprendre-expertise-sinistre-retrait-gonflement-argile-rga" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.franceassureurs.fr/actualites/guide-comprendre-expertise-sinistre-retrait-gonflement-argile-rga</a>
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* CTA Final */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à stabiliser votre maison ?
            </h2>
            <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
              Obtenez votre diagnostic gratuit en moins de 2 minutes pour connaître les solutions adaptées à votre situation.
            </p>
            <Button
              onClick={openRiskModal}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-6 text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Lancer le diagnostic
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
