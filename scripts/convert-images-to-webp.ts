import sharp from 'sharp'
import { readdirSync, existsSync, statSync } from 'fs'
import { join } from 'path'

const publicDir = './public'
const imageExtensions = ['.jpg', '.jpeg', '.png']

/**
 * Récupère récursivement tous les fichiers images d'un dossier
 */
function getAllImageFiles(dir: string): string[] {
  const files: string[] = []
  const items = readdirSync(dir)

  for (const item of items) {
    const fullPath = join(dir, item)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      files.push(...getAllImageFiles(fullPath))
    } else {
      const ext = item.substring(item.lastIndexOf('.')).toLowerCase()
      if (imageExtensions.includes(ext)) {
        files.push(fullPath)
      }
    }
  }
  return files
}

/**
 * Convertit toutes les images JPG/PNG du dossier public/ en WebP
 * Qualité : 85 (bon compromis entre poids et qualité)
 * Garde les originaux pour fallback
 * Parcourt récursivement tous les sous-dossiers
 */
async function convertToWebP() {
  console.log('🚀 Conversion des images en WebP...\n')

  const files = getAllImageFiles(publicDir)
  let convertedCount = 0
  let skippedCount = 0

  for (const inputPath of files) {
    const ext = inputPath.substring(inputPath.lastIndexOf('.')).toLowerCase()
    const outputPath = inputPath.replace(ext, '.webp')
    const relativePath = inputPath.replace(publicDir + '/', '')

    if (existsSync(outputPath)) {
      console.log(`⏭️  Existe déjà: ${relativePath.replace(ext, '.webp')}`)
      skippedCount++
    } else {
      try {
        await sharp(inputPath)
          .webp({ quality: 85 })
          .toFile(outputPath)

        console.log(`✅ Converti: ${relativePath} → ${relativePath.replace(ext, '.webp')}`)
        convertedCount++
      } catch (error) {
        console.error(`❌ Erreur pour ${relativePath}:`, error)
      }
    }
  }

  console.log(`\n📊 Résumé:`)
  console.log(`   - ${convertedCount} image(s) convertie(s)`)
  console.log(`   - ${skippedCount} image(s) déjà en WebP`)
  console.log(`\n✨ Conversion terminée!`)
}

convertToWebP().catch(console.error)
