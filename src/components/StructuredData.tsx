import { Helmet } from '@dr.pogodin/react-helmet'

interface StructuredDataProps {
  type?: 'homepage' | 'article' | 'faq'
  pageTitle?: string
  pageDescription?: string
  pageUrl?: string
}

export default function StructuredData({
  type = 'homepage',
  pageTitle,
  pageDescription,
  pageUrl
}: StructuredDataProps) {
  // Organization Schema - présent sur toutes les pages
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TerraStab",
    "url": "https://terrastab.fr",
    "logo": "https://terrastab.fr/logo_terrastab.svg",
    "description": "Solutions connectées pour surveiller et stabiliser les sols argileux. Protection contre le retrait-gonflement des argiles (RGA).",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Service client",
      "areaServed": "FR",
      "availableLanguage": "fr"
    },
    "sameAs": [
      "https://www.linkedin.com/company/terrastab"
    ]
  }

  // FAQ Schema - pour la page d'accueil
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que le retrait-gonflement des argiles (RGA) ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le retrait-gonflement des argiles (RGA) est un phénomène naturel qui se produit lorsque les sols argileux se contractent en période de sécheresse et gonflent lors de fortes pluies. Ces mouvements répétés peuvent causer des fissures dans les fondations et les murs de votre maison."
        }
      },
      {
        "@type": "Question",
        "name": "Comment savoir si ma maison est exposée au risque RGA ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vous pouvez utiliser notre outil gratuit d'évaluation des risques en ligne qui analyse votre adresse et consulte la base de données nationale RGA pour déterminer le niveau de risque de votre terrain. Nous proposons également des diagnostics complets par nos experts."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre SURVEY Light, SURVEY+ et SHIELD ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SURVEY Light offre une surveillance de base avec 1-2 sondes. SURVEY+ propose un réseau complet de sondes autour du bâtiment pour une surveillance globale. SHIELD est notre solution complète combinant surveillance et irrigation automatique pour une stabilisation active du sol."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne le système d'irrigation TerraStab ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notre système d'irrigation intelligent (inclus dans SHIELD) maintient un taux d'humidité optimal dans le sol autour de vos fondations. Il s'active automatiquement en fonction des données de nos capteurs et des prévisions météo pour prévenir la dessiccation du sol."
        }
      },
      {
        "@type": "Question",
        "name": "Les solutions TerraStab sont-elles reconnues par les assurances ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, nos solutions sont reconnues comme mesures préventives efficaces. L'installation d'un système TerraStab peut favoriser la prise en charge de certains travaux et démontrer votre démarche proactive de protection du bien immobilier."
        }
      }
    ]
  }

  // WebSite Schema avec SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TerraStab",
    "url": "https://terrastab.fr",
    "description": "Solutions connectées contre le retrait-gonflement des argiles",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://terrastab.fr/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  // Article Schema pour les pages de contenu
  const articleSchema = pageTitle && pageUrl ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "author": {
      "@type": "Organization",
      "name": "TerraStab"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TerraStab",
      "logo": {
        "@type": "ImageObject",
        "url": "https://terrastab.fr/logo_terrastab.svg"
      }
    },
    "image": "https://terrastab.fr/maison_fissuree.jpg",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "fr-FR"
  } : null

  // Product Schema pour la page d'offres
  const productsSchema = type === 'homepage' ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Product",
        "name": "SURVEY Light",
        "description": "Surveillance en continu grâce à 1 à 2 sondes propriétaires installées sur votre terrain.",
        "offers": {
          "@type": "Offer",
          "price": "400",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Product",
        "name": "SURVEY+",
        "description": "Un réseau de sondes propriétaires en périphérie du bâtiment pour une vision complète.",
        "offers": {
          "@type": "Offer",
          "price": "800",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Product",
        "name": "SHIELD",
        "description": "La solution complète : réseau de sondes + système d'irrigation intelligent.",
        "offers": {
          "@type": "Offer",
          "price": "1500",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      }
    ]
  } : null

  return (
    <Helmet>
      {/* Organization Schema - toujours présent */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {/* WebSite Schema pour la page d'accueil */}
      {type === 'homepage' && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {/* FAQ Schema pour la page d'accueil */}
      {(type === 'homepage' || type === 'faq') && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {/* Products Schema pour la page d'accueil */}
      {productsSchema && (
        <script type="application/ld+json">
          {JSON.stringify(productsSchema)}
        </script>
      )}

      {/* Article Schema pour les pages de contenu */}
      {type === 'article' && articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      )}
    </Helmet>
  )
}
