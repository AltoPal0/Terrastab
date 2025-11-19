import Header from '../Header'
import Footer from '../Footer'
import { Button } from '../ui/button'
import RiskAssessmentSection from '../RiskAssessmentSection'

export default function PreventionEntretien() {
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
                src="/images/articles/maison-arbre-photo.jpg"
                alt="Maison bien entretenue avec jardinage préventif et système d'arrosage autour des fondations"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Photo d'illustration : maison en bon état avec entretien préventif approprié et arrosage du pourtour
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prévention et entretien des maisons sur sols argileux
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Habiter en zone argileuse ne signifie pas subir passivement les effets du retrait-gonflement. Des gestes simples et des pratiques d'entretien régulières permettent de limiter les variations hydriques du sol, de surveiller l'évolution du bâti, et d'anticiper les désordres avant qu'ils ne deviennent critiques. Cette dimension préventive, accessible à tous, constitue la première ligne de défense contre le RGA.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section 1: Comment prévenir le RGA */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment prévenir les effets du RGA ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                La prévention du RGA repose sur trois axes complémentaires : la gestion de l'eau autour des fondations pour maintenir une humidité stable, le contrôle de la végétation pour limiter les pompages racinaires, et la surveillance régulière du bâti pour détecter précocement les signes de mouvements. Ces mesures, peu coûteuses et non invasives, réduisent significativement le risque de désordres structurels.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              D'un point de vue géotechnique, prévenir le RGA revient à minimiser l'amplitude des variations de teneur en eau dans le sol argileux sous et autour des fondations. Les recommandations du BRGM et du Cerema s'articulent autour de quatre principes :
            </p>

            <ol className="space-y-4 mb-8 text-lg text-gray-700 list-decimal list-inside">
              <li className="ml-4">
                <strong>Éviter le dessèchement excessif :</strong> maintenir une humidité résiduelle même en période sèche
              </li>
              <li className="ml-4">
                <strong>Limiter les apports d'eau brutaux :</strong> éviter les variations hydriques trop rapides qui génèrent des gonflements localisés
              </li>
              <li className="ml-4">
                <strong>Homogénéiser la répartition de l'eau :</strong> prévenir les gradients hydriques latéraux (une partie du sol très sèche, une autre humide)
              </li>
              <li className="ml-4">
                <strong>Observer et anticiper :</strong> surveiller les indicateurs (fissures, végétation, drainage) pour ajuster les pratiques
              </li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon une étude de l'AQC (Agence Qualité Construction), les propriétaires appliquant des pratiques préventives adaptées réduisent de 65% le risque de sinistre majeur lié au RGA par rapport à ceux ne prenant aucune mesure.
            </p>
          </section>

          {/* Section 2: Gestes simples */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quels gestes simples pour protéger sa maison ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Plusieurs gestes simples et réguliers permettent de protéger sa maison sur sol argileux : maintenir un arrosage modéré et homogène du pourtour de la maison en période sèche, nettoyer et vérifier les gouttières et évacuations d'eau, éviter de planter de grands arbres à moins de 5 mètres des fondations, surveiller l'apparition ou l'évolution de fissures, et éviter les modifications brutales de l'environnement hydrique.
              </p>
            </div>

            {/* À faire / À éviter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">✅ À faire</h4>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Arroser le pourtour de la maison en été (10-15 L/m linéaire tous les 2-3 jours lors de fortes chaleurs)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Nettoyer les gouttières et évacuations 2 fois par an</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Installer un drain périphérique si le terrain est en pente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Planter des arbustes à système racinaire modéré</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Surveiller les fissures avec des témoins en plâtre</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Maintenir une distance de sécurité (≥ 5 m) entre arbres et fondations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Aérer le vide sanitaire si présent</span>
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-4">❌ À éviter</h4>
                <ul className="space-y-3 text-gray-800">
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Planter de grands arbres (chêne, peuplier, saule) près de la maison</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Laisser l'eau stagner contre les murs (mauvaise pente, gouttières bouchées)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Imperméabiliser tout le pourtour (empêche l'infiltration naturelle)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Arroser de manière irrégulière ou trop brutale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Abattre un grand arbre ancien sans consultation préalable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Ignorer les fissures évolutives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-600 font-bold">•</span>
                    <span>Laisser les fuites d'eau non réparées</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 3: Focus Arrosage */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Focus : Arrosage préventif en période sèche
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              L'arrosage du pourtour de la maison est l'une des mesures préventives les plus efficaces et les plus accessibles. Concrètement :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Période :</strong> de mai à septembre, dès que le sol commence à se fissurer ou que les températures dépassent 28°C pendant plusieurs jours
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Fréquence :</strong> tous les 2 à 3 jours en cas de sécheresse, tous les 5 à 7 jours en conditions normales
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Quantité :</strong> 10 à 15 litres par mètre linéaire de fondation (soit environ 400 à 600 litres pour une maison de 100 m²)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Méthode :</strong> arrosage lent au pied des murs, en bande de 50 cm de largeur, de préférence le soir pour limiter l'évaporation
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon les travaux du CEREMA un arrosage régulier et modéré permet de maintenir la teneur en eau du sol dans une plage de variation de ±3%, réduisant l'amplitude des mouvements de 70% par rapport à un sol non arrosé [3].
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 mb-4">
                <strong>Astuce :</strong> Vous pouvez installer un système d'irrigation goutte-à-goutte de surface (tuyau microporeux) autour de la maison, relié à un programmateur. Coût : 100 à 300 €, consommation maîtrisée, et gain de temps considérable.
              </p>
              <button
                onClick={openRiskModal}
                className="text-blue-600 font-semibold hover:underline"
              >
                Découvrir les solutions de régulation hydrique
              </button>
            </div>
          </section>

          {/* Section 4: Hydrostabilisation */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              L'hydrostabilisation automatisée : une prévention de nouvelle génération
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Au-delà de l'arrosage manuel, des systèmes d'hydrostabilisation automatisée permettent une prévention optimisée du RGA. TerraStab, développé en collaboration avec le BRGM et l'INRAE, représente cette approche de nouvelle génération :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Surveillance continue :</strong> capteurs enterrés mesurant l'humidité et la température du sol 24h/24, détectant les dérives avant qu'elles ne provoquent des désordres
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Anticipation prédictive :</strong> algorithmes prédisant les périodes de retrait 7-15 jours à l'avance en croisant données terrain et météo
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Régulation automatique :</strong> irrigation de subsurface activée uniquement quand nécessaire, maintenant le sol dans une plage de variation optimale (±3%)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Suivi à distance :</strong> application mobile permettant de visualiser l'état du sol et l'historique des interventions
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cette approche combine prévention passive (gestion manuelle végétation, drainage) et prévention active (régulation hydrique automatisée). Elle s'adresse particulièrement aux propriétaires en zone d'aléa moyen à fort souhaitant une protection maximale sans surveillance constante.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              <strong>Coût et bénéfices :</strong> Un système d'hydrostabilisation coûte 4 000 à 8 000 € à l'installation (maison 100-150 m²) avec une maintenance annuelle de 150-300 €. Ce coût préventif est à comparer aux 15 000-50 000 € d'une reprise en sous-œuvre curative. Sur 10 ans, l'investissement préventif représente 10-15% du coût d'une intervention curative lourde.
            </p>
          </section>

          {/* Section 5: Arbres et terrasses */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Les arbres ou terrasses aggravent-ils le risque ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Oui, dans certaines conditions. Les arbres à fort développement racinaire (chêne, peuplier, saule, frêne) pompent l'eau du sol en période sèche, accentuant le retrait argileux jusqu'à 1,5 fois leur hauteur. Les terrasses imperméables, si mal conçues, peuvent concentrer l'eau de ruissellement ou, à l'inverse, assécher le sol par effet d'ombre. Une gestion adaptée (distance de plantation, choix des essences, drainage sous terrasse) permet de minimiser ces effets.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Végétation et RGA : distances de sécurité
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les recommandations du Cerema et du DTU 13.1 (norme fondations superficielles) fixent des distances minimales entre végétation et fondations [1] :
            </p>

            {/* Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Type de végétation</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Hauteur adulte</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Distance minimale recommandée</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Arbustes (lavande, buis, rosiers)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">{"< 2 m"}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">1 m</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Petits arbres (cerisier, pommier)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">3-5 m</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">3-5 m</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Arbres moyens (bouleau, érable)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">8-12 m</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">8-12 m</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Grands arbres (chêne, peuplier, platane)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">{"> 15 m"}</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">15-20 m</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Haies persistantes (thuyas, cyprès)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">Variable</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">2-3 m minimum</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Schéma distances arbres */}
            <figure className="my-12 text-center">
              <img
                src="/images/articles/schema-argile-arbre.jpg"
                alt="Schéma montrant les distances de sécurité recommandées entre arbres de différentes tailles et les fondations d'une maison"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Schéma des distances de sécurité entre végétation et fondations en zone argileuse - espaces de plantation sûrs selon taille d'arbre
              </figcaption>
            </figure>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              En pratique, le rayon d'action des racines dépend de l'espèce, de l'âge de l'arbre, et de la disponibilité en eau. Un chêne de 20 mètres de haut peut pomper l'eau jusqu'à 30 mètres de distance en cas de sécheresse prolongée.
            </p>

            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 font-semibold mb-3">
                Cas particulier – Abattage d'arbres anciens
              </p>
              <p className="text-gray-800">
                Supprimer un grand arbre qui pompait beaucoup d'eau peut provoquer un gonflement brutal du sol (phénomène de "rebond hydrique"). Il est recommandé de consulter un géotechnicien avant d'abattre un arbre de plus de 10 ans situé à moins de 15 mètres d'une maison en zone argileuse.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Terrasses et aménagements extérieurs
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les terrasses peuvent influencer le comportement hydrique du sol de deux manières :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Concentration d'eau :</strong> une terrasse mal drainée ou avec une pente inversée peut diriger l'eau de pluie vers les fondations, provoquant un gonflement localisé
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Assèchement par effet d'ombre :</strong> une large terrasse empêche la pluie d'atteindre le sol, contribuant au dessèchement
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Pour limiter ces effets :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>Prévoir une pente d'au moins 1,5% pour évacuer l'eau loin des fondations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>Installer un drain en périphérie de terrasse si le sol est peu perméable</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>Éviter l'imperméabilisation totale : privilégier les matériaux drainants (gravier, dalles sur plots, terrasse bois aérée)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold">•</span>
                <span>Prévoir des regards de visite pour nettoyer les évacuations</span>
              </li>
            </ul>
          </section>

          {/* Section 6: Surveillance */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment surveiller l'évolution de sa maison ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                La surveillance régulière permet de détecter les signes précoces de mouvements du sol avant qu'ils ne deviennent critiques. Les trois méthodes principales sont : l'observation visuelle des fissures (largeur, évolution), la pose de témoins en plâtre ou en verre sur les fissures actives pour mesurer leur ouverture, et le suivi photographique annuel pour documenter l'état du bâti. En cas d'évolution rapide, un diagnostic géotechnique devient nécessaire.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Méthodes de surveillance simples
            </h3>

            <ol className="space-y-6 mb-8 text-lg text-gray-700">
              <li className="ml-4">
                <strong>Inspection visuelle trimestrielle :</strong>
                <ul className="space-y-3 mt-3 ml-6 list-disc">
                  <li>Faire le tour de la maison et photographier toutes les fissures visibles</li>
                  <li>Mesurer leur largeur avec une jauge ou une simple règle</li>
                  <li>Noter la date et les conditions météo (après sécheresse, après pluies)</li>
                </ul>
              </li>
              <li className="ml-4">
                <strong>Témoins de fissuration :</strong>
                <ul className="space-y-3 mt-3 ml-6 list-disc">
                  <li>Poser des témoins en plâtre (bandes de 10 cm avec trait au milieu) sur les fissures actives</li>
                  <li>Vérifier tous les 3 mois si le témoin s'est fissuré (signe d'évolution)</li>
                  <li>Alternative : témoins en verre collés à la résine époxy (plus précis mais plus coûteux)</li>
                </ul>
              </li>
              <li className="ml-4">
                <strong>Surveillance du sol et de la végétation :</strong>
                <ul className="space-y-3 mt-3 ml-6 list-disc">
                  <li>Observer l'apparition de fissures dans le sol autour de la maison (signe de retrait)</li>
                  <li>Repérer les zones où la végétation jaunit prématurément (stress hydrique)</li>
                  <li>Vérifier le bon écoulement des eaux de pluie (absence de stagnation)</li>
                </ul>
              </li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon le guide pratique de l'AQC, la surveillance régulière permet de détecter 85% des désordres en phase précoce (fissures fines), stade où les interventions correctives sont les moins coûteuses.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-800 font-semibold mb-3">
                Dispositifs modernes
              </p>
              <p className="text-gray-800 mb-4">
                Certains systèmes permettent aujourd'hui un suivi hydrique automatisé du sol grâce à des capteurs connectés. Ces dispositifs mesurent en continu l'humidité et la température, envoient des alertes en cas de dérive, et peuvent même piloter un arrosage préventif.
              </p>
              <button
                onClick={openRiskModal}
                className="text-blue-600 font-semibold hover:underline"
              >
                Découvrir les solutions de régulation hydrique
              </button>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Dois-je arroser le sol autour de ma maison ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Oui, en période sèche (mai à septembre), un arrosage régulier et modéré du pourtour de la maison limite le retrait du sol argileux. Comptez 10 à 15 litres par mètre linéaire tous les 2-3 jours lors de fortes chaleurs. Cet apport compense partiellement l'évaporation et maintient une stabilité hydrique qui réduit les mouvements du sol.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Les fissures peuvent-elles se refermer seules ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Partiellement, oui. Lors de la réhumidification automnale, le sol argileux gonfle légèrement et peut refermer partiellement les fissures apparues en été. Cependant, ce phénomène est temporaire : au cycle suivant, les fissures se rouvrent généralement au même endroit, voire s'élargissent. Seule une stabilisation de la cause (régulation hydrique ou reprise en sous-œuvre) interrompt ce cycle.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Quand contacter un expert ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Contactez un expert en bâtiment ou un géotechnicien dès que : les fissures dépassent 2 mm de largeur, elles évoluent rapidement (plus de 1 mm en quelques mois), elles s'accompagnent de déformations (portes, fenêtres, sol), ou qu'elles apparaissent après un épisode de sécheresse exceptionnel. Un diagnostic précoce permet d'orienter vers des solutions adaptées et moins coûteuses.
                </p>
                <button
                  onClick={openRiskModal}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Comprendre le diagnostic RGA
                </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Peut-on planter des arbres en zone argileuse ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Oui, à condition de respecter les distances de sécurité (au moins égales à la hauteur adulte de l'arbre) et de privilégier des espèces à système racinaire modéré. Les arbustes, petits arbres fruitiers, et essences à croissance lente sont compatibles. Évitez les chênes, peupliers, saules et platanes à proximité des fondations [5].
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Le drainage suffit-il à prévenir le RGA ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Le drainage aide à évacuer l'eau excédentaire et prévient les gonflements localisés, mais il ne suffit pas à lui seul en période de sécheresse. En effet, le drainage ne compense pas le dessèchement : il faut coupler drainage (évacuation de l'excès) et apport d'eau contrôlé (limitation du retrait). Une approche équilibrée associe les deux principes.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16">
            <div className="bg-blue-50 border border-blue-200 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                En résumé
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                La prévention et l'entretien des maisons sur sols argileux reposent sur des gestes simples et réguliers : gestion de l'eau, contrôle de la végétation, et surveillance du bâti. Ces pratiques, accessibles à tous et peu coûteuses, réduisent significativement le risque de désordres structurels et permettent de détecter précocement les signes d'évolution. Associées à un diagnostic régulier et à des solutions techniques adaptées si nécessaire, elles constituent la meilleure stratégie pour préserver durablement son habitation.
              </p>
              <button
                onClick={openRiskModal}
                className="text-blue-600 font-semibold hover:underline"
              >
                Explorer les solutions de stabilisation en cas de désordres avérés
              </button>
            </div>
          </section>

          {/* References */}
          <section className="mt-16 pt-12 border-t-2 border-gray-300">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Références
            </h2>

            <div className="space-y-4 text-gray-700">
              <p className="text-base">
                [1] Cerema (2019). <em>Prévention du retrait-gonflement des argiles : guide des bonnes pratiques pour les particuliers.</em> Collection Références.{' '}
                <a
                  href="https://www.cerema.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.cerema.fr
                </a>
              </p>

              <p className="text-base">
                [3] CEREMA (2024). <em>Effet de l'arrosage préventif sur la stabilité des sols argileux.</em> Programme de recherche géotechnique appliquée.{' '}
                <a
                  href="https://www.cerema.fr/fr/actualites/maisons-fissurees-rehydrater-sol-faire-face-au-retrait"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.cerema.fr/fr/actualites/maisons-fissurees-rehydrater-sol-faire-face-au-retrait
                </a>
              </p>

              <p className="text-base">
                [5] BRGM (2020). <em>Végétation et retrait-gonflement des argiles : distances de sécurité.</em> Rapport public RP-69512-FR.{' '}
                <a
                  href="https://www.brgm.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://www.brgm.fr
                </a>
              </p>
            </div>
          </section>
        </article>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Prêt à protéger votre maison ?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Évaluez gratuitement le risque RGA de votre bien et découvrez les solutions adaptées
            </p>
            <Button
              onClick={openRiskModal}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Faire une évaluation gratuite
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
