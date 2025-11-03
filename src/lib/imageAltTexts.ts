/**
 * Textes alt descriptifs et optimisés SEO pour toutes les images du site TerraStab
 * Conformément aux bonnes pratiques SEO :
 * - Description précise du contenu visuel
 * - Intégration de mots-clés pertinents
 * - Contexte métier (retrait-gonflement des argiles, stabilisation)
 */

export const imageAlts = {
  // Logos principaux
  logoTerrastab: "TerraStab - Solutions connectées de stabilisation des sols argileux contre le retrait-gonflement des argiles",
  logoTerrastabMain: "Logo TerraStab - Expert en protection des maisons contre les dommages liés aux argiles gonflantes",

  // Images principales / Hero
  maisonFissuree: "Maison avec fissures structurelles importantes causées par le phénomène de retrait-gonflement des sols argileux (RGA)",
  maquette: "Système TerraStab de monitoring et irrigation intelligente pour la stabilisation des sols argileux",
  supportVisual2: "Installation de capteurs d'humidité TerraStab dans le sol argileux pour le monitoring en temps réel",
  supportVisual3: "Système complet TerraStab avec contrôleur intelligent et irrigation automatisée pour prévenir les fissures",

  // Logos partenaires et certifications
  logoFranceBrgm: "BRGM France - Bureau de Recherches Géologiques et Minières, partenaire de référence pour l'analyse des sols argileux",
  logoAdeme: "ADEME - Agence de la transition écologique, soutien TerraStab pour l'innovation environnementale",
  logoBpiFrance: "Bpifrance - Partenaire financeur de l'innovation TerraStab en matière de stabilisation des sols",
  logoCci: "CCI - Chambre de Commerce et d'Industrie, accompagnateur de TerraStab dans son développement",
  logoFranceAssureurs: "France Assureurs - Fédération de l'assurance française reconnaissant les solutions TerraStab",
  logoFrenchTech: "French Tech - Label d'excellence pour l'innovation technologique de TerraStab",
  logoGrandNancy: "Métropole du Grand Nancy - Soutien territorial au développement de TerraStab",
  logoNeedhelp: "NeedHelp - Partenaire d'accompagnement technique et développement de TerraStab",

  // Logos produits (différentes offres)
  surveyLight: "Offre SURVEY Light TerraStab : diagnostic RGA complet et plan d'action personnalisé pour votre maison",
  surveyPlus: "Offre SURVEY+ TerraStab : monitoring continu avec capteurs connectés et recommandations en temps réel",
  shield: "Offre SHIELD TerraStab : solution complète avec irrigation automatisée pour une protection maximale contre le RGA",

  // Images techniques / produits
  capteurHumidite: "Capteur d'humidité connecté TerraStab mesurant en temps réel le taux d'eau dans le sol argileux",
  controleurIrrigation: "Contrôleur intelligent TerraStab pilotant l'irrigation du sol pour maintenir une humidité stable",
  piqueIrrigation: "Pique d'irrigation TerraStab à enfoncer dans le sol pour un arrosage ciblé et efficace",

  // Cartes et visualisations
  carteRgaFrance: "Carte de France des zones à risque de retrait-gonflement des argiles (classification BRGM : fort, moyen, faible)",
  carteZoneRisque: "Visualisation cartographique du niveau de risque RGA pour votre secteur géographique",

  // Illustrations génériques
  graphiqueEvolution: "Graphique d'évolution de l'humidité du sol mesurée par les capteurs TerraStab",
  schemaInstallation: "Schéma d'installation du système TerraStab autour des fondations de la maison",

  // Helper function pour logos partenaires avec nom dynamique
  partnerLogo: (name: string) => `${name} - Partenaire certifié et reconnu de TerraStab`,

  // Helper function pour images de produits
  productImage: (productName: string, description: string) =>
    `${productName} TerraStab - ${description}`,
} as const

/**
 * Type-safe helper pour récupérer un texte alt
 */
export type ImageAltKey = keyof typeof imageAlts

/**
 * Fonction utilitaire pour obtenir un alt text avec fallback
 */
export function getImageAlt(key: string, fallback: string = ''): string {
  return (imageAlts as Record<string, unknown>)[key] as string || fallback
}
