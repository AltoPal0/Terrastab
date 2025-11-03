/**
 * Placeholders blur encodés en base64 pour toutes les images
 * Utilisés pour l'effet blur-up pendant le chargement
 * Généré automatiquement par scripts/generate-blur-placeholders.ts
 */
export const imagePlaceholders = {
  "maison_fissuree.jpg": "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAABQAwCdASoUAAkAPzmGulQvKSWjMAgB4CcJQBOgA7u64xkLAADFZ2ve7RX1oV+Z1UsrATVL0yv++iguAAA=",
  "partner_logo_france_assureurs2.png": "data:image/webp;base64,UklGRpIAAABXRUJQVlA4WAoAAAAQAAAAEwAAAgAAQUxQSD0AAAAATlphX1pUUlRWVlVTTUU4LCIcGhteZWdiW1RSU1VVVVRQSkE5Mi8vMm9vbWVdVlNUVlVWV1VRTEdEREdKAFZQOCAuAAAA8AIAnQEqFAADAD85hrlTryklorAIAeAnCUAAClUclpAA/rn+Xoyfx6q/oSWgAA==",
  "partner_logo_grand_nancy.png": "data:image/webp;base64,UklGRroAAABXRUJQVlA4WAoAAAAQAAAAEwAABQAAQUxQSFgAAAABuTJE9D8cjiPZVpXvPwHiI3dWDkt3jaFvvfd/RUzABEzPpZ29uweSJJV8TtzdXEmFSikeJAR64eHuw59x1KilgPh4EMJSq9cY4qGAgBTM9FIale58lngAVlA4IDwAAAAwAwCdASoUAAYAPzmGuVO0qSWisAgCkCcJZgC7ADBRt8WAAP7lYDEmxGXZL1PltZZYAl2TX9grV7YYAAA=",
  "partner_logo_needhelp.png": "data:image/webp;base64,UklGRrYAAABXRUJQVlA4WAoAAAAQAAAAEwAABQAAQUxQSFQAAAAFuQpE9D8sbmPbVpUvQB/0Xxmpuzexo3Oie3BIIyZgAsYnjnY29miN9Oj4BAeY+ih2BKIABb9FHCRQQCgsOAYViqNIUv52KEm55Ya1AxpVVSEmIFFWUDggPAAAAHADAJ0BKhQABgA/OYa6VC8pJaMwCAHgJwloAJ0yhHcmgAVBAAD+v8yxsvWUHzzgj0aKxlCcnJ3Z0TYAAA=="
} as const

/**
 * Récupère le placeholder blur d'une image à partir de son chemin
 */
export function getImagePlaceholder(src: string): string | null {
  // Nettoyer le chemin (enlever le / initial si présent)
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src

  return (imagePlaceholders as Record<string, string>)[cleanSrc] || null
}
