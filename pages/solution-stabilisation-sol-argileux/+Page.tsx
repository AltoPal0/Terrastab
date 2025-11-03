import React from 'react'
import SolutionStabilisationSolArgileux from '../../src/components/seo/SolutionStabilisationSolArgileux'
import { Helmet } from "@dr.pogodin/react-helmet";
import StructuredData from '../../src/components/StructuredData'

export const prerender = true

export default function Page() {
  const title = "Stabilisation de sol argileux : la solution durable TerraStab"
  const description = "Découvrez la solution TerraStab pour stabiliser les sols argileux et protéger durablement votre maison contre le retrait-gonflement des argiles."
  const url = "https://terrastab.fr/solution-stabilisation-sol-argileux"
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
      <SolutionStabilisationSolArgileux />
    </>
  )
}


