import sharp from 'sharp'
import { readdirSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const publicDir = './public'
const responsiveDir = './public/responsive'

// Largeurs cibles pour les images responsives
const WIDTHS = [400, 768, 1200]

/**
 * Génère des versions responsives de toutes les images JPG/PNG
 * Format : {name}-{width}w.webp
 */
async function generateResponsiveImages() {
  console.log('🖼️  Génération des images responsives...\n')

  // Créer le dossier responsive s'il n'existe pas
  if (!existsSync(responsiveDir)) {
    mkdirSync(responsiveDir, { recursive: true })
  }

  const files = readdirSync(publicDir)
  let generatedCount = 0
  let skippedCount = 0

  for (const file of files) {
    const ext = file.substring(file.lastIndexOf('.')).toLowerCase()

    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue
    }

    const inputPath = join(publicDir, file)
    const baseName = file.replace(ext, '')

    console.log(`📸 Traitement de ${file}...`)

    try {
      // Obtenir les dimensions originales
      const metadata = await sharp(inputPath).metadata()
      const originalWidth = metadata.width || 0

      // Générer pour chaque largeur cible
      for (const targetWidth of WIDTHS) {
        // Ne pas upscaler : skip si l'image est plus petite que la cible
        if (originalWidth < targetWidth) {
          console.log(`  ⏭️  ${targetWidth}w - Skip (image trop petite)`)
          skippedCount++
          continue
        }

        const outputWebP = join(responsiveDir, `${baseName}-${targetWidth}w.webp`)
        const outputOriginal = join(responsiveDir, `${baseName}-${targetWidth}w${ext}`)

        // Générer WebP
        if (!existsSync(outputWebP)) {
          await sharp(inputPath)
            .resize(targetWidth, null, { withoutEnlargement: true })
            .webp({ quality: 85 })
            .toFile(outputWebP)
          console.log(`  ✅ ${targetWidth}w.webp`)
          generatedCount++
        } else {
          console.log(`  ⏭️  ${targetWidth}w.webp (existe)`)
          skippedCount++
        }

        // Générer format original
        if (!existsSync(outputOriginal)) {
          const resizeOptions = { withoutEnlargement: true }
          let pipeline = sharp(inputPath).resize(targetWidth, null, resizeOptions)

          if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 85 })
          } else {
            pipeline = pipeline.png({ quality: 85 })
          }

          await pipeline.toFile(outputOriginal)
          console.log(`  ✅ ${targetWidth}w${ext}`)
          generatedCount++
        } else {
          console.log(`  ⏭️  ${targetWidth}w${ext} (existe)`)
          skippedCount++
        }
      }

      console.log('')
    } catch (error) {
      console.error(`❌ Erreur pour ${file}:`, error)
    }
  }

  console.log(`\n📊 Résumé:`)
  console.log(`   - ${generatedCount} image(s) générée(s)`)
  console.log(`   - ${skippedCount} image(s) skippée(s)`)
  console.log(`\n✨ Génération terminée!`)
  console.log(`📁 Images dans: ${responsiveDir}`)
}

generateResponsiveImages().catch(console.error)
