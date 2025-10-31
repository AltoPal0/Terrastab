import React from 'react'
import CGVPage from '../../src/components/CGVPage'
import { Helmet } from "@dr.pogodin/react-helmet"

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Conditions Générales de Vente – TerraStab</title>
        <meta name="description" content="Consultez nos conditions générales de vente pour les solutions TerraStab de stabilisation des sols argileux." />
        <link rel="canonical" href="https://terrastab.fr/cgv" />
      </Helmet>
      <CGVPage />
    </>
  )
}
