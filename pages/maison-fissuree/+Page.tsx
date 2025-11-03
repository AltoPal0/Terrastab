import React from 'react'
import MaisonFissuree from '../../src/components/seo/MaisonFissuree'
import { Helmet } from "@dr.pogodin/react-helmet";
import StructuredData from '../../src/components/StructuredData'

export const prerender = true

export default function Page() {
  const title = "Maison fissurée ? Le rôle du sol argileux (RGA) – TerraStab"
  const description = "Votre maison se fissure ? Découvrez comment le retrait-gonflement des argiles provoque des fissures et comment TerraStab peut stabiliser votre sol."
  const url = "https://terrastab.fr/maison-fissuree"
  const image = "https://terrastab.fr/maison_fissuree.jpg"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
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
      <StructuredData type="article" pageTitle={title} pageDescription={description} pageUrl={url} />
      <MaisonFissuree />
    </>
  )
}


