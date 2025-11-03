import type { ImgHTMLAttributes } from 'react'
import { getImageDimensions } from '@/lib/imageDimensions'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallback?: string // Pour fallback .jpg/.png si WebP non supporté
  eager?: boolean // Pour désactiver lazy loading sur les images above-the-fold
}

/**
 * Composant d'image optimisé avec :
 * - Support WebP automatique avec fallback
 * - Lazy loading par défaut (sauf si eager=true)
 * - Decoding async pour de meilleures performances
 * - Support des attributs HTML standards
 */
export default function OptimizedImage({
  src,
  alt,
  fallback,
  eager = false,
  className,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  // Obtenir les dimensions automatiquement si non fournies
  const dimensions = getImageDimensions(src)
  const finalWidth = width || dimensions?.width
  const finalHeight = height || dimensions?.height

  // Ne pas convertir les SVG en WebP
  if (src.endsWith('.svg')) {
    return (
      <img
        src={src}
        alt={alt}
        loading={eager ? undefined : 'lazy'}
        className={className}
        width={finalWidth}
        height={finalHeight}
        {...props}
      />
    )
  }

  // Convertir automatiquement .jpg/.png en .webp
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  const originalSrc = fallback || src

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={originalSrc} type={src.match(/\.png$/i) ? 'image/png' : 'image/jpeg'} />
      <img
        src={originalSrc}
        alt={alt}
        loading={eager ? undefined : 'lazy'}
        decoding="async"
        className={className}
        width={finalWidth}
        height={finalHeight}
        {...props}
      />
    </picture>
  )
}
