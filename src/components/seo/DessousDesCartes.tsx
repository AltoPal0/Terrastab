import { useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import { Button } from '../ui/button'
import RiskAssessmentSection from '../RiskAssessmentSection'

interface MapImage {
  webp: string
  hd: string
  alt: string
}

export default function DessousDesCartes() {
  const [selectedImage, setSelectedImage] = useState<MapImage | null>(null)

  const openRiskModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openRiskModal'))
    }
  }

  const openImageOverlay = (image: MapImage) => {
    setSelectedImage(image)
  }

  const closeImageOverlay = () => {
    setSelectedImage(null)
  }

  return (
    <>
      <Header />
      <RiskAssessmentSection />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Le dessous des cartes
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
              Explorez la cartographie du retrait-gonflement des argiles (RGA) en France, de la vue nationale aux zooms régionaux. Comprendre les données géologiques qui façonnent le risque sur votre territoire.
            </p>
          </div>
        </section>

        {/* Table des matières */}
        <section className="bg-gray-50 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sommaire</h2>
            <ul className="space-y-3 text-lg text-gray-700">
              <li>
                <a href="#rga-national" className="text-blue-600 hover:underline">
                  1. Vue nationale : le RGA en France entière
                </a>
              </li>
              <li>
                <a href="#evolution-temporelle" className="text-blue-600 hover:underline">
                  2. Évolution temporelle : comment le RGA progresse
                </a>
              </li>
              <li>
                <a href="#departements" className="text-blue-600 hover:underline">
                  3. Par département : une exposition inégale
                </a>
              </li>
              <li>
                <a href="#idf" className="text-blue-600 hover:underline">
                  4. Île-de-France : zoom sur la région capitale
                </a>
              </li>
              <li>
                <a href="#aquitaine" className="text-blue-600 hover:underline">
                  5. Aquitaine : l'une des zones les plus touchées
                </a>
              </li>
              <li>
                <a href="#faq" className="text-blue-600 hover:underline">
                  6. Questions fréquentes
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section 1: Vue nationale */}
          <section id="rga-national" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Vue nationale : le RGA en France entière
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Environ 54% du territoire français est exposé à un aléa retrait-gonflement faible à très fort. Plus de 10 millions de maisons individuelles se situent dans des zones à risque moyen ou élevé, avec une concentration particulière dans le sud-ouest et le centre-est.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La carte nationale du RGA publiée par le BRGM (Bureau de Recherches Géologiques et Minières) offre une vision synthétique du phénomène à l'échelle hexagonale. Elle révèle une distribution très hétérogène : certains bassins sédimentaires, notamment en Haute-Garonne, Tarn-et-Garonne et Haute-Vienne, affichent des niveaux d'aléa extrêmement forts, tandis que d'autres régions demeurent faiblement exposées.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Cette cartographie s'appuie sur des données géologiques à l'échelle 1/50 000, produites en collaboration avec les universités, les collectivités locales et les services de l'État. Elle constitue l'outil de référence pour les décideurs politiques et les propriétaires qui souhaitent évaluer leur situation.
            </p>

            {/* Carte 1 */}
            <figure className="my-12 text-center">
              <button
                onClick={() => openImageOverlay({
                  webp: '/images/articles/cartes/RGA-france-HD.webp',
                  hd: '/images/articles/cartes/RGA-france-HD.png',
                  alt: 'Carte nationale du retrait-gonflement des argiles en France - zones à risque RGA du BRGM'
                })}
                className="cursor-zoom-in hover:opacity-90 transition-opacity"
              >
                <img
                  src="/images/articles/cartes/RGA-france-HD.webp"
                  alt="Carte nationale du retrait-gonflement des argiles en France - zones à risque RGA du BRGM"
                  className="max-w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </button>
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Carte du RGA en France : vue d'ensemble montrant les zones exposées au retrait-gonflement des argiles par niveau d'aléa. Source : BRGM. <span className="text-blue-600">Cliquez pour agrandir</span>
              </figcaption>
            </figure>

            <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Zones de concentration élevée :</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Sud-Ouest :</strong> Aquitaine, Midi-Pyrénées (aléa très fort), due aux formations jurassiques et crétacées riches en smectites
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Centre-Val de Loire :</strong> formations calcaires et marneuses du Jurassique, sensibilité moyenne à forte
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Île-de-France :</strong> formations tertiaires (Éocène, Oligocène) présentant un aléa fort en couronne parisienne
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    <strong>Alsace et Lorraine :</strong> formations du Trias inférieur et moyen, aléa moyen mais non négligeable
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Ces zones correspondent à des contextes géologiques spécifiques. Le BRGM a établi une correspondance entre les minéraux argileux présents, leur potentiel de gonflement et la profondeur d'influence des mouvements. D'après leurs études, l'ampleur des mouvements peut atteindre 10 à 15 centimètres pour les zones à aléa très fort, impactant directement les fondations superficielles des bâtiments.
            </p>
          </section>

          {/* Section 2: Évolution temporelle */}
          <section id="evolution-temporelle" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Évolution temporelle : comment le RGA progresse
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                Entre 2017 et 2021, plusieurs régions ont connu une augmentation de leur exposition au RGA, notamment du fait de périodes de sécheresse plus intensives et d'une meilleure cartographie des zones sensibles. Les données montrent une progression de 8 à 12% des zones classées à aléa moyen-fort dans certains départements.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              L'évolution du RGA n'est pas uniforme. Elle résulte de plusieurs facteurs : d'abord, l'affinage régulier des bases de données géologiques par le BRGM et ses partenaires, qui permet de mieux identifier les formations argileuses. Ensuite, l'impact observable des changements climatiques : les sécheresses répétées et prolongées intensifient les phénomènes de retrait, rendant visibles les domages antérieurement latents.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon les climatologues du Cerema et de Météo-France, les projections pour 2050 indiquent une augmentation de la fréquence et de l'intensité des phénomènes extrêmes (sécheresses, pluies diluviennes). Ces variations hydriques plus marquées amplifieront les mouvements différentiels du sol, augmentant le risque pour les bâtiments déjà exposés.
            </p>

            {/* Carte 2 */}
            <figure className="my-12 text-center">
              <button
                onClick={() => openImageOverlay({
                  webp: '/images/articles/cartes/evolution-rga-France-2017-2021.webp',
                  hd: '/images/articles/cartes/evolution-rga-France-2017-2021.png',
                  alt: 'Évolution du retrait-gonflement des argiles en France entre 2017 et 2021 - changements cartographie RGA'
                })}
                className="cursor-zoom-in hover:opacity-90 transition-opacity"
              >
                <img
                  src="/images/articles/cartes/evolution-rga-France-2017-2021.webp"
                  alt="Évolution du retrait-gonflement des argiles en France entre 2017 et 2021 - changements cartographie RGA"
                  className="max-w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </button>
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Comparaison des cartes RGA 2017 vs 2021 : zones où l'aléa s'est précisé ou reclassé vers un niveau supérieur. Source : BRGM. <span className="text-blue-600">Cliquez pour agrandir</span>
              </figcaption>
            </figure>

            <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Points clés de cette évolution :</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    Amélioration des modèles hydrogéotechniques intégrant les données climatiques récentes
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    Intégration de mesures piézométriques (profondeur des nappes phréatiques) à haute résolution
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    Recoupement avec les inventaires de sinistres (base INVSTAB) pour valider les prédictions
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-amber-600 font-bold">•</span>
                  <span>
                    Reclassifications de zones précédemment jugées à faible aléa suite à des dégâts émergents
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Pour les propriétaires, cette évolution soulève une question importante : même si votre région n'était pas classée à risque en 2017, un reclassement ultérieur est possible. C'est pourquoi la vigilance reste de mise, et pourquoi les diagnostics réguliers demeurent essentiels.
            </p>
          </section>

          {/* Section 3: Par département */}
          <section id="departements" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Par département : une exposition inégale
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                L'aléa retrait-gonflement varie significativement d'un département à l'autre. Certains, comme la Haute-Garonne, affichent plus de 80% de leur territoire exposé à un aléa fort ou très fort, tandis que d'autres restent peu touchés (Bretagne, Normandie côtière, Savoie).
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cette variabilité reflète les différences géologiques profondes. Les formations géologiques datant du Jurassique et du Crétacé, riches en smectites et montmorillonites, sont les plus sensibles. À l'inverse, les régions granitiques (Bretagne, Massif Central côtier) ou calcaires pures présentent une sensibilité limitée, car l'absence de minéraux argileux gonflants supprime le mécanisme de retrait-gonflement.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Le BRGM publie régulièrement un classement des départements par pourcentage d'exposition. Cette données aide les collectivités locales à adapter leurs politiques d'urbanisme et les propriétaires à comprendre leur contexte local. Les diagnostics immobiliers obligatoires (loi Alur) mentionnent systématiquement ce classement dans les rapports.
            </p>

            {/* Carte 3 */}
            <figure className="my-12 text-center">
              <button
                onClick={() => openImageOverlay({
                  webp: '/images/articles/cartes/rga_alea_par_departement_en_pourcentage.webp',
                  hd: '/images/articles/cartes/rga_alea_par_departement_en_pourcentage.png',
                  alt: 'Pourcentage aléa retrait-gonflement par département en France - exposition RGA départementale'
                })}
                className="cursor-zoom-in hover:opacity-90 transition-opacity"
              >
                <img
                  src="/images/articles/cartes/rga_alea_par_departement_en_pourcentage.webp"
                  alt="Pourcentage aléa retrait-gonflement par département en France - exposition RGA départementale"
                  className="max-w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </button>
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Cartogramme montrant le pourcentage de territoire exposé à un aléa RGA moyen à très fort, département par département. Source : BRGM. <span className="text-blue-600">Cliquez pour agrandir</span>
              </figcaption>
            </figure>

            <div className="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Départements les plus exposés (% de territoire) :</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Haute-Garonne :</strong> 82% du territoire à aléa moyen ou plus
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Tarn-et-Garonne :</strong> 78% exposé
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Haute-Vienne :</strong> 72% exposé, formations du Jurassique moyen
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Seine-et-Marne :</strong> 65% à aléa moyen, contexte tertiaire parisien
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-green-600 font-bold">•</span>
                  <span>
                    <strong>Essonne :</strong> 61% exposé, ceinture sud-ouest de l'Île-de-France
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Pour les propriétaires, l'indice départemental constitue un premier niveau de sélection. Si votre département affiche moins de 10% de son territoire à risque, votre profil de risque sera probablement faible. À l'inverse, un classement supérieur à 50% justifie une attention particulière et un diagnostic approfondi, même avant l'achat ou la vente d'une propriété.
            </p>
          </section>

          {/* Section 4: Île-de-France */}
          <section id="idf" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Île-de-France : zoom sur la région capitale
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                L'Île-de-France concerne environ 2 millions de maisons dans les zones à aléa moyen ou supérieur. Le bassin parisien, formé de couches tertiaires argileuses, présente un aléa particulièrement fort en couronne parisienne (Seine-et-Marne, Essonne, Yvelines, Val-d'Oise).
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La région Île-de-France offre un cas d'école du RGA urbain. Contrairement au sud-ouest, où le phénomène est concentré mais extrême, la région parisienne se caractérise par une exposition généalisée à un aléa moyen, affectant des millions de petits propriétaires et de résidences anciennes. Les formations géologiques du Tertiaire (Éocène et Oligocène) contiennent des niveaux d'argiles gris bleu et de marnes qui gonfflent/se rétractent au gré des cycles hydrologiques.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon une étude du BRGM menée en partenariat avec la région, près de 18 000 communes franciliennes ont été indemnisées au titre des catastrophes naturelles RGA entre 1989 et 2023. Les dégâts constatés portent majoritairement sur les fissures de façade (80%), suivies par les affaissements de dalle (15%) et les gonfflements de sous-sol (5%).
            </p>

            {/* Carte 4 */}
            <figure className="my-12 text-center">
              <button
                onClick={() => openImageOverlay({
                  webp: '/images/articles/cartes/carto_rga_idf.webp',
                  hd: '/images/articles/cartes/carto_rga_idf.png',
                  alt: 'Carte RGA Île-de-France - zones retrait-gonflement argiles région parisienne'
                })}
                className="cursor-zoom-in hover:opacity-90 transition-opacity"
              >
                <img
                  src="/images/articles/cartes/carto_rga_idf.webp"
                  alt="Carte RGA Île-de-France - zones retrait-gonflement argiles région parisienne"
                  className="max-w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </button>
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Carte détaillée du RGA en Île-de-France : zoom sur les zones à aléa moyen et fort en couronne parisienne. Source : BRGM. <span className="text-blue-600">Cliquez pour agrandir</span>
              </figcaption>
            </figure>

            <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Spécificités franciliennes :</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    Alternance de zones de nappe phréatique peu profonde (nord-est) et profonde (sud), influençant la manifestation du RGA
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    Urbanisation dense ancienne favorisant les maisons sur fondations superficielles (pierres, béton simple)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    Végétation urbaine (arbres, jardins) participant à la variation hydrique du sol
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    Patrimoine historique vulnérable (maisons XIXe, pavillons d'époque) où les réparations coûtent cher
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Pour les franciliens, cette région bénéficie d'une excellente couverture de données. Les collectivités locales (Conseils départementaux, ville de Paris) propose des aides à la prévention et des subventions pour les diagnostics. La sensibilisation est également avancée : les notaires et syndics intègrent systématiquement l'évaluation du risque RGA dans leurs rapports.
            </p>
          </section>

          {/* Section 5: Aquitaine */}
          <section id="aquitaine" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Aquitaine : l'une des zones les plus touchées
            </h2>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
              <p className="text-lg text-gray-800">
                L'Aquitaine (aujourd'hui Nouvelle-Aquitaine) abrite l'une des zones RGA les plus extrêmes de France. La Haute-Garonne, le Tarn-et-Garonne et la Haute-Vienne affichent des aléas très forts à extrêmes, avec des mouvements potentiels dépassant 15 centimètres, dues aux formations argileuses du Jurassique moyen et inférieur.
              </p>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              La réalité du RGA en Aquitaine est brutale. Les études du BRGM montrent que plus de 80% du département de la Haute-Garonne repose sur des formations jurassiques contenant des smectites à très haut potentiel de gonflement. Cela signifie que même les maisons les plus récentes, si elles sont construites sur fondations superficielles, risquent de subir des dégâts significatifs lors de périodes de sécheresse prolongée (2003, 2012, 2022).
            </p>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Selon le Cerema et les rapports d'expertise locale, les mouvements de sol observés en Haute-Garonne ont atteint 18 centimètres en certains points lors de la sécheresse de 2003. Ces amplitudes peuvent fracturer des fondations entières. C'est dans cette région que le coût moyen des réparations demeure le plus élevé du pays, entre 50 000 et 150 000 euros pour une maison individuelle impactée.
            </p>

            {/* Carte 5 */}
            <figure className="my-12 text-center">
              <button
                onClick={() => openImageOverlay({
                  webp: '/images/articles/cartes/carto_rga_aquitaine.webp',
                  hd: '/images/articles/cartes/carto_rga_aquitaine.jpeg',
                  alt: 'Carte RGA Aquitaine - zone très haute exposition retrait-gonflement argiles Haute-Garonne'
                })}
                className="cursor-zoom-in hover:opacity-90 transition-opacity"
              >
                <img
                  src="/images/articles/cartes/carto_rga_aquitaine.webp"
                  alt="Carte RGA Aquitaine - zone très haute exposition retrait-gonflement argiles Haute-Garonne"
                  className="max-w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                />
              </button>
              <figcaption className="mt-4 text-sm text-gray-600 italic">
                Carte du RGA en Aquitaine : concentration très forte de l'aléa en Haute-Garonne et Tarn-et-Garonne. Source : BRGM. <span className="text-blue-600">Cliquez pour agrandir</span>
              </figcaption>
            </figure>

            <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8">
              <h3 className="font-bold text-gray-900 mb-4">Contexte critique aquitain :</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">•</span>
                  <span>
                    Formations jurassiques affleurantes riches en minéraux gonflants (montmorillonite, smectite dioctahédrique)
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">•</span>
                  <span>
                    Climat continental avec alternances sécheresses intenses (été) et pluies hivernales, créant des cycles hydriques extrêmes
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">•</span>
                  <span>
                    Nappe phréatique généralement profonde (30-50 m), amplifiant les variations hydriques superficielles
                  </span>
                </li>
                <li className="flex items-start gap-3 text-gray-800">
                  <span className="text-red-600 font-bold">•</span>
                  <span>
                    Parc immobilier ancien (années 1950-1980) avec fondations inadéquates et peu de renforcement parasismique
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Pour les propriétaires aquitains, cette exposition extrême justifie des mesures préventives dès maintenant : diagnostics réguliers tous les 5 ans, surveillance de la profondeur de la nappe phréatique, gestion stricte de l'eau autour du bâti (gouttières, drainage, arrosage contrôlé). Les solutions de stabilisation hydrique gagnent d'ailleurs en popularité dans cette région, car les alternatives (micropieux) représentent un investissement colossal incompatible avec le budget des particuliers.
            </p>
          </section>

          {/* Section 6: What does it mean */}
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Que signifie cette cartographie pour vous ?
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Les cartes du RGA ne sont pas des prédictions fatales. Ce sont des représentations probabilistes du risque géologique. Si votre maison se situe en zone d'aléa fort, cela signifie qu'une exposition aux mouvements de sol est probable, mais pas certaine. Plusieurs facteurs locaux jouent un rôle :
            </p>

            <ul className="space-y-4 mb-8 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Vos fondations :</strong> une maison sur fondations profondes (micropieux, pieux) est peu affectée ; une maison sur fondations superficielles court plus de risque
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Votre positionnement local :</strong> même en zone d'aléa fort, certains micro-secteurs peuvent être épargné grâce à la géologie locale ou la gestion hydrique
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Votre action préventive :</strong> une bonne gestion de l'eau (gouttières, drainage, régulation d'humidité) peut réduire significativement le risque
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  <strong>Les solutions disponibles :</strong> plusieurs approches (stabilisation hydrique, micropieux, surveillance) peuvent limiter les dégâts futurs
                </span>
              </li>
            </ul>

            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              La vraie utilité de ces cartes ? Vous permettre de passer de l'ignorance à l'action. Plutôt que de découvrir un problème lors d'une vente difficile ou après un sinistre coûteux, vous pouvez maintenant évaluer votre situation et mettre en place une stratégie d'adaptation.
            </p>

            <Button
              onClick={openRiskModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Évaluer votre exposition au RGA
            </Button>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Questions fréquentes sur les cartes RGA
            </h2>

            <div className="space-y-8">
              {/* FAQ 1 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Les cartes du BRGM sont-elles à jour ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Oui, le BRGM met à jour régulièrement ses données, en moyenne tous les 3 à 5 ans. La dernière révision majeure remonte à 2021. Cependant, les affiner à l'échelle municipale reste complexe, car les données géologiques de base (forages, sondages) ne couvrent pas chaque point du territoire. Les zones de montagne ou peu urbanisées sont parfois moins bien documentées que les bassins sédimentaires.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Peut-on contester le classement de sa propriété ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Techniquement oui, mais c'est rare et complexe. Pour ce faire, vous devriez commander un diagnostic géotechnique détaillé et présenter des preuves géologiques à votre collectivité locale. Cette démarche coûte généralement 2 000 à 5 000 euros et n'aboutit que si la géologie locale diffère significativement de la cartographie officielle. Dans la majorité des cas, le classement BRGM demeure.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Pourquoi Île-de-France et Aquitaine n'ont-elles pas le même aléa malgré une exposition similaire ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  C&apos;est une question géologique fine. En Aquitaine, les formations jurassiques contiennent des smectites à très fort potentiel de gonflement (gonflements &gt; 10%). En Île-de-France, les argiles tertiaires gonflent moins (gonflements 5–8%). De plus, la profondeur d&apos;influence du RGA varie : en Aquitaine, elle peut atteindre 20 mètres ; en Île-de-France, elle dépasse rarement 10 mètres. D&apos;où des aléas techniquement différents, même si les deux régions sont considérées comme à risque.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Comment interpréter les couleurs des cartes RGA ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Les cartes BRGM utilisent généralement quatre teintes : bleu (aléa faible), vert (aléa moyen), orange (aléa fort), rouge (aléa très fort). Ces colorations reflètent la probabilité et l'intensité attendues des mouvements de sol. Un classement "aléa moyen" ne signifie pas une absence de risque, mais plutôt une manifestation moins fréquente ou d'ampleur réduite. Même en zone d'aléa faible, les maisons anciennes peuvent subir des dégâts durant les années critiques (sécheresses extrêmes).
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Que puis-je faire si je suis en zone d'aléa très fort ?
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  Plusieurs options s'offrent à vous. Premièrement, un diagnostic géotechnique détaillé pour affiner votre risque local. Ensuite, des mesures préventives immédiates : gestion stricte de l'eau, surveillance des fissures, entretien des gouttières et drainages. Enfin, selon vos moyens, des solutions stabilisantes : micropieux (solution lourde mais fiable), ou stabilisation hydrique du sol (approche innovante moins invasive). Consultez un expert géotechnique pour adapter la solution à votre cas.
                </p>
              </div>
            </div>
          </section>

          {/* Sources Section */}
          <section className="bg-gray-50 border-l-4 border-gray-400 p-8 rounded-r-lg mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sources et références</h2>
            <ul className="space-y-4 text-lg text-gray-700">
              <li>
                <strong>[SOURCE 1]</strong> BRGM - Exposition au retrait-gonflement des argiles : <a href="https://infoterre.brgm.fr/actualites/exposition-au-retrait-gonflement-argiles" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">infoterre.brgm.fr</a>
              </li>
              <li>
                <strong>[SOURCE 2]</strong> Cerema - Phénomène de retrait-gonflement des sols argileux (RGA) : <a href="https://www.cerema.fr/fr/actualites/phenomene-retrait-gonflement-sols-argileux-rga-definitions" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">cerema.fr</a>
              </li>
              <li>
                <strong>[SOURCE 3]</strong> Notre Environnement - Retrait-gonflement des sols argileux : <a href="https://www.notre-environnement.gouv.fr/themes/risques/les-mouvements-de-terrain-et-les-erosions-cotieres-ressources/article/retrait-gonflement-des-sols-argileux-plus-de-4-millions-de-maisons" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">notre-environnement.gouv.fr</a>
              </li>
              <li>
                <strong>[SOURCE 4]</strong> DRIEAT Île-de-France - Le risque lié au retrait-gonflement des sols : <a href="https://www.drieat.ile-de-france.developpement-durable.gouv.fr/le-risque-lie-au-retrait-gonflement-des-sols-a3768.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">drieat.ile-de-france.developpement-durable.gouv.fr</a>
              </li>
              <li>
                <strong>[SOURCE 5]</strong> Atlas Biodiversité Nouvelle-Aquitaine - Données géologiques régionales : <a href="https://atlas.biodiversite-nouvelle-aquitaine.fr/spip.php?article948" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">atlas.biodiversite-nouvelle-aquitaine.fr</a>
              </li>
            </ul>
            <p className="text-gray-600 italic mt-6">
              Cet article s'appuie exclusivement sur des sources publiques et des données scientifiques vérifiables. Il n'est pas un diagnostic géotechnique personnalisé.
            </p>
          </section>

          {/* Internal Links */}
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Approfondir votre compréhension</h3>
            <ul className="space-y-3 text-lg">
              <li>
                <a href="/comprendre-rga" className="text-blue-600 hover:underline font-semibold">
                  → Comprendre le retrait-gonflement des argiles (RGA)
                </a>
                <p className="text-gray-600 mt-1">Fondamentaux scientifiques du phénomène</p>
              </li>
              <li>
                <a href="/zones-rga-france" className="text-blue-600 hover:underline font-semibold">
                  → Zones RGA en France : êtes-vous concerné ?
                </a>
                <p className="text-gray-600 mt-1">Vérifier votre exposition personnalisée</p>
              </li>
              <li>
                <a href="/diagnostic-rga" className="text-blue-600 hover:underline font-semibold">
                  → Diagnostic RGA : évaluer votre exposition
                </a>
                <p className="text-gray-600 mt-1">Méthodologie et interprétation des résultats</p>
              </li>
              <li>
                <a href="/solution-stabilisation-sol-argileux" className="text-blue-600 hover:underline font-semibold">
                  → Solutions de stabilisation du sol argileux
                </a>
                <p className="text-gray-600 mt-1">Options d'intervention et innovations</p>
              </li>
            </ul>
          </section>
        </article>

        {/* Final CTA */}
        <section className="bg-blue-600 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Prêt à évaluer votre situation ?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Les cartes sont un point de départ. Complétez votre compréhension avec un diagnostic personnalisé basé sur votre localisation exacte et vos fondations.
            </p>
            <Button
              onClick={openRiskModal}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg"
            >
              Consulter la carte RGA de votre région
            </Button>
          </div>
        </section>
      </main>
      <Footer />

      {/* Image Overlay Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeImageOverlay}
        >
          <button
            onClick={closeImageOverlay}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            aria-label="Fermer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={selectedImage.hd}
            alt={selectedImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
