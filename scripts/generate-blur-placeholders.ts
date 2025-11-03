import sharp from 'sharp'
import { readdirSync } from 'fs'
import { join } from 'path'

const publicDir = './public'
const PLACEHOLDER_WIDTH = 20

/**
 * Génère des placeholders blur encodés en base64
 * pour toutes les images JPG/PNG
 */
async function generateBlurPlaceholders() {
  console.log('🌫️  Génération des placeholders blur...\n')

  const files = readdirSync(publicDir)
  const placeholders: Record<string, string> = {}

  for (const file of files) {
    const ext = file.substring(file.lastIndexOf('.')).toLowerCase()

    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      continue
    }

    const inputPath = join(publicDir, file)

    try {
      // Générer une version ultra-petite et floutée
      const buffer = await sharp(inputPath)
        .resize(PLACEHOLDER_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .blur(2)
        .webp({ quality: 20 })
        .toBuffer()

      // Encoder en base64
      const base64 = `data:image/webp;base64,${buffer.toString('base64')}`

      placeholders[file] = base64

      const sizeKB = (base64.length / 1024).toFixed(2)
      console.log(`✅ ${file}: ${sizeKB} KB (base64)`)
    } catch (error) {
      console.error(`❌ Erreur pour ${file}:`, error)
    }
  }

  console.log(`\n📊 Total: ${Object.keys(placeholders).length} placeholders générés`)
  console.log('\n// Copier dans src/lib/imagePlaceholders.ts:')
  console.log('export const imagePlaceholders = ' + JSON.stringify(placeholders, null, 2))
}

generateBlurPlaceholders().catch(console.error)
