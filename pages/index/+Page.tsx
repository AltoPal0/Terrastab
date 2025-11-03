import React from 'react'
import { Helmet } from '@dr.pogodin/react-helmet'
import { CustomerJourneyProvider } from '../../src/contexts/CustomerJourneyContext'
import HomePageContent from '../../src/components/HomePageContent'
import StructuredData from '../../src/components/StructuredData'

export const prerender = true

export default function Page() {
  const title = "TerraStab – Solutions connectées contre le retrait-gonflement des argiles"
  const description = "Protégez votre maison des fissures liées aux sols argileux. TerraStab propose des solutions connectées de surveillance et stabilisation pour prévenir les dégâts du RGA."
  const url = "https://terrastab.fr/"
  const image = "https://terrastab.fr/maison_fissuree.jpg"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="TerraStab" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <StructuredData type="homepage" />
      <CustomerJourneyProvider>
        <HomePageContent />
      </CustomerJourneyProvider>
    </>
  )
}


