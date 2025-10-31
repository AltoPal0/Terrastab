import React from 'react'
import SolutionStabilisationSolArgileux from '../../src/components/seo/SolutionStabilisationSolArgileux'
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Stabilisation de sol argileux : la solution durable TerraStab</title>
        <meta
          name="description"
          content="Découvrez la solution TerraStab pour stabiliser les sols argileux et protéger durablement votre maison contre le retrait-gonflement des argiles."
        />
        <link rel="canonical" href="https://terrastab.fr/solution-stabilisation-sol-argileux" />
      </Helmet>
      <SolutionStabilisationSolArgileux />
    </>
  )
}
export {}


