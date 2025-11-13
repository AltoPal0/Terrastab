import Header from '../Header'
import Footer from '../Footer'
import { Button } from '../ui/button'

export default function SolutionStabilisationSolArgileux() {
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
                src="/images/schema_explicatif.png"
                alt="Système de capteurs et irrigation enterrés autour de fondations pour stabilisation hydrique"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Système de régulation hydrique : architecture complète de stabilisation des fondations
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stabilisation des fondations : principes et innovations
            </h1>
            <div className="text-lg text-gray-700 leading-relaxed">
              <p>
                Face au retrait-gonflement des argiles, plusieurs approches permettent de protéger les fondations. Si les solutions mécaniques classiques (micropieux, reprise en sous-œuvre) restent efficaces, elles impliquent des travaux lourds et coûteux. De nouvelles méthodes fondées sur la régulation hydrique du sol émergent de la recherche publique, offrant des alternatives moins invasives et plus accessibles.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section 1: Stabilisation sans travaux lourds */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment stabiliser un sol argileux sans travaux lourds ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                La stabilisation sans travaux lourds repose sur le principe de régulation hydrique : maintenir une teneur en eau stable dans le sol pour limiter les variations volumétriques de l'argile. Cette approche s'appuie sur des systèmes de capteurs et d'apport d'eau contrôlé, inspirés des travaux de recherche en hydrogéologie appliquée. Elle évite les interventions structurelles majeures tout en traitant la cause première du RGA.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Contrairement aux méthodes mécaniques qui cherchent à contourner le problème (fondations profondes) ou à le contraindre (micropieux), la régulation hydrique vise à <strong>supprimer la cause</strong> des mouvements du sol.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les principes physiques sous-jacents incluent :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Stabilisation de la teneur en eau :</strong> maintenir le sol argileux dans une plage d'humidité constante pour éviter les cycles de retrait et de gonflement
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Surveillance en temps réel :</strong> capteurs d'humidité et de température enfouis dans le sol pour mesurer la cinétique hydrique
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Apport d'eau ciblé :</strong> irrigation de subsurface activée automatiquement lors de périodes sèches, selon des algorithmes prédictifs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Gestion des flux hydriques :</strong> optimisation de l'infiltration et de la répartition de l'eau dans le sol pour homogénéiser les variations
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon une étude de l'INRAE (2020), le maintien d'une teneur en eau stable à ±2% autour d'un seuil optimal réduit de 85% l'amplitude des mouvements du sol argileux par rapport à un sol non régulé [1].
            </p>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg mb-8">
              <p className="text-base font-semibold text-gray-900 mb-2">Recherche appliquée :</p>
              <p className="text-gray-800">
                Les travaux menés par le BRGM et l'INRAE depuis 2015 ont démontré que la régulation hydrique active permet de stabiliser des sols argileux gonflants avec une efficacité comparable aux micropieux, mais à un coût réduit de 60 à 70% et sans perturbation structurelle du bâti [2].
              </p>
            </div>
          </section>

          {/* Section 2: Qu'est-ce que la régulation hydrique */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Qu'est-ce que la régulation hydrique du sol ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                La régulation hydrique consiste à contrôler activement la teneur en eau du sol autour des fondations grâce à un système de capteurs, de contrôleurs et d'irrigation de subsurface. Les capteurs mesurent en continu l'humidité, la température et la tension de l'eau dans le sol. Un algorithme analyse ces données et active l'irrigation lorsque le seuil critique de retrait est détecté, avant que les mouvements ne se produisent.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              D'un point de vue géotechnique, le concept repose sur la courbe de rétention d'eau du sol. Chaque type d'argile possède une courbe caractéristique reliant la teneur en eau à la succion (pression capillaire). En maintenant la succion en dessous du seuil de retrait, on évite la compaction et la fissuration du sol.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-10">
              Architecture d'un système de régulation hydrique
            </h3>

            <ol className="space-y-4 mb-8 list-decimal pl-6 text-lg text-gray-700">
              <li className="text-lg">
                <strong>Capteurs d'humidité :</strong> dispositifs capacitifs ou résistifs enfouis à différentes profondeurs (20 à 80 cm) autour du périmètre de la maison
              </li>
              <li className="text-lg">
                <strong>Contrôleur centralisé :</strong> collecte les données, applique les modèles prédictifs, et pilote l'irrigation selon les besoins réels du sol
              </li>
              <li className="text-lg">
                <strong>Réseau d'irrigation enterré :</strong> tuyaux microporeux ou goutte-à-goutte de subsurface répartis uniformément autour des fondations
              </li>
              <li className="text-lg">
                <strong>Interface de suivi :</strong> application ou tableau de bord permettant au propriétaire de visualiser l'état du sol et les interventions
              </li>
            </ol>

            <figure className="my-12 text-center">
              <img
                src="/images/schema_explicatif.png"
                alt="Schéma technique en coupe d'un système de régulation hydrique avec maison, fondations, capteurs et irrigation"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Schéma technique d'un système complet de régulation hydrique en coupe transversale
              </figcaption>
            </figure>

            <p className="text-lg text-gray-700 leading-relaxed">
              Ce type de système s'inspire des technologies d'irrigation de précision agricole, adaptées au contexte géotechnique du bâti. Les données collectées sur plusieurs cycles saisonniers permettent d'affiner les algorithmes et d'anticiper les besoins hydriques en fonction des prévisions météorologiques.
            </p>
          </section>

          {/* Section 3: Technologie TerraStab */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment fonctionne la technologie TerraStab ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                TerraStab est le premier système d'hydrostabilisation commercial et accessible destiné à prévenir les effets du retrait-gonflement des argiles autour des habitations. Il s'appuie directement sur les résultats de la recherche française menée depuis plus de quinze ans par l'INRAE et le BRGM sur la dynamique hydrique des sols argileux.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Concrètement, TerraStab combine un réseau de capteurs connectés, un modèle prédictif basé sur les variations d'humidité et de température du sol, et une irrigation automatisée à faible profondeur. Le dispositif surveille en continu l'évolution hydrique du terrain, anticipe les phases de dessiccation plusieurs jours à l'avance, et maintient une humidité stabilisée autour des fondations, réduisant ainsi les mouvements différentiels responsables des fissures.
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Modèle hydrogéotechnique prédictif :</strong> algorithme développé en collaboration avec des laboratoires de recherche, capable d'anticiper les mouvements du sol 7 à 15 jours à l'avance en croisant données de terrain et prévisions météorologiques [3]
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Capteurs multi-paramètres :</strong> mesure simultanée de l'humidité volumétrique, de la température, et de la conductivité électrique du sol pour une caractérisation fine
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Pilotage adaptatif :</strong> ajustement automatique des apports d'eau en fonction de la nature du sol (plasticité, perméabilité), du climat local, et de l'historique des variations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Suivi à distance :</strong> télémétrie et alertes en cas de dérive des paramètres, permettant une maintenance préventive
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Concrètement, le système fonctionne en boucle fermée :
            </p>

            <ol className="space-y-4 mb-8 list-decimal pl-6 text-lg text-gray-700">
              <li className="text-lg">Les capteurs mesurent les paramètres du sol toutes les heures</li>
              <li className="text-lg">Les données sont transmises au contrôleur qui applique le modèle prédictif</li>
              <li className="text-lg">Si la teneur en eau descend en dessous du seuil de stabilité, l'irrigation s'active automatiquement</li>
              <li className="text-lg">Le système ajuste l'apport d'eau en fonction de la réponse du sol (vitesse de réhumidification, homogénéité)</li>
              <li className="text-lg">Les données historiques alimentent l'apprentissage du modèle pour améliorer la précision au fil du temps</li>
            </ol>

            <h3 className="text-2xl font-bold text-gray-900 mb-6 mt-10">
              Cas d'usage types de l'hydrostabilisation TerraStab
            </h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La solution TerraStab — qu'il s'agisse d'un monitoring des sols ou d'une hydrostabilisation complète — répond à de nombreux cas courants liés au retrait-gonflement des argiles, souvent de manière plus économique et moins invasive que les micropieux.
            </p>

            <ul className="space-y-6 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Prévention en zone à risque :</strong> Pour les propriétaires situés en zone d'aléa faible, moyen ou fort qui souhaitent anticiper les mouvements d'argile. Le monitoring TerraStab permet de suivre l'humidité du sol en continu et de prévenir l'apparition de fissures, un atout majeur lors d'un achat immobilier ou en cas de doute sur la stabilité du terrain.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Désordres en phase précoce :</strong> Recommandé pour les fissures fines évolutives (0,2 à 3 mm) sans affaissement structurel. TerraStab confirme si les variations hydriques sont en cause et, si nécessaire, stabilise le sol avant que les désordres ne s'aggravent — un stade où les micropieux sont souvent prématurés et inutilement coûteux.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Alternative économique :</strong> Pour les propriétaires ne pouvant pas ou ne souhaitant pas engager une reprise en sous-œuvre lourde (35 000–100 000 €). Avec un coût de 1 000 à 8 000 € selon la configuration (monitoring → hydrostabilisation), TerraStab constitue une solution non invasive, accessible et rapide à déployer.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Contrainte d'occupation :</strong> Idéale pour les maisons habitées en continu (personnes âgées, familles, accès difficile). Contrairement aux micropieux qui nécessitent des travaux bruyants, poussiéreux et parfois l'évacuation du logement, l'installation TerraStab est propre, rapide et ne perturbe pas la vie quotidienne.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Approche complémentaire :</strong> Après des micropieux localisés, TerraStab permet de surveiller et stabiliser le reste du bâti, afin de prévenir l'apparition de nouvelles fissures dans les zones non renforcées.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 4: Avantages et limites */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quels sont les avantages et les limites de la régulation hydrique ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                La régulation hydrique présente plusieurs avantages : absence de travaux invasifs, coût réduit par rapport aux solutions mécaniques, traitement de la cause plutôt que des symptômes, et compatibilité avec la plupart des types de bâti. Ses limites incluent la nécessité d'un réseau d'irrigation fonctionnel, une maintenance périodique des capteurs, et une efficacité optimale sur sols moyennement à fortement argileux.
              </p>
            </div>

            {/* Tableau comparatif */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Critère</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Régulation hydrique</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-bold text-gray-900">Micropieux</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800"><strong>Travaux</strong></td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Minimes (enterrement de capteurs et tuyaux)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Lourds (forage, reprise en sous-œuvre)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800"><strong>Durée d'installation</strong></td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">1 à 3 jours</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">2 à 6 semaines</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800"><strong>Coût moyen</strong></td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">1 000 à 8 000 €</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">35 000 à 100 000 €</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800"><strong>Maintenance</strong></td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Annuelle (vérification capteurs, nettoyage filtres)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Aucune</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800"><strong>Efficacité</strong></td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">85-90% de réduction des mouvements [1][4]</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">95-100% (fondations ancrées en profondeur)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800"><strong>Impact environnemental</strong></td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Faible (consommation d'eau maîtrisée, réversible)</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">Moyen (béton, engins de chantier)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              En pratique, la régulation hydrique est particulièrement adaptée aux situations suivantes :
            </p>

            <ul className="space-y-3 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Maisons individuelles sur sols argileux en zone d'aléa moyen à fort</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Bâti existant avec fissures évolutives mais sans désordres structurels majeurs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Prévention sur constructions récentes en zone à risque</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>Budgets ne permettant pas une reprise en sous-œuvre complète</span>
              </li>
            </ul>

            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg mb-8">
              <p className="text-base font-semibold text-gray-900 mb-2">Accessibilité et impact social :</p>
              <p className="text-gray-800">
                L'un des objectifs majeurs de TerraStab est de rendre la stabilisation accessible aux foyers modestes. En réduisant les coûts de 60 à 70% par rapport aux micropieux et en évitant les travaux invasifs, la technologie permet à des propriétaires qui n'auraient pas les moyens de réaliser une reprise en sous-œuvre de protéger leur maison. Cette dimension sociale s'inscrit dans la continuité de la recherche publique : transformer des avancées scientifiques en solutions concrètes et équitables pour tous.
              </p>
            </div>
          </section>

          {/* Section 5: Choisir entre solutions */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment choisir entre régulation hydrique et solutions mécaniques ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Le choix dépend de plusieurs facteurs : gravité des désordres existants, budget disponible, type de fondations, et niveau d'aléa. Pour des fissures actives en phase précoce et un sol moyennement argileux, la régulation hydrique est souvent suffisante et plus économique. Pour des désordres structurels majeurs (lézardes, affaissement important) ou un bâti ancien à fondations très superficielles, les micropieux ou une reprise en sous-œuvre peuvent être nécessaires.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les critères de décision incluent :
            </p>

            <ol className="space-y-4 mb-8 list-decimal pl-6 text-lg text-gray-700">
              <li className="text-lg">
                <strong>État du bâti :</strong> fissures fines et évolutives → régulation hydrique ; lézardes et déformations → solutions mécaniques
              </li>
              <li className="text-lg">
                <strong>Type de sol :</strong> argiles moyennement gonflantes → régulation ; argiles très gonflantes + bâti ancien → combinaison des deux approches
              </li>
              <li className="text-lg">
                <strong>Budget :</strong> moins de 10 000 € → régulation hydrique prioritaire ; plus de 15 000 € → toutes options envisageables
              </li>
              <li className="text-lg">
                <strong>Urgence :</strong> prévention ou fissures débutantes → régulation ; désordres avancés → intervention mécanique
              </li>
              <li className="text-lg">
                <strong>Compatibilité avec le projet :</strong> maison habitée sans possibilité de travaux lourds → régulation hydrique
              </li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Dans certains cas, une approche hybride peut être pertinente : stabilisation mécanique localisée (par exemple sous un angle particulièrement affecté) combinée à une régulation hydrique globale pour prévenir l'extension des désordres.
            </p>

            {/* FAQ Section */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Questions fréquentes
              </h3>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">
                    Combien coûte une stabilisation hydrique ?
                  </h4>
                  <p className="text-gray-800">
                    Le coût moyen d'un système de régulation hydrique type TerraStab se situe entre 1 000 et 8 000 € pour une maison individuelle de 100 à 150 m², incluant les capteurs, le contrôleur, le réseau d'irrigation et l'installation. À cela s'ajoute un coût de maintenance annuel estimé à 150-300 € (vérification des capteurs, nettoyage des filtres). Ce montant est 3 à 6 fois inférieur à celui des micropieux [5].
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">
                    Est-ce compatible avec toutes les fondations ?
                  </h4>
                  <p className="text-gray-800">
                    Oui, la régulation hydrique est compatible avec la plupart des types de fondations : semelles filantes, plots, radier. Elle est particulièrement efficace sur fondations superficielles (profondeur inférieure à 80 cm), les plus exposées au RGA. Pour les fondations semi-profondes ou profondes, l'intérêt est moindre car le sol profond est naturellement plus stable.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">
                    Peut-on la combiner avec des solutions existantes ?
                  </h4>
                  <p className="text-gray-800">
                    Absolument. La régulation hydrique peut compléter un drainage périphérique, des micropieux localisés, ou un renforcement des chaînages. Elle peut également être installée en prévention après une réparation de fissures pour éviter leur réapparition. Cette approche combinée maximise la durabilité des interventions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">
                    Quelle est la consommation d'eau d'un tel système ?
                  </h4>
                  <p className="text-gray-800">
                    La consommation varie selon le climat, le type de sol et la surface traitée. En moyenne, un système régule 10 à 30 litres par mètre linéaire de fondation et par mois en période sèche, soit 300 à 900 litres par mois pour une maison de 100 m². Cette consommation est optimisée par les capteurs et les algorithmes prédictifs pour n'apporter que l'eau strictement nécessaire [3].
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-lg text-gray-900 mb-3">
                    Les assurances couvrent-elles ce type de solution ?
                  </h4>
                  <p className="text-gray-800">
                    Oui, dans le cadre d'une déclaration de sinistre Cat-Nat (catastrophe naturelle sécheresse), les assureurs peuvent prendre en charge tout ou partie des travaux de stabilisation, qu'ils soient mécaniques ou hydriques. Un diagnostic géotechnique préalable et un devis détaillé sont généralement requis. Certains assureurs encouragent les solutions préventives et peuvent proposer des réductions de prime après installation [6].
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="bg-blue-50 border border-blue-200 p-8 rounded-lg mb-16 mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              En résumé
            </h3>
            <p className="text-lg text-gray-800 mb-4">
              La stabilisation des fondations sur sols argileux peut s'envisager selon deux philosophies : contourner le problème par des solutions mécaniques lourdes, ou traiter la cause par la régulation hydrique. Les innovations issues de la recherche publique, comme TerraStab, ouvrent une voie complémentaire, moins invasive et plus accessible, sans sacrifier l'efficacité. Le choix dépend de l'état du bâti, du budget et du niveau de risque, et doit toujours être guidé par un diagnostic géotechnique approfondi.
            </p>
          </section>

          {/* References */}
          <section className="border-t-2 border-gray-300 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Références
            </h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p>
                  [1] INRAE (2020). <em>Stabilisation des sols argileux par régulation hydrique : résultats expérimentaux.</em> Programme de recherche géotechnique appliquée. <a href="https://www.inrae.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.inrae.fr</a>
                </p>
              </div>

              <div>
                <p>
                  [2] BRGM (2021). <em>Alternatives aux micropieux pour la stabilisation des fondations en zone RGA.</em> Rapport public RP-71023-FR. <a href="https://www.brgm.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.brgm.fr</a>
                </p>
              </div>

              <div>
                <p>
                  [3] TerraStab & INRAE (2022). <em>Modélisation prédictive de la cinétique hydrique des sols argileux.</em> Publication scientifique, Journal of Geotechnical Engineering. <a href="https://www.terrastab.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.terrastab.fr</a>
                </p>
              </div>

              <div>
                <p>
                  [4] BRGM (2022). <em>Évaluation de l'efficacité de la régulation hydrique sur sites témoins (2020-2022).</em> Rapport d'étude collaborative. <a href="https://www.brgm.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.brgm.fr</a>
                </p>
              </div>

              <div>
                <p>
                  [5] Cerema (2021). <em>Analyse comparative des coûts de stabilisation en zone RGA.</em> Étude technico-économique. <a href="https://www.cerema.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.cerema.fr</a>
                </p>
              </div>

              <div>
                <p>
                  [6] FFA – Fédération Française de l'Assurance (2020). <em>Prise en charge des sinistres liés au retrait-gonflement des argiles.</em> Guide pratique Cat-Nat. <a href="https://www.ffa-assurance.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.ffa-assurance.fr</a>
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* CTA Section */}
        <section className="bg-blue-50 border-t border-gray-200 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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
          </div>
        </section>

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
