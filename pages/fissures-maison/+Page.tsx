import React from 'react'
import FissuresMaison from '../../src/components/seo/FissuresMaison'
import { Helmet } from "@dr.pogodin/react-helmet";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Fissures sur votre maison : causes, risques et solutions</title>
        <meta
          name="description"
          content="Fissures sur les murs ? Apprenez à reconnaître les causes et découvrez comment les experts TerraStab réparent et stabilisent les maisons fissurées."
        />
        <link rel="canonical" href="https://terrastab.fr/fissures-maison" />
      </Helmet>
      <FissuresMaison />
    </>
  )
}
export {}


