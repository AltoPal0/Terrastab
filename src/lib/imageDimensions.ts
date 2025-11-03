/**
 * Dimensions intrinsèques des images
 * Utilisé pour éviter le Cumulative Layout Shift (CLS)
 * Généré automatiquement par scripts/get-image-dimensions.ts
 */
export const imageDimensions = {
  "maison_fissuree.jpg": {
    "width": 768,
    "height": 350
  },
  "partner_logo_france_assureurs2.png": {
    "width": 392,
    "height": 68
  },
  "partner_logo_france_assureurs2.webp": {
    "width": 392,
    "height": 68
  },
  "partner_logo_grand_nancy.png": {
    "width": 2048,
    "height": 647
  },
  "partner_logo_grand_nancy.webp": {
    "width": 2048,
    "height": 647
  },
  "partner_logo_needhelp.png": {
    "width": 228,
    "height": 65
  },
  "partner_logo_needhelp.webp": {
    "width": 228,
    "height": 65
  }
} as const

/**
 * Récupère les dimensions d'une image à partir de son chemin
 */
export function getImageDimensions(src: string): { width: number; height: number } | null {
  // Nettoyer le chemin (enlever le / initial si présent)
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src

  return (imageDimensions as Record<string, { width: number; height: number }>)[cleanSrc] || null
}
