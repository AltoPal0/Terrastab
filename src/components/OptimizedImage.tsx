import type { ImgHTMLAttributes } from 'react'
import { useState, useRef, useEffect } from 'react'
import { getImageDimensions } from '@/lib/imageDimensions'
import { getImagePlaceholder } from '@/lib/imagePlaceholders'

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  fallback?: string // Pour fallback .jpg/.png si WebP non supporté
  eager?: boolean // Pour désactiver lazy loading sur les images above-the-fold
  responsive?: boolean // Activer les images responsives avec srcset
  sizes?: string // Attribut sizes pour images responsives
}

/**
 * Composant d'image optimisé avec :
 * - Support WebP automatique avec fallback
 * - Lazy loading par défaut (sauf si eager=true)
 * - Decoding async pour de meilleures performances
 * - Images responsives avec srcset (optionnel)
 * - Blur-up placeholder pendant le chargement
 * - Support des attributs HTML standards
 */
export default function OptimizedImage({
  src,
  alt,
  fallback,
  eager = false,
  responsive = false,
  sizes,
  className,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  // Obtenir les dimensions automatiquement si non fournies
  const dimensions = getImageDimensions(src)
  const finalWidth = width || dimensions?.width
  const finalHeight = height || dimensions?.height

  // Obtenir le placeholder blur (seulement pour les grandes images)
  // On désactive pour les logos/petites images car ça interfère avec le CSS
  const usePlaceholder = responsive // Seulement pour les images responsives
  const placeholder = usePlaceholder ? getImagePlaceholder(src) : null
  const [imageLoaded, setImageLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  // Vérifier si l'image est déjà chargée (cache)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true)
    }
  }, [])

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

  // Générer srcset pour images responsives
  const generateSrcSet = (format: 'webp' | 'original'): string | undefined => {
    if (!responsive) return undefined

    const baseName = src.replace(/^\//, '').replace(/\.(jpg|jpeg|png)$/i, '')
    const ext = src.match(/\.(jpg|jpeg|png)$/i)?.[0] || '.jpg'
    const targetExt = format === 'webp' ? '.webp' : ext

    // Vérifier quelles tailles existent pour cette image
    const widths = [400, 768, 1200]
    const srcSetParts: string[] = []

    for (const w of widths) {
      const responsiveSrc = `responsive/${baseName.split('/').pop()}-${w}w${targetExt}`
      const dims = getImageDimensions(responsiveSrc)
      if (dims) {
        srcSetParts.push(`/${responsiveSrc} ${w}w`)
      }
    }

    return srcSetParts.length > 0 ? srcSetParts.join(', ') : undefined
  }

  const webpSrcSet = generateSrcSet('webp')
  const originalSrcSet = generateSrcSet('original')

  // Sizes par défaut si responsive est activé
  const finalSizes = sizes || (responsive ? '(max-width: 640px) 400px, (max-width: 1024px) 768px, 1200px' : undefined)

  // Si pas de placeholder, pas besoin de wrapper
  if (!placeholder) {
    return (
      <picture>
        {/* Source WebP avec srcset si disponible */}
        <source
          srcSet={webpSrcSet || webpSrc}
          type="image/webp"
          sizes={finalSizes}
        />

        {/* Source originale avec srcset si disponible */}
        <source
          srcSet={originalSrcSet || originalSrc}
          type={src.match(/\.png$/i) ? 'image/png' : 'image/jpeg'}
          sizes={finalSizes}
        />

        {/* Image principale */}
        <img
          ref={imgRef}
          src={originalSrc}
          alt={alt}
          loading={eager ? undefined : 'lazy'}
          decoding="async"
          className={className}
          width={finalWidth}
          height={finalHeight}
          onLoad={() => setImageLoaded(true)}
          {...props}
        />
      </picture>
    )
  }

  // Avec placeholder blur-up
  return (
    <div className="relative inline-block overflow-hidden" style={{ maxWidth: '100%' }}>
      {/* Placeholder blur en arrière-plan */}
      {!imageLoaded && (
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
            opacity: imageLoaded ? 0 : 1
          }}
        />
      )}

      <picture>
        {/* Source WebP avec srcset si disponible */}
        <source
          srcSet={webpSrcSet || webpSrc}
          type="image/webp"
          sizes={finalSizes}
        />

        {/* Source originale avec srcset si disponible */}
        <source
          srcSet={originalSrcSet || originalSrc}
          type={src.match(/\.png$/i) ? 'image/png' : 'image/jpeg'}
          sizes={finalSizes}
        />

        {/* Image principale */}
        <img
          ref={imgRef}
          src={originalSrc}
          alt={alt}
          loading={eager ? undefined : 'lazy'}
          decoding="async"
          className={`${className || ''} relative z-10 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          width={finalWidth}
          height={finalHeight}
          onLoad={() => setImageLoaded(true)}
          {...props}
        />
      </picture>
    </div>
  )
}
