import React from 'react'
import CGVPage from '../../src/components/CGVPage'
import { Helmet } from "@dr.pogodin/react-helmet"

export const prerender = true

export default function Page() {
  const title = "Conditions Générales de Vente – TerraStab"
  const description = "Consultez nos conditions générales de vente pour les solutions TerraStab de stabilisation des sols argileux."
  const url = "https://terrastab.fr/cgv"

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <CGVPage />
    </>
  )
}
