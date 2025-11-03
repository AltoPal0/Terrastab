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
    title: "Maison fissurée: causes et solutions",
    href: "/maison-fissuree",
    enabled: false // ❌ Article incomplet
  },
  {
    title: "Diagnostic RGA",
    href: "/diagnostic-rga",
    enabled: true // ✅ Article complet et excellent !
  },
  {
    title: "Stabilisation des sols argileux",
    href: "/solution-stabilisation-sol-argileux",
    enabled: false // ❌ À vérifier
  },
  {
    title: "Fissures maison",
    href: "/fissures-maison",
    enabled: false // ❌ À vérifier
  },
  {
    title: "Fissures dans les murs",
    href: "/fissures-murs",
    enabled: true // ✅ Article complet (14,429 chars)
  },
  {
    title: "Zones RGA en France",
    href: "/zones-rga-france",
    enabled: false // ❌ À vérifier
  }
]

/**
 * Retourne uniquement les liens actifs
 */
export const getActiveSeoLinks = (): SeoLink[] => {
  return seoLinks.filter(link => link.enabled)
}
