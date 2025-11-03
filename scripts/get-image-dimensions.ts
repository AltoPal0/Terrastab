import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'

const publicDir = './public'
const responsiveDir = './public/responsive'

/**
 * Obtient les dimensions de toutes les images PNG et JPG
 * Y compris les images responsives
 */
async function getImageDimensions() {
  console.log('📐 Obtention des dimensions des images...\n')

  const imageDimensions: Record<string, { width: number; height: number }> = {}

  // Analyser les images dans /public
  const files = readdirSync(publicDir)
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
      const inputPath = join(publicDir, file)
      try {
        const metadata = await sharp(inputPath).metadata()
        if (metadata.width && metadata.height) {
          imageDimensions[file] = {
            width: metadata.width,
            height: metadata.height
          }
          console.log(`📏 ${file}: ${metadata.width} x ${metadata.height}`)
        }
      } catch (error) {
        console.error(`❌ Erreur pour ${file}:`, error)
      }
    }
  }

  // Analyser les images dans /public/responsive si le dossier existe
  if (existsSync(responsiveDir)) {
    console.log('\n📁 Images responsives:')
    const responsiveFiles = readdirSync(responsiveDir)
    for (const file of responsiveFiles) {
      if (file.match(/\.(jpg|jpeg|png|webp)$/i)) {
        const inputPath = join(responsiveDir, file)
        try {
          const metadata = await sharp(inputPath).metadata()
          if (metadata.width && metadata.height) {
            imageDimensions[`responsive/${file}`] = {
              width: metadata.width,
              height: metadata.height
            }
            console.log(`📏 responsive/${file}: ${metadata.width} x ${metadata.height}`)
          }
        } catch (error) {
          console.error(`❌ Erreur pour responsive/${file}:`, error)
        }
      }
    }
  }

  console.log(`\n📊 Total: ${Object.keys(imageDimensions).length} images analysées`)

  // Génère un objet TypeScript exportable
  console.log('\n// Copier dans src/lib/imageDimensions.ts:')
  console.log('export const imageDimensions = ' + JSON.stringify(imageDimensions, null, 2))
}

getImageDimensions().catch(console.error)
