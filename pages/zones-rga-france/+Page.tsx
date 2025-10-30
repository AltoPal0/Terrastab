import React from 'react'
import ZonesRgaFrance from '../../src/components/seo/ZonesRgaFrance'
import { Helmet } from "@dr.pogodin/react-helmet";

export const prerender = true;

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Carte des zones RGA en France : êtes-vous concerné ? – TerraStab</title>
        <meta
          name="description"
          content="Consultez la carte des zones à risque RGA en France et découvrez si votre maison est exposée au retrait-gonflement des argiles. Diagnostic gratuit avec TerraStab."
        />
        <link rel="canonical" href="https://terrastab.fr/zones-rga-france" />
      </Helmet>
      <ZonesRgaFrance />
    </>
  )
}
export {}


