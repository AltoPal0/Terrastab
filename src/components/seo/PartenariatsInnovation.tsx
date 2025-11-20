import Header from '../Header'
import Footer from '../Footer'
import { Button } from '../ui/button'
import RiskAssessmentSection from '../RiskAssessmentSection'

export default function PartenariatsInnovation() {
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
                src="/images/articles/argile-labo.jpg"
                alt="Chercheur et équipement scientifique pour recherche géotechnique sur sols argileux"
                className="max-w-full h-auto rounded-lg shadow-md"
                loading="lazy"
              />
              
            </figure>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Partenariats et innovation scientifique face au RGA
            </h1>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                La lutte contre le retrait-gonflement des argiles ne relève pas seulement de l'initiative privée. Elle s'inscrit dans un cadre scientifique et institutionnel structuré, porté par des organismes publics de recherche, des programmes nationaux, et des collaborations entre laboratoires et acteurs de terrain. Cette dynamique collective permet de transformer les avancées scientifiques en solutions concrètes, accessibles et validées pour protéger les habitations.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section 1: Contribution de la recherche publique */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment la recherche publique contribue-t-elle à la prévention du RGA ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                La recherche publique joue un rôle central dans la compréhension, la prévention et la gestion du RGA. Le BRGM (Bureau de Recherches Géologiques et Minières), l'INRAE (Institut National de Recherche pour l'Agriculture, l'Alimentation et l'Environnement), Météo-France, et le Cerema collaborent pour cartographier les zones à risque, modéliser les mouvements du sol, développer des outils prédictifs, et proposer des recommandations techniques validées scientifiquement.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Depuis les années 2000, plusieurs programmes de recherche nationaux ont été lancés pour structurer la connaissance et les réponses face au RGA :
            </p>

            <div className="space-y-6 mb-8 border-l-4 border-blue-400 pl-6">
              <div>
                <h3 className="font-bold text-blue-600 text-lg mb-2">1999-2005 : Identification et cartographie</h3>
                <p className="text-gray-700">
                  Lancement du programme national d'identification et de cartographie des zones argileuses par le BRGM, aboutissant à la carte d'aléa retrait-gonflement couvrant l'ensemble du territoire.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-blue-600 text-lg mb-2">2010-2015 : Modélisation hydrogéotechnique</h3>
                <p className="text-gray-700">
                  Programme de recherche INRAE-BRGM sur la modélisation hydrogéotechnique des sols argileux et l'impact du changement climatique.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-blue-600 text-lg mb-2">2015-2020 : Solutions innovantes</h3>
                <p className="text-gray-700">
                  Travaux collaboratifs autour des solutions de stabilisation, incluant la régulation hydrique, la gestion de la végétation et les solutions mécaniques classiques. Expérimentations sur sites témoins.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-blue-600 text-lg mb-2">2020-2025 : Prévention nationale</h3>
                <p className="text-gray-700">
                  Renforcement de la prise en compte du RGA dans les politiques publiques, avec une mission nationale dédiée visant à mieux prévenir, mieux informer et mieux indemniser.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ces travaux ont produit des résultats concrets :
            </p>

            <ul className="space-y-4 list-disc pl-6 text-gray-700 mb-8">
              <li className="text-lg">
                <strong>Cartographie précise :</strong> identification de plusieurs millions de maisons situées dans des zones d'aléa faible, moyen ou fort
              </li>
              <li className="text-lg">
                <strong>Modèles prédictifs :</strong> outils de modélisation permettant d'anticiper les mouvements du sol en fonction des données climatiques et géotechniques
              </li>
              <li className="text-lg">
                <strong>Recommandations constructives :</strong> évolution progressive des normes et recommandations (DTU, guides techniques) pour mieux intégrer les contraintes du RGA (profondeur de fondations, chaînages, distances de végétation)
              </li>
              <li className="text-lg">
                <strong>Solutions innovantes :</strong> exploration et évaluation de solutions alternative ou complémentaires aux micropieux, dont la régulation hydrique et la gestion de l'humidité des sols argileux
              </li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
              <strong className="text-blue-900 text-lg">Financement public :</strong>
              <p className="text-gray-800 mt-3">
                Depuis plus de deux décennies, l'État et les agences de financement (ANR, programmes ministériels, établissements publics) soutiennent des projets de recherche dédiés au RGA. Ces travaux ont donné lieu à de nombreux rapports techniques, publications scientifiques et outils d'aide à la décision destinés aux collectivités, aux professionnels et aux particuliers.
              </p>
            </div>
          </section>

          {/* Section 2: Rôle du BRGM */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quel rôle jouent les organismes publics comme le BRGM ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Le BRGM (Bureau de Recherches Géologiques et Minières) est l'opérateur de référence pour la caractérisation géologique des risques en France. Dans le domaine du RGA, il assure la cartographie nationale d'aléa, la consolidation de la base de données des sols, le développement d'outils d'évaluation du risque, et l'accompagnement scientifique des collectivités et des acteurs privés. Ses travaux constituent la base scientifique sur laquelle s'appuient les politiques publiques et les solutions techniques.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contributions principales du BRGM</h3>

            <ol className="space-y-6 mb-8 list-decimal pl-6">
              <li className="text-lg text-gray-700">
                <strong>Cartographie et données :</strong>
                <ul className="mt-3 space-y-2 list-disc pl-6">
                  <li>Carte d'aléa RGA à l'échelle 1/50 000, accessible gratuitement sur Géorisques</li>
                  <li>Base de données du sous-sol (BSS) : des centaines de milliers de forages référencés avec des données lithologiques et géotechniques</li>
                  <li>Mise à jour régulière des cartes en fonction de nouvelles données et de l'évolution climatique</li>
                </ul>
              </li>
              <li className="text-lg text-gray-700 mt-4">
                <strong>Recherche et développement :</strong>
                <ul className="mt-3 space-y-2 list-disc pl-6">
                  <li>Travaux de modélisation de l'impact du changement climatique sur les mouvements du sol</li>
                  <li>Développement d'outils prédictifs pour anticiper les zones à risque à différentes échéances temporelles</li>
                  <li>Expérimentations sur sites témoins pour mieux comprendre le comportement des sols et évaluer différentes solutions de stabilisation</li>
                </ul>
              </li>
              <li className="text-lg text-gray-700 mt-4">
                <strong>Accompagnement et diffusion :</strong>
                <ul className="mt-3 space-y-2 list-disc pl-6">
                  <li>Formation des bureaux d'études géotechniques aux méthodologies d'évaluation du risque</li>
                  <li>Publication de guides techniques et de recommandations pour les collectivités et les particuliers</li>
                  <li>Participation aux réflexions réglementaires (textes relatifs au RGA, prise en compte du phénomène dans les documents d'urbanisme)</li>
                </ul>
              </li>
            </ol>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Autres organismes impliqués</h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Au-delà du BRGM, plusieurs organismes contribuent à la recherche et à la prévention du RGA :
            </p>

            <ul className="space-y-4 list-disc pl-6 text-gray-700 mb-8">
              <li className="text-lg">
                <strong>INRAE :</strong> recherche sur les interactions sol-climat-végétation, développement de modèles hydrologiques, études sur le comportement hydrique des sols argileux
              </li>
              <li className="text-lg">
                <strong>Météo-France :</strong> fourniture de données climatiques (sécheresses, indices d'humidité des sols, projections climatiques régionales)
              </li>
              <li className="text-lg">
                <strong>Cerema :</strong> élaboration de guides techniques pour les constructeurs et les collectivités, diffusion des bonnes pratiques
              </li>
              <li className="text-lg">
                <strong>CSTB (Centre Scientifique et Technique du Bâtiment) :</strong> contribution à l'évolution des normes constructives et à l'évaluation technique des innovations
              </li>
            </ul>

            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-8">
              <strong className="text-yellow-900 text-lg">Coordination nationale :</strong>
              <p className="text-gray-800 mt-3">
                Une mission nationale dédiée au RGA a été mise en place afin de mieux structurer l'action des différents acteurs : ministère de la Transition écologique, assureurs, établissements publics (BRGM, Cerema), collectivités et professionnels. Elle vise à améliorer la prévention, la connaissance du phénomène et l'accompagnement des sinistrés.
              </p>
            </div>
          </section>

          {/* Section 3: Comment TerraStab s'inscrit dans cette dynamique */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment TerraStab s'inscrit-elle dans cette dynamique ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                TerraStab s'inscrit dans la continuité des travaux menés depuis plus de dix ans par les organismes publics de recherche. Les principes que nous utilisons — stabilisation hydrique, suivi géotechnique et gestion de la cinétique d'humidité — proviennent de décennies de recherche fondamentale et d'expérimentations de terrain menées par le BRGM, l'INRAE, le Cerema et leurs partenaires scientifiques. Notre rôle consiste à transformer ces connaissances en une solution opérationnelle et abordable pour les particuliers, sans revendiquer de participation directe aux programmes scientifiques initiaux ni de partenariat institutionnel.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              On peut comprendre l'émergence de solutions comme TerraStab en trois grandes étapes :
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Phase 1 : Recherche fondamentale publique (2015–2018)</h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Durant cette période, les organismes nationaux de recherche (BRGM, INRAE, Cerema) ont conduit des travaux majeurs sur la compréhension hydrogéotechnique des sols argileux : comportement en fonction de l'humidité, modélisation du retrait-gonflement, interaction sol-climat-végétation. Ces études ont posé les bases scientifiques de la stabilisation hydrique et du suivi du sol. TerraStab n'a pas participé à ces recherches, mais s'appuie sur ces connaissances publiées pour concevoir sa technologie.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Phase 2 : Expérimentations et démonstrateurs publics (2019–2022)</h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Pendant cette phase, les organismes de recherche ont conduit des expérimentations sur sites témoins, des démonstrateurs et des études comparatives entre solutions (mécaniques, hydriques, végétales). Elles ont contribué à mieux appréhender le potentiel de la régulation hydrique et des autres approches pour limiter les mouvements des sols dans certains contextes. TerraStab n'a pris part à aucune de ces expérimentations : nous utilisons uniquement les résultats rendus publics pour structurer notre approche et définir nos plages d'application.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Phase 3 : Transfert technologique et mise en application TerraStab (à partir de 2022)</h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              C'est uniquement à ce stade que TerraStab intervient : en transposant les connaissances issues des travaux publics en une solution installable chez les particuliers. Notre contribution consiste à industrialiser la méthode, développer des capteurs robustes, un boîtier de pilotage fiable, une plateforme de suivi, ainsi qu'un protocole d'installation simple et reproductible. TerraStab ne revendique pas de label ni d'agrément spécifique des organismes publics : nous nous alignons sur leurs enseignements scientifiques pour proposer une solution concrète et pragmatique.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Validation scientifique et ancrage dans la littérature technique</h3>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              La crédibilité de l'hydrostabilisation repose d'abord sur les travaux scientifiques et techniques publiés par la recherche publique et la communauté géotechnique. TerraStab s'appuie sur ces bases pour construire sa solution :
            </p>

            <ul className="space-y-4 list-disc pl-6 text-gray-700 mb-8">
              <li className="text-lg">
                <strong>Principes physiques documentés :</strong> comportement des sols argileux en fonction de la teneur en eau, rôle des cycles de sécheresse et de réhydratation, décrit dans la littérature spécialisée.
              </li>
              <li className="text-lg">
                <strong>Résultats d'expérimentations publiques :</strong> retours d'expérience et études techniques mentionnant l'intérêt de la maîtrise de l'humidité des sols dans la limitation de certains désordres.
              </li>
              <li className="text-lg">
                <strong>Conformité réglementaire :</strong> respect des grandes lignes des normes et recommandations applicables (DTU, bonnes pratiques de drainage, gestion des eaux, distances de végétation).
              </li>
              <li className="text-lg">
                <strong>Retour d'expérience terrain :</strong> amélioration progressive des protocoles TerraStab en fonction des diagnostics géotechniques et du suivi à moyen terme des installations.
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Cette démarche distingue TerraStab des approches purement empiriques : la solution est conçue pour rester cohérente avec l'état de l'art scientifique, tout en reconnaissant clairement ses limites d'application. L'hydrostabilisation n'est pas présentée comme une solution universelle, mais comme une option particulièrement adaptée à une large proportion de cas de désordres RGA, laissant les micropieux comme solution de référence pour les situations les plus critiques.
            </p>

            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-8">
              <strong className="text-yellow-900 text-lg">Mission sociale et accessibilité :</strong>
              <p className="text-gray-800 mt-3">
                L'un des objectifs fondateurs de TerraStab est de rendre la stabilisation accessible aux foyers modestes. La recherche publique a pour vocation de servir l'intérêt général : en proposant une solution qui peut être sensiblement moins coûteuse que des travaux lourds de reprise en sous-œuvre, TerraStab permet à des propriétaires qui n'auraient pas les moyens de réaliser une reprise en sous-œuvre de protéger leur maison. Cette approche s'inscrit dans la continuité de la recherche publique : transformer des connaissances scientifiques en solutions concrètes et plus équitables pour tous, sans lien capitalistique ou institutionnel avec les organismes de recherche.
              </p>
            </div>
          </section>

          {/* Section 4: Axes de recherche actuels et futurs */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quels sont les axes de recherche actuels et futurs ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Les programmes de recherche en cours portent sur plusieurs axes : amélioration des modèles prédictifs intégrant l'évolution climatique, développement de capteurs plus performants et autonomes, optimisation des algorithmes de régulation hydrique, et extension des solutions à d'autres types de sols sensibles (marnes, limons). L'objectif est d'anticiper l'évolution du risque RGA dans les prochaines décennies et de proposer des solutions toujours plus efficaces et accessibles.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Les principaux axes de recherche en cours incluent :
            </p>

            <ul className="space-y-4 list-disc pl-6 text-gray-700 mb-8">
              <li className="text-lg">
                <strong>Modélisation climatique fine :</strong> intégration des projections climatiques régionales pour mieux anticiper l'évolution du risque à l'échelle des territoires
              </li>
              <li className="text-lg">
                <strong>Outils d'aide à la décision :</strong> utilisation d'algorithmes avancés pour croiser données de sols, historique climatique et observations de terrain
              </li>
              <li className="text-lg">
                <strong>Capteurs nouvelle génération :</strong> développement de capteurs plus autonomes, plus robustes et moins coûteux pour faciliter le suivi des sols sur le long terme
              </li>
              <li className="text-lg">
                <strong>Solutions hybrides :</strong> combinaison de régulation hydrique, adaptation du bâti et gestion de la végétation pour mieux maîtriser les mouvements de sol.
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ces recherches mobilisent des équipes pluridisciplinaires et bénéficient de soutiens publics variés (programmes de recherche nationaux, coopérations européennes, partenariats scientifiques).
            </p>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Questions fréquentes
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Quels organismes travaillent sur le RGA ?
                </h3>
                <p className="text-gray-700">
                  Les principaux organismes publics impliqués sont le BRGM (cartographie et géologie), l'INRAE (hydrologie et comportement des sols), Météo-France (données climatiques), le Cerema (recommandations techniques), et le CSTB (normes constructives). Ces institutions contribuent, chacune dans leur rôle, à mieux comprendre le phénomène et à diffuser des outils et bonnes pratiques.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  La technologie TerraStab est-elle validée par des autorités publiques ?
                </h3>
                <p className="text-gray-700">
                  Non, TerraStab n'est pas une solution labellisée ni agréée par les organismes publics de recherche, qui restent indépendants de toute offre privée. En revanche, la démarche TerraStab s'appuie sur des principes et mécanismes (régulation hydrique, stabilisation des sols argileux, gestion de l'humidité) décrits et étudiés par le BRGM, l'INRAE, le Cerema et la littérature géotechnique. TerraStab transpose ces enseignements dans une solution opérationnelle destinée aux particuliers, sans prétendre représenter ou engager ces institutions.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Comment collaborer à ces programmes de recherche ?
                </h3>
                <p className="text-gray-700">
                  Les particuliers peuvent contribuer en signalant les désordres constatés via le portail Géorisques, en participant à des enquêtes de terrain menées par le BRGM ou l'INRAE, ou en proposant leur terrain comme site témoin dans le cadre de certains projets. Les professionnels (bureaux d'études, entreprises) peuvent s'inscrire dans des réseaux techniques ou participer à des groupes de travail animés par le Cerema ou d'autres organismes.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Les assurances soutiennent-elles ces innovations ?
                </h3>
                <p className="text-gray-700">
                  Les acteurs de l'assurance et de la réassurance s'intéressent de plus en plus aux solutions de prévention des risques naturels, dont le RGA. Certains travaux et retours d'expérience sont menés autour de la réduction de la vulnérabilité du bâti, de l'adaptation au changement climatique et des solutions innovantes. TerraStab, en tant qu'acteur privé, peut être intégrée dans une démarche individuelle de prévention, mais ne bénéficie pas d'un statut d'outil officiel des assureurs.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 text-lg mb-3">
                  Peut-on accéder gratuitement aux données sur le RGA ?
                </h3>
                <p className="text-gray-700">
                  Oui. La carte d'aléa RGA, les données de la base du sous-sol (BSS), certains guides techniques du Cerema, ainsi qu'une partie des publications des organismes publics sont accessibles en ligne sur les sites Géorisques, BRGM, Cerema et INRAE. Ces ressources constituent une base solide pour s'informer et évaluer son risque.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion Section */}
          <section className="mb-16 bg-blue-50 border border-blue-200 p-8 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              En résumé
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La lutte contre le retrait-gonflement des argiles mobilise un écosystème scientifique et institutionnel structuré, porté par des organismes publics de référence. Le BRGM, l'INRAE, Météo-France et le Cerema produisent des connaissances, des outils et des recommandations validées scientifiquement. TerraStab s'inscrit dans cette dynamique non pas comme un partenaire institutionnel, mais comme un cas d'application du transfert technologique : transformer les avancées de la recherche publique en solutions concrètes, accessibles et équitables pour protéger les habitations et servir l'intérêt général.
            </p>
          </section>

          {/* References Section */}
          <section className="mb-16 border-t-2 border-gray-300 pt-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Références
            </h2>

            <div className="space-y-4 text-gray-700">
              <div className="text-sm leading-relaxed">
                <strong>[1]</strong> BRGM (2023). <em>Carte d'aléa retrait-gonflement des sols argileux.</em> Géorisques.
                <a href="https://www.georisques.gouv.fr/risques/retrait-gonflement-des-argiles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.georisques.gouv.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[2]</strong> INRAE (2021). <em>Travaux sur le comportement hydrique des sols et le changement climatique.</em>
                <a href="https://www.inrae.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.inrae.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[3]</strong> BRGM (2022). <em>Études et expérimentations sur le retrait-gonflement des argiles.</em>
                <a href="https://www.brgm.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.brgm.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[4]</strong> Ministère de la Transition écologique. <em>Information et prévention du risque retrait-gonflement des argiles.</em>
                <a href="https://www.ecologie.gouv.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.ecologie.gouv.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[5]</strong> Cerema. <em>Construire et adapter sur sols argileux sensibles au retrait-gonflement.</em>
                <a href="https://www.cerema.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.cerema.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[6]</strong> ANR – Agence Nationale de la Recherche. <em>Programmes de recherche sur les risques naturels et géotechniques.</em>
                <a href="https://anr.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://anr.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[7]</strong> Météo-France. <em>Projections climatiques régionales et indicateurs d'humidité des sols.</em>
                <a href="https://www.meteofrance.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.meteofrance.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[8]</strong> CSTB (2021). <em>Évolution des normes constructives face aux risques liés au sol.</em>
                <a href="https://www.cstb.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.cstb.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[9]</strong> INRAE & partenaires. <em>Outils d'aide à la décision et modélisation des sols.</em>
                <a href="https://www.inrae.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.inrae.fr
                </a>
              </div>

              <div className="text-sm leading-relaxed">
                <strong>[10]</strong> France Assureurs. <em>Prévention et adaptation face aux risques naturels.</em>
                <a href="https://www.franceassureurs.fr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  https://www.franceassureurs.fr
                </a>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-blue-600 text-white py-12 px-8 rounded-lg text-center -mx-4 sm:-mx-6 lg:-mx-8 mt-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Évaluez votre risque RGA
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Découvrez comment la régulation hydrique se transforme en solution concrète pour votre situation spécifique.
            </p>
            <Button
              onClick={openRiskModal}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 text-lg"
            >
              Testez votre risque RGA
            </Button>
          </section>
        </article>
      </main>
      <Footer />
    </>
  )
}
