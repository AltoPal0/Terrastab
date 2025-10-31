import React from 'react'
import MaisonFissuree from '../../src/components/seo/MaisonFissuree'
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Maison fissurée ? Le rôle du sol argileux (RGA) – TerraStab</title>
        <meta
          name="description"
          content="Votre maison se fissure ? Découvrez comment le retrait-gonflement des argiles provoque des fissures et comment TerraStab peut stabiliser votre sol."
        />
        <link rel="canonical" href="https://terrastab.fr/maison-fissuree" />
      </Helmet>
      <MaisonFissuree />
    </>
  )
}
export {}


