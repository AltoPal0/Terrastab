import sharp from 'sharp'
import { readdirSync } from 'fs'
import { join } from 'path'

const publicDir = './public'

/**
 * Obtient les dimensions de toutes les images PNG et JPG
 */
async function getImageDimensions() {
  console.log('📐 Obtention des dimensions des images...\n')

  const files = readdirSync(publicDir)
  const imageDimensions: Record<string, { width: number; height: number }> = {}

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

  console.log(`\n📊 Total: ${Object.keys(imageDimensions).length} images analysées`)

  // Génère un objet TypeScript exportable
  console.log('\n// Copier dans src/lib/imageDimensions.ts:')
  console.log('export const imageDimensions = ' + JSON.stringify(imageDimensions, null, 2))
}

getImageDimensions().catch(console.error)
