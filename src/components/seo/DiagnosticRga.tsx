import Header from '../Header'
import Footer from '../Footer'
import { Button } from '../ui/button'

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
        {/* Image Hero */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <figure className="text-center">
              <img
                src="/images/articles/geotechnicien.jpg"
                alt="Expert géotechnicien en action avec équipement de mesure sur terrain argileux"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Expert géotechnicien réalisant des mesures de diagnostic RGA sur terrain
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Diagnostic RGA : évaluer votre exposition
            </h1>
            <div className="text-lg text-gray-700 leading-relaxed">
              <p>
                Vous habitez en zone argileuse et souhaitez anticiper les risques pour votre maison ? Le diagnostic retrait-gonflement des argiles (RGA) permet d'évaluer précisément l'exposition de votre terrain et de votre bâti. Cette analyse combine géologie, climat et caractéristiques constructives pour produire un score de risque fiable, première étape vers une protection adaptée.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section 1: Comment évaluer */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment évaluer le risque de retrait-gonflement ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                L'évaluation du risque RGA repose sur trois piliers : la cartographie géologique du BRGM qui identifie la nature des sols, l'analyse climatique qui mesure l'exposition aux sécheresses, et l'étude géotechnique du terrain qui caractérise la sensibilité locale. Ces données croisées produisent un score de risque permettant d'anticiper la probabilité et l'intensité des mouvements du sol.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Concrètement, un diagnostic complet suit une méthodologie standardisée en plusieurs étapes :
            </p>

            <ol className="space-y-4 mb-8 list-decimal pl-6 text-gray-700">
              <li className="text-lg">
                <strong>Consultation de la carte d'aléa BRGM :</strong> accessible sur le site Géorisques, elle fournit un premier niveau d'information à l'échelle parcellaire (faible, moyen, fort, très fort)
              </li>
              <li className="text-lg">
                <strong>Analyse de l'historique climatique local :</strong> fréquence des sécheresses, intensité des épisodes, tendances sur 20-30 ans (données Météo-France)
              </li>
              <li className="text-lg">
                <strong>Étude géotechnique in situ :</strong> sondages, prélèvements, essais de laboratoire pour déterminer la plasticité et le potentiel de gonflement du sol
              </li>
              <li className="text-lg">
                <strong>Examen du bâti :</strong> type de fondations, présence de fissures, distance aux arbres, drainage périphérique
              </li>
              <li className="text-lg">
                <strong>Synthèse et recommandations :</strong> rapport détaillé avec score de risque et préconisations adaptées
              </li>
            </ol>

            {/* Image Schéma */}
            <figure className="my-12 text-center">
              <img
                src="/images/articles/fissure-fenetre.jpg"
                alt="Fissure en façade montrant les trois sources de données d'un diagnostic RGA : géologie, climat et bâti"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Exemple de fissure : résultat typique du retrait-gonflement des argiles
              </figcaption>
            </figure>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon le Cerema, un diagnostic RGA bien mené permet de réduire de 70% le risque de sinistralité en orientant vers des solutions préventives ou correctives adaptées au contexte.
            </p>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
              <strong className="text-gray-900">Réglementation :</strong>
              <p className="text-gray-800 mt-2">
                Depuis le 1er janvier 2020, une étude géotechnique préalable (étude G1) est obligatoire avant toute vente de terrain constructible situé en zone d'aléa moyen ou fort (loi ELAN, article 68). Cette obligation vise à informer l'acquéreur et à prévenir les désordres.
              </p>
            </div>
          </section>

          {/* Section 2: Données utilisées */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quelles données utilisent les diagnostics RGA ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Les diagnostics RGA s'appuient sur trois catégories de données : géologiques (cartes BRGM, nature des argiles, épaisseur des formations), climatiques (historique des sécheresses, indices d'humidité des sols SWI, projections climatiques), et géotechniques (essais de plasticité, limites d'Atterberg, indice de gonflement, teneur en eau). Ces informations sont croisées via des modèles hydrogéotechniques pour produire une évaluation fiable.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Données géologiques</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Le BRGM met à disposition plusieurs sources d'information :
            </p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Carte d'aléa retrait-gonflement :</strong> élaborée à partir de 50 000 sondages et de cartes géologiques au 1/50 000, elle classe le territoire en quatre niveaux de risque</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Cartes lithologiques :</strong> identification des types d'argile (smectites, illites, kaolinites) et de leur répartition spatiale</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Banque de données du sous-sol (BSS) :</strong> plus de 800 000 forages référencés, accessibles en ligne pour connaître la stratigraphie locale</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Données climatiques</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Météo-France et l'INRAE fournissent des indicateurs clés :
            </p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Indice d'humidité des sols (SWI) :</strong> mesure satellite de la teneur en eau superficielle, actualisée quotidiennement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Historique des sécheresses :</strong> événements de catégorie Cat-Nat (catastrophes naturelles) depuis 1989</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Évapotranspiration potentielle (ETP) :</strong> bilan hydrique climatique par station météorologique</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Données géotechniques</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Les essais de laboratoire normalisés incluent :
            </p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Limites d'Atterberg (NF P94-051) :</strong> déterminent la plasticité du sol (limite de liquidité LL, limite de plasticité LP, indice de plasticité IP)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Essai de gonflement libre :</strong> mesure l'amplitude de variation volumétrique lors de la saturation en eau</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Valeur de bleu de méthylène (VBS) :</strong> quantifie l'activité de l'argile et son potentiel de gonflement</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Analyse granulométrique et minéralogique :</strong> fraction argileuse, identification des minéraux par diffraction RX</span>
              </li>
            </ul>

            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 rounded-r-lg mb-8">
              <strong className="text-gray-900 text-lg">Modèle TerraStab :</strong>
              <p className="text-gray-800 mt-2">
                TerraStab a développé un modèle hydrogéotechnique issu de travaux de recherche qui intègre ces trois blocs de données pour produire un score de risque personnalisé. Ce modèle prend en compte la cinétique hydrique du sol, l'historique climatique local et les spécificités du bâti pour anticiper les mouvements futurs.
              </p>
            </div>
          </section>

          {/* Section 3: Interpréter le score */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment interpréter son score de risque ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Le score de risque RGA se présente généralement sous forme de quatre niveaux (faible, moyen, fort, très fort) ou d'une échelle numérique. Un risque faible signifie que les mouvements prévisibles restent inférieurs à 1 cm et ne nécessitent qu'une surveillance. Un risque fort ou très fort implique des mouvements potentiels supérieurs à 3 cm, justifiant des mesures de prévention ou de stabilisation. L'interprétation doit toujours être contextualisée selon l'état du bâti et les projets envisagés.
              </p>
            </div>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Niveau de risque</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Mouvement prévisible</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Recommandations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Faible</td>
                    <td className="border border-gray-300 p-3">&lt; 1 cm</td>
                    <td className="border border-gray-300 p-3">Surveillance régulière, respect des règles de construction classiques (DTU 13.1)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Moyen</td>
                    <td className="border border-gray-300 p-3">1 à 2 cm</td>
                    <td className="border border-gray-300 p-3">Fondations renforcées, drainage périphérique, gestion de la végétation</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Fort</td>
                    <td className="border border-gray-300 p-3">2 à 4 cm</td>
                    <td className="border border-gray-300 p-3">Fondations profondes ou semi-profondes, chaînages renforcés, ou stabilisation hydrique du sol</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Très fort</td>
                    <td className="border border-gray-300 p-3">&gt; 4 cm</td>
                    <td className="border border-gray-300 p-3">Solutions de stabilisation active (régulation hydrique, micropieux), surveillance continue</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              En pratique, plusieurs facteurs modulent l'interprétation du score :
            </p>

            <ul className="space-y-3 mb-8 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Type de construction :</strong> une maison récente aux normes parasismiques sera plus résiliente qu'un bâti ancien à fondations superficielles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Végétation environnante :</strong> la présence d'arbres à fort développement racinaire peut aggraver le risque de 1 à 2 niveaux</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Historique de sinistres :</strong> un terrain ayant déjà subi des désordres présente une probabilité de récidive élevée</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Projets d'extension ou de rénovation :</strong> toute modification du bâti doit intégrer les contraintes liées au RGA</span>
              </li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
              <strong className="text-gray-900">À savoir :</strong>
              <p className="text-gray-800 mt-2">
                Un score de risque n'est pas figé. L'évolution climatique, la modification de la végétation, ou des travaux d'aménagement peuvent faire évoluer le niveau d'exposition. Il est recommandé de réévaluer le risque tous les 5 à 10 ans, en particulier après un épisode de sécheresse exceptionnelle.
              </p>
            </div>
          </section>

          {/* Section 4: Quand réaliser */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quand réaliser un diagnostic RGA ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Un diagnostic RGA est recommandé dans plusieurs situations : avant l'achat d'un terrain ou d'une maison en zone d'aléa moyen à fort, en présence de fissures évolutives, avant des travaux d'extension ou de surélévation, ou dans le cadre d'une demande d'indemnisation auprès de l'assurance. Il constitue un document de référence pour orienter les choix constructifs ou correctifs.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les moments clés pour réaliser un diagnostic incluent :
            </p>

            <ol className="space-y-4 mb-8 list-decimal pl-6 text-gray-700">
              <li className="text-lg">
                <strong>Avant achat :</strong> vérifier l'exposition du terrain et anticiper les coûts de construction ou de mise en conformité
              </li>
              <li className="text-lg">
                <strong>En cas de fissures :</strong> établir un état des lieux objectif et identifier la cause (RGA, tassement, défaut de construction)
              </li>
              <li className="text-lg">
                <strong>Avant travaux :</strong> s'assurer que l'extension ou la rénovation ne fragilisera pas le bâti existant
              </li>
              <li className="text-lg">
                <strong>Pour une déclaration Cat-Nat :</strong> documenter les dommages et leur lien avec un événement de sécheresse reconnu
              </li>
              <li className="text-lg">
                <strong>Après un épisode de sécheresse exceptionnel :</strong> évaluer l'évolution du risque et anticiper les cycles futurs
              </li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon une étude de l'AQC (Agence Qualité Construction), 85% des propriétaires ayant réalisé un diagnostic avant construction en zone à risque ont évité des sinistres coûteux, contre seulement 40% pour ceux ayant construit sans étude préalable.
            </p>
          </section>

          {/* Section 5: Solutions */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Solutions adaptées selon le score de risque : place de l'hydrostabilisation
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Le diagnostic RGA permet d'orienter vers la solution la plus adaptée au contexte. Depuis 2015, l'hydrostabilisation s'est ajoutée au panel des réponses possibles, offrant une alternative aux micropieux pour les zones d'aléa moyen à fort avec des désordres en phase précoce. Le choix dépend du score de risque, de l'état du bâti, et du budget disponible.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Tableau d'orientation selon le score de risque :
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-3 text-left font-bold">Score de risque</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">État du bâti</th>
                    <th className="border border-gray-300 p-3 text-left font-bold">Solutions envisageables</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-3">Faible</td>
                    <td className="border border-gray-300 p-3">Aucun désordre</td>
                    <td className="border border-gray-300 p-3">Surveillance, prévention (végétation, drainage)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Moyen</td>
                    <td className="border border-gray-300 p-3">Fissures fines (&lt; 2 mm)</td>
                    <td className="border border-gray-300 p-3">Hydrostabilisation, drainage renforcé, surveillance active</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-3">Fort</td>
                    <td className="border border-gray-300 p-3">Fissures actives (2-5 mm)</td>
                    <td className="border border-gray-300 p-3">Hydrostabilisation (si fondations superficielles), pieux vissés, micropieux localisés</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 p-3">Très fort</td>
                    <td className="border border-gray-300 p-3">Lézardes, affaissements</td>
                    <td className="border border-gray-300 p-3">Micropieux, reprise en sous-œuvre, approche combinée</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              L'hydrostabilisation développée par TerraStab, issue des travaux du BRGM, est particulièrement efficace pour les habitations situées en zones d'aléa moyen à fort, notamment lorsque les fondations sont superficielles. Elle consiste à stabiliser l'humidité du sol grâce à un réseau de capteurs connectés et un système d'irrigation automatisé, permettant de réduire jusqu'à 85–90 % les mouvements d'argile. Son coût maîtrisé (1 000 à 8 000 €) et son caractère non invasif en font une alternative pertinente aux travaux lourds de reprise en sous-œuvre.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cependant, la solution TerraStab ne s'adresse pas uniquement aux cas les plus critiques. Même en aléa faible, ou lorsque le diagnostic est incertain, un monitoring autonome des sols peut fournir une information précieuse pour anticiper l'apparition de fissures. Et pour les situations les plus à risque, une installation complète peut devenir la réponse la plus adaptée.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Pour les scores très forts ou les bâtis très dégradés, les micropieux restent souvent nécessaires. Dans certains cas, une approche combinée peut être envisagée : micropieux localisés sur les angles critiques + hydrostabilisation globale pour prévenir l'extension des désordres.
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
                  Le diagnostic est-il obligatoire ?
                </h3>
                <p className="text-gray-800 mb-3">
                  Depuis janvier 2020, une étude géotechnique préalable (G1) est obligatoire pour toute vente de terrain constructible en zone d'aléa moyen ou fort. Pour les constructions existantes, le diagnostic n'est pas obligatoire mais fortement recommandé en cas de fissures ou de projet de travaux.
                </p>
                <a href="/#contact" className="text-blue-600 hover:underline font-medium">
                  Consulter la réglementation ELAN
                </a>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Puis-je le faire moi-même ?
                </h3>
                <p className="text-gray-800">
                  Vous pouvez consulter gratuitement la carte d'aléa BRGM sur Géorisques pour obtenir un premier niveau d'information. Cependant, un diagnostic complet nécessite des compétences en géotechnique (sondages, essais de laboratoire, interprétation) et doit être réalisé par un bureau d'études qualifié. Un auto-diagnostic peut sous-estimer le risque réel.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Les cartes BRGM sont-elles fiables partout ?
                </h3>
                <p className="text-gray-800">
                  Les cartes d'aléa du BRGM sont établies à l'échelle nationale avec une précision au 1/50 000. Elles constituent une excellente base d'évaluation, mais présentent des limites en zones de transition géologique ou pour des terrains de petite taille. Une étude géotechnique in situ apporte une précision supérieure et adaptée au contexte local.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Combien coûte un diagnostic RGA ?
                </h3>
                <p className="text-gray-800">
                  Le coût varie selon l'étendue de l'étude : une étude G1 préalable coûte entre 800 et 1 500 €, une étude G2 de conception (avec sondages approfondis) entre 2 000 et 5 000 €. Ces montants sont à mettre en perspective avec les coûts de réparation de désordres RGA, qui atteignent en moyenne 15 000 à 50 000 € par sinistre.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Le diagnostic garantit-il l'absence de problèmes futurs ?
                </h3>
                <p className="text-gray-800 mb-3">
                  Non. Un diagnostic évalue un risque probabiliste à un instant donné, en fonction des données disponibles. Le changement climatique, l'évolution de la végétation ou des modifications du terrain peuvent faire évoluer ce risque. Cependant, un diagnostic bien mené permet d'orienter vers des solutions préventives qui réduisent considérablement la probabilité de sinistre.
                </p>
                <a href="/#contact" className="text-blue-600 hover:underline font-medium">
                  Découvrir les solutions adaptées selon votre score
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
              Le diagnostic RGA est un outil d'aide à la décision qui combine géologie, climat et analyse du bâti pour produire une évaluation fiable du risque. Que ce soit avant un achat, en présence de fissures, ou avant des travaux, il permet d'anticiper et d'orienter vers des solutions adaptées. Les données du BRGM, de Météo-France et les essais géotechniques forment un socle scientifique solide pour comprendre et maîtriser le retrait-gonflement des argiles.
            </p>
            <p className="text-lg text-gray-800">
              <a href="/comprendre-rga" className="text-blue-600 hover:underline font-medium">
                Explorer les méthodes de stabilisation des fondations
              </a>
            </p>
          </section>

          {/* CTA Principal */}
          <section className="mb-16">
            <div className="bg-blue-600 rounded-2xl p-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à évaluer votre risque RGA ?
              </h2>
              <p className="text-xl text-blue-50 mb-8 max-w-2xl mx-auto">
                Recevez un <strong>diagnostic personnalisé</strong> en quelques minutes.
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

          {/* References */}
          <section className="border-t-2 border-gray-300 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Références
            </h2>
            <div className="space-y-4 text-gray-700 text-sm">
              <div>
                <p>
                  [1] BRGM (2023). <em>Carte d'aléa retrait-gonflement des sols argileux.</em> Géorisques. <a href="https://www.georisques.gouv.fr/risques/retrait-gonflement-des-argiles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.georisques.gouv.fr</a>
                </p>
              </div>
              <div>
                <p>
                  [4] Cerema (2019). <em>Mieux prévenir le risque de RGA.</em> Collection Références. <a href="https://www.cerema.fr/fr/actualites/mieux-prevenir-risque-retrait-gonflement-sols-argileux-rga" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.cerema.fr</a>
                </p>
              </div>
              <div>
                <p>
                  [5] Loi ELAN (2018). <em>Article 68 – Étude géotechnique préalable en zone d'aléa moyen ou fort.</em> Légifrance. <a href="https://www.ecologie.gouv.fr/politiques-publiques/loi-portant-evolution-du-logement-lamenagement-du-numerique-elan" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.ecologie.gouv.fr</a>
                </p>
              </div>
              <div>
                <p>
                  [6] AFNOR (2018). <em>NF P94-051 : Détermination des limites d'Atterberg.</em> Norme française de géotechnique. <a href="https://www.afnor.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.afnor.org</a>
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
