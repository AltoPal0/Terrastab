import fs from 'fs'
import path from 'path'

const DOMAIN = 'https://terrastab.fr'

// Liste des pages du site avec leur priorité et fréquence de mise à jour
const pages = [
  { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/maison-fissuree', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/diagnostic-rga', priority: '0.9', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/solution-stabilisation-sol-argileux', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/fissures-maison', priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/fissures-murs', priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/zones-rga-france', priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/offres', priority: '0.9', changefreq: 'weekly', lastmod: new Date().toISOString().split('T')[0] },
  { url: '/cgv', priority: '0.3', changefreq: 'yearly', lastmod: new Date().toISOString().split('T')[0] },
]

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${pages.map(page => `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Écrire le sitemap dans le dossier public
  const publicDir = path.join(process.cwd(), 'public')
  const sitemapPath = path.join(publicDir, 'sitemap.xml')

  fs.writeFileSync(sitemapPath, sitemap, 'utf-8')
  console.log('✅ Sitemap généré avec succès:', sitemapPath)
  console.log(`📄 ${pages.length} pages incluses dans le sitemap`)
}

generateSitemap()
