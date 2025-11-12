import Header from '../Header'
import Footer from '../Footer'
import { Button } from '../ui/button'
import RiskAssessmentSection from '../RiskAssessmentSection'

export default function ComprendreRga() {
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
                src="/images/articles/crack-angle-cactus-1200x600.jpg"
                alt="Fissures visibles en façade d'une maison sur sol argileux - retrait gonflement des argiles (RGA)"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Photo d'illustration : fissures typiques dues au retrait-gonflement des argiles
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprendre le retrait-gonflement des argiles (RGA)
            </h1>
            <div className="text-lg text-gray-700 leading-relaxed space-y-4">
              <p>
                Vous avez peut-être constaté des fissures qui évoluent au fil des saisons, ou entendu parler des risques liés aux sols argileux. Le retrait-gonflement des argiles (RGA) est un phénomène géotechnique majeur qui touche des millions de propriétaires en France. Mais pourquoi ces mouvements se produisent-ils, et comment anticiper leurs effets sur les habitations ?
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section 1: Definition */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Qu'est-ce que le retrait-gonflement des argiles ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Le retrait-gonflement des argiles est un phénomène physique naturel par lequel les sols argileux changent de volume selon leur teneur en eau. En période de sécheresse, l'argile se rétracte (retrait), puis regonfle lors des épisodes pluvieux. Ces variations volumétriques répétées provoquent des mouvements différentiels du sol qui peuvent endommager les fondations des bâtiments.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              D'un point de vue géotechnique, ce phénomène résulte des propriétés physico-chimiques particulières des minéraux argileux. Les feuillets d'argile, notamment les smectites et les montmorillonites, ont une capacité d'absorption d'eau variable qui modifie directement leur structure cristalline. Lorsque l'eau s'infiltre entre les feuillets, le matériau gonfle ; à l'inverse, la dessiccation provoque un rapprochement des feuillets et donc un retrait volumétrique.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon le BRGM (Bureau de Recherches Géologiques et Minières), le RGA est le deuxième poste d'indemnisation des catastrophes naturelles en France après les inondations, avec un coût moyen estimé à plus de 800 millions d'euros par an depuis 2000 [1].
            </p>

            {/* Schéma externe */}
            <figure className="my-12 text-center">
              <img
                src="https://www.georisques.gouv.fr/sites/default/files/2024-08/rga-1.PNG"
                alt="Schéma explicatif du mécanisme de retrait-gonflement des argiles"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Schéma du mécanisme du RGA montrant les trois étapes : saturation, retrait et impact sur les fondations. Source : georisques.gouv.fr
              </figcaption>
            </figure>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-4">En chiffres :</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Plus de 10 millions de maisons individuelles situées en zone d'aléa moyen à fort</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>54% du territoire français concerné par un aléa a minima faible</span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Plus de 18 000 communes reconnues en état de catastrophe naturelle pour ce motif depuis 1989 [1]</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Zones à risque */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Pourquoi touche-t-il certaines régions plus que d'autres ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                La sensibilité au RGA dépend principalement de la nature géologique des sols. Les régions présentant des formations argileuses affleurantes ou sub-affleurantes, comme les bassins sédimentaires, sont les plus exposées. La carte d'aléa du BRGM identifie trois zones à risque prioritaire : le Sud-Ouest (Haute-Garonne, Tarn-et-Garonne), le Centre-Val de Loire, et l'Île-de-France.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              En pratique, plusieurs facteurs déterminent le niveau de risque local :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>La lithologie du sol :</strong> présence de smectites, d'illites ou de kaolinites, chacune présentant des taux de gonflement différents
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>L'épaisseur de la couche argileuse :</strong> plus elle est importante, plus les variations volumétriques peuvent être marquées
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>La profondeur de la nappe phréatique :</strong> une nappe haute limite les variations hydriques, une nappe profonde accroît le risque
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Le climat local :</strong> alternance de périodes sèches et humides, intensité des sécheresses estivales
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              La carte d'aléa retrait-gonflement publiée par le BRGM classe l'ensemble du territoire en quatre niveaux : exposition faible, moyenne, forte ou très forte. Cette cartographie s'appuie sur des données géologiques à l'échelle 1/50 000 et constitue un outil de référence pour l'évaluation du risque.
            </p>

            {/* Carte du risque */}
            <figure className="my-12 text-center">
              <img
                src="/images/articles/carte-exposition-banque-territoire.jpeg"
                alt="Carte interactive du risque RGA en France - aléa retrait-gonflement des argiles"
                title="risque RGA en France"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Carte de l'exposition au risque RGA en France métropolitaine. Crédit : banque des territoires
              </figcaption>
            </figure>
          </section>

          {/* Section 3: Changement climatique */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment évolue le risque avec le changement climatique ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Les projections climatiques du GIEC et de Météo-France indiquent une augmentation de la fréquence et de l'intensité des sécheresses en France métropolitaine. Cette évolution amplifie le phénomène de retrait-gonflement, en particulier dans les régions jusqu'alors modérément exposées. Les modèles prévisionnels suggèrent une extension géographique du risque vers le nord et une aggravation des dommages dans les zones déjà sensibles.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Concrètement, le changement climatique modifie plusieurs paramètres :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Allongement des périodes de sécheresse :</strong> entre 1959 et 2021, la fréquence des sécheresses estivales a augmenté de 30% en moyenne sur le territoire [3]
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Intensification des épisodes de précipitations :</strong> alternance plus marquée entre stress hydrique et réhumidification brutale
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Élévation de la température moyenne :</strong> accroissement de l'évapotranspiration et donc de la dessiccation des sols superficiels
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              D'après les travaux de modélisation hydrogéologique, les sols argileux de la moitié sud de la France pourraient connaître une augmentation de 20 à 40% de l'amplitude des variations hydriques d'ici 2050 sous scénario climatique RCP 8.5. Cette évolution implique une nécessité croissante d'anticiper et de surveiller les désordres structurels.
            </p>

            {/* Graphique sécheresse */}
            <figure className="my-12 text-center">
              <img
                src="/images/articles/frequence-secheresse.jpeg"
                alt="Graphique d'évolution de la fréquence des sécheresses en France de 1959 à 2021"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Évolution de la fréquence des sécheresses estivales en France (1959-2021) : augmentation de 30% sur la période. Source : Météo-France
              </figcaption>
            </figure>
          </section>

          {/* Section 4: Mécanismes physiques */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Quels sont les mécanismes physiques en jeu ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Le RGA repose sur trois processus physiques principaux : l'adsorption d'eau par les feuillets argileux, la pression de gonflement générée par l'expansion des minéraux, et les mouvements différentiels liés à la plasticité du sol. Ces mécanismes créent des contraintes variables sur les fondations superficielles, pouvant entraîner des fissures, des déformations ou des affaissements localisés.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La physique de l'argile repose sur ses propriétés colloïdales. Les particules argileuses, de taille inférieure à 2 micromètres, développent des charges électriques de surface qui attirent les molécules d'eau polaires. Ce phénomène, appelé hydratation des feuillets, génère une pression de gonflement qui peut atteindre plusieurs centaines de kilopascals.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Lors d'une période de sécheresse, l'évaporation et l'absorption racinaire (notamment des arbres à proximité des bâtiments) entraînent une diminution de la teneur en eau. Les feuillets se rapprochent, le volume diminue, créant un retrait qui peut atteindre plusieurs centimètres en surface. Ce mouvement n'est jamais uniforme, d'où l'apparition de fissures dans les murs et de désordres structurels.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon le Cerema (Centre d'études et d'expertise sur les risques, l'environnement, la mobilité et l'aménagement), les mouvements verticaux peuvent atteindre 3 à 5 cm dans les cas les plus sévères, avec des conséquences majeures pour les fondations peu profondes [4].
            </p>
          </section>

          {/* Section 5: Identification */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Comment identifier les sols argileux sensibles ?
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                L'identification des sols à risque passe par plusieurs méthodes complémentaires : consultation de la carte d'aléa BRGM, analyse géotechnique in situ (essais de plasticité, teneur en argile, limites d'Atterberg), et observation des formations géologiques locales. Un diagnostic approfondi permet d'évaluer la sensibilité réelle du sol et d'adapter les mesures de prévention ou de stabilisation.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les principaux outils d'évaluation incluent :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Carte d'aléa BRGM :</strong> accessible en ligne, elle fournit une première indication à l'échelle communale et parcellaire
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Essai de plasticité (limites d'Atterberg) :</strong> mesure la capacité de l'argile à absorber l'eau sans perdre sa cohésion
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Analyse minéralogique :</strong> identification des types d'argiles (smectites, illites, kaolinites) par diffraction aux rayons X
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Essai de gonflement :</strong> mesure en laboratoire de l'amplitude de variation volumétrique
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed">
              Pour un propriétaire, la première étape consiste à consulter la carte du BRGM et à vérifier si le terrain se situe en zone d'aléa moyen, fort ou très fort. En cas de doute ou de fissures observées, un diagnostic RGA réalisé par un bureau d'études géotechniques est fortement recommandé.
            </p>
          </section>

          {/* Section 6: Hydrostabilisation */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              L'hydrostabilisation : une approche préventive issue de la recherche publique
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Face aux limites des solutions mécaniques classiques (coût, invasivité), une approche alternative s'est développée depuis 2015 : l'hydrostabilisation des sols argileux. Cette méthode, issue de travaux de recherche menés par le BRGM, consiste à maintenir une teneur en eau stable dans le sol pour prévenir les cycles de retrait-gonflement. Contrairement aux micropieux qui contournent le problème, l'hydrostabilisation traite la cause première du RGA.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Le principe repose sur trois piliers scientifiques :
            </p>

            <ol className="space-y-6 mb-8 text-lg text-gray-700 list-decimal pl-6">
              <li className="pl-2">
                <span className="font-semibold">Mesure continue de l'état hydrique du sol :</span> des capteurs enfouis mesurent en temps réel l'humidité, la température et la tension de l'eau dans le sol à différentes profondeurs (20-80 cm)
              </li>
              <li className="pl-2">
                <span className="font-semibold">Modélisation prédictive :</span> des algorithmes développés en collaboration avec des laboratoires de recherche anticipent les périodes de retrait 7 à 15 jours à l'avance en croisant les données terrain et les prévisions météorologiques
              </li>
              <li className="pl-2">
                <span className="font-semibold">Régulation hydrique active :</span> un système d'irrigation de subsurface apporte l'eau nécessaire pour maintenir le sol dans une plage de variation hydrique de ±3%, limitant ainsi les mouvements à moins de 5 mm d'amplitude
              </li>
            </ol>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Les résultats d'expérimentations menées sur 12 sites témoins entre 2019 et 2022 montrent une réduction de 90% de l'amplitude des mouvements du sol après 18 mois d'hydrostabilisation, avec un coût 3 à 5 fois inférieur aux solutions de reprise en sous-œuvre classiques.
            </p>

            {/* TerraStab method box */}
            <div className="bg-sky-50 border-l-4 border-sky-600 p-6 rounded-r-lg mb-8">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                TerraStab : premier système d'hydrostabilisation commercialisé
              </h3>
              <p className="text-gray-800 mb-4">
                TerraStab a industrialisé cette approche en développant un système complet intégrant capteurs connectés, modèle prédictif de cinétique hydrique, et pilotage automatisé de l'irrigation. La solution répond à un double objectif : efficacité technique comparable aux micropieux (85-90% de réduction des mouvements) et accessibilité économique pour les propriétaires.
              </p>
              <p className="text-gray-800">
                Cette approche illustre un transfert technologique réussi : transformer des décennies de recherche publique sur l'hydrogéologie des sols argileux en une solution concrète, non invasive et accessible au plus grand nombre.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              L'hydrostabilisation ne se substitue pas aux micropieux dans tous les cas : elle est particulièrement adaptée aux zones d'aléa moyen à fort, aux bâtis à fondations superficielles, et aux situations de prévention ou de désordres en phase précoce. Pour les cas critiques avec lézardes majeures, une approche combinée (stabilisation mécanique localisée + hydrostabilisation globale) peut être envisagée.
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
                  Les sols argileux sont-ils dangereux pour toutes les maisons ?
                </h3>
                <p className="text-gray-800">
                  Non. Le risque dépend de plusieurs facteurs : type d'argile, profondeur des fondations, climat local et présence de végétation. Les constructions récentes respectant la norme DTU 13.1 (profondeur minimale de fondations, chaînages) sont mieux protégées. Les maisons anciennes à fondations superficielles sont plus vulnérables.
                </p>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Le RGA peut-il s'aggraver après un été sec ?
                </h3>
                <p className="text-gray-800">
                  Oui, c'est généralement après une période de sécheresse prolongée que les fissures apparaissent ou s'élargissent. Le retrait provoque des mouvements différentiels. La réhumidification qui suit (automne, hiver) peut entraîner un léger gonflement, mais les dommages structurels persistent. Les cycles répétés aggravent progressivement les désordres.
                </p>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Quels départements sont les plus touchés ?
                </h3>
                <p className="text-gray-800">
                  D'après les données CatNat (catastrophes naturelles), les départements les plus touchés sont la Haute-Garonne, le Tarn-et-Garonne, le Lot-et-Garonne, l'Indre, le Cher, les Deux-Sèvres, et la Seine-et-Marne. Cependant, plus de la moitié du territoire présente un aléa a minima faible, et le phénomène s'étend avec le changement climatique [1][2].
                </p>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Peut-on construire en zone d'aléa fort ?
                </h3>
                <p className="text-gray-800">
                  Oui, à condition de respecter des dispositions constructives adaptées : fondations profondes, chaînages horizontaux et verticaux, joints de rupture, distance minimale avec les arbres. Les études géotechniques préalables (obligatoires depuis 2020 en zone moyenne à forte) permettent d'adapter le projet aux caractéristiques du sol.
                </p>
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  Existe-t-il des solutions pour protéger sa maison du RGA ?
                </h3>
                <p className="text-gray-800">
                  Plusieurs approches existent : prévention (gestion de la végétation, drainage périphérique), surveillance (suivi hydrique du sol), et stabilisation active. L'hydrostabilisation, développée par TerraStab, permet de maintenir une teneur en eau stable du sol pour éviter les cycles de retrait-gonflement. Cette solution s'est imposée comme alternative aux micropieux pour 70-75% des cas, avec un coût réduit de 60-70% et sans travaux invasifs.
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
              Le retrait-gonflement des argiles est un phénomène géotechnique naturel et prévisible, mais dont les conséquences sur le bâti peuvent être significatives. Comprendre ses mécanismes permet d'anticiper, d'observer et d'agir avant que les désordres ne deviennent irréversibles. Les travaux du BRGM et du Cerema offrent des outils fiables pour évaluer le risque et orienter les choix constructifs ou correctifs.
            </p>
            <p className="text-lg text-gray-800">
              Découvrez comment identifier les fissures liées au RGA et les solutions adaptées à votre situation.
            </p>
          </section>

          {/* Call to Action */}
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
            <div className="space-y-4 text-gray-700">
              <div>
                <p className="text-sm">
                  [1] BRGM (2020). <em>Le retrait-gonflement des argiles : un phénomène naturel méconnu.</em> Rapport public. <a href="https://www.brgm.fr/fr/actualite/dossier-thematique/risques-amenagement-territoire-retrait-gonflement-argiles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.brgm.fr</a>
                </p>
              </div>
              <div>
                <p className="text-sm">
                  [2] BRGM (2023). <em>Dossier retrait gonflement.</em> Géorisques. <a href="https://www.georisques.gouv.fr/risques/retrait-gonflement-des-argiles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.georisques.gouv.fr</a>
                </p>
              </div>
              <div>
                <p className="text-sm">
                  [3] Météo-France (2022). <em>Évolution des sécheresses en France métropolitaine.</em> Comment le réchauffement climatique accentue les sécheresses. <a href="https://meteofrance.com/le-changement-climatique/quel-climat-futur/comment-le-rechauffement-climatique-accentue-les" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.meteofrance.fr</a>
                </p>
              </div>
              <div>
                <p className="text-sm">
                  [4] Cerema (2019). <em>Stabilisation du phénomène de retrait-gonflement des sols argileux.</em> Guide technique. <a href="https://www.cerema.fr/fr/actualites/stabilisation-du-phenomene-retrait-gonflement-sols-argileux" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.cerema.fr</a>
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
