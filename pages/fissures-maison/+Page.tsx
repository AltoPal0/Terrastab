import React from 'react'
import FissuresMaison from '../../src/components/seo/FissuresMaison'
import { Helmet } from "@dr.pogodin/react-helmet";
import StructuredData from '../../src/components/StructuredData'

export const prerender = true

export default function Page() {
  const title = "Fissures sur votre maison : causes, risques et solutions"
  const description = "Fissures sur les murs ? Apprenez à reconnaître les causes et découvrez comment les experts TerraStab réparent et stabilisent les maisons fissurées."
  const url = "https://terrastab.fr/fissures-maison"
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
      <FissuresMaison />
    </>
  )
}


