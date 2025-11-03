import React from 'react'
import { Helmet } from "@dr.pogodin/react-helmet"
import StructuredData from '../../src/components/StructuredData'
import FissuresMurs from '../../src/components/seo/FissuresMurs'

export const prerender = true

export default function Page() {
  const title = "Fissures dans les murs : comprendre, diagnostiquer et stabiliser votre maison"
  const description = "Vos murs présentent des fissures ? Découvrez comment le phénomène d'argiles gonflantes fragilise votre maison et comment TerraStab propose une stabilisation durable, simple et certifiée."
  const url = "https://terrastab.fr/fissures-murs"
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

      <StructuredData
        type="article"
        pageTitle={title}
        pageDescription={description}
        pageUrl={url}
      />

      <FissuresMurs />
    </>
  )
}
