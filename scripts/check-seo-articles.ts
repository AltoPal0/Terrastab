/**
 * Script pour vérifier l'état des articles SEO
 * Usage: npx tsx scripts/check-seo-articles.ts
 */

import fs from 'fs'
import path from 'path'
import { seoLinks } from '../src/config/seoLinks'

interface ArticleStatus {
  title: string
  href: string
  enabled: boolean
  componentExists: boolean
  pageExists: boolean
  contentLength: number
  status: 'ready' | 'incomplete' | 'missing'
}

const checkArticle = (link: typeof seoLinks[0]): ArticleStatus => {
  // Extraire le nom du composant depuis l'href
  const componentName = link.href
    .split('/')
    .pop()!
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  // Chemins des fichiers
  const componentPath = path.join(
    process.cwd(),
    'src',
    'components',
    'seo',
    `${componentName}.tsx`
  )
  const pagePath = path.join(
    process.cwd(),
    'pages',
    link.href.slice(1), // Enlever le /
    '+Page.tsx'
  )

  // Vérifier l'existence des fichiers
  const componentExists = fs.existsSync(componentPath)
  const pageExists = fs.existsSync(pagePath)

  // Lire le contenu du composant pour estimer sa complétude
  let contentLength = 0
  if (componentExists) {
    const content = fs.readFileSync(componentPath, 'utf-8')
    contentLength = content.length
  }

  // Déterminer le statut
  let status: 'ready' | 'incomplete' | 'missing' = 'missing'
  if (componentExists && pageExists) {
    // Article complet si > 2000 caractères (environ 500 mots)
    status = contentLength > 2000 ? 'ready' : 'incomplete'
  }

  return {
    title: link.title,
    href: link.href,
    enabled: link.enabled,
    componentExists,
    pageExists,
    contentLength,
    status
  }
}

// Vérifier tous les articles
console.log('🔍 Vérification des articles SEO...\n')

const results = seoLinks.map(checkArticle)

// Afficher les résultats
results.forEach(article => {
  const icon = article.enabled ? '✅' : '❌'
  const statusIcon =
    article.status === 'ready'
      ? '🟢'
      : article.status === 'incomplete'
      ? '🟡'
      : '🔴'

  console.log(`${icon} ${statusIcon} ${article.title}`)
  console.log(`   URL: ${article.href}`)
  console.log(`   État: ${article.status.toUpperCase()}`)
  console.log(`   Composant: ${article.componentExists ? '✓' : '✗'}`)
  console.log(`   Page Vike: ${article.pageExists ? '✓' : '✗'}`)
  console.log(`   Taille: ${article.contentLength} chars`)
  console.log(`   Publié: ${article.enabled ? 'OUI' : 'NON'}`)
  console.log('')
})

// Résumé
console.log('📊 RÉSUMÉ:')
console.log(`   Total articles: ${results.length}`)
console.log(`   Prêts (🟢): ${results.filter(r => r.status === 'ready').length}`)
console.log(
  `   Incomplets (🟡): ${results.filter(r => r.status === 'incomplete').length}`
)
console.log(`   Manquants (🔴): ${results.filter(r => r.status === 'missing').length}`)
console.log(`   Publiés (✅): ${results.filter(r => r.enabled).length}`)
console.log(`   Non publiés (❌): ${results.filter(r => !r.enabled).length}`)

// Recommandations
console.log('\n💡 RECOMMANDATIONS:')
results.forEach(article => {
  if (article.status === 'ready' && !article.enabled) {
    console.log(`   ⚡ "${article.title}" est prêt → Activer dans seoLinks.ts`)
  }
  if (article.status === 'incomplete' && article.enabled) {
    console.log(
      `   ⚠️  "${article.title}" est publié mais incomplet → Compléter l'article`
    )
  }
  if (article.status === 'ready' && article.enabled) {
    console.log(`   ✅ "${article.title}" est prêt et publié`)
  }
})

console.log('\n✨ Vérification terminée!\n')
