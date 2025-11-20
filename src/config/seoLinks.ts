/**
 * Configuration des liens SEO "Comprendre le risque"
 *
 * Pour activer un lien:
 * 1. Assurez-vous que le composant dans src/components/seo/ est complet
 * 2. Assurez-vous que la page dans pages/ existe
 * 3. Changez `enabled: false` en `enabled: true`
 * 4. Commit et push !
 */

export interface SeoLink {
  title: string
  href: string
  enabled: boolean
}

export const seoLinks: SeoLink[] = [
  {
    title: "Le risque RGA",
    href: "/comprendre-rga",
    enabled: true // ✅ Article complet sur le RGA
  },
  {
    title: "Maison fissurée",
    href: "/maison-fissuree",
    enabled: true // ✅ Article complet
  },
  {
    title: "Diagnostic RGA",
    href: "/diagnostic-rga",
    enabled: true // ✅ Article complet et excellent !
  },
  {
    title: "Prévention et entretien",
    href: "/prevention-entretien",
    enabled: true // ✅ Guide complet de prévention et entretien
  },
  {
    title: "Stabilisation des fondations",
    href: "/solution-stabilisation-sol-argileux",
    enabled: true // ✅ Article complet sur la stabilisation hydrique
  },
  {
    title: "Micropieux",
    href: "/micropieux",
    enabled: true // ✅ Article complet sur la solution mécanique classique
  },
  {
    title: "Fissures maison",
    href: "/fissures-maison",
    enabled: false // ❌ À vérifier
  },
  {
    title: "Zones RGA en France",
    href: "/zones-rga-france",
    enabled: false // ❌ À vérifier
  },
  {
    title: "Partenariats et innovation",
    href: "/partenariats-innovation",
    enabled: true // ✅ Article complet sur les partenariats scientifiques
  }
]

/**
 * Retourne uniquement les liens actifs
 */
export const getActiveSeoLinks = (): SeoLink[] => {
  return seoLinks.filter(link => link.enabled)
}
