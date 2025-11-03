import sharp from 'sharp'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'

const publicDir = './public'
const imageExtensions = ['.jpg', '.jpeg', '.png']

/**
 * Convertit toutes les images JPG/PNG du dossier public/ en WebP
 * Qualité : 85 (bon compromis entre poids et qualité)
 * Garde les originaux pour fallback
 */
async function convertToWebP() {
  console.log('🚀 Conversion des images en WebP...\n')

  const files = readdirSync(publicDir)
  let convertedCount = 0
  let skippedCount = 0

  for (const file of files) {
    const ext = file.substring(file.lastIndexOf('.')).toLowerCase()

    if (imageExtensions.includes(ext)) {
      const inputPath = join(publicDir, file)
      const outputPath = join(publicDir, file.replace(ext, '.webp'))

      if (existsSync(outputPath)) {
        console.log(`⏭️  Existe déjà: ${file.replace(ext, '.webp')}`)
        skippedCount++
      } else {
        try {
          await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath)

          console.log(`✅ Converti: ${file} → ${file.replace(ext, '.webp')}`)
          convertedCount++
        } catch (error) {
          console.error(`❌ Erreur pour ${file}:`, error)
        }
      }
    }
  }

  console.log(`\n📊 Résumé:`)
  console.log(`   - ${convertedCount} image(s) convertie(s)`)
  console.log(`   - ${skippedCount} image(s) déjà en WebP`)
  console.log(`\n✨ Conversion terminée!`)
}

convertToWebP().catch(console.error)
